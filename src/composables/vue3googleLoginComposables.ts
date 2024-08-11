/* *********************************************************************************
 vue3-google-login
 
 https://devbaji.github.io/vue3-google-login/
 "vue3-google-login" is a lightweight plugin to implement log-in and 
 sign-up flows using "Google Identity Services" with the help of 
 "Google 3P Authorization JavaScript Library"
********************************************************************************* */

import { onMounted } from "vue";
import { googleLogout, 
         googleOneTap, 
         decodeCredential, 
         googleAuthCodeLogin, 
         googleTokenLogin,
      } from "vue3-google-login";
import type { CallbackTypes } from "vue3-google-login";


/* ----------------------------------------
 GoogleLogin
---------------------------------------- */
  /**
   * @type {function} googleLoginCallback - This function resieves Callback from Google Identity.
   * @param {*} response -  This callback will be triggered when the user selects or login to Google.
  */
  const googleLoginCallback
    : CallbackTypes.CredentialCallback | CallbackTypes.CodeResponseCallback | CallbackTypes.TokenResponseCallback
    = (response:any) => {
      console.log('The response from "Sign In with Google"', response)
      const userData = decodeCredential(response.credential)
      console.log("Handle the userData", userData)
      console.log("Credential JWT string", response.credential);
      console.log("Authorisation code", response.code);
      console.log("Access token", response.access_token);
    }
    /* *********************************************************************************
      please Add the following HTML element calling this function.
      This will render a log in button white opens a popup for 'Sign In with google'.
    
      <GoogleLogin :callback="googleLoginCallback"/>
      <GoogleLogin :callback="googleLogincallback" prompt/>  // Case of 'Onetap Prompt'
      <GoogleLogin :callback="googleLogincallback" prompt auto-login/>
        // case of 'Onetap Prompt' & 'Autoprompt'

      <GoogleLogin :callback="callback">
        <button>Login Using Google</button>  // case of Custom Button as slot
      </GoogleLogin>
    ********************************************************************************* */

/* ----------------------------------------
GoogleOneTapListener function
---------------------------------------- */
  function googleOnTapListener() {
    onMounted(() => {
      googleOneTap({ 
        /* Options */
        clientId: import.meta.env.ITE_GC_CLIENT_ID,
        context: "signin", //select prompt title from "signin"|"signup"|"use"
        autoLogin: true,
        cancelOnTapOutside: false,
      })
        .then((response) => {
          // This promise is resolved when user selects an account from the the One Tap prompt
          console.log("Handle the response", response)
        })
        .catch((error) => {
          console.log("Handle the error", error)
        })
    })
  }

/* ----------------------------------------   
 GoogleLogout
---------------------------------------- */ 
  /**
   * @type {function} googleLogout
  */  
  const googlelogout = () => {
    // your logout logics
    googleLogout()
  }  
  
/* ----------------------------------------   
GoogleAuthLogin
---------------------------------------- */ 
  /**
   * @type {function} googleAuthLogin - Trigger of login popup, Response will give an OAuth2 authorization code.
  */
  const googleOAuth2Login = () => {
   googleAuthCodeLogin().then((response) => {
     console.log("Handle the response", response)
    })
  }
    /* *********************************************************************************
    please Add the following HTML element calling this function.
    This will trigger the opening of login popup, 
    response will have an OAuth2 authorization code'.

    <script setup>
     import { googleOAuth2Login as login } from '@/composables/vue3LoginComposables'; 
    </script>
    <template>
      <button @click="login">Login Using Google</button>
    </template>
    ********************************************************************************* */
  
/* ----------------------------------------   
GoogleTokenLogin
---------------------------------------- */ 
  /**
   * @type {function} googleTokenLogin - Trigger of login popup, Response will give Access Token instead of Auth code.
  */
  const googleAccessTokenLogin = () => {
    googleTokenLogin().then((response) => {
    console.log("Handle the response", response)
   })
  }
   /* *********************************************************************************
   please Add the following HTML element calling this function.
   This will trigger the opening of login popup, 
   response will have an OAuth2 authorization code'.

    <script setup>
     import { googleAccessTokenLogin as login } from '@/composables/vue3LoginComposables'; 
    </script>
    <template>
      <button @click="login">Login Using Google</button>
    </template>
   ********************************************************************************* */

export { googleLoginCallback, googlelogout, googleOnTapListener, googleOAuth2Login, googleAccessTokenLogin};
