const Command = require("../index");

module.exports = class KillCommand extends Command {
  constructor() {
    super();
    console.log("Loaded kill");
    this.addCommand("kill", (username) => {
      this.bot.chat(`/kill ${username}`);
      this.bot.chat("Done, killed");
    });
  }
};
