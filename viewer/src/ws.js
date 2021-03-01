import WebSocket from "ws";

const channel_id = 125911201;
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
	const topics = [
		"video-playback-by-id." + channel_id,
		// "pv-watch-party-events.97295905",
		// "stream-chat-room-v1.97295905",
		// "extension-control.97295905",
		// "broadcast-settings-update.97295905",
		// "radio-events-v1.97295905",
		// "predictions-channel-v1.97295905",
		// "hype-train-events-v1.97295905",
		// "raid.97295905",
		// "ads.97295905",
		// "ad-property-refresh.97295905",
		// "channel-ad-poll-update-events.97295905",
		// "channel-bounty-board-events.cta.97295905",
		// "channel-cheer-events-public-v1.97295905",
		// "channel-sub-gifts-v1.97295905",
		// "channel-drop-events.97295905",
		// "community-boost-events-v1.97295905",
		// "community-points-channel-v1.97295905",
	];
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
