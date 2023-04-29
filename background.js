let isEnabled = true;

chrome.browserAction.onClicked.addListener(() => {
  isEnabled = !isEnabled;
  // You can update the icon to indicate the extension's state
  const iconPath = isEnabled ? 'icon-enabled.png' : 'icon-disabled.png';
  chrome.browserAction.setIcon({path: iconPath});
});
