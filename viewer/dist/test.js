"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var child_process_1 = require("child_process");
var __dirname = path_1.default.resolve(path_1.default.dirname(""));
var torpath = "tor";
if (process.platform == "win32") {
    torpath = path_1.default.join(__dirname, "tor", "tor.exe");
}
else if (process.platform == "darwin") {
    torpath = path_1.default.join(__dirname, "tor", "tor-mac");
}
else if (process.platform == "linux") {
    torpath = path_1.default.join(__dirname, "tor", "tor-linux");
}
else {
    console.error("warning unsupported platform");
}
var port = 9100;
var dataDir = path_1.default.join(__dirname, "tmp", "testtor");
var geoip = path_1.default.join(__dirname, "tor", "geoip");
var geoip6 = path_1.default.join(__dirname, "tor", "geoip6");
var tor = child_process_1.spawn(torpath, ("--SocksPort " + port + " --DataDirectory " + dataDir + " --GeoIPFile " + geoip + " --GeoIPv6File " + geoip6).split(" "));
tor.on("exit", function () { return console.log("[Tor] killed: "); });
tor.on("error", function (error) { return console.error("[Tor] err", error.toString()); });
tor.stderr.on("data", function (data) { return console.error(data.toString()); });
tor.stdout.on("data", function (data) {
    console.log(data.toString().replace("\n", ""));
});
setTimeout(function () {
    console.log("change");
    tor.kill("SIGHUP");
}, 10000);
//# sourceMappingURL=test.js.map