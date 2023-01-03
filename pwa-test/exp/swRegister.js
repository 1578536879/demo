class swRegister {
  constructor(props) {
    this.path = props.path;
    this.name = props.name;
    this.swReg = null;
    this.props = props;
  }
  /**
   * 注册
   */
  register() {
    const url = `${this.path}/${this.name}`;
    navigator.serviceWorker
      .register(url)
      .then((swReg) => {
        this.swReg = swReg;
      })
      .catch((err) => {
        console.log("注册失败--error:", err);
      });
  }
  /**
   * 注销service worker
   */
  unregister() {
    navigator.serviceWorker.ready.then((swReg) => {
      swReg.unregister((res) => {
        res && console.log("注销成功");
      });
    });
  }
  /**
   * 更细站点
   */
  update() {
    const swReg = this.swReg;
    swReg.onupdatefound = () => {
      const installing = swReg.installing;
      if (installing === null) {
        return;
      }
      installing.onstatechange = () => {
        if (navigator.serviceWorker.controller) {
          console.log("已安装更新");
          this.props.onUpdae && this.props.onUpdae(this.swReg);
        } else {
          console.log("已安装");
          this.props.onSuccess && this.props.onSuccess(this.swReg);
        }
      };
    };
  }
  /**
   * 发送消息
   * @param {string} msg 
   */
  postMessage(msg){
    navigator.serviceWorker.controller.postMessage(msg)
  }
  /**
   * 接收消息
   */
  onmessage(){
    navigator.serviceWorker.onmessage = (e) => {
      console.log("onmessage: ", e.data)
    }
  }
  /**
   * sync消息通信
   */
  syncRegister(content){
    navigator.serviceWorker.ready.then(swReg=>{
      swReg.sync.register(content)
    })
  }
  /**
   * 通过messageChannel进行通信
   * @param {string} msg 
   */
  messgaeChannel(msg){
    const msgcon = new MessageChannel()
    // 使用messageChannel时，每次都需要创新新通道
    // 因为messageChannel会受到Service Worker的stopWorker的影响
    navigator.serviceWorker.controller.postMessage(msg, [msgcon.port2])
    msgcon.port1.onmessage = (e) => {
      console.log("收到messageChannel消息", e.data)
    }
  }
  /**
   * 通过broadcastChannel接收消息
   */
  broadcastChannelMsg(){
    const bc = new BroadcastChannel("bcname")
    bc.onmessage = (e) => {
      console.log("窗口通过broadcastChannel收到消息", e.data)
    }
  }
}
