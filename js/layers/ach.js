// SPECIAL LAYER: ACHIEVEMENTS
//
// ADDED IN 0.21
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
                        return '<h2>Achievements: '+player.ach.points+'/84 Completed</h2>' 
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
        return "Achievements<br>("+player.ach.points+"/84)"
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
            name: "First Fan",
            done() {
                return player.f.points.gte(1)
            },
            tooltip: "Reach 1 Fan.",
            onComplete() {
                player.ach.points = player.ach.points.add(1)
            },
        },
        103: {
            name: "Do We Have to Wait the Whole 15 Seconds for That?!",
            done() {
                return player.f.points.gte(2)
            },
            tooltip: "Reach 2 Fans.",
            onComplete() {
                player.ach.points = player.ach.points.add(1)
            },
        },
        104: {
            name: "Fan Club Formation",
            done() {
                return hasUpgrade('f', 11)
            },
            tooltip: "Create a fan club.",
            onComplete() {
                player.ach.points = player.ach.points.add(1)
            },
        },
        105: {
            name: "Goodbye Manual Labor",
            done() {
                return hasMilestone('f', 1)
            },
            tooltip: "Automate the process of getting Fans.",
            onComplete() {
                player.ach.points = player.ach.points.add(1)
            },
        },
        106: {
            name: "Views-plosion",
            done() {
                return hasUpgrade('f', 13)
            },
            tooltip: "Buy 3 first-row Fans upgrades.",
            onComplete() {
                player.ach.points = player.ach.points.add(1)
            },
        },
        107: {
            name: "Diamond Play Button",
            done() {
                return player.g.subs.gte(1e7)
            },
            tooltip: "Reach 10,000,000 Subscribers.",
            onComplete() {
                player.ach.points = player.ach.points.add(1)
            },
        },
        111: {
            name: "(softcapped) II",
            done() {
                return getBuyableAmount('money', 12).gte(500)
            },
            tooltip: "Get 500 levels of Video Ad.",
            onComplete() {
                player.ach.points = player.ach.points.add(1)
            },
        },
        112: {
            name: "Fans-plosion",
            done() {
                return hasUpgrade('f', 14)
            },
            tooltip: "Buy 4 first-row Fans upgrades.",
            onComplete() {
                player.ach.points = player.ach.points.add(1)
            },
        },
        113: {
            name: "One Complete Row",
            done() {
                return hasUpgrade('f', 15)
            },
            tooltip: "Buy the first row of Fans upgrades.",
            onComplete() {
                player.ach.points = player.ach.points.add(1)
            },
        },
        114: {
            name: "DDU-DU DDU-DU",
            done() {
                return player.g.views.gte(1.65e9)
            },
            tooltip: "Reach 1.65e9 Video Views.",
            onComplete() {
                player.ach.points = player.ach.points.add(1)
            },
        },
        115: {
            name: "Million Seller",
            done() {
                return player.g.sales.gte(1e6)
            },
            tooltip: "Reach 1,000,000 Album Sales.",
            onComplete() {
                player.ach.points = player.ach.points.add(1)
            },
        },
        116: {
            name: "GANGNAM STYLE",
            done() {
                return player.g.views.gte(4.124e9)
            },
            tooltip: "Reach 4.12e9 Video Views.",
            onComplete() {
                player.ach.points = player.ach.points.add(1)
            },
        },
        117: {
            name: "Multimillion Seller",
            done() {
                return player.g.sales.gte(1e7)
            },
            tooltip: "Reach 10,000,000 Album Sales.",
            onComplete() {
                player.ach.points = player.ach.points.add(1)
            },
        },
        121: {
            name: "Decent Fan Club",
            done() {
                return player.f.points.gte(10000)
            },
            tooltip: "Reach 10,000 Fans.",
            onComplete() {
                player.ach.points = player.ach.points.add(1)
            },
        },
        122: {
            name: "Big Fan Club",
            done() {
                return player.f.points.gte(1e5)
            },
            tooltip: "Reach 100,000 Fans.",
            onComplete() {
                player.ach.points = player.ach.points.add(1)
            },
        },
        123: {
            name: "BIG Fan Club",
            done() {
                return player.f.points.gte(1e6)
            },
            tooltip: "Reach 1,000,000 Fans.",
            onComplete() {
                player.ach.points = player.ach.points.add(1)
            },
        },
        124: {
            name: "Infinitely Popular",
            done() {
                return player.points.gte(new Decimal("1.79e308"))
            },
            tooltip: "Reach 1.79e308 Popularity.",
            onComplete() {
                player.ach.points = player.ach.points.add(1)
            },
        },
        125: {
            name: "PewDiePie",
            done() {
                return player.g.subs.gte(1.1e8)
            },
            tooltip: "Reach 110,000,000 Subscribers.",
            onComplete() {
                player.ach.points = player.ach.points.add(1)
            },
        },
        126: {
            name: "BIGG Fan Club",
            done() {
                return player.f.points.gte(1e8)
            },
            tooltip: "Reach 100,000,000 Fans.",
            onComplete() {
                player.ach.points = player.ach.points.add(1)
            },
        },
        127: {
            name: "Worldwide Fan Club",
            done() {
                return player.f.points.gte(7.88e9)
            },
            tooltip: "Reach 7.88e9 Fans.",
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