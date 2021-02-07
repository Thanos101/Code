const Discord = require("discord.js")
const client = new Discord.Client()
const config = require("./config.json")
const prefix = '>';

const fs = require('fs');
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./The Bot v2/commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles) {
    const command = require(`./commands/${file}`)

    client.commands.set(command.name, command);
}

client.on("ready", () => {
    client.user.setPresence({ activity: { name: "Beep Beep Boop"}, status: "online"})
    console.log("The Bot Is ON")
})

client.on('message', message => {
  if(!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();

  if(command === "ping") {
    client.commands.get('ping').execute(message, args);
  }

  if(command === "sinfo") {
    client.commands.get('sinfo').execute(message, Discord);
  }

  if(command === "hello") {
    client.commands.get('hello').execute(message, args);
  }

  if(command === "tictactoe") {
    client.commands.get('tictactoe').execute(message, args);
  }

})

client.on("message", message => {
  const command = message.content.toLowerCase();

  if (command === "hello") {
    client.commands.get("hello").execute(message);
  }
})

client.login(config.token)