/**
 *  Vault Client Sign on URi
 */

export const LOGIN_URI = 'https://vault.verida.io/request/';
export const SERVER_URI = 'wss://auth-server.testnet.verida.io:7002';

export const LOGO_URL = 'http://assets.verida.io/verida_logo.svg';

export const CLIENT_AUTH_NAME = 'Verida: Markdown Notes Demo';
export const APP_NAME = 'Markdown notes';

export const DATASTORE_SCHEMA =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3008/schema.json'
    : 'https://markdown-editor.demos.testnet.verida.io/schema.json';

export const webLinks = {
  DOCUMENTATION: 'https://github.com/verida/markdown-notes-demo/blob/main/README.md',
  WEBSITE: 'https://www.verida.io/'
};
