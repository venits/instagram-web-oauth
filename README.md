# Instagram Oauth2.0 for Web

The easiest way to create authentication flow with Instagram.

You can also check [react-instagram-photo-picker](https://github.com/venits/react-instagram-photo-picker) which uses this module for authorization.
 
## Requirements

First of all go to [Instagram Developer Console](https://www.instagram.com/developer/) and create your app.

After creating app go to: **Manage Clients -> Manage -> Security.**

*Some important notes:*
1. **Disable implicit OAuth** - must be unchecked, otherwise we will not be able to use Implicit flow!

2. **Valid redirect URIs** - To make thing easier I hardcoded endpoint that my module is using.

Just add **instagram_auth** to URI in which you will be using my module.

*For example your redirect URI can look like this: `http://localhost:3000/instagram_auth`.*

![Demo](https://raw.githubusercontent.com/venits/instagram-web-oauth/master/instauth.png)


## Usage

Usage is very simple it requires just **3 lines of code** :)

1. Put this line of code in `**<head>**` tag.

```html
<head>
  <script type="text/javascript" src="https://instagram-web-auth.firebaseapp.com/instauth.min.js"></script>
    ...
</head>
``` 

2. Put this line of code in `**<body>**` tag.

```html
<script>
  window.InstAuth.init('6ca106e2de72433c8f2258a7ec6d7780');
</script>
```

3. Call **startAuthFlow()** everywhere user clicks 'Log in to Instagram'
```js
  window.InstAuth.startAuthFlow();
```

After successful authorization in console you should notice this message:
```js
Instagram access_token: 707...46b4
```

### **And that's all :)**


You can get your **access_token** any time using this line of code:
```js
var token = window.InstAuth.getAccessToken();
```

## Summary

I hope that you will find this module useful and also if you have any problems or questions please let me know I will be more than happy to help you :)

My email: tomasz.przybyl.it@gmail.com

