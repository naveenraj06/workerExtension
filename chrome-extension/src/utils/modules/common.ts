export const getLocalData = async (key: string) => {
  if (!chrome?.storage?.local) {
    throw new Error("Chrome storage not available");
  } else {
    return await chrome.storage.local.get(key).then((result) => {
      console.log(`Data retrieved for key "${key}":`, result[key]);
      return result[key];
    }).catch((error) => {
      console.error(`Error retrieving data for key "${key}":`, error);
      return null;
    });
  }
};

export const setLocalData = async (key: string, value: any) => {
  if (!key || value === undefined) return;
  if (!chrome?.storage?.local) {
    throw new Error("Chrome storage not available");
  } else {
    chrome.storage.local.set({ [key]: value }).then(() => {
      console.log(`Data set for key "${key}":`, value);
    }).catch((error) => {
      console.error(`Error setting data for key "${key}":`, error);
    });
  }
};

export const removeLocalData = async (key: string) => {
  if (!key) return;
  if (!chrome?.storage?.local) {
    throw new Error("Chrome storage not available");
  } else {
    chrome.storage.local.remove(key);
  }
};

export const toggleSidePanel = async () => {
  chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
    if (!tabs.length || tabs[0].id === undefined) return;

    const tabId = tabs[0].id;
    const sidepanelActiveTab: any = await getLocalData("sidepanelActiveTab");
    const isOpen = sidepanelActiveTab === tabId;
    console.log(
      "Toggling side panel. Current active tab in side panel:",
      sidepanelActiveTab,
      tabId,
      "Is open:",
      isOpen,
    );

    if (isOpen) {
      // Close side panel
      await chrome.sidePanel.setOptions({
        enabled: false,
      });

      await removeLocalData("sidepanelActiveTab");
    } else {
      // Enable + Open side panel
      await chrome.sidePanel.setOptions({
        enabled: true
      });
      console.log("Opening side panel for tabId:", tabId);
      await chrome.sidePanel.open({ tabId });

      await setLocalData("sidepanelActiveTab", tabId);
    }
  });
};
