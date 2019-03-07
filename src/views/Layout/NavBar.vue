<template>
    <el-header class="nav-container">
        <div class="nav-top-breadcrumb">
            <BreadCrumb></BreadCrumb>
        </div>
        <div class="nav-top-actions">
            <div style="margin-right: 10px;font-size: 12px;color: #898989">{{version}}</div>
            <div v-if="userInfo != null" class="user-info">
                <p style="color: #4F71E6; font-weight: 800">{{ userInfoString }} </p>
                <p>{{ userRolesString }}</p>
            </div>
            <el-button type="primary" icon="iconfont icon-xiugaimima" circle @click="dialogFormVisible = true"></el-button>
            <el-button type="primary" icon="iconfont icon-tuichu1" circle @click="handleLoginOut()"></el-button>
        </div>

        <el-dialog title="修改密码" :visible.sync="dialogFormVisible" width="30%" @close="handleCloseDialog">
            <el-form 
                ref="formBaseRules"
                :rules="formBaseRules" 
                :model="formData"
                @keyup.enter.native="handleChangePassword">
                <el-form-item prop="oldPassword">
                    <el-input type="password" v-model="formData.oldPassword" placeholder="请输入旧密码"></el-input>
                </el-form-item>
                <el-form-item prop="newPassword">
                    <el-input type="password" v-model="formData.newPassword" placeholder="请输入新密码"></el-input>
                </el-form-item>
                <el-form-item prop="newPasswordConfirm">
                    <el-input type="password" v-model="formData.newPasswordConfirm" placeholder="请再次输入新密码"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button 
                    type="primary" 
                    :loading="isLoading"
                    :disabled="!formData.oldPassword || !formData.newPassword || !formData.newPasswordConfirm ? true : false"
                    @click="handleChangePassword">
                    确认修改
                </el-button>
            </div>
        </el-dialog>
    </el-header>
</template>

<script>
	import BreadCrumb from '@/components/BreadCrumb.vue'
	import { getUserLoginInfo, deleteUserAuthToken, deleteUserLoginInfo} from '@/utils/storage'
    import { environment } from '@/utils/devConfig';

	export default {
		name: 'navbar',
		data() {
			return {
				formData: {
					oldPassword: null,
                    newPassword: null,
                    newPasswordConfirm: null
                },
                formBaseRules: {
                	oldPassword: [
                        {required: true, message: '请输入旧密码', trigger: 'blur'},
                    ],
                    newPassword: [
                        {required: true, message: '请输入新密码', trigger: 'blur'},
                    ],
                    newPasswordConfirm: [
                        {required: true, message: '请再次输入新密码', trigger: 'blur'},
                    ]
                },
                isLoading: false,
                dialogFormVisible: false,
                userInfo: {},
                version: environment.version
			}
		},
		components: {
			BreadCrumb
		},
        computed: {

            userRolesString () {
                let tmp = ""
                if (this.userInfo.adminRole != null && this.userInfo.adminRole.displayName != null) { 
                    tmp = tmp+ this.userInfo.adminRole.displayName
                }
                return tmp
            },
            userInfoString () {
                let tmp = ""
                if (this.userInfo.realname != null) { tmp = tmp+ this.userInfo.realname }
                return tmp
            },
        },
		methods: {
			handleCloseDialog() {
                // 清空表单数据
                this.formData = Object.assign({}, this.$options.data().formData);
            },
            handleChangePassword() {
            	if (this.formData.newPassword != this.formData.newPasswordConfirm) {
                    this.$message.error('两次密码不一样，请重新输入');
                    return;
                }
                this.isLoading = true;
                let data = {
                	old_password: this.formData.oldPassword,
                    new_password: this.formData.newPassword,
                };
                this.$http.post('/admin/auth/change/password', data)
                    .then(response => {
                        this.$message({type: 'success', showClose: true, message: '密码修改成功'});
                        this.isLoading = false
                        this.dialogFormVisible = false
                    })
                    .catch(() => {
                        this.isLoading = false
                    })
            },
			//登出
			handleLoginOut() {
				deleteUserAuthToken()
				deleteUserLoginInfo()
				this.$router.replace({
					name: 'login'
				})
			}
		},
		mounted() {
            this.userInfo = getUserLoginInfo()
		}
	}
</script>