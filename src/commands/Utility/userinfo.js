const { Command, Timestamp } = require('klasa');

module.exports = class UserInfoCommand extends Command {
	constructor(...args) {
		super(...args, {
			usage: '[Member:member]',
			botPerms: ['EMBED_MESSAGE'],
			description: 'Shows basic information about yourself or an user!'
		});
		this.statuses = {
			online: '💚 Online',
			idle: '💛 Idle',
			dnd: '❤ Do Not Disturb',
			offline: '💔 Offline'
		};
		this.timestamp = new Timestamp('d MMMM YYYY');
	}

	run(msg, [member = msg.member]) {
		const userInfo = new this.client.methods.Embed()
			.setColor(member.displayHexColor || 0xFFFFFF)
			.setThumbnail(member.user.displayAvatarURL())
			.addField('❯ Name', member.user.tag, true)
			.addField('❯ ID', member.id, true)
			.addField('❯ Discord Join Date', this.timestamp.display(member.user.createdAt), true)
			.addField('❯ Server Join Date', this.timestamp.display(member.joinedTimestamp), true)
			.addField('❯ Status', this.statuses[member.user.presence.status], true)
			.addField('❯ Playing', member.user.presence.activity ? member.user.presence.activity.name : 'N/A', true)
			.addField('❯ Highest Role', member.roles.highest.name !== '@everyone' ? member.roles.highest.name : 'None', true)
			.addField('❯ Hoist Role', member.hoistRole ? member.hoistRole.name : 'None', true);

		return msg.send(userInfo);
	}
};
