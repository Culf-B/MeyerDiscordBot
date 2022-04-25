const { SlashCommandBuilder } = require('@discordjs/builders');
const { numbers, names } = require("../numbers.json")

module.exports = {
	data: new SlashCommandBuilder()
		.setName('roll')
		.setDescription('Roll the dice!'),
	async execute(interaction, manager) {
		if (interaction.channel.name === "meyer"){
			if (manager.isUserAwaited(interaction.user.id)){

				let game = manager.games[manager.awaitingUsers[interaction.user.id]]

				if (game.awaitedAction == "roll"){
					let roll = game.roll()
					let rollText = `${roll[0]}${roll[1]}`
					let value = numbers[roll[0].toString()][roll[1].toString()]
					if (names[value]){
						rollText += ` (${names[value]})`
					}
					await interaction.reply({content: `Your roll: ${rollText}`, ephemeral: true})
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
