
import moment from 'moment';
import { handleReRegister } from './fetch';

export const USER_AUTH_TOKEN = 'Roopsi_WEBAuthToken';
const USER_LOGIN_INFO = 'Roopsi_WEBUserLoginInfo';

/**
 * 获取用户登录的token
 * @return {string}
 */
export const getUserAuthToken = () => {
    let tokenItem = JSON.parse(localStorage.getItem(USER_AUTH_TOKEN)) || JSON.parse(sessionStorage.getItem(USER_AUTH_TOKEN))
    if (tokenItem == null) {
        handleReRegister()
    } else {
        return tokenItem
    }
};

/**
 * 设置用户登录的token
 * @param {string} token
 * @return {string}
 */
export const setUserAuthToken = (type='local',tokenItem) => {

        if(type==='local'){
            return localStorage.setItem(USER_AUTH_TOKEN, JSON.stringify(tokenItem));
        }else{
            return sessionStorage.setItem(USER_AUTH_TOKEN, JSON.stringify(tokenItem));
        }
};

/**
 * 删除用户登录的token
 * @return {string}
 * @return {string}
 */
export const deleteUserAuthToken = () => {
    return localStorage.removeItem(USER_AUTH_TOKEN);
};

/**
 * 获取当前用户登录的信息
 * @return {string}
 */
export const getUserLoginInfo = () => {
	return JSON.parse(localStorage.getItem(USER_LOGIN_INFO));
};

export const getUserRoleInfo = () => {
    let tmp = JSON.parse(localStorage.getItem(USER_LOGIN_INFO));

    if (tmp.admin.roles == null || tmp.admin.roles.length == 0) {
        return ''
    } else {
        return tmp.admin.roles[0].name
    }
};

/**
 * 设置当前用户登录的信息
 * @param {string} userInfo
 * @return {string}
 */
export const setUserLoginInfo = (userInfo) => {
	return localStorage.setItem(USER_LOGIN_INFO, JSON.stringify(userInfo));
};

/**
 * 删除当前用户登录的信息
 * @return {string}
 */
export const deleteUserLoginInfo = () => {
	return localStorage.removeItem(USER_LOGIN_INFO);
};



