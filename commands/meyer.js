const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('meyer')
		.setDescription('Start a new game of Meyer'),
	async execute(interaction, manager) {
		if (interaction.channel.name === "meyer"){
			await interaction.reply(manager.newGame(interaction.user))
		} else {
			await interaction.reply({ content: 'This command only works in channels named "meyer"', ephemeral: true })
		}

	},
};
