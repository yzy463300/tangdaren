<template>
  <div class="container" v-show='isShow'>
    <div class="content bbox tc">
      <div class="img"><img :src="dataList[star_id - 1]['img']" alt=""></div>
      <div class="tip">已有{{helper_count}}位好友与你一起打call：</div>
      <div class="head_list">
        <div class="head_wrap"><img :src="headList[0] || require('../assets/friend.png')" alt=""></div>
        <div class="head_wrap"><img :src="headList[1] || require('../assets/friend.png')" alt=""></div>
        <div class="head_wrap"><img :src="headList[2] || require('../assets/friend.png')" alt=""></div>
        <div class="more" @click='friendShow = true' v-if="headList.length >= 3"><img src="../assets/more.png" alt=""></div>
      </div>
      <div class="count">{{target}}位好友共同打call即可免费领取门票</div>
      <div class="is_self" v-if='is_self'>
        <div class="event_btn">
          <img v-if="status == 3" src="../assets/8.png" alt="">
          <img v-else @click="draw" src="../assets/1.png" alt="">
        </div>
        <div class="bottom_btn">
          <router-link to="/" replace><img src="../assets/3.png" alt="" class="return"></router-link>
          <img @click='shareShow = true' src="../assets/4.png" alt="" class="share_btn">
        </div>
      </div>
      <div class="is_other" v-else>
        <img @click='onCall' class="b2" :class="[is_helped==true ?'disabled':'']" src="../assets/2.png" alt="">
        <router-link to="/" replace><img class="b5" src="../assets/5.png" alt=""></router-link>
      </div>
      
    </div>
    <!-- 头像列表 -->
    <div class="head_mask alert" v-show='friendShow' @click='friendShow = false'>
      <div class="main vtc" @click.stop>
        <img @click='friendShow = false' src="../assets/x.png" alt="" class="close">
        <div class="list bbox scroll">
          <div class=" head_wrap" v-for='(item,index) in helpers' :key='index'>
            <img :src="item" alt="">
          </div>
        </div>
      </div>
    </div>
    <!-- 打call成功 -->
    <div class="call alert" v-show='callShow'>
      <div class="main vtc bbox tc">
        <img @click='callShow = false' src="../assets/tick.png" alt="" class="close">
        <img src="../assets/call.png" alt="" class="title">
        <p class="name">{{dataList[star_id-1]['name']}}</p>
        <p class="text">邀请您一起来汤达人元气音乐节</p>
        <p class="btn"><router-link to='/' replace><img src="../assets/6.png" alt=""></router-link></p>
      </div>
    </div>
    <!-- 填写表单 -->
    <div class="form alert" v-show='formShow' @click='formShow = false'>
      <div class="main bbox vtc tc" @click.stop>
        <img src="../assets/success.png" alt="" class="title">
        <p class="t">获得汤达人元气音乐会门票1张</p>
        <p class="photo"><img src="../assets/form_demo.png" alt=""></p>
        <div class="input_wrap"><input type="text" v-model='name' placeholder="请输入您的姓名"></div>
        <div class="input_wrap"><input type="text" v-model="phone" placeholder="请输入您的手机号"></div>
        <p class="tx">请填写您真实有效手机号码,门票将短信发送至您手机</p>
        <p class="btn"><img @click='onSubmit' src="../assets/7.png" alt=""></p>
      </div>
    </div>
    <!-- share -->
    <div class="share alert" v-show='shareShow' @click='shareShow = false'>
      <img src="../assets/fenxiang.png" alt="" class="img">
    </div>
    <!-- rule -->
    <div class="rule alert" v-show='ruleShow'>
      <div class="main vtc tc">
        <img src="../assets/rule.png" alt="" class="i1">
        <img @click='ruleShow = false' src="../assets/get.png" alt="" class="i2">
        <img @click='ruleShow = false' src="../assets/x.png" alt="" class="close">
      </div>
    </div>
  </div>
</template>

<script>
import api from "../api/api";
import Weixin from "../utils/weixin";
export default {
  data() {
    return {
      isShow: false,
      is_self: false,
      callShow: false,
      friendShow: false,
      formShow: false,
      shareShow: false,
      ruleShow: false,
      star_id: 1,
      name: "",
      phone: "",
      dataList: [
        {
          name: "新裤子乐队",
          img: require("../assets/detail1.jpg")
        },
        {
          name: "胡夏",
          img: require("../assets/detail2.jpg")
        },
        {
          name: "Ice",
          img: require("../assets/detail3.jpg")
        }
      ],
      headList: [],
      helpers: [],
      status: 0,
      target: 0,
      is_helped: false,
      helper_count: 0
    };
  },
  watch: {
    friendShow(val) {
      if (val) {
        this.helpers = [];
        this.get_helpers();
      }
    }
  },
  mounted() {},
  activated() {
    this.isShow = false;
    this.is_self = false;
    this.callShow = false;
    this.friendShow = false;
    this.formShow = false;
    this.shareShow = false;
    this.ruleShow = false;
    this.star_id = +this.$route.query.star_id;
    this.user_id = +this.$route.query.user_id;
    this.get_help_detail();
  },
  methods: {
    draw() {
      if (this.status == 2) {
        this.$dialog({ message: "库存不足" });
      } else if (this.status == 1) {
        this.formShow = true;
      } else {
        this.$dialog({ message: `${this.target}位好友打call即可领取` });
      }
    },
    async take_ticket() {
      const res = await api.take_ticket({
        name: this.name,
        phone: this.phone
      });
      console.log(res);
      if (res.error_no == 0) {
        this.formShow = false;
        this.$dialog({ message: "提交成功" });
        this.get_help_detail();
      }
    },
    async onCall() {
      if (this.is_helped) {
        return;
      }
      const res = await api.help({
        user_id: this.user_id,
        star_id: this.star_id
      });
      if (res.error_no == 0) {
        this.callShow = true;
        this.get_help_detail();
      }
    },
    async get_helpers() {
      const res = await api.get_helpers({
        user_id: this.user_id,
        star_id: this.star_id,
        page: this.page++,
        size: 30
      });
      if (res.error_no == 0) {
        if (res.data.has_more) {
          this.get_helpers();
        }
        this.helpers = this.helpers.concat(res.data.helpers);
      }
    },
    async get_help_detail() {
      const res = await api.get_help_detail({
        user_id: this.user_id,
        star_id: this.star_id
      });
      if (res.error_no == 0) {
        this.star_id = +res.data.star_id;
        this.is_self = res.data.is_self;
        this.status = res.data.status;
        this.is_helped = res.data.is_helped;
        this.helper_count = res.data.helper_count;
        this.headList = res.data.helpers;
        this.target = res.data.target;
        this.isShow = true;
        Weixin({
          img_url: require("../assets/thumb.jpg"),
          link: location.href,
          title: "汤达人元气音乐节，为你的爱豆打CALL",
          desc: "2019年汤达人元气音乐节长沙站，快来和你的爱豆见面吧"
        });
      }
    },
    onSubmit() {
      if (!this.name) {
        this.$toast.fail("请填写姓名");
        return;
      }
      if (!this.phone) {
        this.$toast.fail("请填写手机号");
        return;
      }
      this.take_ticket();
    }
  },
  components: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
.b2 {
  margin-top: 0.2rem;
  width: 3.08rem;
}
.b2.disabled {
  -webkit-filter: grayscale(100%); /* Chrome, Safari, Opera */
  filter: grayscale(100%);
}
.b5 {
  margin-top: 0.3rem;
  width: 3.08rem;
}
.rule {
  .close {
    position: absolute;
    right: -0.3rem;
    top: -0.4rem;
    width: 1.01rem;
  }
  .i1 {
    width: 6.09rem;
  }
  .i2 {
    margin-top: 0.4rem;
    width: 6.03rem;
  }
}
.share {
  img {
    position: absolute;
    right: 0.4rem;
    top: 0.4rem;
    width: 1.48rem;
    height: 2.26rem;
    animation: fadeIn 1s infinite alternate;
  }
}
.form {
  .main {
    padding: 0.4rem;
    width: 6.37rem;
    background-color: #fff;
    border-radius: 0.2rem;
    .title {
      width: 1.7rem;
      height: 0.55rem;
    }
    .t {
      font-size: 0.28rem;
      padding-top: 0.3rem;
      padding-bottom: 0.2rem;
    }
    .photo {
      margin-bottom: 0.4rem;
      img {
        width: 4.14rem;
        height: 1.75rem;
      }
    }
    .input_wrap {
      margin: 0.2rem auto;
      width: 4.14rem;
      padding: 0.15rem 0;
      border: 0.02rem solid #ccc;
      text-align: left;
      input {
        margin-left: 0.2rem;
        font-size: 0.28rem;
        width: 3.7rem;
        border: none;
      }
    }
    .btn {
      margin-top: 0.3rem;
      img {
        width: 3.6rem;
        height: 0.8rem;
      }
    }
    .tx {
      font-size: 0.14rem;
    }
  }
}
.call {
  .main {
    padding: 0.4rem;
    width: 6.37rem;
    background-color: #fff;
    border-radius: 0.2rem;
    .name {
      color: #259b24;
      font-size: 0.48rem;
      padding-top: 0.2rem;
      padding-bottom: 0.4rem;
    }
    .text {
      font-size: 0.28rem;
      padding-bottom: 0.32rem;
    }
    .btn {
      img {
        width: 3.6rem;
        height: 0.8rem;
      }
    }
    .title {
      width: 2.34rem;
      height: 0.48rem;
    }
    .close {
      width: 1.41rem;
      height: 1.41rem;
      position: absolute;
      right: 0;
      top: -0.5rem;
      z-index: 9;
    }
  }
}
.head_mask {
  .close {
    width: 1.01rem;
    height: 1.01rem;
    position: absolute;
    right: -0.4rem;
    top: -0.4rem;
    z-index: 9;
  }
  .list {
    padding: 0.3rem;
    padding-left: 0.6rem;
    width: 6.37rem;
    height: 7rem;
    background-color: #fff;
    border-radius: 0.2rem;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    align-content: flex-start;
    justify-content: flex-start;
  }
  .head_wrap {
    margin-bottom: 0.3rem;
    margin-right: 0.3rem;
    width: 1.04rem;
    height: 1.04rem;
    border-radius: 0.52rem;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
.bottom_btn {
  img {
    width: 2.3rem;
    height: 0.61rem;
    margin-right: 0.2rem;
  }
}
.event_btn {
  margin-bottom: 0.3rem;
  img {
    width: 3.08rem;
    height: 0.61rem;
  }
}
.event_btn.disabled {
  -webkit-filter: grayscale(100%); /* Chrome, Safari, Opera */
  filter: grayscale(100%);
}
.count {
  color: #277c3d;
  padding: 0.25rem 0;
  font-size: 0.28rem;
}
.head_list {
  display: flex;
  align-items: center;
  justify-content: center;
  .more {
    img {
      width: 0.95rem;
      height: 0.51rem;
    }
  }
  .head_wrap {
    margin-right: 0.3rem;
    width: 1.04rem;
    height: 1.04rem;
    border-radius: 0.52rem;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
.tip {
  color: #e95c00;
  font-size: 0.28rem;
  padding: 0.25rem 0;
}
.content {
  position: relative;
  width: 6.77rem;
  padding: 0.72rem;
  background-color: #fff8b3;
  border: 0.05rem solid #f8b800;
  border-radius: 0.2rem;
  margin: 0 auto;
  .img {
    img {
      width: 5.33rem;
      height: 9.49rem;
    }
  }
}
.container {
  animation: fadeIn 0.5s both;
  padding: 0.55rem 0;
  background-size: cover;
  background-image: url(../assets/c.jpg);
}
</style>
