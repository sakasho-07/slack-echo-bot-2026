import "dotenv/config";
import { App } from "@slack/bolt";
import { VercelReceiver, createHandler } from "@vercel/slack-bolt";
const receiver = new VercelReceiver();

const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    receiver,
    deferInitialization: true,
});

app.event("app_mention", async ({ event, client }) => {
    await client.chat.postMessage({
        channel: event.channel,
        text: event.text,
        thread_ts: event.ts,
    });
});

export const POST = createHandler(app, receiver);