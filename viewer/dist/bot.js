"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var node_fetch_1 = __importDefault(require("node-fetch"));
var child_process_1 = require("child_process");
require("missing-native-js-functions");
var socks_proxy_agent_1 = __importDefault(require("socks-proxy-agent"));
var https_proxy_agent_1 = __importDefault(require("https-proxy-agent"));
var promises_1 = __importDefault(require("fs/promises"));
var path_1 = __importDefault(require("path"));
var form_data_1 = __importDefault(require("form-data"));
var tree_kill_1 = __importDefault(require("tree-kill"));
var readline_1 = __importDefault(require("readline"));
var __dirname = path_1.default.resolve();
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
var rl = readline_1.default.createInterface({
    input: process.stdin,
    output: process.stdout,
});
var __dirname = path_1.default.resolve();
var SocksProxyAgent = socks_proxy_agent_1.default.SocksProxyAgent;
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
process.on("unhandledRejection", console.error);
process.on("uncaughtException", console.error);
function getRandomId() {
    return "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx".replace(/[xy]/g, function (e) {
        var t = (16 * Math.random()) | 0;
        return ("x" === e ? t : (3 & t) | 8).toString(16);
    });
}
function getCookies(_a) {
    var username = _a.username, agent = _a.agent;
    return __awaiter(this, void 0, void 0, function () {
        var req, cookieHeaders, cookies;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, node_fetch_1.default("https://www.twitch.tv/" + username, { agent: agent })];
                case 1:
                    req = _b.sent();
                    cookieHeaders = req.headers.raw()["set-cookie"];
                    cookies = {
                        api_token: "twilight." + getRandomId(),
                    };
                    cookieHeaders
                        .map(function (x) { return x.split("; ")[0].split("="); })
                        .forEach(function (_a) {
                        var key = _a[0], value = _a[1];
                        cookies[key] = value;
                    });
                    return [2 /*return*/, Object.entries(cookies)
                            .map(function (_a) {
                            var key = _a[0], value = _a[1];
                            return key + "=" + value;
                        })
                            .join("; ")];
            }
        });
    });
}
function getTokenSignature(_a) {
    var channel = _a.channel, cookie = _a.cookie, agent = _a.agent;
    return __awaiter(this, void 0, void 0, function () {
        var req, data, _b, value, signature;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, node_fetch_1.default("https://gql.twitch.tv/gql", {
                        agent: agent,
                        headers: {
                            "client-id": "kimne78kx3ncx6brgo4mv6wki5h1ko",
                            "content-type": "text/plain; charset=UTF-8",
                            "device-id": "undefined",
                            cookie: cookie,
                        },
                        referrer: "https://www.twitch.tv/",
                        referrerPolicy: "strict-origin-when-cross-origin",
                        body: JSON.stringify({
                            operationName: "PlaybackAccessToken_Template",
                            query: 'query PlaybackAccessToken_Template($login: String!, $isLive: Boolean!, $vodID: ID!, $isVod: Boolean!, $playerType: String!) {  streamPlaybackAccessToken(channelName: $login, params: {platform: "web", playerBackend: "mediaplayer", playerType: $playerType}) @include(if: $isLive) {    value    signature    __typename  }  videoPlaybackAccessToken(id: $vodID, params: {platform: "web", playerBackend: "mediaplayer", playerType: $playerType}) @include(if: $isVod) {    value    signature    __typename  }}',
                            variables: { isLive: true, login: channel, isVod: false, vodID: "", playerType: "site" },
                        }),
                        method: "POST",
                        mode: "cors",
                        credentials: "include",
                    })];
                case 1:
                    req = _c.sent();
                    return [4 /*yield*/, req.json()];
                case 2:
                    data = (_c.sent()).data;
                    _b = data.streamPlaybackAccessToken, value = _b.value, signature = _b.signature;
                    return [2 /*return*/, { signature: signature, token: encodeURIComponent(value) }];
            }
        });
    });
}
function fetchPlaylistUrl(_a) {
    var channel = _a.channel, token = _a.token, signature = _a.signature, agent = _a.agent;
    return __awaiter(this, void 0, void 0, function () {
        var rand, req, playlist;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    rand = Math.floor(9999999 * Math.random());
                    return [4 /*yield*/, node_fetch_1.default("https://usher.ttvnw.net/api/channel/hls/" + channel + ".m3u8?allow_source=true&fast_bread=true&p=" + rand + "&play_session_id=" + getRandomId() + "&player_backend=mediaplayer&playlist_include_framerate=true&reassignments_supported=true&sig=" + signature + "&supported_codecs=avc1&token=" + token + "&cdm=wv&player_version=1.3.0", { agent: agent })];
                case 1:
                    req = _b.sent();
                    return [4 /*yield*/, req.text()];
                case 2:
                    playlist = _b.sent();
                    return [2 /*return*/, playlist.slice(playlist.indexOf("https://"))];
            }
        });
    });
}
function getFragmentUrl(playlist) {
    var base = playlist.slice(playlist.indexOf("#EXTINF"));
    var link = base.slice(base.indexOf("https://"));
    return link.slice(0, link.indexOf("\n"));
}
function fetchPlaylist(_a) {
    var playlist = _a.playlist, agent = _a.agent;
    return __awaiter(this, void 0, void 0, function () {
        var req;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, node_fetch_1.default(playlist, {
                        method: "GET",
                        agent: agent,
                    })];
                case 1:
                    req = _b.sent();
                    return [4 /*yield*/, req.text()];
                case 2: return [2 /*return*/, _b.sent()];
            }
        });
    });
}
function sleep(ms) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (res) { return setTimeout(res, ms); })];
        });
    });
}
function view(_a) {
    var channel = _a.channel, agent = _a.agent, persist = _a.persist;
    return __awaiter(this, void 0, void 0, function () {
        var cookie, _b, signature, token, channel_id, playlistUrl, device_id, client_id, ping;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, getCookies(channel)];
                case 1:
                    cookie = _c.sent();
                    return [4 /*yield*/, getTokenSignature({ channel: channel, cookie: cookie, agent: agent })];
                case 2:
                    _b = _c.sent(), signature = _b.signature, token = _b.token;
                    channel_id = JSON.parse(decodeURIComponent(token)).channel_id;
                    return [4 /*yield*/, fetchPlaylistUrl({ channel: channel, token: token, signature: signature, agent: agent })];
                case 3:
                    playlistUrl = _c.sent();
                    device_id = getRandomId();
                    client_id = "kimne78kx3ncx6brgo4mv6wki5h1ko";
                    return [4 /*yield*/, node_fetch_1.default("https://countess.twitch.tv/ping.gif?u=" + encodeURIComponent({ type: "channel", id: channel_id }))];
                case 4:
                    ping = _c.sent();
                    return [4 /*yield*/, ping.buffer()];
                case 5:
                    _c.sent();
                    return [4 /*yield*/, node_fetch_1.default("https://gql.twitch.tv/gql", {
                            headers: {
                                "client-id": client_id,
                                "content-type": "text/plain;charset=UTF-8",
                                "x-device-id": device_id,
                                cookie: cookie,
                            },
                            body: JSON.stringify([
                                {
                                    operationName: "WatchTrackQuery",
                                    variables: { channelLogin: channel, videoID: null, hasVideoID: false },
                                    extensions: {
                                        persistedQuery: {
                                            version: 1,
                                            sha256Hash: "38bbbbd9ae2e0150f335e208b05cf09978e542b464a78c2d4952673cd02ea42b",
                                        },
                                    },
                                },
                            ]),
                            method: "POST",
                        })];
                case 6:
                    _c.sent();
                    if (!persist) return [3 /*break*/, 8];
                    return [4 /*yield*/, persistsViews({ client_id: client_id, device_id: device_id, channel_id: channel_id, channel: channel })];
                case 7:
                    _c.sent();
                    _c.label = 8;
                case 8: return [2 /*return*/, sendViews({ playlistUrl: playlistUrl, agent: agent, i: 0, persist: persist })];
            }
        });
    });
}
function persistsViews(_a) {
    var client_id = _a.client_id, device_id = _a.device_id, channel_id = _a.channel_id, channel = _a.channel;
    return __awaiter(this, void 0, void 0, function () {
        var settingsText, spade_url;
        var _this = this;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, node_fetch_1.default("https://static.twitchcdn.net/config/settings.b3e1951c3857d8afda25a4a4d9d76913.js")];
                case 1: return [4 /*yield*/, (_b.sent()).text()];
                case 2:
                    settingsText = _b.sent();
                    spade_url = JSON.parse(settingsText.slice("window.__twilightSettings = ".length).replaceAll("\n", "\\n")).spade_url;
                    setInterval(function () { return __awaiter(_this, void 0, void 0, function () {
                        var scorecard;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, node_fetch_1.default("https://sb.scorecardresearch.com/p2?c1=2&c2=6745306&ns_type=hidden&ns_st_sv=5.1.3.160420&ns_st_smv=5.1&ns_st_it=r&ns_st_id=1614397742932&ns_st_ec=2&ns_st_sp=1&ns_st_sc=1&ns_st_sq=1&ns_st_ppc=1&ns_st_apc=1&ns_st_spc=1&ns_st_cn=1&ns_st_ev=hb&ns_st_po=421095&ns_st_cl=0&ns_st_hc=12&ns_st_mp=js_api&ns_st_mv=5.1.3.160420&ns_st_pn=1&ns_st_tp=0&ns_st_ci=41233489276&ns_st_pt=421095&ns_st_dpt=421095&ns_st_ipt=60003&ns_st_et=421095&ns_st_det=421095&ns_st_upc=421095&ns_st_dupc=421095&ns_st_iupc=60003&ns_st_upa=421095&ns_st_dupa=421095&ns_st_iupa=60003&ns_st_lpc=421095&ns_st_dlpc=421095&ns_st_lpa=421095&ns_st_dlpa=421095&ns_st_pa=421095&ns_ts=1614398167764&ns_st_bc=0&ns_st_dbc=0&ns_st_bt=0&ns_st_dbt=0&ns_st_bp=0&ns_st_skc=0&ns_st_dskc=0&ns_st_ska=0&ns_st_dska=0&ns_st_skd=0&ns_st_skt=0&ns_st_dskt=0&ns_st_pc=0&ns_st_dpc=0&ns_st_pp=0&ns_st_br=0&ns_st_ub=0&ns_st_ki=1200000&ns_st_pr=*null&ns_st_sn=*null&ns_st_en=*null&ns_st_ep=Programming&ns_st_ct=vc&ns_st_ge=Gaming&ns_st_st=" + channel + "&ns_st_ce=1&ns_st_ia=0&ns_st_ddt=2021-02-27&ns_st_tdt=*null&ns_st_pu=*null&ns_st_ti=*null&c3=TWITCH&c4=twitch.tv&c6=*null&c7=https%3A%2F%2Fwww.twitch.tv%2F" + channel + "&c8=" + channel + "%20-%20Twitch&c9=&cs_ucfr=*null&cs_ak_ss=1", {
                                        method: "GET",
                                    })];
                                case 1:
                                    scorecard = _a.sent();
                                    return [4 /*yield*/, scorecard.buffer()];
                                case 2:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); }, 1000 * 10);
                    setInterval(function () { return __awaiter(_this, void 0, void 0, function () {
                        var req, data, body;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, node_fetch_1.default("https://gql.twitch.tv/gql", {
                                        headers: {
                                            "client-id": client_id,
                                            "content-type": "text/plain;charset=UTF-8",
                                            "x-device-id": device_id,
                                            cookie: cookie,
                                        },
                                        body: JSON.stringify([
                                            {
                                                operationName: "WithIsStreamLiveQuery",
                                                variables: { id: channel_id },
                                                extensions: {
                                                    persistedQuery: {
                                                        version: 1,
                                                        sha256Hash: "04e46329a6786ff3a81c01c50bfa5d725902507a0deb83b0edbf7abe7a3716ea",
                                                    },
                                                },
                                            },
                                        ]),
                                        method: "POST",
                                        mode: "cors",
                                    })];
                                case 1:
                                    req = _a.sent();
                                    return [4 /*yield*/, req.json()];
                                case 2:
                                    _a.sent();
                                    data = btoa(JSON.stringify([
                                        {
                                            event: "minute-watched",
                                            properties: {
                                                app_session_id: getRandomId(),
                                                app_version: "82ee41c3-4bec-4458-920b-ca2eeca07a1e",
                                                device_id: getRandomId(),
                                                domain: "twitch.tv",
                                                host: "www.twitch.tv",
                                                platform: "web",
                                                preferred_language: "de-DE",
                                                referrer_host: "",
                                                referrer_url: "",
                                                received_language: "en",
                                                tab_session_id: getRandomId(),
                                                batch_time: 1614398232,
                                                url: "https://www.twitch.tv/" + channel,
                                                client_time: 1614398231.781,
                                                benchmark_server_id: "",
                                                bornuser: true,
                                                browser: "5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4427.5 Safari/537.36",
                                                browser_family: "chrome",
                                                browser_version: "90.0",
                                                collapse_right: false,
                                                collapse_left: true,
                                                localstorage_device_id: getRandomId(),
                                                location: "channel",
                                                page_session_id: getRandomId(),
                                                referrer: "",
                                                referrer_domain: "",
                                                session_device_id: getRandomId(),
                                                theme: "dark",
                                                viewport_height: 871,
                                                viewport_width: 597,
                                                channel: channel,
                                                channel_id: channel_id,
                                                game: "",
                                                hosted_game: null,
                                                is_following: false,
                                                is_live: true,
                                                language: "de",
                                                average_bitrate: 4705671,
                                                backend: "mediaplayer",
                                                broadcast_id: "41233489276",
                                                buffer_empty_count: 0,
                                                cluster: "fra02",
                                                core_version: "1.3.0-twitch.3-rc.2-web.1",
                                                current_bitrate: 5201966,
                                                current_fps: 28,
                                                decoded_frames: 1800,
                                                dropped_frames: 2,
                                                estimated_bandwidth: 300600074,
                                                frame_variance: 350,
                                                hidden: false,
                                                hls_latency_broadcaster: 3176,
                                                hls_latency_ingest: 3275,
                                                live: true,
                                                low_latency: true,
                                                manifest_cluster: "fra02",
                                                manifest_node: "video-weaver.fra02",
                                                manifest_node_type: "weaver_cluster",
                                                minutes_logged: 9,
                                                muted: false,
                                                node: "video-edge-c62914.fra02",
                                                origin_dc: "lhr05",
                                                os_name: "macOS",
                                                os_version: "10.15.7",
                                                play_session_id: "b157d78faad8d767dbb0ea253ec94f02",
                                                playback_rate: 1,
                                                player: "site",
                                                player_state: "Playing",
                                                protocol: "HLS",
                                                ptb: 0,
                                                quality: "auto",
                                                rendered_frames: 1798,
                                                seconds_offset: 5.255492,
                                                serving_id: "947cc671e17741f9b18b918e130084fe",
                                                sink_buffer_size: 3.008600950241089,
                                                stream_format: "chunked",
                                                time: 1614398231.776,
                                                transcoder_type: "transmux",
                                                transport_download_bytes: 35298128,
                                                transport_download_duration: 57766,
                                                transport_first_byte_latency: 1354,
                                                transport_segment_duration: 60003,
                                                transport_segments: 30,
                                                user_agent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4427.5 Safari/537.36",
                                                vid_display_height: 307,
                                                vid_display_width: 547,
                                                vid_height: 1080,
                                                vid_width: 1920,
                                                video_buffer_size: 3.474611,
                                                video_session_id: "8668008407583749414",
                                                volume: 0.5,
                                                battery_percent: 1,
                                                is_pbyp: false,
                                                squad_stream_id: null,
                                                squad_stream_session_id: null,
                                                squad_stream_presentation_id: null,
                                                is_mod: false,
                                                time_spent_hidden: 100623,
                                                consent_comscore_ok: true,
                                                app_fullscreen: false,
                                                autoplayed: true,
                                                backend_version: "1.3.0-twitch.3-rc.2-web.1",
                                                broadcaster_software: "unknown_rtmp",
                                                captions_enabled: false,
                                                chat_visible: true,
                                                chat_visibility_status: "visible",
                                                content_mode: "live",
                                                host_channel: null,
                                                host_channel_id: null,
                                                is_ad_playing: false,
                                                logged_in: false,
                                                login: null,
                                                mse_support: true,
                                                partner: false,
                                                playback_gated: false,
                                                player_size_mode: "default",
                                                staff: false,
                                                subscriber: null,
                                                turbo: false,
                                                user_id: null,
                                                viewer_exemption_reason: null,
                                                subscription_upsell_shown: false,
                                                ad_impressions_in_channel_cached: 0,
                                                benchmark_session_id: getRandomId(),
                                                client_build_id: "82ee41c3-4bec-4458-920b-ca2eeca07a1e",
                                                distinct_id: getRandomId(),
                                                client_app: "twilight",
                                            },
                                        },
                                    ]));
                                    body = new form_data_1.default();
                                    body.append("data", data);
                                    return [4 /*yield*/, node_fetch_1.default(spade_url, {
                                            method: "POST",
                                            body: body,
                                        })];
                                case 3:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); }, 1000 * 50);
                    return [2 /*return*/];
            }
        });
    });
}
function sendViews(_a) {
    var playlistUrl = _a.playlistUrl, agent = _a.agent, i = _a.i, persist = _a.persist;
    return __awaiter(this, void 0, void 0, function () {
        var playlist, fragmentUrl;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, fetchPlaylist({ playlist: playlistUrl, agent: agent })];
                case 1:
                    playlist = _b.sent();
                    fragmentUrl = getFragmentUrl(playlist);
                    return [4 /*yield*/, node_fetch_1.default(fragmentUrl, { method: "HEAD", agent: agent })];
                case 2:
                    _b.sent();
                    console.log(i++);
                    if (persist) {
                        setTimeout(sendViews.bind(null, { playlistUrl: playlistUrl, agent: agent, i: i, persist: persist }), 1000 * 5);
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function getTorProxies(count, offset) {
    if (offset === void 0) { offset = 0; }
    return __awaiter(this, void 0, void 0, function () {
        var promises, portOffset, _loop_1, i, catched, filtered;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    promises = [];
                    portOffset = 9060 + offset;
                    _loop_1 = function () {
                        var counter, port, tor;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    counter = i + offset;
                                    console.log("[Tor] connect: " + counter);
                                    port = portOffset + i;
                                    tor = child_process_1.spawn(torpath, ("--SocksPort " + port + " --DataDirectory " + __dirname + "/tmp/tor" + counter + " --GeoIPFile tor/geoip --GeoIPv6File tor/geoip6").split(" "));
                                    tor.on("exit", function () { return console.log("[Tor] killed: " + counter); });
                                    tor.on("error", function (error) { return console.error("[Tor] err", error); });
                                    tor.stderr.on("data", function (data) { return console.error(data); });
                                    promises.push(new Promise(function (res, rej) {
                                        tor.stdout.on("data", function (data) {
                                            // console.log(data.toString());
                                            if (data.toString().includes("100%")) {
                                                // console.log(data.toString().replace("\n", ""));
                                                console.log("[Tor] connected: " + counter);
                                                var agent = new SocksProxyAgent({ host: "localhost", port: port });
                                                agent.tor = tor;
                                                res(agent);
                                            }
                                        });
                                        setTimeout(function () { return rej(new Error("[Tor] timeout connect")); }, 1000 * 30);
                                    }));
                                    return [4 /*yield*/, sleep(500)];
                                case 1:
                                    _b.sent();
                                    return [2 /*return*/];
                            }
                        });
                    };
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < count)) return [3 /*break*/, 4];
                    return [5 /*yield**/, _loop_1()];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    i++;
                    return [3 /*break*/, 1];
                case 4: return [4 /*yield*/, Promise.all(promises.map(function (p) { return p.catch(function (e) { return e; }); }))];
                case 5:
                    catched = _a.sent();
                    filtered = catched.filter(function (result) { return !(result instanceof Error); });
                    return [2 /*return*/, filtered];
            }
        });
    });
}
function getListProxies(count) {
    return __awaiter(this, void 0, void 0, function () {
        var lines, result;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, promises_1.default.readFile(__dirname + "/proxy-scraper/alive.txt", { encoding: "utf8" })];
                case 1:
                    lines = _a.sent();
                    return [4 /*yield*/, Promise.all(lines
                            .split("\n")
                            .slice(0, count)
                            .map(function (x) { return __awaiter(_this, void 0, void 0, function () {
                            var _a, host, port, ip;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        _a = x.split(":"), host = _a[0], port = _a[1];
                                        return [4 /*yield*/, node_fetch_1.default("https://api.my-ip.io/ip", { agent: agent, timeout: 1000 * 3 })];
                                    case 1: return [4 /*yield*/, (_b.sent()).text()];
                                    case 2:
                                        ip = _b.sent();
                                        console.log(ip);
                                        return [2 /*return*/, new https_proxy_agent_1.default({ host: host, port: port, timeout: 1000 * 3 })];
                                }
                            });
                        }); }))];
                case 2:
                    result = _a.sent();
                    return [2 /*return*/, result.filter()];
            }
        });
    });
}
var threads;
var threadIds;
var torI = 0;
function addThread(channel) {
    var _this = this;
    var id = threadIds++;
    threads[id] = true;
    setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
        var i, agent, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!true) return [3 /*break*/, 6];
                    if (threads[i] == false)
                        return [2 /*return*/];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    i = torI++;
                    console.log("[Bot] starting:" + i);
                    return [4 /*yield*/, getTorProxies(1, i)];
                case 2:
                    agent = (_a.sent())[0];
                    if (!agent)
                        return [2 /*return*/];
                    return [4 /*yield*/, view({ channel: channel, agent: agent, persist: false })];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _a.sent();
                    console.error(error_1);
                    return [3 /*break*/, 5];
                case 5:
                    tree_kill_1.default(agent.tor.pid, "SIGKILL");
                    return [3 /*break*/, 0];
                case 6: return [2 /*return*/];
            }
        });
    }); });
}
function setThreads(channel, threadCount) {
    return __awaiter(this, void 0, void 0, function () {
        var t;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    threads = {};
                    t = 0;
                    _a.label = 1;
                case 1:
                    if (!(t < threadCount)) return [3 /*break*/, 4];
                    threads[t + threadIds] = true;
                    addThread(channel);
                    return [4 /*yield*/, sleep(250)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    t++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    });
}
rl.question("Twitch Channel name:\n", function (channel) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, promises_1.default.mkdir(__dirname + "/tmp").catch(function (e) { })];
            case 1:
                _a.sent();
                rl.question("How many viewers?\n", function (answer) {
                    var viewers = parseInt(answer);
                    if (isNaN(viewers) || viewers <= 0)
                        viewers = 20;
                    setThreads(channel, viewers / 2);
                });
                return [2 /*return*/];
        }
    });
}); });
