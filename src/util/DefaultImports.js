import { ElMessageBox } from 'element-plus'
import { useRouter } from 'vue-router'

export function showAlert(str){
    ElMessageBox.alert(str, 'Notice', {
        confirmButtonText: 'OK',
    })
}

