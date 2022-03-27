// Injected into Thingiverse and forwards a message when loading/unloading.
window.onload = () => {
  chrome.runtime.sendMessage({onSite: true});
}

window.onbeforeunload = () => {
  chrome.runtime.sendMessage({onSite: false});
}