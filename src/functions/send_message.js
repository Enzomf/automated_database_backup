import { messages } from "../constants/messages.js";

async function send_discord_message(type, message_content) {
  const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;

  if (!DISCORD_WEBHOOK_URL) {
    throw new Error("DISCORD_WEBHOOK_URL variable is missing");
  }

  await fetch(DISCORD_WEBHOOK_URL, {
    method: "POST",
    body: JSON.stringify(
      messages[type === 'success' ? 'success' : 'error']({
        ...message_content,
      })
    ),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export default send_discord_message;
