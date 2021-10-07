# Verida Markdown Notes Demo

View working App Demo here:: [markdown-editor](https://markdown-editor.demos.testnet.verida.io/)

## About 

The [Verida](https://www.verida.io/) Markdown Notes Demo is a Decentralized Note App which integrates with the  Verida Datastore library and [Verida Vault](https://vault.verida.io/request/index.html) that allows users to save encrypted notes to their database.

You will need the Verida Vault app to access this. Contact us for access via [Discord](https://discord.gg/YzW3ku6ZvB).

See our [Medium article](https://medium.com/verida/verida-markdown-editor-ecd00314a8b4) for a deeper technical walk through of how this all works. 

### Architecture
![image](https://user-images.githubusercontent.com/87622993/133723269-42317c35-16f8-4e6c-95ef-92abd656a700.png)


### Support
[Join our Discord](https://discord.gg/YzW3ku6ZvB) to tell us about what you are building and for support. 

## Tools 

### Tech Stack 

-  JavaScript / React Library


### Verida Libraries
-  [verida js](https://github.com/verida/verida-js)


## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3008](http://localhost:3008) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.


## Add local Verida Dependencies

This is only required if building against a version of the dependencies that isn't in a released NPM package.

* Build and link the [verida-js](https://github.com/verida/verida-js) packages as described in [README.md](https://github.com/verida/verida-js/blob/main/README.md)
* Return to the local directory for this repo and
  * `yarn link "@verida/client-ts"`
  * `yarn link "@verida/account-web-vault"`


## Releases
To do a release:

1. `git tag -a vX.X.X` 
2. `git push tags`
3. `gren release --tags=vX.X.X` (to build release notes on Github)


## Deployment

Deployment to the [Markdown Notes Demo site on Verida Testnet](https://markdown-editor.demos.testnet.verida.io/) automatically done via [AWS Amplify](https://us-east-2.console.aws.amazon.com/amplify/) for all new commits to the `main` branch. 


