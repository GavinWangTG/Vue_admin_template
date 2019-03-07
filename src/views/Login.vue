<template>
	<div class="login-container">
		<div class="login-wraper">
			<div class="login-content">
				<el-tabs v-model="activeValue">
					<el-tab-pane label="密码登录" name="password">
						<el-form autoComplete="off" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left" label-width="0px" class="login-form">
							<el-form-item>
								<i class="iconfont icon-admin"></i>
								<el-input
									v-model="loginForm.username" 
									autoComplete="off"
									@keyup.enter.native='handleKeyCode($event)'
									placeholder="请输入账号"
									:clearable="true"
									:maxlength="11"></el-input>
							</el-form-item>
							<el-form-item class="last">
								<i class="iconfont icon-mima"></i>
								<div class="el-input">
									<input name="password" class="el-input__inner" :type="pwdType" v-model="loginForm.password" autoComplete="off" @keydown='handleKeyCode($event)' placeholder="请输入密码" />
								</div>
								<i class="iconfont eye" @click="handleShowPwd()" :class="[pwdType==='password' ? 'icon-guanbixianshi': 'icon-showpassword']"></i>
							</el-form-item>
							<div class="login-action-box">
								<el-checkbox v-model="isAutoLogin">下次自动登录</el-checkbox>
							</div>
							<el-button type="primary" class="login-btn" :loading="isLoading" @click.native.prevent="handleLogin">登录</el-button>
						</el-form>
					</el-tab-pane>
					<el-tab-pane label="手机验证码登录" name="mobile">
						<el-form 
							autoComplete="off" 
							:model="loginMobileForm" 
							:rules="loginMobileRules" 
							ref="loginMobileForm" 
							label-position="left" 
							label-width="0px" 
							class="login-form">
							<el-form-item>
								<i class="iconfont icon-shoujihaoma"></i>
								<el-input
									v-model="loginForm.mobile" 
									autoComplete="off"
									@keyup.enter.native='handleKeyCode($event)'
									placeholder="请输入手机号码"
									:clearable="true"
									:maxlength="11"></el-input>
							</el-form-item>
							<el-form-item>
								<i class="iconfont icon-yanzhengma"></i>
								<el-input
									v-model="loginForm.code" 
									autoComplete="off"
									@keyup.enter.native='handleKeyCode($event)'
									placeholder="验证码"
									:clearable="true"
									:maxlength="6"></el-input>
								<el-button type="primary" size="small" class="send-code">发送验证码</el-button>
							</el-form-item>
							<el-button type="primary" class="login-btn" :loading="isLoading" @click.native.prevent="handleLogin">登录</el-button>
						</el-form>
					</el-tab-pane>
				</el-tabs>
			</div>
			
		</div>
        <div class="login-footer">
            Roopsi © {{version}}
        </div>
	</div>
</template>

<script>
    import {setUserAuthToken, setUserLoginInfo} from '@/utils/storage';
    import { environment } from '@/utils/devConfig';

	export default {
		name: 'login-page',
		data() {
			return {
				activeValue: 'password',
				loginForm: {
					username: environment.isOnline ? null : '13100000000',
					password: environment.isOnline ? null : 'password'
				},
				loginRules: {
					username: [
						{ required: true, message: '请输入账号', trigger: 'blur' }
					],
					password: [
						{ required: true, message: '请输入密码', trigger: 'blur' }
					]
				},
				loginMobileForm: {
					mobile: null,
				},
				loginMobileRules: {
					mobile: [
						{ required: true, message: '请输入账号', trigger: 'blur' }
					]
				},
				pwdType: 'password',
				isAutoLogin: true,
				isLoading: false,
				version: environment.version
            }
		},
		methods: {
			/**
			 * 显示密码
			 */
			handleShowPwd() {
				this.pwdType = this.pwdType ==='password' ? 'text' : 'password';
			},
			/**
			 * 登录
			 */
			handleLogin(){
				let vm = this;

				if(this.isLoading) return;

				if(!this.loginForm.username || !this.loginForm.password){
					this.$message({
						message: '请输入账号和密码',
						type: 'error'
					});
					return false;
				}

				let data = {
					mobile: this.loginForm.username,
					password: this.loginForm.password,
				}

				this.isLoading = true;
				this.$http.post('/api/v1/dashboard/auth/login', data)
                    .then(res => {
                    	if(res.code == 0) {
                    		setUserAuthToken(res.items.accessToken);
                    		setUserLoginInfo(res.items.admin);
                    		
                    		vm.$router.push({
                    			name: 'home'
                    		})
                    	}else{
                    		this.isLoading = false;
                    	}
                    })
                    .catch(() => {
                    	vm.isLoading = false;
                    });
			},
			/**
			 * Enter触发登录
			 */
			handleKeyCode(e) {

				if(e.keyCode !== 13) return false;

				this.handleLogin()
			}
		}
	}
</script>