
// function isOnMainPage() {
//   const url = window.location.href;
//   const mainPagePattern = /^https:\/\/www\.youtube\.com\/$/;
//   return mainPagePattern.test(url);
// }

// function hideWatchedVideos(isEnabled) {
//   if (isOnMainPage()) {

//     const videoThumbnails = document.querySelectorAll('#dismissible');

//     videoThumbnails.forEach((thumbnail) => {
//       const progress = thumbnail.querySelector('#progress');
//       if (progress && parseInt(progress.style.width) > 70) {
//         thumbnail.style.display = 'none';
//       }
//     });
//   } else {
//     return;
//   }
// }


// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//   if (request.action === 'toggleEnabled') {
//     hideWatchedVideos(request.isEnabled);
//   }
// });


// // Run the function on page load
// hideWatchedVideos(isEnabled);

// // Run the function when the page's DOM is updated
// const observer = new MutationObserver(() => {
//   hideWatchedVideos();
// });

// observer.observe(document.body, { childList: true, subtree: true });

function isOnMainPage() {
  const url = window.location.href;
  const mainPagePattern = /^https:\/\/www\.youtube\.com\/$/;
  return mainPagePattern.test(url);
}

function hideWatchedVideos(isEnabled) {
  if (isEnabled && isOnMainPage()) {
    const videoThumbnails = document.querySelectorAll('#dismissible');

    videoThumbnails.forEach((thumbnail) => {
      const progress = thumbnail.querySelector('#progress');
      if (progress && parseInt(progress.style.width) > 70) {
        thumbnail.style.display = 'none';
      }
    });
  } else {
    return;
  }
}

browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'toggleEnabled') {
    hideWatchedVideos(request.isEnabled);
  }
});

// Helper function to get isEnabled value and run hideWatchedVideos
async function runWithIsEnabled() {
  const response = await browser.runtime.sendMessage({ action: 'getIsEnabled' });
  hideWatchedVideos(response.isEnabled);
}

// Run the function on page load
runWithIsEnabled();

// Run the function when the page's DOM is updated
const observer = new MutationObserver(() => {
  runWithIsEnabled();
});

observer.observe(document.body, { childList: true, subtree: true });
