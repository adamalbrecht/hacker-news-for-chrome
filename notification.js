function SetupNotification() {
    var link = JSON.parse(localStorage['HN.Link0']);
    var storyLink = document.getElementById("StoryLink");
    storyLink.href = link.Link;
    storyLink.innerText = link.Title;
    storyLink.addEventListener("click", openLinkFront);

    var commentsLink = document.getElementById("CommentsLink");
    commentsLink.href = link.CommentsLink;
    commentsLink.addEventListener("click", openLinkFront);

    setTimeout(function() {
        window.close();
    }, 10000);
}

document.addEventListener('DOMContentLoaded', function () {
  SetupNotification();
});