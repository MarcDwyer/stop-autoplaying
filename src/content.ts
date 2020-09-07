import { RequestTypes } from "./request_types";
console.log(document);

let isBlacklist = false;

window.addEventListener("load", () => {
  const { origin } = new URL(document.location.href);
  console.log(`sending: ${origin}`);
  chrome.runtime.sendMessage({ type: RequestTypes.blacklist, url: origin });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if ("blacklisted" in request) {
    isBlacklist = request["blacklisted"];
  }
});
