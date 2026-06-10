# magic-link-signin-wromo
Signin with magic links by firebase on static page - widgets by wromo


## widgets includes full style preview login/register page to connect firebase.

<Important: in the static model KEY is entered in json format auth-config.json : KEY ID must be strictly blocked to respond only on your domain!



## Configuration steps:
Add the following script url in header css and js in footer exactly as below (for NPM package installations no need for auth-config.json file: Attach to .env file)

TO HEAD
````
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/magic-link-signin-wromo@1.0.0/styles.css">
</head>
````

TO BODY
````
  <div 
    data-wromo-auth 
    data-wromo-auth-config="./auth-config.json"  // <-- Your file firebase KEY >
    data-wromo-auth-redirect="https://RETURN_URL.com">       // <-- Your URL Return Page >
  </div>

  <script type="module" src="https://cdn.jsdelivr.net/npm/magic-link-signin-wromo@1.0.0/wromo-auth-widget.js" defer=""></script>

</body>
</html>
````


Congratulations!

![Preview webpage signin with magic links](/img/image.png)


## Extra settings in firebase
![Add Provider Email/Password](/img/image-2.png)


## Add to your auth-config.json your firebase Auth Key:
````
{
  "apiKey": "AIvxxxxxxxxxxxxxxxxxxmBI",
  "authDomain": "magic-xxxxxx-abn747.firebaseapp.com",
  "projectId": "magic-xxxxxx-abn747",
  "storageBucket": "magic-xxxxxxx-abn747.firebasestorage.app",
  "messagingSenderId": "24444xxxxxxxx1",
  "appId": "1:24444xxxxxxxx1:web:aaa3aaa44444xxxxxxa",
  "measurementId": "G-8XXXXXXXXXA"
}

````

## Domain Block !!!!!!!!! (This key can only be used by your master domain.)
![Set your Google Auth Platform -> Clients to respond only to your domain](/img/domain.png)



---