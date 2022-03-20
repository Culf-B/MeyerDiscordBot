const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('start')
		.setDescription('Will start your game, no more people will be able to join.'),
	async execute(interaction) {
		if (interaction.channel.name === "meyer"){
			await interaction.reply("Game started! No more people can join.");
		} else {
			await interaction.reply({ content: 'This command only works in channels named "meyer"', ephemeral: true })
		}

	},
};
