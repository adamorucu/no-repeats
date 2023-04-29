let isEnabled = true;

chrome.browserAction.onClicked.addListener(() => {
  isEnabled = !isEnabled;
  const iconPath = isEnabled ? 'icon-enabled.png' : 'icon-disabled.png';
  chrome.browserAction.setIcon({path: iconPath});

  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, {action: 'toggleEnabled', isEnabled: isEnabled});
  });
});
