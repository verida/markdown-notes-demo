/**
 *  Vault Client Sign on URi
 */

export const LOGIN_URI = 'https://vault.testnet.verida.io/mobile/auth-request.html';
export const SERVER_URI = 'wss://auth-server.testnet.verida.io:7001';

export const CLIENT_AUTH_NAME = 'Verida: Auth client demo';
export const APP_NAME = 'Markdown notes';

export let DATASTORE_SCHEMA;

if (process.env.NODE_ENV === 'development') {
  DATASTORE_SCHEMA = "http://localhost:3008/schema.json"
} else {
  DATASTORE_SCHEMA = "https://markdown-editor.demos.verida.io/schema.json"
}
