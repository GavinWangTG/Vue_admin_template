<template>
    <section class="list-upload">
        <el-upload 
            :disabled="isUploading" 
            :action="acitionUrl" 
            :file-list="fileList" 
            name="image" 
            :headers='uploadHeaders' 
            list-type="picture-card" 
            :multiple="isMultiple" 
            :before-upload="handleBeforeUpload" 
            :on-preview="handlePictureCardPreview" 
            :on-remove="handleRemove" 
            :on-success="handPictureSuccess" 
            :auto-upload="!isImgNeedCrop" 
            :on-change="handlePictureChange">
            <template v-if="isUploading">
                <i class="el-icon-loading avatar-uploader-icon"></i>
                <span class="upload-tips">上传中</span>
            </template>
            <template v-else>
                <i class="el-icon-plus"></i>
                <span class="upload-tips">{{ uploadTips }}</span>
            </template>
        </el-upload>
        <div class="cropper-container" v-if="picPreviewDialogVisible" @click="picPreviewDialogVisible = false">
            <img style="max-width: 60%;margin: 0 auto"
           :src="dialogImageUrl" alt="">
        </div>
        <div class="cropper-container" v-if="isCropperShow">
            <div style="height: 60vh">
                <vueCropper ref="ocVueCropper" :canMove="false" :maxImgSize="5000" :centerBox="true" :img="cropperOptions.img" :outputSize="cropperOptions.size" :outputType="cropperOptions.outputType" :info="cropperOptions.info" :canScale="cropperOptions.canScale" :autoCrop="cropperOptions.autoCrop" :fixed="imgCropWidthHeightRation > 0" :fixedNumber="[imgCropWidthHeightRation,1]" :autoCropWidth="defaultAutoWidth" :autoCropHeight="defaultAutoWidth">
                    <!--:autoCropWidth="cropperOptions.autoCropWidth"-->
                    <!--:autoCropHeight="cropperOptions.autoCropHeight"-->
                </vueCropper>
            </div>
            <div class="cropper-actions">
                <el-button size="small" type="success" @click="submitUpload">新增图片</el-button>
                <el-button size="small" type="primary" @click="cancelCropped">取消编辑</el-button>
            </div>
        </div>
    </section>
</template>
<script>
import { getUserAuthToken } from '@/utils/storage'
import VueCropper from 'vue-cropper'
import { convertImgDataToBlob, clone } from '@/utils/uitls'

export default {
    name: 'OUpload',
    components: {
        VueCropper
    },
    props: {
        propUrl: {
            type: String,
            default: 'api/v1/utils/upload/image'
        },
        isMultiple: {
            type: Boolean,
            default: true
        },
        propList: {
            type: Array,
            default: () => []
        },
        uploadTips: {
            type: String,
            default: ''
        },
        maxLimit: {
            type: Number,
            default: 5
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
            default: 500,
        }
    },
    data() {
        let uploadHeaders = { Authorization: `Bearer ${getUserAuthToken()}` };
        let acitionUrl = `${this.$http.defaults.baseURL}${this.propUrl}`;
        return {
            fileList: [], // 图片列表
            dialogImageUrl: '',
            picPreviewDialogVisible: false,
            acitionUrl,
            uploadHeaders,
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
    mounted() {
        //处理详情传过来的图片
        this.propList.forEach(img => {

            if(typeof img ==='object') {
                this.fileList.push({ url: img.url })
            }else{
                this.fileList.push({ url: img }) 
            }
        })
    },
    watch: {
        //此方法多余
        propList() {
            if (this.propList && this.fileList.length == 0) {
                this.fileList = []
                this.propList.forEach(img => {

                    if(img && typeof img ==='object') {
                        this.fileList.push({ url: img.url })
                    }else if(img){
                        this.fileList.push({ url: img }) 
                    }else{
                        
                    }
                })
            }
        }
    },
    methods: {
        handleRemove(file, fileList) {
            this.picListUpdate(fileList);
        },
        // 上传之前 先 验证 图片是否符合规则
        handleBeforeUpload(file) {
            console.log('handleBeforeUpload', this.propList.length, this.maxLimit)
            if (this.propList.length >= this.maxLimit) {
                this.$message.error('最多只能保存 ' + this.maxLimit + ' 张');
                return false
            }
            const isLt2M = file.size / 1024 / 1024 < 5;
            if (!/.(jpg|jpeg|png)$/.test(file.type)) {
                this.$message.error('上传图片只能是 JPG 或 PNG 格式');
                return false
            }
            if (!isLt2M) {
                this.$message.error('上传图片大小不能超过 2MB!');
                return false
            }
            return true;
        },
        //点击文件列表中已上传的文件时的钩子
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.picPreviewDialogVisible = true;
        },
        //图片上传成功
        handPictureSuccess(response, file, fileList) {
            this.picListUpdate(fileList);
        },

        picListUpdate(fileList) {
            let picArray = [];
            fileList.forEach(item => {
                if (item.response) {
                    // 这个是暂时用不到的，为了处理以后 image上传返回诡异东西的
                    picArray.push(item.response.items);
                } else if (item.url) {
                    // 这个是原本有的一些图片，给到component时候，必须是url：xxx格式
                    picArray.push(item.url);
                } else if (item) {
                    // 这个是新上传的一些图片，因为上传时候只返回了连接
                    picArray.push(item);
                }
            });
            console.log('picListUpdate', picArray)
            let emitPics = []

            picArray.forEach((o, index) => {
                let tmp = { seq: index, url: o }
                emitPics.push(tmp)
            })

            this.$emit('picChange', emitPics);
        },
        // 新增图片裁剪功能
        handlePictureChange(file, fileList) {
            if (this.isImgNeedCrop) {
                this.cropperOptions.img = file.url
                this.isCropperShow = true
            }
        },
        cancelCropped() {
            this.isCropperShow = false
            let tmp = clone(this.fileList)
            this.fileList = tmp
        },
        submitUpload() {
            this.isCropperShow = false
            this.$refs.ocVueCropper.getCropData((data) => {
                // do something
                this.croppedImg = data
                this.croppedImgUpload(data)
            })
        },
        croppedImgUpload(imgBase64) {
            let param = new FormData() // 创建form对象
            param.append('image', convertImgDataToBlob(imgBase64), 'croppedImgUpload') // 通过append向form对象添加数据

            let config = {
                headers: { 'Content-Type': 'image/jpeg' }
            }
            this.isUploading = true

            this.$http.post('/upload/image', param, config)
                .then(response => {
                    this.isUploading = false
                    console.log('this.$http.post', response)
                    let tmp = clone(response.data)
                    tmp.url = tmp.items
                    this.fileList.push(tmp)
                    this.picListUpdate(this.fileList);
                })
                .catch(() => {
                    this.isUploading = false
                    this.$layer.message('error', '上传图片失败，请重试')
                })
        },

    }
};
</script>
<style lang="scss">
.list-upload {
    >div {
        display: flex;
    }

    .upload-tips {
        font-size: 16px;
        color: #8c939d;
        margin-top: 8px;
    }

    .el-upload--picture-card {
        line-height: 24px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
}
</style>