<template>
  <div class="container">
    <div class="content">
      <h2 class="tc">手机号码注册</h2>
      <van-cell-group>
        <van-field
          v-model="name"
          label="姓名"
          placeholder="请输入用户名"
        />
        <van-field
          v-model="phone"
          type="tel"
          label="手机号"
          placeholder="请输入手机号"
        />
        <van-field
          v-model="code"
          center
          clearable
          label="短信验证码"
          placeholder="请输入验证码"
        >
          <van-button slot="button" size="small" type="primary" :disabled="!canSend" @click='sendCode'>{{codeText}}</van-button>
        </van-field>
        <van-field
          v-model="sn"
          label="SN"
          placeholder="请输入SN"
        />
      </van-cell-group>
      <div class="b" @click='onSubmit'>
        确认提交
      </div>
    </div>
  </div>
</template>

<script>
import api from "../api/api.js";
export default {
  data() {
    return {
      codeText: "发送验证码",
      canSend: true,
      name: "",
      phone: "",
      code: "",
      phone: "",
      sn: ""
    };
  },
  methods: {
    async sendCode() {
      if (this.canSend) {
        this.canSend = false;
        const res = await api.send_vcode({
          type: 0,
          phone: this.phone
        });
        if (res.error_no == 0) {
          let count = res.data.seconds;
          this.$toast.success("短信发送成功");
          this.codeText = `已发送(${count})`;
          let timer = setInterval(() => {
            if (--count > 0) {
              this.codeText = `已发送(${count})`;
            } else {
              this.canSend = true;
              this.codeText = "发送验证码";
              clearInterval(timer);
            }
          }, 1000);
        }
      }
    },
    async register() {
      const res = await api.register({
        name: this.name,
        phone: this.phone,
        vcode: this.code
      });
      if (res.error_no == 0) {
        this.buy_course();
      }
    },
    async buy_course() {
      if (this.sn) {
        const res = await api.buy_course({
          sn: this.sn
        });
        if (res.error_no == 0) {
          this.$dialog({ message: "注册成功" });
          this.$emit("submitsuccess");
          // this.$router.replace({ path: "center" });
        }
      } else {
        this.$toast.fail("请输入SN码");
      }
    },
    vaild() {
      if (!this.name) {
        this.$toast.fail("请输入姓名");
        return;
      }
      if (!this.phone) {
        this.$toast.fail("请输入姓名");
        return;
      }
      if (!this.code) {
        this.$toast.fail("请输入短信验证码");
        return;
      }
      return true;
    },
    onSubmit() {
      if (this.vaild()) {
        this.register();
      }
    }
  },
  async activated() {},
  computed: {},
  async mounted() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
.b {
  margin: 0.1rem auto;
  width: 50%;
  color: #fff;
  font-size: 14px;
  text-align: center;
  height: 35px;
  line-height: 35px;
  border-radius: 3px;
  background-color: #07c160;
  margin-top: 0.3rem;
}
.content {
  padding-bottom: 0.3rem;
  background-color: #fff;
  width: 90%;
  border-radius: 15px;
  overflow: hidden;
  h2 {
    padding: 0.3rem 0;
  }
}
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1001;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
}
</style>
