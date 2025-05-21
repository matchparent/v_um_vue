<template>
    <div id="address-management">
        <button @click="popMode = 1; popVis = true">New Address</button>

        <div v-for="(item, index) in listData" :key="index">
            <span class="name">{{ item.signer_name }}</span> <span class="default" v-if="item.default == 1">default
                address</span>
            <img src="@/assets/images/profile/deletex.png" class="cp" @click="del(item.id)">
            <div class="details">
                <label>Recevier:</label> <span>{{ item.signer_name }}</span> <br>
                <label>District:</label> <span>{{ item.district }}</span> <br>
                <label>Address:</label> <span>{{ item.signer_address }}</span> <br>
                <label>Phone:</label> <span>{{ item.telphone }}</span> <br>
            </div>

            <div class="bottom">
                <span v-if="item.default != 1" @click="setDefault(item.id)">set as default</span>
                <span @click="edit(item)">edit</span>
            </div>
        </div>

        <!-- :before-close="handleClose" -->
        <el-dialog v-model="popVis" :title="popMode == 1 ? 'New Addresss' : 'Edit Addresss'" width="500">
            <el-form-item label="Receiver" :label-width="formLabelWidth">
                <el-input v-model="form.signer_name" autocomplete="off" />
            </el-form-item>
            <el-form-item label="District" :label-width="formLabelWidth">
                <el-input v-model="form.district" autocomplete="off" />
            </el-form-item>
            <el-form-item label="Address" :label-width="formLabelWidth">
                <el-input v-model="form.signer_address" autocomplete="off" />
            </el-form-item>
            <el-form-item label="Phone" :label-width="formLabelWidth">
                <el-input v-model="form.telphone" autocomplete="off" />
            </el-form-item>

            <el-form-item label="As default" :label-width="formLabelWidth">
                <el-switch v-model="form.default" class="ml-2"
                    style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949" />
            </el-form-item>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="popMode = 0;; popVis = false">Cancel</el-button>
                    <el-button type="primary" @click="confirm">
                        Confirm
                    </el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>
<script setup>

import { req } from '@/network/RequestConfig';
import { ref, reactive, computed } from 'vue';
// import { ElMessageBox } from 'element-plus'

const formLabelWidth = '80px'
// const vstyCreate = ref(false)
// 0 nothing; 1 create; else edit id
const popMode = ref(0)
const popVis = ref(false)
const listData = ref([])
req({ url: '/addr/list' }).then(res => {
    if (res.status == 200) {
        listData.value = res.data
    } else {
        if (res.status != 507) alert(res.data)
    }
})

function del(id) {
    req({
        url: '/addr/' + id,
        method: "delete",
    }).then(res => {
        if (res.status == 200) {
            location.reload()
        } else {
            if (res.status != 507) alert(res.data)
        }

    })
}

function confirm() {
    req({
        url: '/addr/' + (popMode.value == 1 ? '' : popMode.value),
        method: popMode.value == 1 ? "post" : "put",
        data: form
    }).then(res => {
        if (res.status == 200) {
            popMode.value = 0
            popVis.value = false
            location.reload()
        } else {
            alert(res.data)
        }
    })
}

function edit(item) {
    form.signer_name = item.signer_name
    form.district = item.district
    form.telphone = item.telphone
    form.signer_address = item.signer_address
    form.default = (item.default == 1)
    popMode.value = item.id
    popVis.value = true
}

function setDefault(id) {
    req({ url: '/addr/list', method: "put", data: { id: id } }).then(res => {
        if (res.status == 200) {
            location.reload()
        } else {
            if (res.status != 507) alert(res.data)
        }
    })
}

const form = reactive({
    signer_name: '',
    district: '',
    telphone: '',
    signer_address: '',
    default: false,
})

</script>

<style scoped lang="less">
#address-management {
    padding: 20px;

    >button {
        padding: 5px 10px;
        background-color: #f0f9e9;
        border: 1px solid #bfd6af;
        color: #333;
        font-weight: bold;
    }

    >div {
        border: 1px solid #bfd6af;
        margin-top: 20px;
        height: 145px;
        padding: 10px;
        position: relative;

        .name {
            font-size: 16px;
            color: #999;
        }

        .default {
            background-color: orange;
            color: white;
            font-weight: bold;
            padding: 3px;
            position: absolute;
            left: 150px;
        }

        img {
            width: 20px;
            height: 20px;
            position: absolute;
            right: 10px;
        }

        .details {
            margin-top: 10px;
            padding-left: 20px;
            padding-right: 20px;

            label {
                display: inline-block;
                width: 50px;
                line-height: 20px;
                text-align: right;
                color: #999;
            }

            span {
                width: 50px;
                line-height: 20px;
                margin-left: 20px;
                color: #333;
            }
        }

        .bottom {
            margin-top: 20px;
            float: right;

            span {
                font-size: 14px;
                color: slateblue;
                padding: 0 10px;
                cursor: pointer;

                &:hover {
                    color: var(--main-red);
                }
            }
        }
    }
}
</style>