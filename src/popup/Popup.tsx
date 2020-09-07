import React, { useEffect } from "react";
import "./Popup.scss";

type Props = {
  tabs: chrome.tabs.Tab[];
};
export default function Popup(p: Props) {
  useEffect(() => {
    // Example of how to send a message to eventPage.ts.
    console.log("is this still on");
    chrome.runtime.sendMessage({ popupMounted: true });
    // setTimeout(() => {
    //   chrome.runtime.sendMessage("is this live");
    // }, 5000);
  }, []);
  console.log("is this gamer");
  return <div className="popupContainer">Does t123123112?</div>;
}
