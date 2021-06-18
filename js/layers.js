addLayer("H", {
    name: "Hydrogen", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "H", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#e0ff00", // Diatomic Nonmetal
    requires() {
		let x = new Decimal(1)
		if (hasMilestone("H", 0)) x = new Decimal(0.1)
		return x
	},
    resource: "Hydrogen", // Name of prestige currency
    baseResource: "Matter", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.7, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
		if (hasUpgrade("H", 13)) mult = mult.times(upgradeEffect("H", 13))
		if (hasUpgrade("H", 15)) mult = mult.times(upgradeEffect("H", 15))
		if (hasUpgrade("He", 11)) mult = mult.times(upgradeEffect("He", 11))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "`", description: "...", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
	upgrades: {
		11: {
			name: "H11",
			description: "Gain 0.1 Matter per second.",
			effect() {
				let x = new Decimal(0.1)
				if (player["He"].unlocked) x = x.times(tmp["He"].effect)
				return x
			},
			effectDisplay() {
				return format(upgradeEffect(this.layer, this.id))+"/s"
			},
			cost: new Decimal(1),
        },
		12: {
			name: "H12",
			description: "Total Hydrogen boosts Matter gain.",
			effect() {
				let power = new Decimal(1)
				let x = player["H"].total.pow(power)
				let sc = new Decimal(100000)
				if (hasMilestone("H", 1)) sc = sc.times(100)
				if (x.gt(sc))
				{
					let y = x.div(sc)
					y = y.pow(0.125)
					x = y.times(sc)
				}
				return x
			},
			effectDisplay() {
				let softcapped = false
				let sc = new Decimal(100000)
				if (hasMilestone("H", 1)) sc = sc.times(100)
				if (upgradeEffect(this.layer, this.id).gt(sc)) softcapped = true
				if (softcapped) { return format(upgradeEffect(this.layer, this.id))+"x (softcapped)" }
				return format(upgradeEffect(this.layer, this.id))+"x"
			},
			unlocked() { return hasUpgrade("H", 11) },
			cost: new Decimal(3),
        },
		13: {
			name: "H13",
			description: "Total Hydrogen boosts Hydrogen gain.",
			effect() {
				let power = new Decimal(0.25)
				let x = player["H"].total.add(1).pow(power)
				let sc = new Decimal(10000000)
				if (x.gt(sc))
				{
					let y = x.div(sc)
					y = y.pow(0.125)
					x = y.times(sc)
				}
				return x
			},
			effectDisplay() {
				let softcapped = false
				let sc = new Decimal(10000000)
				if (upgradeEffect(this.layer, this.id).gt(sc)) softcapped = true
				if (softcapped) { return format(upgradeEffect(this.layer, this.id))+"x (softcapped)" }
				return format(upgradeEffect(this.layer, this.id))+"x"
			},
			unlocked() { return hasUpgrade("H", 12) },
			cost: new Decimal(20),
        },
		14: {
			name: "H14",
			description: "Double Matter gain.",
			effect() {
				let x = new Decimal(2)
				if (hasUpgrade("He", 14)) x = x.pow(upgradeEffect("He", 14))
				return x
			},
			effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
			unlocked() { return hasUpgrade("H", 13) },
			cost: new Decimal(500),
        },
		15: {
			name: "H15",
			description: "Double Hydrogen gain.",
			effect() {
				let x = new Decimal(2)
				if (hasUpgrade("He", 14)) x = x.pow(upgradeEffect("He", 14))
				return x
			},
			effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
			unlocked() { return hasUpgrade("H", 14) },
			cost: new Decimal(3200),
        },
    },
	milestones: {
        0: {
            requirementDescription: "100,000 Hydrogen",
            effectDescription: "Reduce Matter requirement for Hydrogen reset to 0.1.",
            done() { return player["H"].best.gte(100000) }
        },
		1: {
            requirementDescription: "10,000,000 Hydrogen",
            effectDescription: "2nd Hydrogen Upgrade softcap starts 100x later.",
            done() { return player["H"].best.gte(1e7) }
        },
		2: {
            requirementDescription: "1e13 Hydrogen",
            effectDescription: "You permanently keep Hydrogen Milestones.",
            done() { return player["H"].best.gte(1e13) }
        },
		3: {
            requirementDescription: "1e20 Hydrogen",
            effectDescription: "Gain 100% of your Hydrogen gain every second.",
            done() { return player["H"].best.gte(1e20) }
        },
		4: {
            requirementDescription: "1e35 Hydrogen",
            effectDescription: "You permanently keep Hydrogen Upgrades.",
            done() { return player["H"].best.gte(1e35) }
        },
    },
	milestonePopups: false,
    layerShown(){return true},
	passiveGeneration(){return hasMilestone("H", 3)},
	doReset(resettingLayer) {
		let keep = []
		if (hasMilestone("H", 2)) keep.push("milestones")
		if (hasMilestone("H", 4)) keep.push("upgrades")
		if (layers[resettingLayer].row > this.row) layerDataReset("H", keep)
	},
})
addLayer("He", {
    name: "Helium", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "He", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#00ffff", // Noble Gas
    requires() {
		let x = new Decimal(5e9)
		if (hasMilestone("He", 0)) x = new Decimal(1e9)
		return x
	},
	effect() {
        if (!player["He"].unlocked) return new Decimal(1)
        let x = new Decimal(1)
		let power = new Decimal(2)
		if (hasUpgrade("He", 12)) power = power.add(upgradeEffect("He", 12))
        x = x.times(player["He"].total.add(1).pow(power))
        return x
    },
    effectDescription() {
		let desc = "which boosts Matter gain by <h2 style='color:" + this.color + "; text-shadow:" + this.color + " 0px 0px 10px'>" + format(this.effect()) + "x</h2> based on the total amount."
        return desc
    },
	branches: ["H"],
    resource: "Helium", // Name of prestige currency
    baseResource: "Hydrogen", // Name of resource prestige is based on
    baseAmount() {return player["H"].points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.35, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
	upgrades: {
		11: {
			name: "He-H",
			description: "Helium also boosts Hydrogen gain.",
			effect() {
				let power = new Decimal(0.125)
				let x = player["He"].total.add(1).pow(power)
				let sc = new Decimal(1e14)
				if (x.gt(sc))
				{
					let y = x.div(sc)
					y = y.pow(0.125)
					x = y.times(sc)
				}
				return x
			},
			effectDisplay() {
				let softcapped = false
				let sc = new Decimal(1e14)
				if (upgradeEffect(this.layer, this.id).gt(sc)) softcapped = true
				if (softcapped) { return format(upgradeEffect(this.layer, this.id))+"x (softcapped)" }
				return format(upgradeEffect(this.layer, this.id))+"x"
			},
			unlocked() { return true },
			cost: new Decimal(3),
        },
		12: {
			name: "He Enhancement",
			description: "Helium boost power is increased by 0.125.",
			effect() {
				let x = new Decimal(0.125)
				if (hasMilestone("He", 1)) x = x.add(0.075)
				return x
			},
			effectDisplay() { return "+"+format(upgradeEffect(this.layer, this.id))+" to power" },
			unlocked() { return hasUpgrade("He", 11) },
			cost: new Decimal(10),
        },
		13: {
			name: "Matter Boost",
			description: "Helium boosts Matter gain.",
			effect() {
				let x = new Decimal(10)
				let power = new Decimal(0.1)
				x = x.times(player["He"].total.add(1).pow(power))
				return x
			},
			effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
			unlocked() { return hasUpgrade("He", 12) },
			cost: new Decimal(250),
        },
		14: {
			name: "H Upgrade Boost",
			description: "4th and 5th Hydrogen upgrades are stronger based on the number of Elements unlocked.",
			effect() {
				let x = new Decimal(1)
				if (player["He"].unlocked) x = x.add(6)
				return x
			},
			effectDisplay() { return "^"+format(upgradeEffect(this.layer, this.id)) },
			unlocked() { return hasUpgrade("He", 13) },
			cost: new Decimal(2500),
        },
    },
	milestones: {
        0: {
            requirementDescription: "200,000 Helium",
            effectDescription: "Divide Hydrogen requirement for Helium reset by 5.",
            done() { return player["He"].best.gte(200000) }
        },
		1: {
            requirementDescription: "30,000,000 Helium",
            effectDescription: "2nd Helium Upgrade is 1.6x as powerful.",
            done() { return player["He"].best.gte(3e7) }
        },
		2: {
            requirementDescription: "4e13 Helium",
            effectDescription: "You permanently keep Helium Milestones.",
            done() { return player["He"].best.gte(4e13) }
        },
		3: {
            requirementDescription: "5e20 Helium",
            effectDescription: "Gain 100% of your Helium gain every second.",
            done() { return player["He"].best.gte(5e20) }
        },
		4: {
            requirementDescription: "6e35 Helium",
            effectDescription: "You permanently keep Helium Upgrades.",
            done() { return player["He"].best.gte(6e35) }
        },
    },
	milestonePopups: false,
    layerShown(){return player["H"].best.gte(1e9) || player["He"].unlocked},
	passiveGeneration(){return hasMilestone("He", 3)},
	doReset(resettingLayer) {
		let keep = [];
		if (hasMilestone("He", 2)) keep.push("milestones")
		if (hasMilestone("He", 4)) keep.push("upgrades")
		if (layers[resettingLayer].row > this.row) layerDataReset("He", keep)
	},
})