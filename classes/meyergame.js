module.exports = {
	Meyer: function(owner, players, channel){
		this.channel = channel
		this.owner = owner
		this.awaitedAction = "roll"

		// Game settings
		this.standard = [0,0]
		this.lives = 6

		this.currentRoll = 0
		
		// Setup
		this.players = []
		this.currentPlayerIndex = 0
		players.forEach(player => {
			this.players.push({id:player.id,tag:player.tag,lives:this.lives})
		})
		this.roll = function(userId){
			this.currentRoll = Math.floor((Math.random()*6)+1)
			this.awaitedAction = "say"
			return this.currentRoll
		}
	}
}