import { debounce } from "./content_utils";
import {
  IconAction,
  RequestTypes,
  BlackResponse,
  BlacklistAction,
} from "./request_types";

window.addEventListener("load", () => {
  detectVideos();
  const { origin } = new URL(document.location.href);
  console.log(`sending: ${origin}`);
  const blkAction: BlacklistAction = {
    type: RequestTypes.blacklist,
    url: origin,
  };
  chrome.runtime.sendMessage(blkAction);
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (!("type" in request)) return;

  switch (request["type"]) {
    case RequestTypes.blacklist:
      const { isBlacklisted } = request as BlackResponse;
      if (isBlacklisted) {
        stopAutoPlay();
        document.addEventListener(
          "DOMNodeInserted",
          debounce(stopAutoPlay, 450),
        );
        return;
      }
      const isAuto = true;
      console.log(isAuto);
      if (isAuto) {
        console.log("sending icon change");
        const iconChange: IconAction = {
          path: "warning_icon.png",
          type: RequestTypes.iconChange,
        };
        chrome.runtime.sendMessage(iconChange);
      }
      break;
  }
});
function detectVideos() {
  //@ts-ignore
  const videos = [...document.querySelectorAll("video")] as HTMLVideoElement[];
  let isAutoPlay = false;
  console.log(videos);
  for (const video of videos) {
    const auto = video.hasAttribute("autoplay");
    if (auto) {
      video.muted = true;
      isAutoPlay = true;
    }
  }
  return isAutoPlay;
}
function stopAutoPlay() {
  //@ts-ignore
  const videos = [...document.querySelectorAll("video")] as HTMLVideoElement[];
  for (const video of videos) {
    // do something here
  }
}
