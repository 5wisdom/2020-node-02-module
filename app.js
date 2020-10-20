const path = require('path');
const express = require('express');
//path나 express앞에 경로가 안붙으면 node modules에서 가져온다
//const dt = require('./modules/sample');//모듈스에있는 샘플 js 가져옴
const {moment, nowDateIso, nowDateKorean} = require('./modules/date'); //비구조할당
//console.log(dt);
//console.log(nowDateIso());
//console.log(nowDateKorean());
//console.log(moment);

const notFound = path.join(__dirname, './public/404.html');

const app = express();
app.listen(3000, () => { console.log('http://127.0.0.1:3000'); });


//    /루트로 요청을 받으면 뒤에껄로 실행을 하겠다
//app뒤에 use는 get,post이든 이거로 받음, use는 다받음
app.use('/', express.static(path.join(__dirname,'./public')));
//dirname 현재폴더
//절대경로로 public의 index 파일을 찾는다 있으면 보여주고 종결, 없으면 밑에것을 실행함 


//res->return과 같다고 생각
app.get('/', (req, res)=> {
    res.send('<h1>Hello</h1>');
});

//자바스크립트처럼 위에서 부터 읽어 내려오다가 여기는 / 가 없기때문에 무조건 여기로 들어옴
//redirect -> return해주세요, 다시요청해주세요
app.use((req, res) => {
   // res.redirect('/404.html'); //다시 req 해줌 다시 app.use로 돌아가서 404파일을 찾음 따라서 2번 돌음
   res.sendFile(notFound);//파일을보내줌 다시 돌아가는게 아니라 파일만 보내줌 파일을 바로 보내서 1번만 돌음
});