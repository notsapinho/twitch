"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ws_1 = __importDefault(require("ws"));
var channel_id = 125911201;
var client = new ws_1.default("wss://pubsub-edge.twitch.tv/v1");
var pinging = setInterval(function () {
    send({ type: "PING" });
}, 1000 * 30);
function send(obj) {
    return client.send(JSON.stringify(obj));
}
client.onclose = function (event) {
    console.log("close", event.code, event.reason);
    clearInterval(pinging);
};
client.onerror = function (event) {
    console.log("error", event.message);
};
client.onopen = function (event) {
    console.log("connected");
    send({ type: "PING" });
    var topics = [
        "video-playback-by-id." + channel_id,
    ];
    for (var _i = 0, topics_1 = topics; _i < topics_1.length; _i++) {
        var topic = topics_1[_i];
        send({ type: "LISTEN", data: { topics: [topic] } });
    }
};
client.onmessage = function (event) {
    var data = JSON.parse(event.data);
    if (data.type === "MESSAGE") {
        console.log("viewers", JSON.parse(data.data.message).viewers);
    }
};
