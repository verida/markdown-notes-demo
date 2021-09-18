/**
 *  Vault Client Sign on URi
 */

export const LOGIN_URI = 'https://vault.verida.io/request/';
export const SERVER_URI = 'wss://auth-server.testnet.verida.io:7002';

export const LOGO_URL = 'http://assets.verida.io/verida_logo.svg';

export const CLIENT_AUTH_NAME = 'Verida: Markdown Notes Demo';
export const APP_NAME = 'Markdown notes';

// TODO: Refactor to use .env to add schema urls

// eslint-disable-next-line import/no-mutable-exports
export let DATASTORE_SCHEMA;

if (process.env.NODE_ENV === 'development') {
  DATASTORE_SCHEMA = 'http://localhost:3008/schema.json';
} else {
  DATASTORE_SCHEMA = 'https://markdown-editor.demos.testnet.verida.io/schema.json';
}

export const webLinks = {
  DOCUMENTATION: 'https://github.com/verida/markdown-notes-demo/blob/main/README.md',
  WEBSITE: 'https://www.verida.io/'
};
