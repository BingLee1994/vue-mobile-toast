import Vue from 'vue'
import installToast from './component/toast/install'

//安装Toast
Vue.use(installToast)

new Vue({
    data: {
        message: ''
    },
    methods: {
        showToast() {
            if (this.message) {
                this.$toast.show(this.message)
            }
        }
    },
    render(h) {
        return (
            <div class="box">
                <p class="title">这个组件和安卓系统里面的原生Toast组件一模一样哦，不过这里的样式借鉴了MIUI。</p>
                <p><input type="text" placeholder="请输入输入一段Toast文本" onchange={e => this.message = e.target.value}/></p>
                <button class="btn-primary" onclick={this.showToast}>发射Toast</button>
            </div>
        )
    }
}).$mount('#app')
