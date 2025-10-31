const sendBtn = document.getElementById("send-btn");
const userInput = document.getElementById("user-input");
const chatContainer = document.getElementById("chat-container");

// ⚠️ IMPORTANT: Replace this with your own API key (keep it private!)
const API_KEY = "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"; 

sendBtn.addEventListener("click", sendMessage);
userInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});

async function sendMessage() {
  const text = userInput.value.trim();
  if (text === "") return;

  appendMessage(text, "user-message");
  userInput.value = "";

  appendMessage("Typing...", "bot-message");

  const messages = document.querySelectorAll(".bot-message");
  const lastBot = messages[messages.length - 1];

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: text }],
      }),
    });

    const data = await response.json();
    const aiReply = data.choices[0].message.content.trim();
    lastBot.textContent = aiReply;

  } catch (error) {
    lastBot.textContent = "⚠️ Error connecting to AI. Check your API key or internet connection.";
    console.error(error);
  }

  chatContainer.scrollTop = chatContainer.scrollHeight;
}

function appendMessage(message, className) {
  const msgDiv = document.createElement("div");
  msgDiv.classList.add("message", className);
  msgDiv.textContent = message;
  chatContainer.appendChild(msgDiv);
  chatContainer.scrollTop = chatContainer.scrollHeight;
}