import axios from 'axios';
import store from '@/store';
// import { useRouter } from 'vue-router';

export function req(config) {
    const instance = axios.create({
        // baseURL: 'http://192.168.2.125:8000/',
        baseURL:process.env.VUE_APP_BASE_URL,
        timeout: 5000
    })
    instance.interceptors.request.use(
        config => {
            const token = window.localStorage.getItem("token")
            if (token) {
                config.headers.Authorization = token
            }
            return config
        },
        err => {

        }
    )
    instance.interceptors.response.use(
        config => {
            if (config.data.status == 507) {
                window.localStorage.setItem("token", "")
                store.commit("setIsLogin", false)
                window.location.href = '/login';
            }
            return config.data ? config.data : config
            // return config
        },
        err => {

        }
    )
    return instance(config)
}