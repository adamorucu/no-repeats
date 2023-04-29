
function isOnMainPage() {
  const url = window.location.href;
  const mainPagePattern = /^https:\/\/www\.youtube\.com\/$/;
  return mainPagePattern.test(url);
}

function hideWatchedVideos(isEnabled) {
  if (isOnMainPage()) {

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