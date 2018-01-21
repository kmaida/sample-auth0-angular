# sample-auth0-angular

Implement [Auth0](https://auth0.com) and secure an Angular application with an authenticated [Node.js API](https://github.com/kmaida/sample-auth0-nodeserver).

## Angular Tutorial

To begin, proceed to **[Auth0 Angular Workshop](https://kmaida.gitbooks.io/auth0-angular-workshop/)** to follow along with the tutorial.

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
git clone https://github.com/kmaida/sample-auth0-angular.git
cd sample-auth0-angular
npm install
```

### Configure Environment

Locate the `environment.ts.sample` file and change its filename to `environment.ts` to activate the file. Then add the necessary [Auth0 configuration to the environment variable as described here](https://kmaida.gitbooks.io/auth0-angular-workshop/content/angular-setup.html#configure-environment).

### Serve the App

Serve the app by running:

```bash
ng serve
```

The app will be available at [http://localhost:4200](http://localhost:4200).

> **Important:** Make sure you have the [sample-auth0-nodeserver](https://github.com/kmaida/sample-auth0-nodeserver) running to provide API data for the Angular app.

## Deploying to Heroku

Make sure you have [Heroku for Node](https://devcenter.heroku.com/articles/getting-started-with-nodejs#introduction) installed on your machine. Create a new Heroku app in the root of this project.

```bash
heroku create
```

When all changes have been pushed to the main repository for the app, push to Heroku to start an automatic build.

```bash
git push heroku master
```

The app will be served using the small express server in `server.js`.

## License

[MIT](LICENSE) © Kim Maida 2018
