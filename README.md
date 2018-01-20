# Auth0 Angular Application

## Node Server

A Node.js server is required for this app in order to make authenticated API requests and display returned data in the app. Please follow instructions in this repo:

**[sample-auth0-nodeserver](https://github.com/kmaida/sample-auth0-nodeserver)**

Make sure you have the `sample-auth0-nodeserver` set up and running.

## Auth0 Setup

You should already have a **[free Auth0 account](https://auth0.com/signup)** from following the README instructions for the [sample-auth0-nodeserver](https://github.com/kmaida/sample-auth0-nodeserver).

### Create Auth0 Client Application

Log into your [Auth0 Dashboard](https://manage.auth0.com) and **create a new [client](https://manage.auth0.com/#/clients)** with the following settings:

* **Name**: a suitable name of your choice, suggested: `Auth0 App`
* **Client type**: Single Page Web Applications

![Auth0 create new client app](https://cdn.auth0.com/blog/ngatl/new-client.jpg)

Once your client has been created, select the **Settings** tab and make note of the **Domain** and **Client ID**. You'll need these settings to configure Auth0 in your Angular application.

Add the following settings:

* **Allowed Callback URLs**: `http://localhost:4200/callback`
* **Allowed Web Origins**: `http://localhost:4200`

> **Note:** If you are using an older Auth0 client app that you created at an earlier date, scroll down to the bottom of the Settings tab and click **Show Advanced Settings**. Select the **OAuth** tab and verify that the **JsonWebToken Signature Algorithm** is set to `RS256`. (New clients use this algorithm by default, but older ones may not be set.)

### Set Up Social Identity Providers

You can set up social identity providers (IdPs) if you wish to allow your users to log in with providers like Google, Facebook, Twitter, and more. Go to **Connections > [Social Connections](https://manage.auth0.com/#/connections/social)** in the Auth0 dashboard sidebar.

Switch on any social identity providers you wish you use in your app. For now, you can use default Auth0 dev keys,* but in production, you will need to set up your own social provider apps. You can do this by following the instructions in each provider's **How to obtain a ClientID?** link.

Once you've enabled a social provider, select that provider's **Clients** tab and enable the client you created for this project. Save your settings.

![Google/Gmail social IdP in Auth0](https://cdn.auth0.com/blog/ngatl/google-idp.png)

*_Social providers using Auth0 Dev Keys are identified by an orange_ `!` _icon in the main view:_ 

![Social providers using Auth0 Dev Keys](https://cdn.auth0.com/blog/ngatl/idp-devkeys.png)

## Angular App Setup

### Install the Angular CLI

Install the latest version of the [Angular CLI](https://github.com/angular/angular-cli) globally:

```bash
$ npm install -g @angular/cli
```

> **Note:** If you encounter `EACCESS` errors, you will have to run the command with `sudo` (Mac/Linux) or in a command window running as Administrator (Windows).

### Create New Angular App

In a parent directory of your choosing, create your Angular app and install the [auth0.js](https://github.com/auth0/auth0.js) library with the following commands:

```bash
$ ng new auth0-app --routing --skip-tests
$ cd auth0-app
$ npm install auth0-js@latest --save
```

### Add Bootstrap

For ease of styling, add [Bootstrap CSS](https://getbootstrap.com/docs/4.0/getting-started/introduction/#css) to your `src/index.html` file's `<head>` like so:

```html
<!-- src/index.html -->
<link
  rel="stylesheet"
  href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
  integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
  crossorigin="anonymous">
```

### Configure Environment

Open your Angular project's `src/environments/environment.ts` file and add your Auth0 configuration like so:

```js
// src/environments/environment.ts
// (renamed from environment.ts.sample if cloning repo)
export const environment = {
  production: false,
  auth: {
    clientId: '{Auth0_Client_ID}',
    domain: '{Auth0_Domain}' // e.g., 'you.auth0.com',
    redirect: 'http://localhost:4200/callback',
    audience: '{Auth0_API_Audience}', // API identifier, e.g., 'http://localhost:3000/api/'
    scope: 'openid profile email',
    namespace: '{Auth0_Rules_Roles_Namespace}' // e.g., 'https://example.com/roles'
  }
};
```

Your **Client ID** and **Domain** can be found in your Auth0 Dashboard in the [Client](https://manage.auth0.com/#/clients) settings for this project.

The **Audience** and **Namespace** should be the API identifier and roles rule namespace that you set up for your [sample-auth0-nodeserver](https://github.com/kmaida/sample-auth0-nodeserver).

### Generate App Architecture

```bash
# Callback page
$ ng g component pages/callback --is --it --flat --no-spec
# Homepage
$ ng g component pages/home --is --no-spec
# Dinosaurs page
$ ng g component pages/dinosaurs --no-spec
$ ng g interface pages/dinosaurs/dinosaur
# Shared module
$ ng g module shared
$ ng g component shared/header --is --export=true --no-spec
$ ng g component shared/loading --is --it --flat --export=true --no-spec
$ ng g component shared/error --is --it --flat --export=true --no-spec
$ ng g service shared/api --no-spec
# Auth module
$ ng g module auth
$ ng g service auth/auth --no-spec
$ ng g guard auth/auth --no-spec
$ ng g guard auth/admin --no-spec
$ ng g service auth/token-interceptor --no-spec
$ ng g component pages/profile --is --no-spec
# Admin module
$ ng g module pages/admin --routing --no-spec
$ ng g component pages/admin/dragons --is --export=true --no-spec
$ ng g interface pages/admin/dragons/dragon
```

## Resources

* [Pipeable RxJS operators](https://github.com/ReactiveX/rxjs/blob/master/doc/pipeable-operators.md)