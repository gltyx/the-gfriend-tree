let modInfo = {
	name: "The Element Tree",
	id: "element",
	author: "sleepground123",
	pointsName: "Matter",
	modFiles: ["layers.js", "tree.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (1), // Used for hard resets and new players
	offlineLimit: 0,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.0.7",
	name: "Deuterium Update",
}

let changelog = `<h1>Changelog:</h1><br>
	<h2>v0.0 - Pre-Release Versions</h2><br>
	<h3>v0.0.7 - Deuterium Update</h3><br>
		- Added Deuterium.<br>
	<h3>v0.0.6 - UI Update</h3><br>
		- Upgrade titles are shown.<br>
	<h3>v0.0.5 - Lithium Update</h3><br>
		- Added Lithium.<br>
		- Added 7 new Achievements. (total 35)<br>
	<h3>v0.0.4 - Anti-Inflation Update</h3><br>
		- Significantly nerfed 2nd Helium Upgrade.<br>
		- 1st Helium Upgrade's softcap is lower, but the effect reaches the softcap faster.<br>
	<h3>v0.0.3 - Achievement Update</h3><br>
		- Added 28 Achievements.<br>
	<h3>v0.0.2 - Helium Update</h3><br>
		- Added Helium.<br>
	<h3>v0.0.1 - Hydrogen Update</h3><br>
		- Added Hydrogen.<br>`

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)
	let gain = new Decimal(0)
	if (hasUpgrade("H", 11)) gain = gain.add(0.1)
	if (hasUpgrade("H", 12)) gain = gain.times(upgradeEffect("H", 12))
	if (hasUpgrade("H", 14)) gain = gain.times(upgradeEffect("H", 14))
	if (player["He"].unlocked) gain = gain.times(tmp["He"].effect)
	if (hasUpgrade("He", 13)) gain = gain.times(upgradeEffect("He", 13))
	if (hasMilestone("He", 1)) gain = gain.times(player["Ach"].points.div(5).add(1))
	if (player["Li"].unlocked) gain = gain.times(tmp["Li"].effect)
	if (hasUpgrade("Li", 13)) gain = gain.times(upgradeEffect("Li", 13))
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
	"Layers are reset along branches."
]

var backgroundStyle = {

}

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte(new Decimal("e19951207"))
}



// Less important things beyond this point!

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(300) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}