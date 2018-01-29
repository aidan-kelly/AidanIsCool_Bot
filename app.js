const Discord = require("discord.js");
const client = new Discord.Client();

client.on("ready", () => {
  console.log("I am ready!");
});

client.on("message", (message) => {
  if (message.content.startsWith("!ping")) {
    message.channel.send("pong!");
  }

  if (message.content.startsWith("!roll")){
    message.channel.send( "You rolled a " + (Math.floor(Math.random() * 20 ) +1) + "!");
  }

  if (message.content.startsWith("Who is the best?")){
    message.channel.send("AIDAN.");
  }
  if (message.content.startsWith("RE")){
    message.channel.send("https://imgur.com/r/pepethefrog/EL9Il25");
  }
});

client.login("TOKEN GOES HERE");