global.module = true;
import WebSocket from "ws";
import { getCookies, getTokenSignature } from "./bot";
import readline from "readline";

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

async function main(channel) {
	const cookie = await getCookies({ username: channel });
	const { signature, token } = await getTokenSignature({ channel, cookie });
	const { channel_id } = JSON.parse(decodeURIComponent(token));

	const client = new WebSocket("wss://pubsub-edge.twitch.tv/v1");
	const pinging = setInterval(() => {
		send({ type: "PING" });
	}, 1000 * 30);

	function send(obj) {
		return client.send(JSON.stringify(obj));
	}

	client.onclose = (event) => {
		console.log("close", event.code, event.reason);
		clearInterval(pinging);
	};

	client.onerror = (event) => {
		console.log("error", event.message);
	};

	client.onopen = (event) => {
		console.log("connected");
		send({ type: "PING" });
		const topics = ["video-playback-by-id." + channel_id];
		for (const topic of topics) {
			send({ type: "LISTEN", data: { topics: [topic] } });
		}
	};

	client.onmessage = (event) => {
		const data = JSON.parse(event.data);
		if (data.type === "MESSAGE") {
			console.log("viewers", JSON.parse(data.data.message).viewers);
		}
	};
}

rl.question("Twitch Channel name:\n", async (channel) => {
	console.log(channel);
	main(channel);
});
