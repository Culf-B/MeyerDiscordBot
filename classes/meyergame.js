const { numbers, names, rolls } = require("../numbers.json")

module.exports = {
	Meyer: function(manager, owner, players, channel){
		this.manager = manager
		this.channel = channel
		this.owner = owner
		this.awaitedAction = "roll"

		// Roll variables
		this.standard = 21
		this.standardSaid = 21
		this.currentRoll = [0,0]
		this.rollerIndex

		// Game settings
		this.lives = 6
		
		// Setup
		this.players = []
		this.currentPlayerIndex = 0
		players.forEach(player => {
			this.players.push({id:player.id,tag:player.tag,lives:this.lives})
		})

		this.roll = function(){
			this.standard = this.standardSaid // Accept proposed standard

			this.currentRoll = [Math.floor((Math.random()*6)+1), Math.floor((Math.random()*6)+1)].sort().reverse()
			this.awaitedAction = "say"
			this.rollerIndex = this.currentPlayerIndex
			return this.currentRoll
		}
		this.say = function(standardSaid){
			this.standardSaid = standardSaid
			this.awaitedAction = "roll"
			this.currentPlayerIndex += 1
			if (this.currentPlayerIndex>=this.players.length){
				this.currentPlayerIndex = 0
			}
			return this.players[this.currentPlayerIndex]
		}
		this.thereover = function(userIndex){
			this.currentRoll = [Math.floor((Math.random()*6)+1), Math.floor((Math.random()*6)+1)].sort().reverse()
			this.standardSaid = numbers[this.currentRoll[0].toString()][this.currentRoll[1].toString()]
			this.rollerIndex = this.currentPlayerIndex
			this.awaitedAction = "roll"
			this.currentPlayerIndex += 1
			if (this.currentPlayerIndex==this.players.length){
				this.currentPlayerIndex = 0
			}
			return this.players[this.currentPlayerIndex]
		}
		this.lift = function(){
			// Check if a meyer was involved
			this.damage = 1
			if (this.standard === 1 || this.standardSaid === 1 || numbers[this.currentRoll[0].toString()][this.currentRoll[1].toString()] === 1) {
				this.damage += 1
			}
			// Decide who loses
			if (numbers[this.currentRoll[0].toString()][this.currentRoll[1].toString()] != this.standardSaid){
				// Lie, roller loses
				this.players[this.rollerIndex].lives -= this.damage
				this.messageToReturn = `${this.players[this.rollerIndex].tag} lied!\nThey lost ${this.damage} lives.\nThey have ${this.players[this.rollerIndex].lives} lives left.`
			} else if (this.standardSaid > this.standard) {
				// To low, roller loses
				this.players[this.rollerIndex].lives -= this.damage
				// standardSaidName
				if (names[this.standardSaid])
					this.standardSaidName = names[this.standardSaid.toString()]
				else {
					this.standardSaidName = ""
				}
				// standardName
				if (names[this.standard])
					this.standardName = names[this.standard.toString()]
				else {
					this.standardName = ""
				}
				this.messageToReturn = `${rolls[this.standardSaid]} ${this.standardSaidName} is not greater than or equal to ${rolls[this.standard]} ${this.standardName}!\n${this.players[this.rollerIndex].tag} lost ${this.damage} lives.\nThey have ${this.players[this.rollerIndex].lives} lives left.`
			} else {
				// Lifter loses
				this.players[this.currentPlayerIndex].lives -= this.damage
				this.messageToReturn = `${this.players[this.rollerIndex].tag} got ${this.currentRoll}!\n${this.players[this.currentPlayerIndex].tag} lost ${this.damage} lives.\nThey have ${this.players[this.currentPlayerIndex].lives} lives left.`
			}
			this.standard = 21
			this.standardSaid = 21
			return this.messageToReturn
		}
		this.removeDeadPlayers = function(){
			this.deathMessages = []
			this.players.forEach(player => {
				if (player.lives <= 0){
					this.deathMessages.push(`${player.tag} has died!`)
					this.deadPlayerIndex = this.players.indexOf(player);
					if (this.deadPlayerIndex !== -1) {	
						// Make sure a new player is awaited
						if (this,manager.isUserAwaited(this.players[this.deadPlayerIndex].id)){
							this.awaitedAction = "roll"
							this.awaitNewPlayer(this.players[this.deadPlayerIndex])
						}
						// Remove player from manager
						this.manager.removePlayer(this.players[this.deadPlayerIndex].id)
						// Remove from current game
						this.players.splice(this.deadPlayerIndex, 1);
						// Is the game done?
						this.isGameDone()
					}
				}
			})

			return this.deathMessages
		}
		this.isGameDone = function(){
			if (this.players.length == 1){
				this.channel.send(`Congratulations ${this.players[0]}, you won the game!`)
				this.manager.end(this.owner.id)
				return true
			}
			else if (this.players.length == 0){
				this.manager.end(this.owner.id)
				return true
			}
			else {
				return false
			}
		}
		this.awaitNewPlayer = function(user){
			this.manager.awaitingUsers[user.id] = this.owner.id
			this.channel.send(`<@${user.id}> it is your turn to ${this.awaitedAction}`)
		}
	}
}