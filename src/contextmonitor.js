chrome.runtime.sendMessage({
  iconContext: {
    onSite: window.location.href.toLowerCase().includes('thingiverse'),
    darkMode: window.matchMedia('(prefers-color-scheme: dark)').matches,
  },
});
