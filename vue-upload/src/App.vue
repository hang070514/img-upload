<template>
  <div id="app">
    <h3>单个图片上传</h3>
    <el-upload
        class="avatar-uploader"
        action="https://jsonplaceholder.typicode.com/posts/"
        :http-request="uploadRequest"
        :before-upload="beforeUpload"
        :show-file-list="false"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    <h3>多个图片上传</h3>
    <el-upload
        class="avatar-uploader"
        action="#"
        list-type="picture-card"
        :auto-upload="false"
        :on-change="onChange"
    >
      <i slot="default" class="el-icon-plus"></i>
      <div slot="file" slot-scope="{file}">
        <img :src="file.url" alt="" class="el-upload-list__item-thumbnail">
      </div>
    </el-upload>
    <el-button @click="uploadPic"  type="primary">点击上传</el-button>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import { upload, multipleUpload } from './api/index'
export default {
  name: 'App',
  components: {
    // HelloWorld
  },
  data() {
    return {
      imageUrl: '',
      file: '',
      files: [],
      imageUrlList: []
    }
  },
  methods: {
    // 上传文件之前的钩子，参数为上传的文件
    beforeUpload(file){
      this.file = file
    },
    // 文件状态改变时的钩子
    onChange(file,fileList) {
      console.log('file====', file)
      console.log('fileList====', fileList)
      this.files = fileList
    },
    // 单个文件上传
    uploadRequest() {
      const formdata = new FormData()
      formdata.append('img',this.file)
      upload(formdata).then(res => {
        this.imageUrl = res.data.url
      })
    },
    // 多个文件上传
    uploadPic() {
      let formData = new FormData()
      this.files.forEach((item) => {
        formData.append('avatar', item.raw)
      })
      multipleUpload(formData).then((res) => {
        this.imageUrlList = res.data.url
      })
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar{
  width: 178px;
  height: 178px;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.el-upload-more{
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
}
</style>
