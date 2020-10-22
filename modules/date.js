const moment = require('moment'); //날짜표기

//ISO Date - 2020-10-20 21:04:10
//2020년 10월 20일 21시 04분 10초

//var nowDate = moment().format('YYYY-MM-DD HH:mm:ss');
//var nowDate2 = moment().format('YYYY년 MM월 DD일 HH시 mm분 ss초');

const nowDateIso = () => {
    return moment().format('YYYY-MM-DD HH:mm:ss');
}
const nowDateKorean = () => {
    return moment().format('YYYY년 MM월 DD일 HH시 mm분 ss초');
}

// const obj = { 
//     //moment: moment, //왼쪽은 키 오른쪽은 위에 const값
//     moment, //키 값이 같으면 한쪽은 생략가능하다
//     nowDateIso, 
//     nowDateKorean
// }
//const obj = { moment,nowDateIso,  nowDateKorean} //한줄로도 사용가능하다

//module.exports = obj;
module.exports = { moment, nowDateIso,  nowDateKorean};


//console.log(new Date());//2020-10-20T12:05:44.474Z 자바스크립트 날짜표기법
//console.log(nowDate);//2020-10-20 21:09:46
//console.log(nowDate2); //2020년 10월 20일 21시 11분 02초

