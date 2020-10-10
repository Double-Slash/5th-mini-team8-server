var mysql      = require('mysql');
const bcrypt = require('bcrypt');
const saltRounds = 10;
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '123456',
  database : 'double-slash-8thdb'
});
connection.connect(function(err){

  if(!err) {
    console.log("Database is connected ... nn");
  } else {
    console.log("Error connecting database ... nn");
  }
});

exports.register = async function(req,res){
  var name= req.body.name;
  var id= req.body.id;
  var email=req.body.email;
  const password = req.body.password;
  //회원 정보 미 개입시
  if(name.length==0 || id.length==0 || email.length==0 || password.length==0){
    res.send({
      "code":400,
      "failed":"check your information... you have blanks"
    })
  }
  //회원 정보 개입 완료
  else{
    const encryptedPassword = await bcrypt.hash(password, saltRounds)
    var users={
     "id":req.body.id,
     "password":encryptedPassword,
     "email":req.body.email,
     "name":req.body.name
    }
    connection.query('SELECT * FROM user WHERE user_id = ?',[id],  function (error, results, fields) {
    //Query 전송 실패
    if (error) {
      res.send({
        "code":400,
        "failed":"error ocurred"
      })
    }else{
      //id가 이미 존재하는 경우
      if(results.length >0){
        res.send({
          "code":400,
          "failed":"this id is already made by other user"
        })
      }
      else{
        connection.query('INSERT INTO user(user_id, password, email, name) VALUES (?, ?, ?, ?)',[users.id, users.password, users.email, users.name], function (error, results, fields) {
          //Query 전송 실패
          if (error) {
            console.log(error)
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
  var id= req.body.id;
  var password = req.body.password;
  connection.query('SELECT * FROM user WHERE user_id = ?',[id], async function (error, results, fields) {
    //Query 전송 실패
    if (error) {
      res.send({
        "code":400,
        "failed":"error ocurred"
      })
    }else{
      //databse내 id 정보가 존재할 때
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
               "success":"ID and password does not match"
          })
        }
      }
      //database내 id정보가 존재하지 않을 때
      else{
        res.send({
          "code":206,
          "success":"Your Id does not exits"
            });
      }
    }
  });
}