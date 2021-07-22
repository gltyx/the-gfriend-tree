let modInfo = {
	name: "The GFRIEND Tree",
	id: "gfriendforever",
	author: "sleepground123",
	pointsName: "Popularity",
	modFiles: ["layers.js", "tree.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (1), // Used for hard resets and new players
	offlineLimit: 0,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.23",
	name: "More Achievements Update",
}

let changelog = `<h1>Changelog:</h1><br><br>
	<h2>v0.2x - Classic Era</h2><br><br>
	<h3>v0.23 - More Achievements Update</h3> (07/22/21 +61)<br>
		- Added 7 more achievements due to the complaints from players.<br><br>
	<h3>v0.22 - Albums Update</h3> (07/22/21 +61)<br>
		- Added albums.<br>
		- Added 3 more Streaming upgrades.<br>
		- Money buyable costs are greatly increased after 500 levels.<br>
		- Endgame is at 1e182 Money and 8 GFRIEND songs.<br><br>
	<h3>v0.21 - Achievements Update</h3> (07/21/21 +60)<br>
		- Added achievements because why not?<br>
		- Added one more Streaming upgrade.<br>
		- Added separate toggles for autobuying each of Money buyables.<br>
		- Endgame is at 1e116 Money and 6 GFRIEND songs.<br><br>
	<h3>v0.20 - Initial Release</h3> (07/21/21 +60)<br>
		- Added contents up to Re-debut and Streaming.<br>
		- Added story lines.<br>
		- Endgame is at 1e100 Money and 5 GFRIEND songs.<br>`

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return hasUpgrade('money', 12)
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints()) return new Decimal(0)
	let gain = new Decimal(0.05)
	if (hasUpgrade('g', 25)) gain = gain.times(upgradeEffect('g', 25))
	if (hasUpgrade('money', 14)) gain = gain.times(upgradeEffect('money', 14))
	if (hasUpgrade('money', 15)) gain = gain.times(upgradeEffect('money', 15))
	if (hasUpgrade('money', 21) && gain.gt(1)) gain = gain.pow(upgradeEffect('money', 21))
	gain = gain.times(buyableEffect('money', 11))
	gain = gain.times(buyableEffect('money', 12))
	if (player.g.unlocked) gain = gain.times(tmp.g.effect)
	if (hasUpgrade('g', 13)) gain = gain.times(upgradeEffect('g', 13))
	if (hasUpgrade('g', 14)) gain = gain.times(upgradeEffect('g', 14))
	if (hasUpgrade('g', 31)) gain = gain.times(upgradeEffect('g', 31))
	if (hasMilestone('g', 3)) gain = gain.times(player.g.salesEffect)
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// GFRIEND Disbandment Clock
const zeroTime = 1621609200000 // 2021/05/22 00:00:00
const perDay = 86400000 // milliseconds per day

// Calculate the # of days since disbandment
function calculateDay() {
	let time = Date.now()
	time = time - zeroTime
	time = Math.floor(time / perDay)
	return time
}

function formatDay() {
	let time = calculateDay()
	return "GFRIEND Disbandment D+"+time
}

// Display extra things at the top of the page
var displayThings = [
	formatDay(),
	"Current Endgame: 1e182 Money and 8 GFRIEND Songs",
]

// Determines when the game "ends"
function isEndgame() {
	return player.money.points.gte(new Decimal("1e182")) && player.g.points.gte(8)
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(6666)
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}