# magic-link-signin-wromo
Signin with magic links by firebase on static page - widgets by wromo


## widgets includes full style preview login/register page to connect firebase.

Important: in the static model KEY is entered in json format auth-config.json : KEY ID must be strictly blocked to respond only on your domain!



## Configuration steps:
Add the following script url in header css and js in footer exactly as below (for NPM package installations no need for auth-config.json file: Attach in .env file)

TO HEAD
````
<link rel="stylesheet" href="./styles.css">
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