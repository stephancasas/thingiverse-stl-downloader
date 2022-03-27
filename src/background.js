const getIconPath = (variant) => {
  return [128, 48, 32, 16].reduce((acc, cur) => {
    acc[`${cur}`] = `/images/${variant}--${cur}.png`;
    return acc;
  }, {});
};

const listenForIconContextInExtension = () => {
  let darkModeEnabled;
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request) {
      if (request.darkModeEnabled === true || request.darkModeEnabled === false) {
        darkModeEnabled = request.darkModeEnabled
      } else if (request.onSite === true) {
        chrome.action.setIcon({
          path: getIconPath('active'),
          tabId: sender.tab.id,
        });
      } else if (request.onSite === false) {
        const shade = darkModeEnabled ? 'dark' : 'light';
        chrome.action.setIcon({
          path: getIconPath(`idle--${shade}`),
          tabId: sender.tab.id,
        });
      }
    }
    // To prevent runtime errors, we provide these responses/returns.
    sendResponse();
    return true;
  });
};

const setCampaignPreferenceInExtension = () => {
  chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ campaign: true });
  });
};

// Briefly opens a helper site locally to check if Dark Mode is enabled.
const checkIfDarkModeIsEnabled = () => {
  chrome.tabs.create({
    active: false, 
    url: chrome.runtime.getURL('dark_mode_checker.html'),
  });
}

setCampaignPreferenceInExtension();
listenForIconContextInExtension();
checkIfDarkModeIsEnabled();
