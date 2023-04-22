
// Initialize Firebase

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var database = firebase.database();

  // Initialize Firebase
  var telegramBotToken;
  var chatId;
  // Lấy dữ liệu từ Firebase Realtime Database
  database.ref('/data').once('value').then(function(snapshot) {
    var myElement = document.getElementById("abc");

    var data = snapshot.val();
    myElement.textContent = data.TEXT1;
    telegramBotToken = data.Token;
    chatId = data.TelegramId;
    database.goOffline();
    // Đặt nội dung vào phần tử HTML
  });
document.getElementById('submitTele').addEventListener('click', () => {
  const data = {
    message: 'This is a message sent from my website'
  };
  
  axios.post(`https://api.telegram.org/bot${telegramBotToken}/sendMessage`, {
    chat_id: chatId,
    text: data.message
  })
  .then((response) => {
    console.log('Message sent successfully:', response.data);
  })
  .catch((error) => {
    console.error('Error sending message:', error);
  });
});

var scroll = new SmoothScroll('a[href*="#"]', {
  speed: 800,
  speedAsDuration: true
});