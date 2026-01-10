import React, { useEffect } from "react";
import Routes from "./Routes";
import { initPushNotifications, listenForPushMessages } from "./utils/pushNotifications";
import { saveFcmToContact } from "./utils/saveFcmToContact";

function App() {
  useEffect(() => {
    async function initPush() {
      const token = await initPushNotifications();
      listenForPushMessages();

      if (token) {
        // TODO: replace this with real contact id from UI later
        const PRIMARY_CONTACT_ID = "1";
        await saveFcmToContact(PRIMARY_CONTACT_ID, token);
      }
    }

    initPush();
  }, []);

  return <Routes />;
}

export default App;
