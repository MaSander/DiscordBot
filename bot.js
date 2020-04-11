const Discord = require("discord.js"); //baixar a lib
const client = new Discord.Client();
const config = require("./config.json");
const Axios = require("axios");

//Ao inicializar
client.on("ready", () => {
    console.log(`Bot foi iniciado, com ${client.users.size} usuários, em ${client.channels.size} canais, em ${client.guilds.size} servidores.`);
    client.user.setPresence({ game: { name: 'comando', type: 1, url: 'https://www.twitch.tv/pedroricardo' } });
    //0 = Jogando
    //  1 = Transmitindo
    //  2 = Ouvindo
    //  3 = Assistindo
});

// client.on("raw", data => {
//     // console.log(data.d.author)
//     if (data.t == "MESSAGE_CREATE") {
//         if (data.d.author.avatar == "63e8e6e9f757639ce749e35cc80aaccf") {
//             client.on("message", message => {
//                 return message.channel.send("au au");
//             })
//         }
//     }
// });

//Chamadas de comando pelo chat do discord
client.on("message", async message => {

    if (message.author.bot) return;
    if (message.channel.type === "dm") return;
    if (!message.content.startsWith(config.prefix)) return;

    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const comando = args.shift().toLowerCase();

    // coamdno ping
    if (comando === "ping") {
        const m = await message.channel.send("Ping?");
        m.edit(`${m.createdTimestamp - message.createdTimestamp}ms. | Api: ${Math.round(client.ping)}ms.`);
    }

    // Comando de cotação euro e dolar
    if (comando === "price") {
        const urlPrice = `https://economia.awesomeapi.com.br/all/USD-BRL,EUR-BRL`

        let resReturn = []

        Axios.get(urlPrice)
            .then(function (res) {
                resReturn[0] = `Dolar: ${res.data.USD.high}`
                resReturn[1] = `Euro: ${res.data.EUR.high}`
            }
            )
            .catch(function (error) {
                resReturn[0] = 'deu merda'
            })
        const m = await message.channel.send("Real?");
        m.edit(`${resReturn}`);

    }

});

// Create an event listener for new guild members
client.on('guildMemberAdd', member => {
    // Send the message to a designated channel on a server:
    const channel = member.guild.channels.cache.find(ch => ch.name === 'geral');
    // Do nothing if the channel wasn't found on this server
    if (!channel) return;
    // Send the message, mentioning the member
    channel.send(`Welcome to the server, ${member}`);
});

client.login(config.token);