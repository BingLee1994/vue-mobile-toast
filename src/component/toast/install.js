import Toast from './toast.vue'
import Vue from 'vue'

const ToastConstructor = Vue.extend(Toast)
const DURATION_LONG = 1
const DURATION_SHORT = 0

let toastIsShowing = false
let toastQueue = []
let curToast = null

function enqueueToast(msg, duration) {
    toastQueue.push({ msg, duration })
}

function dequeueToast() {
    return toastQueue.shift()
}

function mount(msg, duration = DURATION_SHORT) {
    if (!toastIsShowing) {
        let toast = new ToastConstructor({
            propsData: { duration }
        })
        toast.$slots.default = [msg]
        toast.closed = () => {
            toastIsShowing = false
            showNextToastIfNeed()
        }

        let el = document.createElement('div')
        document.body.appendChild(el)
        toast.$mount(el)
        toastIsShowing = true
        curToast = toast
    } else {
        enqueueToast(msg, duration)
    }
}

function unmount() {
    if (!toastIsShowing && curToast) {
        curToast.$destroy()
        curToast.$el.parentElement.removeChild(curToast.$el)
        curToast = null
    }
}

function showNextToastIfNeed() {
    unmount()
    if (toastQueue.length > 0) {
        let { msg, duration } = dequeueToast()
        mount(msg, duration)
    }
}

export { DURATION_LONG, DURATION_SHORT }

const toastUtil = {
    DURATION_LONG,
    DURATION_SHORT,
    show(msg, duration) {
        mount(msg, duration)
    }
}

Object.defineProperty(toastUtil, 'isShowing', {
    get() {
        return toastIsShowing
    }
})

export default {
    //将Toast方法安装到Vue全局
    //用法 vm.$toast.show()
    install(Vue) {
        Vue.prototype.$toast = toastUtil
    }
}
