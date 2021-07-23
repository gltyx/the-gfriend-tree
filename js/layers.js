addLayer("money", {
    name: "Money", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "$", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(1),
        ps: new Decimal(0),
        auto: false,
        auto1: false,
        auto2: false,
    }},
    color: "#5fad70",
    resource: "Money", // Name of prestige currency
    type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    row: 0, // Row the layer is in on the tree (0 is the first row)
    tabFormat: [
        ["main-display", 2],
        "blank",
        ["display-text",
        function() { 
            return 'You are earning ' + format(player.money.ps) + ' Money per second' 
        },
        { 
            "color": "#dfdfdf"
        }],
        "blank",
        ["display-text",
            function() { 
                return 'You have ' + format(player.points) + ' Popularity' 
            },
            { 
                "color": "#dfdfdf"
            }],
        "blank",
        "buyables",
        "blank",
        "upgrades",
    ],
    hotkeys: [
        {
            key: 'ctrl+s',
            description: 'Ctrl+S: Save the game',
            unlocked: true,
            onPress() {
			    save(true)
		    },
        },
    ],
    upgrades: {
        11: {
            title: "Begin",
            description: "Earn Money based on Popularity.",
            cost() {
                return new Decimal(1)
            },
            effect() {
                return player.points.times(0.1)
            },
            effectDisplay() {
                return format(upgradeEffect(this.layer, this.id))+"/s"
            },
            unlocked() {
                return true
            },
        },
        12: {
            title: "Youtube Account",
            description: "Gain 0.05 Popularity per second.",
            cost() {
                return new Decimal(2)
            },
            effect() {
                return new Decimal(0.05)
            },
            effectDisplay() {
                return format(upgradeEffect(this.layer, this.id))+"/s"
            },
            unlocked() {
                return hasUpgrade('money', 11)
            },
        },
        13: {
            title: "Funding Site",
            description: "Money gain is multiplied by the number of Money upgrades bought plus 1.16.",
            cost() {
                return new Decimal(10)
            },
            effect() {
                return new Decimal(player.money.upgrades.length).add(1.16)
            },
            effectDisplay() {
                return format(upgradeEffect(this.layer, this.id))+"x"
            },
            unlocked() {
                return hasUpgrade('money', 12)
            },
        },
        14: {
            title: "External Funding Site",
            description: "Popularity gain is multiplied by the number of Money upgrades bought plus 1.16.",
            cost() {
                return new Decimal(100)
            },
            effect() {
                return new Decimal(player.money.upgrades.length).add(1.16)
            },
            effectDisplay() {
                return format(upgradeEffect(this.layer, this.id))+"x"
            },
            unlocked() {
                return hasUpgrade('money', 13)
            },
        },
        15: {
            title: "Campaign",
            description: "Popularity gain is multiplied x1.5 for every Money upgrade bought.",
            cost() {
                return new Decimal(1000)
            },
            effect() {
                return new Decimal(1.5).pow(player.money.upgrades.length)
            },
            effectDisplay() {
                return format(upgradeEffect(this.layer, this.id))+"x"
            },
            unlocked() {
                return hasUpgrade('money', 14)
            },
        },
        21: {
            title: "Yet Another Popularity Upgrade",
            description: "Popularity gain is raised ^1.025 for every Money upgrade bought, if it is above 1.",
            cost() {
                return new Decimal(5000)
            },
            effect() {
                return new Decimal(1.025).pow(player.money.upgrades.length)
            },
            effectDisplay() {
                return "^"+format(upgradeEffect(this.layer, this.id))
            },
            unlocked() {
                return hasUpgrade('money', 15)
            },
        },
        22: {
            title: "Advertising I",
            description: "Unlock the first Money buyable.",
            cost() {
                return new Decimal(15000)
            },
            unlocked() {
                return hasUpgrade('money', 21)
            },
        },
        23: {
            title: "Advertising II",
            description: "<b>Banner Ad</b> also boosts Money gain.",
            cost() {
                return new Decimal(50000)
            },
            unlocked() {
                return hasUpgrade('money', 22)
            },
        },
        24: {
            title: "Advertising III",
            description: "Unlock the second Money buyable.",
            cost() {
                return new Decimal(250000)
            },
            unlocked() {
                return hasUpgrade('money', 23)
            },
        },
        25: {
            title: "Advertising IV",
            description: "<b>Banner Ad</b> effect is raised ^1.25.",
            cost() {
                return new Decimal(5e7)
            },
            unlocked() {
                return hasUpgrade('money', 24)
            },
        },
        31: {
            title: "Found a Business",
            description: "Unlock the third Money buyable.",
            cost() {
                return new Decimal(1e9)
            },
            unlocked() {
                return hasUpgrade('money', 25)
            },
        },
        32: {
            title: "Attract Investors",
            description: "<b>Investment</b> is stronger based on the levels of <b>Banner Ad</b> and <b>Video Ad</b> buyables.",
            cost() {
                return new Decimal(4e10)
            },
            unlocked() {
                return hasUpgrade('money', 31)
            },
        },
        33: {
            title: "Conceptualize",
            description: "<b>Video Ad</b> levels directly boost <b>Investment</b>.",
            cost() {
                return new Decimal(1e16) // GFRIEND debut 2015.1.16
            },
            unlocked() {
                return hasUpgrade('money', 32)
            },
        },
        34: {
            title: "Prepare",
            description: "<b>Video Ad</b> effect base is increased by 0.1.",
            cost() {
                return new Decimal(5e22) // GFRIEND disbandment 2021.5.22
            },
            unlocked() {
                return hasUpgrade('money', 33)
            },
        },
        35: {
            title: "Re-debut GFRIEND",
            description: "Unlock a new layer.<br>Requires 27 levels of <b>Investment</b>.",
            cost() {
                return new Decimal(1e30)
            },
            canAfford() {
                return getBuyableAmount('money', 13).gte(27)
            },
            unlocked() {
                return hasUpgrade('money', 34)
            },
        },
    },
    buyables: {
        11: {
            title: "Banner Ad",
            cost(x) {
                let n = new Decimal(10000).times(new Decimal(1.55).pow(x.pow(1.05)))
                if (x.gte(500)) n = n.pow(x.sub(399).times(0.01))
                if (x.gte(1000)) n = n.pow(x.sub(799).times(0.005))
                if (x.gte(2500)) n = n.pow(x.sub(2099).times(0.0025))
                if (x.gte(5000)) n = n.pow(x.sub(3999).times(0.001))
                if (x.gte(10000)) n = n.pow(x.sub(8999).times(0.001))
                return n
            },
            display() {
                if (hasUpgrade('money', 23)) return "<h3>Level:</h3> "+formatWhole(getBuyableAmount('money', 11))+"<br><h3>Effect:</h3> "+format(buyableEffect('money', 11))+"x Popularity and Money gain<br><h3>Cost:</h3> "+format(tmp.money.buyables[11].cost)+" Money"
                return "<h3>Level:</h3> "+formatWhole(getBuyableAmount('money', 11))+"<br><h3>Effect:</h3> "+format(buyableEffect('money', 11))+"x Popularity gain<br><h3>Cost:</h3> "+format(tmp.money.buyables[11].cost)+" Money"
            },
            canAfford() {
                return player[this.layer].points.gte(this.cost())
            },
            buy() {
                if (this.canAfford)
                {
                    player[this.layer].points = player[this.layer].points.sub(tmp[this.layer].buyables[this.id].cost)
                    addBuyables(this.layer, this.id, 1)
                }
            },
            effect(x) {
                let n = new Decimal(1).add(x.times(0.5))
                let exp = new Decimal(1)
                if (hasUpgrade('money', 25)) exp = new Decimal(1.25)
                if (hasUpgrade('g', 21)) exp = exp.add(upgradeEffect('g', 21))
                return n.pow(exp)
            },
            unlocked() {
                return hasUpgrade('money', 22)
            },
        },
        12: {
            title: "Video Ad",
            cost(x) {
                let n = new Decimal(160000).times(new Decimal(3.1).pow(x.pow(1.05)))
                if (x.gte(500)) n = n.pow(x.sub(399).times(0.01))
                if (x.gte(1000)) n = n.pow(x.sub(799).times(0.005))
                if (x.gte(2500)) n = n.pow(x.sub(2099).times(0.0025))
                if (x.gte(5000)) n = n.pow(x.sub(3999).times(0.001))
                if (x.gte(10000)) n = n.pow(x.sub(8999).times(0.001))
                return n
            },
            display() {
                return "<h3>Level:</h3> "+formatWhole(getBuyableAmount('money', 12))+"<br><h3>Effect:</h3> "+format(buyableEffect('money', 12))+"x Popularity and Money gain<br><h3>Cost:</h3> "+format(tmp.money.buyables[12].cost)+" Money"
            },
            canAfford() {
                return player[this.layer].points.gte(this.cost())
            },
            buy() {
                if (this.canAfford)
                {
                    player[this.layer].points = player[this.layer].points.sub(tmp[this.layer].buyables[this.id].cost)
                    addBuyables(this.layer, this.id, 1)
                }
            },
            effect(x) {
                let base = new Decimal(1.2)
                if (hasUpgrade('money', 34)) base = base.add(0.1)
                if (hasUpgrade('g', 22)) base = base.add(upgradeEffect('g', 22))
                if (hasUpgrade('g', 34)) base = base.add(0.02)
                return base.pow(x)
            },
            unlocked() {
                return hasUpgrade('money', 24)
            },
        },
        13: {
            title: "Investment",
            cost(x) {
                let n = new Decimal(1e9).times(new Decimal(4.65).pow(x.pow(1.05)))
                if (x.gte(500)) n = n.pow(x.sub(399).times(0.01))
                if (x.gte(1000)) n = n.pow(x.sub(799).times(0.005))
                if (x.gte(2500)) n = n.pow(x.sub(2099).times(0.0025))
                if (x.gte(5000)) n = n.pow(x.sub(3999).times(0.001))
                if (x.gte(10000)) n = n.pow(x.sub(8999).times(0.001))
                return n
            },
            display() {
                return "<h3>Level:</h3> "+formatWhole(getBuyableAmount('money', 13))+"<br><h3>Effect:</h3> "+format(buyableEffect('money', 13))+"x Money gain<br><h3>Cost:</h3> "+format(tmp.money.buyables[13].cost)+" Money"
            },
            canAfford() {
                return player[this.layer].points.gte(this.cost())
            },
            buy() {
                if (this.canAfford)
                {
                    player[this.layer].points = player[this.layer].points.sub(tmp[this.layer].buyables[this.id].cost)
                    addBuyables(this.layer, this.id, 1)
                }
            },
            effect(x) {
                let n = getBuyableAmount('money', 11).add(getBuyableAmount('money', 12))
                let m = getBuyableAmount('money', 12)
                if (!hasUpgrade('money', 32)) n = new Decimal(0)
                if (!hasUpgrade('money', 33)) m = new Decimal(0)
                return new Decimal(2).pow(x.pow(0.95)).times(new Decimal(1).add(n.times(0.1))).times(m.times(0.5).add(1))
            },
            unlocked() {
                return hasUpgrade('money', 31)
            },
        },
    },
    layerShown(){
        return true
    },
    update(diff){
        let gain = new Decimal(0)
        if (hasUpgrade('money', 11)) gain = gain.add(upgradeEffect('money', 11))
        if (hasUpgrade('money', 13)) gain = gain.times(upgradeEffect('money', 13))
        if (hasUpgrade('money', 23)) gain = gain.times(buyableEffect('money', 11))
        gain = gain.times(buyableEffect('money', 12))
        gain = gain.times(buyableEffect('money', 13))
        if (player.g.unlocked) gain = gain.times(tmp.g.effect)
        if (hasUpgrade('g', 15)) gain = gain.times(upgradeEffect('g', 15))
        if (hasMilestone('g', 3)) gain = gain.times(player.g.salesEffect)
        player.money.ps = gain
        player.money.points = player.money.points.add(gain.times(diff))
    },
    automate(diff){
        if (hasMilestone('g', 2)){
          if (hasUpgrade('money', 31) && player.money.auto2) tmp.money.buyables[13].buy()
          if (hasUpgrade('money', 24) && player.money.auto1) tmp.money.buyables[12].buy()
          if (hasUpgrade('money', 22) && player.money.auto) tmp.money.buyables[11].buy()
        }
    },
    doReset(resettingLayer) {
		let keep = []
		//if (layers[resettingLayer].id = '') layerDataReset("money", keep)
	},
})
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
    resetDescription: "Reset Popularity to produce ",
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
            description: "Multiply Popularity gain by 9999, and add 0.02 to <b>Video Ad</b> effect base.<br>Requires 2,000,000 Subscribers.",
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
                return format(upgradeEffect(this.layer, this.id))+"x, +0.03 to base"
            },
            unlocked() {
                return hasUpgrade('g', 33)
            },
        },
    },
    buyables: {
        11: {
            title: "Album Marketing",
            cost(x) {
                let n = new Decimal("1e135").times(new Decimal(1e10).pow(x.pow(1.1)))
                if (x.gte(10)) n = n.pow(x.sub(-11).div(20))
                if (x.gte(20)) n = n.pow(x.sub(-1).div(20))
                if (x.gte(30)) n = n.pow(x.sub(9).div(20))
                if (x.gte(40)) n = n.pow(x.sub(19).div(20))
                if (x.gte(50)) n = n.pow(x.sub(39).div(10))
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
                let n = new Decimal(0.5).times(x)
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
addLayer("story", {
    name: "Story", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "📘", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 3, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#c08040",
    resource: "Story Chapters", // Name of prestige currency
    type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    row: "side", // Row the layer is in on the tree (0 is the first row)
    tabFormat: {
        "I": {
            content: [
                ["display-text",
                    function() { 
                        return '<h2>Chapter 1 - The Event that Started Everything</h2>' 
                    },
                    { 
                        "color": "#dfdfdf"
                    }],
                "blank",
                ["infobox", "one"],
                ["infobox", "two"],
                ["infobox", "three"],
                ["infobox", "four"],
                ["infobox", "five"],
                ["infobox", "six"],
                ["infobox", "seven"],
            ],
        },
        "II": {
            content: [
                ["display-text",
                    function() { 
                        return '<h2>Chapter 2 - Rise of New GFRIEND</h2>' 
                    },
                    { 
                        "color": "#dfdfdf"
                    }],
                "blank",
                ["infobox", "eight"],
                ["infobox", "nine"],
                ["infobox", "ten"],
                ["infobox", "eleven"],
                ["infobox", "twelve"],
                ["infobox", "thirteen"],
                ["infobox", "fourteen"],
            ],
            unlocked() {
                return hasUpgrade('money', 35)
            }
        },
    },
    infoboxes: {
        //Chapter 1 starts here
        one: {
            title: "GFRIEND Disbandment",
            body() {
                let text = "On May 22, 2021, GFRIEND, South Korea's 6-member K-POP girl group from Source Music, disbanded after 2,319 days of activity. GFRIEND has been a nation-wide sensation since 2015, and has become a very popular group by successes of 14 albums, such as Flower Bud, Snowflake, LOL, Time for the moon night, and many more. Recent disbandment of GFRIEND has put many K-POP fans in Korea and other countries in a massive panic."
                return text
            },
            unlocked() {
                return true
            },
        },
        two: {
            title: "Awareness",
            body() {
                let text = "You heard that GFRIEND has disbanded. You felt you couldn't do anything, and thought that you lost the motivation to live. On the other side, you were also angry about Source Music. The infamous company announced that GFRIEND was going to disband just 4 days before the disbandment. Many BUDDYs (GFRIEND fans) started to hate Source Music and HYBE."
                return text
            },
            unlocked() {
                return hasUpgrade('money', 11)
            },
        },
        three: {
            title: "Funding Possible?",
            body() {
                let text = "Thinking that money could solve anything, you opened your favorite IDE and started making a site for funding GFRIEND for its re-debut. The creation of the new funding site needed hours of work, but you thought that it was a great step towards the re-debut of GFRIEND. It could also be a chance for you to be more recognized by the world. You were so tired that you immediately went to sleep with feelings of satisfaction, sadness and anger combined."
                return text
            },
            unlocked() {
                return hasUpgrade('money', 13)
            },
        },
        four: {
            title: "Campaign",
            body() {
                let text = "The next day, you started planning for the campaigns on Youtube and other platforms. Hours later, you found out that the video of the Campaign has gotten hundreds of views. Someone was interested in your campaign! Meanwhile, BUDDYs were still angry about the two infamous companies for not giving proper information about the disbandment to them."
                return text
            },
            unlocked() {
                return hasUpgrade('money', 15)
            },
        },
        five: {
            title: "Advertisements",
            body() {
                let text = "You have just set up your first advertisement! Although it is a simple banner, having an advertisement means that more BUDDYs will be aware of you and your project. You hope that you will soon get the profits via the ad hosting service. Meanwhile, BUDDYs were furious about Source Music trying to illegally refund the membership with virtual currency which can only be used in their online goods shop."
                return text
            },
            unlocked() {
                return getBuyableAmount('money', 11).gt(0)
            },
        },
        six: {
            title: "First Business",
            body() {
                let text = "You have just requested a business registration. It seems that it will take up to 5 days to complete the registration. You were proud of yourself seeing your campaign grow. Having a proper business would further help your project expand. The story of your project was posted on the online BUDDY community."
                return text
            },
            unlocked() {
                return hasUpgrade('money', 31)
            },
        },
        seven: {
            title: "Prepare",
            body() {
                let text = "You have conceptualized the ideas for the debut single, and attracted many investors. The board of your company, including you, decided the big day. As soon as you write the budget for promotion costs, re-debut of GFRIEND would be a matter of time. Your project was also widely known in the nation."
                return text
            },
            unlocked() {
                return hasUpgrade('money', 34)
            },
        },
        // Chapter 2 starts here
        eight: {
            title: "First Song",
            body() {
                let text = "Your company have just created a song for the re-debut. With some more money, you thought that you could compose one more song and use two songs for the re-debut."
                return text
            },
            unlocked() {
                return player.g.total.gt(0)
            },
        },
        nine: {
            title: "Debut Stage",
            body() {
                let text = "Your company have just created the second song for the re-debut. Later that week, your group made a fantastic performance on debut stage. At the same time, the music video was published on Youtube, and it started to gain views. The re-debut project was a success (at least for now)."
                return text
            },
            unlocked() {
                return hasMilestone('g', 0)
            },
        },
        ten: {
            title: "Streaming",
            body() {
                let text = "After the debut stage, you, as the owner of the channel, uploaded some more videos. The videos will gain views from many viewers, and it will be your main source of popularity from now on."
                return text
            },
            unlocked() {
                return hasUpgrade('g', 11)
            },
        },
        eleven: {
            title: "Make Money!",
            body() {
                let text = "Since you have 1,000 subscribers and 4,000 hours of total watch time, you were able to monetize the group's channel. You started gaining money from the partnership service. It is projected that it would greatly increase your income."
                return text
            },
            unlocked() {
                return hasUpgrade('g', 15)
            },
        },
        twelve: {
            title: "One for Each Member",
            body() {
                let text = "You now have created 6 songs. That's one per each member of GFRIEND! You thought that it was the time for the next comeback with physical EP album. You were satisfied that the company, re-debuted GFRIEND members, and you were all doing well."
                return text
            },
            unlocked() {
                return player.g.points.gte(6)
            },
        },
        thirteen: {
            title: "Album Release",
            body() {
                let text = "Your album just went on sale. It will be available on many stores. Album sales will greatly boost both your popularity and income. You celebrated this monumental day with all the employees in your company, including the group members."
                return text
            },
            unlocked() {
                return player.g.sales.gte(1)
            },
        },
        fourteen: {
            title: "Play Button",
            body() {
                let text = "Your channel just reached 100,000 subscribers. You got the silver play button. 100,000 subscriber is a big milestone in the road to the channel's success. Now let's aim for 1,000,000 subscribers and beyond!"
                return text
            },
            unlocked() {
                return player.g.subs.gte(100000)
            },
        },
    },
    tooltip() {
        return "Story"
    },
    layerShown(){
        return true
    },
    doReset(resettingLayer) {
		let keep = []
		//if (layers[resettingLayer].id = '') layerDataReset("money", keep)
	},
})
addLayer("ach", {
    name: "Achievements", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "Ach", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 4, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#ffc040",
    resource: "Achievements", // Name of prestige currency
    type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    row: "side", // Row the layer is in on the tree (0 is the first row)
    tabFormat: {
        "Achievements": {
            content: [
                ["display-text",
                    function() { 
                        return '<h2>Achievements: '+player.ach.points+'/64 Completed</h2>' 
                    },
                    { 
                        "color": "#dfdfdf"
                    }],
                "blank",
                "achievements",
            ],
        },
    },
    tooltip() {
        return "Achievements<br>("+player.ach.points+"/64)"
    },
    achievements: {
        11: {
            name: "You've Gotta Start Somewhere",
            done() {
                return player.money.points.lt(1) || player.money.points.gt(1) // pre-0.21 players should be able to get it
            },
            tooltip: "Spend your first bit of Money.",
            onComplete() {
                player.ach.points = player.ach.points.add(1)
            },
        },
        12: {
            name: "Start Getting Popular",
            done() {
                return player.points.gt(1)
            },
            tooltip: "Have more than 1 Popularity.",
            onComplete() {
                player.ach.points = player.ach.points.add(1)
            },
        },
        13: {
            name: "Ten isn't a Lot",
            done() {
                return player.money.points.gte(10)
            },
            tooltip: "Reach 10 Money.",
            onComplete() {
                player.ach.points = player.ach.points.add(1)
            },
        },
        14: {
            name: "Five Finger Popularity Punch",
            done() {
                return player.points.gte(5)
            },
            tooltip: "Reach 5 Popularity.",
            onComplete() {
                player.ach.points = player.ach.points.add(1)
            },
        },
        15: {
            name: "One Hundred is a Lot",
            done() {
                return player.money.points.gte(100)
            },
            tooltip: "Reach 100 Money.",
            onComplete() {
                player.ach.points = player.ach.points.add(1)
            },
        },
        16: {
            name: "Two-hand Popularity Punch",
            done() {
                return player.points.gte(10)
            },
            tooltip: "Reach 10 Popularity.",
            onComplete() {
                player.ach.points = player.ach.points.add(1)
            },
        },
        17: {
            name: "Thousand­aire",
            done() {
                return player.money.points.gte(1000)
            },
            tooltip: "Reach 1,000 Money.",
            onComplete() {
                player.ach.points = player.ach.points.add(1)
            },
        },
        21: {
            name: "POP=GFRD",
            done() {
                return player.points.gte(116)
            },
            tooltip: "Reach 116 Popularity.",
            onComplete() {
                player.ach.points = player.ach.points.add(1)
            },
        },
        22: {
            name: "You Forgot to Buff that!",
            done() {
                return hasUpgrade('money', 21)
            },
            tooltip: "Buy the 6th Money upgrade.",
            onComplete() {
                player.ach.points = player.ach.points.add(1)
            },
        },
        23: {
            name: "Maybe I Should Use Adblock...",
            done() {
                return getBuyableAmount('money', 11).gt(0)
            },
            tooltip: "Make your first Ad.",
            onComplete() {
                player.ach.points = player.ach.points.add(1)
            },
        },
        24: {
            name: "GFRIEND Debut Year",
            done() {
                return player.points.gte(2015)
            },
            tooltip: "Reach 2,015 Popularity.",
            onComplete() {
                player.ach.points = player.ach.points.add(1)
            },
        },
        25: {
            name: "The Slowest 30 Seconds Ever",
            done() {
                return getBuyableAmount('money', 12).gt(0)
            },
            tooltip: "Make your first Video Ad.",
            onComplete() {
                player.ach.points = player.ach.points.add(1)
            },
        },
        26: {
            name: "Million­aire",
            done() {
                return player.money.points.gte(1e6)
            },
            tooltip: "Reach 1,000,000 Money.",
            onComplete() {
                player.ach.points = player.ach.points.add(1)
            },
        },
        27: {
            name: "Double Decker",
            done() {
                return hasUpgrade('money', 25)
            },
            tooltip: "Buy the 10th Money upgrade.",
            onComplete() {
                player.ach.points = player.ach.points.add(1)
            },
        },
        31: {
            name: "Billion­aire",
            done() {
                return player.money.points.gte(1e9)
            },
            tooltip: "Reach 1e9 Money.",
            onComplete() {
                player.ach.points = player.ach.points.add(1)
            },
        },
        32: {
            name: "Own a Company",
            done() {
                return hasUpgrade('money', 31)
            },
            tooltip: "Found a business.",
            onComplete() {
                player.ach.points = player.ach.points.add(1)
            },
        },
        33: {
            name: "Try Not to Crash",
            done() {
                return getBuyableAmount('money', 13).gt(0)
            },
            tooltip: "Get 1 level of Investment.",
            onComplete() {
                player.ach.points = player.ach.points.add(1)
            },
        },
        34: {
            name: "Investment is OP Now",
            done() {
                return hasUpgrade('money', 32)
            },
            tooltip: "Buy the 12th Money Upgrade.",
            onComplete() {
                player.ach.points = player.ach.points.add(1)
            },
        },
        35: {
            name: "Trillion­aire",
            done() {
                return player.money.points.gte(1e12)
            },
            tooltip: "Reach 1e12 Money.",
            onComplete() {
                player.ach.points = player.ach.points.add(1)
            },
        },
        36: {
            name: "Korean Population",
            done() {
                return player.points.gte(51305186)
            },
            tooltip: "Reach 51,305,186 Popularity.", // Will become easier in the future
            onComplete() {
                player.ach.points = player.ach.points.add(1)
            },
        },
        37: {
            name: "Investment is Even More OP Now",
            done() {
                return hasUpgrade('money', 33)
            },
            tooltip: "Buy the 13th Money Upgrade.",
            onComplete() {
                player.ach.points = player.ach.points.add(1)
            },
        },
        41: {
            name: "Investment is Too OP Now",
            done() {
                return buyableEffect('money', 13).gte(1e6)
            },
            tooltip: "Get at least 1,000,000x bonus from Investment.",
            onComplete() {
                player.ach.points = player.ach.points.add(1)
            },
        },
        42: {
            name: "Prime Popularity",
            done() {
                return player.points.gte(998244353)
            },
            tooltip: "Reach 998,244,353 Popularity.",
            onComplete() {
                player.ach.points = player.ach.points.add(1)
            },
        },
        43: {
            name: "Sextillion­aire",
            done() {
                return player.money.points.gte(1e21)
            },
            tooltip: "Reach 1e21 Money.",
            onComplete() {
                player.ach.points = player.ach.points.add(1)
            },
        },
        44: {
            name: "Final Frontier",
            done() {
                return hasUpgrade('money', 34)
            },
            tooltip: "Buy the 14th Money Upgrade.",
            onComplete() {
                player.ach.points = player.ach.points.add(1)
            },
        },
        45: {
            name: "World Population",
            done() {
                return player.points.gte(7880728900)
            },
            tooltip: "Reach 7.88e9 Popularity.",
            onComplete() {
                player.ach.points = player.ach.points.add(1)
            },
        },
        46: {
            name: "Big 20",
            done() {
                return getBuyableAmount('money', 13).gte(20)
            },
            tooltip: "Get 20 levels of Investment.",
            onComplete() {
                player.ach.points = player.ach.points.add(1)
            },
        },
        47: {
            name: "To Re-debut and Beyond!",
            done() {
                return hasUpgrade('money', 35)
            },
            tooltip: "Re-debut GFRIEND.",
            onComplete() {
                player.ach.points = player.ach.points.add(1)
            },
        },
        51: {
            name: "First Song",
            done() {
                return player.g.points.gte(1)
            },
            tooltip: "Compose 1 GFRIEND Song.",
            onComplete() {
                player.ach.points = player.ach.points.add(1)
            },
        },
        52: {
            name: "Extra Popular",
            done() {
                return player.points.gte(5000500000000)
            },
            tooltip: "Reach 5.01e12 Popularity.",
            onComplete() {
                player.ach.points = player.ach.points.add(1)
            },
        },
        53: {
            name: "Decillion­aire",
            done() {
                return player.money.points.gte(1e33)
            },
            tooltip: "Reach 1e33 Money.",
            onComplete() {
                player.ach.points = player.ach.points.add(1)
            },
        },
        54: {
            name: "Second Song",
            done() {
                return player.g.points.gte(2)
            },
            tooltip: "Compose 2 GFRIEND Songs.",
            onComplete() {
                player.ach.points = player.ach.points.add(1)
            },
        },
        55: {
            name: "I Hit the Button!",
            done() {
                return player.g.views.gte(1)
            },
            tooltip: "Get 1 Video View.",
            onComplete() {
                player.ach.points = player.ach.points.add(1)
            },
        },
        56: {
            name: "Video Ad is Too OP Now",
            done() {
                return buyableEffect('money', 12).gte(1e6)
            },
            tooltip: "Get at least 1,000,000x bonus from Video Ad.",
            onComplete() {
                player.ach.points = player.ach.points.add(1)
            },
        },
        57: {
            name: "You Have One!",
            done() {
                return player.g.subs.gte(1)
            },
            tooltip: "Get 1 Subscriber.",
            onComplete() {
                player.ach.points = player.ach.points.add(1)
            },
        },
        61: {
            name: "Investment is Too OP^2 Now",
            done() {
                return buyableEffect('money', 13).gte(1e12)
            },
            tooltip: "Get at least 1e12x bonus from Investment.",
            onComplete() {
                player.ach.points = player.ach.points.add(1)
            },
        },
        62: {
            name: "Have 3 Songs and Prosper",
            done() {
                return player.g.points.gte(3)
            },
            tooltip: "Compose 3 GFRIEND Songs.",
            onComplete() {
                player.ach.points = player.ach.points.add(1)
            },
        },
        63: {
            name: "World World Population",
            done() {
                return player.points.gte(6.21e19)
            },
            tooltip: "Reach 6.21e19 Popularity.",
            onComplete() {
                player.ach.points = player.ach.points.add(1)
            },
        },
        64: {
            name: "Age of Automation",
            done() {
                return player.g.points.gte(4)
            },
            tooltip: "Compose 4 GFRIEND Songs to unlock autobuying of Money buyables.",
            onComplete() {
                player.ach.points = player.ach.points.add(1)
            },
        },
        65: {
            name: "Make Money!",
            done() {
                return hasUpgrade('g', 15)
            },
            tooltip: "Monetize your Channel.",
            onComplete() {
                player.ach.points = player.ach.points.add(1)
            },
        },
        66: {
            name: "Vigintillio­­naire",
            done() {
                return player.money.points.gte(1e63)
            },
            tooltip: "Reach 1e63 Money.",
            onComplete() {
                player.ach.points = player.ach.points.add(1)
            },
        },
        67: {
            name: "Googolaire",
            done() {
                return player.money.points.gte(new Decimal("1e100"))
            },
            tooltip: "Reach 1e100 Money.",
            onComplete() {
                player.ach.points = player.ach.points.add(1)
            },
        },
        71: {
            name: "First Album",
            done() {
                return hasMilestone('g', 3)
            },
            tooltip: "Unlock Albums.",
            onComplete() {
                player.ach.points = player.ach.points.add(1)
            },
        },
        72: {
            name: "World^4 Population",
            done() {
                return player.points.gte(3.86e39)
            },
            tooltip: "Reach 3.86e39 Popularity.",
            onComplete() {
                player.ach.points = player.ach.points.add(1)
            },
        },
        73: {
            name: "Thousand Seller",
            done() {
                return player.g.sales.gte(1000)
            },
            tooltip: "Reach 1,000 Album Sales.",
            onComplete() {
                player.ach.points = player.ach.points.add(1)
            },
        },
        74: {
            name: "You're on the 'Tube!",
            done() {
                return player.g.views.gte(1000000)
            },
            tooltip: "Reach 1,000,000 Video Views.",
            onComplete() {
                player.ach.points = player.ach.points.add(1)
            },
        },
        75: {
            name: "Silver Play Button",
            done() {
                return player.g.subs.gte(100000)
            },
            tooltip: "Reach 100,000 Subscribers.",
            onComplete() {
                player.ach.points = player.ach.points.add(1)
            },
        },
        76: {
            name: "GFRIEND Average Height",
            done() {
                return player.money.points.gte(1e168)
            },
            tooltip: "Reach 1e168 Money.",
            onComplete() {
                player.ach.points = player.ach.points.add(1)
            },
        },
        77: {
            name: "Myriad Seller",
            done() {
                return player.g.sales.gte(10000)
            },
            tooltip: "Reach 10,000 Album Sales.",
            onComplete() {
                player.ach.points = player.ach.points.add(1)
            },
        },
        81: {
            name: "Double Silver Play Button",
            done() {
                return player.g.subs.gte(200000)
            },
            tooltip: "Reach 200,000 Subscribers.",
            onComplete() {
                player.ach.points = player.ach.points.add(1)
            },
        },
        82: {
            name: "Lucky Number",
            done() {
                return player.points.gte(7.77e77)
            },
            tooltip: "Reach 7.77e77 Popularity.",
            onComplete() {
                player.ach.points = player.ach.points.add(1)
            },
        },
        83: {
            name: "CSJH The Grace",
            done() {
                return player.g.sales.gte(31240)
            },
            tooltip: "Reach 31,240 Album Sales.",
            onComplete() {
                player.ach.points = player.ach.points.add(1)
            },
        },
        84: {
            name: "Gargoogol­aire",
            done() {
                return player.money.points.gte(new Decimal("1e200"))
            },
            tooltip: "Reach 1e200 Money.",
            onComplete() {
                player.ach.points = player.ach.points.add(1)
            },
        },
        85: {
            name: "You do what for a living?!",
            done() {
                return player.g.views.gte(2e7)
            },
            tooltip: "Reach 20,000,000 Video Views.",
            onComplete() {
                player.ach.points = player.ach.points.add(1)
            },
        },
        86: {
            name: "Gold Play Button",
            done() {
                return player.g.subs.gte(1e6)
            },
            tooltip: "Reach 1,000,000 Subscribers.",
            onComplete() {
                player.ach.points = player.ach.points.add(1)
            },
        },
        87: {
            name: "Albums are OP Now",
            done() {
                return getBuyableAmount('g', 12).gte(2)
            },
            tooltip: "Get 2 levels of Album Promotion.",
            onComplete() {
                player.ach.points = player.ach.points.add(1)
            },
        },
        91: {
            name: "(softcapped)",
            done() {
                return getBuyableAmount('g', 11).gte(10)
            },
            tooltip: "Get 10 levels of Album Marketing.",
            onComplete() {
                player.ach.points = player.ach.points.add(1)
            },
        },
        92: {
            name: "Lakh Seller",
            done() {
                return player.g.sales.gte(100000)
            },
            tooltip: "Reach 100,000 Album Sales.",
            onComplete() {
                player.ach.points = player.ach.points.add(1)
            },
        },
        93: {
            name: "Googologi­cally Popular",
            done() {
                return player.points.gte(new Decimal("1e100"))
            },
            tooltip: "Reach 1e100 Popularity.",
            onComplete() {
                player.ach.points = player.ach.points.add(1)
            },
        },
        94: {
            name: "Rough",
            done() {
                return player.g.views.gte(7.349e7)
            },
            tooltip: "Reach 73,490,000 Video Views.",
            onComplete() {
                player.ach.points = player.ach.points.add(1)
            },
        },
        95: {
            name: "Double Gold Play Button",
            done() {
                return player.g.subs.gte(2e6)
            },
            tooltip: "Reach 2,000,000 Subscribers.",
            onComplete() {
                player.ach.points = player.ach.points.add(1)
            },
        },
        96: {
            name: "Can't Handle that Much Songs!",
            done() {
                return player.g.points.gte(10)
            },
            tooltip: "Reach 10 GFRIEND Songs.",
            onComplete() {
                player.ach.points = player.ach.points.add(1)
            },
        },
        97: {
            name: "Platinum Record",
            done() {
                return player.g.sales.gte(250000)
            },
            tooltip: "Reach 250,000 Album Sales.",
            onComplete() {
                player.ach.points = player.ach.points.add(1)
            },
        },
        101: {
            name: "Infinity-naire",
            done() {
                return player.money.points.gte(new Decimal("1.79e308"))
            },
            tooltip: "Reach 1.79e308 Money.",
            onComplete() {
                player.ach.points = player.ach.points.add(1)
            },
        },
        102: {
            name: "[redacted]",
            done() {
                return false
            },
            tooltip: "[redacted]",
            onComplete() {
                player.ach.points = player.ach.points.add(1)
            },
        },
        103: {
            name: "[classified]",
            done() {
                return false
            },
            tooltip: "[classified]",
            onComplete() {
                player.ach.points = player.ach.points.add(1)
            },
        },
        104: {
            name: "[redacted]",
            done() {
                return false
            },
            tooltip: "[redacted]",
            onComplete() {
                player.ach.points = player.ach.points.add(1)
            },
        },
        105: {
            name: "[classified]",
            done() {
                return false
            },
            tooltip: "[classified]",
            onComplete() {
                player.ach.points = player.ach.points.add(1)
            },
        },
        106: {
            name: "[redacted]",
            done() {
                return false
            },
            tooltip: "[redacted]",
            onComplete() {
                player.ach.points = player.ach.points.add(1)
            },
        },
        107: {
            name: "[classified]",
            done() {
                return false
            },
            tooltip: "[classified]",
            onComplete() {
                player.ach.points = player.ach.points.add(1)
            },
        },
    },
    layerShown(){
        return true
    },
    doReset(resettingLayer) {
		let keep = []
		//if (layers[resettingLayer].id = '') layerDataReset("money", keep)
	},
})