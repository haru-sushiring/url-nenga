var url = location.href;
var urlPath = url.replace("https://nenga.sushiringblog.com/test.php/", "");
console.log(urlPath);

var clipboard = new ClipboardJS(".copy_btn");
clipboard.on("success", function (e) {
  jQuery(".copy_btn").addClass("copied");
  jQuery(".copy_btn span").text("コピーしました");
  jQuery(".copy_text").slideDown("slow");
});
clipboard.on("error", function (e) {
  jQuery(".copy_btn").addClass("copied not-copied");
  jQuery(".copy_btn span").text("コピーできませんでした");
  jQuery(".copy_text").slideDown("slow");
});

jQuery("#copy_textbox").on("click", function (e) {
  e.target.setSelectionRange(0, e.target.value.length);
});

//Realtime Database
var database = firebase.database();
var imageUrl = database.ref("public/" + urlPath);
console.log(imageUrl);

var imageName;
var storageRef = firebase.storage().ref();

var DownloadURL;

imageUrl.on("value", function (snapshot) {
  // imageName = snapshot.child("imageName").val();
  // imageName = snapshot.key;
  // var Path = urlPath + "/imageName";
  // console.log(Path);
  imageName = snapshot.child("imageName").val();
  console.log(imageName);
  // console.log(snapshot.val()); 配列で出力される{imageName: "js.png"}
  console.log(urlPath);

  const DownloadTask = storageRef.child("image/" + urlPath + "/" + imageName);
  //  .put(file, metadata);
  DownloadTask.getDownloadURL().then((downloadURL) => {
    DownloadURL = downloadURL;
    document.getElementById("image").src = downloadURL;
    return DownloadURL;
  });
});
// console.log(imageName); 出力できない(undefined)

console.log("出力できた");

// file.name

//画像切り替え
// $("#image").on("click", function () {
//   if ($(this).hasClass("change")) {
//     $(this).attr("src", document.getElementById("image").src);
//     $(this).toggleClass("change");
//   } else {
//     $(this).attr("src", "../nenga.jpg");
//     $(this).toggleClass("change");
//   }
// });

// const img = document.querySelector("#image");
// img.addEventListener(
//   "click",
//   () => {
//     if (!img.classList.contains("back")) {
//       img.classList.add("back");
//       img.src = "../nenga.jpg";
//     } else {
//       img.classList.add("back");
//       img.src = DownloadURL;
//     }
//   },
//   false
// );

function imgChange() {
  if (!img.classList.contains("back")) {
    img.classList.add("back");
    img.src = "../../nenga.jpg";
  } else {
    img.classList.remove("back");
    img.src = DownloadURL;
  }
}
const img = document.getElementById("image");
img.addEventListener("click", imgChange, false);

// function modifyText() {
//   const t2 = document.getElementById("t2");
//   if (t2.firstChild.nodeValue == "three") {
//     t2.firstChild.nodeValue = "two";
//   } else {
//     t2.firstChild.nodeValue = "three";
//   }
// }
// const el = document.getElementById("outside");
// el.addEventListener("click", modifyText, false);

// var preview = document.getElementById("preview");
//     preview.remove();
//     var display = document.getElementById("disN-1");
//     display.id = "disB";