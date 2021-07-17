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
		if (hasUpgrade("Li", 11)) mult = mult.times(upgradeEffect("Li", 11))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
		let exp = new Decimal(1)
		if (player["D"].unlocked) exp = exp.times(tmp["D"].effect)
        return exp
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
	upgrades: {
		11: {
			name: "H11",
			title: "Start",
			description: "Gain 0.1 Matter per second.",
			effect() {
				let x = new Decimal(0.1)
				if (player["He"].unlocked) x = x.times(tmp["He"].effect)
				if (player["Li"].unlocked) x = x.times(tmp["Li"].effect)
				return x
			},
			effectDisplay() {
				return format(upgradeEffect(this.layer, this.id))+"/s"
			},
			cost: new Decimal(1),
        },
		12: {
			name: "H12",
			title: "H-Matter Boost",
			description: "Total Hydrogen boosts Matter gain.",
			effect() {
				let power = new Decimal(0.75)
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
			title: "Self Boost",
			description: "Total Hydrogen boosts Hydrogen gain.",
			effect() {
				let power = new Decimal(0.333)
				let x = player["H"].total.add(1).pow(power)
				let sc = new Decimal(100000)
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
				if (upgradeEffect(this.layer, this.id).gt(sc)) softcapped = true
				if (softcapped) { return format(upgradeEffect(this.layer, this.id))+"x (softcapped)" }
				return format(upgradeEffect(this.layer, this.id))+"x"
			},
			unlocked() { return hasUpgrade("H", 12) },
			cost: new Decimal(20),
        },
		14: {
			name: "H14",
			title: "Doubler",
			description: "Double Matter gain.",
			effect() {
				let x = new Decimal(2)
				if (hasUpgrade("He", 14)) x = x.pow(upgradeEffect("He", 14))
				if (hasUpgrade("Li", 14)) x = x.pow(upgradeEffect("Li", 14))
				return x
			},
			effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
			unlocked() { return hasUpgrade("H", 13) },
			cost: new Decimal(500),
        },
		15: {
			name: "H15",
			title: "Doubler II",
			description: "Double Hydrogen gain.",
			effect() {
				let x = new Decimal(2)
				if (hasUpgrade("He", 14)) x = x.pow(upgradeEffect("He", 14))
				if (hasUpgrade("Li", 14)) x = x.pow(upgradeEffect("Li", 14))
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
            effectDescription: "'H-Matter Boost' softcap starts 100x later.",
            done() { return player["H"].best.gte(1e7) }
        },
		2: {
            requirementDescription: "1.00e13 Hydrogen",
            effectDescription: "You permanently keep Hydrogen Milestones.",
            done() { return player["H"].best.gte(1e13) }
        },
		3: {
            requirementDescription: "1.00e25 Hydrogen",
            effectDescription: "Gain 100% of your Hydrogen gain every second.",
            done() { return player["H"].best.gte(1e25) }
        },
		4: {
            requirementDescription: "1.00e45 Hydrogen",
            effectDescription: "You permanently keep Hydrogen Upgrades.",
            done() { return player["H"].best.gte(1e45) }
        },
    },
	milestonePopups: false,
    layerShown(){return true},
	passiveGeneration(){return hasMilestone("H", 3)},
	doReset(resettingLayer) {
		let keep = []
		if (hasMilestone("H", 2)) keep.push("milestones")
		if (hasMilestone("H", 4)) keep.push("upgrades")
		if (layers[resettingLayer].row > this.row || layers[resettingLayer].position > this.position) layerDataReset("H", keep)
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
		let power = new Decimal(1.5)
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
		if (hasUpgrade("Li", 12)) mult = mult.times(upgradeEffect("Li", 12))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
	upgrades: {
		11: {
			name: "He-H",
			title: "He-H Boost",
			description: "Helium also boosts Hydrogen gain.",
			effect() {
				let power = new Decimal(0.75)
				let x = player["He"].total.add(1).pow(power)
				let sc = new Decimal(1e10)
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
				let sc = new Decimal(1e10)
				if (upgradeEffect(this.layer, this.id).gt(sc)) softcapped = true
				if (softcapped) { return format(upgradeEffect(this.layer, this.id))+"x (softcapped)" }
				return format(upgradeEffect(this.layer, this.id))+"x"
			},
			unlocked() { return true },
			cost: new Decimal(3),
        },
		12: {
			name: "He Enhancement",
			title: "He Enhancement",
			description: "Helium boost power is increased by 0.1.",
			effect() {
				let x = new Decimal(0.1)
				return x
			},
			effectDisplay() { return "+"+format(upgradeEffect(this.layer, this.id))+" to power" },
			unlocked() { return hasUpgrade("He", 11) },
			cost: new Decimal(10),
        },
		13: {
			name: "Matter Boost",
			title: "He-Matter Boost",
			description: "Helium boosts Matter gain.",
			effect() {
				let x = new Decimal(10)
				let power = new Decimal(0.1)
				x = x.times(player["He"].total.add(1).pow(power))
				return x
			},
			effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
			unlocked() { return hasUpgrade("He", 12) },
			cost: new Decimal(80),
        },
		14: {
			name: "H Upgrade Boost",
			title: "Power Boost",
			description: "'Doubler' and 'Doubler II' are stronger based on the number of Elements unlocked.",
			effect() {
				let x = new Decimal(1)
				if (player["He"].unlocked) x = x.add(2)
				if (player["Li"].unlocked) x = x.add(3)
				return x
			},
			effectDisplay() { return "^"+format(upgradeEffect(this.layer, this.id)) },
			unlocked() { return hasUpgrade("He", 13) },
			cost: new Decimal(2000),
        },
    },
	milestones: {
        0: {
            requirementDescription: "100,000 Helium",
            effectDescription: "Divide Hydrogen requirement for Helium reset by 5.",
            done() { return player["He"].best.gte(100000) }
        },
		1: {
            requirementDescription: "30,000,000 Helium",
            effectDescription: "Achievement Points boost Matter gain.",
            done() { return player["He"].best.gte(3e7) }
        },
		2: {
            requirementDescription: "5.00e13 Helium",
            effectDescription: "You permanently keep Helium Milestones.",
            done() { return player["He"].best.gte(5e13) }
        },
		3: {
            requirementDescription: "7.00e25 Helium",
            effectDescription: "Gain 100% of your Helium gain every second.",
            done() { return player["He"].best.gte(7e25) }
        },
		4: {
            requirementDescription: "1.10e46 Helium",
            effectDescription: "You permanently keep Helium Upgrades.",
            done() { return player["He"].best.gte(1.1e46) }
        },
    },
	milestonePopups: false,
    layerShown(){return player["H"].best.gte(1e9) || player["He"].unlocked},
	passiveGeneration(){return hasMilestone("He", 3)},
	doReset(resettingLayer) {
		let keep = [];
		if (hasMilestone("He", 2)) keep.push("milestones")
		if (hasMilestone("He", 4)) keep.push("upgrades")
		if (layers[resettingLayer].row > this.row || layers[resettingLayer].position > this.position) layerDataReset("He", keep)
	},
})
addLayer("Li", {
    name: "Lithium", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "Li", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#ff4040", // Alkali Metal
    requires() {
		let x = new Decimal(2e10)
		if (hasMilestone("Li", 0)) x = new Decimal(5e9)
		return x
	},
	effect() {
        if (!player["Li"].unlocked) return new Decimal(1)
        let x = new Decimal(10)
		let power = new Decimal(4.5)
        x = x.times(player["Li"].total.add(1).pow(power))
        return x
    },
    effectDescription() {
		let desc = "which boosts Matter gain by <h2 style='color:" + this.color + "; text-shadow:" + this.color + " 0px 0px 10px'>" + format(this.effect()) + "x</h2> based on the total amount."
        return desc
    },
	branches: ["He"],
    resource: "Lithium", // Name of prestige currency
    baseResource: "Helium", // Name of resource prestige is based on
    baseAmount() {return player["He"].points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.2333, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
	upgrades: {
		11: {
			name: "Li-H",
			title: "Li-H Boost",
			description: "Lithium also boosts Hydrogen gain.",
			effect() {
				let power = new Decimal(2)
				let x = player["Li"].total.add(1).pow(power).times(100)
				let sc = new Decimal(1e40)
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
				let sc = new Decimal(1e40)
				if (upgradeEffect(this.layer, this.id).gt(sc)) softcapped = true
				if (softcapped) { return format(upgradeEffect(this.layer, this.id))+"x (softcapped)" }
				return format(upgradeEffect(this.layer, this.id))+"x"
			},
			unlocked() { return true },
			cost: new Decimal(5),
        },
		12: {
			name: "Li-He",
			title: "Li-He Boost",
			description: "Lithium also boosts Helium gain.",
			effect() {
				let power = new Decimal(0.75)
				let x = player["Li"].total.add(1).pow(power)
				let sc = new Decimal(1e10)
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
				let sc = new Decimal(1e10)
				if (upgradeEffect(this.layer, this.id).gt(sc)) softcapped = true
				if (softcapped) { return format(upgradeEffect(this.layer, this.id))+"x (softcapped)" }
				return format(upgradeEffect(this.layer, this.id))+"x"
			},
			unlocked() { return hasUpgrade("Li", 11) },
			cost: new Decimal(30),
        },
		13: {
			name: "Li Matter Boost",
			title: "Li-Matter Boost",
			description: "Lithium boosts Matter gain.",
			effect() {
				let x = new Decimal(100)
				let power = new Decimal(0.2)
				x = x.times(player["Li"].total.add(1).pow(power))
				return x
			},
			effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
			unlocked() { return hasUpgrade("Li", 12) },
			cost: new Decimal(320),
        },
		14: {
			name: "H Upgrade Boost 2",
			title: "Power Boost II",
			description: "'Doubler' and 'Doubler II' are stronger based on Achievement Points.",
			effect() {
				let x = new Decimal(1)
				let per = new Decimal(0.005)
				if (hasMilestone("Li", 1)) per = per.times(1.2)
				x = x.add(player["Ach"].points.times(per))
				return x
			},
			effectDisplay() { return "^"+format(upgradeEffect(this.layer, this.id)) },
			unlocked() { return hasUpgrade("Li", 13) },
			cost: new Decimal(10000),
        },
    },
	milestones: {
        0: {
            requirementDescription: "100,000 Lithium",
            effectDescription: "Divide Helium requirement for Lithium reset by 4.",
            done() { return player["Li"].best.gte(100000) }
        },
		1: {
            requirementDescription: "90,000,000 Lithium",
            effectDescription: "'Power Boost II' is 20% more powerful.",
            done() { return player["Li"].best.gte(9e7) }
        },
		2: {
            requirementDescription: "2.50e14 Lithium",
            effectDescription: "You permanently keep Lithium Milestones.",
            done() { return player["Li"].best.gte(2.5e13) }
        },
		3: {
            requirementDescription: "4.90e26 Lithium",
            effectDescription: "Gain 100% of your Lithium gain every second.",
            done() { return player["Li"].best.gte(4.9e26) }
        },
		4: {
            requirementDescription: "1.21e47 Lithium",
            effectDescription: "You permanently keep Lithium Upgrades.",
            done() { return player["Li"].best.gte(1.21e47) }
        },
    },
	milestonePopups: false,
    layerShown(){return player["He"].best.gte(4e9) || player["Li"].unlocked},
	passiveGeneration(){return hasMilestone("Li", 3)},
	doReset(resettingLayer) {
		let keep = [];
		if (hasMilestone("Li", 2)) keep.push("milestones")
		if (hasMilestone("Li", 4)) keep.push("upgrades")
		if (layers[resettingLayer].row > this.row || layers[resettingLayer].position > this.position) layerDataReset("Li", keep)
	},
})
addLayer("D", {
    name: "Deuterium", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "D", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: -1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#c0e000",
    requires() {
		let x = new Decimal(1e40)
		return x
	},
	effect() {
        if (!player["D"].unlocked) return new Decimal(1)
        let x = new Decimal(1)
		let power = new Decimal(0.05)
        x = x.add(player["D"].total.times(power))
        return x
    },
    effectDescription() {
		let desc = "which raises Hydrogen gain <h2 style='color:" + this.color + "; text-shadow:" + this.color + " 0px 0px 10px'>^" + format(this.effect()) + "</h2>."
        return desc
    },
	branches: ["H"],
    resource: "Deuterium", // Name of prestige currency
    baseResource: "Hydrogen", // Name of resource prestige is based on
    baseAmount() {return player["H"].points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 3, // Prestige currency exponent
	base: 1e5,
	canBuyMax() {return false},
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
	milestones: {
        0: {
            requirementDescription: "10 Deuterium", // e283 Hydrogen
            effectDescription: "Does nothing.",
            done() { return player["D"].points.gte(10) }
        },
    },
	milestonePopups: false,
    layerShown(){return hasMilestone("Ach", 0)},
	passiveGeneration(){return false},
	doReset(resettingLayer) {
	},
})
addLayer("Ach", {
    name: "Achievement Points", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "Ach", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#ffcc00",
    resource: "Achievement Points", // Name of prestige currency
    row: "side", // Row the layer is in on the tree (0 is the first row)
	tabFormat: {
		"Achievements": {
			content: [
				"main-display",
				"achievements",
			],
		},
		"Milestones": {
			content: [
				"main-display",
				"milestones",
			],
		},
	},
	milestones: {
        0: {
            requirementDescription: "80 Achievement Points",
            effectDescription: "Unlock Deuterium under Hydrogen.",
            done() { return player["Ach"].points.gte(80) }
        },
    },
	achievements: {
		11: {
			name: "First Creation",
			tooltip() {
				if (hasAchievement(this.layer, this.id)) return "Create 1 Hydrogen. Reward: 2 AP."
				return "Create 1 Hydrogen. Reward: 2 AP. Currently: "+player["H"].total+"/1"
			},
			done() { return player["H"].total.gte(1) },
			onComplete() {player["Ach"].points = player["Ach"].points.add(2)},
		},
		12: {
			name: "Quadratic Growth",
			tooltip() {
				if (hasAchievement(this.layer, this.id)) return "Buy 2 Hydrogen Upgrades. Reward: 2 AP."
				if (hasUpgrade("H", 11)) return "Buy 2 Hydrogen Upgrades. Reward: 2 AP. Currently: 1/2"
				return "Buy 2 Hydrogen Upgrades. Reward: 2 AP. Currently: 0/2"
			},
			done() { return hasUpgrade("H", 12) },
			onComplete() {player["Ach"].points = player["Ach"].points.add(2)},
		},
		13: {
			name: "Self Boost",
			tooltip() {
				if (hasAchievement(this.layer, this.id)) return "Buy 3 Hydrogen Upgrades. Reward: 2 AP."
				if (hasUpgrade("H", 12)) return "Buy 3 Hydrogen Upgrades. Reward: 2 AP. Currently: 2/3"
				if (hasUpgrade("H", 11)) return "Buy 3 Hydrogen Upgrades. Reward: 2 AP. Currently: 1/3"
				return "Buy 3 Hydrogen Upgrades. Reward: 2 AP. Currently: 0/3"
			},
			done() { return hasUpgrade("H", 13) },
			onComplete() {player["Ach"].points = player["Ach"].points.add(2)},
		},
		14: {
			name: "Five Hundred is A Lot",
			tooltip() {
				if (hasAchievement(this.layer, this.id)) return "Buy 4 Hydrogen Upgrades. Reward: 2 AP."
				if (hasUpgrade("H", 13)) return "Buy 4 Hydrogen Upgrades. Reward: 2 AP. Currently: 3/4"
				if (hasUpgrade("H", 12)) return "Buy 4 Hydrogen Upgrades. Reward: 2 AP. Currently: 2/4"
				if (hasUpgrade("H", 11)) return "Buy 4 Hydrogen Upgrades. Reward: 2 AP. Currently: 1/4"
				return "Buy 4 Hydrogen Upgrades. Reward: 2 AP. Currently: 0/4"
			},
			done() { return hasUpgrade("H", 14) },
			onComplete() {player["Ach"].points = player["Ach"].points.add(2)},
		},
		15: {
			name: "We Couldn't Afford 6",
			tooltip() {
				if (hasAchievement(this.layer, this.id)) return "Buy 5 Hydrogen Upgrades. Reward: 2 AP."
				if (hasUpgrade("H", 14)) return "Buy 5 Hydrogen Upgrades. Reward: 2 AP. Currently: 4/5"
				if (hasUpgrade("H", 13)) return "Buy 5 Hydrogen Upgrades. Reward: 2 AP. Currently: 3/5"
				if (hasUpgrade("H", 12)) return "Buy 5 Hydrogen Upgrades. Reward: 2 AP. Currently: 2/5"
				if (hasUpgrade("H", 11)) return "Buy 5 Hydrogen Upgrades. Reward: 2 AP. Currently: 1/5"
				return "Buy 5 Hydrogen Upgrades. Reward: 2 AP. Currently: 0/5"
			},
			done() { return hasUpgrade("H", 15) },
			onComplete() {player["Ach"].points = player["Ach"].points.add(2)},
		},
		16: {
			name: "This Isn't Matter Dimensions",
			tooltip() {
				if (hasAchievement(this.layer, this.id)) return "Generate 5,000 Matter. Reward: 2 AP."
				return "Generate 5,000 Matter. Reward: 2 AP. Currently: "+format(player.points)+"/5,000"
			},
			done() { return player.points.gte(5000) },
			onComplete() {player["Ach"].points = player["Ach"].points.add(2)},
		},
		17: {
			name: "H10000",
			tooltip() {
				if (hasAchievement(this.layer, this.id)) return "Create 10,000 Hydrogen. Reward: 2 AP."
				return "Create 10,000 Hydrogen. Reward: 2 AP. Currently: "+format(player["H"].total)+"/10,000"
			},
			done() { return player["H"].total.gte(10000) },
			onComplete() {player["Ach"].points = player["Ach"].points.add(2)},
		},
		21: {
			name: "1,609 Meters",
			tooltip() {
				if (hasAchievement(this.layer, this.id)) return "Get the first Hydrogen Milestone. Reward: 3 AP."
				return "Get the first Hydrogen Milestone. Reward: 3 AP. Currently: 0/1"
			},
			done() { return hasMilestone("H", 0) },
			onComplete() {player["Ach"].points = player["Ach"].points.add(3)},
		},
		22: {
			name: "Hydrogen Millionaire",
			tooltip() {
				if (hasAchievement(this.layer, this.id)) return "Create 1,000,000 Hydrogen. Reward: 3 AP."
				return "Create 1,000,000 Hydrogen. Reward: 3 AP. Currently: "+format(player["H"].total)+"/1,000,000"
			},
			done() { return player["H"].total.gte(1e6) },
			onComplete() {player["Ach"].points = player["Ach"].points.add(3)},
		},
		23: {
			name: "3,218 Meters",
			tooltip() {
				if (hasAchievement(this.layer, this.id)) return "Get the second Hydrogen Milestone. Reward: 3 AP."
				if (hasMilestone("H", 0)) return "Get the second Hydrogen Milestone. Reward: 3 AP. Currently: 1/2"
				return "Get the second Hydrogen Milestone. Reward: 3 AP. Currently: 0/2"
			},
			done() { return hasMilestone("H", 1) },
			onComplete() {player["Ach"].points = player["Ach"].points.add(3)},
		},
		24: {
			name: "I Told You, This Isn't Matter Dimensions",
			tooltip() {
				if (hasAchievement(this.layer, this.id)) return "Generate 10,000,000 Matter. Reward: 3 AP."
				return "Generate 10,000,000 Matter. Reward: 3 AP. Currently: "+format(player.points)+"/10,000,000"
			},
			done() { return player.points.gte(1e7) },
			onComplete() {player["Ach"].points = player["Ach"].points.add(3)},
		},
		25: {
			name: "Hydrogen Billionaire",
			tooltip() {
				if (hasAchievement(this.layer, this.id)) return "Create 1.00e9 Hydrogen. Reward: 3 AP."
				return "Create 1.00e9 Hydrogen. Reward: 3 AP. Currently: "+format(player["H"].total)+"/1.00e9"
			},
			done() { return player["H"].total.gte(1e9) },
			onComplete() {player["Ach"].points = player["Ach"].points.add(3)},
		},
		26: {
			name: "Next Level",
			tooltip() {
				if (hasAchievement(this.layer, this.id)) return "Create 5.00e9 Hydrogen to unlock the next layer. Reward: 3 AP."
				return "Create 5.00e9 Hydrogen to unlock the next layer. Reward: 3 AP. Currently: "+format(player["H"].total)+"/5.00e9"
			},
			done() { return player["H"].total.gte(5e9) },
			onComplete() {player["Ach"].points = player["Ach"].points.add(3)},
		},
		27: {
			name: "1s²",
			tooltip() {
				if (hasAchievement(this.layer, this.id)) return "Unlock Helium. Reward: 3 AP."
				return "Unlock Helium. Reward: 3 AP. Currently: "+player["He"].total+"/1"
			},
			done() { return player["He"].total.gte(1) },
			onComplete() {player["Ach"].points = player["Ach"].points.add(3)},
		},
		31: {
			name: "Do I Have to Do That Again?!",
			tooltip() {
				if (hasAchievement(this.layer, this.id)) return "Create 2 Helium. Reward: 4 AP."
				return "Create 2 Helium. Reward: 4 AP. Currently: "+player["He"].total+"/2"
			},
			done() { return player["He"].total.gte(2) },
			onComplete() {player["Ach"].points = player["Ach"].points.add(4)},
		},
		32: {
			name: "Hydrogen Production is OP Now",
			tooltip() {
				if (hasAchievement(this.layer, this.id)) return "Buy a Helium Upgrade. Reward: 4 AP."
				return "Buy a Helium Upgrade. Reward: 4 AP. Currently: 0/1"
			},
			done() { return hasUpgrade("He", 11) },
			onComplete() {player["Ach"].points = player["Ach"].points.add(4)},
		},
		33: {
			name: "Helium is Still Not So OP",
			tooltip() {
				if (hasAchievement(this.layer, this.id)) return "Buy 2 Helium Upgrades. Reward: 4 AP."
				if (hasUpgrade("He", 11)) return "Buy 2 Helium Upgrades. Reward: 4 AP. Currently: 1/2"
				return "Buy 2 Helium Upgrades. Reward: 4 AP. Currently: 0/2"
			},
			done() { return hasUpgrade("He", 12) },
			onComplete() {player["Ach"].points = player["Ach"].points.add(4)},
		},
		34: {
			name: "One Hundred is A Lot",
			tooltip() {
				if (hasAchievement(this.layer, this.id)) return "Create 100 Helium. Reward: 4 AP."
				return "Create 100 Helium. Reward: 4 AP. Currently: "+player["He"].total+"/100"
			},
			done() { return player["He"].total.gte(100) },
			onComplete() {player["Ach"].points = player["Ach"].points.add(4)},
		},
		35: {
			name: "Collection",
			tooltip() {
				if (hasAchievement(this.layer, this.id)) return "Buy all Helium Upgrades. Reward: 4 AP."
				if (hasUpgrade("He", 13)) return "Buy all Helium Upgrades. Reward: 4 AP. Currently: 3/4"
				if (hasUpgrade("He", 12)) return "Buy all Helium Upgrades. Reward: 4 AP. Currently: 2/4"
				if (hasUpgrade("He", 11)) return "Buy all Helium Upgrades. Reward: 4 AP. Currently: 1/4"
				return "Buy all Helium Upgrades. Reward: 4 AP. Currently: 0/4"
			},
			done() { return hasUpgrade("He", 14) },
			onComplete() {player["Ach"].points = player["Ach"].points.add(4)},
		},
		36: {
			name: "4,828 Meters",
			tooltip() {
				if (hasAchievement(this.layer, this.id)) return "Get the third Hydrogen Milestone. Reward: 4 AP."
				if (hasMilestone("H", 1)) return "Get the second Hydrogen Milestone. Reward: 4 AP. Currently: 2/3"
				if (hasMilestone("H", 0)) return "Get the second Hydrogen Milestone. Reward: 4 AP. Currently: 1/3"
				return "Get the third Hydrogen Milestone. Reward: 4 AP. Currently: 0/3"
			},
			done() { return hasMilestone("H", 2) },
			onComplete() {player["Ach"].points = player["Ach"].points.add(4)},
		},
		37: {
			name: "1,609 Meters Again",
			tooltip() {
				if (hasAchievement(this.layer, this.id)) return "Get the first Helium Milestone. Reward: 4 AP."
				return "Get the first Helium Milestone. Reward: 4 AP. Currently: 0/1"
			},
			done() { return hasMilestone("He", 0) },
			onComplete() {player["Ach"].points = player["Ach"].points.add(4)},
		},
		41: {
			name: "Helium Millionaire",
			tooltip() {
				if (hasAchievement(this.layer, this.id)) return "Create 1,000,000 Helium. Reward: 5 AP."
				return "Create 1,000,000 Helium. Reward: 5 AP. Currently: "+format(player["He"].total)+"/1,000,000"
			},
			done() { return player["He"].total.gte(1e6) },
			onComplete() {player["Ach"].points = player["Ach"].points.add(5)},
		},
		42: {
			name: "This Won't be Matter Dimensions",
			tooltip() {
				if (hasAchievement(this.layer, this.id)) return "Generate 1.00e28 Matter. Reward: 5 AP."
				return "Generate 1.00e28 Matter. Reward: 5 AP. Currently: "+format(player.points)+"/1.00e28"
			},
			done() { return player.points.gte(1e28) },
			onComplete() {player["Ach"].points = player["Ach"].points.add(5)},
		},
		43: {
			name: "3,218 Meters Again",
			tooltip() {
				if (hasAchievement(this.layer, this.id)) return "Get the second Helium Milestone. Reward: 5 AP."
				if (hasMilestone("He", 0)) return "Get the second Helium Milestone. Reward: 5 AP. Currently: 1/2"
				return "Get the second Helium Milestone. Reward: 5 AP. Currently: 0/2"
			},
			done() { return hasMilestone("He", 1) },
			onComplete() {player["Ach"].points = player["Ach"].points.add(5)},
		},
		44: {
			name: "Floating Hydrogen",
			tooltip() {
				if (hasAchievement(this.layer, this.id)) return "Create 3.40e38 Hydrogen. Reward: 5 AP."
				return "Create 3.40e38 Hydrogen. Reward: 5 AP. Currently: "+format(player["H"].total)+"/3.40e38"
			},
			done() { return player["H"].total.gte(3.4028e38) },
			onComplete() {player["Ach"].points = player["Ach"].points.add(5)},
		},
		45: {
			name: "Helium Billionaire",
			tooltip() {
				if (hasAchievement(this.layer, this.id)) return "Create 1.00e9 Helium. Reward: 5 AP."
				return "Create 1.00e9 Helium. Reward: 5 AP. Currently: "+format(player["He"].total)+"/1.00e9"
			},
			done() { return player["He"].total.gte(1e9) },
			onComplete() {player["Ach"].points = player["Ach"].points.add(5)},
		},
		46: {
			name: "8,046 Meters",
			tooltip() {
				if (hasAchievement(this.layer, this.id)) return "Get all Hydrogen Milestones. Reward: 5 AP."
				if (hasMilestone("H", 3)) return "Get all Hydrogen Milestones. Reward: 5 AP. Currently: 4/5"
				if (hasMilestone("H", 2)) return "Get all Hydrogen Milestones. Reward: 5 AP. Currently: 3/5"
				if (hasMilestone("H", 1)) return "Get all Hydrogen Milestones. Reward: 5 AP. Currently: 2/5"
				if (hasMilestone("H", 0)) return "Get all Hydrogen Milestones. Reward: 5 AP. Currently: 1/5"
				return "Get all Hydrogen Milestones. Reward: 5 AP. Currently: 0/5"
			},
			done() { return hasMilestone("H", 4) },
			onComplete() {player["Ach"].points = player["Ach"].points.add(5)},
		},
		47: {
			name: "1s²2s",
			tooltip() {
				if (hasAchievement(this.layer, this.id)) return "Unlock Lithium. Reward: 5 AP."
				return "Unlock Lithium. Reward: 5 AP. Currently: "+player["Li"].total+"/1"
			},
			done() { return player["Li"].total.gte(1) },
			onComplete() {player["Ach"].points = player["Ach"].points.add(5)},
		},
		51: {
			name: "3x3=9",
			tooltip() {
				if (hasAchievement(this.layer, this.id)) return "Create 3 Lithium. Reward: 6 AP."
				return "Create 3 Lithium. Reward: 6 AP. Currently: "+player["Li"].total+"/3"
			},
			done() { return player["Li"].total.gte(3) },
			onComplete() {player["Ach"].points = player["Ach"].points.add(6)},
		},
		52: {
			name: "It's Hydrogen Again?",
			tooltip() {
				if (hasAchievement(this.layer, this.id)) return "Buy a Lithium Upgrade. Reward: 6 AP."
				return "Buy a Lithium Upgrade. Reward: 6 AP. Currently: 0/1"
			},
			done() { return hasUpgrade("Li", 11) },
			onComplete() {player["Ach"].points = player["Ach"].points.add(6)},
		},
		53: {
			name: "It's Helium Again?",
			tooltip() {
				if (hasAchievement(this.layer, this.id)) return "Buy 2 Lithium Upgrades. Reward: 6 AP."
				if (hasUpgrade("Li", 11)) return "Buy 2 Lithium Upgrades. Reward: 6 AP. Currently: 1/2"
				return "Buy 2 Lithium Upgrades. Reward: 6 AP. Currently: 0/2"
			},
			done() { return hasUpgrade("Li", 12) },
			onComplete() {player["Ach"].points = player["Ach"].points.add(6)},
		},
		54: {
			name: "Long Helium",
			tooltip() {
				if (hasAchievement(this.layer, this.id)) return "Create 1.84e19 Helium. Reward: 6 AP."
				return "Create 1.84e19 Helium. Reward: 6 AP. Currently: "+format(player["He"].total)+"/1.84e19"
			},
			done() { return player["He"].total.gte(1.8447e19) },
			onComplete() {player["Ach"].points = player["Ach"].points.add(6)},
		},
		55: {
			name: "Assortment",
			tooltip() {
				if (hasAchievement(this.layer, this.id)) return "Buy all Lithium Upgrades. Reward: 6 AP."
				if (hasUpgrade("Li", 13)) return "Buy all Lithium Upgrades. Reward: 6 AP. Currently: 3/4"
				if (hasUpgrade("Li", 12)) return "Buy all Lithium Upgrades. Reward: 6 AP. Currently: 2/4"
				if (hasUpgrade("Li", 11)) return "Buy all Lithium Upgrades. Reward: 6 AP. Currently: 1/4"
				return "Buy all Lithium Upgrades. Reward: 6 AP. Currently: 0/4"
			},
			done() { return hasUpgrade("Li", 14) },
			onComplete() {player["Ach"].points = player["Ach"].points.add(6)},
		},
		56: {
			name: "1,609 Meters x 3",
			tooltip() {
				if (hasAchievement(this.layer, this.id)) return "Get the first Lithium Milestone. Reward: 6 AP."
				return "Get the first Lithium Milestone. Reward: 6 AP. Currently: 0/1"
			},
			done() { return hasMilestone("Li", 0) },
			onComplete() {player["Ach"].points = player["Ach"].points.add(6)},
		},
		57: {
			name: "Just Stop the Meters Thing!",
			tooltip() {
				if (hasAchievement(this.layer, this.id)) return "Get the second Lithium Milestone. Reward: 6 AP."
				if (hasMilestone("Li", 0)) return "Get the second Lithium Milestone. Reward: 6 AP. Currently: 1/2"
				return "Get the second Lithium Milestone. Reward: 6 AP. Currently: 0/2"
			},
			done() { return hasMilestone("Li", 1) },
			onComplete() {player["Ach"].points = player["Ach"].points.add(6)},
		},
		61: {
			name: "Soon",
			tooltip() {
				if (hasAchievement(this.layer, this.id)) return "Coming Soon"
				return "Coming Soon"
			},
			done() { return player["Li"].total.gte(1e19951207) },
			onComplete() {player["Ach"].points = player["Ach"].points.add(6)},
		},
	},
    layerShown(){return true},
})