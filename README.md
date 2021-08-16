# Getting Started with Markdown Demo Note



### Deployment

1. `yarn`  to install dependencies
2. `yarn build` to generate a compiled build folder for deployment

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3008](http://localhost:3008) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `Add Verida-Auth-Client Dependency` 

To get the `@verida-auth-client` library working locally on your machines please follow these steps:

1. Clone the verida auth client repo [https://github.com/verida/vault-auth-client](https://github.com/verida/vault-auth-client)

2. npm install

3. npm run build

4. npm link

5. Then go to the markdown project and run npm link @verida/vault-auth-client


That will register the library to the project.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.




