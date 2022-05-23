var imageUrl;
var imageName;
var imageCheck;
var date = JSClock();

function JSClock() {
  var time = new Date();
  var year = time.getFullYear();
  var month = time.getMonth();
  var date = time.getDate();
  var hour = time.getHours();
  var minute = time.getMinutes();
  var second = time.getSeconds();
  var Milliseconds = time.getMilliseconds();
  var temp =
    String(year) +
    String(month + 1) +
    String(date) +
    String(hour) +
    String(minute) +
    String(second) +
    String(Milliseconds);
  console.log(temp);
  return temp;
}

async function hash() {
  async function digestMessage(message) {
    const encoder = new TextEncoder();
    const data = encoder.encode(message);
    const hash = await crypto.subtle.digest("SHA-256", data);
    console.log(hash);
    const hashArray = Array.from(new Uint8Array(hash));
    const hashHex = hashArray
      .map((b) => b.toString(36).padStart(1, "0"))
      .join("");
    return hashHex;
  }

  console.log(date);
  const digestBuffer = await digestMessage(date);
  console.log(digestBuffer);
  return digestBuffer;
}

async function hashUrl() {
  hash()
    .then((digestBuffer) => {
      console.log(digestBuffer);
      console.log("とりあえずURLを作ります");
      const url =
        "https://nenga.sushiringblog.com/test.php" + "/" + digestBuffer;
      console.log(url);
      var target = document.getElementById("url");
      target.href = url;
      console.log(target.href);

      //Realtime Database
      var database = firebase.database();
      imageUrl = database.ref("public/" + digestBuffer);
      console.log(imageUrl);
      return imageUrl;
    })
    .then((imageUrl) => {
      var flg = 0;
      var urlCheck = false;
      imageUrl.on("value", async function (snapshot) {
        imageName = await snapshot.child("imageName").val();
        console.log(imageName);
        if (!imageName && flg === 0) {
          console.log("正常に保存可能です");
          flg = 1;
          urlCheck = true;
        }
        if (!urlCheck) {
          date = JSClock();
          hashUrl();
          console.log("ファイルがありました");
        }
      });
      //awaitで遅れるのでflgとurlCheckは更新されない
      console.log(flg);
      console.log(urlCheck);
    });
}


hashUrl();
console.log("testです");

// if (!imageName) {
//   console.log("正常に保存可能です");
// } else {
//   // date = JSClock();
//   // hashUrl();
//   console.log("ファイルがありました");
// }

// try {
//   imageUrl.on("value", function (snapshot) {
//     imageName = snapshot.child("imageName").val();
//   });
//   //一意なURLが被ったのでやり直し
//   check();
// } catch (e) {}

// fetchURL(url);
// // return f, url;
// if (f === 1) {
//   var target = document.getElementById("url");
//   target.href = url;
//   console.log(target.href);
//   // break; Uncaught SyntaxError: Illegal break statement
// } else if (f === 0) {
//   console.log("ハッシュ化やり直し");
//   // break; Uncaught SyntaxError: Illegal break statement
// } else {
// }

// function check() {}
// check();

// function fetchURL(url) {
//   fetch(url)
//     .then((response) => {
//       console.log(response.status);
//       // エラーレスポンスが返されたことを検知する
//       if (!response.ok) {
//         //urlが存在しないので、処理を終了
//         console.log("成功", response);
//         f = 1;
//         return f;
//       } else {
//         //urlが存在するので、hash化をやり直し
//         console.log("やり直し", response);
//         f = 0;
//         return f;
//       }
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// }