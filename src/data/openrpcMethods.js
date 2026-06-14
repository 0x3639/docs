// Single source of truth for the API playground: the generated OpenRPC
// document (specs/openrpc.json, published to static/openrpc.json). This
// module adapts that machine-readable spec into the shape the playground
// components consume, so the hand-maintained API_METHODS table can be
// retired. Method list, parameter forms, descriptions and pre-filled
// example values are all derived from the spec — never hand-edited here.
//
// To grow the playground, add/verify a namespace fragment under
// specs/openrpc/ and run `npm run gen`; the new methods appear here
// automatically.
import openrpc from '@site/static/openrpc.json';

const schemas = (openrpc.components && openrpc.components.schemas) || {};

const refName = (schema) =>
  schema && schema.$ref ? schema.$ref.split('/').pop() : null;

// Resolve one level of $ref so we can inspect a named schema's shape.
const deref = (schema) => {
  const n = refName(schema);
  return n && schemas[n] ? schemas[n] : schema;
};

// Map an OpenRPC parameter schema to one of the playground's form types
// (the keys of PARAM_TYPES below). Named primitive schemas map to their
// validated input type; object/array schemas render as JSON textareas.
const paramType = (schema) => {
  if (!schema) return 'string';

  switch (refName(schema)) {
    case 'Address':
      return 'address';
    case 'Hash':
      return 'hash';
    case 'TokenStandard':
      return 'tokenStandard';
    case 'Amount':
      return 'string'; // arbitrary-precision integer, sent as a base-10 string
  }

  const resolved = deref(schema);

  // Nullable params are expressed as oneOf[<type>, {type: null}].
  const variants = resolved.oneOf || schema.oneOf;
  if (variants) {
    const nonNull = variants.find(
      (s) => s && s.type !== 'null' && refName(s) !== 'null'
    );
    return paramType(nonNull);
  }

  switch (resolved.type) {
    case 'integer':
    case 'number':
      return 'number';
    case 'array':
      return 'array';
    case 'object':
      return 'object';
    default:
      return 'string';
  }
};

// Build a { paramName: exampleValue } map from a method's first example so
// the parameter form can be pre-filled with a real, working request.
const examplePrefill = (method) => {
  const example = method.examples && method.examples[0];
  const out = {};
  if (example && Array.isArray(example.params)) {
    for (const p of example.params) out[p.name] = p.value;
  }
  return out;
};

// Namespace display labels. Anything not listed is title-cased from its key.
const NAMESPACE_LABELS = {
  ledger: 'Ledger',
  stats: 'Stats',
  subscribe: 'Subscribe (websocket)',
};

// Preferred ordering of namespaces in the selector; the rest follow
// alphabetically.
const NAMESPACE_ORDER = ['ledger', 'stats', 'subscribe'];

const namespaceKey = (methodName) => {
  const parts = methodName.split('.');
  return parts[0] === 'embedded' ? `${parts[0]}.${parts[1]}` : parts[0];
};

const namespaceLabel = (key) => {
  if (NAMESPACE_LABELS[key]) return NAMESPACE_LABELS[key];
  if (key.startsWith('embedded.')) {
    const contract = key.slice('embedded.'.length);
    return `Embedded · ${contract.charAt(0).toUpperCase()}${contract.slice(1)}`;
  }
  return `${key.charAt(0).toUpperCase()}${key.slice(1)}`;
};

const buildMethod = (method) => {
  const prefill = examplePrefill(method);
  const isWebsocket = method['x-transport'] === 'websocket';

  return {
    name: method.name,
    description: method.summary || method.description || '',
    longDescription: method.description || '',
    transport: isWebsocket ? 'websocket' : 'http',
    // Websocket subscriptions are reached on the wire through
    // ledger.subscribe (the subscription name is the first param); plain
    // request/response methods are sent under their own name.
    wireMethod: isWebsocket ? 'ledger.subscribe' : method.name,
    params: (method.params || []).map((p) => ({
      name: p.name,
      type: paramType(p.schema),
      required: !!p.required,
      description: p.description || '',
      ...(prefill[p.name] !== undefined ? { default: prefill[p.name] } : {}),
    })),
  };
};

// Group the flat OpenRPC method list into the namespaced table the
// selector renders: { [nsKey]: { name, description, methods: { ... } } }.
const buildApiMethods = () => {
  const grouped = {};
  for (const method of openrpc.methods || []) {
    const key = namespaceKey(method.name);
    if (!grouped[key]) {
      grouped[key] = { name: namespaceLabel(key), description: '', methods: {} };
    }
    grouped[key].methods[method.name] = buildMethod(method);
  }

  // Re-key in preferred order so the selector lists ledger/stats/subscribe
  // first, then the embedded namespaces alphabetically.
  const ordered = {};
  const keys = Object.keys(grouped).sort((a, b) => {
    const ia = NAMESPACE_ORDER.indexOf(a);
    const ib = NAMESPACE_ORDER.indexOf(b);
    if (ia !== -1 || ib !== -1) {
      return (ia === -1 ? Infinity : ia) - (ib === -1 ? Infinity : ib);
    }
    return a.localeCompare(b);
  });
  for (const k of keys) ordered[k] = grouped[k];
  return ordered;
};

export const API_METHODS = buildApiMethods();

export const getAllMethods = () => {
  const methods = [];
  Object.values(API_METHODS).forEach((category) => {
    Object.values(category.methods).forEach((methodInfo) => {
      methods.push({ category: category.name, ...methodInfo });
    });
  });
  return methods;
};

export const getMethodByName = (methodName) => {
  for (const category of Object.values(API_METHODS)) {
    if (category.methods[methodName]) {
      return { category: category.name, ...category.methods[methodName] };
    }
  }
  return null;
};

// Form-field validation/placeholders, keyed by the types produced by
// paramType() above. Unchanged in spirit from the previous hand-maintained
// table; kept here so the components have a single import.
export const PARAM_TYPES = {
  address: {
    validate: (value) => /^z1[a-z0-9]{38}$/.test(value),
    placeholder: 'z1qzal6c5s9rjnnxd2z7dvdhjxpmmj4fmw56a0mz',
    description: 'Zenon address (z1...)',
  },
  hash: {
    validate: (value) => /^[a-f0-9]{64}$/.test(value),
    placeholder: '0000000000000000000000000000000000000000000000000000000000000000',
    description: '64 character hex string',
  },
  number: {
    validate: (value) => !isNaN(value) && value >= 0,
    placeholder: '0',
    description: 'Positive integer',
  },
  string: {
    validate: (value) => String(value).length > 0,
    placeholder: '',
    description: 'Text string',
  },
  tokenStandard: {
    validate: (value) => /^zts1[a-z0-9]{22}$/.test(value),
    placeholder: 'zts1znnxxxxxxxxxxxxx9z4ulx',
    description: 'Token standard (zts1...)',
  },
  array: {
    validate: (value) => Array.isArray(value),
    placeholder: '[]',
    description: 'JSON array',
  },
  object: {
    validate: (value) => typeof value === 'object' && value !== null,
    placeholder: '{}',
    description: 'JSON object',
  },
};
