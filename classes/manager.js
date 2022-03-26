const Game = require('./meyergame.js')
const Queue = require('./gamequeue.js')


module.exports = {
	Manager: function(){
		this.games = {}
		this.queue = {}
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
				this.queue[owner.tag] = new Queue.Queue(owner)
				return `Queue started!\nType "/join ${owner.tag}" to join.`
			} else {
				return "You are already in a game or queue! Use /leave to leave."
			}
		}
}