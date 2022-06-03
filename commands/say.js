const { SlashCommandBuilder } = require('@discordjs/builders');
const { numbers, names } = require('../numbers.json')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('say')
		.setDescription('Say what you got or lie (:')
		.addNumberOption(option =>
		option.setName("what")
			.setDescription("What have you got? (as a number)")
			.setRequired(false)),
	async execute(interaction, manager) {
		if (interaction.channel.name === "meyer"){
			if (manager.isUserAwaited(interaction.user.id)){

				let game = manager.games[manager.awaitingUsers[interaction.user.id]]
				if (game.awaitedAction == "say"){
					
					if (interaction.options.getNumber("what")){
					
						// Get what the user says they rolled
						let roll = interaction.options.getNumber("what").toString()
						let rollList = [parseFloat(roll[0]),parseFloat(roll[1])].sort().reverse()
						let rollText = `${rollList[0]}${rollList[1]}`
						let rollValue = numbers[rollList[0]][rollList[1]]
						
						// Check if the value rolled has a name in the "numbers.json" file
						if (names[rollValue.toString()]){
							rollText += ` (${names[rollValue.toString()]})`
						}

						let nextPlayer = game.say(rollValue)
						// Response
						await interaction.reply(`${interaction.user.tag} says they got ${rollText}.\n${nextPlayer.tag} do you believe it?`)
						// Give the turn to the next player
						delete(manager.awaitingUsers[interaction.user.id])
						game.awaitNewPlayer(nextPlayer)

					} else {
						// If they said nothing, it means "That or thereover"
						let nextPlayer = game.thereover()
						// Give the turn to the next player
						delete(manager.awaitingUsers[interaction.user.id])
						game.awaitNewPlayer(nextPlayer)
						// Response
						await interaction.reply(`${interaction.user.tag} said "That or thereover". ${nextPlayer.tag} do you think it is over?`)
					}
				}
			}
			else {
				await interaction.reply({content:'It is not your turn or you are not acitve in a game!'})
			}
		} else {
			await interaction.reply({ content: 'This command only works in channels named "meyer"', ephemeral: true })
		}

	},
};
