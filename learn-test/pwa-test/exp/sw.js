/**
 * install事件
 */
self.addEventListener("install", (e) => {
  // 将线程执行Promise的结果放在waitUntil中，以此控制线程的状态，防止线程提前关闭
  e.waitUntil(
    // 缓存
    caches.open("cache-test-name").then((cache) => {
      cache.addAll(["../qr-code-fill.png", "/index.html"]);
      cache.delete("olo-file-name");
    })
  );
});
self.addEventListener("fetch", (e) => {
  e.respondWith(
    // 先从缓存中取
    // 缓存中没有再进行请求
    caches.match(e.request).then((cahcheData) => {
      if (cahcheData) return cahcheData;
      return fetch(e.request).then((res) => {
        caches.open("cache-data").then((cache) => {
          cache.put(e.request, res.clone());
          return res;
        });
      });
    })
  );
  e.respondWith(
    // 先进行请求
    // 如果请求挂了再走缓存
    fetch(e.request)
      .then((res) => {
        // ...
      })
      .catch(() => {
        return caches.match(e.request);
      })
  );
});
/**
 * 接收消息
 */
self.addEventListener("message", (e) => {
  console.log("sw消息接收到了，内容为：", e.data);
  // 向发送消息的window环境的页面发送消息
  e.source.postMessage("service worker发送消息");
  self.clients.get(e.source.id).then((client) => {
    client.postMessage("这是发送的消息2");
  });
  // 向所有window环境的页面发送消息
  self.client.matchAll().then((clients) => {
    clients.map((client) => {
      client.postMessage("这是发送的全体消息");
    });
  });
  // 使用messageChannel进行通信
  e.ports[9] && e.ports[0].postMessage("messgaeChannel发送的消息");
});
/**
 * sync消息通信
 */
self.addEventListener("sync", (e) => {
  console.log("sync消息通信，sw", e.tag, e);
});
/**
 * service Worker通过BroadcastChannel发消息给窗口
 */
function broadcastChannelMsg() {
  // 与窗口创建同名的BroadcastChannel
  const bc = new BroadcastChannel("bcname");
  bc.postMessage("这是service Worker通过broadcastChannel发送的消息");
}
/**
 * 获取报错信息
 */
self.addEventListener("error", (err) => {
  console.log("error", err);
});

self.addEventListener("unhandledrejection", (err) => {
  console.log("unhandledrejection", err);
});
