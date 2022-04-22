import User from '../models/user.model'
import logger from '../core/logger/app-logger'
import FCM from "fcm-node"

const controller = {};


// //var serverKey = 'AA//AADRwMnqs:APA91bFoL6ozGaAqTqZEaiAN8rHIl3KQsy8qOcvg8DGNiwm9DcQI6MPdRm4-Lds5uRC_lWLE8q1GkHhA7tXSUPbPt46uzXtUzR_TNG7gSIOhggikDxPwzpIFGcv2N-LAGQzECBhV-6yr';
// var serverKey = 'AAAAD-S-xTQ:APA91bHgVqtORke4oGgGBr5KlmOOgIpEFrb5o3yM0JB9LliJomy7zeAn9pvgwHk_lcXCYiVlbbiw39B6sqiX2zPJVJv-CYr5hwyU-xMJEhS0up-0girqluh6sYDd19cQbCufv2T5HgXL';
// var client_token = 'e7I9zsCk70s:APA91bFfRIpV5zGiC_6LE4avlK7XSRM7rlmxNeJaokHGQgPR5QXkA1Hp6y7pymrSR6VCAJHOEJjL8FTbB8scsSM_yvPOo7JCF-0k-t0sHOgB2ASmnB3W-0agZQdv_H8pGHDHQ_1euI1G'


// var push_data = {
//     // 수신대상
//     to: client_token,
//     // App이 실행중이지 않을 때 상태바 알림으로 등록할 내용
//     notification: {
//         title: "Hello Node",
//         body: "Node로 발송하는 Push 메시지 입니다.",
//         sound: "default",
//         click_action: "FCM_PLUGIN_ACTIVITY",
//         icon: "fcm_push_icon"
//     },
//     // 메시지 중요도
//     priority: "high",
//     // App 패키지 이름
//     restricted_package_name: "inbm.com.tabfragmenttest",
//     // App에게 전달할 데이터
//     data: {
//         link: 2000,
//         num2: 3000
//     }
// };

// function pushMessage(){
//     var fcm = new FCM(serverKey);
//     fcm.send(push_data, function(err, res){

//         if(err){
//             console.error("----?-" + err);
//         }

//         console.log(res);
//     });

    

// }




controller.getAll = async (req, res) => {
    try {
        const users = await User.getAll();
        logger.info('sending all users...');
        res.send(users);
    }
    catch(err) {
        logger.error('Error in getting users- ' + err);
        res.send('Got error in getAll');
    }
}

controller.addUser = async (req, res) => {
    let userToAdd = User({
        name: req.body.name
    });
    try {
        const savedUser = await User.addUser(userToAdd);
        logger.info('Adding user...');

        // pushMessage();
        res.send('added: ' + savedUser);

    }
    catch(err) {
        logger.error('Error in getting users- ' + err);
        res.send('Got error in getAll');
    }
}

controller.deleteUser = async (req, res) => {
    let userName = req.body.name;
    try{
        const removedUser = await User.removeUser(userName);
        logger.info('Deleted User- ' + removedUser);
        res.send('User successfully deleted');
    }
    catch(err) {
        logger.error('Failed to delete user- ' + err);
        res.send('Delete failed..!');
    }
}

export default controller;