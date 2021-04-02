import fetch from "node-fetch";

async function test() {
	const req = await fetch("https://gql.twitch.tv/gql", {
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
	});
	const json = await req.json();
	console.log(json[0].data.user?.stream?.viewersCount);
	setTimeout(test, 1000);
}

test();
