const CACHA_NAME = "pwa-name";

self.addEventListener("install", function (e) {
  console.log("install");
  self.skipWaiting();
//   e.waitUntil(
//     caches.open(CACHA_NAME).then((cache) => {
//       cache.addAll([
//         "worktable-erp/images/xiaowei_zhuli.png",
//         "404Page.html",
//       ]);
//     })
//   );
});

self.addEventListener("activate", function (e) {
  console.log("activate");
  clients.claim();
});
// 拦截网络请求
self.addEventListener("fetch", (e) => {
  console.log(e);
  // 可以替换请求的内容
  // return e.respondWith(fetch("worktable-erp/images/xiaowei_zhuli.png?v=22"))
  // 404跳转页面
  // if(e.request.mode === "navigate"){
  //     return e.respondWith(fetch("404Page.html").then(res=>{
  //         if(res.status === 404){
  //             return fetch("404Page.html")
  //         }
  //     }))
  // }

  // 缓存
  return e.respondWith(
    fetch(e.request)
    .then((res) => {
      return res;
    }).catch(err=>{
        console.log(err);
        return caches.open(CACHA_NAME).then(cache=>{
            return cache.match(e.request).then(response=>{
              return  response ? response : cache.match("404Page.html")
            })
        })
    })
  );
});


