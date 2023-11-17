const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');
const express = require('express')
const app = express()
const path = require("path")
var methodOverride = require('method-override');
const { PassThrough } = require('stream');

app.use(methodOverride('_method'))
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"))
app.use(express.urlencoded({extended: true}))


// connecting to database using mysql2 package

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'delta_app',
  password: "Lokesh@2802"
});

  // home route

  app.get('/', function (req, res) {
    let q = `SELECT count(*) FROM user`
    try{
      connection.query(q, (err, result)=>{
        if(err) throw err
        let count = result[0]["count(*)"]
        res.render("home", { count })
      })
    }catch (err) {
       res.send("error")
    }
  })

  // show all users route

  app.get('/user', function (req, res) {
    let q = `SELECT * FROM user`
    try{
      connection.query(q, (err, users)=>{
        if(err) throw err
        res.render("userpage", { users })
      })
    }catch (err) {
       res.send("error")
    }
  })


  // edit route 

  app.get("/user/:id/edit", (req, res)=>{
    let {id} = req.params
    let q = `SELECT * FROM user where id = "${id}"`
    try {
    connection.query(q, (err, result)=>{
      if(err) throw err
      let editableObj = result[0]
      res.render("edit", {editableObj})
    } )
    } catch (err) {
      res.send(err)
    }

  })

  // patch req of edited username

  app.patch("/user/:id", (req, res) => {
    let {id} = req.params
    let {username: formUser, password : formPass} =  req.body 
    let q = `SELECT * FROM user where id = "${id}"`
    try {
    connection.query(q, (err, result)=>{
      if(err) throw err
      let user = result[0]
      if(formPass != user.password){
        res.send("wrong password")
      }else{
        let q2 = `UPDATE user SET username ="${formUser}" WHERE id = '${id}'`
        connection.query(q2, (err, result)=>{
          if(err) throw err
          res.redirect('/user')
        })
      }
    } )
    } catch (err) {
      res.send(err)
    }
    
  })

  // delete route

  app.get("/user/:id/delete", (req, res)=>{
    let {id} = req.params;
    let q = `SELECT * FROM user WHERE id = '${id}'`
    connection.query(q, (err, result)=>{
      if(err) throw err
      let user = result[0]
      res.render("delete", {user})
    })
  })

  app.delete("/user/:id", (req, res)=>{
    let {id} = req.params
    let {password: formPass} = req.body 
   
    let q = `SELECT * FROM user WHERE id = "${id}"`
    connection.query(q, (err, result)=>{
      if(err) throw err
      let user  = result[0]

      if(formPass != user.password){
        console.log(user.password)
        res.send("wrong password")
      } else{
        let q2 = `DELETE FROM user WHERE id = "${id}"`
        connection.query(q2, (err, result)=>{
          if(err) throw err
          res.redirect("/user")
        })
      }
    })
  })
  
  app.listen(3000, ()=>{
    console.log("server is listening to 3000")
  })



