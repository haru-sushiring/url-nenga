//const uid;
var uid;
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    // User is signed in.
    uid = user.uid;
  } else {
    // No user is signed in.
    console.log("認証error");
    error();
  }
});

//ファイルの参照例
// Points to the root reference
var storageRef = firebase.storage().ref();

// Points to 'images'
var imagesRef = storageRef.child("images");

// Points to 'images/space.jpg'
// Note that you can use variables to create child values
var fileName = "space.jpg";
var spaceRef = imagesRef.child(fileName);

// File path is 'images/space.jpg'
var path = spaceRef.fullPath;

// File name is 'space.jpg'
var name = spaceRef.name;

// Points to 'images'
var imagesRef = spaceRef.parent;

var imageName;

//html取得
const input = document.querySelector("input");
if (!input) {
  throw new Error("inputがありません！");
}

//ランダム値を生成
// import { random } from "storage3.js";
// var date = "ppp";
// var random = random(date);

//import { random } from "./storage3.js";
// var hoo = new hooclass(20);
// var val = hoo.getZ
// var val = hoo + 1;
// console.log(val); /* 20が出力される */
// var ppp = random(222);
// console.log(ppp);

// const { random } = import("./storage3.js");
// import { random } from "./storage3.js";
// var ppp = random(222);
// console.log(ppp);

input.addEventListener("click", () => {
  var preview = document.getElementById("preview");
  preview.remove();
  var display = document.getElementById("disN-1");
  display.id = "disB";
});

input.addEventListener("change", () => {
  //ファイルの取得
  const file = document.getElementById("fileButton").files[0];
  imageName = file.name;

  // Create the file metadata
  var metadata = {
    contentType: "image/*",
  };
  //const uploadTask = storageRef.child("images/" + file.name).put(file, metadata);

  // const uploadTask = storageRef
  //   .child("users/" + uid + "/" + file.name)
  //   .put(file, metadata);
  // console.log(uid);
  const uploadTask = storageRef
    .child("users/" + uid + "/" + file.name)
    .put(file, metadata);
  console.log(uid);
  if (!uid) {
    error();
  }

  uploadTask.on(
    "state_changed",
    function (snapshot) {
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Upload is " + progress + "% done");
      switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED: // or 'paused'
          console.log("Upload is paused");
          break;
        case firebase.storage.TaskState.RUNNING: // or 'running'
          console.log("Upload is running");
          break;
      }
    },
    function (error) {
      switch (error.code) {
        case "storage/unauthorized":
          // User doesn't have permission to access the object
          console.log(
            "目的の操作を行う権限がユーザーにありません。セキュリティ ルールが正しいことをご確認ください。"
          );
          error();
          break;

        case "storage/canceled":
          // User canceled the upload
          console.log("ユーザーがオペレーションをキャンセルしました。");
          break;

        case "storage/unknown":
          // Unknown error occurred, inspect error.serverResponse
          console.log("不明なエラーが発生しました。");
          break;
        default:
          console.log("error");
          break;
      }
    },
    function () {
      uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
        console.log("File available at", downloadURL);
        document.getElementById("image").src = downloadURL;
      });
    }
  );
});

//firebase/一意なurl文字列/file.name が理想
const button = document.querySelector("button");

button.addEventListener("click", () => {
  var target = document.getElementById("url");
  var filepath = target.href;
  var urlPath = filepath.replace(
    "https://nenga.sushiringblog.com/test.php/",
    ""
  );
  console.log(urlPath);

  //ファイルの取得
  const file = document.getElementById("fileButton").files[0];

  // Create the file metadata
  var metadata = {
    contentType: "image/*",
  };
  //const uploadTask = storageRef.child("images/" + file.name).put(file, metadata);

  const uploadTask = storageRef
    .child("image/" + urlPath + "/" + file.name)
    .put(file, metadata);
  console.log(uploadTask);

  var flg = 0;
  uploadTask.on(
    "state_changed",
    function (snapshot) {
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Upload is " + progress + "% done");
      switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED: // or 'paused'
          console.log("Upload is paused");
          break;
        case firebase.storage.TaskState.RUNNING: // or 'running'
          console.log("Upload is running");
          break;
      }
        if (progress === 100 && flg === 0) {
          console.log("100%です。");
          var display = document.getElementById("disN-2");
          display.id = "disB";
          console.log(display.id);
          flg = 1;
        } else {
          console.log("100%以外です。");
        }
    },
    function (error) {
      switch (error.code) {
        case "storage/unauthorized":
          // User doesn't have permission to access the object
          console.log(
            "目的の操作を行う権限がユーザーにありません。セキュリティ ルールが正しいことをご確認ください。"
          );
          break;

        case "storage/canceled":
          // User canceled the upload
          console.log("ユーザーがオペレーションをキャンセルしました。");
          break;

        case "storage/unknown":
          // Unknown error occurred, inspect error.serverResponse
          console.log("不明なエラーが発生しました。");
          break;
        default:
          console.log("error");
          break;
      }
    }
    // function () {
    //   writeImageData(urlPath, imageName);
    // },
    // function () {
    //   var display = document.getElementById("disN-2");
    //   display.id = "disB";
    // }
    // function () {
    //   uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
    //     console.log("File available at", downloadURL);
    //     document.getElementById("image").src = downloadURL;
    //   });
    // }
  );
  writeImageData(urlPath, imageName);
});

//Realtime Database
var database = firebase.database();
function writeImageData(urlPath, imageName) {
  firebase
    .database()
    .ref("public/" + urlPath)
    .set({
      imageName: imageName,
    });
  console.log("データベース処理");
}

//403エラー処理
function error() {
  var redirect_url = "/error.html" + location.search;
  if (document.referrer) {
    var referrer = "referrer=" + encodeURIComponent(document.referrer);
    redirect_url = redirect_url + (location.search ? "&" : "?") + referrer;
  }
  location.href = redirect_url;
}