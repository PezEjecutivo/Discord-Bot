require('dotenv').config();

const { Client, GatewayIntentBits } = require('discord.js');
const cron = require('node-cron');
const { fetchData } = require('./utils.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.once("clientReady", () => {

    cron.schedule('0 9 * * *', async () => {
        const channel = client.channels.cache.get(process.env.CHANNEL_ID);
        const data = await fetchData("technology");

        if (channel) {
            await channel.send("Noticia: " + data.articles[0].title + "\nEnlace: " + data.articles[0].url);
        }
    });

});

client.on("messageCreate", (msg) => {
    if (msg.author.bot) return;

    let prefix = "?";
    let message = msg.content;

    if (message.startsWith(prefix)) {
        const command = message.slice(prefix.length).split(" ")[0];

        if (command != "") {
            msg.reply(msg.author.displayName + ", Espero que tengas un buen dia!");
        }
    }
});

client.login(process.env.DISCORDJS_TOKEN);
