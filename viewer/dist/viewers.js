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
function test() {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function () {
        var req, json;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, node_fetch_1.default("https://gql.twitch.tv/gql", {
                        headers: {
                            accept: "*/*",
                            "accept-language": "de-DE",
                            "cache-control": "no-cache",
                            "client-id": "kimne78kx3ncx6brgo4mv6wki5h1ko",
                            "content-type": "text/plain;charset=UTF-8",
                            pragma: "no-cache",
                            "sec-ch-ua": '" Not A;Brand";v="99", "Chromium";v="90", "Google Chrome";v="90"',
                            "sec-ch-ua-mobile": "?0",
                            "sec-fetch-dest": "empty",
                            "sec-fetch-mode": "cors",
                            "sec-fetch-site": "same-site",
                            "x-device-id": "CDYDonvcdkcn5ZCvuPYNhHWFtXQMsKOt",
                        },
                        referrer: "https://www.twitch.tv/",
                        referrerPolicy: "strict-origin-when-cross-origin",
                        body: JSON.stringify([
                            {
                                operationName: "UseViewCount",
                                variables: { channelLogin: "flam3rboy3" },
                                extensions: {
                                    persistedQuery: {
                                        version: 1,
                                        sha256Hash: "00b11c9c428f79ae228f30080a06ffd8226a1f068d6f52fbc057cbde66e994c2",
                                    },
                                },
                            },
                        ]),
                        method: "POST",
                        mode: "cors",
                        credentials: "include",
                    })];
                case 1:
                    req = _c.sent();
                    return [4 /*yield*/, req.json()];
                case 2:
                    json = _c.sent();
                    console.log((_b = (_a = json[0].data.user) === null || _a === void 0 ? void 0 : _a.stream) === null || _b === void 0 ? void 0 : _b.viewersCount);
                    setTimeout(test, 1000);
                    return [2 /*return*/];
            }
        });
    });
}
test();
//# sourceMappingURL=viewers.js.map