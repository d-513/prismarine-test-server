const secrets = require("../secrets.json");
const mineflayer = require("mineflayer");
const tpsPlugin = require("mineflayer-tps")(mineflayer);
const fs = require("fs-extra");
const bot = mineflayer.createBot(secrets.bot);
const commands = new Map();
const Chance = require("chance");
const chance = new Chance();

bot.loadPlugin(tpsPlugin);

module.exports = class Command {
  constructor() {
    this.bot = bot;
  }

  addCommand(command, exec) {
    commands.set(command, exec);
  }
};

bot.on("message", (msg) => {
  const message = msg.toString();
  if (message.startsWith("TPS from")) bot.chat(`Server ${message}`);
});

bot.on("chat", (username, message) => {
  if (username === bot.username) return;
  if (message.startsWith("!")) {
    const command = message.substring(1).split(" ")[0];
    const exec = commands.get(command);
    if (exec) {
      const args = message.substring(1).split(" ").slice(0, 1);
      exec(username, args, message);
    } else {
      bot.chat("doge does not have such command");
    }
  }
});

bot.once("spawn", async () => {
  const dir = await fs.readdir("./src/commands");
  dir.forEach((file) => {
    const clas = require(`./commands/${file}`);
    new clas();
  });
  console.log("Spawned");
  bot.chat(`/register ${secrets.authme} ${secrets.authme}`);
  bot.chat(`/login ${secrets.authme}`);
  await wait(1000);
  bot.chat("Dooge logged in");

  // ANTI-AFK (keepalivetimeout)
  bot.setControlState("jump", true);
  bot.swingArm("left");
  setInterval(() => {
    bot.look(
      chance.integer({ min: -Math.PI, max: Math.PI }),
      chance.integer({ min: -Math.PI * 2, max: Math.PI * 2 })
    );
  }, 1000);
});

function wait(ms) {
  return new Promise((resolver) => {
    setTimeout(resolver, ms);
  });
}
