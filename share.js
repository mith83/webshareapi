function webShareAPI(header, description, link, imgfiles = "") {
  if (imgfiles == "") {
    if (navigator.share) {
      navigator.share({title: header,text: description,url: link,})
      .then(() => console.log("Successful share"))
      .catch((error) => console.log("Error sharing", error));
    } else {
     if (window.AndroidShare) {
        AndroidShare.shareText(header, description, link);
        console.log("Successful share");
      } else {
        console.log("Share APIs are not supported")
      }
    }
  } else {
    var shareData = { files: imgfiles };
    if (navigator.canShare && navigator.canShare(shareData)) {
      navigator.share({ title: header, text: description, url: link, files: imgfiles })
      .then(() => console.log("Successful share"))
      .catch((error) => console.log("Error sharing", error));
    } else {
      if (window.AndroidShare) {
          blobToBase64(imgfiles[0]).then((base64) => {
            AndroidShare.shareFile(header, description, link, base64);
            console.log("Successful share");
          });
      } else {
          console.log("Share APIs are not supported")
      }
    }
  } 
}

function blobToBase64(blob) {
 return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result); 
    reader.onerror = reject;
    reader.readAsDataURL(blob); 
  });
}
  
