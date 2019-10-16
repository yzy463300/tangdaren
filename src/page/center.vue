<template>
  <div class="container tc" v-show='isShow'>
      <div class="top"><img src="../assets/c_title.png" alt=""></div>
      <img @click="ruleShow = true" src="../assets/rule_btn.png" alt="" class="rule_btn">
    <div class="content bbox">
      <div class="hg"><img src="../assets/c_t.png" alt=""></div>
      <div class="video_wrap">
        <video v-show='videoShow' src="../assets/video.mp4" poster="../assets/poster.png"   x-webkit-airplay="true" controls ref='video'></video>
      </div>
    </div>
      <div class="content bbox">
      <div class="hg"><img src="../assets/ccx.png" alt=""></div>
      <div class="img"><img src="../assets/t.jpg" alt=""></div>
      <p class="tip">选择你喜爱的明星加入粉丝团打榜</br>{{target}}人助力即可免费获得门票1张（数量有限，先到先得）</p>
        <div class="list">
          <div class="item" v-for="(item,index) in lists" :key="index">
            <div class="l"><img :src="item.head" alt=""></div>
            <div class="m">
              <p class="name"><img :src="item.name" alt=""></p>
              <div class="bar ">
                <div class="percent" v-if='index==0' :style="{width:star1/target*100+'%'}"></div>
                <div class="percent" v-if='index==1' :style="{width:star2/target*100+'%'}"></div>
                <div class="percent" v-if='index==2' :style="{width:star3/target*100+'%'}"></div>
              </div>
            </div>
            <div class="r"><img @click='gotoDetail(index)' :src="item.btn" alt=""></div>
          </div>
        </div>
        <div class="count">已有{{total_take}}人领取门票</div>
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
      videoShow: true,
      star1: "",
      star2: "",
      star3: "",
      target: "",
      status: 0, //状态，0：还需继续助力，1：可领取，2：库存不足，3：已领取
      total_take: 0, //已领取门票的人数
      ruleShow: false,
      lists: [
        {
          head: require("../assets/head.png"),
          name: require("../assets/xkz.png"),
          btn: require("../assets/b1.png")
        },
        {
          head: require("../assets/head.png"),
          name: require("../assets/hx.png"),
          btn: require("../assets/b2.png")
        },
        {
          head: require("../assets/head.png"),
          name: require("../assets/ice.png"),
          btn: require("../assets/b3.png")
        }
      ]
    };
  },
  watch: {
    ruleShow(val) {
      if (val) {
        this.videoShow = false;
      } else {
        this.videoShow = true;
      }
    }
  },
  mounted() {
    this.$refs.video.addEventListener("play", () => {
      $("#audio")[0].pause();
    });
    this.$refs.video.addEventListener("pause", () => {
      if ($(".bgm").hasClass("playing")) {
        $("#audio")[0].play();
      }
    });
    this.$refs.video.addEventListener("ended", () => {
      if ($(".bgm").hasClass("playing")) {
        $("#audio")[0].play();
      }
    });
  },
  activated() {
    this.get_help_info();
    Weixin({
      img_url: require("../assets/thumb.jpg"),
      link: "http://zzyh.shenmiwanjia.com/tdr/#/",
      title: "汤达人元气音乐节，为你的爱豆打CALL",
      desc: "2019年汤达人元气音乐节长沙站，快来和你的爱豆见面吧"
    });
  },
  methods: {
    async get_help_info() {
      const res = await api.get_help_info();
      if (res.error_no == 0) {
        this.star1 = res.data.star1;
        this.star2 = res.data.star2;
        this.star3 = res.data.star3;
        this.target = res.data.target;
        this.status = res.data.status;
        this.total_take = res.data.total_take;
        this.isShow = true;
      }
    },
    gotoDetail(index) {
      this.$router.push({
        path: "/detail",
        query: { star_id: index + 1, user_id: window.user_id }
      });
    }
  },
  components: {}
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
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
.rule_btn {
  position: absolute;
  right: 0.2rem;
  top: 0.9rem;
  width: 1.79rem;
}
.count {
  color: #ec731d;
  font-size: 0.28rem;
  text-align: center;
}
.list {
  margin: 0.4rem 0;
  .item {
    margin: 0.4rem 0;
    display: flex;
    align-items: center;
    justify-content: space-around;
    .l {
      img {
        width: 1.01rem;
        height: 1.01rem;
      }
    }
    .m {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      .bar {
        overflow: hidden;
        margin-top: 0.2rem;
        width: 2.88rem;
        height: 0.26rem;
        border-radius: 0.15rem;
        background-color: #fff;
        border: 0.02rem solid #72b622;
        .percent {
          height: 0.26rem;
          border-radius: 0.13rem;
          background-color: #8bc34a;
        }
      }
      .name {
        img {
          width: 1.74rem;
          height: 0.35rem;
        }
      }
    }
    .r {
      position: relative;
      top: 0.14rem;
      img {
        width: 1.65rem;
        height: 0.57rem;
      }
    }
  }
}
.tip {
  font-size: 0.24rem;
  color: #ec731d;
}
.img {
  margin: 0.25rem 0;
  img {
    width: 100%;
  }
}
.video_wrap {
  margin: 0.25rem 0;
  width: 100%;
  height: 3.82rem;
  video {
    width: 100%;
    height: 100%;
  }
}
.hg {
  img {
    height: 0.47rem;
  }
}
.top {
  padding-right: 0.9rem;
  img {
    width: 5.37rem;
  }
}
.content {
  position: relative;
  width: 6.77rem;
  padding: 0.5rem 0;
  padding-top: 0.25rem;
  background-color: #fff8b3;
  border: 0.05rem solid #f8b800;
  border-radius: 0.2rem;
  margin: 0 auto;
  margin-top: 0.3rem;
}
.container {
  padding: 0.55rem 0;
  background-size: cover;
  background-image: url(../assets/c.jpg);
}
</style>
