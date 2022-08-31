<template>
  <div>
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
        <span class="el-upload-list__item-actions">
               <span
                   class="el-upload-list__item-delete"
                   @click="handleRemove(file)"
               >
          <i class="el-icon-delete"></i>
        </span>
        </span>
      </div>
    </el-upload>
    <el-button @click="uploadPic"  type="primary">点击上传</el-button>
  </div>
</template>

<script>
import { upload, multipleUpload, deleteImg } from '../api/index'
export default {
  name: "pic-upload",
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
    },
    // 删除图片
    handleRemove(file) {
      console.log('file====', file)
      deleteImg({fileName: file.name}).then(res => {
        console.log('res====', res)
      })
      let ind = this.files.findIndex((item) => {
        return item.uid === file.uid
      })
      this.files.splice(ind, 1)
    }
  }
}
</script>

<style>
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
