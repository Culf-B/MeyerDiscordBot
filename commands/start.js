const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('start')
		.setDescription('Will start your game, no more people will be able to join.'),
	async execute(interaction, manager) {
		if (interaction.channel.name === "meyer"){
			await interaction.reply(manager.startGame(interaction.user, interaction.channel));
		} else {
			await interaction.reply({ content: 'This command only works in channels named "meyer"', ephemeral: true })
		}

	},
};
