# vue-mobile-toast
The Toast for VUE, the Toast is the small message box in the Android.  
这个组件和安卓系统里面的原生Toast组件一模一样哦，不过这里的样式借鉴了MIUI。最适合做一些消息提醒。

## 安装为全局方法
```javascript
import installToast from './component/toast/install'
Vue.use(installToast)
```

## 使用
使用任意Vue实例调用
```javascript
vm.$toast.show("这是一个Toast")
```

![截图](https://github.com/BingLee1994/vue-mobile-toast/blob/master/screenshot.png)
