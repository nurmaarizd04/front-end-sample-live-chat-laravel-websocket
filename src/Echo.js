import Echo from "laravel-echo";
window.Pusher = require("pusher-js");

window.Echo = new Echo({
  broadcaster: "pusher",
  key: "dbee8aba2e0aaac44e24", // Ganti dengan PUSHER_APP_KEY
  cluster: "ap1", // Ganti dengan PUSHER_APP_CLUSTER
  forceTLS: true,
});

export default window.Echo;
