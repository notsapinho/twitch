import path from "path";
import { spawn } from "child_process";

const __dirname = path.resolve(path.dirname(""));
var torpath = "tor";
if (process.platform == "win32") {
	torpath = path.join(__dirname, "tor", "tor.exe");
} else if (process.platform == "darwin") {
	torpath = path.join(__dirname, "tor", "tor-mac");
} else if (process.platform == "linux") {
	torpath = path.join(__dirname, "tor", "tor-linux");
} else {
	console.error("warning unsupported platform");
}

const port = 9100;
const dataDir = path.join(__dirname, "tmp", `testtor`);
const geoip = path.join(__dirname, "tor", "geoip");
const geoip6 = path.join(__dirname, "tor", "geoip6");
const tor = spawn(
	torpath,
	`--SocksPort ${port} --DataDirectory ${dataDir} --GeoIPFile ${geoip} --GeoIPv6File ${geoip6}`.split(" ")
);

tor.on("exit", () => console.log("[Tor] killed: "));
tor.on("error", (error) => console.error("[Tor] err", error.toString()));
tor.stderr.on("data", (data) => console.error(data.toString()));
tor.stdout.on("data", (data) => {
	console.log(data.toString().replace("\n", ""));
});

setTimeout(() => {
	console.log("change");
	tor.kill("SIGHUP");
}, 10000);
