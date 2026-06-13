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
	"fmt"
	"log"

	"github.com/zenon-network/go-zenon/common/types"
	"github.com/zenon-network/go-zenon/rpc/server"
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
