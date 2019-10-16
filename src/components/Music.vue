<template>
  <div id="music" @click="onClick" :class="{isPlay:isPlay}">
     <audio id="audio" :src="src" :loop="loop"></audio>
  </div>
</template>
<script>
import Weixin from "../utils/weixin.js";
export default {
  name: "Music",
  data() {
    return {
      autoplay: "autoplay",
      loop: "loop",
      isPlay: true, //IOS自动播放
      bgm: null
    };
  },
  props: ["src"],
  mounted() {
    this.bgm = document.getElementById("audio");
    Weixin(
      {
        img_url: require("../assets/thumb.jpg"),
        link: location.href,
        title: "汤达人元气音乐节，为你的爱豆打CALL",
        desc: "2019年汤达人元气音乐节长沙站，快来和你的爱豆见面吧"
      },
      () => {
        this.bgm.play();
      }
    );
  },
  methods: {
    onClick() {
      this.isPlay = !this.isPlay;
      this.isPlay ? this.bgm.play() : this.bgm.pause();
    }
  }
};
</script>

<style lang="less" scoped>
#music {
  position: fixed;
  left: 0.2rem;
  top: 0.45rem;
  z-index: 80;
  width: 0.48rem;
  height: 0.48rem;
  background-image: url(http://img.cntapp.com/h5/dragon/assets/music.png);
  background-size: 0.96rem 0.48rem;
  color: #fff;
}
#music.isPlay {
  background-position: right center;
}
</style>
