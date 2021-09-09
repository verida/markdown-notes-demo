/**
 *  Vault Client Sign on URi
 */

export const LOGIN_URI = 'https://vault.testnet.verida.io/mobile/auth-request.html';
export const SERVER_URI = 'wss://auth-server.testnet.verida.io:7001';

export const LOGO_URL = 'http://assets.verida.io/verida_logo.svg';

export const CLIENT_AUTH_NAME = 'Verida: Markdown Notes Demo';
export const APP_NAME = 'Markdown notes';

export const USER_SESSION_KEY = 'verida_user_loggedin';
export const VERIDA_USER_SIGNATURE = '_verida_auth_user_signature';

// eslint-disable-next-line import/no-mutable-exports
export let DATASTORE_SCHEMA;

if (process.env.NODE_ENV === 'development') {
  DATASTORE_SCHEMA = 'http://localhost:3008/schema.json';
} else {
  DATASTORE_SCHEMA = 'https://markdown-editor.demos.testnet.verida.io/schema.json';
}

export const webLinks = {
  DOCUMENTATION: 'https://docs.datastore.verida.io/#/',
  WEBSITE: 'https://www.verida.io/'
};
