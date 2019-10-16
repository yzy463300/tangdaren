import Vue from 'vue'
import config from '../config/index.js'
import { Toast, Dialog } from 'vant';
import axios from 'axios'

const ajax = axios.create({
	baseURL: config.baseUrl,
	withCredentials: true,
	headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
	transformRequest: [function (data) {
		let ret = ''
		for (let it in data) {
			ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
		}
		return ret
	}]
})
const api = {
	check_auth(params) {
		loading()
		return ajax.get(`hapi.php?act=check_auth`, { params }).then(res => {
			Toast.clear();
			if (res.data.error_no == 0) {
				return res.data
			} else if (res.data.error_no == 10001) {
				location.replace(`http://zzyh.shenmiwanjia.com/hapi/auth.php?front_url=${encodeURIComponent(location.href)}`)
			} else {
				Dialog.alert({
					message: res.data.msg
				})
				return false
			}
		})
	},
	get_help_info(params) {
		loading()
		return ajax.get(`hapi.php?act=get_help_info`, { params }).then(res => {
			Toast.clear();
			if (res.data.error_no == 0) {
				return res.data
			} else {
				Dialog.alert({
					message: res.data.msg
				})
				return false
			}
		})
	},
	get_help_detail(params) {
		loading()
		return ajax.get(`hapi.php?act=get_help_detail`, { params }).then(res => {
			Toast.clear();
			if (res.data.error_no == 0) {
				return res.data
			} else {
				Dialog.alert({
					message: res.data.msg
				})
				return false
			}
		})
	},
	get_helpers(params) {
		loading()
		return ajax.get(`hapi.php?act=get_helpers`, { params }).then(res => {
			Toast.clear();
			if (res.data.error_no == 0) {
				return res.data
			} else {
				Dialog.alert({
					message: res.data.msg
				})
				return false
			}
		})
	},
	help(params) {
		loading()
		return ajax.post(`hapi.php?act=help`, params).then(res => {
			Toast.clear();
			if (res.data.error_no == 0) {
				return res.data
			} else {
				Dialog.alert({
					message: res.data.msg
				})
				return false
			}
		})
	},
	take_ticket(params) {
		loading()
		return ajax.post(`hapi.php?act=take_ticket`, params).then(res => {
			Toast.clear();
			if (res.data.error_no == 0) {
				return res.data
			} else {
				Dialog.alert({
					message: res.data.msg
				})
				return false
			}
		})
	},
}
function loading() {
	return Toast.loading({
		message: '加载中...',
		loadingType: 'spinner',
		duration: 0,
	});
}

export default api