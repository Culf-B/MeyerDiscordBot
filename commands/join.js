const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('join')
		.setDescription('Join a game'),
	async execute(interaction) {
		if (interaction.channel.name === "meyer"){
			await interaction.reply("You have now joined this game of meyer!");
		} else {
			await interaction.reply({ content: 'This command only works in channels named "meyer"', ephemeral: true })
		}

	},
};
