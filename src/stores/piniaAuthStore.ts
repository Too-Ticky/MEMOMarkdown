/*
This Pinia store is selected 'setup function' syntax that is similar to the Vue Composition API.
*/
import { defineStore } from 'pinia';
import { ref, reactive, computed, type ComputedRef, } from 'vue';
import type { User } from 'firebase/auth';

interface TypeError {
  code: number | string | null,
  msg1: string | null,
  msg2: string | null,
  email: string | null,
 }

interface TypeUserInfo {
  displayName: string | null;
  email: string | null;
  phoneNumber: string | null;
  photoURL: string | null;
  providerId: string | null;
  uid: string | null;
}


export const useAuthStore = defineStore('authState', () => 
  { /* Store Definitions Here */
    /* "States"
      The following reactive variables with ref() or reactive() 
      correspond to "state" in "Option Object" syntax that is similar to the vue Options API. 
    */
    
    const currentUser = ref<User|null|undefined>(null);

    const usrInfo: TypeUserInfo = reactive({
      displayName: '',
      email: '',
      phoneNumber: '',
      photoURL: '',
      providerId: '',
      uid: '',
    });
    const token = ref<string|number|null|undefined>('');

    const isLoading = ref<boolean>(false);
    const authError: TypeError = reactive({
        code: '',
        msg1: '',
        msg2: '',
        email: '',
    });

    /* "Getters"
      The following variables having computed()
      coresspoind to "Getters" in "Option Object" syntax that is similar to the vue Options API. 
    */
      // Variables having computed() as needed here. (e.g. const a:number = computed(a*2))
      // const displayName :string = computed (currentUser.value.displayName);
    const displayName : ComputedRef<string> = computed(() => {
      return currentUser.value?.displayName  || '';
    });
    const uid : ComputedRef<string> = computed(() => {
      return currentUser.value?.uid  || '';
    });

    /* "Actions"
      The following functions correspond to "actions" in "Option Object" syntax. 
    */
    function setUsrInfo() {
      if (currentUser.value?.displayName) { usrInfo.displayName = currentUser.value.displayName;}
      
      usrInfo.email = currentUser.value?.email || null;
      usrInfo.phoneNumber = currentUser.value?.phoneNumber || null;
      usrInfo.photoURL = currentUser.value?.photoURL || null;
      usrInfo.providerId = currentUser.value?.providerId || null;
      usrInfo.uid = currentUser.value?.uid || null;
    }
      /*  Note
        '$reset()' method may be better than the clearing functions as follow.
        However, when states as pinia plugin is added in the future, it becomes out of scope of $reset().
        Therefore, it is decired that the variables are listed explicitly individually here at the moment.
      */
    function clearState() {
      currentUser.value = null;
      usrInfo.displayName = null;
      usrInfo.email = null;
      usrInfo.phoneNumber = null;
      usrInfo.photoURL = null;
      usrInfo.providerId = null;
      usrInfo.uid = null;
      // displayName.value = null;
      isLoading.value = false;
      token.value = '';
      authError.code = '';
      authError.msg1 = '';
      authError.msg2 = '';
      authError.email = '';
    }

    function clearError() {
      authError.code = '';
      authError.msg1 = '';
      authError.msg2 = '';
      authError.email = '';
    }

    /* Show of states for debugging */
    function showUsrInfo() {
      if(isLoading.value !== null)     {console.log('isLoading:    ', isLoading.value);    }
      if(currentUser.value !== null)   {console.log('currentUser:\n', currentUser.value);  }
      if(token.value !== null)         {console.log('token:\n      ', token.value);        }
      if(usrInfo.displayName !== null) {console.log('displayName:  ', usrInfo.displayName);}
      if(usrInfo.email !== null)       {console.log('email:        ', usrInfo.email);      }
      if(usrInfo.phoneNumber !== null) {console.log('phoneNumber:  ', usrInfo.phoneNumber);}
      if(usrInfo.photoURL !== null)    {console.log('photoURL:     ', usrInfo.photoURL);   }
      if(usrInfo.providerId !== null)  {console.log('providerIdg:  ', usrInfo.providerId); }
      if(usrInfo.uid !== null)         {console.log('uid:          ', usrInfo.uid);        }
    }

    function showError() {
      if(authError.code !== null)    {console.log('authError.code:', authError.code);  }
      if(authError.msg1 !== null)    {console.log('authError.code:', authError.msg1);  }
      if(authError.msg2 !== null)    {console.log('authError.code:', authError.msg2);  }
      if(authError.email !== null)   {console.log('authError.code:', authError.email); }
    }

    return { 
      currentUser, usrInfo, isLoading, authError, token, 
      displayName, uid,
      setUsrInfo, clearState, clearError, showUsrInfo,showError
    };
  },

  { /* "pinia-plugin-persistedstate" Configration Here  */
    persist: false,
  },
);

