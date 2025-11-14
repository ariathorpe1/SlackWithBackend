async function init() {
  try {
    const res = await fetch("https://slackclonebackendapi.onrender.com/channels");
    const channels = await res.json();
    const channelList = document.querySelector(".channel-list");

    channels.forEach(channel => {
      const btn = document.createElement("button");
      btn.classList.add("channel");
      btn.dataset.channel = channel.id;
      btn.innerText = channel.name;
      btn.addEventListener("click", () => populateMessages(channel.id));
      channelList.appendChild(btn);
    });
  } catch (err) {
    console.error(err);
  }
}

async function populateMessages(chat) {
  try {
    const messageArea = document.querySelector(".messages");
    messageArea.innerHTML = "";

    const res = await fetch(`https://slackclonebackendapi.onrender.com/messages?channelId=${chat}`);
    const messages = await res.json();

    for (const msg of messages) {
      const userRes = await fetch(`https://slackclonebackendapi.onrender.com/users?id=${msg.senderId}`);
      const user = await userRes.json();
      const sender = user[0]?.name || "Unknown";

      const div = document.createElement("div");
      div.innerHTML = `<strong>${sender}:</strong> ${msg.text}`;
      messageArea.appendChild(div);
    }
  } catch (err) {
    console.error(err);
  }
}

// extra credit: send a new message
const sendBtn = document.querySelector(".send-btn");
const input = document.querySelector(".message-input");

if (sendBtn && input) {
  sendBtn.addEventListener("click", async () => {
    const text = input.value.trim();
    if (!text) return;

    const activeChannel = document.querySelector(".channel.active")?.dataset.channel;
    if (!activeChannel) {
      alert("Select a channel first!");
      return;
    }

    const randomUser = Math.floor(Math.random() * 5) + 1;
    const newMsg = {
      text,
      senderId: randomUser,
      channelId: activeChannel,
      timestamp: new Date().toISOString()
    };

    try {
      await fetch("https://slackclonebackendapi.onrender.com/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newMsg)
      });

      input.value = "";
      populateMessages(activeChannel);
    } catch (err) {
      console.error(err);
    }
  });
}

document.addEventListener("DOMContentLoaded", init);
