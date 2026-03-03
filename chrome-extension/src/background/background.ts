/// <reference types="chrome"/>

console.log("Background script running...");

import { sessionCallbacks } from "./session";

chrome.runtime.onInstalled.addListener(({ reason }) => {
console.log("Extension installed or updated. Reason:", reason);
  chrome.contextMenus.create({
    id: "openSidePanel",
    title: "Open side panel",
    contexts: ["all"],
  });
});

chrome.contextMenus.onClicked.addListener((info: any, tab: any) => {
  if (info.menuItemId === "openSidePanel") {
    chrome.sidePanel
      .open({ tabId: tab?.id })
      .catch((error) => console.error(error));
  }
});

sessionCallbacks();
chrome.commands.onCommand.addListener((command) => {
  if (command === "open-side-panel") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs: any) => {
      if (tabs.length > 0) {
        chrome.sidePanel.open({ tabId: tabs[0].id });
      }
    });
  }
});

chrome.omnibox.onInputStarted.addListener(function () {
  console.log("💬 onInputStarted");

  chrome.omnibox.setDefaultSuggestion({
    description:
      "Here is a default <match>suggestion</match>. <url>It's <match>https://vessel-dev-int.smacerp.com/mdm/vessels</match> here</url>",
  });
});

chrome.omnibox.onInputChanged.addListener(function (text: any, suggest: any) {
  console.log("✏️ onInputChanged: " + text);
  const defaults: any = [
    {
      content: `vesselSearch | ${text}`,
      description: `search ${text} in vessels`,
      deletable: true,
    },
    {
      content: `fleetSearch | ${text}`,
      description: `search ${text} in fleets`,
      deletable: true,
    },
  ];
  suggest(defaults);
});
chrome.omnibox.onInputEntered.addListener(function (
  text: any,
  disposition: any,
) {
  console.log(
    `✔️ onInputEntered: text -> ${text} | disposition -> ${disposition}`,
  );
  // open google search with the entered text
  const [command, query] = text.split(" | ");
  if (command === "vesselSearch") {
    chrome.tabs.update({
      url: `https://vessel-dev-int.smacerp.com/mdm/vessel/bulk-assignment?departmentId=0196f6d2-50a8-7828-a5c6-6bc7c2de8921&businessUnitId=01971a9d-8671-7488-aef3-77a061744d8e&fleetId=92aff729-8c99-431a-9121-9526c8cf02db&search=${encodeURIComponent(query)}`,
    });
  } else if (command === "fleetSearch") {
    chrome.tabs.update({
      url: `https://www.google.com/search?q=${encodeURIComponent(query)}+fleet`,
    });
  }
});

const sidebarHelper = async (tabId: number) => {
      const tab = await chrome.tabs.get(tabId);
  if(!tab.url) return;
  const tabUrl = new URL(tab.url);
    if (tabUrl.hostname === "vessel-dev-int.smacerp.com") {
        await chrome.sidePanel.setOptions({ enabled: true });
        chrome.contextMenus.update("openSidePanel", { visible: true, enabled: true });
    } else { 
        await chrome.sidePanel.setOptions({ enabled:false });
        chrome.contextMenus.update("openSidePanel", { visible: false, enabled: false });
    }
}

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete") {
    console.log("Tab updated:", tab, tabId);
    // You can also check the URL or other properties of the tab here
  }
    await sidebarHelper(tabId);
});

chrome.tabs.onActivated.addListener(async (activeInfo) => {
    console.log("Tab activated:", activeInfo);
    await sidebarHelper(activeInfo.tabId);
});
