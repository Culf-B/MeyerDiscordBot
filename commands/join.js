const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('join')
		.setDescription('Join a game')
		.addStringOption(option =>
			option.setName("name")
			.setDescription("Name of the owner of the game you want to join")
			.setRequired(true)),
	async execute(interaction, manager) {
		if (interaction.channel.name === "meyer"){
			await interaction.reply(manager.joinQueue(interaction.user, interaction.options.getString("name")));
		} else {
			await interaction.reply({ content: 'This command only works in channels named "meyer"', ephemeral: true })
		}

	},
};
