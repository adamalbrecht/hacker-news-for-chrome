window.onload = function(){
  main();
  setupEvents();
};
function setupEvents() {
  document.getElementById("submitLink").addEventListener('click', submitCurrentTab, false);
  document.getElementById("refresh").addEventListener('click', refreshLinks, false);
  document.getElementById("options").addEventListener('click', openOptions, false);
  document.getElementById("searchbox").addEventListener('keydown', function(event) {
    if (event.which === 13) {
      search();
    }
  });
}
function main() {
  if (localStorage['HN.NumLinks'] == null) {
    buildPopupAfterResponse = true;
    UpdateFeed();
  }
  else {
    buildPopup(RetrieveLinksFromLocalStorage());
  }
}

function buildPopup(links) {
  var header = document.getElementById("header");
  var feed = document.getElementById("feed");
  var issueLink = document.getElementById("issues");
  issueLink.addEventListener("click", openLinkFront);

  //Setup Title Link
  var title = document.getElementById("title");
  title.addEventListener("click", openLink);
  
  //Setup search button
  var searchButton = document.getElementById("searchbutton");
  searchButton.addEventListener("click", search);

  for (var i=0; i<links.length; i++) {
    hnLink = links[i];
    var row = document.createElement("tr");
    row.className = "link";
    var num = document.createElement("td");
    num.innerText = i+1;
    var link_col = document.createElement("td")
    var title = document.createElement("a");
      title.className = "link_title";
      title.innerText = hnLink.Title;
      title.href = hnLink.Link;
      title.addEventListener("click", openLink);
    var comments = document.createElement("a");
      comments.className = "comments";
      comments.innerText = "(comments)";
      comments.href = hnLink.CommentsLink;
      comments.addEventListener("click", openLink);
    link_col.appendChild(title);
    link_col.appendChild(comments);
    row.appendChild(num);
    row.appendChild(link_col)
    feed.appendChild(row);
  }
  hideElement("spinner");
  showElement("container");
}

function search() {
  var searchBox = document.getElementById("searchbox");
  var keywords = searchBox.value;
  if (keywords.length > 0) {
    var search_url = "https://hn.algolia.com/?query=" + keywords.replace(" ", "+");
    openUrl(search_url, true);
  }
}

function refreshLinks() {
  var linkTable = document.getElementById("feed");
  while(linkTable.hasChildNodes()) linkTable.removeChild(linkTable.firstChild); //Remove all current links
  toggle("container");
  toggle("spinner");
  buildPopupAfterResponse = true;
  UpdateFeed();
  updateLastRefreshTime();
}

//Submit the current tab
function submitCurrentTab() {
  console.log('submitCurrentTab!');
  chrome.windows.getCurrent(function(win){
    chrome.tabs.getSelected(win.id, function(tab){
      var submit_url = "http://news.ycombinator.com/submitlink?u=" + encodeURIComponent(tab.url) + "&t=" + encodeURIComponent(tab.title);
      openUrl(submit_url, true);
    });
  });
}

