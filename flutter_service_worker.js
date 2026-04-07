'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"canvaskit/canvaskit.js": "738255d00768497e86aa4ca510cce1e1",
"canvaskit/skwasm.js.symbols": "c3c05bd50bdf59da8626bbe446ce65a3",
"canvaskit/skwasm.js": "5d4f9263ec93efeb022bb14a3881d240",
"canvaskit/chromium/canvaskit.js": "901bb9e28fac643b7da75ecfd3339f3f",
"canvaskit/chromium/canvaskit.js.symbols": "ee7e331f7f5bbf5ec937737542112372",
"canvaskit/chromium/canvaskit.wasm": "399e2344480862e2dfa26f12fa5891d7",
"canvaskit/skwasm.wasm": "4051bfc27ba29bf420d17aa0c3a98bce",
"canvaskit/skwasm.worker.js": "bfb704a6c714a75da9ef320991e88b03",
"canvaskit/canvaskit.js.symbols": "74a84c23f5ada42fe063514c587968c6",
"canvaskit/canvaskit.wasm": "9251bb81ae8464c4df3b072f84aa969b",
"flutter_bootstrap.js": "bf95fd931601fc77287c195ae5676cf5",
"index.html": "54f3e51c18e05364f363960d79b5e216",
"/": "54f3e51c18e05364f363960d79b5e216",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"flutter.js": "383e55f7f3cce5be08fcf1f3881f585c",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"manifest.json": "8c29f0228d96c5fc5df666fae9f46580",
"main.dart.js": "75986a5e4588afd255bc9d983058159b",
"version.json": "d72baaeb9ca6cf3a7b1fe99bdd934f47",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "e986ebe42ef785b27164c36a9abc7818",
"assets/fonts/MaterialIcons-Regular.otf": "9258bc027b0260fd905d708536065c60",
"assets/AssetManifest.bin.json": "1c9781bf3cc75b1e28f7be08007c0237",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/AssetManifest.json": "a88e5a82e957dbcf4cad48f386da222c",
"assets/NOTICES": "962f76651a382ced2412b1fc26f942fb",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"assets/AssetManifest.bin": "66f439f317a9cef6e4f019cccbd079b9",
"assets/assets/charts/Match-1-chart2-DE.png": "29cc0b8c02c6b6b1065f85cfaa5a37f3",
"assets/assets/charts/GrupoI-posicao-DE.png": "ba01d088ee949b017152e7a93eacd3c6",
"assets/assets/charts/Match-2-chart2-PT.png": "b07bd0bf93d63292cfc97aee08179b52",
"assets/assets/charts/GrupoA-qualify-PT.png": "6b9d7972200d6ed9aabe022b60e81c7f",
"assets/assets/charts/GrupoI-posicao-PT.png": "96828c09a7193e23bf21c38eaf35062a",
"assets/assets/charts/Match-5-chart2-DE.png": "fe363bffa931455f54b2f9c2a476d1bd",
"assets/assets/charts/Match-69-chart2-PT.png": "53399db822f1716c2ddc5fdc54c06353",
"assets/assets/charts/Match-24-chart2-EN.png": "efe976b3d4e8f0e5e5a2a8adfe7ebd1e",
"assets/assets/charts/Match-26-chart2-PT.png": "8cf54d4ffddd8d3d15c83d216741ac33",
"assets/assets/charts/Match-15-chart2-PT.png": "d003860e2131bf32d3007d9c2d87e6a4",
"assets/assets/charts/Match-28-chart3.png": "075788992184d75c94c58788203c075d",
"assets/assets/charts/Match-4-chart2-PT.png": "09c03b969fd4180bfa9689fcd1fced76",
"assets/assets/charts/Match-28-chart2-PT.png": "82e8652dc5a5cbbad6c160b96a229083",
"assets/assets/charts/Match-60-chart2-PT.png": "b372df61e74de14e9ce330c147db9d15",
"assets/assets/charts/Match-32-chart2-DE.png": "080f2857bc5db78bcde20d28c049bd75",
"assets/assets/charts/Match-9-chart2-DE.png": "08ff66294d41878d3b63f205983e923d",
"assets/assets/charts/Match-19-chart2-PT.png": "8bcbdcaa4d2157b78cd6b2c633dbfaf9",
"assets/assets/charts/Match-0-chart2-EN.png": "3a5e9ea22ca28bdd26241765724b5991",
"assets/assets/charts/Match-62-chart2-DE.png": "b2cf6edb3162960955b1cd5ef0843aa4",
"assets/assets/charts/Match-27-chart2-EN.png": "905df543dcf18015bf119bde535fc28f",
"assets/assets/charts/GrupoJ-qualify-PT.png": "f12b631957ee5eb92d80f2bcfa0f3845",
"assets/assets/charts/ViceCampeao-EN.png": "afdce200edb4db0d2f7f238d486a1afc",
"assets/assets/charts/Match-47-chart2-PT.png": "34b7bc143f4aa83ae7b593eafe11a37f",
"assets/assets/charts/Match-33-chart2-DE.png": "b46b0bc5fec1cb1c0cec8b7ae8c882f1",
"assets/assets/charts/Match-5-chart3.png": "d117e6bbde572f587395db96dfb7745a",
"assets/assets/charts/Match-18-chart3.png": "872a71db070a5796a7dd3d2004c39cae",
"assets/assets/charts/Match-35-chart1.png": "f76c18cda2d1b021c25b9c6a765181d9",
"assets/assets/charts/Match-48-chart2-DE.png": "2942a03470ca5d2a6ce6fc5d749af07a",
"assets/assets/charts/ViceCampeao-DE.png": "248804c615b9116e5bf146bb27c4bd2a",
"assets/assets/charts/Match-63-chart2-EN.png": "fc7e951e8dc6982dd4d680d1c8e1eea5",
"assets/assets/charts/Match-9-chart2-EN.png": "61e93f885598428cdf655ba4d2e018dc",
"assets/assets/charts/Match-28-chart1.png": "93e3b967ca7730a93b78ac4411b0322c",
"assets/assets/charts/Match-38-chart2-EN.png": "834c623a820cbe07b8098b02aff20a9f",
"assets/assets/charts/Match-10-chart2-EN.png": "375e538258540786e1e33333cf2f8e63",
"assets/assets/charts/Match-56-chart2-DE.png": "a84299661185720145635d1bc7765f34",
"assets/assets/charts/Match-14-chart3.png": "1dccc164f86aeb321107fe3caeedd115",
"assets/assets/charts/Match-25-chart2-EN.png": "072b5b09433d6ac626605efd1a7afdfd",
"assets/assets/charts/Match-7-chart3.png": "4151b5680f0e54bfbf72ca4e58d40268",
"assets/assets/charts/Match-25-chart2-PT.png": "9ccf838b2d117520be24b4a3a9a36fd7",
"assets/assets/charts/Match-46-chart2-DE.png": "81800e6cf98236d586206a90a27daaa7",
"assets/assets/charts/Match-6-chart3.png": "bb50985797f84e2819263078525c0122",
"assets/assets/charts/Match-70-chart1.png": "b22bbdad65a5ccba4c48cb81643a7e6f",
"assets/assets/charts/GrupoD-posicao-DE.png": "1431abd7ac1e15f87569e7970b78c5c2",
"assets/assets/charts/GrupoI-qualify-PT.png": "684e027db56aa1b590e10352d30743e6",
"assets/assets/charts/Match-41-chart2-EN.png": "818fdf42b2f0f0000362319478d74494",
"assets/assets/charts/Match-48-chart3.png": "b19219eda39272ad2a72e0f18a53322c",
"assets/assets/charts/Match-4-chart2-EN.png": "89e227948ad8f0ae1dadb72273196e5e",
"assets/assets/charts/Match-67-chart3.png": "81150ad430bf8b534e15a2b8a0edeec7",
"assets/assets/charts/Match-47-chart3.png": "418f56a50ccbba9f7216b320a2dece2a",
"assets/assets/charts/GrupoH-qualify-DE.png": "2458e6dac3f0b6993b387452abe0710b",
"assets/assets/charts/Match-71-chart3.png": "459b38eb5e6b3311a13661fea6335500",
"assets/assets/charts/GrupoI-posicao-EN.png": "7d69db5db63b97bdefed7c01203f01ab",
"assets/assets/charts/Match-52-chart3.png": "705b1fb2a18c55ddbd32b97858bbf88f",
"assets/assets/charts/Match-17-chart2-EN.png": "4eeb9a1b77b1f746b5966c2f179e7d32",
"assets/assets/charts/Match-7-chart1.png": "2290e21306fcd1dd66ce251b7a3e53c0",
"assets/assets/charts/Match-64-chart2-PT.png": "3e574a2f9558ee015b18eb82aa01d416",
"assets/assets/charts/Match-59-chart1.png": "f2243a405bae1c2522f05f7528f659be",
"assets/assets/charts/Match-21-chart2-DE.png": "7f2bdd677a2f433872a78ac036455a1e",
"assets/assets/charts/GrupoL-posicao-PT.png": "986d4662779d6c982d3b14300c0a412d",
"assets/assets/charts/GrupoA-posicao-PT.png": "09669f1798a088d9fbc61c67303f35ee",
"assets/assets/charts/GrupoE-posicao-PT.png": "879073ddf5402093594b2b907a4e9700",
"assets/assets/charts/GrupoE-qualify-DE.png": "83a8655419219f69fb9a4e00b6b39aa1",
"assets/assets/charts/Match-38-chart2-PT.png": "ba8ca0a227a3724b85ebf7acfa8dac1d",
"assets/assets/charts/GrupoG-qualify-PT.png": "ce307f9005a25881b65d1868c858344f",
"assets/assets/charts/Match-29-chart2-PT.png": "7d21de87c1675a895121d1d441fe2ee7",
"assets/assets/charts/Match-6-chart2-EN.png": "70a009fb5a9fbc947f473c0b142fef21",
"assets/assets/charts/GrupoH-posicao-PT.png": "c8b07442b113b1f25d9ce317cf65cc30",
"assets/assets/charts/GrupoF-qualify-EN.png": "223c9d582155a58bdd6488431ee0995a",
"assets/assets/charts/GrupoF-qualify-DE.png": "a766207787c8c369c36a4d27bb12e37d",
"assets/assets/charts/Match-53-chart1.png": "74f1a167dd7b0666acae8703854a3790",
"assets/assets/charts/Match-66-chart3.png": "6cad3fc8d0a60da9c53244a324cda34a",
"assets/assets/charts/GrupoF-posicao-DE.png": "a57fc4073e6a997d003847d707080559",
"assets/assets/charts/GrupoL-posicao-DE.png": "f6b83c138cdb68742ae341f2d5de19c2",
"assets/assets/charts/Match-0-chart2-DE.png": "57f4f6a7df0430e799730eda98d2bf64",
"assets/assets/charts/Match-60-chart1.png": "a0c2be8714fd38785e9252426c2bb1a1",
"assets/assets/charts/Match-68-chart2-EN.png": "0549be174c330142e0ced274673a6747",
"assets/assets/charts/Match-30-chart2-DE.png": "85dcffb6e0d36349a00a2fbfb0829769",
"assets/assets/charts/Match-41-chart2-DE.png": "d0c4c68145e0a369a0f5a48cc11d5001",
"assets/assets/charts/Match-48-chart1.png": "c92e7756ad5a038ccb9b52f8796bb565",
"assets/assets/charts/Match-39-chart2-PT.png": "7d502a82218367458dd2ce96a128dba7",
"assets/assets/charts/Match-19-chart1.png": "928d55aa16842df33e1515c6d1fca11f",
"assets/assets/charts/GrupoF-posicao-PT.png": "923f6e7fbfc8fd686f49056a378b80b1",
"assets/assets/charts/Match-12-chart2-EN.png": "4c3d0f683981008cc83391de773cf73d",
"assets/assets/charts/GrupoA-posicao-EN.png": "d29765e271c7b2dbcbf084b51fb445d3",
"assets/assets/charts/Match-36-chart2-PT.png": "c366c80db24a2ea00ed3ec58567a2ee0",
"assets/assets/charts/Match-20-chart2-EN.png": "b676fb7583ea84d703f85f5ea9141ff0",
"assets/assets/charts/GrupoK-posicao-PT.png": "8605e092ca4a40100536ca95b2ee0de3",
"assets/assets/charts/Match-20-chart2-DE.png": "2a51df04493431ca2c47a0c49ba614a1",
"assets/assets/charts/Match-36-chart2-EN.png": "8a1652226f465a9090641dec4b84888c",
"assets/assets/charts/Match-22-chart2-DE.png": "1fcf155b1f16426a86e812307666e110",
"assets/assets/charts/Match-44-chart1.png": "7918898b3a81ab898daf39c60c689d15",
"assets/assets/charts/Match-40-chart3.png": "338adf13e2ce5aa7fe3a432b936d5f04",
"assets/assets/charts/Match-42-chart3.png": "c33f72c95b45815959220b06dae83f42",
"assets/assets/charts/Match-36-chart3.png": "ca4df30bd4f4aaf06823661e67781ed3",
"assets/assets/charts/Match-15-chart3.png": "f79708b1b6414d63340748e8fdae8aa7",
"assets/assets/charts/Match-33-chart1.png": "5b47f14d9dfb430464235c073f84cc9f",
"assets/assets/charts/Match-70-chart2-EN.png": "8897437dc551d48e0bdd27bed3767d41",
"assets/assets/charts/Match-3-chart1.png": "8b0dfd31e4e9240cc29050ce62ffd1e8",
"assets/assets/charts/Match-43-chart2-DE.png": "748d5d08f35bb0c05e37141f04c4b92b",
"assets/assets/charts/Match-62-chart2-EN.png": "3f49cb5df92943a6a9619be3644a3bbf",
"assets/assets/charts/Match-2-chart2-EN.png": "ea68dc0c0db05ea5e8c162ae1f841eab",
"assets/assets/charts/Match-61-chart2-PT.png": "01a118ff30a64b13a8a8c7310adb26c0",
"assets/assets/charts/Match-9-chart3.png": "dd8532b8ee258cff0165652fc82c3c19",
"assets/assets/charts/GrupoB-qualify-DE.png": "6418883e45b5fd818133a5cbed9bcd4c",
"assets/assets/charts/Match-50-chart2-DE.png": "b6ccdbedc2bde9f2cd304b2f9c82ac3f",
"assets/assets/charts/Match-9-chart1.png": "e1506c1dcef14123f29eac9c8249e05d",
"assets/assets/charts/Match-57-chart3.png": "17389c0723ef7ccb9b283b777a5a0518",
"assets/assets/charts/Match-7-chart2-PT.png": "2e9d80bc02c843c265ec710cf4cb5ec2",
"assets/assets/charts/Match-63-chart3.png": "8a4244ccea2e9d393de5c3761cd47ce7",
"assets/assets/charts/Campeao-PT.png": "ada1a7066aa4760185d491f54817fa10",
"assets/assets/charts/GrupoA-qualify-EN.png": "b39a3980a19a7c0142a3dfdb61dab8ce",
"assets/assets/charts/Match-44-chart3.png": "167bf06274075870dcf155ebaeb02935",
"assets/assets/charts/GrupoB-qualify-EN.png": "0d9b1015c03461469581da6109909367",
"assets/assets/charts/Match-34-chart2-EN.png": "ec9da409675eb6eee9c652574285c1ee",
"assets/assets/charts/Match-49-chart2-EN.png": "f0378f07e066f0ca2db4f27d5dde7e11",
"assets/assets/charts/Match-68-chart2-DE.png": "cc6a33bba0635c7d4ace74c19fc8b3cc",
"assets/assets/charts/Match-51-chart1.png": "34a72e4804c6238bce949c8e07669540",
"assets/assets/charts/Match-7-chart2-EN.png": "6135402ae0180b83a5306dec0a5b5358",
"assets/assets/charts/Match-67-chart2-DE.png": "fec740210898f61bb3f62f999f5edce6",
"assets/assets/charts/Match-45-chart2-EN.png": "ecef5c64943ab3fe6cf986c7749ff381",
"assets/assets/charts/Match-27-chart1.png": "e2664c21bb6f4f07129ba80ef55a8ee2",
"assets/assets/charts/Match-8-chart1.png": "1bea6096a7fd4c92dde5568e69c53b6b",
"assets/assets/charts/Match-11-chart2-PT.png": "589d1ee1953fe7be7052ea4a211452bd",
"assets/assets/charts/Match-31-chart1.png": "c2badf46f1a504791fddcd0c37f3e9a4",
"assets/assets/charts/Match-53-chart3.png": "95d6386d72fc746e11201a34554a93e6",
"assets/assets/charts/ViceCampeao-PT.png": "a44dc26cfa68cb09f97aa95785753d2e",
"assets/assets/charts/Match-25-chart3.png": "fb28aafe209dd2ebdef44c34bb9ee260",
"assets/assets/charts/Match-66-chart1.png": "96d0af751ede9cfc7d98bc9b6a4628cd",
"assets/assets/charts/Match-63-chart1.png": "c0604e191515205fb18da8cc05427da0",
"assets/assets/charts/Match-52-chart2-PT.png": "a5c6d7321e02ec4f9e56fc429a2a7577",
"assets/assets/charts/Match-31-chart3.png": "f3c62210d6f4ccc0f515387b62d83b08",
"assets/assets/charts/Match-28-chart2-DE.png": "2264f0f1a54ad7ee25423adebf40aa0f",
"assets/assets/charts/Match-0-chart2-PT.png": "ae63954b1fa3636ea25d44d3f77f08d3",
"assets/assets/charts/GrupoK-qualify-DE.png": "29320acb576ac025aa42939401e2c71f",
"assets/assets/charts/GrupoF-qualify-PT.png": "176eb824e180fa16206b41e03eefe9ea",
"assets/assets/charts/Match-11-chart2-DE.png": "55c9a03d2c5dcb90f578d8b4856940ee",
"assets/assets/charts/Match-33-chart2-EN.png": "380efe3792f645ceb7ebb5fbbd90d73f",
"assets/assets/charts/Match-58-chart2-EN.png": "bbd449ec6c53fbc58ccc700e99414138",
"assets/assets/charts/Match-59-chart2-DE.png": "597ede39e15018f29bbe2213dc1c1910",
"assets/assets/charts/Match-52-chart2-EN.png": "c7fea57fc0979165925fac4a1cd7cfbd",
"assets/assets/charts/Match-29-chart1.png": "dc8be80873e9165bf3a39deedcb56048",
"assets/assets/charts/Match-6-chart2-DE.png": "4de3e33acea90da10df0a59126395e18",
"assets/assets/charts/Match-69-chart2-EN.png": "db03ece2d69bb1633b452a839d983d0f",
"assets/assets/charts/Match-50-chart1.png": "04451bf6e1aeb02049dde07cb7ad31d2",
"assets/assets/charts/Match-44-chart2-EN.png": "4006abb2bab96277b9e179b7625fae87",
"assets/assets/charts/Match-54-chart3.png": "dcd84f6448b719f668fd8feb78d3e2ee",
"assets/assets/charts/Match-69-chart1.png": "607a08fb1474fb38a645bf472de00a87",
"assets/assets/charts/Match-19-chart3.png": "38a741ef4743ebb2f295947995d6071a",
"assets/assets/charts/Match-65-chart2-EN.png": "89a5335725b173377176b7046937dc80",
"assets/assets/charts/Match-66-chart2-PT.png": "93c4d17e97f0a6c294bc8b6805667c7b",
"assets/assets/charts/GrupoA-posicao-DE.png": "9aebd784854931292f4da7f7c1e3d6d7",
"assets/assets/charts/Match-46-chart2-PT.png": "2ac686151daddda1b52039c75972a12e",
"assets/assets/charts/Match-50-chart2-EN.png": "55dbf6e3f2bc886c86e227e25d7499cd",
"assets/assets/charts/Match-32-chart2-EN.png": "4230378a28fe62db76eec08698e54d9a",
"assets/assets/charts/Match-1-chart1.png": "7276f7879ce89d2ebd8b1c13019c25bf",
"assets/assets/charts/GrupoD-qualify-EN.png": "98377fbc311363094cc91708c45c9ea3",
"assets/assets/charts/GrupoD-qualify-PT.png": "3d05c9391f3133e427e0136bc48f780f",
"assets/assets/charts/Match-48-chart2-EN.png": "c4e30feda2da3b2dcc58f49cd53fb5cb",
"assets/assets/charts/Match-8-chart3.png": "32d660c2df6001f13a4e1e0e217a4e8a",
"assets/assets/charts/Match-10-chart2-DE.png": "4fac546f1b109c822ba050ce57f2d61e",
"assets/assets/charts/Match-57-chart2-DE.png": "bbf52299f8d10b7ea697e46322d9ac8c",
"assets/assets/charts/GrupoG-posicao-PT.png": "ed536508e8f2b7fb9c6d0c082a87c4d5",
"assets/assets/charts/GrupoE-posicao-EN.png": "bd29744d0f82dc8ddc9e0ba45be368c4",
"assets/assets/charts/Match-16-chart3.png": "29c0eff1e8ccaee14b3de31a4d5ee772",
"assets/assets/charts/Match-32-chart2-PT.png": "608ad55fbed4d4bd6c7174de37f2f888",
"assets/assets/charts/Match-67-chart2-PT.png": "8bba66b676b4c38aa66c2af38b308623",
"assets/assets/charts/Match-47-chart2-DE.png": "56648836ddef7906067b07470303a8e0",
"assets/assets/charts/GrupoJ-posicao-PT.png": "cc681988c3081d6d579f9bce6711fd8e",
"assets/assets/charts/Match-64-chart3.png": "5f04b005d4191283dc25468ba0fc09b6",
"assets/assets/charts/Match-41-chart2-PT.png": "b20de77d85873471b756eb6d511b3228",
"assets/assets/charts/Match-54-chart2-PT.png": "63a47b223dec80ab2c2e558d55fe7e79",
"assets/assets/charts/Match-0-chart3.png": "24c622acd8d216841343d5afce50a57e",
"assets/assets/charts/Match-40-chart2-PT.png": "dc57979c0257776eb9da2b0f7a4a0c2a",
"assets/assets/charts/Match-41-chart1.png": "430a7bce99b0467d8f23727e18ce7f5b",
"assets/assets/charts/GrupoD-qualify-DE.png": "64f437fa6486d2265413b0d02ae7db27",
"assets/assets/charts/Match-30-chart3.png": "ecf2c7a0c00f4e1f2a9fbdc225d90065",
"assets/assets/charts/Match-46-chart3.png": "c325281fd61c0eb3773faa8fac6c4a02",
"assets/assets/charts/Match-62-chart2-PT.png": "8073dd35a6b3b2c7013fe57006649ca6",
"assets/assets/charts/Match-64-chart2-DE.png": "b243f2033a5fed68094ddf1ef8b3e171",
"assets/assets/charts/Match-58-chart1.png": "996d3484d42de2a07a2fff04310c399e",
"assets/assets/charts/Match-1-chart2-PT.png": "e06e83f29322c09b5a04a7397840991a",
"assets/assets/charts/Match-45-chart1.png": "9866a89442283f5be5adbbbeda20e291",
"assets/assets/charts/Match-67-chart2-EN.png": "bf926434e619e60d4e9c01750e540a5b",
"assets/assets/charts/Match-4-chart2-DE.png": "f0d877becbe5d152c2d56fad7cd4cd98",
"assets/assets/charts/Match-39-chart2-DE.png": "27455fa70a25d0889c19ac22fb31ea96",
"assets/assets/charts/Match-58-chart2-DE.png": "67ec635af7bebbf439bd376e77fc15e2",
"assets/assets/charts/Match-49-chart3.png": "7b327393b0f62a29f1651fcac9b9e51a",
"assets/assets/charts/Match-32-chart1.png": "e3f8aefa027b50662489dff788ca9627",
"assets/assets/charts/Match-49-chart1.png": "eaf68f4d00a76650b26c08715ce44e58",
"assets/assets/charts/Match-16-chart2-DE.png": "d20d3a7ba9fd301607b031d2d1ecf33e",
"assets/assets/charts/Match-13-chart2-EN.png": "163cceba4ea4ceba626eac0334079fa0",
"assets/assets/charts/Match-3-chart2-EN.png": "69f59063f8159e35cb1c732fd7a95f71",
"assets/assets/charts/Match-6-chart2-PT.png": "59521d437b04c93e28dd2723867d4bb5",
"assets/assets/charts/Match-52-chart1.png": "507a8a4d06e1578993d708753aed22fc",
"assets/assets/charts/Match-45-chart3.png": "53b743666093c426ddde8f43977d870f",
"assets/assets/charts/GrupoL-qualify-PT.png": "f33f447ff82a2f821d5971014a94a4fa",
"assets/assets/charts/Match-35-chart2-EN.png": "5ac26e246d7cb15e990f51916098028a",
"assets/assets/charts/GrupoH-qualify-PT.png": "239421c891a2ab1af8d786e586c647c1",
"assets/assets/charts/Match-17-chart2-PT.png": "ca996d4187212c4afd6b301d25711bf6",
"assets/assets/charts/Match-68-chart2-PT.png": "9f2e8e81bacf542f10d5514f6896b9c4",
"assets/assets/charts/Match-58-chart3.png": "89f8d712e34da694a514cb75e6967767",
"assets/assets/charts/Match-63-chart2-PT.png": "853a065fd03828b145658bb4b2128e31",
"assets/assets/charts/Match-36-chart2-DE.png": "c91d70bac13f2603a24694de76ab12df",
"assets/assets/charts/Match-18-chart2-DE.png": "a244d791137c84573f30538e9d5bad5e",
"assets/assets/charts/Match-21-chart1.png": "4c7aa0743d37ffd1bf33341c4d6e5b9f",
"assets/assets/charts/Match-61-chart2-DE.png": "3c217ba7bffb0093fd71906096dcf282",
"assets/assets/charts/Match-39-chart3.png": "a30b6699837f22add301b7bf6ba948d3",
"assets/assets/charts/Match-10-chart1.png": "337db20c06f6b43d9e576a0fd396e9d4",
"assets/assets/charts/Match-66-chart2-DE.png": "30554c91c385dc3f76ee70d5fb52feea",
"assets/assets/charts/Match-35-chart2-DE.png": "e3a02c1ee19366c9b26a54c89bb56ea9",
"assets/assets/charts/GrupoJ-posicao-EN.png": "4f7b274753df1f721d97035b4b1d07b9",
"assets/assets/charts/Match-51-chart2-DE.png": "2bc1c401aa7ada83cff0276d951ef09d",
"assets/assets/charts/Match-64-chart2-EN.png": "55fe5894668657644d5f29416875f484",
"assets/assets/charts/GrupoG-qualify-DE.png": "dd1f2a8e7afccf4874ab993016ae3cec",
"assets/assets/charts/Match-66-chart2-EN.png": "7920185075d01d96bd5c014d9e82239f",
"assets/assets/charts/Match-28-chart2-EN.png": "54a5c3165d793197996eaeea22736ad2",
"assets/assets/charts/Match-41-chart3.png": "14c4df722bafff17f8b2d4666414256d",
"assets/assets/charts/Match-55-chart2-PT.png": "04a12c55f8099be0760bd737329f41d8",
"assets/assets/charts/Match-34-chart3.png": "5464637cc79dcdfb41280ea12f153df7",
"assets/assets/charts/Match-2-chart3.png": "7110773f1dc53ed8a53d2003293ed11e",
"assets/assets/charts/Match-67-chart1.png": "2abe9e9434034d8fe6d5f08e6752f466",
"assets/assets/charts/GrupoJ-qualify-EN.png": "773b5ac0fd111462315f838be62c23c7",
"assets/assets/charts/Match-23-chart3.png": "f4a0f6e77d2985b1d6ae6c9d14343663",
"assets/assets/charts/GrupoC-qualify-DE.png": "d13c6b3ec5c182b28752fedf5727f6d3",
"assets/assets/charts/Match-29-chart3.png": "fc5f53573a13e6503430e44a05d4177a",
"assets/assets/charts/Match-43-chart1.png": "aa703e87cc1b5255ac4b7308ce96b8a5",
"assets/assets/charts/Match-7-chart2-DE.png": "04ce616b0920cca621b75d56ae1a7446",
"assets/assets/charts/GrupoD-posicao-PT.png": "086bef5ad9858e91c0743223c00714c4",
"assets/assets/charts/Match-42-chart2-EN.png": "fffd70bf25611f406f8bc2d0955fb75b",
"assets/assets/charts/Match-51-chart2-EN.png": "0778c3679c7923870ed1a6ea6222d404",
"assets/assets/charts/Match-16-chart2-PT.png": "8b7bad8d18156c1f05aa89791ac383ef",
"assets/assets/charts/Zebra-PT.png": "76368ed0d1f879e3b41b448b5f19a052",
"assets/assets/charts/GrupoB-posicao-EN.png": "9ac283b8b9a9ca80ac5e7c547cb2b6ef",
"assets/assets/charts/Match-20-chart2-PT.png": "9c8b2787924c514fc7d9d995e0caaf22",
"assets/assets/charts/GrupoL-qualify-DE.png": "17e4b49b433f97b682ac5355fbc10ff2",
"assets/assets/charts/Match-50-chart2-PT.png": "53f692a7c3f34f5465eae827919bdb0d",
"assets/assets/charts/Match-26-chart2-EN.png": "c5c2b1a70b6dd9e690280bed6bad6c81",
"assets/assets/charts/Match-70-chart2-PT.png": "0026c5f08d411faf97f8b8ee7f18b349",
"assets/assets/charts/Match-33-chart2-PT.png": "085f8cde76343bb4df6d802008dad56d",
"assets/assets/charts/Match-31-chart2-EN.png": "ee51479ed69e154042895f3f22828ce9",
"assets/assets/charts/Match-0-chart1.png": "b36dfa790f693882f61f6886644d815e",
"assets/assets/charts/Match-62-chart1.png": "1b619b66283c9b134f891fa17548e9c3",
"assets/assets/charts/Match-11-chart2-EN.png": "5656c3e4fcd992beb0cb905affdfdc15",
"assets/assets/charts/Match-38-chart3.png": "216f894c2ccb06a9f93adcaeec7118ea",
"assets/assets/charts/Match-31-chart2-DE.png": "cbac752c11a575b00a9c7ba78a7d9063",
"assets/assets/charts/Match-10-chart2-PT.png": "d88d815c482b8e9e9abbca0955f20a43",
"assets/assets/charts/GrupoK-qualify-PT.png": "ce9a353cb22d0bccedb4aa2f87406f9a",
"assets/assets/charts/Match-55-chart2-DE.png": "3c14faffbb74c759e1f2a38cba516984",
"assets/assets/charts/Match-32-chart3.png": "2a547c77447a03c8f115d81811cb186a",
"assets/assets/charts/Match-9-chart2-PT.png": "4d916a83fa09d643c0e0ad6cda8eba8b",
"assets/assets/charts/GrupoC-posicao-PT.png": "01415638a8ef587ee7c9d15386f12b20",
"assets/assets/charts/Match-3-chart2-PT.png": "a76642c04a14ada77f69594efa98d310",
"assets/assets/charts/Match-56-chart1.png": "cf3bbdd8d60d9c329562dfcd6d0c9f8c",
"assets/assets/charts/Match-42-chart2-PT.png": "5ac69e512d8a7cef52740ab540a68857",
"assets/assets/charts/Match-3-chart2-DE.png": "bebb1bcce0da91737187d256d98e6745",
"assets/assets/charts/Match-18-chart2-PT.png": "361082c4df166163fd753dd5d56ea899",
"assets/assets/charts/Match-23-chart1.png": "576e2d769dfac8d42b548d1baaadb8af",
"assets/assets/charts/Match-14-chart1.png": "8e4da3ad7284d2d89d7217ebf06203ff",
"assets/assets/charts/Match-65-chart1.png": "f0657b1d685a895746a6e7357f9bd21c",
"assets/assets/charts/Match-14-chart2-PT.png": "e6774ee9e94fc4e23246cc88cdecd737",
"assets/assets/charts/Match-24-chart3.png": "0f34c92af446244e8d0a6e6900793419",
"assets/assets/charts/Match-45-chart2-PT.png": "08216702fb6c32de0f386485923148e5",
"assets/assets/charts/Match-18-chart1.png": "a07b8c98c0df7cd3de8ef07134fd5035",
"assets/assets/charts/Match-43-chart3.png": "a15d5b38bac7b6d9794b0f3ae9386c55",
"assets/assets/charts/Match-17-chart1.png": "5f0e150bf57a76c0768732dd7a6596b6",
"assets/assets/charts/Match-35-chart3.png": "32f085776be5ce0967cea1d7bb2a6567",
"assets/assets/charts/Match-70-chart3.png": "85db69730a147ad34f73b69c5a4f7b0c",
"assets/assets/charts/Match-61-chart2-EN.png": "bf61a31631bdd91cf9a349d49e3c8de9",
"assets/assets/charts/GrupoC-qualify-EN.png": "237ededa827fc41438ccee085b0e0a78",
"assets/assets/charts/GrupoC-posicao-EN.png": "a17564e6764923825bce4be9b12d0b04",
"assets/assets/charts/GrupoB-posicao-PT.png": "5a972a5e02701b70f96aa866838d1262",
"assets/assets/charts/Match-35-chart2-PT.png": "fc8fd7379295c3b088bd0120c3bfa284",
"assets/assets/charts/Match-44-chart2-DE.png": "33a5f915b87bf4281a7d715a388fb82a",
"assets/assets/charts/GrupoG-posicao-EN.png": "a81ef87e95dc39f0c2a6634cc2f3f3d2",
"assets/assets/charts/Match-45-chart2-DE.png": "11125cb2bf26d72e4608f4e9cc9c0aa6",
"assets/assets/charts/Match-57-chart2-PT.png": "69e62f0fe5045c1a6581472d104cb012",
"assets/assets/charts/Match-59-chart2-PT.png": "56061f609b2c7cd06488ee3b4aa1f900",
"assets/assets/charts/Match-49-chart2-DE.png": "fd6688122eddf983082e39847b1b9a62",
"assets/assets/charts/GrupoG-posicao-DE.png": "a92ed3e411e15148f443a78f7cbe8328",
"assets/assets/charts/GrupoK-qualify-EN.png": "f61abb176462c92a75ada79fc159f523",
"assets/assets/charts/Match-17-chart3.png": "1c4776f4831b3ac610df74b782fc07c7",
"assets/assets/charts/Match-8-chart2-DE.png": "7bfbd591c0c28ab0b0af81489cd3347e",
"assets/assets/charts/Match-46-chart1.png": "38310e03c3603b39c27fb7faa1ed19f8",
"assets/assets/charts/Match-47-chart1.png": "0742de6b55592fd6834117cee5ef311e",
"assets/assets/charts/Match-61-chart1.png": "e064c93ff9d1f9e0e8be820115771585",
"assets/assets/charts/Match-39-chart2-EN.png": "96f9b10734aae142b5d8f29df19ce531",
"assets/assets/charts/Match-34-chart1.png": "0b0a749f63792b39e663d964dc4b741f",
"assets/assets/charts/GrupoC-posicao-DE.png": "83ab9e61972ef4c82861293ea309dfe8",
"assets/assets/charts/Match-40-chart2-DE.png": "41a83e912477a36479282d47d3e51aa3",
"assets/assets/charts/Match-43-chart2-EN.png": "a3f021d4ca0a83b8574fe397f4cc2746",
"assets/assets/charts/Match-53-chart2-PT.png": "cf290450df59ac4945e1454a82d9d5c9",
"assets/assets/charts/Match-56-chart2-EN.png": "bf276a27fda0a8261a5588c92a7504b4",
"assets/assets/charts/Match-42-chart1.png": "886e35290eeec6c8f64c23d8c63513d2",
"assets/assets/charts/Match-8-chart2-PT.png": "ce2cf6eca5ce54a4f0ec1a585773ae0b",
"assets/assets/charts/GrupoL-posicao-EN.png": "cf26bd8970a82519e1ecaf64c2a4aa7a",
"assets/assets/charts/Match-5-chart1.png": "05050a69c8edcc11092b0bfc0e8926eb",
"assets/assets/charts/Match-51-chart2-PT.png": "9ae8d6a4b1901d7e1b68d15c4842f9a9",
"assets/assets/charts/Match-21-chart2-EN.png": "98c80637707a09c41566f64484be412c",
"assets/assets/charts/GrupoH-qualify-EN.png": "860c03e265b1cdf9699887023f42446c",
"assets/assets/charts/Match-15-chart2-EN.png": "7cd740b43e73c02e434453a30de59804",
"assets/assets/charts/Match-55-chart3.png": "69756cad4b989984d795ddfbe7ca10e8",
"assets/assets/charts/GrupoD-posicao-EN.png": "824d619f1112f9df910337efbb4a4be1",
"assets/assets/charts/Match-71-chart2-PT.png": "8320edfc6808a0d5d092a33406c3f8ec",
"assets/assets/charts/Match-15-chart2-DE.png": "0519a997eb4082c047b7f677de09dec5",
"assets/assets/charts/Match-64-chart1.png": "aa7c227a2a91f93884f982f0d28e1c0d",
"assets/assets/charts/Match-33-chart3.png": "778b3f08e8cd4301263b9418e454ee59",
"assets/assets/charts/Match-22-chart3.png": "be0f62e27c271d0dc604147ea159a6da",
"assets/assets/charts/Match-53-chart2-EN.png": "d932dc5051d142630e3213b280aefe0d",
"assets/assets/charts/GrupoE-posicao-DE.png": "cee52f8b903d9da97d5be2b605f85501",
"assets/assets/charts/Match-8-chart2-EN.png": "7cc06db3bc173b6b2dfd9169e9e09eaf",
"assets/assets/charts/GrupoB-posicao-DE.png": "8a299d2989f0dc819e4937a10c25d822",
"assets/assets/charts/Match-42-chart2-DE.png": "9c7d0227dce4481f5c3e201a583e7e05",
"assets/assets/charts/Match-38-chart2-DE.png": "c4143e8ac0b05a17c562853679eb2c82",
"assets/assets/charts/Match-37-chart1.png": "15dc21e9d3664f7f1fe928ca4c9fca2a",
"assets/assets/charts/Match-26-chart1.png": "7b2d95e8fe1e68754de30f78a8bcd393",
"assets/assets/charts/Match-26-chart3.png": "a6953b2d242265d01439630c750e34a8",
"assets/assets/charts/Match-22-chart2-PT.png": "42879e801b889731040b9bc6941c9ba7",
"assets/assets/charts/Match-46-chart2-EN.png": "33454577be6aa35e74b0b5a935d213ee",
"assets/assets/charts/Match-21-chart2-PT.png": "c9951d28bd1c127142c44c457b511811",
"assets/assets/charts/Match-16-chart2-EN.png": "db03fa344d271177bd9b6e659f20254f",
"assets/assets/charts/Match-11-chart1.png": "747dcaf2241f5b890067ed00d66fb383",
"assets/assets/charts/Match-37-chart3.png": "4e2f8f30a5adcaf0bacc33871d89900e",
"assets/assets/charts/Match-43-chart2-PT.png": "1ae5fbc9c900ecfca299eb8d5026bf4f",
"assets/assets/charts/Match-14-chart2-EN.png": "624fe4691c22c34d4801f449bbb0b5a7",
"assets/assets/charts/Match-20-chart3.png": "c7b21af4eb63ac84c14ce5de7ab13766",
"assets/assets/charts/Match-18-chart2-EN.png": "0eb48c2414faeed24509aafffaa8693a",
"assets/assets/charts/GrupoB-qualify-PT.png": "a2e2300c7ef5c7531d0f20b2c28e8c3f",
"assets/assets/charts/Match-30-chart2-EN.png": "e7489f32bb60fbfd0f6820878e3724e2",
"assets/assets/charts/Match-26-chart2-DE.png": "82edade77ee09a1af3ed11f857142abd",
"assets/assets/charts/Match-22-chart1.png": "6295cf73150e924715621cbb4fc5c26d",
"assets/assets/charts/Match-2-chart2-DE.png": "56d37b7bc7dacf3acce36f234ccd86ca",
"assets/assets/charts/GrupoE-qualify-EN.png": "e2d998c46a1c9a3e92210c9819bc3333",
"assets/assets/charts/Match-23-chart2-EN.png": "d1e779a070c2d252375f7f8fbc8ef647",
"assets/assets/charts/Match-34-chart2-DE.png": "605a5f262753f5274bcc68f950be2d89",
"assets/assets/charts/Match-6-chart1.png": "0ad362c36a329c13b4a75342cbd688d5",
"assets/assets/charts/Match-50-chart3.png": "ee42c940cc5112672ab8c686c4880b24",
"assets/assets/charts/Match-49-chart2-PT.png": "84789daec51ee22feeeedc68c6e5cd5a",
"assets/assets/charts/Match-60-chart3.png": "cdee12f8db525a03af2339076487821c",
"assets/assets/charts/Match-5-chart2-EN.png": "b4ab5c40a5abc7a12af13d5eec0f4d84",
"assets/assets/charts/Match-13-chart2-PT.png": "f79c1579f8638341642657e668bf9f72",
"assets/assets/charts/Match-12-chart2-DE.png": "1a0488bd2de490d1e30039fa78be1af0",
"assets/assets/charts/Match-15-chart1.png": "d60d5525ba620fba6582068493a9f546",
"assets/assets/charts/Match-13-chart3.png": "6ec46cc3811db1783f2c6c45f23b74b7",
"assets/assets/charts/GrupoJ-qualify-DE.png": "16fba2f8e78c8e47bd98a04d6b5e2829",
"assets/assets/charts/Match-53-chart2-DE.png": "34f4e21aa48f6095afd1a1b2bcee78cc",
"assets/assets/charts/Match-57-chart1.png": "340b3c84abcecc5c1af700fa6b1a9765",
"assets/assets/charts/Match-5-chart2-PT.png": "0c4f80cbf3a8d4057e8c5af1b91bfaaa",
"assets/assets/charts/GrupoH-posicao-DE.png": "4e2432572422dc4ae6bd2f5e0fdf4a7e",
"assets/assets/charts/Match-44-chart2-PT.png": "b200ed1a300ce5b212982b1f52afd98d",
"assets/assets/charts/Match-54-chart1.png": "196deeeba5e7845c7fd55081d50bfce9",
"assets/assets/charts/Match-61-chart3.png": "9f72a192b9e41dac5c6a36508a3717e4",
"assets/assets/charts/Match-20-chart1.png": "76da7bdddf2f9a53d463897886f97b79",
"assets/assets/charts/Zebra-EN.png": "a103fc8e7f8d2c200212a0ce49f1d781",
"assets/assets/charts/Match-30-chart1.png": "5bfb324569059af30e46a86205fbeb5d",
"assets/assets/charts/Match-17-chart2-DE.png": "27475e64ef18c64822e44ea2b876b801",
"assets/assets/charts/Match-37-chart2-DE.png": "a2d4053e63b0a5c103d5dcad418d753a",
"assets/assets/charts/Match-21-chart3.png": "7ef4220a0781ca8a6d0161c89db8ba70",
"assets/assets/charts/Match-27-chart2-DE.png": "09998be7f7fe8bfc85df1b9bd3f094d2",
"assets/assets/charts/Match-12-chart2-PT.png": "3fc47caffdaf1a1e0a9792c0c982258f",
"assets/assets/charts/Match-60-chart2-EN.png": "92b13968641fae40d0da4b8867bdea38",
"assets/assets/charts/Campeao-DE.png": "eba43a11ccc05e8da751dc955256d06c",
"assets/assets/charts/Match-12-chart3.png": "01ec15a506dcd20e08fbcb0a5c467c42",
"assets/assets/charts/Match-24-chart2-DE.png": "b98b3da698a59d4b2efafe8bbd6a7758",
"assets/assets/charts/GrupoA-qualify-DE.png": "03f250edb5f9f44d29a92a13cface297",
"assets/assets/charts/Match-37-chart2-EN.png": "d9e65bf04894e0759eaf8c3449bf6511",
"assets/assets/charts/GrupoK-posicao-EN.png": "1bc6f0d1e6fbeb928e01f28a9857d5a7",
"assets/assets/charts/Match-19-chart2-EN.png": "668240afc395eeba1c1ab4e2f1594e76",
"assets/assets/charts/Match-29-chart2-EN.png": "190b91863c892321da47bc74ded7a626",
"assets/assets/charts/Match-16-chart1.png": "94cd6b09790a2b903cd960be925fdcb0",
"assets/assets/charts/Match-38-chart1.png": "aca71e0efc67cabc49ff85446e02b2b4",
"assets/assets/charts/Match-24-chart1.png": "0979958da468fa1a4bf7791da38123d2",
"assets/assets/charts/GrupoI-qualify-DE.png": "c42d8212e07d2986266d211d81ff45f2",
"assets/assets/charts/GrupoJ-posicao-DE.png": "b147c83cdef6059ba18c70f65038b62c",
"assets/assets/charts/Match-47-chart2-EN.png": "b6962f34d0c225306025ae37c2c4a336",
"assets/assets/charts/Match-34-chart2-PT.png": "6e0acd4c5b7641be9edb2b5a701ce2c6",
"assets/assets/charts/Match-56-chart3.png": "026cd7317f474f3a754e4c1ecfaf6e4f",
"assets/assets/charts/Match-24-chart2-PT.png": "191c9a63512e1bbcd3641bb664138886",
"assets/assets/charts/Match-70-chart2-DE.png": "db4a773e57512f2dd27bd0f5113c4306",
"assets/assets/charts/GrupoK-posicao-DE.png": "667a88fb9afbcc0bdfa7ae32fe80654d",
"assets/assets/charts/Match-39-chart1.png": "15c36cd0edfb7929f0257c174f07a89e",
"assets/assets/charts/Match-54-chart2-DE.png": "af831098fd093e50996d9f50e56a5c6d",
"assets/assets/charts/Match-2-chart1.png": "53bbf3f62a9615b5e648efc3d6c77ca6",
"assets/assets/charts/Match-68-chart3.png": "7acf88a863eb19587fb0c56c4a1014fd",
"assets/assets/charts/GrupoL-qualify-EN.png": "b3f52437007acb61c8db303b2d6c416c",
"assets/assets/charts/Match-11-chart3.png": "720ad841b6e06ea60210d2563fc59241",
"assets/assets/charts/Match-68-chart1.png": "6ad9d4e37bb2499c75f24afb56fbceea",
"assets/assets/charts/Match-65-chart2-DE.png": "c103076e1cddb4716db3b088e7b35b08",
"assets/assets/charts/Match-62-chart3.png": "015c49abb180cb2f100fa6d599576e56",
"assets/assets/charts/Match-51-chart3.png": "9b1a3cc7833f5ec2412486c8c224620d",
"assets/assets/charts/Match-63-chart2-DE.png": "7332cde1b4c3333d58b4aec874d9c332",
"assets/assets/charts/Match-65-chart3.png": "5cba85b118e883f314e3f83afdf3c0df",
"assets/assets/charts/Match-59-chart2-EN.png": "793bf2ef5cf297e7195939d2a575a566",
"assets/assets/charts/GrupoG-qualify-EN.png": "1a532580d215955c529d4c39128b95b9",
"assets/assets/charts/Match-57-chart2-EN.png": "6e877c9bf9a5b6ebab32942cab0d481e",
"assets/assets/charts/Match-71-chart2-DE.png": "799d4a4c3aa69fe92cd04b103aacc8b9",
"assets/assets/charts/Match-30-chart2-PT.png": "cd8ba97d1feb848226178b47e3312e87",
"assets/assets/charts/Match-4-chart3.png": "45105129b118eccc50bd643df46c21a9",
"assets/assets/charts/Match-1-chart2-EN.png": "afb1f71962c74a4baf57e6cdac3156f6",
"assets/assets/charts/Campeao-EN.png": "ed9d64082565a79e451e32febb80a41c",
"assets/assets/charts/Match-29-chart2-DE.png": "a2e09dabc251fec3a9eb9294a27475ab",
"assets/assets/charts/Match-27-chart3.png": "cbf23e227c25773d4ba711be49923595",
"assets/assets/charts/Match-71-chart1.png": "9f600bab4260881e70c2002ae5af491f",
"assets/assets/charts/Match-13-chart1.png": "0503bfea3c5fab895e95395025446e82",
"assets/assets/charts/Zebra-DE.png": "2f5a1bd9c42a83f24e00431e2d2edff8",
"assets/assets/charts/Match-23-chart2-PT.png": "9d9f2a1ca12564d93f823ca00fa97c8d",
"assets/assets/charts/Match-4-chart1.png": "2fcc604a31f8015acfe33f8d9b4cdbdc",
"assets/assets/charts/Match-22-chart2-EN.png": "22403cfd2a8c50fcb1417c0f259e5a88",
"assets/assets/charts/GrupoC-qualify-PT.png": "cd8447d49a5916ee073fa10246a20574",
"assets/assets/charts/Match-27-chart2-PT.png": "f05cc9f9cb472629aa678bd0a3b0da48",
"assets/assets/charts/Match-1-chart3.png": "81da18e5872029a2f2cd16fc1f4b514e",
"assets/assets/charts/Match-69-chart2-DE.png": "294c67a79b5736cbffba1a7bd01aeccc",
"assets/assets/charts/Match-40-chart2-EN.png": "530532dd3473e36f5e7b769ff5b1c2a6",
"assets/assets/charts/Match-71-chart2-EN.png": "b635512ebf4fa29dd3b14cb791d83a26",
"assets/assets/charts/Match-55-chart2-EN.png": "dbc512ef97cb727454b5229a320de660",
"assets/assets/charts/Match-37-chart2-PT.png": "fce2689dbd941002ada1abac59390c02",
"assets/assets/charts/Match-55-chart1.png": "dd8c60016ff33c3c191f2d91170060b7",
"assets/assets/charts/Match-31-chart2-PT.png": "30772e204145a1002ce773883cb3dfc4",
"assets/assets/charts/Match-3-chart3.png": "b24f610fb2a5064da652a19ad14533f0",
"assets/assets/charts/Match-13-chart2-DE.png": "83be295777d8877d1e1d690f7b8698dc",
"assets/assets/charts/Match-56-chart2-PT.png": "8095cc3ae1c258146297fc7eecef96ca",
"assets/assets/charts/Match-19-chart2-DE.png": "365f94b3287041454c6618d609f3fbb8",
"assets/assets/charts/Match-10-chart3.png": "2ac580cbffc349ae045201921e0c8d53",
"assets/assets/charts/Match-69-chart3.png": "c2f783d76b51503638fbb712eb4b7f1c",
"assets/assets/charts/Match-14-chart2-DE.png": "d95ba5b60c9abdcec82ac2ccbfb70fab",
"assets/assets/charts/Match-48-chart2-PT.png": "89d1992c38c24e391ea8482e58289bfb",
"assets/assets/charts/Match-25-chart2-DE.png": "fb987e3ad0a9337f71c87f682c1555c4",
"assets/assets/charts/Match-40-chart1.png": "c11e8abdc45dff27b2df423f2aa91401",
"assets/assets/charts/GrupoH-posicao-EN.png": "8dca348ffac219a57131b1613edd32e2",
"assets/assets/charts/Match-54-chart2-EN.png": "c6eabecba8274b80be4a0525715aafea",
"assets/assets/charts/Match-23-chart2-DE.png": "01729ce4221888e6de087f0aee3d1406",
"assets/assets/charts/GrupoE-qualify-PT.png": "3c06dd3592ee6afe25f0bb8df85948cf",
"assets/assets/charts/Match-65-chart2-PT.png": "def4be9bfa5d6092ca3d6823ec90eaa2",
"assets/assets/charts/Match-36-chart1.png": "dafaeef8a5d757cbd89c59acc5f4ae95",
"assets/assets/charts/Match-60-chart2-DE.png": "63780d21b10ccb994e5971df7e26523a",
"assets/assets/charts/GrupoF-posicao-EN.png": "5fee0473d3dd94da8aefb282ef8dbfa3",
"assets/assets/charts/Match-52-chart2-DE.png": "5e06f9171539f8bbffa8f0b4b4efb9fb",
"assets/assets/charts/Match-58-chart2-PT.png": "45ce8aa1be0150c4637b70eb13f5ef6c",
"assets/assets/charts/Match-59-chart3.png": "361e5b190691cc9816d242d2be1fe7d3",
"assets/assets/charts/GrupoI-qualify-EN.png": "828179d3ed52596c124ec8582246a35b",
"assets/assets/charts/Match-12-chart1.png": "ef602a1502bdcb25d986ebe362acf533",
"assets/assets/charts/Match-25-chart1.png": "5bf253680589d4b62c4635e9393ca3c5",
"assets/assets/data/matches.json": "0635c1642f5fdb1ca5d8201769f3a9dd",
"assets/assets/fonts/NotoColorEmoji.ttf": "a666a1a5090c4d8c4acae3121ad40d1a",
"assets/assets/flags/eng.png": "eb4071342dfa6c63f58d4b2cc011bb91",
"assets/assets/flags/sco.png": "99a35a8716be527f5d1157df4356f3b1"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"flutter_bootstrap.js",
"assets/AssetManifest.bin.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
