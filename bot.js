const Discord = require("discord.js"); //baixar a lib
const client = new Discord.Client();
const config = require("./config.json");
const Axios = require("axios");

//id do pepe 291901772669124609

//Ao inicializar
client.on("ready", () => {
    console.log(`Bot foi iniciado, com ${client.users.size} usuários, em ${client.channels.size} canais, em ${client.guilds.size} servidores.`);
    client.user.setPresence({ game: { name: 'comando', type: 1, url: 'https://www.twitch.tv/pedroricardo' } });
    //0 = Jogando
    //  1 = Transmitindo
    //  2 = Ouvindo
    //  3 = Assistindo
});

client.on("raw", console.log())

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

client.login(config.token);