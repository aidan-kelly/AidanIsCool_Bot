const Discord = require("discord.js");
const client = new Discord.Client();
const mysql = require("mysql");

//creates our database conneciton
//TODO change database on rollout
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "PASSWORD",
  database: "DATABASE"
});

//inits the connection to the database
con.connect(err => {
  if(err) throw err;
  console.log("Connected to datebase.");
});

//start up
client.on("ready", () => {
  console.log("I am ready!");
});

//returns random xp
function randXP(){
  var min = 20;
  var max = 30;

  return (Math.floor(Math.random() * (max - min +1)) + min);
}

//func that rolls a dice equal to the num put in.
function rollDice(diceToRoll){
  return (Math.floor(Math.random() * diceToRoll)+1);
}

//message handler.
client.on("message", (message) => {

  con.query(`SELECT * FROM xp WHERE id = '${message.author.id}'`, (err,rows) => {
    if(err) throw err;

    let sql;

    if(rows.length <1){
      sql = `INSERT INTO xp (id, xp) VALUES ('${message.author.id}', ${randXP()})`;
    }else{
      let xp = rows[0].xp;
      sql = `UPDATE xp SET xp = ${xp + randXP()} WHERE id = '${message.author.id}'`;
    }

    con.query(sql);
  });


  //ping pong
  if (message.content.startsWith("!ping")) {
    message.channel.send("pong!");
  }

  //dice roll
  if (message.content.startsWith("!roll")){

    //find num wanted to roll
    var newString = message.content.substring(7, message.content.length);

    //checks if actual number
    if(isNaN(newString)){
      message.channel.send("Yo, that's not valid. Watch yourself.");
    }else{
      message.channel.send( "You rolled a " + rollDice(newString) + "!");
    }
  }

  //stupid one ahaha
  if (message.content.startsWith("Who is the best?")){
    message.channel.send("Aidan is.");
  }

  //rage time. 
  if (message.content.toUpperCase().startsWith("REE")){
    message.channel.send("https://imgur.com/r/pepethefrog/EL9Il25");
  }

  //to piss off the gf
  if (message.content.includes("Kennedy")){
    message.channel.send("Did you mean KenKen?")
  }

  //memes
  if(message.content.startsWith("Let's")){
    message.channel.send("GO")
  }

  if(message.content.startsWith("!xp")){

    let target = message.author.id;
    con.query(`SELECT * FROM xp WHERE id = '${target}'`, (err, rows) => {
      if(err) throw err;

      let xp = rows[0].xp;
      message.channel.send("Your xp is " + xp);

    });
  }

  if(message.content.startsWith("!dab")){
    message.channel.send("https://imgur.com/gallery/NKo9LhU");
  }

});

//logs in.
client.login("TOKEN");