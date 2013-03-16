var firstRequest = true;
function startRequest() {
	UpdateIfReady(firstRequest);
	firstRequest = false;
	window.setTimeout(startRequest, 60000);
}

if (localStorage["HN.Notifications"] == null) {
  var notification = webkitNotifications.createHTMLNotification("initialNotification.html");
  notification.show();
  localStorage["HN.Notifications"] = false;
}
//If any options are not already set, they will be set to defaults here
SetInitialOption("HN.RequestInterval", 1200000);
SetInitialOption("HN.BackgroundTabs", false);

startRequest();
