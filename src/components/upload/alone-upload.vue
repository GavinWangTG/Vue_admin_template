<template>
  <section class="alone-upload">
    <el-upload ref="ocAloneUpload"
                class="avatar-uploader"
               name="image"
               :disabled="isUploading"
               :action="acitionUrl"
               :headers='uploadHeaders'
               :show-file-list="false"
               :auto-upload="!isImgNeedCrop"
               :on-progress="handleAvatarProgress"
               :on-change="handleAvatarChange"
               :on-success="handleAvatarSuccess"
               :before-upload="beforeAvatarUpload">
      <template v-if="isUploading">
        <i class="el-icon-loading avatar-uploader-icon"></i>
        <span class="upload-tips">上传中</span>
      </template>
      <img v-else-if="curImgUrl" v-lazy="curImgUrl" :key="curImgUrl"
           class="avatar" @click="handlePictureCardPreview">
      <template v-else>
        <i class="el-icon-plus avatar-uploader-icon"></i>
        <span class="upload-tips">{{uploadTips}}</span>
      </template>
    </el-upload>


    <div class="cropper-container" v-if="isCropperShow">
      <div style="height: 60vh">
        <vueCropper
          ref="ocVueCropper"
          :canMove="false"
          :maxImgSize="2000"
          :centerBox="true"
          :img="cropperOptions.img"
          :outputSize="cropperOptions.size"
          :outputType="cropperOptions.outputType"
          :info="cropperOptions.info"
          :canScale="cropperOptions.canScale"
          :autoCrop="cropperOptions.autoCrop"
          :fixed="imgCropWidthHeightRation > 0"
          :fixedNumber="[imgCropWidthHeightRation,1]"
          :autoCropWidth="defaultAutoWidth"
          :autoCropHeight="defaultAutoWidth"
        >
          <!--:autoCropWidth="cropperOptions.autoCropWidth"-->
          <!--:autoCropHeight="cropperOptions.autoCropHeight"-->
        </vueCropper>
      </div>
      <div class="cropper-actions">
        <el-button size="small" type="success" @click="submitUpload">上传到服务器</el-button>
        <el-button size="small" type="primary" @click="isCropperShow=false">取消编辑</el-button>
      </div>
    </div>

  </section>
</template>
<script>
import { getUserAuthToken } from '@/utils/storage';
import VueCropper from 'vue-cropper'
import { convertImgDataToBlob } from '../../utils/uitls'

export default {
  name: 'OAloneUpload',
  components: {
    VueCropper
  },
  props: {
    propUrl: {
      type: String,
      default:'util/image'
    },
    imageUrl: {
      type: String,
      default: null
    },
    uploadTips: {
      type: String,
      default: ''
    },
    // 如果需要裁剪的，完全是另一个上传途径
    isImgNeedCrop: {
      type: Boolean,
      default: false,
    },

    // 如果设置成0，就是不固定宽高比
    imgCropWidthHeightRation: {
      type: Number,
      default: 1,
    },
    defaultAutoWidth: {
      type: Number,
      default: 400,
    }

  },
  watch: {
    imageUrl() {
        if (this.curImgUrl == null || (this.imageUrl != null && this.curImgUrl != this.imageUrl) ) {
            console.log('watch imageUrl:', this.imageUrl )
            this.curImgUrl = this.imageUrl
        }
    }
  },
  data() {
    let uploadHeaders = { Authorization: `Bearer ${getUserAuthToken()}` };
    let acitionUrl = `${this.$http.defaults.baseURL}${this.propUrl}`;
    return {
      dialogVisible: false, // 预览模态窗 状态
      acitionUrl, // 上传 地址
      uploadHeaders, // 上传的图片header
      curImgUrl: this.imageUrl,
      isUploading: false,

      isCropperShow: false,
      cropperOptions: {
        img: '',
        info: true,
        size: 1,
        outputType: 'jpeg',
        canScale: false,
        autoCrop: true,
      },
      croppedImg: null,
    };
  },
  methods: {
    handlePictureCardPreview(file) {
        this.dialogVisible = true;
    },

    handleAvatarChange(file, fileList) {
      if (this.isImgNeedCrop) {
        console.log(file, fileList)
        this.cropperOptions.img = file.url
        this.isCropperShow = true
      }
    },

    handleAvatarProgress(event, file, fileList) {
    },

    // 上传之前 先 验证 图片是否符合规则
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 5;
      if (!/.(jpg|jpeg|png)$/.test(file.type)) {
        this.$message.error('上传图片只能是 JPG 或 PNG 格式');
        return false
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!');
        return false
      }

      this.isUploading = true
      return true;
    },

    handleAvatarSuccess(res, file) {
      console.log(res,file)
      this.isUploading = false
      this.curImgUrl = res.results.url;
      this.$emit('picChange', this.curImgUrl, res.results.id);
    },

    submitUpload() {
      this.isCropperShow = false
      this.$refs.ocVueCropper.getCropData((data) => {
        // do something
        this.croppedImg = data
        this.croppedImgUpload(data)
      })
    },

    croppedImgUpload (imgBase64) {
      let param = new FormData()  // 创建form对象
      param.append('image', convertImgDataToBlob(imgBase64), 'croppedImgUpload')  // 通过append向form对象添加数据

      let config = {
        headers: {'Content-Type': 'image/jpeg'}
      }
      this.isUploading = true

      this.$http.post('/upload/image', param, config)
        .then(response => {
          this.isUploading = false
          console.log('this.$http.post',response)
          this.curImgUrl = response.data.items;
          this.$emit('picChange', this.curImgUrl);
        })
        .catch(() => {

        })
    },

  }
};

</script>
<style lang="scss">
.alone-upload {
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .el-upload--text {
    width: 148px;
    height: 148px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    text-align: center;
  }
  .upload-tips {
    font-size: 16px;
    color: #8c939d;
    margin-top: 8px;
  }
  .avatar {
    width: 148px;
    height: 148px;
    display: block;
  }
}

</style>
