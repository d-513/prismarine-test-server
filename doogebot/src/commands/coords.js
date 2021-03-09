const Command = require("../index");

module.exports = class CoordsCommand extends Command {
  constructor() {
    super();
    console.log("Loaded coords");
    function calcPos(pos) {
      return `${Math.round(pos.x)} ${Math.round(pos.y)} ${Math.round(pos.z)}`;
    }
    this.addCommand("coords", () => {
      this.bot.chat(
        `My current location is ${calcPos(this.bot.entity.position)}`
      );
    });
  }
};
