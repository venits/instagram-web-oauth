# Instagram Oauth2.0 for Web

The easiest possible way I manage to create authentication flow with Instagram.

You can also check [react-instagram-photo-picker](https://github.com/venits/react-instagram-photo-picker) which uses this module for authorization ;)
 
 ## Intro
 As you may know standard **Instagram API** is getting deprecated and **Instagram Graph API** is introduced but It is only for businesses right now. We still have time to **early 2020** for using basic stuff like getting photos from user Instagram profile.

## Introduction
This module is focused on delivering **access_token** is easiest and fastest way.

We have two ways of receiving **access_token**:
- *Server-side flow* 
- *Implicit flow*

**Server-side** flow is more complicated because we need to implement our own backend and since we can use API only for getting basic info about user profile I chosen **Implicit flow** that is *less secure but easier to use*.

## Requirements

First of all go to [Instagram Developer Console](https://www.instagram.com/developer/) and create your app.

After creating app go to: **Manage Clients -> Manage -> Security.**

*Some important notes:*
1. **Disable implicit OAuth** - must be unchecked, otherwise we will not be able to use Implicit flow!

2. **Valid redirect URIs** - To make thing easier I hardcoded endpoint that my module is using. Just add **instagram_auth** to URI in which you will be using my module.
For example **http://localhost:3000/instagram_auth** is valid when you are using React. In production replace *localhost:3000* with your domain.

*Final setup should look like this:*
![Demo](https://raw.githubusercontent.com/venits/instagram-web-oauth/master/instauth.png)


## Usage

Usage is very simple it requires just **3 lines of code** :)

1. In your .html file in which Instagram auth flow will be called add this line of code in **< head>** tag. For better performance put it at the beginning ;)

*In React this file will be **index.html** in your public folder.*
```html
<head>
  <script type="text/javascript" src="https://instagram-web-auth.firebaseapp.com/instauth.min.js"></script>
    ...
</head>
``` 

2. Put this line everywhere you want but remember that  function **init()** must be called before sending any request to Instagram API.
```js
window.InstAuth.init('your_client_id');
```

3. Call **startAuthFlow()** for example when user clicks 'Log in to Instagram'
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

