const express = require('express');
const router = express.Router();

//http://127.0.0.1:3000/member/join
router.get('/join', (req, res, next) => {
    res.send('<h1>회원가입</h1>');
});

//문자열 배열 정규표현식이 들어갈수 있따
//배열 안에다가 넣으면 두개다 받아주겠다는 의미이다
//이방법은 node에서 사용하는것으로 시멘틱주소이다 최근 쿼리보다 많이 사용한다
//http://127.0.0.1:3000/member/
//http://127.0.0.1:3000/member/login
//app.js에서 member를 통해들어왔기때문에 /member가 생략가능하다
router.get(['/', '/login'], (req, res, next) => {
    res.send('<h1>회원 로그인</h1>');
});

//라우터를 만드는 기본문법
module.exports = router;