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
"flutter_bootstrap.js": "0907c89fe8ef7222411ac3f1820648d9",
"index.html": "6420e729ad1f04e195d991b0aa207cc0",
"/": "6420e729ad1f04e195d991b0aa207cc0",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"flutter.js": "383e55f7f3cce5be08fcf1f3881f585c",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"manifest.json": "8c29f0228d96c5fc5df666fae9f46580",
"main.dart.js": "febd059be438d3658b7c7dcc5b0b43a3",
"version.json": "d72baaeb9ca6cf3a7b1fe99bdd934f47",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "e986ebe42ef785b27164c36a9abc7818",
"assets/fonts/MaterialIcons-Regular.otf": "9258bc027b0260fd905d708536065c60",
"assets/AssetManifest.bin.json": "5bb65420da9e078eb92b86c50ae1147d",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/AssetManifest.json": "7f87efb655fd8fc646ebfca8ab5423d1",
"assets/NOTICES": "962f76651a382ced2412b1fc26f942fb",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"assets/AssetManifest.bin": "13f5d92edace2f9da9738a18d8c0579c",
"assets/assets/charts/Match-1-chart2-DE.png": "39bb5d64940a157bf3fa06aebb4d49ff",
"assets/assets/charts/Match-2-chart2-PT.png": "553f87fc39cdd896a24c617fadb73015",
"assets/assets/charts/GrupoA-qualify-PT.png": "20301265142487e51662bc8949eef12f",
"assets/assets/charts/Match-5-chart2-DE.png": "b72deb222f55be3ee5c656499123f83c",
"assets/assets/charts/Match-69-chart2-PT.png": "bdb27733d1d9ad6ba2e21c71f3a8cdef",
"assets/assets/charts/Match-24-chart2-EN.png": "158733398aa77fe4f1eb78d5c39d094c",
"assets/assets/charts/Match-26-chart2-PT.png": "1c337b278afd9b7e6676243628054103",
"assets/assets/charts/Match-15-chart2-PT.png": "9d2b449f0785d69eeb7d995be54c4c47",
"assets/assets/charts/Match-28-chart3.png": "81fced1270a2e5332de7e86b298b6f24",
"assets/assets/charts/Match-4-chart2-PT.png": "700e7eb80c552cb47faf1987dec4aaff",
"assets/assets/charts/Match-28-chart2-PT.png": "d6364ffa82ed13781c02a985f3357eee",
"assets/assets/charts/Match-60-chart2-PT.png": "be53a7c07f8401baf4d091984e806f13",
"assets/assets/charts/Match-32-chart2-DE.png": "6f9d9a66d3b2827ed6fa6053518a2449",
"assets/assets/charts/Match-9-chart2-DE.png": "90f3244b39ee20c788a1a9f866349945",
"assets/assets/charts/Match-19-chart2-PT.png": "daba53b75039f84bb8904c2a7e09c610",
"assets/assets/charts/Match-0-chart2-EN.png": "9061472820d1232032e5fa06018acc43",
"assets/assets/charts/Match-62-chart2-DE.png": "2dc98a1d715c02d7d6a6e37867c9d374",
"assets/assets/charts/Match-27-chart2-EN.png": "e51dfcbf233f78405f14aee6a619ae44",
"assets/assets/charts/GrupoJ-qualify-PT.png": "f521f492a2e39990e1d73d6ea979d18a",
"assets/assets/charts/ViceCampeao-EN.png": "afdce200edb4db0d2f7f238d486a1afc",
"assets/assets/charts/Match-47-chart2-PT.png": "52db68ef9e8b758d61392492932646bc",
"assets/assets/charts/Match-33-chart2-DE.png": "d95ff477485b683522f4579b2baaae21",
"assets/assets/charts/Match-5-chart3.png": "a8c76ac3c1d9718cb43930f24a6f40f7",
"assets/assets/charts/Match-18-chart3.png": "69d4b5ab37d6cdae14e9d515773061de",
"assets/assets/charts/Match-35-chart1.png": "f60e12ce1e40c6f273e452d34947e58c",
"assets/assets/charts/Match-48-chart2-DE.png": "972016b2aab353a996208e941ffb1a81",
"assets/assets/charts/ViceCampeao-DE.png": "248804c615b9116e5bf146bb27c4bd2a",
"assets/assets/charts/Match-63-chart2-EN.png": "6621fd19b4e29b74868d1e509772f4ef",
"assets/assets/charts/Match-9-chart2-EN.png": "d31846250e22574202060780c560ac76",
"assets/assets/charts/Match-5-chart2.png": "992e573590d2d5d6a7ad44f653977b65",
"assets/assets/charts/Match-28-chart1.png": "9b8fd90f8d475050675f7dfbe215714f",
"assets/assets/charts/Match-38-chart2-EN.png": "e0074ef83cc147d314e2fcff61e587da",
"assets/assets/charts/Match-10-chart2-EN.png": "9e30cb748d583709401f6bccbcee96fe",
"assets/assets/charts/Match-56-chart2-DE.png": "f683ed7fe973f1456eeda7ebed7e2a10",
"assets/assets/charts/Match-14-chart3.png": "bfb0dfc290d79d0cb3186f3090209d88",
"assets/assets/charts/Match-25-chart2-EN.png": "00294709769f76a78512a9629fb76ed5",
"assets/assets/charts/Match-7-chart3.png": "a670b7d6245dcfb855c5c5a5a33c28ec",
"assets/assets/charts/Match-25-chart2-PT.png": "368c56c12f37eee3cf45b7380c354304",
"assets/assets/charts/Match-46-chart2-DE.png": "79bcf405ad145adaeeb4d6e0714c82ec",
"assets/assets/charts/Match-6-chart3.png": "345bc05718889211d73ef61e6ba51978",
"assets/assets/charts/Match-70-chart1.png": "8c807c5a6676c055eb84f8017f6532fc",
"assets/assets/charts/GrupoI-qualify-PT.png": "d9835a1e0a2a363f9071ac17e9724ecb",
"assets/assets/charts/Match-41-chart2-EN.png": "3dfc17bcf9c7280414d0919b1d59ea3f",
"assets/assets/charts/Match-48-chart3.png": "4edacc8bce1f6d62ec12a14f26ef20b9",
"assets/assets/charts/Match-4-chart2-EN.png": "ea180469d04a3dd5e1d0fd084a1d07cc",
"assets/assets/charts/Match-67-chart3.png": "b1d9b4a879e23d3b5d0ac571d197c926",
"assets/assets/charts/Match-47-chart3.png": "6bd1e1920b759a479bba697a6df239af",
"assets/assets/charts/Match-71-chart3.png": "9992d19925b269d4b8d73e034e63749b",
"assets/assets/charts/Match-52-chart3.png": "dcd4feab3533c7c8854adf6c2293cb3d",
"assets/assets/charts/Match-17-chart2-EN.png": "3af7e5eba5feb274909c7823a59ca006",
"assets/assets/charts/Match-7-chart1.png": "e15a5d2be549be2f0a4d9842b00c16ed",
"assets/assets/charts/Match-64-chart2-PT.png": "52dc5bcc197e3d040d0b4076580900e7",
"assets/assets/charts/Match-59-chart1.png": "42c2a8c3a739617563db45dc1bf80a85",
"assets/assets/charts/Match-21-chart2-DE.png": "8f29167371eacd77c1e4dae548169014",
"assets/assets/charts/Match-2-chart1-EN.png": "867ac52e5228c16d6a7e355970b470b4",
"assets/assets/charts/GrupoE-qualify-DE.png": "8329cc296ea5e4232a6652ab276719b5",
"assets/assets/charts/Match-38-chart2-PT.png": "41ecb3f08449028f3c1c7512b104b307",
"assets/assets/charts/Match-29-chart2-PT.png": "1ced8f6a52a155f6fe464c2b564eb34e",
"assets/assets/charts/Match-6-chart2-EN.png": "a5b45191539ef0b3c6207fb72f13d76b",
"assets/assets/charts/Match-53-chart1.png": "72d3d4cdc5884af66a865c2dea2b0a1f",
"assets/assets/charts/Match-66-chart3.png": "f65e207056467b6a0855d688c84da3eb",
"assets/assets/charts/Match-0-chart2-DE.png": "33fe2583d3ead3c67107a041f01f20fc",
"assets/assets/charts/Match-60-chart1.png": "8695b96b549eeaf1a91442fa0fc1d56a",
"assets/assets/charts/Match-68-chart2-EN.png": "e8226482d85dde0875935719eaba0f7f",
"assets/assets/charts/Match-30-chart2-DE.png": "235bc97a468bad3aba5f4242614ea042",
"assets/assets/charts/Match-41-chart2-DE.png": "149a974010b23fee5d5691e18b8c9abc",
"assets/assets/charts/Match-48-chart1.png": "1f28a80eb579a4eda80608fa5c7718cd",
"assets/assets/charts/Match-39-chart2-PT.png": "793cf5be60c5a52b162034cea3f5cba7",
"assets/assets/charts/Match-19-chart1.png": "be44cc468639422094544e7dacc5aa3c",
"assets/assets/charts/Match-12-chart2-EN.png": "c93c696089f6078f4c7317acc7b0486d",
"assets/assets/charts/Match-36-chart2-PT.png": "434ad49260717ffdecdda11400b6c827",
"assets/assets/charts/Match-20-chart2-EN.png": "3a892fe09fade66cd72365d4f1cf2a6e",
"assets/assets/charts/Match-20-chart2-DE.png": "2d10321f2a2499294226d448162e4e56",
"assets/assets/charts/Match-36-chart2-EN.png": "010a08f9628ee9964d75b00364006d6e",
"assets/assets/charts/Match-22-chart2-DE.png": "12122aa3d25f9e6b6ce71f9da24d0ec5",
"assets/assets/charts/Match-44-chart1.png": "3740670dbd88cee01f0f6856b6b94694",
"assets/assets/charts/Match-40-chart3.png": "90b6ec5ca48473c38b044bac43c60604",
"assets/assets/charts/Match-42-chart3.png": "5a62535c2a3785b341bdb4a6d7dd760e",
"assets/assets/charts/Match-36-chart3.png": "2e08480e2264fe4bde480cb557f5f297",
"assets/assets/charts/Match-15-chart3.png": "8f36d6ef920c98e5e5f8f3b2936b93a3",
"assets/assets/charts/Match-33-chart1.png": "6144ea37f95b0fc347df8bb19dd3edc7",
"assets/assets/charts/Match-70-chart2-EN.png": "e6de2d85527ef29d93b348cdceed8a1c",
"assets/assets/charts/Match-3-chart1.png": "2e721c26ca0959baefa0ce93f4288993",
"assets/assets/charts/Match-43-chart2-DE.png": "997a5b347e01158f0ae2c6e5da56f07f",
"assets/assets/charts/Match-62-chart2-EN.png": "ccfc56433d522d26c0b8c7b1e808e430",
"assets/assets/charts/Match-2-chart2-EN.png": "eebc9df8fdb65516dfa6b1065384f19f",
"assets/assets/charts/Match-61-chart2-PT.png": "7ce51b087d4a01f0e049e0f13bfbc92c",
"assets/assets/charts/Match-9-chart3.png": "f03cf6a887d5ace40f79f49d754932f8",
"assets/assets/charts/Match-50-chart2-DE.png": "e74612d0ccee3c9dc4b48c27a173859e",
"assets/assets/charts/Match-9-chart1.png": "b07f0811ec393e1f526a8d31dce2e2f0",
"assets/assets/charts/Match-57-chart3.png": "37a6ef8303b8e068b980a150724149e2",
"assets/assets/charts/Match-7-chart2-PT.png": "b388cef0f3f4a87313ab1979453ac9a5",
"assets/assets/charts/Match-63-chart3.png": "f18a2171fe92e3dc881bff19cb4d3f2a",
"assets/assets/charts/Campeao-PT.png": "ada1a7066aa4760185d491f54817fa10",
"assets/assets/charts/GrupoA-qualify-EN.png": "05deff905f4c8487d3d3eb82f442fad6",
"assets/assets/charts/Match-44-chart3.png": "232aad00863b04e9c31936b99132060d",
"assets/assets/charts/Match-34-chart2-EN.png": "e74bdd9ea66f6c4c3899fcb215a2baeb",
"assets/assets/charts/Match-49-chart2-EN.png": "fb9e343b832c338ceefe73a9f6a5cfe8",
"assets/assets/charts/Match-68-chart2-DE.png": "b7f18755a49820f993b81ec7d4b049b4",
"assets/assets/charts/Match-51-chart1.png": "e703d53506b4f54e297a249c9152caba",
"assets/assets/charts/Match-7-chart2-EN.png": "6ce4fced07ad154cb10903ccb8c576a6",
"assets/assets/charts/Match-67-chart2-DE.png": "7bde0593676128a2b429aa8becd672b7",
"assets/assets/charts/Match-45-chart2-EN.png": "0703199271dd9b2ff17d7719c693347e",
"assets/assets/charts/Match-27-chart1.png": "aed90a2addb4fcbb82fa3aa24d0fe426",
"assets/assets/charts/Match-8-chart1.png": "007328375c7621939d39b47af27365b4",
"assets/assets/charts/Match-11-chart2-PT.png": "a94ca5949d45d662ebb3fd74477bcb91",
"assets/assets/charts/Match-31-chart1.png": "1d2c1266b54bad471994514969c5c128",
"assets/assets/charts/Match-53-chart3.png": "158ef536b4ebce35c0cb70cd0d60f04a",
"assets/assets/charts/ViceCampeao-PT.png": "a44dc26cfa68cb09f97aa95785753d2e",
"assets/assets/charts/Match-25-chart3.png": "989808418f7a00556946a22d6eec4c6a",
"assets/assets/charts/Match-66-chart1.png": "7e7423e217f83a4b6240e8122f67349e",
"assets/assets/charts/Match-63-chart1.png": "8808670d0bad039f12c4d6d27d13a069",
"assets/assets/charts/Match-52-chart2-PT.png": "a11fcb6b23fe48d817f9b7b030a9152f",
"assets/assets/charts/Match-31-chart3.png": "677cf11b2c95d57f078f2fcf08293e4f",
"assets/assets/charts/Match-28-chart2-DE.png": "34e7e1c1a13f752bdad438ef9814368f",
"assets/assets/charts/Match-0-chart2-PT.png": "0347468c21e52f04fc3456b7f16891c8",
"assets/assets/charts/Match-11-chart2-DE.png": "88e4280430db0b3bdb873c86b8fa44a4",
"assets/assets/charts/Match-33-chart2-EN.png": "cfac2220f8f94907520b7eeead229499",
"assets/assets/charts/Match-58-chart2-EN.png": "7bab6d84ea6931a95325806bddfa9598",
"assets/assets/charts/Match-59-chart2-DE.png": "f88b0d84ddf0511cdf11a53bca8bb0e2",
"assets/assets/charts/Match-52-chart2-EN.png": "7a4849a0b37ff7ebed7b2a034d83ff83",
"assets/assets/charts/Match-29-chart1.png": "3f7935e9888cadeb93ed6785ebba777b",
"assets/assets/charts/Match-6-chart2-DE.png": "422a4e173718cf1cab92b3f5f7916d34",
"assets/assets/charts/Match-69-chart2-EN.png": "0d4ae4d45a3b2a919a38578052d0b9e7",
"assets/assets/charts/Match-50-chart1.png": "1c8c22244aae8fa05bfe52c6a06d9098",
"assets/assets/charts/Match-44-chart2-EN.png": "f38854586f1cecf3a8765d164c2064b3",
"assets/assets/charts/Match-54-chart3.png": "e8cbb0d2bf5dfeccf0f615c92f2e0216",
"assets/assets/charts/Match-69-chart1.png": "8731b620707f638c3010419c1751d721",
"assets/assets/charts/Match-19-chart3.png": "b3619fb3ea1bb00cba18094ab095380f",
"assets/assets/charts/Match-65-chart2-EN.png": "17dac84c7a3324d21226e0faac050b3b",
"assets/assets/charts/Match-66-chart2-PT.png": "ed10dcbd2fd485279b625bda1d082c8d",
"assets/assets/charts/Match-46-chart2-PT.png": "e5220bec22f5498c518af749a80e4f33",
"assets/assets/charts/Match-50-chart2-EN.png": "b7c9f8c3663b279a620fff34d361d3d5",
"assets/assets/charts/Match-32-chart2-EN.png": "a7cfb33425dffe5fec55d8d8a2fe5347",
"assets/assets/charts/Match-1-chart1.png": "5a5fdc8f887dcb033ce7219a4070825e",
"assets/assets/charts/Match-48-chart2-EN.png": "75ad152003f4fec31f6a48471e2e7ac3",
"assets/assets/charts/Match-8-chart3.png": "380e569a57832fa0f3a63ece73d1320b",
"assets/assets/charts/Match-10-chart2-DE.png": "ecea25e9d5e4be84e81aacddadc1c250",
"assets/assets/charts/Match-57-chart2-DE.png": "935fca31ccb59800ee09442d3128b017",
"assets/assets/charts/Match-16-chart3.png": "adeef5dfcfc63f653128ae6067034a3f",
"assets/assets/charts/Match-32-chart2-PT.png": "147d9af1366b96084bb7fa56bfedd88f",
"assets/assets/charts/Match-67-chart2-PT.png": "c29a7fec0d8b76b8d925e97393b9c84e",
"assets/assets/charts/Match-47-chart2-DE.png": "91421a7cdf28cf7aad64d564b5f1f26d",
"assets/assets/charts/Match-64-chart3.png": "0482e7fe5775d5616c9305fe71c18322",
"assets/assets/charts/Match-41-chart2-PT.png": "de6b01cd804ad362466dc413a30a602c",
"assets/assets/charts/Match-54-chart2-PT.png": "f7931921fac62fd5dc31ffaf95b0f526",
"assets/assets/charts/Match-0-chart3.png": "9c80ee6f254d6985378721e8d2d27975",
"assets/assets/charts/Match-40-chart2-PT.png": "8c112cfddd16555504c9f95f68a4e5a9",
"assets/assets/charts/Match-41-chart1.png": "88a256fc7350c5cfc2da234f3916acd7",
"assets/assets/charts/Match-30-chart3.png": "2e2c88d2ff21901a3644dfd7a0712696",
"assets/assets/charts/Match-46-chart3.png": "2721f756e9343cbb5ee36fd4b5a33aa5",
"assets/assets/charts/Match-62-chart2-PT.png": "77ff25187e8f1ae813fe24f44bb18d66",
"assets/assets/charts/Match-64-chart2-DE.png": "2ae3f5c29be53c03c424536ccee5c1a4",
"assets/assets/charts/Match-58-chart1.png": "9871b8a0167236bc4bd57de4bf9a7859",
"assets/assets/charts/Match-1-chart2-PT.png": "b28d845f20fece536d6b2bbdeb9aef29",
"assets/assets/charts/Match-45-chart1.png": "c25a6a446eecaa1586967089da560d9e",
"assets/assets/charts/Match-67-chart2-EN.png": "4c90e37de801388026f2c68528553721",
"assets/assets/charts/Match-4-chart2-DE.png": "4fedd674296d64aeb504e7e1b8010a0e",
"assets/assets/charts/Match-39-chart2-DE.png": "2f5fd2c7a83e373ed902f1e396791248",
"assets/assets/charts/Match-58-chart2-DE.png": "622b0521f857c9b52788f198f62f9187",
"assets/assets/charts/Match-49-chart3.png": "3b77e299e61cd20137f3f1d652176642",
"assets/assets/charts/Match-32-chart1.png": "8ad78634de7ddbeb815249a57c2ad9f7",
"assets/assets/charts/Match-49-chart1.png": "7603abe415b4d1a80a7db8b00c9a0f46",
"assets/assets/charts/Match-16-chart2-DE.png": "2329a73043231465d3b44680e965dadf",
"assets/assets/charts/Match-13-chart2-EN.png": "01525e3afe6342e588cc70d199c8fe84",
"assets/assets/charts/Match-3-chart2-EN.png": "bf1a13a75a7fcb39dbcee4c1defcf27a",
"assets/assets/charts/Match-6-chart2-PT.png": "16023f7c93217d1fff320ec126ec1e83",
"assets/assets/charts/Match-52-chart1.png": "724bae30cf6f9cb9aebf1e951ff8b34b",
"assets/assets/charts/Match-45-chart3.png": "a7f21c31c868da7040527449e3a80f34",
"assets/assets/charts/Match-35-chart2-EN.png": "61cc1db066e9c9a4f8249773e0797ef8",
"assets/assets/charts/Match-8-chart2.png": "a8c76ac3c1d9718cb43930f24a6f40f7",
"assets/assets/charts/Match-17-chart2-PT.png": "485f7cfcf6a1fc7ede963aac2e21de49",
"assets/assets/charts/Match-68-chart2-PT.png": "86a6d33eed894319dcf69ca6ede3cd97",
"assets/assets/charts/Match-58-chart3.png": "58f910d231c76b212c59b14e7c602866",
"assets/assets/charts/Match-63-chart2-PT.png": "1a375ad731f34222c2ca74b0e405ae56",
"assets/assets/charts/Match-36-chart2-DE.png": "60bc03da6f6d154e58977a854706eae7",
"assets/assets/charts/Match-18-chart2-DE.png": "22b8386a4692b5dd8c7943ee9175acad",
"assets/assets/charts/Match-21-chart1.png": "104d79610d7a542c56dc1741558578dd",
"assets/assets/charts/Match-61-chart2-DE.png": "45fe2e2438fa4141158d5e80832fc0a2",
"assets/assets/charts/Match-39-chart3.png": "e7189296709082789e820ebfaa00aa64",
"assets/assets/charts/Match-10-chart1.png": "62e152d489f4f5075a3af46e51474e0b",
"assets/assets/charts/Match-66-chart2-DE.png": "c2c88824421f8396e16fbbcbf016e685",
"assets/assets/charts/Match-35-chart2-DE.png": "aac6ab183d8fb68d1f1afee3f16132b9",
"assets/assets/charts/Match-51-chart2-DE.png": "b4ef6ac9d7e7309dc32b6b38bfda726e",
"assets/assets/charts/Match-64-chart2-EN.png": "5454f56c0fd6c3899d6a97a887f6f47e",
"assets/assets/charts/Match-66-chart2-EN.png": "f0c6c38f131c08731210791275924cad",
"assets/assets/charts/Match-28-chart2-EN.png": "16a58ce76a7af68111c26324639751f3",
"assets/assets/charts/Match-41-chart3.png": "dcc244253583c1d4d93fe9ca062c994e",
"assets/assets/charts/Match-55-chart2-PT.png": "5554ac32177154ad6a428db3567f61f8",
"assets/assets/charts/Match-34-chart3.png": "2a70599d29701728d8a8996822b8173b",
"assets/assets/charts/Match-2-chart3.png": "b99eef8436716e70383b05dcf0d9f096",
"assets/assets/charts/Match-67-chart1.png": "18ec1f250ac5b7cac0bd59656eb3b6bc",
"assets/assets/charts/GrupoJ-qualify-EN.png": "5bd8cd506f83138a00337625215f450d",
"assets/assets/charts/Match-23-chart3.png": "631c439db0bdbc50ca522d8ce01917e6",
"assets/assets/charts/Match-29-chart3.png": "d8c418cdb2ad78682e57fe9eebbd2d77",
"assets/assets/charts/Match-43-chart1.png": "6da0b542960665b3dc8c802d785d734d",
"assets/assets/charts/Match-7-chart2-DE.png": "1c6228ab67d3a35488d1821f88892ea5",
"assets/assets/charts/Match-42-chart2-EN.png": "eb5a447db4e9911d9afc9b39ea3fef80",
"assets/assets/charts/Match-51-chart2-EN.png": "92f6c6eec98df36100359992d278476e",
"assets/assets/charts/Match-16-chart2-PT.png": "72843217a985f8b89f21540534ea704a",
"assets/assets/charts/Match-20-chart2-PT.png": "3cbea8fd52803d8fb34dd8173cdc7e41",
"assets/assets/charts/Match-50-chart2-PT.png": "438d84f068258a9814f6f24f1ec86f87",
"assets/assets/charts/Match-26-chart2-EN.png": "6be29fb8777e6fa0eec72a08f5106089",
"assets/assets/charts/Match-70-chart2-PT.png": "dc5d0c60c44cd53f4d44da1ea0bf5159",
"assets/assets/charts/Match-33-chart2-PT.png": "00535dff743337037f2547f164851323",
"assets/assets/charts/Match-31-chart2-EN.png": "ba8abb7a3e8fbf5ad881be2d21eab3c7",
"assets/assets/charts/Match-0-chart1.png": "90347d46e8dc7b690474ad79a7699930",
"assets/assets/charts/Match-62-chart1.png": "fa6c219124adfc8e9a490f9e58498b45",
"assets/assets/charts/Match-11-chart2-EN.png": "ed94ca02b3b86f87454758e2e47b8b63",
"assets/assets/charts/Match-38-chart3.png": "427fd1d696b83c4fae06526d73e88e16",
"assets/assets/charts/Match-31-chart2-DE.png": "34717eb3f1727c88edf9bc03fbfdf36c",
"assets/assets/charts/Match-10-chart2-PT.png": "8956ac687f02d9885f749210634ca223",
"assets/assets/charts/Match-55-chart2-DE.png": "b10f4a67f3341ad70a61050ee1763af0",
"assets/assets/charts/Match-32-chart3.png": "6542e98b5800ba9607ee1d2540fafe44",
"assets/assets/charts/Match-9-chart2-PT.png": "bf87a864968c431d66bbb90031edee83",
"assets/assets/charts/Match-3-chart2-PT.png": "f2304a28c0c72cca744254457774da44",
"assets/assets/charts/Match-56-chart1.png": "e3d323073bddd3294bb2519433d574e0",
"assets/assets/charts/Match-42-chart2-PT.png": "4db92557c54a4a51bbcab96524fd1075",
"assets/assets/charts/Match-3-chart2-DE.png": "3992815c3ba6a2e12c22cd7c6525a60f",
"assets/assets/charts/Match-18-chart2-PT.png": "7ff32a9ba6d82245445eb320570e670c",
"assets/assets/charts/Match-23-chart1.png": "464026835fd05b397861b0235fa73976",
"assets/assets/charts/Match-14-chart1.png": "c6ca95f3d61796ce71687256921bc2fb",
"assets/assets/charts/Match-65-chart1.png": "cff057d4160daf47d13a65b632b12f67",
"assets/assets/charts/Match-2-chart1-DE.png": "dea6b456c720638f4f22206d2ece9949",
"assets/assets/charts/Match-14-chart2-PT.png": "a1bd7cf2686d01bbc0c270f3bff47c51",
"assets/assets/charts/Match-24-chart3.png": "39ea31ce643a7e24b62ebddf04aa5a5e",
"assets/assets/charts/Match-45-chart2-PT.png": "21931b16eeaa8d4968029b8599a6e3da",
"assets/assets/charts/Match-18-chart1.png": "738e4f60f4e40f34f4e4e27045dee0e9",
"assets/assets/charts/Match-43-chart3.png": "cbcd75d71ad06c44e63376a7614f1459",
"assets/assets/charts/Match-17-chart1.png": "d613383ae01b988c98db08356da07f31",
"assets/assets/charts/Match-35-chart3.png": "c0d969ccb5b0f7c7dda534b8cb36e749",
"assets/assets/charts/Match-70-chart3.png": "f5fdc880d06424ef49f2d580fb64ab81",
"assets/assets/charts/Match-61-chart2-EN.png": "3140921400c7158d76baef4bcf89e173",
"assets/assets/charts/Match-35-chart2-PT.png": "3838d67666f9c9c5fe1cb050f35cb70f",
"assets/assets/charts/Match-44-chart2-DE.png": "929ad89a468843166fb3ea6b8ccb4f62",
"assets/assets/charts/Match-45-chart2-DE.png": "fa02cd385007ee5bc839ca1b97f53bb7",
"assets/assets/charts/Match-57-chart2-PT.png": "9ffc0ca3422ec2f5716688fb2ec071ea",
"assets/assets/charts/Match-59-chart2-PT.png": "61cbf11bbad4fbd45287f7c6292c061e",
"assets/assets/charts/Match-49-chart2-DE.png": "e09985ab6b17e01fc3d7b19f67c82d73",
"assets/assets/charts/Match-17-chart3.png": "a3e5b55c3ae118fcae988f4e3e9ef94d",
"assets/assets/charts/Match-8-chart2-DE.png": "786575355ca604053d9f570123d51fbc",
"assets/assets/charts/Match-46-chart1.png": "074549bbf74427b18a9c0cccbd31d4df",
"assets/assets/charts/Match-47-chart1.png": "e17cc379c095b7d95ce38e8da28eaee2",
"assets/assets/charts/Match-61-chart1.png": "0866d1f8780ac404616cb3058dd6aa29",
"assets/assets/charts/Match-39-chart2-EN.png": "b269df23d06aec3af9f020e2bd9b3306",
"assets/assets/charts/Match-34-chart1.png": "5a486ad8d5bb88001da430831ed87bad",
"assets/assets/charts/Match-40-chart2-DE.png": "c376adaf72edc4baa33a59714765936f",
"assets/assets/charts/Match-43-chart2-EN.png": "17b0ff398b5d723ed2cdf7d455dac130",
"assets/assets/charts/Match-2-chart1-PT.png": "5fed615fab657d619ec0ec16ebe85d5d",
"assets/assets/charts/Match-53-chart2-PT.png": "2fd9faa69f78d64374aabb2d11484500",
"assets/assets/charts/Match-56-chart2-EN.png": "db1c59979eda2b64f3d947beed3a0728",
"assets/assets/charts/Match-42-chart1.png": "9c16d45d4f9b9fd65c08493557b709ec",
"assets/assets/charts/Match-8-chart2-PT.png": "7e9672cd750a8634b966f6d15b262329",
"assets/assets/charts/Match-5-chart1.png": "2438cace44c0f834b7d14baf0393d2d9",
"assets/assets/charts/Match-51-chart2-PT.png": "7cc51af933e0dde723db7c647c5c86c1",
"assets/assets/charts/Match-21-chart2-EN.png": "d141e0e21c15e5e8912fad641dc2b2c1",
"assets/assets/charts/Match-15-chart2-EN.png": "3791d956ab504ba1d5f42c34c19d5651",
"assets/assets/charts/Match-55-chart3.png": "0b2e2576844372f64356b0a7fb193cb2",
"assets/assets/charts/Match-71-chart2-PT.png": "ba95eaefccbab363cdee4dd78a40a3ef",
"assets/assets/charts/Match-15-chart2-DE.png": "ae2bbd7d6dc3b527a267b456aa087ef2",
"assets/assets/charts/Match-64-chart1.png": "77be7cf8d6b09f51c378082924d408f1",
"assets/assets/charts/Match-33-chart3.png": "fcf266eb9caf79ff6670bf98706345f2",
"assets/assets/charts/Match-22-chart3.png": "afdb64b10e63331315f3e36e5771cdd9",
"assets/assets/charts/Match-53-chart2-EN.png": "9b47dee7af1e5e072c664fe86f0c9a27",
"assets/assets/charts/Match-8-chart2-EN.png": "79942c81d78aec6281a1e63d61652517",
"assets/assets/charts/Match-42-chart2-DE.png": "e511351c444e772cfbc016f192164ac7",
"assets/assets/charts/Match-38-chart2-DE.png": "48dde4bc7a06ff73e1deb63a956a6259",
"assets/assets/charts/Match-37-chart1.png": "77c9d38a16deebc3ca8d51b89fc4e59d",
"assets/assets/charts/Match-26-chart1.png": "b2f270646f8f9e595f71aa6353ca7271",
"assets/assets/charts/Match-26-chart3.png": "daf4d0276c77bb0d299af2d3663ac989",
"assets/assets/charts/Match-22-chart2-PT.png": "e1dbae284668fa597774baeff1a1a920",
"assets/assets/charts/Match-46-chart2-EN.png": "8a07118fcc103728fafc041b3e55f902",
"assets/assets/charts/Match-21-chart2-PT.png": "52dd9d9dcdc126a1500ed930d979235b",
"assets/assets/charts/Match-16-chart2-EN.png": "4e4e677818570053ef8ca1e4904de920",
"assets/assets/charts/Match-11-chart1.png": "4d36567ddb7f72c4f6d774ee024840ac",
"assets/assets/charts/Match-37-chart3.png": "0f06233611b3243a557daf0a0f1b1c2e",
"assets/assets/charts/Match-43-chart2-PT.png": "c28224a1e5c0bd0405884bfcba5de2ce",
"assets/assets/charts/Match-14-chart2-EN.png": "c9318641427cabba9e19c39ce807d77c",
"assets/assets/charts/Match-20-chart3.png": "c580c423076bdff3daeb58d73be437bc",
"assets/assets/charts/Match-18-chart2-EN.png": "27f95344229893ab5929fdbfc829dff8",
"assets/assets/charts/Match-30-chart2-EN.png": "edf1164729f6317b0db6f30c441073c0",
"assets/assets/charts/Match-26-chart2-DE.png": "814c85e5e9b5bba3f1d3204b42767119",
"assets/assets/charts/Match-22-chart1.png": "1cd5ddaa122db589c62fb83b4428d9a6",
"assets/assets/charts/Match-2-chart2-DE.png": "4105278bcaf696f05190b0c1c615df9d",
"assets/assets/charts/GrupoE-qualify-EN.png": "edc9707a4355afab657811e0a2aa2a4e",
"assets/assets/charts/Match-23-chart2-EN.png": "0e6316bd08f7331fa410cb86e53e4c2e",
"assets/assets/charts/Match-34-chart2-DE.png": "91018654c8f6d964fba89eb5105d7c39",
"assets/assets/charts/Match-6-chart1.png": "50653084136486948d2f1fd09718a082",
"assets/assets/charts/Match-50-chart3.png": "68d3386b293e707c71979e5fd98d6647",
"assets/assets/charts/Match-2-chart0.png": "46a3ffbf8d378f0923a761cabf11d90d",
"assets/assets/charts/Match-49-chart2-PT.png": "6d5fec0520a40505f8e7f5d905fe4f2b",
"assets/assets/charts/Match-60-chart3.png": "e586b80e62ee6a508ade53e634b79b62",
"assets/assets/charts/Match-5-chart2-EN.png": "3cfb72a6b3bfb5072c3cacdc3594a701",
"assets/assets/charts/Match-13-chart2-PT.png": "8163f72c05bff353392dc51532f06d7d",
"assets/assets/charts/Match-7-chart2.png": "d0a66b7887f61b7612a93f0a5edb800e",
"assets/assets/charts/Match-12-chart2-DE.png": "5705dac42f8f15b8b60793b060658858",
"assets/assets/charts/Match-15-chart1.png": "6ec8cddd2ebd46a8e8e05f8da35237be",
"assets/assets/charts/Match-13-chart3.png": "10e5147b976e9a856128ddc8ab73800f",
"assets/assets/charts/GrupoJ-qualify-DE.png": "8c4fe23070c2132ef68f97f26acee459",
"assets/assets/charts/Match-53-chart2-DE.png": "5948e5b88335df5634299d147f273bd4",
"assets/assets/charts/Match-57-chart1.png": "aba310b9d12da2d4f4191207eb83809b",
"assets/assets/charts/Match-5-chart2-PT.png": "2aa9bf32fe0d8775bff6fad67e6ff444",
"assets/assets/charts/Match-44-chart2-PT.png": "43d5a6de69b5ffeb579180b8864d7dd2",
"assets/assets/charts/Match-54-chart1.png": "e4bbc1ac0eb678fc56ec1440c6df6bdc",
"assets/assets/charts/Match-61-chart3.png": "3ee0cf4b9dfdfc57095e56a4130038e6",
"assets/assets/charts/Match-20-chart1.png": "8da65f9c018134742a26e8e6273bceb9",
"assets/assets/charts/Match-30-chart1.png": "5b66f6c825bf939ef913e1fb873b0640",
"assets/assets/charts/Match-17-chart2-DE.png": "db0340cf9cdbc15629156edc03e24715",
"assets/assets/charts/Match-37-chart2-DE.png": "450b2fac456212419b871bd5468824bc",
"assets/assets/charts/Match-21-chart3.png": "b12fa74e4c49ec7976f94151c744c746",
"assets/assets/charts/Match-27-chart2-DE.png": "91f026774419f9b4198f51a62d309431",
"assets/assets/charts/Match-12-chart2-PT.png": "5b79b0f99758abbbd84ecd9448e87537",
"assets/assets/charts/Match-60-chart2-EN.png": "041573e44e576e4cd1421763bee68db2",
"assets/assets/charts/Campeao-DE.png": "eba43a11ccc05e8da751dc955256d06c",
"assets/assets/charts/Match-12-chart3.png": "fb13937cc1b16391ee01db8dc362f7b1",
"assets/assets/charts/Match-24-chart2-DE.png": "d754ada029c14f43318c23ad11a499b0",
"assets/assets/charts/GrupoA-qualify-DE.png": "5b09bd6d4bc980f6a277511103cc4b4a",
"assets/assets/charts/Match-37-chart2-EN.png": "ebeb847700303e6daadc9b8f24cc236d",
"assets/assets/charts/Match-19-chart2-EN.png": "6bb30d288349ba09d5fa9dbed171a822",
"assets/assets/charts/Match-29-chart2-EN.png": "f06363b45eb7bd8a5f7c53bfefae4a86",
"assets/assets/charts/Match-16-chart1.png": "843301141de48311fbc52a1ae2b1f521",
"assets/assets/charts/Match-38-chart1.png": "4f1c1837fd1383f0dbadbcc0a0116db6",
"assets/assets/charts/Match-24-chart1.png": "1fdff33aa7973c1b795f3ae8219ddb69",
"assets/assets/charts/GrupoI-qualify-DE.png": "7da128f4ca3bc2872b8b4d6038bb0c0d",
"assets/assets/charts/Match-47-chart2-EN.png": "ae7815c5f50238ae1ba1012a98036c17",
"assets/assets/charts/Match-34-chart2-PT.png": "4c0eedd594dc429d595d90789ace0032",
"assets/assets/charts/Match-56-chart3.png": "99e5a9dedc8b46cf117363bc2ba1c19e",
"assets/assets/charts/Match-24-chart2-PT.png": "12688caa4074b071deea68c358731eae",
"assets/assets/charts/Match-70-chart2-DE.png": "bd76b57697538c300196ca0d5d1dae74",
"assets/assets/charts/Match-39-chart1.png": "63d0a4a7128827b53281ca7dfb15bea6",
"assets/assets/charts/Match-54-chart2-DE.png": "f5676ede74ec13496e8cdb19d33c112c",
"assets/assets/charts/Match-2-chart1.png": "c9126b0404271c2180b8d913cedfc834",
"assets/assets/charts/Match-68-chart3.png": "61af290d704d5a11ff4c1952792f60fc",
"assets/assets/charts/Match-11-chart3.png": "d7d7b5771b0aa4c294888ed26dfe6d15",
"assets/assets/charts/Match-68-chart1.png": "d838b7d1bf8c185ae079dec5043c61e4",
"assets/assets/charts/Match-65-chart2-DE.png": "0095063372d812c59d42bc3d900a1dc0",
"assets/assets/charts/Match-62-chart3.png": "59986cdafaa4b798443642a4ee24676f",
"assets/assets/charts/Match-51-chart3.png": "3ade19a15f04be7ba23f0b3ba7d3adbe",
"assets/assets/charts/Match-63-chart2-DE.png": "bb54c3e8ae23e26fa695359adb0418b9",
"assets/assets/charts/Match-65-chart3.png": "c48c2470cfb27f56a1f5c3d1b729b2df",
"assets/assets/charts/Match-59-chart2-EN.png": "97c0c5b8827cdbeaab7f3882269f53e5",
"assets/assets/charts/Match-57-chart2-EN.png": "68f54fc854fb649a13a7a8a0ac39c6d0",
"assets/assets/charts/Match-71-chart2-DE.png": "76cd2c9eda5242036c0d2014bed1de6c",
"assets/assets/charts/Match-30-chart2-PT.png": "af34049fad58a38d3377f2ec99e97852",
"assets/assets/charts/Match-4-chart3.png": "d379dc280985b12b0e19af7b91b0bce6",
"assets/assets/charts/Match-1-chart2-EN.png": "0f7afe7e1c11ab3f4cb82876d394071e",
"assets/assets/charts/Campeao-EN.png": "ed9d64082565a79e451e32febb80a41c",
"assets/assets/charts/Match-29-chart2-DE.png": "1fdd543c5e74f8fd530b7f0f197f751a",
"assets/assets/charts/Match-27-chart3.png": "c96898ae1569e93a4fa911950c89b69d",
"assets/assets/charts/Match-71-chart1.png": "209fdf8b58f8f5273cd881c54b2895ad",
"assets/assets/charts/Match-13-chart1.png": "1a5615685a4de8f35a7bf73cc0467dac",
"assets/assets/charts/Match-23-chart2-PT.png": "62cb8ddc21296e3aa5c947dd7d005524",
"assets/assets/charts/Match-4-chart1.png": "e064207025444a30afc16a22523c768e",
"assets/assets/charts/Match-22-chart2-EN.png": "745e2c665aed3b7176fe011084ff2d02",
"assets/assets/charts/Match-27-chart2-PT.png": "a7f3648b67b00f128cdf5dddd6cb5bd7",
"assets/assets/charts/Match-1-chart3.png": "992e573590d2d5d6a7ad44f653977b65",
"assets/assets/charts/Match-69-chart2-DE.png": "791103b1100fcd8ed48cf294098e7ff4",
"assets/assets/charts/Match-40-chart2-EN.png": "16d6a4a5de7ab742742c1a214e6b6ae8",
"assets/assets/charts/Match-71-chart2-EN.png": "02a25093f86bf28d473a95ca5796afc1",
"assets/assets/charts/Match-55-chart2-EN.png": "c3561c20df0e8025f539866f0d5158d9",
"assets/assets/charts/Match-37-chart2-PT.png": "538acceb8d45bbcab6d2331c1a358ed5",
"assets/assets/charts/Match-55-chart1.png": "115fc0476ed5b46c982215c3b46c4ca3",
"assets/assets/charts/Match-31-chart2-PT.png": "5f38e29796c04a5d0e100c5989931165",
"assets/assets/charts/Match-3-chart3.png": "ec6232a8d48fc0a2022e0cc3fa0d2cc4",
"assets/assets/charts/Match-13-chart2-DE.png": "569704acf59b633f03ea5e03fe0fe604",
"assets/assets/charts/Match-56-chart2-PT.png": "bdeb9c6433155c9348080681f0e096ef",
"assets/assets/charts/Match-19-chart2-DE.png": "12667fcc38834c53de7edb5e16f819ad",
"assets/assets/charts/Match-10-chart3.png": "2de16ae88ad13a468a0f059fc5d71933",
"assets/assets/charts/Match-69-chart3.png": "cbd941176336bb6799a20f35fb818e15",
"assets/assets/charts/Match-14-chart2-DE.png": "bc2a34bffefab307e4546abc1eec9171",
"assets/assets/charts/Match-48-chart2-PT.png": "d4131ad614f474f02a8c206b52b3e253",
"assets/assets/charts/Match-25-chart2-DE.png": "ce6250a3b8ff3fe2facfed950f474ef6",
"assets/assets/charts/Match-40-chart1.png": "516d6cb778bee28169785935146c0055",
"assets/assets/charts/Match-54-chart2-EN.png": "1c568ad345d4c15438a8f456eba93f13",
"assets/assets/charts/Match-6-chart2.png": "345bc05718889211d73ef61e6ba51978",
"assets/assets/charts/Match-23-chart2-DE.png": "478f0a402a86c01614ff4ca9bab6c7de",
"assets/assets/charts/GrupoE-qualify-PT.png": "4562cf9a9fd5ce35900ca80cc9504467",
"assets/assets/charts/Match-65-chart2-PT.png": "b3e51c9e839cc19e0bdb50b0a15691e3",
"assets/assets/charts/Match-36-chart1.png": "061ae64a33e906fc107e49e4168bd629",
"assets/assets/charts/Match-60-chart2-DE.png": "4147b5a5e5718b8f71f9a38d74cab2cb",
"assets/assets/charts/Match-52-chart2-DE.png": "f85934cc8b30aaf9fd6825413e9b8b97",
"assets/assets/charts/Match-58-chart2-PT.png": "d0a4c4aeb6e54dd8003ec0507aabd08c",
"assets/assets/charts/Match-59-chart3.png": "733eba0df7dfe91bcac1bfc38beab916",
"assets/assets/charts/GrupoI-qualify-EN.png": "14ccaca0e151ff9af0c7dd3a9315bc9b",
"assets/assets/charts/Match-12-chart1.png": "26b852c9a494a5862e8231573d8ec766",
"assets/assets/charts/Match-25-chart1.png": "47e3154901462a4ab7756d48eaec2c6d",
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
