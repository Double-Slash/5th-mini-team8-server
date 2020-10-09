var mysql      = require('mysql');
const bcrypt = require('bcrypt');
const saltRounds = 10;
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'kimecr5p9253!!',
  database : 'test'
});
connection.connect(function(err){

  if(!err) {
    console.log("Database is connected ... nn");
  } else {
    console.log("Error connecting database ... nn");
  }
});

exports.register = async function(req,res){
  var email= req.body.email;
  const password = req.body.password;
  //회원 정보 미 개입시
  if(email.length==0 || password.length==0){
    res.send({
      "code":400,
      "failed":"check your email and password"
    })
  }
  //회원 정보 개입 완료
  else{
    const encryptedPassword = await bcrypt.hash(password, saltRounds)
    var users={
     "email":req.body.email,
     "password":encryptedPassword
    }
    connection.query('SELECT * FROM users WHERE email = ?',[email],  function (error, results, fields) {
    //Query 전송 실패
    if (error) {
      res.send({
        "code":400,
        "failed":"error ocurred"
      })
    }else{
      //email이 이미 존재하는 경우
      if(results.length >0){
        res.send({
          "code":421,
          "failed":"Misdirected Request"
        })
      }
      else{
        connection.query('INSERT INTO users SET ?',users, function (error, results, fields) {
          //Query 전송 실패
          if (error) {
            res.send({
              "code":400,
              "failed":"error ocurred"
            })
          } 
          //회원가입 성공
          else {
            res.send({
              "code":200,
              "success":"user registered sucessfully"
            });
          }
        });
      }
    }
    }); 
  }
}

exports.login = async function(req,res){
  var email= req.body.email;
  var password = req.body.password;
  connection.query('SELECT * FROM users WHERE email = ?',[email], async function (error, results, fields) {
    //Query 전송 실패
    if (error) {
      res.send({
        "code":400,
        "failed":"error ocurred"
      })
    }else{
      //databse내 email 정보가 존재할 때
      if(results.length >0){
        const comparision = await bcrypt.compare(password, results[0].password)
        //로그인 성공
        if(comparision){
            res.send({
              "code":200,
              "success":"login sucessfull"
            })
        }
        //로그인 정보 불일치
        else{
          res.send({
               "code":204,
               "success":"Email and password does not match"
          })
        }
      }
      //database내 email정보가 존재하지 않을 때
      else{
        res.send({
          "code":206,
          "success":"Email does not exits"
            });
      }
    }
  });
}