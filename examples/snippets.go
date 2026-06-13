// Package examples holds runnable, compile-tested Go code for the Zenon
// documentation. Every code snippet shown in a guide is injected from this
// module via an {@inject: examples/<file>.go#<anchor>} directive, and the
// whole module is compiled in CI (go build ./... && go vet ./...) so a
// snippet can never drift from code that actually builds against go-zenon.
//
// The module pins go-zenon at the same commit as PINNED_GO_ZENON (via a
// replace directive in go.mod), so snippets match the package reference and
// the OpenRPC spec.
package examples

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"math/big"

	"github.com/zenon-network/go-zenon/chain/nom"
	"github.com/zenon-network/go-zenon/common/types"
	"github.com/zenon-network/go-zenon/pow"
	"github.com/zenon-network/go-zenon/rpc/server"
	"github.com/zenon-network/go-zenon/vm/embedded/definition"
	"github.com/zenon-network/go-zenon/wallet"
)

// ParseAddress parses and validates a Zenon address string.
func ParseAddress() {
	// docs::start:parse-address
	addr, err := types.ParseAddress("z1qq3zqckgywkwma0pafsq2cndl7anx23v099k79")
	if err != nil {
		log.Fatalf("invalid address: %v", err)
	}
	fmt.Println("parsed address:", addr.String())
	// docs::end:parse-address
}

// QueryFrontierMomentum dials a node over websocket and fetches the frontier
// (latest) momentum through the JSON-RPC API.
func QueryFrontierMomentum(ctx context.Context) error {
	// docs::start:connect-and-query
	client, err := server.Dial("ws://127.0.0.1:35998")
	if err != nil {
		return fmt.Errorf("dial node: %w", err)
	}
	defer client.Close()

	var momentum struct {
		Height uint64 `json:"height"`
		Hash   string `json:"hash"`
	}
	if err := client.CallContext(ctx, &momentum, "ledger.getFrontierMomentum"); err != nil {
		return fmt.Errorf("get frontier momentum: %w", err)
	}
	fmt.Printf("frontier momentum %d: %s\n", momentum.Height, momentum.Hash)
	// docs::end:connect-and-query

	return nil
}

// DeriveKeyPair derives the key pair (and its address) at Zenon's default
// derivation path from a BIP-39 seed.
func DeriveKeyPair(seed []byte) (*wallet.KeyPair, error) {
	// docs::start:derive-keypair
	// seed is the 64-byte BIP-39 seed of your mnemonic. The default Zenon
	// account is the first hardened index of coin type 73404.
	keyPair, err := wallet.DeriveForPath("m/44'/73404'/0'", seed)
	if err != nil {
		return nil, fmt.Errorf("derive key pair: %w", err)
	}
	fmt.Println("address:", keyPair.Address.String())
	// docs::end:derive-keypair

	return keyPair, nil
}

// QueryPlasma reads an address's current plasma from the plasma embedded
// contract.
func QueryPlasma(ctx context.Context, client *server.Client, address types.Address) error {
	// docs::start:query-plasma
	var plasma struct {
		CurrentPlasma uint64 `json:"currentPlasma"`
		MaxPlasma     uint64 `json:"maxPlasma"`
		QsrAmount     string `json:"qsrAmount"`
	}
	if err := client.CallContext(ctx, &plasma, "embedded.plasma.get", address.String()); err != nil {
		return fmt.Errorf("get plasma: %w", err)
	}
	fmt.Printf("plasma: %d / %d (from %s QSR fused)\n",
		plasma.CurrentPlasma, plasma.MaxPlasma, plasma.QsrAmount)
	// docs::end:query-plasma

	return nil
}

// ListUnreceived fetches the transfers sent to an address that it has not yet
// received. On Zenon's dual ledger an incoming transfer is not credited until
// the recipient publishes a matching receive block — this is how you find the
// sends still waiting to be received.
func ListUnreceived(ctx context.Context, client *server.Client, address types.Address) error {
	// docs::start:list-unreceived
	var page struct {
		Count uint64            `json:"count"`
		List  []json.RawMessage `json:"list"`
	}
	// pageIndex 0, pageSize 10
	if err := client.CallContext(ctx, &page, "ledger.getUnreceivedBlocksByAddress",
		address.String(), 0, 10); err != nil {
		return fmt.Errorf("get unreceived blocks: %w", err)
	}
	fmt.Printf("%d unreceived transfer(s) waiting to be received\n", page.Count)
	// docs::end:list-unreceived

	return nil
}

// BuildSignedSend builds and signs a send account block transferring amount of
// the given token to a recipient. The chain-state fields (PreviousHash,
// Height, MomentumAcknowledged) must be filled from the sender's frontier
// account block and the node's frontier momentum before signing; they are left
// zero here to keep the example focused on the build-and-sign mechanics.
func BuildSignedSend(keyPair *wallet.KeyPair, to types.Address, amount *big.Int) *nom.AccountBlock {
	// docs::start:build-sign-send
	block := &nom.AccountBlock{
		Version:         1,
		ChainIdentifier: 1, // 1 = mainnet
		BlockType:       nom.BlockTypeUserSend,
		Address:         keyPair.Address,
		ToAddress:       to,
		Amount:          amount,
		TokenStandard:   types.ZnnTokenStandard,
		// PreviousHash / Height / MomentumAcknowledged: set these from the
		// sender's frontier account block and the node's frontier momentum.
	}

	// The hash commits to every field above; the signature authorizes it.
	hash := block.ComputeHash()
	block.Hash = hash
	block.PublicKey = keyPair.Public
	block.Signature = keyPair.Sign(hash.Bytes())
	// docs::end:build-sign-send

	return block
}

// ListMomentums fetches a page of momentums from the momentum chain.
func ListMomentums(ctx context.Context, client *server.Client) error {
	// docs::start:get-momentums
	var page struct {
		Count uint64 `json:"count"`
		List  []struct {
			Height uint64 `json:"height"`
			Hash   string `json:"hash"`
		} `json:"list"`
	}
	// pageIndex 0, pageSize 5
	if err := client.CallContext(ctx, &page, "ledger.getMomentumsByPage", 0, 5); err != nil {
		return fmt.Errorf("get momentums: %w", err)
	}
	for _, m := range page.List {
		fmt.Printf("momentum %d: %s\n", m.Height, m.Hash)
	}
	// docs::end:get-momentums

	return nil
}

// AttachProofOfWork mines and attaches the proof-of-work nonce a block needs
// when its fused plasma is insufficient. The difficulty comes from
// embedded.plasma.getRequiredPoWForAccountBlock for the block being issued.
func AttachProofOfWork(block *nom.AccountBlock, difficulty *big.Int) {
	// docs::start:generate-pow
	block.Difficulty = difficulty.Uint64()
	dataHash := pow.GetAccountBlockHash(block)
	// GetPoWNonce blocks while it searches; the time grows with difficulty.
	nonce := pow.GetPoWNonce(difficulty, dataHash)
	block.Nonce = nom.DeSerializeNonce(nonce)
	// docs::end:generate-pow
}

// EncodeFuse builds the call data for the plasma contract's Fuse method, which
// locks the QSR sent with the block and grants plasma to the beneficiary.
func EncodeFuse(beneficiary types.Address) []byte {
	// docs::start:encode-fuse
	// Fuse takes the beneficiary address. The QSR to lock is the Amount of the
	// send block carrying this data, sent to the plasma contract
	// (types.PlasmaContract) with the QSR token standard.
	data := definition.ABIPlasma.PackMethodPanic(definition.FuseMethodName, beneficiary)
	// docs::end:encode-fuse

	return data
}
