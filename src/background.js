const getIconPath = (variant) => {
  return [128, 48, 32, 16].reduce((acc, cur) => {
    acc[`${cur}`] = `/images/${variant}--${cur}.png`;
    return acc;
  }, {});
};

const listenForIconContextInExtension = () => {
  chrome.runtime.onMessage.addListener((request, sender) => {
    if (!('iconContext' in request)) return;
    const { iconContext } = request;
    if (!!iconContext.onSite) {
      chrome.action.setIcon({
        path: getIconPath('active'),
        tabId: sender.tab.id,
      });
    } else {
      const shade = iconContext.darkMode ? 'dark' : 'light';
      chrome.action.setIcon({
        path: getIconPath(`idle--${shade}`),
        tabId: sender.tab.id,
      });
    }
  });
};

const setCampaignPreferenceInExtension = () => {
  chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ campaign: true });
  });
};

setCampaignPreferenceInExtension();
listenForIconContextInExtension();
