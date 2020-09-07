import { RequestTypes, IsBlacklisted } from "./request_types";

// Listen to messages sent from other parts of the extension.
const blacklist = new Map<string, boolean>();

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // onMessage must return "true" if response is async.
  let isResponseAsync = false;

  if (request.popupMounted) {
    console.log("eventPage notified that Popup.tsx has mounted");
  }
  console.log(request);
  if ("type" in request && sender.tab && sender.tab.id) {
    const { url } = request as IsBlacklisted;
    switch (request["type"]) {
      case RequestTypes.blacklist:
        chrome.tabs.sendMessage(
          sender.tab.id,
          { blacklisted: blacklist.has(url) },
        );
    }
  }
  return isResponseAsync;
});
