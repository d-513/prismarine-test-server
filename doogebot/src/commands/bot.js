const Command = require("../index");

module.exports = class BotCommand extends Command {
  constructor() {
    super();
    console.log("Loaded botcmd");
    this.addCommand("bot", (username) => {
      this.bot.chat(`/luckperms user ${username} parent set bot`);
      this.bot.chat("I made you a bot!");
    });
    this.addCommand("human", (username) => {
      this.bot.chat(`/luckperms user ${username} parent set default`);
      this.bot.chat("I made you a human!");
    });
  }
};
