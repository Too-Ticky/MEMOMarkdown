import { googleSdkLoaded } from "vue3-google-login"

/**
 * PopUp Mode
*/



export const popupClient = () => {
  googleSdkLoaded((google) => {
    google.accounts.oauth2.initCodeClient({
      client_id: import.meta.env.VITE_GC_CLIENT_ID,
      scope: ['email', 'profile', 'openid',
              'https://www.googleapis.com/auth/calendar.readonly',
              'https://www.googleapis.com/auth/firebase.readonly' ].join(' '),
      ux_mode: 'popup',
      callback: (response) => {
        console.log("Handle the response", response)

        const xhr = new XMLHttpRequest();
        xhr.open('POST', code_receiver_uri, true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        // Set custom header for CRSF
        xhr.setRequestHeader('X-Requested-With', 'XmlHttpRequest');
        xhr.onload = function() {
          console.log('Auth code response: ' + xhr.responseText);
        };
        xhr.send('code=' + response.code);
      }
    }).requestCode()
    ;
  });
}

/**
 * Redirect Mode
 */
export const client = google.accounts.oauth2.initCodeClient({
  client_id: 'YOUR_GOOGLE_CLIENT_ID',
  scope: ['https://www.googleapis.com/auth/calendar.readonly',
          'https://www.googleapis.com/auth/firebase.readonly' ],
  ux_mode: 'redirect',
  redirect_uri: "https://your.domain/code_callback_endpoint",
  state: "YOUR_BINDING_VALUE"
});

/* 
# Google Identity Services
VITE_GC_PROJECT_NAME="MEMOMarkdown"
VITE_GC_PROJECT_ID="memomarkdown-c87fe"
VITE_GC_MESSAGING_SENDER_ID="615983428671"
VITE_GC_CLIENT_ID="903895365381-8e5h0kfslsc5pobn6h6k1phoc3u9f7qm.apps.googleusercontent.com"
*/