<template>
  <transition name="toast-ani" @after-leave="closed">
    <div class="toast" v-if="isShow">
      <slot></slot>
    </div>
  </transition>
</template>

<script>
//不要把Toast作为组件使用，使用install.js里面的全局方法
//vm.$toast.show('这是一个Toast')

const DURATION_SHORT = 1.5;
const DURATION_LONG = 3;

export default {
  name: "toast",
  props: {
    duration: Number,
  },
  data() {
    return {
      isShow: false,
    };
  },
  mounted() {
    this.isShow = true;
    let duration = this.$props.duration === 1 ? DURATION_LONG : DURATION_SHORT;
    setTimeout(() => {
      this.isShow = false;
    }, duration * 1000);
  },
  methods: {
    closed() {
      this.closed && this.closed();
    },
  },
};
</script>

<style lang="css">
.toast-ani-enter {
  opacity: 0;
  transform: translate(-50%, 30px) scale(0.8) !important;
  transform-origin: center;
}
.toast-ani-enter-active {
  transition: all 0.3s ease;
}
.toast-ani-enter-to {
  opacity: 1;
  transform: translate(-50%, 0) scale(1);
}
.toast-ani-leave {
  opacity: 1;
}
.toast-ani-leave-active {
  transition: opacity 0.3s ease;
}
.toast-ani-leave-to {
  opacity: 0;
}

.toast {
  text-align: center;
  white-space: pre-wrap;
  transform: translate(-50%, 0);
  position: fixed;
  bottom: 40px;
  left: 50%;
  max-width: 70%;
  padding: 15px 20px;
  border-radius: 25px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background: white;
  filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 0.1));
  color: rgba(0, 0, 0, 0.8);
  z-index: 999999;
}
</style>
