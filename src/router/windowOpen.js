import { req } from '@/network/RequestConfig.js'
import store from '@/store';

export function toDetail(id) {
    window.open('/commodity/' + id)
}

export function addCart(sku_id, nums = 1,alert=true) {
    
    req({ url: '/cart/', method: "post", data: { sku_id, nums, is_delete:0, append:true } }).then(res => {
        if(alert){
            window.alert(res.data)
        }
        store.dispatch("updateCc")
        
    })
    
}