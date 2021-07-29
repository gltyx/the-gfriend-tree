// LAYER 2: GFRKEND SONGS
//
// ADDED IN 0.20
addLayer("g", {
    name: "GFRIEND Songs", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "G", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
        views: new Decimal(0),
        subs: new Decimal(0),
        sales: new Decimal(0),
        salesEffect: new Decimal(1),
    }},
    color: "#f1f0ec",
    requires: new Decimal(1e30),
    resource: "GFRIEND Songs", // Name of prestige currency
    baseResource: "Money",
    baseAmount() {
        return player.money.points
    },
    resetDescription: "Produce ",
    exponent: new Decimal(2),
    base: new Decimal(1000),
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    row: 1, // Row the layer is in on the tree (0 is the first row)
    branches: ['money'],
    tabFormat: {
        "Main": {
            content: [
                "main-display",
                "blank",
                "prestige-button",
                "blank",
                ["display-text",
                    function() { 
                        return 'Money is reduced by the requirement when producing GFRIEND Songs.' 
                    },
                    { 
                        "color": "#dfdfdf"
                    }],
                ["display-text",
                    function() { 
                        return 'You have ' + format(player.points) + ' Popularity' 
                    },
                    { 
                        "color": "#dfdfdf"
                    }],
                ["display-text",
                    function() { 
                        return 'You have ' + format(player.money.points) + ' Money' 
                    },
                    { 
                        "color": "#dfdfdf"
                    }],
                "blank",
                "milestones",
            ],
        },
        "Streaming": {
            content: [
                "main-display",
                "blank",
                "prestige-button",
                "blank",
                ["display-text",
                    function() { 
                        return 'You have ' + format(player.points) + ' Popularity' 
                    },
                    { 
                        "color": "#dfdfdf"
                    }],
                ["display-text",
                    function() { 
                        return 'You have ' + format(player.money.points) + ' Money' 
                    },
                    { 
                        "color": "#dfdfdf"
                    }],
                "blank",
                ["display-text",
                    function() {
                        if (player.g.views.gte(1000)) return 'You have ' + format(player.g.views, 2) + ' Video Views'
                        return 'You have ' + format(player.g.views, 0) + ' Video Views' 
                    },
                    { 
                        "color": "#dfdfdf"
                    }],
                ["display-text",
                    function() {
                        if (player.g.subs.gte(1000)) return 'You have ' + format(player.g.subs, 2) + ' Subscribers'
                        return 'You have ' + format(player.g.subs, 0) + ' Subscribers' 
                    },
                    { 
                        "color": "#dfdfdf"
                    }],
                "blank",
                "upgrades",
            ],
            unlocked() {
                return hasMilestone('g', 0)
            },
        },
        "Albums": {
            content: [
                "main-display",
                "blank",
                "prestige-button",
                "blank",
                ["display-text",
                    function() { 
                        return 'You have ' + format(player.points) + ' Popularity' 
                    },
                    { 
                        "color": "#dfdfdf"
                    }],
                ["display-text",
                    function() { 
                        return 'You have ' + format(player.money.points) + ' Money' 
                    },
                    { 
                        "color": "#dfdfdf"
                    }],
                "blank",
                ["display-text",
                    function() {
                        if (player.g.sales.gte(1000)) return 'You have ' + format(player.g.sales, 2) + ' Album Sales'
                        return 'You have ' + format(player.g.sales, 0) + ' Album Sales' 
                    },
                    { 
                        "color": "#dfdfdf"
                    }],
                    ["display-text",
                    function() {
                        return 'Album Sales boost Popularity and Money gain by ' + format(player.g.salesEffect) + 'x'
                    },
                    { 
                        "color": "#dfdfdf"
                    }],
                "blank",
                "buyables",
            ],
            unlocked() {
                return hasMilestone('g', 3)
            },
        },
    },
    effect() {
        let x = new Decimal(5).pow(player.g.points)
        return x
    },
    effectDescription() {
        let text = ""
        text = text + "boosting Popularity and Money gain by <h2 style='color:"
        text = text + this.color
        text = text + "; text-shadow:"
        text = text + this.color
        text = text + " 0px 0px 10px'>"
        text = text + format(this.effect())
        text = text + "x</h2>."
        return text
    },
    milestones: {
        0: {
            requirementDescription: "2 GFRIEND Songs",
            effectDescription: "Unlock Streaming.",
            done() {
                return player.g.points.gte(2)
            },
        },
        1: {
            requirementDescription: "3 GFRIEND Songs",
            effectDescription: "10x Subscriber Gain.",
            done() {
                return player.g.points.gte(3)
            },
        },
        2: {
            requirementDescription: "4 GFRIEND Songs",
            effectDescription: "Autobuy Money buyables.",
            done() {
                return player.g.points.gte(4)
            },
            toggles: [['money', 'auto'],['money', 'auto1'],['money', 'auto2']]
        },
        3: {
            requirementDescription: "6 GFRIEND Songs",
            effectDescription: "Unlock Albums.",
            done() {
                return player.g.points.gte(6)
            },
        },
        4: {
            requirementDescription: "8 GFRIEND Songs",
            effectDescription: "Unlock a second Album buyable.",
            done() {
                return player.g.points.gte(8)
            },
        },
    },
    upgrades: { // Streaming
        11: {
            title: "Upload First Video",
            description: "Earn Views based on GFRIEND Songs.<br>Softcapped at 1,000,000 views/sec.",
            cost() {
                return new Decimal(1e37)
            },
            currencyDisplayName: "Money",
            currencyInternalName: "points",
            currencyLayer: "money",
            effect() {
                let base = new Decimal(3).pow(player.g.points)
                if (hasUpgrade('g', 23)) base = base.times(upgradeEffect('g', 23))
                if (hasUpgrade('g', 24)) base = base.times(upgradeEffect('g', 24))
                if (hasUpgrade('f', 13)) base = base.times(upgradeEffect('f', 13))
                if (hasUpgrade('f', 23)) base = base.times(upgradeEffect('f', 23))
                if (base.gt(1e6))
                {
                    let j = base.div(1e6)
                    j = j.pow(0.5)
                    base = new Decimal(1e6).times(j)
                }
                return base
            },
            effectDisplay() {
                return formatWhole(upgradeEffect(this.layer, this.id))+"/s"
            },
            unlocked() {
                return true
            },
        },
        12: {
            title: "Subscription",
            description: "Earn Subscribers based on Views growth rate.<br>Softcapped at 1,000 subs/sec.<br>Requires 100 Views.",
            cost() {
                return new Decimal(1e39)
            },
            currencyDisplayName: "Money",
            currencyInternalName: "points",
            currencyLayer: "money",
            canAfford() {
                return player.g.views.gte(100)
            },
            effect() {
                let i = upgradeEffect('g', 11).times(0.005)
                if (hasMilestone('g', 1)) i = i.times(10)
                if (i.gt(1000))
                {
                    let j = i.div(1000)
                    j = j.pow(0.5)
                    i = j.times(1000)
                }
                return i
            },
            effectDisplay() {
                return format(upgradeEffect(this.layer, this.id))+"/s"
            },
            unlocked() {
                return hasUpgrade('g', 11)
            },
        },
        13: {
            title: "Promotion",
            description: "Subscribers boost Popularity gain.<br>Requires 50 Subscribers.",
            cost() {
                return new Decimal(1e43)
            },
            currencyDisplayName: "Money",
            currencyInternalName: "points",
            currencyLayer: "money",
            canAfford() {
                return player.g.subs.gte(50)
            },
            effect() {
                let i = player.g.subs.round().add(1)
                return i
            },
            effectDisplay() {
                return format(upgradeEffect(this.layer, this.id))+"x"
            },
            unlocked() {
                return hasUpgrade('g', 12)
            },
        },
        14: {
            title: "Streaming Power",
            description: "GFRIEND Songs boost Popularity gain.<br>Requires 200 Subscribers.",
            cost() {
                return new Decimal(1e49)
            },
            currencyDisplayName: "Money",
            currencyInternalName: "points",
            currencyLayer: "money",
            canAfford() {
                return player.g.subs.gte(200)
            },
            effect() {
                let i = new Decimal(3).pow(player.g.points)
                return i
            },
            effectDisplay() {
                return format(upgradeEffect(this.layer, this.id))+"x"
            },
            unlocked() {
                return hasUpgrade('g', 13)
            },
        },
        15: {
            title: "Monetization",
            description: "Views boost Money gain.<br>Requires 1,000 Subscribers and 24,000 Views.",
            cost() {
                return new Decimal(1e57)
            },
            currencyDisplayName: "Money",
            currencyInternalName: "points",
            currencyLayer: "money",
            canAfford() {
                return player.g.subs.gte(1000) && player.g.views.gte(24000)
            },
            effect() {
                let i = player.g.views.pow(0.75).add(1)
                return i
            },
            effectDisplay() {
                return format(upgradeEffect(this.layer, this.id))+"x"
            },
            unlocked() {
                return hasUpgrade('g', 14)
            },
        },
        21: {
            title: "Banner Ad Enhancement",
            description: "<b>Banner Ad</b> effect exponent is increased by 0.05 for every Streaming upgrade bought.",
            cost() {
                return new Decimal(1e69) // nice
            },
            currencyDisplayName: "Money",
            currencyInternalName: "points",
            currencyLayer: "money",
            effect() {
                let i = new Decimal(player.g.upgrades.length).times(0.05)
                return i
            },
            effectDisplay() {
                return "+"+format(upgradeEffect(this.layer, this.id))+" to exponent"
            },
            unlocked() {
                return hasUpgrade('g', 15)
            },
        },
        22: {
            title: "Video Ad Enhancement",
            description: "<b>Video Ad</b> effect base is increased by 0.01 for every Streaming upgrade bought.",
            cost() {
                return new Decimal(1e83)
            },
            currencyDisplayName: "Money",
            currencyInternalName: "points",
            currencyLayer: "money",
            effect() {
                let i = new Decimal(player.g.upgrades.length).times(0.01)
                return i
            },
            effectDisplay() {
                return "+"+format(upgradeEffect(this.layer, this.id))+" to base"
            },
            unlocked() {
                return hasUpgrade('g', 21)
            },
        },
        23: {
            title: "More Views",
            description: "You get 10% more views for every Streaming upgrade bought (additive).",
            cost() {
                return new Decimal(1e99)
            },
            currencyDisplayName: "Money",
            currencyInternalName: "points",
            currencyLayer: "money",
            effect() {
                let i = new Decimal(player.g.upgrades.length).times(0.1).add(1)
                return i
            },
            effectDisplay() {
                return format(upgradeEffect(this.layer, this.id))+"x"
            },
            unlocked() {
                return hasUpgrade('g', 22)
            },
        },
        24: {
            title: "Streaming Investment",
            description: "You get 1% more views for every <b>Investment</b> level (additive).",
            cost() {
                return new Decimal(1e117)
            },
            currencyDisplayName: "Money",
            currencyInternalName: "points",
            currencyLayer: "money",
            effect() {
                let i = getBuyableAmount('money', 13).times(0.01).add(1)
                return i
            },
            effectDisplay() {
                return format(upgradeEffect(this.layer, this.id))+"x"
            },
            unlocked() {
                return hasUpgrade('g', 23)
            },
        },
        25: {
            title: "Yet Another Streaming Upgrade",
            description: "Multiply Popularity gain by 9, before all other boosts.",
            cost() {
                return new Decimal(1e137)
            },
            currencyDisplayName: "Money",
            currencyInternalName: "points",
            currencyLayer: "money",
            effect() {
                let i = new Decimal(9)
                return i
            },
            effectDisplay() {
                return format(upgradeEffect(this.layer, this.id))+"x"
            },
            unlocked() {
                return hasUpgrade('g', 24)
            },
        },
        31: {
            title: "Silver Play Button",
            description: "Multiply Popularity gain by 99.<br>Requires 100,000 Subscribers.",
            cost() {
                return new Decimal(1e159)
            },
            currencyDisplayName: "Money",
            currencyInternalName: "points",
            currencyLayer: "money",
            canAfford() {
                return player.g.subs.gte(1e5)
            },
            effect() {
                let i = new Decimal(99)
                return i
            },
            effectDisplay() {
                return format(upgradeEffect(this.layer, this.id))+"x"
            },
            unlocked() {
                return hasUpgrade('g', 25)
            },
        },
        32: {
            title: "Double Silver Play Button",
            description: "Multiply Popularity gain by 199.<br>Requires 200,000 Subscribers.",
            cost() {
                return new Decimal(1e183)
            },
            currencyDisplayName: "Money",
            currencyInternalName: "points",
            currencyLayer: "money",
            canAfford() {
                return player.g.subs.gte(2e5)
            },
            effect() {
                let i = new Decimal(199)
                return i
            },
            effectDisplay() {
                return format(upgradeEffect(this.layer, this.id))+"x"
            },
            unlocked() {
                return hasUpgrade('g', 31)
            },
        },
        33: {
            title: "Gold Play Button",
            description: "Multiply Popularity gain by 999.<br>Requires 1,000,000 Subscribers.",
            cost() {
                return new Decimal("1e209")
            },
            currencyDisplayName: "Money",
            currencyInternalName: "points",
            currencyLayer: "money",
            canAfford() {
                return player.g.subs.gte(1e6)
            },
            effect() {
                let i = new Decimal(999)
                return i
            },
            effectDisplay() {
                return format(upgradeEffect(this.layer, this.id))+"x"
            },
            unlocked() {
                return hasUpgrade('g', 32)
            },
        },
        34: {
            title: "Double Gold Play Button",
            description: "Multiply Popularity gain by 9,999, and add 0.015 to <b>Video Ad</b> effect base.<br>Requires 2,000,000 Subscribers.",
            cost() {
                return new Decimal("1e237")
            },
            currencyDisplayName: "Money",
            currencyInternalName: "points",
            currencyLayer: "money",
            canAfford() {
                return player.g.subs.gte(2e6)
            },
            effect() {
                let i = new Decimal(9999)
                return i
            },
            effectDisplay() {
                return format(upgradeEffect(this.layer, this.id))+"x, +0.015 to base"
            },
            unlocked() {
                return hasUpgrade('g', 33)
            },
        },
        35: {
            title: "Diamond Play Button",
            description: "Multiply Popularity gain by 999,999.<br>Requires 10,000,000 Subscribers.",
            cost() {
                return new Decimal("1e267")
            },
            currencyDisplayName: "Money",
            currencyInternalName: "points",
            currencyLayer: "money",
            canAfford() {
                return player.g.subs.gte(1e7)
            },
            effect() {
                let i = new Decimal(999999)
                return i
            },
            effectDisplay() {
                return format(upgradeEffect(this.layer, this.id))+"x"
            },
            unlocked() {
                return hasUpgrade('g', 34)
            },
        },
    },
    buyables: {
        11: {
            title: "Album Marketing",
            cost(x) {
                let n = new Decimal("1e135").times(new Decimal(1e10).pow(x.pow(1.1)))
                if (x.gte(10)) n = n.pow(x.sub(-1).div(10))
                if (x.gte(20)) n = n.pow(x.sub(14).div(5))
                if (x.gte(30)) n = n.pow(x.sub(24).div(5))
                if (x.gte(40)) n = n.pow(x.sub(34).div(5))
                if (x.gte(50)) n = n.pow(x.sub(44).div(5))
                return n
            },
            display() {
                return "<h3>Level:</h3> "+formatWhole(getBuyableAmount('g', 11))+"<br><h3>Effect:</h3> "+format(buyableEffect('g', 11))+" Album Sales/sec<br><h3>Cost:</h3> "+format(tmp.g.buyables[11].cost)+" Money"
            },
            canAfford() {
                return player.money.points.gte(this.cost())
            },
            buy() {
                if (this.canAfford)
                {
                    player.money.points = player.money.points.sub(tmp[this.layer].buyables[this.id].cost)
                    addBuyables(this.layer, this.id, 1)
                }
            },
            effect(x) {
                let n = new Decimal(2).pow(x.div(2)).times(10)
                if (hasUpgrade('f', 15)) n = n.times(upgradeEffect('f', 15))
                if (hasUpgrade('f', 33)) n = n.times(upgradeEffect('f', 33))
                return n
            },
            unlocked() {
                return hasMilestone('g', 3)
            },
        },
        12: {
            title: "Album Promotion",
            cost(x) {
                return new Decimal("1e200").times(new Decimal(1e11).pow(x.pow(2.2)))
            },
            display() {
                return "<h3>Level:</h3> "+formatWhole(getBuyableAmount('g', 12))+"<br><h3>Effect:</h3> +"+format(buyableEffect('g', 12))+" to Album Sales effect exponent<br><h3>Cost:</h3> "+format(tmp.g.buyables[12].cost)+" Money"
            },
            canAfford() {
                return player.money.points.gte(this.cost())
            },
            buy() {
                if (this.canAfford)
                {
                    player.money.points = player.money.points.sub(tmp[this.layer].buyables[this.id].cost)
                    addBuyables(this.layer, this.id, 1)
                }
            },
            effect(x) {
                let per = new Decimal(0.5)
                if (hasUpgrade('f', 25)) per = per.times(upgradeEffect('f', 25))
                let n = per.times(x)
                return n
            },
            unlocked() {
                return hasMilestone('g', 4)
            },
        },
    },
    layerShown(){
        return hasUpgrade('money', 35)
    },
    onPrestige() {
        player.money.points = player.money.points.sub(tmp.g.nextAt)
    },
    updateSales() {
        player.g.salesEffect = player.g.sales.round().add(1).pow(buyableEffect('g', 12).add(1))
    },
    resetsNothing() {
        return true
    },
    update(diff) {
        if (hasUpgrade('g', 11)) player.g.views = player.g.views.add(upgradeEffect('g', 11).times(diff))
        if (hasUpgrade('g', 12)) player.g.subs = player.g.subs.add(upgradeEffect('g', 12).times(diff))
        if (hasMilestone('g', 3)) player.g.sales = player.g.sales.add(buyableEffect('g', 11).times(diff))
    },
    doReset(resettingLayer) {
		let keep = []
		//if (layers[resettingLayer].id = '') layerDataReset("money", keep)
	},
})