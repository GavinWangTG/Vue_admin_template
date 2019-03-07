<template>
	<section>
		<quill-editor v-model="contentHtml"
            ref="myQuillEditor"
            :options="editorOption"
            @change="onEditorChange($event)"
            class='quill-editor-area'>
		</quill-editor>
		<el-upload
			class="editor-img-uploader"
			:action="action"
			name="image"
			:show-file-list="false"
			:on-success="handleSuccess"
			:before-upload="beforeUpload" style>
		</el-upload>
	</section>
</template>

<script>
	import 'quill/dist/quill.core.css'
	import 'quill/dist/quill.snow.css'
	import 'quill/dist/quill.bubble.css'

	import { quillEditor } from 'vue-quill-editor'

	export default {
		data() {
			return {
				contentHtml: this.content,
				addRange: [],
				uploadType: 'image',
				action: `${this.$http.defaults.baseURL}api/v1/utils/upload/image`,
				editorOption: {
					placeholder: '填写详情',
					modules: {
						toolbar: [
							[{ 'header': [1, 2, 3, 4, 5, 6, false] }],
							['bold', 'italic'],
							[{ 'list': 'ordered'}, { 'list': 'bullet' }],
							[{ 'color': [] }, { 'background': [] }],
							[{ 'align': [] }],
							['image']
						]
		          	}
				}
			}
		},
		props: {
			content: {
				type: String,
				default: ''
			}
		},
		components: {
			quillEditor
		},
		methods: {
			//触发图片上传
			imgHandler(state) {
				this.addRange = this.$refs.myQuillEditor.quill.getSelection()
				if (state) {
					let fileInput = document.querySelector('.editor-img-uploader input');
					fileInput.click() // 加一个触发事件
				}
			},
			//上传图片前
			beforeUpload(file) {
		        const isLt2M = file.size / 1024 / 1024 < 2;

		        if (!isLt2M) {
		          this.$message.error('图片大小不能超过 2MB!');
		        }
		        return isLt2M;
			},
			//上传图片成功
			handleSuccess(res, file) {
				this.$refs.myQuillEditor.quill.insertEmbed(this.addRange !== null ? this.addRange.index : 0, 'image', res.items)
			},
			onEditorChange({ quill, html, text }) {
				this.$emit('handleEditorChange',html)
			}
		},
		mounted() {
			//初始化为编辑器图片添加事件
			this.$refs.myQuillEditor.quill.getModule('toolbar').addHandler('image', this.imgHandler)
		},
		watch: {
			'content': function(nVal,Oval) {
				if(this.contentHtml!==nVal){
					this.contentHtml = this.content
				}
			}
		}
	}
</script>

<style lang="scss">
	.quill-editor-area{
		height: 400px;
	}
</style>