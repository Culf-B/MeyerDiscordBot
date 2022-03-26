const Game = require('./meyergame.js')
const Queue = require('./gamequeue.js')


module.exports = {
	Manager: function(){
		this.games = {}
		this.queues = {}
		this.activeUsers = []
		this.isUserActive = function(userId){
			for (let i in this.activeUsers){
				if (userId == this.activeUsers[i]) {
					return true
				}
			}
			return false
		}
		this.newGame = function(owner){
			if (!this.isUserActive(owner.id)){
				console.log(this.activeUsers)
				this.activeUsers.push(owner.id)
				this.queues[owner.tag] = new Queue.Queue(owner)
				return `Queue started!\nType "/join ${owner.tag}" to join.`
			} else {
				return "You are already in a game or queue! Use /leave to leave."
			}
		}
		this.startGame = function(players, owner){
			this.games[owner.id] = new Game.Game(players)
		}
		this.joinQueue = function(user, queueName){
			console.log(queueName)
			if (this.isUserActive(user.id)){
				return "You are already in a game or queue! Use /leave to leave."
			}
			else if (this.queues[queueName]) {
				this.queues[queueName].players.push(user)
				this.activeUsers.push(user.id)
				this.tempPlayers = "```"
				this.queues[queueName].players.forEach(player => {
					this.tempPlayers += `${player.tag}\n`
				});
				this.tempPlayers += "```"
				return `You succesfully joined ${queueName}!\nPlayers in this queue:\n${this.tempPlayers}`
			} else {
				return "This queue does not exist!"
			}
		}

	}
}