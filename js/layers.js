addLayer("money", {
    name: "Money", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "$", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(1),
        ps: new Decimal(0),
        auto: false,
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
                return new Decimal(10000).times(new Decimal(1.55).pow(x.pow(1.05)))
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
                return new Decimal(160000).times(new Decimal(3.1).pow(x.pow(1.05)))
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
                return base.pow(x)
            },
            unlocked() {
                return hasUpgrade('money', 24)
            },
        },
        13: {
            title: "Investment",
            cost(x) {
                return new Decimal(1e9).times(new Decimal(4.65).pow(x.pow(1.05)))
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
        player.money.ps = gain
        player.money.points = player.money.points.add(gain.times(diff))
    },
    automate(diff){
        if (hasMilestone('g', 2) && player.money.auto){
          if (hasUpgrade('money', 31)) tmp.money.buyables[13].buy()
          if (hasUpgrade('money', 24)) tmp.money.buyables[12].buy()
          if (hasUpgrade('money', 22)) tmp.money.buyables[11].buy()
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
                        if (player.g.views.gte(1000)) format(player.g.views, 2)
                        return 'You have ' + format(player.g.views, 0) + ' Video Views' 
                    },
                    { 
                        "color": "#dfdfdf"
                    }],
                ["display-text",
                    function() {
                        if (player.g.subs.gte(1000)) format(player.g.subs, 2)
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
            toggles: [['money', 'auto']],
        },
    },
    upgrades: { // Streaming
        11: {
            title: "Upload First Video",
            description: "Earn Views based on GFRIEND Songs.",
            cost() {
                return new Decimal(1e37)
            },
            currencyDisplayName: "Money",
            currencyInternalName: "points",
            currencyLayer: "money",
            effect() {
                return new Decimal(3).pow(player.g.points)
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
            description: "Earn Subscribers based on Views growth rate.<br>Requires 100 Views.",
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
            description: "GFRIEND Songs boost Popularity gain.<br>Requires 250 Subscribers.",
            cost() {
                return new Decimal(1e49)
            },
            currencyDisplayName: "Money",
            currencyInternalName: "points",
            currencyLayer: "money",
            canAfford() {
                return player.g.subs.gte(250)
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
            description: "<b>Banner Ad</b> effect exponent is raised by 0.05 for every Streaming upgrade bought.",
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
            description: "<b>Video Ad</b> effect base is raised by 0.01 for every Streaming upgrade bought.",
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
    },
    layerShown(){
        return hasUpgrade('money', 35) || player.g.unlocked
    },
    onPrestige() {
        player.money.points = player.money.points.sub(tmp.g.nextAt)
    },
    update(diff) {
        if (hasUpgrade('g', 11)) player.g.views = player.g.views.add(upgradeEffect('g', 11).times(diff))
        if (hasUpgrade('g', 12)) player.g.subs = player.g.subs.add(upgradeEffect('g', 12).times(diff))
    },
    doReset(resettingLayer) {
		let keep = []
		//if (layers[resettingLayer].id = '') layerDataReset("money", keep)
	},
})
addLayer("story", {
    name: "Story", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "📘", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
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
                let text = "On May 22, 2021, GFRIEND, South Korea's 6-member K-POP girl group from Source Music, disbanded after 2,319 days of activity. GFRIEND has been a nation-wide sensation since 2015, and has become a very popular group by successes of 14 albums, such as Flower Bud, Snowflake, LOL, Time for the moon night, and many more. Recent disbandment of GFRIEND has put many K-POP fans in Korea and other countries in a massive shock."
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
            title: "STORY #13",
            body() {
                let text = "??????"
                return text
            },
            unlocked() {
                return false
            },
        },
        fourteen: {
            title: "STORY #14",
            body() {
                let text = "??????"
                return text
            },
            unlocked() {
                return false
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