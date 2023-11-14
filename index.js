const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'delta_app',
  password: "Lokesh@2802"
});

let q = "INSERT INTO user (id, username, email, password) VALUES ?"
let userdata = [
  ["123c", "abcc", "abc@gmail.comc", "abc123c"],
  ["123b", "abcb", "abc@gmail.comm", "abc1234"]
  ]

try{
  connection.query(q, [userdata], (err, result)=>{
    if(err) throw err
    console.log(result)
    // console.log(result.length)
  })
}catch (err) {
    console.log(err)
  }

  connection.end()
  
  let  createRandomUser = () => {
  return {
    id: faker.string.uuid(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
}

// console.log(createRandomUser())
