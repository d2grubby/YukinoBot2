const { Command } = require('klasa');

module.exports = class PauseCommand extends Command {
	constructor(...args) {
		super(...args, {
			runIn: ['text'],
			description: 'pause the current playing song.'
		});
	}

	async run(msg) {
		await msg.guild.music.pause();
		return msg.send('paused the player!');
	}
};
