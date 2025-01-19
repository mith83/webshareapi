function webShareAPI(header, description, link, imgfiles = "") {
  if (imgfiles == "") {
    if (navigator.share) {
      navigator.share({title: header,text: description,url: link,})
      .then(() => console.log("Successful share"))
      .catch((error) => console.log("Error sharing", error));
    } else {
      AndroidShare.shareContent(header, description, link);
      console.log("Successful share");
    }
  } else {
    var shareData = { files: imgfiles };
    if (navigator.canShare && navigator.canShare(shareData)) {
      navigator.share({ title: header, text: description, url: link, files: imgfiles })
      .then(() => console.log("Successful share"))
      .catch((error) => console.log("Error sharing", error));
    } else {
      AndroidShare.shareContent(header, description, link, shareData);
      console.log("Successful share");
    }
  } 
}
