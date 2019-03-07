<template>
  <div class="errPage-container">
    <el-row>
      <el-col :span="12">
        <el-button @click="back" icon='arrow-left' class="pan-back-btn">返回</el-button>
        <h1 class="text-jumbo text-ginormous">Oops!</h1>
        <h2>你没有权限访问该页面</h2>
        <h6>如有不满请联系你领导</h6>
      </el-col>
      <el-col :span="12">
        <img :src="errGif" width="313" height="428" alt="Girl has dropped her ice cream.">
      </el-col>
    </el-row>
  </div>
</template>

<script>
import errGif from '@/assets/images/im_401.gif'

export default {
  name: 'page401',
  data() {
    return {
      errGif: errGif + '?' + +new Date(),
    }
  },
  methods: {
    back() {
      this.$router.push({
        name: 'home'
      })
    }
  }
}
</script>
