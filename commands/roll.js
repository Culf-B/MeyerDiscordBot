const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('roll')
		.setDescription('Roll the dice!'),
	async execute(interaction, manager) {
		if (interaction.channel.name === "meyer"){
			if (manager.isUserAwaited(interaction.user.id)){

				let game = manager.games[manager.awaitingUsers[interaction.user.id]]
				console.log(game)
				if (game.awaitedAction == "roll"){
					await interaction.reply({content: `Your roll: ${game.roll(interaction.user.id)}`, ephemeral: true})
					await interaction.channel.send(`${interaction.user.tag} just rolled the dice!`)
				}
			}
			else {
				await interaction.reply({content:'It is not your turn to roll or you are not acitve in a game!'})
			}
		} else {
			await interaction.reply({ content: 'This command only works in channels named "meyer"', ephemeral: true })
		}

	},
};
