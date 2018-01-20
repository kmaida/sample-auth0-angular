# Auth0 Angular Application

## Node Server

A Node.js server is required for this app in order to make authenticated API requests and display returned data in the app. Please follow instructions in this repo:

**[sample-auth0-nodeserver](https://github.com/kmaida/sample-auth0-nodeserver)**

Make sure you have the `sample-auth0-nodeserver` set up and running.

## Angular App Setup

```bash
# Create app
$ ng new auth0-app --routing --skip-tests
$ cd auth0-app
$ npm install auth0-js@latest --save
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