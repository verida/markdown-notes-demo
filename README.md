# Getting Started with Markdown Demo Note

see link here to view App Demo : [markdown-editor](https://markdown-editor.demos.testnet.verida.io/)

---
## About 
---

Markdown demo note is a Decentralized Note  App which integrates with the verida datastore library and Verida Vault  that allows users to save encrypted notes to their database.


### Support
[Join our Discord](https://discord.gg/YzW3ku6ZvB) to tell us about what you are building and for support. 



## Tools 

------
### Tech Stack 

-  JavaScript / React Library


### Verida Libraries
-  [verida js](https://github.com/verida/verida-js)


____
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


_____

## Add local Verida Dependencies

This is only required if building against a version of the dependencies that isn't in a released NPM package.

* Build and link the [verida-js](https://github.com/verida/verida-js) packages as described in [README.md](https://github.com/verida/verida-js/blob/main/README.md)
* Return to the local directory for this repo and
  * `yarn link "@verida/client-ts"`
  * `yarn link "@verida/account-web-vault"`


---
## Releases
To do a release:

1. `git tag -a vX.X.X` 
2. `git push tags`
3. `gren release --tags=vX.X.X` (to build release notes on Github)

----
## Deployment
To deploy to 

1. `rm -rf node_modules`
2. `yarn`  to install dependencies
4. `yarn build` to generate a compiled build folder for deployment
4. `deploy.sh` to deploy to the AWS environment defined in the `AWS_PROFILE` environment variable.



