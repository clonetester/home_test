
// Initialize Firebase

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var database = firebase.database();

  // Initialize Firebase

  // Lấy dữ liệu từ Firebase Realtime Database
  database.ref('/TEXT1').once('value').then(function(snapshot) {
    var myElement = document.getElementById("abc");

    var data = snapshot.val();
  
    // Đặt nội dung vào phần tử HTML
    myElement.textContent = data;
  });
  database.ref('/CarouselHead1').once('value').then(function(snapshot) {
    var myElement = document.getElementById("CarouselHead1");

    var data = snapshot.val();
  
    // Đặt nội dung vào phần tử HTML
    myElement.textContent = data;
  });
  database.goOffline();