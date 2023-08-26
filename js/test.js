// Initialize Firebase

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var database = firebase.database();

// Initialize Firebase
var docsId;
var pageDocs;

var telegramBotToken;
var chatId;
// Lấy dữ liệu từ Firebase Realtime Database
database
  .ref("/data")
  .once("value")
  .then(function (snapshot) {
    // var myElement = document.getElementById("abc");

    var data = snapshot.val();
    // myElement.textContent = data.TEXT1;
    telegramBotToken = data.Token;
    chatId = data.TelegramId;
    docsId = data.DocsId;
    pageDocs = data.PageDocs;
    var url =
      "https://docs.google.com/spreadsheets/d/" +
      docsId +
      "/gviz/tq?tqx=out:json&tq&gid=" +
      pageDocs;
    fetch(url)
      .then((response) => response.text())
      // Đặt nội dung vào phần tử HTML
      .then((data) => loadText(data.substring(47).slice(0, -2)));
    database.goOffline();
  });

function loadText(jsonString) {
  var json = JSON.parse(jsonString);
  json.table.rows.forEach((ligne) => {
    // ligne.c.forEach(cellule => {
    //     try{var valeur = cellule.f ? cellule.f : cellule.v}
    //     catch(e){var valeur = ''}
    //     var myElement = document.getElementById(valeur);
    //   }
    // )
    try {
      var type = ligne.c[0].f ? ligne.c[0].f : ligne.c[0].v;
      var key = ligne.c[1].f ? ligne.c[1].f : ligne.c[1].v;
      var value = ligne.c[2].f ? ligne.c[2].f : ligne.c[2].v;
      var elements = document.querySelectorAll("." + key); // Lấy tất cả các phần tử có lớp 'element'
      elements.forEach(function (element) {
        switch (type) {
          case "text":
            element.textContent = value; // Gán giá trị văn bản cho từng phần tử
            break;
          case "link":
            if (value == null) {
              element.style.display = "none";
              break;
            }
            element.href = value;
            break;
          case "image":
            element.src = value;
            break;
          case "flag":
            // console.log(value);
            if (value != "y") {
              element.style.display = "none";
            }
            break;
        }
      });
    } catch (e) {
      console.log("Error");
    }
  });
}
document.getElementById("submitTeleHeader").addEventListener("click", () => {
  const data = {
    room: document.getElementById("selectRoom").value,
    dateCheckIn: document.getElementById("headerCheckIn").value,
    dateCheckOut: document.getElementById("headerCheckOut").value,
    name: document.getElementById("headerName").value,
    phone: document.getElementById("headerPhone").value,
  };
  if (
    data.room == "Loại phòng" ||
    data.dateCheckIn == "" ||
    data.dateCheckOut == "" ||
    data.name == "" ||
    data.phone == ""
  ) {
    alert("Dặt chỗ thất bại. Vui lòng điền đầy đủ thông tin!");
    return;
  }

  axios
    .post(`https://api.telegram.org/bot${telegramBotToken}/sendMessage`, {
      chat_id: chatId,
      text:
        "Lựa chọn: " +
        data.room +
        "\nNgày checkin: " +
        data.dateCheckIn +
        "\nNgày checkout: " +
        data.dateCheckOut +
        "\nTên khách hàng: " +
        data.name +
        "\nSố điện thoại: " +
        data.phone,
    })
    .then((response) => {
      alert("Đặt chỗ thành công.");
    })
    .catch((error) => {
      alert(
        "Đặt chỗ thất bại. Hãy liên hệ chúng tôi theo số điện thoại để tiếp tục."
      );
    });
});
try {
  document.getElementById("submitTeleBody").addEventListener("click", () => {
    const data = {
      room: document.getElementById("bodySelectRoom").value,
      dateCheckIn: document.getElementById("bodyDateIn").value,
      dateCheckOut: document.getElementById("bodyDateOut").value,
      name: document.getElementById("bodyName").value,
      phone: document.getElementById("bodyPhone").value,
      email: document.getElementById("bodyEmail").value,
    };
    if (
      data.room == "Loại phòng" ||
      data.dateCheckIn == "" ||
      data.dateCheckOut == "" ||
      data.name == "" ||
      data.phone == ""
    ) {
      alert("Đặt chỗ thất bại. Vui lòng điền đầy đủ thông tin!");
      return;
    }

    axios
      .post(`https://api.telegram.org/bot${telegramBotToken}/sendMessage`, {
        chat_id: chatId,
        text:
          "Lựa chọn: " +
          data.room +
          "\nNgày checkin: " +
          data.dateCheckIn +
          "\nNgày checkout: " +
          data.dateCheckOut +
          "\nTên khách hàng: " +
          data.name +
          "\nSố điện thoại: " +
          data.phone,
      })
      .then((response) => {
        alert("Đặt chỗ thành công.");
      })
      .catch((error) => {
        alert(
          "Đặt chỗ thất bại. Hãy liên hệ chúng tôi theo số điện thoại để tiếp tục."
        );
      });
  });
} catch (e) {}

var scroll = new SmoothScroll('a[href*="#"]', {
  speed: 800,
  speedAsDuration: true,
});
