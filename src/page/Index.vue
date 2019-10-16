<template>
  <div class="home tc">
    <p class="title"><img src="../assets/ttt.png" alt=""></p>
    <p class="content"><img src="../assets/s.png" alt=""></p>
    <!-- <p class="poster"><img src="../assets/ele.png" alt=""></p> -->
    <p class="button"><router-link to='/center' replace><img src="../assets/start_btn.png" alt=""></router-link></p>
  </div>
</template>

<script>
import api from "../api/api.js";
export default {
  data() {
    return {};
  },
  methods: {},
  components: {},
  async activated() {
    // const res = await api.check_auth();
  },
  computed: {},
  async mounted() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
.button {
  img {
    width: 3.7rem;
    height: 1.22rem;
  }
}
.poster {
  position: absolute;
  left: 0;
  top: 7%;
  img {
    width: 7.06rem;
    height: 6.34rem;
  }
}
.content {
  margin: 7% 0;
  img {
    width: 2.45rem;
  }
}
.title {
  padding-top: 0.3rem;
  padding-left: 0.4rem;
  img {
    width: 5.97rem;
  }
}
.home {
  min-height: 13.49rem;
  background-image: url(../assets/bg.png);
  background-position: bottom center;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}
.main {
  width: 100%;
}
</style>
