// SPECIAL LAYER: STORY
//
// ADDED IN 0.20
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
            },
        },
        "III": {
            content: [
                ["display-text",
                    function() { 
                        return '<h2>Chapter 3 - Expanding the Fanbase</h2>' 
                    },
                    { 
                        "color": "#dfdfdf"
                    }],
                "blank",
                ["infobox", "fifteen"],
            ],
            unlocked() {
                return player.money.best.gte(new Decimal("1.79e308"))
            },
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
                let text = "Your channel just reached 100,000 subscribers. You got the silver play button from Youtube. 100,000 subscriber is a big milestone in the road to the channel's success. Now let's aim for 1,000,000 subscribers and beyond!"
                return text
            },
            unlocked() {
                return player.g.subs.gte(100000)
            },
        },
        fifteen: {
            title: "First Fan",
            body() {
                let text = "You have just attracted the group's first fan. As with the previous groups, fans will be the key to further influence growth."
                return text
            },
            unlocked() {
                return player.f.points.gte(1)
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