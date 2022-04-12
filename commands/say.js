const { SlashCommandBuilder } = require('@discordjs/builders');
const { numbers, names } = require('../numbers.json')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('say')
		.setDescription('Say what you got or lie (:')
		.addNumberOption(option =>
		option.setName("what")
			.setDescription("What have you got? (as a number)")
			.setRequired(true)),
	async execute(interaction, manager) {
		if (interaction.channel.name === "meyer"){
			if (manager.isUserAwaited(interaction.user.id)){

				let game = manager.games[manager.awaitingUsers[interaction.user.id]]
				if (game.awaitedAction == "say"){
					let roll = interaction.options.getNumber("what").toString()
					let rollValue = [parseFloat(roll[0]),parseFloat(roll[1])].sort().reverse()
					let rollText = `${rollValue[0]}${rollValue[1]}`
					console.log(rollText, rollValue)
					let value = numbers[rollValue[0]][rollValue[1]].toString()
					console.log(value)
					if (names[value]){
						rollText += ` (${names[value]})`
					}
					let nextPlayer = game.say(rollValue)
					delete(manager.awaitingUsers[interaction.user.id])
					console.log(nextPlayer)
					manager.awaitingUsers[nextPlayer.id] = game.owner.id
					await interaction.reply(`${interaction.user.tag} says they got ${rollText}.\n${nextPlayer.tag} do you believe it?`)
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
