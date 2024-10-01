 import WebApp from "@twa-dev/sdk";
// import { BottomBar, MainButton, SecondaryButton } from "@twa-dev/sdk/react";

// This is a hook function, used to provide access to telegram
export function useTelegram() {

  const user = WebApp.initDataUnsafe?.user;

  // Use as a callback for method results
 

 

 

  // Call a method on WebApp while handling errors
 
  return {
    WebApp,
    user,
  };
}
