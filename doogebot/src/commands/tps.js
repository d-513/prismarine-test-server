const Command = require("../index");

module.exports = class TpsCommand extends Command {
  constructor() {
    super();
    console.log("Loaded tps");
    this.addCommand("tps", () => {
      this.bot.chat(`The current approximate tps is ${this.bot.getTps()}`);
      // in index.js theres a handler for the rest of tps output
      this.bot.chat("/tps");
    });
  }
};
