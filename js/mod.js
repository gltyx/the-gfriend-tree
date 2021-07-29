let modInfo = {
	name: "The GFRIEND Tree",
	id: "gfriendforever",
	author: "sleepground123",
	pointsName: "Popularity",
	modFiles: ["tree.js", "changelog.js", "layers/ach.js", "layers/story.js", "layers/money.js", "layers/g.js", "layers/f.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (1), // Used for hard resets and new players
	offlineLimit: 0,  // In hours
}

let VERSION = {
	num: "0.26",
	name: "Fans Update Part 2",
}

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
	if (hasUpgrade('g', 32)) gain = gain.times(upgradeEffect('g', 32))
	if (hasUpgrade('g', 33)) gain = gain.times(upgradeEffect('g', 33))
	if (hasUpgrade('g', 34)) gain = gain.times(upgradeEffect('g', 34))
	if (hasUpgrade('g', 35)) gain = gain.times(upgradeEffect('g', 35))
	if (hasMilestone('g', 3)) gain = gain.times(player.g.salesEffect)
	if (player.f.unlocked) gain = gain.times(tmp.f.effect)
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
	"Current Endgame: 3.16e618 Money and 10,000,000 Fans",
]

// Determines when the game "ends"
function isEndgame() {
	return player.money.points.gte(new Decimal("3.16e618")) && player.f.points.gte(1e7)
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(1000)
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}