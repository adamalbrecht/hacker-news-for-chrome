document.addEventListener("DOMContentLoaded", function(){
  restoreOptions();
  document.getElementById("SaveButton").addEventListener('click', saveOptions, false);
});

var selectReqInterval;
var radioBackgroundTabs;

function initVariables() {
  selectReqInterval = document.getElementById("RequestInterval");
  radioBackgroundTabs = document.getElementsByName("BackgroundTabs");
}

function restoreOptions() {
  initVariables();
  var reqInterval = localStorage["HN.RequestInterval"];
  for (var i=0; i<selectReqInterval.children.length; i++) {
    if (selectReqInterval[i].value == reqInterval) {
      selectReqInterval[i].selected = "true";
      break;
    }
  }
  var backgroundTabs = localStorage["HN.BackgroundTabs"];
  for (var i=0; i<radioBackgroundTabs.length; i++) {
    if (radioBackgroundTabs[i].value == backgroundTabs) {
      radioBackgroundTabs[i].checked = "true";
    }
  }
}

function saveOptions() {
  var interval = selectReqInterval.children[selectReqInterval.selectedIndex].value;
  localStorage["HN.RequestInterval"] = interval;

  for (var i=0; i<radioBackgroundTabs.length; i++) {
    if (radioBackgroundTabs[i].checked) {
      localStorage["HN.BackgroundTabs"] = radioBackgroundTabs[i].value;
      break;
    }
  }
}

