# magic-link-signin-wromo
Signin with magic links by firebase on static page - widgets by wromo


## widgets includes Style Sign In page.

## Important: auth-config.json : Strictly blocked to respond only on your domain!

## v2.0.1
Firestore - save data to firestore (Firestore Not active execute the login further without adding the data to firestore and only adding it to localstorage web).

add version 2.0.1 to CDN links for attaching data in Firestore (Firestore is activated manually from the Firebase console).


## v2.0.0
Add: 
wromo_uid (ex: njVpw7D...)

wromo_email (ex: julian.xyz@gmail.com)

wromo_name (ex: Julian.xyz)

This is automatically collected DATA by the login logic via Magic Links upon return, and attached to local storage. This way you can recall this NAME to be saved in Firebase/Firestore Data!

wromo_uid, 
wromo_email, 
wromo_name 

## Configuration steps:

## for react/nextjs : head via /app/layout.tsx in all the headers to redirect to the login page!!!
* ## FRONTEND (All Page to redirect to login Page) code for head  - (** Do not add this code to the login page!!!!)
````
<script>
  (function() {
    // 1. We are looking for the exact key saved by Script 
    const isUserLoggedIn = localStorage.getItem('wromo_uid'); 
    
    if (!isUserLoggedIn) {
      window.location.replace('http://localhost/login/'); 
    } else {
      document.addEventListener('DOMContentLoaded', function() {
        document.body.classList.add('auth-ready');
      });
    }
  })();
</script>

</head>
````
## CODE ADDED ONLY TO THE LOGIN PAGE!!! you can create it from a simple index.html: if you have react/nextjs: in the /public/ folder you can attach a folder /public/login/index.html and add this code to the end body html!!!
* ## FRONTEND only: /login page: to end body

````
  <div 
    data-wromo-auth 
    data-wromo-auth-config="./auth-config.json" 
    data-wromo-auth-redirect="https://mydomain_return_home_page.com/"> 
  </div>

  <script type="module" src="https://cdn.jsdelivr.net/npm/magic-link-signin-wromo@2.0.0/wromo-auth-widget.js" defer></script>

</body>
</html>

````

## don't forget auth-config.json when creating web apps in firebase: copy and add as a local file or attached as json to a URL!

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



## Typescript header redirect
````
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        {/* 1. Login Wromo */}
        <script dangerouslySetInnerHTML={{ __html: `
          (function() {
            const isUserLoggedIn = localStorage.getItem('wromo_uid'); 
            
            if (!isUserLoggedIn) {
              window.location.replace('https://redirect_to_login_page.com/login/'); 
            } else {
              document.addEventListener('DOMContentLoaded', function() {
                document.body.classList.add('auth-ready');
              });
            }
          })();
        `}} />

````
now with version 2.0.0 you can also request localStorage.getItem('wromo_email');
                                            localStorage.getItem('wromo_name');

## v1.0.4 
Check Spam Email too!


## v1.0.3 info Readme.md


## v1.0.2
Magic link design improvement
HIDE THE FORM AND SHOW THE MESSAGE
![FORM AND SHOW THE MESSAGE](/img/image-3.png)


## v1.0.1


![Preview webpage signin with magic links](/img/image.png)


## Extra settings in firebase
![Add Provider Email/Password](/img/image-2.png)



## Domain Block !!!!!!!!! (This key can only be used by your master domain.)
![Set your Google Auth Platform -> Clients to respond only to your domain](/img/domain.png)


## Congratulations!

