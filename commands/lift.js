const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('lift')
		.setDescription('Did they lie!?!?'),
	async execute(interaction, manager) {
		if (interaction.channel.name === "meyer"){
			if (manager.isUserAwaited(interaction.user.id)){

				let game = manager.games[manager.awaitingUsers[interaction.user.id]]

				if (game.awaitedAction == "roll"){
					
					interaction.reply(`${interaction.user.tag} lifted...\n${game.lift()}`)
					let deathMessages = game.removeDeadPlayers()
					if (deathMessages.length > 0){
						deathMessages.forEach(message => {
							interaction.channel.send(message)
						});
					}
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
