// eslint-disable-next-line import/no-unresolved
import { EnvironmentType } from '@verida/client-ts';

export const CONTEXT_NAME = 'Verida: Markdown Notes Demo';

export const DATASTORE_SCHEMA = `${window.location.origin}/schema.json`;

export const VERIDA_ENVIRONMENT = EnvironmentType.TESTNET;

export const VERIDA_TESTNET_DEFAULT_SERVER = 'https://db.testnet.verida.io:5002/';

export const webLinks = {
  DOCUMENTATION: 'https://github.com/verida/markdown-notes-demo/blob/main/README.md',
  WEBSITE: 'https://www.verida.io/'
};
