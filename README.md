# Verida Markdown Notes Demo

View working App Demo here:: [markdown-editor](https://markdown-editor.demos.testnet.verida.io/)

## About 

The [Verida](https://www.verida.io/) Markdown Notes Demo is a Decentralized Note App which integrates with the  Verida Datastore library and [Verida Vault](https://vault.verida.io/request/index.html) that allows users to save encrypted notes to their database.

You will need the Verida Vault app to access this. Contact us for access via [Discord](https://discord.gg/YzW3ku6ZvB).


### Support
[Join our Discord](https://discord.gg/YzW3ku6ZvB) to tell us about what you are building and for support. 

## Tools 

### Tech Stack 

-  JavaScript / React Library


### Verida Libraries
-  [verida js](https://github.com/verida/verida-js)


## Available Scripts

We use [nvm](https://github.com/nvm-sh/nvm) to manage our node version. Run `nvm use` to pick up the correct version.

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

1. `nvm use`
2. `git checkout develop`
3. `git tag -a vX.X.X` 
4. `git push --tags`
5. `gren release --tags=vX.X.X` (to build release notes on Github)


## Deployment

Deployment to the [Markdown Notes Demo site on Verida Testnet](https://markdown-editor.demos.testnet.verida.io/) automatically done via [AWS Amplify](https://us-east-2.console.aws.amazon.com/amplify/) for all new commits to the `main` branch. 

The process for this is:

1. Tag the release on the develop branch (see above)
2. `git checkout main`
3. `git merge develop`
4. `git push`

AWS Amplify will now build and deploy the `main` branch. 


