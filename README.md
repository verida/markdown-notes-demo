# Getting Started with Markdown Demo Note

see link here to view App Demo : [markdown-editor](https://markdown-editor.demos.testnet.verida.io/)

---
## About 
---

Markdown demo note is a Decentralized Note  App which integrates with the verida datastore library and Verida Vault  that allows users to save encrypted notes to their database.

## Tools 

------
### Tech Stack 

-  JavaScript / React Library


### Verida Libraries
-  [verida datastore](https://github.com/verida/vault-auth-client)

-  [verida Auth Client](https://github.com/verida/vault-auth-client)


## Add Verida-Auth-Client Dependency(Locally)

_____

To get the `@verida-auth-client` library working locally on your machines please follow these steps:

1. Clone the verida auth client repo [https://github.com/verida/vault-auth-client](https://github.com/verida/vault-auth-client)

2. npm install

3. npm run build

4. npm link

5. Then go to the markdown project and run npm link @verida/vault-auth-client


That will register the library to the project.


## Deployment

----
1. `yarn`  to install dependencies
2. `yarn build` to generate a compiled build folder for deployment
3. `deploy.sh` to deploy to the AWS environment defined in the `AWS_PROFILE` environment variable.

## Available Scripts

____

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3008](http://localhost:3008) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

