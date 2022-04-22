import express from "express";
import userController from "../controllers/users.controller"

import FCM from "fcm-node"
import logger from './../core/logger/app-logger';
const router = express.Router()

var push_data = {
    // 수신대상
    to: client_token,
    // App이 실행중이지 않을 때 상태바 알림으로 등록할 내용
    notification: {
        title: "Hello Node",
        body: "Node로 발송하는 Push 메시지 입니다.",
        sound: "default",
        click_action: "FCM_PLUGIN_ACTIVITY",
        icon: "fcm_push_icon"
    },
    // 메시지 중요도
    priority: "high",
    // App 패키지 이름
    restricted_package_name: "inbm.com.tabfragmenttest",
    // App에게 전달할 데이터
    data: {
        num1: 2000,
        num2: 3000
    }
};

function pushMessage(){
    var fcm = new FCM(serverKey);
    fcm.send(push_data, function(err, res){

        if(err){
            console.error(err);
        }
    });

    console.log("success");

}

var serverKey = 'AAAADRwMnqs:APA91bFoL6ozGaAqTqZEaiAN8rHIl3KQsy8qOcvg8DGNiwm9DcQI6MPdRm4-Lds5uRC_lWLE8q1GkHhA7tXSUPbPt46uzXtUzR_TNG7gSIOhggikDxPwzpIFGcv2N-LAGQzECBhV-6yr';
var client_token = 'e7I9zsCk70s:APA91bFfRIpV5zGiC_6LE4avlK7XSRM7rlmxNeJaokHGQgPR5QXkA1Hp6y7pymrSR6VCAJHOEJjL8FTbB8scsSM_yvPOo7JCF-0k-t0sHOgB2ASmnB3W-0agZQdv_H8pGHDHQ_1euI1G'

router.get('/', ()=>{
    console.log('users root')
})


router.get('/allusers', (req, res) => {
    userController.getAll(req, res);
});

router.post('/adduser', (req, res) => {
    userController.addUser(req, res);
});

router.delete('/deleteuser', (req, res) => {
    userController.deleteUser(req, res);
});

export default router;