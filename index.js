const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');

const express = require('express')
const app = express()
const path = require("path")

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"))


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'delta_app',
  password: "Lokesh@2802"
});




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

  
  app.listen(3000, ()=>{
    console.log("server is listening to 3000")
  })



  
  // let data  = []

  // let createRandomUser = () => {
  //   return [
  //     faker.string.uuid(),
  //     faker.internet.userName(),
  //     faker.internet.email(),
  //     faker.internet.password()
  // ];
  // };

