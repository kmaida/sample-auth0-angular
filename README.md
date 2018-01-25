# sample-auth0-angular

Implement [Auth0](https://auth0.com) and secure an Angular application with an authenticated [Node.js API](https://github.com/kmaida/sample-auth0-nodeserver).

## Angular Tutorial

To begin, proceed to the **[Auth0 Angular Workshop](https://kmaida.gitbooks.io/auth0-angular-workshop/)** book to follow along with the tutorial.

## Using This Repo

If you want to clone and run this repo, you will need:

### Requirements

* [Node.js and npm](https://nodejs.org)
* [Angular CLI](https://github.com/angular/angular-cli), installed globally
* A free [Auth0 account](https://auth0.com/signup)
* The [sample-auth0-nodeserver](https://github.com/kmaida/sample-auth0-nodeserver), configured according to the README instructions
* An Auth0 client, [configured as specified here](https://kmaida.gitbooks.io/auth0-angular-workshop/content/auth0-setup.html#create-a-client)

### Clone the Repo

Once you have _all_ the above requirements fulfilled, clone this repo and install its dependencies:

```bash
$ git clone https://github.com/kmaida/sample-auth0-angular.git
$ cd sample-auth0-angular
$ npm install
```

### Configure Environment

Locate `environment.ts.sample` and change its filename to `environment.ts` to activate the file. Then add the necessary [Auth0 configuration to the environment variable as described here](https://kmaida.gitbooks.io/auth0-angular-workshop/content/angular-setup.html#configure-environment).

Next locate `environment.prod.ts.sample` and change its filename to `environment.prod.ts` to activate the file. Then add the necessary [Auth0 configuration for a production environment as described here](https://kmaida.gitbooks.io/auth0-angular-workshop/content/build-and-deploy.html#production-environment-variables).

### Serve the App

Serve the app in a development environment by running:

```bash
$ ng serve
```

The app will be available at [http://localhost:4200](http://localhost:4200).

To serve the app in a production environment, run:

```bash
$ ng build --prod
$ node server
```

The app will then be built to a `/dist` folder and served at [http://localhost:8080](http://localhost:8080).

> **Important:** Make sure you have the [sample-auth0-nodeserver](https://github.com/kmaida/sample-auth0-nodeserver) running to provide API data for the Angular app whenever serving it.

## License

[MIT](LICENSE) © Kim Maida 2018
