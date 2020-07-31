<template>
  <div class="head">
    <sdp-board-preview @close="() => {this.$router.go(-1)}" v-bind="shareData" class="sdp"></sdp-board-preview>
  </div>
</template>

<script>
  // import axios from 'axios'
  // import { asyncLoadFile } from '../loadFile'
  export default {
    name: 'aaa',
    components: {
    },
    data () {
      return {
        shareData: {
          api: '',
          boardInfo: {
            id: '341224547724283904410'
          },
          langCode: 'zh',
          options: {
            tenantId: 't00565',
            type: 'browse',
          },
          // themeParameters: {
          //   isOpen: true,
          //   themeType: '0',
          // }
        }
      }
    },
    created() {
      // const CUR_ENV = 'release'
      // const baseRoot = `https://sdptest.shijicloud.com/static/sdp_app/web/${CUR_ENV}`
      // let _version = 'V2.09.00.04'
      // const cssPath = `${ baseRoot }/${ _version }/sdp.css`
      // const jsPath = `${ baseRoot }/${ _version }/sdp.umd.min.js`
      // asyncLoadFile(cssPath, 'link'),
      // asyncLoadFile(jsPath),
      this.shareData.api = window.sdpApi
    },
  }
</script>

<style scoped>
  .head{
    position: relative;

  }
  .sdp {
    position: relative;
    width:calc(100vw);
    height:calc(100vh);
  }
</style>
