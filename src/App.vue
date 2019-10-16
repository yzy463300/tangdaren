<template>
  <div id="app" v-if='isShow'>
  	<keep-alive>
    	<router-view/>
  	</keep-alive>
    <Music class="m" :src='audio'></Music>
    <div class="mask alert" v-show='maskShow' >
      <div class="main vtc" @click="maskShow = false">
        <img src="./assets/as.png" alt="" class="i">
        <img src="./assets/x.png" alt="" class="close">
      </div>
    </div>
  </div>
</template>

<script>
import api from "./api/api";
import Music from "./components/Music";
import { querystring } from "vux";
export default {
  name: "App",
  data() {
    return {
      audio: require("./assets/bgm.mp3"),
      isShow: false,
      maskShow: false,
      today_take_count: 0,
      everyday_take_limit: 0,
      total_rest: 0
    };
  },
  components: {
    Music
  },
  async created() {
    const res = await api.check_auth();
    if (res.error_no == 0) {
      this.isShow = true;
      window.user_id = res.data.user_id;
      this.today_take_count = +res.data.today_take_count;
      this.everyday_take_limit = +res.data.everyday_take_limit;
      this.total_rest = +res.data.total_rest;
      if (this.today_take_count >= this.everyday_take_limit) {
        this.maskShow = true;
      }
    }
  },
  methods: {}
};
</script>

<style  lang='less' >
.mask {
  .main {
    .close {
      width: 1.01rem;
      height: 1.01rem;
      position: absolute;
      right: -0.3rem;
      top: -0.3rem;
    }
    .i {
      width: 6.05rem;
      height: 8.31rem;
    }
  }
}
</style>
