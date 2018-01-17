# Auth0 Angular Application

## Angular App Setup

```bash
$ ng new auth0-app --routing --skip-tests
$ cd auth0-app
$ npm install auth0-js@latest --save
$ ng g component pages/callback --is --it --flat --no-spec
$ ng g component shared/header --is --no-spec
$ ng g service shared/api --no-spec
$ ng g component shared/loading --is --it --flat --no-spec
$ ng g component pages/home --is --no-spec
$ ng g module pages/admin --routing --no-spec
$ ng g component pages/admin/admin --is --export=true --no-spec
$ ng g module auth
$ ng g service auth/auth --no-spec
$ ng g guard auth/auth --no-spec
$ ng g guard auth/admin --no-spec
$ ng g service auth/token-interceptor --no-spec
```

### Add Bootstrap

```html
<!-- src/index.html -->
<link
  rel="stylesheet"
  href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.3/css/bootstrap.min.css"
  integrity="sha384-Zug+QiDoJOrZ5t4lssLdxGhVrurbmBWopoEl+M6BdEfwnCJZtKxi1KgxUyJq13dy"
  crossorigin="anonymous">
```

## Auth0 Setup

## Auth0 Rules

### Set Admin Role for Me

```js
function (user, context, callback) {
  user.app_metadata = user.app_metadata || {};
  // You can add a Role based on what you want
  // In this case I check domain
  var addRolesToUser = function(user, cb) {
    if (user.email && user.email === 'kim.maida@auth0.com' || user.email && user.email === 'yi.mihi@gmail.com') {
      cb(null, ['admin']);
    } else {
      cb(null, ['user']);
    }
  };

  addRolesToUser(user, function(err, roles) {
    if (err) {
      callback(err);
    } else {
      user.app_metadata.roles = roles;
      auth0.users.updateAppMetadata(user.user_id, user.app_metadata)
        .then(function(){
          callback(null, user, context);
        })
        .catch(function(err){
          callback(err);
        });
    }
  });
}
```

### Add User Role to Tokens

```js
function (user, context, callback) {
  var namespace = 'http://myapp.com/roles';
  var userRoles = user.app_metadata.roles;
  context.idToken[namespace] = userRoles;
  context.accessToken[namespace] = userRoles;
  callback(null, user, context);
}
```



