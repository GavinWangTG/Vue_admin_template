<template>
    <div class="floating-actions">
        <el-button style="box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);" @click="routeBack()">返回</el-button>

        <template v-if="isAction">
        	<el-button style="box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);" v-if="this.isAdd" type="success" @click="handleSave()" :loading="isSubmitting">确定新增</el-button>
        	<el-button style="box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);" v-else type="success" @click="handleSave()" :loading="isSubmitting">保存修改</el-button>
        </template>
    </div>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		props: {
			isAction: {
				type: Boolean,
				default: true
			},
			isAdd: {
				type: Boolean,
				default: true
			},
			isSubmitting: {
				type: Boolean,
				default: false
			}
		},
		methods: {
			handleSave() {
				this.$emit('handleSave')
			},
			routeBack() {
				this.$router.back(-1);
			}
		},
		mounted() {

		}
	}
</script>

<style lang="scss" scoped>
	.floating-actions {
        position: fixed;
        bottom: 100px;
        right: 30px;
    }
</style>