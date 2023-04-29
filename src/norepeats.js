// function isOnMainPage() {
//   const url = window.location.href;
//   // Adjust the pattern to match the main page URL
//   const mainPagePattern = /^https:\/\/www\.youtube\.com\/$/;
//   return mainPagePattern.test(url);
// }

// function getIsEnabled(callback) {
//   chrome.runtime.sendMessage({action: 'getIsEnabled'}, callback);
// }

// function hideWatchedVideos() {
//   if (!isOnMainPage()) {
//     return;
//   }
//   getIsEnabled((response) => {
//     if (!isOnMainPage() || !response.isEnabled) {
//       return;
//     }

//   const videoThumbnails = document.querySelectorAll('#dismissible');

//   videoThumbnails.forEach((thumbnail) => {
//     const progress = thumbnail.querySelector('#progress');
//     if (progress) {
//       thumbnail.style.display = 'none';
//     }
//   });
// }
function isOnMainPage() {
  const url = window.location.href;
  const mainPagePattern = /^https:\/\/www\.youtube\.com\/$/;
  return mainPagePattern.test(url);
}

function hideWatchedVideos(isEnabled) {
  if (!isOnMainPage() || !isEnabled) {
    return;
  }

  const videoThumbnails = document.querySelectorAll('#dismissible');

  videoThumbnails.forEach((thumbnail) => {
    const progress = thumbnail.querySelector('#progress');
    if (progress) {
      thumbnail.style.display = 'none';
    }
  });
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'toggleEnabled') {
    hideWatchedVideos(request.isEnabled);
  }
});


// Run the function on page load
hideWatchedVideos();

// Run the function when the page's DOM is updated
const observer = new MutationObserver(() => {
  hideWatchedVideos();
});

observer.observe(document.body, { childList: true, subtree: true });
