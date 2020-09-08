import {
  RequestTypes,
  BlacklistAction,
  IconAction,
  BlackResponse,
} from "./request_types";

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
    switch (request["type"]) {
      case RequestTypes.blacklist:
        const blkAction = request as BlacklistAction;
        const blkResp: BlackResponse = {
          type: RequestTypes.blacklist,
          isBlacklisted: blacklist.has(blkAction.url),
        };
        chrome.tabs.sendMessage(
          sender.tab.id,
          blkResp,
        );
        break;
      case RequestTypes.iconChange:
        const iconAction = request as IconAction;
        console.log(iconAction);
        chrome.browserAction.setIcon({
          path: iconAction.path,
          tabId: sender.tab.id,
        });
        break;
      default:
        console.error(`Default case hit: ${request}`);
    }
  }
  return isResponseAsync;
});
