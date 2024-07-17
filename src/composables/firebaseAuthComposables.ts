/** 
 * ----------------------------------------
 * Firebase/Auth Functions' composables
 * ----------------------------------------
 * @module firebaseAuthComposables
 * @function authStateListener - [Firebase/Auth] State Listener
 * @function useGooglelSignIn - [Firebase/Auth] Sign-in with Google Account by redirecting to the sign-in page
 * @function useSignOut - [Firebase/Auth] Sign-out
*/

import { onMounted, onBeforeUnmount, ref } from 'vue';
import { storeToRefs } from 'pinia';
import * as firebaseAuth from 'firebase/auth';

/** 
 * @module firebaseInitialization - Configration,initialization and reference to the service of Firebase 
 * @see module: @/composables/firebaseInitialize
*/
import { auth } from '@/composables/firebaseInitialization'; 
// auth.languageCode = 'ja'; //To localize, update the language code on the Auth instance before starting 

/** 
 * @module piniaAuthStore - Pinia store for authentication state management 
 * @see module: @/stores/piniaAuthState
*/
import { useAuthStore } from '@/stores/piniaAuthStore' 

/* Vue-router */
import { useRouter, } from 'vue-router';



/** 
 * ----------------------------------------
 * Firebase/Auth State Listener
 * ----------------------------------------
 * @function authStateListener - Mount of State Listener
*/
export function  authStateListener ()  {
  const authStore = useAuthStore();
  const { currentUser, isLoading, } = storeToRefs(authStore);
  const { clearState, setUsrInfo, } = authStore;
  const router = useRouter();
  const currentPath = ref<string | null>(null);

  clearState();
  onMounted(() => {
    isLoading.value = true;
    firebaseAuth.onAuthStateChanged(auth, (user: firebaseAuth.User | null) => {
      /* Set state observer. It gets 'user' data in case of Login state. */
      if (user != null) {
        /* User is signed in */
        currentUser.value = user;
        console.log('(authStateListener) Current User is: ', currentUser.value);
        setUsrInfo();
        router.push({path:'/editor'});
        console.log("router.push to /editor");
      } else {
        /* User is signed out */
        currentUser.value = null;
        console.log('(authStateListener) User is not login: ', currentUser.value);
        setUsrInfo();
        
        currentPath.value = router.currentRoute.value.path;
        console.log('(authStateListener) Current Path: ', currentPath.value);
        if ((currentPath.value !== '/tou') && (currentPath.value !== '/privacy')) {
          router.push({path:'/welcome'});
          console.log("router.push to /welcome");
        }
      }
    });
    isLoading.value = false;
  });
  onBeforeUnmount(() => {
    console.log("Unmounted");
    useSignOut();
    clearState();
  });
}


/** 
 * ----------------------------------------
 * Firebase/Auth Google Sign-In (redirect)
 * ----------------------------------------
 * @function useGooglelSignIn - [Firebase/Auth] Sign-in with Google Account by redirecting to the sign-in page
*/
export function useGooglelSignIn() {
  const authStore = useAuthStore();
  const { isLoading,token, authError, } = storeToRefs(authStore);
  const { clearError } = authStore;

  const provider = new firebaseAuth.GoogleAuthProvider();

  console.log('(useGoogleSignIn)Started')
  isLoading.value = true;

  firebaseAuth.signInWithPopup(auth, provider)
  // firebaseAuth.signInWithRedirect(auth, provider)
  .then((result) => {
    const credential = firebaseAuth.GoogleAuthProvider.credentialFromResult(result);
    if (credential !== null) {
      token.value = credential.accessToken;
      console.log('result:',result)
      clearError();
    }    
  }) 
  .catch((error) => {
    authError.value.code = error.code;
    authError.value.msg1 = 'Incorrect Google Sign-in credentials.';
    authError.value.msg2 = error.message;
    authError.value.email = error.email;
    console.log('(useGoogleSignIn\n)',authError.value.code, authError.value.msg1, authError.value.msg2);
  });
  isLoading.value = false;
}


/** 
 * ----------------------------------------
 * Firebase/Auth Sign-Out
 * ----------------------------------------
 * @function useSignOut - Sign-Out 
*/
export function useSignOut() {
  const authStore = useAuthStore();
  const { currentUser, isLoading, authError } = storeToRefs(authStore);
  const { clearState } = authStore;

  console.log('(useSignOut)Started');
  isLoading.value = true;

  firebaseAuth.signOut(auth)
  .then(() => {
    console.log('(useSignOut)executed. See You Again.');
    console.log( currentUser.value);
    clearState();

	}).catch((error) => {
    authError.value.code = error.code;
    authError.value.msg1 = 'Incorrect SignOut process.';
    console.log('(useSignOut\n)',authError.value.code, authError.value.msg1,);
	});

  isLoading.value = false;
}

