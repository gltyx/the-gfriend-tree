addLayer("p", {
    name: "prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "GK", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#cc9900",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "gold komacoins", // Name of prestige currency
    baseResource: "komacoins", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
		if (hasUpgrade('p', 22)) mult = mult.times(upgradeEffect('p', 22))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "g", description: "G: Reset for gold komacoins", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
	upgrades: {
		11: {
			name: "Enhancer I",
			description: "Double your komacoin gain.",
			cost: new Decimal(1),
        },
		12: {
			name: "Enhancer II",
			description: "Quadruple your komacoin gain.",
			cost: new Decimal(4),
			unlocked() { return hasUpgrade("p", 11) },
        },
		13: {
			name: "Enhancer III",
			description: "Sextuple your komacoin gain.",
			cost: new Decimal(10),
			unlocked() { return hasUpgrade("p", 12) },
        },
		21: {
			name: "Power",
			description: "Get more komacoins based on your gold komacoins.",
			cost: new Decimal(50),
			effect() {
				return player[this.layer].points.add(2).pow(0.4)
			},
			effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
			unlocked() { return hasUpgrade("p", 13) },
		},
		22: {
			name: "Enricher",
			description: "Get more gold komacoins based on your komacoins.",
			cost: new Decimal(100),
			effect() {
				return player.points.add(2).pow(0.1)
			},
			effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
			unlocked() { return hasUpgrade("p", 21) },
		},
		23: {
			name: "Enhancer Enhancer",
			description: "All upgrades on the first row are twice as powerful.",
			cost: new Decimal(300),
			unlocked() { return hasUpgrade("p", 21) },
        },
    },
    layerShown(){return true},
	doReset(resettingLayer) {
		let keep = [];
		if (hasMilestone("c", 0) && resettingLayer=="c") keep.push("upgrades")
		if (layers[resettingLayer].row > this.row) layerDataReset("p", keep)
	},
})
addLayer("c", {
    name: "cuteness", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "C", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#9966cc",
    requires: new Decimal(1e5), // Can be a function that takes requirement increases into account
    resource: "cuteness", // Name of prestige currency
    baseResource: "komacoins", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 2, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "c", description: "C: Reset for cuteness", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
	milestones: {
		0: {
			requirementDescription: "3 cuteness",
			effectDescription: "Keep gold komacoins upgrades on cuteness reset",
			done() { return player[this.layer].best.gte(3) },
		},
	},
    layerShown(){return true}
})
