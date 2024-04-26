
  ;(function(){
  let u=void 0,isReady=false,onReadyCallbacks=[],isServiceReady=false,onServiceReadyCallbacks=[];
  const __uniConfig = {"pages":[],"globalStyle":{"backgroundColor":"#F8F8F8","navigationBar":{"backgroundColor":"#F8F8F8","titleText":"uni-app","style":"custom","type":"default","titleColor":"#000000"},"isNVue":false},"nvue":{"compiler":"uni-app","styleCompiler":"uni-app","flex-direction":"column"},"renderer":"auto","appname":"payment-app","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":true},"compilerVersion":"4.08","entryPagePath":"pages/login/login","entryPageQuery":"","realEntryPagePath":"","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000},"tabBar":{"position":"bottom","color":"#999","selectedColor":"#007aff","borderStyle":"white","blurEffect":"none","fontSize":"10px","iconWidth":"24px","spacing":"3px","height":"50px","list":[{"text":"首页","pagePath":"pages/index/index","iconPath":"/static/icon/shouye1.png","selectedIconPath":"/static/icon/shouye2.png"},{"text":"账单","pagePath":"pages/bill/bill","iconPath":"/static/icon/zhangdang1.png","selectedIconPath":"/static/icon/zhangdang2.png"},{"text":"报表","pagePath":"pages/reportForms/reportForms","iconPath":"/static/icon/baobiao1.png","selectedIconPath":"/static/icon/baobiao2.png"},{"text":"我的","pagePath":"pages/personalCenter/personalCenter","iconPath":"/static/icon/wode1.png","selectedIconPath":"/static/icon/wode2.png"}],"selectedIndex":0,"shown":true},"locales":{},"darkmode":false,"themeConfig":{}};
  const __uniRoutes = [{"path":"pages/login/login","meta":{"isQuit":true,"isEntry":true,"enablePullDownRefresh":false,"navigationBar":{"titleText":"登录","style":"default","type":"default"},"isNVue":false}},{"path":"pages/index/index","meta":{"isQuit":true,"isTabBar":true,"tabBarIndex":0,"enablePullDownRefresh":false,"navigationBar":{"titleText":"首页","type":"default"},"isNVue":false}},{"path":"pages/personalCenter/personalCenter","meta":{"isQuit":true,"isTabBar":true,"tabBarIndex":3,"enablePullDownRefresh":false,"navigationBar":{"titleText":"我的","type":"default"},"isNVue":false}},{"path":"pages/bill/bill","meta":{"isQuit":true,"isTabBar":true,"tabBarIndex":1,"enablePullDownRefresh":false,"navigationBar":{"titleText":"账单","type":"default"},"isNVue":false}},{"path":"pages/reportForms/reportForms","meta":{"isQuit":true,"isTabBar":true,"tabBarIndex":2,"enablePullDownRefresh":false,"navigationBar":{"titleText":"报表","type":"default"},"isNVue":false}},{"path":"pages/personalCenter/application/applicationStatus","meta":{"enablePullDownRefresh":false,"navigationBar":{"titleText":"申请状态","style":"default","type":"default"},"isNVue":false}},{"path":"pages/personalCenter/application/applicationAll","meta":{"enablePullDownRefresh":false,"navigationBar":{"titleText":"所有申请","style":"default","type":"default"},"isNVue":false}},{"path":"pages/personalCenter/storeManagement/storeManagement","meta":{"enablePullDownRefresh":false,"navigationBar":{"titleText":"商铺管理","style":"default","type":"default"},"isNVue":false}},{"path":"pages/personalCenter/userOpinion/userOpinion","meta":{"enablePullDownRefresh":false,"navigationBar":{"titleText":"意见反馈","style":"default","type":"default"},"isNVue":false}},{"path":"pages/personalCenter/storeManagement/storeDetails/storeDetails","meta":{"enablePullDownRefresh":false,"navigationBar":{"titleText":"店铺详情","style":"default","type":"default"},"isNVue":false}},{"path":"pages/personalCenter/unsubscribe/unsubscribe","meta":{"enablePullDownRefresh":false,"navigationBar":{"titleText":"注销账户","style":"default","type":"default"},"isNVue":false}},{"path":"pages/personalCenter/changePassword/changePassword","meta":{"enablePullDownRefresh":false,"navigationBar":{"titleText":"修改密码","style":"default","type":"default"},"isNVue":false}},{"path":"pages/personalCenter/chatWindow/chatWindow","meta":{"enablePullDownRefresh":false,"navigationBar":{"titleText":"联系我们","style":"default","type":"default"},"isNVue":false}},{"path":"pages/personalCenter/showCashOutStore/showCashOutStore","meta":{"enablePullDownRefresh":false,"navigationBar":{"titleText":"可提现","style":"default","type":"default"},"isNVue":false}},{"path":"pages/personalCenter/showCashOutStore/cashOut/cashOut","meta":{"enablePullDownRefresh":false,"navigationBar":{"titleText":"提现","style":"default","type":"default"},"isNVue":false}},{"path":"pages/personalCenter/showAuditStoreMoney/showAuditStoreMoney","meta":{"enablePullDownRefresh":false,"navigationBar":{"titleText":"待审核","style":"default","type":"default"},"isNVue":false}},{"path":"pages/bill/getDailyOrder/getDailyOrder","meta":{"enablePullDownRefresh":false,"navigationBar":{"titleText":"当天订单","style":"default","type":"default"},"isNVue":false}},{"path":"pages/bill/getDailyOrder/orderDetail/orderDetail","meta":{"enablePullDownRefresh":true,"navigationBar":{"titleText":"订单详情","style":"default","type":"default"},"isNVue":false}},{"path":"pages/login/regist/regist","meta":{"enablePullDownRefresh":false,"navigationBar":{"titleText":"注册","style":"default","type":"default"},"isNVue":false}},{"path":"pages/login/forgetPwd/forgetPwd","meta":{"enablePullDownRefresh":false,"navigationBar":{"titleText":"重置密码","style":"default","type":"default"},"isNVue":false}},{"path":"pages/index/merchantSettled/merchantSettled","meta":{"enablePullDownRefresh":false,"navigationBar":{"titleText":"商家入驻","type":"default"},"isNVue":false}},{"path":"pages/index/trade/trade","meta":{"enablePullDownRefresh":false,"navigationBar":{"titleText":"最新交易","type":"default"},"isNVue":false}},{"path":"pages/index/unusualOrders/unusualOrders","meta":{"enablePullDownRefresh":false,"navigationBar":{"titleText":"异常订单","type":"default"},"isNVue":false}},{"path":"pages/index/pay/pay","meta":{"enablePullDownRefresh":false,"navigationBar":{"titleText":"支付","type":"default"},"isNVue":false}},{"path":"pages/message/message","meta":{"enablePullDownRefresh":false,"navigationBar":{"titleText":"聊天框","type":"default"},"isNVue":false}},{"path":"pages/identify/identify","meta":{"enablePullDownRefresh":false,"navigationBar":{"titleText":"","type":"default"},"isNVue":false}}].map(uniRoute=>(uniRoute.meta.route=uniRoute.path,__uniConfig.pages.push(uniRoute.path),uniRoute.path='/'+uniRoute.path,uniRoute));
  __uniConfig.styles=[];//styles
  __uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
  __uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
  service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:16})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:u,window:u,document:u,frames:u,self:u,location:u,navigator:u,localStorage:u,history:u,Caches:u,screen:u,alert:u,confirm:u,prompt:u,fetch:u,XMLHttpRequest:u,WebSocket:u,webkit:u,print:u}}}}); 
  })();
  