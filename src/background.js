let isEnabled = true;

browser.browserAction.onClicked.addListener(() => {
  isEnabled = !isEnabled;
  const iconPath = isEnabled ? 'icon-enabled.png' : 'icon-disabled.png';
  browser.browserAction.setIcon({ path: iconPath });

  browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
    browser.tabs.sendMessage(tabs[0].id, { action: 'toggleEnabled', isEnabled: isEnabled });
  });
});

browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getIsEnabled') {
    sendResponse({ isEnabled: isEnabled });
  }
});