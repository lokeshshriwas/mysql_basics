const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'delta_app',
  password: "Lokesh@2802"
});

let q = "INSERT INTO user (id, username, email, password) VALUES ?"

  let data  = []

  let createRandomUser = () => {
    return [
      faker.string.uuid(),
      faker.internet.userName(),
      faker.internet.email(),
      faker.internet.password()
  ];
  };


  for(let i = 1; i <= 100; i++){
    data.push(createRandomUser())
  }


try{
  connection.query(q, [data], (err, result)=>{
    if(err) throw err
    console.log(result)
    // console.log(result.length)
  })
}catch (err) {
    console.log(err)
  }

  connection.end()


