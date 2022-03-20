const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('meyer')
		.setDescription('Start a new game of Meyer'),
	async execute(interaction) {
		if (interaction.channel.name === "meyer"){
			await interaction.reply("Starting new game! Use /join to join");
		} else {
			await interaction.reply({ content: 'This command only works in channels named "meyer"', ephemeral: true })
		}

	},
};
