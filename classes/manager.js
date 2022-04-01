const Game = require('./meyergame.js')
const Queue = require('./gamequeue.js')


module.exports = {
	Manager: function(){
		this.games = {}
		this.queues = {}
		this.activeUsers = []
		this.awaitingUsers = {}

		this.isUserActive = function(userId){
			for (let i in this.activeUsers){
				if (userId == this.activeUsers[i]) {
					return true
				}
			}
			return false
		}
		this.isUserAwaited = function(userId){
			if (userId in this.awaitingUsers) {
				return true
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
		this.startGame = function(owner, channel){
			if (owner.tag in this.queues) {
				this.games[owner.id] = new Game.Meyer(owner, Object.assign([],this.queues[owner.tag].players), channel) // Object.assign clones the object and not just the reference
				delete this.queues[owner.tag]
				
				this.awaitingUsers[owner.id] = owner.id // Test

				return `Game started succesfully!\n${this.formatPlayerlist(this.games[owner.id].players)}`
			} else {
				return "You are not the owner of an active queue!"
			}
		}
		this.joinQueue = function(user, queueName){
			console.log(queueName)
			if (this.isUserActive(user.id)){
				return "You are already in a game or queue! Use /leave to leave."
			}
			else if (this.queues[queueName]) {
				this.queues[queueName].players.push(user)
				this.activeUsers.push(user.id)
				return `You succesfully joined ${queueName}!\n${this.formatPlayerlist(this.queues[queueName].players)}`
			} else {
				return "This queue does not exist!"
			}
		}
		this.formatPlayerlist = function(playerList){
			console.log(playerList)
			this.tempPlayers = "**Player list:**\n```"
				playerList.forEach(player => {
					this.tempPlayers += `${player.tag}\n`
				});
			this.tempPlayers += "```"
			return this.tempPlayers
		}

	}
}