const path = require('path');
const express = require('express');
//path나 express앞에 경로가 안붙으면 node modules에서 가져온다
//const dt = require('./modules/sample');//모듈스에있는 샘플 js 가져옴
const {moment, nowDateIso, nowDateKorean} = require('./modules/date'); //비구조할당
//console.log(dt);
//console.log(nowDateIso());
//console.log(nowDateKorean());
//console.log(moment);

const memberRouter = require('./routes/member'); //member.js 불러옴

const notFound = path.join(__dirname, './public/404.html');

const app = express();
app.listen(3000, () => { console.log('http://127.0.0.1:3000'); });

//app.set('view engine', 'ejs');
app.set('view engine', 'pug'); //어떤 파일을 쓸건지
app.set('views', './views') //pug파일은 어디에 있는지 지정
app.locals.pretty = true; // 서버에서 코드들이 한줄로 보이는것을 html형식으로 예쁘게 보이게 만듬

//포스트방식으로 들어온것을 json형식으로 변경
app.use(express.json());
app.use(express.urlencoded({extended: false}));


//req,res,next 앱의 중간에서 다 지나가게 만듬 미들웨어라고함
app.use((req, res, next) => {
  req.greeting = 'Hello'; //req+변수
  next();
});


//    /루트로 요청을 받으면 뒤에껄로 실행을 하겠다
//app뒤에 use는 get,post이든 이거로 받음, use는 다받음
//use,get 은 중간에 있어서 미들웨어라고 한다. 한번 들어오면 내 요청에 맞는게 들어올떄까지 미들웨어들을 통과한다
app.use('/', express.static(path.join(__dirname,'./public')));
//dirname 현재폴더
//절대경로로 public의 index 파일을 찾는다 있으면 보여주고 종결, 없으면 밑에것을 실행함 


app.get('/sample', (req, res, next)=> {
  // res.send('');
  // res.sendFile('절대경로');
  // res.redirect('/member');//다시 멤버로 요청보냄
  res.render('./sample.pug', {title: "PUG 연습"}); //render 표현하다로 html로 표현해서 보여줘
});

//pug는 변수고 books는 배열을 가지고 있는 객체이다
app.get('/book', (req, res, next) => {
  const pug = { books: [
    {id: 1, title: "별주부전", content: "거북이가 간을..."},
    {id: 2, title: "홍길동전", content: "아버지를 아버지라..."},
    {id: 3, title: "심청전", content: "아버지 심청이가..."},
    ]};
  res.render('./book.pug', pug);
})


app.use('/member', memberRouter);

//res->return과 같다고 생각
//next 다음으로 넘길때 사용-> res를 안쓰고 next쓰면 다음으로 넘겨짐 next가 없으면 계속 서버가 돌게됨, 예외처리시 사용
app.get('/time', (req, res, next)=> {
  res.send(`<h1>${req.greeting}/${nowDateIso()}</h1>`);
  //next(); 
});

//자바스크립트처럼 위에서 부터 읽어 내려오다가 여기는 / 가 없기때문에 무조건 여기로 들어옴
//redirect -> return해주세요, 다시요청해주세요
app.use((req, res, next) => {
  // res.redirect('/404.html'); //다시 req 해줌 다시 app.use로 돌아가서 404파일을 찾음 따라서 2번 돌음
  res.sendFile(notFound);//파일을보내줌 다시 돌아가는게 아니라 파일만 보내줌 파일을 바로 보내서 1번만 돌음
}); 
