/*

 @name    : 锅巴汉化 - Web汉化插件
 @author  : 麦子、JAR、小蓝、好阳光的小锅巴
 @version : V0.6.1 - 2019-07-09
 @website : http://www.g8hh.com
 @idle games : http://www.gityx.com
 @QQ Group : 627141737

*/

//1.汉化杂项
var cnItems = {
    _OTHER_: [],

    //未分类：
    'Save': '保存',
    'Export': '导出',
    'Import': '导入',
    'Settings': '设置',
    'Achievements': '成就',
    'Statistics': '统计',
    'Changelog': '更新日志',
    'Hotkeys': '快捷键',
    'ALL': '全部',
    'Default': '默认',
    'AUTO': '自动',
    'default': '默认',
    "points": "点数",
    "Reset for +": "重置得到 + ",
    "Currently": "当前",
    "Effect": "效果",
    "Cost": "成本",
    "Goal:": "目标:",
    "Reward": "奖励",
    "Start": "开始",
    "Exit Early": "提前退出",
    "Finish": "完成",
    "Milestone Gotten!": "获得里程碑！",
    "Milestones": "里程碑",
    "Completed": "已完成",
    "Achievement Gotten!": "成就达成！",
    "Begin": "开端",
    "Currently:": "当前：",
    "Earn Money based on Popularity.": "根据人气赚钱。",
    "Popularity": "人气",
    "Awareness": "认知",
    "Chapter 1 - The Event that Started Everything": "第 1 章 - 一切开始的事件",
    "Money": "金钱",
    "Story": "故事",
    "You've Gotta Start Somewhere": "你必须从某个地方开始",
    "Ach": "成就",
    "Maybe I Should Use Adblock...": "也许我应该使用 广告拦截插件...",
    "Million Seller": "百万卖家",
    "Million­aire": "百万富翁",
    "Monetize your Channel.": "通过您的频道获利。",
    "Money gain is multiplied by the number of Money upgrades bought plus 1.16.": "金钱收益乘以购买的金钱升级数量加上 1.16。",
    "Multimillion Seller": "数百万卖家",
    "Myriad Seller": "无数卖家",
    "One Complete Row": "一个完整的行",
    "One Hundred is a Lot": "一百是很多",
    "Own a Company": "拥有一家公司",
    "PewDiePie": "皮尤派",
    "Platinum Record": "白金唱片",
    "POP=GFRD": "POP=GFRD",
    "Popularity gain is multiplied by the number of Money upgrades bought plus 1.16.": "人气增益乘以购买的金钱升级数量加上 1.16。",
    "Prime Popularity": "主要人气",
    "Re-debut GFRIEND.": "重新出道 GFRIEND。",
    "Rough": "粗糙的",
    "Second Song": "第二首歌",
    "Sextillion­aire": "六亿富翁",
    "Silver Play Button": "银色播放按钮",
    "Spend your first bit of Money.": "花你的第一笔钱。",
    "Start Getting Popular": "开始流行",
    "Ten isn't a Lot": "十不是很多",
    "The Slowest 30 Seconds Ever": "史上最慢的 30 秒",
    "Thousand Seller": "千卖家",
    "Thousand­aire": "千富翁",
    "To Re-debut and Beyond!": "重新出道和超越！",
    "Trillion­aire": "亿万富翁",
    "Try Not to Crash": "尽量不要崩溃",
    "Two-hand Popularity Punch": "两手人气拳",
    "Unlock Albums.": "解锁相册。",
    "Video Ad is Too OP Now": "视频广告现在太 OP",
    "Views-plosion": "视图-爆炸",
    "Vigintillio­­naire": "亿万富翁",
    "World Population": "世界人口",
    "World World Population": "世界 世界人口",
    "World^4 Population": "世界^4人口",
    "Worldwide Fan Club": "全球粉丝俱乐部",
    "You do what for a living?!": "你靠什么谋生？！",
    "You Forgot to Buff that!": "你忘了抛光那个！",
    "You Have One!": "你有一个！",
    "Age of Automation": "自动化时代",
    "Albums are OP Now": "专辑现在 OP",
    "Automate the process of getting Fans.": "自动化获取粉丝的过程。",
    "Big 20": "大 20",
    "Big Fan Club": "大粉丝俱乐部",
    "BIG Fan Club": "大粉丝俱乐部",
    "BIGG Fan Club": "BIGG粉丝俱乐部",
    "Billion­aire": "亿万富翁",
    "Buy the first row of Fans upgrades.": "购买第一排风扇升级。",
    "Can't Handle that Much Songs!": "无法处理那么多歌曲！",
    "Compose 4 GFRIEND Songs to unlock autobuying of Money buyables.": "创作 4 首 GFRIEND 歌曲以解锁 Money Buyables 的自动购买。",
    "Create a fan club.": "创建一个粉丝俱乐部。",
    "CSJH The Grace": "CSJH 恩典",
    "DDU-DU DDU-DU": "DDU-DU DDU-DU",
    "Decent Fan Club": "体面的粉丝俱乐部",
    "Decillion­aire": "亿万富翁",
    "Diamond Play Button": "钻石播放按钮",
    "Do We Have to Wait the Whole 15 Seconds for That?!": "我们必须等待整整 15 秒吗？",
    "Double Decker": "双层",
    "Double Gold Play Button": "双金播放按钮",
    "Double Silver Play Button": "双银播放按钮",
    "External Funding Site": "外部资助网站",
    "Extra Popular": "特别受欢迎",
    "Fan Club Formation": "粉丝俱乐部的形成",
    "Fans-plosion": "粉丝爆炸",
    "Final Frontier": "最终边界",
    "First Album": "第一张专辑",
    "Funding Site": "赞助网站",
    "Campaign": "活动",
    "Popularity gain is multiplied x1.5 for every Money upgrade bought.": "每购买一次金钱升级，人气增益将乘以 x1.5。",
    "Popularity gain is raised ^1.025 for every Money upgrade bought, if it is above 1.": "每购买一次金钱升级，人气提升 ^1.025，如果高于 1。",
    "Yet Another Popularity Upgrade": "又一次人气升级",
    "First Fan": "第1个粉丝",
    "First Song": "第1首歌",
    "Five Finger Popularity Punch": "五指人气拳",
    "Found a business.": "找到了生意。",
    "Funding Possible?": "资金可能吗？",
    "GANGNAM STYLE": "江南Style",
    "Gargoogol­aire": "Gargoogol­aire",
    "Get 1 level of Investment.": "获得 1 级投资。",
    "Get 1 Subscriber.": "获得 1 个订阅者。",
    "Get 1 Video View.": "获得 1 次视频观看。",
    "Get 10 levels of Album Marketing.": "获得 10 个级别的专辑营销。",
    "Get 2 levels of Album Promotion.": "获得 2 个级别的专辑促销。",
    "Get 20 levels of Investment.": "获得 20 级投资。",
    "Get 500 levels of Video Ad.": "获得 500 个级别的视频广告。",
    "Get at least 1,000,000x bonus from Investment.": "从投资中获得至少 1,000,000 倍的奖金。",
    "Get at least 1,000,000x bonus from Video Ad.": "从视频广告中获得至少 1,000,000 倍的奖金。",
    "Get at least 1e12x bonus from Investment.": "从投资中获得至少 1e12x 的红利。",
    "You're on the 'Tube!": "你在'Tube上",
    "GFRIEND Average Height": "GFRIEND平均身高",
    "GFRIEND Debut Year": "GFRIEND出道年份",
    "Gold Play Button": "金色播放按钮",
    "Goodbye Manual Labor": "再见体力劳动",
    "Googolaire": "Googolaire",
    "Googologi­cally Popular": "Googologically 流行",
    "Have 3 Songs and Prosper": "拥有 3 首歌曲和繁荣",
    "Have more than 1 Popularity.": "拥有超过 1 的人气。",
    "I Hit the Button!": "我按下按钮！",
    "Infinitely Popular": "无限受欢迎",
    "Infinity-naire": "无穷大",
    "Investment is Even More OP Now": "投资现在更加开放",
    "Investment is OP Now": "投资现在是OP",
    "Investment is Too OP Now": "现在投资太OP了",
    "Investment is Too OP^2 Now": "现在投资太OP^2",
    "Korean Population": "韩国人口",
    "Lakh Seller": "十万卖家",
    "Lucky Number": "幸运数字",
    "Make Money!": "挣钱！",
    "Make your first Ad.": "制作您的第一个广告。",
    "Make your first Video Ad.": "制作您的第一个视频广告。",
    "also boosts Money gain.": "还可以提高金钱收益。",
    "Banner Ad": "横幅广告",
    "Cost:": "成本：",
    "effect is raised ^1.25.": "效果提升 ^1.25。",
    "Effect:": "影响：",
    "Level:": "等级：",
    "Unlock the first Money buyable.": "解锁第一个可购买的金钱。",
    "Unlock the second Money buyable.": "解锁第二个可购买的金钱。",
    "Video Ad": "视频广告",
    "Advertisements": "广告",
    "Found a Business": "创立公司",
    "Unlock the third Money buyable.": "解锁第三个金钱可购买。",
    "and": "和",
    "Attract Investors": "吸引投资者",
    "buyables.": "可购买。",
    "Investment": "投资",
    "is stronger based on the levels of": "更强基于等级",
    "Conceptualize": "概念化",
    "levels directly boost": "等级直接提升",
    "effect base is increased by 0.1.": "效果基础增加0.1。",
    "Prepare": "准备",
    "First Business": "第一笔生意",
    "Re-debut GFRIEND": "重新出道 GFRIEND",
    "Unlock a new layer.": "解锁一个新层",
    "Requires 27 levels of": "需要 27 级的 ",
    "Autobuy Money buyables.": "自动购买金钱可购买",
    "boosting Popularity and Money gain by": "提高人气和金钱收益",
    "GFRIEND Songs": "GFRIEND 歌曲",
    "Main": "主界面",
    "Money is reduced by the requirement when producing GFRIEND Songs.": "制作 GFRIEND 歌曲时，需要减少金钱。",
    "Produce +": "生产 +",
    "Unlock a second Album buyable.": "解锁第二张专辑可购买。",
    "Unlock Streaming.": "解锁流媒体。",
    "Earn Views based on GFRIEND Songs.": "根据 GFRIEND 歌曲获得观看次数。",
    "Softcapped at 1,000,000 views/sec.": "软上限为 1,000,000 次观看/秒。",
    "Streaming": "流媒体",
    "Upload First Video": "上传第一个视频",
    "Earn Subscribers based on Views growth rate.": "根据浏览量增长率赚取订阅者。",
    "Softcapped at 1,000 subs/sec.": "软上限为 1,000 次订阅/秒。",
    "Subscription": "订阅",
    "Promotion": "推广",
    "Subscribers boost Popularity gain.": "订阅者提高了人气。",
    "GFRIEND Songs boost Popularity gain.": "GFRIEND 歌曲提升人气。",
    "Streaming Power": "流媒体力量",
    "Monetization": "货币化",
    "Views boost Money gain.": "播放量提升金钱增益",
    "Banner Ad Enhancement": "横幅广告增强",
    "Video Ad Enhancement": "视频广告增强",
    "effect base is increased by 0.01 for every Streaming upgrade bought.": "每购买一个流媒体升级，效果基础就会增加 0.01。",
    "effect exponent is increased by 0.05 for every Streaming upgrade bought.": "每购买一个流媒体升级，效果指数就会增加 0.05。",
    "Album Marketing": "专辑营销",
    "Albums": "专辑",
    "level (additive).": "等级（附加）。",
    "More Views": "更多观点",
    "Multiply Popularity gain by 9, before all other boosts.": "在所有其他提升之前，将人气增益乘以 9。",
    "Multiply Popularity gain by 99.": "将人气增益乘以 99。",
    "Streaming Investment": "流媒体投资",
    "Yet Another Streaming Upgrade": "又一次流媒体升级",
    "You get 1% more views for every": "每增加 1% 的观看次数",
    "You get 10% more views for every Streaming upgrade bought (additive).": "每购买一次流媒体升级（附加），您的观看次数就会增加 10%。",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "You have just requested a business registration. It seems that it will take up to 5 days to complete the registration. You were proud of yourself seeing your campaign grow. Having a proper business would further help your project expand. The story of your project was posted on the online BUDDY community.": "您刚刚申请了商业登记。 完成注册似乎最多需要5天。 你为自己看到你的竞选活动增长感到自豪。 拥有适当的业务将进一步帮助您的项目扩展。 您的项目故事已发布在在线 BUDDY 社区上。",
    "You have just set up your first advertisement! Although it is a simple banner, having an advertisement means that more BUDDYs will be aware of you and your project. You hope that you will soon get the profits via the ad hosting service. Meanwhile, BUDDYs were furious about Source Music trying to illegally refund the membership with virtual currency which can only be used in their online goods shop.": "您刚刚设置了您的第一个广告！ 虽然是一个简单的横幅，但有广告意味着更多的 BUDDY 会了解您和您的项目。 您希望您很快就能通过广告托管服务获得利润。 同时，BUDDY 对 Source Music 试图以只能在其在线商品商店使用的虚拟货币非法退还会员资格感到愤怒。",
    "The next day, you started planning for the campaigns on Youtube and other platforms. Hours later, you found out that the video of the Campaign has gotten hundreds of views. Someone was interested in your campaign! Meanwhile, BUDDYs were still angry about the two infamous companies for not giving proper information about the disbandment to them.": "第二天，您开始计划 Youtube 和其他平台上的活动。 几个小时后，您发现该活动的视频已获得数百次观看。 有人对您的广告系列感兴趣！ 与此同时，BUDDYs 仍然对这两家臭名昭著的公司没有向他们提供有关解散的适当信息感到愤怒。",
    "Thinking that money could solve anything, you opened your favorite IDE and started making a site for funding GFRIEND for its re-debut. The creation of the new funding site needed hours of work, but you thought that it was a great step towards the re-debut of GFRIEND. It could also be a chance for you to be more recognized by the world. You were so tired that you immediately went to sleep with feelings of satisfaction, sadness and anger combined.": "认为金钱可以解决任何问题，你打开了你最喜欢的 IDE，并开始制作一个网站来资助 GFRIEND 的重新出道。 创建新的资助网站需要数小时的工作，但您认为这是朝着 GFRIEND 重新出道迈出的一大步。 这也可能是你被世界更多认可的机会。 你太累了，立刻带着满足、悲伤和愤怒的感觉入睡。",
    "Youtube Account": "Youtube账号",
    "You heard that GFRIEND has disbanded. You felt you couldn't do anything, and thought that you lost the motivation to live. On the other side, you were also angry about Source Music. The infamous company announced that GFRIEND was going to disband just 4 days before the disbandment. Many BUDDYs (GFRIEND fans) started to hate Source Music and HYBE.": "听说GFRIEND解散了。 你觉得自己什么都做不了，觉得自己失去了活下去的动力。 另一方面，您也对 Source Music 感到愤怒。 这家臭名昭著的公司宣布，GFRIEND 将在解散前 4 天解散。 许多 BUDDY（GFRIEND 粉丝）开始讨厌 Source Music 和 HYBE。",
    "On May 22, 2021, GFRIEND, South Korea's 6-member K-POP girl group from Source Music, disbanded after 2,319 days of activity. GFRIEND has been a nation-wide sensation since 2015, and has become a very popular group by successes of 14 albums, such as Flower Bud, Snowflake, LOL, Time for the moon night, and many more. Recent disbandment of GFRIEND has put many K-POP fans in Korea and other countries in a massive panic.": "2021年5月22日，来自Source Music的韩国6人K-POP女团GFRIEND在活动2319天后解散。 GFRIEND自2015年起风靡全国，以《Flower Bud,》、《Snowflake》、《LOL》、《Time for the moon night》等14张专辑的成功而成为非常受欢迎的组合。 最近GFRIEND的解散让韩国和其他国家的许多K-POP粉丝陷入了巨大的恐慌。",
    "Current Endgame: 1e1180 Money": "当前残局：1e1180 金钱",
    // 图标代码，不能汉化
    "Jacorb's Games": "Jacorb's Games",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "By Jacorb90": "By Jacorb90",
    "content_copy": "content_copy",
    "library_books": "library_books",
    "discord": "discord",
    "drag_handle": "drag_handle",
    "edit": "edit",
    "forum": "forum",
    "content_paste": "content_paste",
    "delete": "delete",
    "info": "info",
    "settings": "settings",

    //树游戏
    'Loading...': '加载中...',
    'ALWAYS': '一直',
    'HARD RESET': '硬重置',
    'Export to clipboard': '导出到剪切板',
    'INCOMPLETE': '不完整',
    'HIDDEN': '隐藏',
    'AUTOMATION': '自动',
    'NEVER': '从不',
    'ON': '打开',
    'OFF': '关闭',
    'SHOWN': '显示',
    'Play Again': '再次游戏',
    'Keep Going': '继续',
    'The Modding Tree Discord': '模型树Discord',
    'You have': '你有',
    'It took you {{formatTime(player.timePlayed)}} to beat the game.': '花费了 {{formatTime(player.timePlayed)}} 时间去通关游戏.',
    'Congratulations! You have reached the end and beaten this game, but for now...': '恭喜你！ 您已经结束并通关了本游戏，但就目前而言...',
    'Main Prestige Tree server': '主声望树服务器',
    'Reach {{formatWhole(ENDGAME)}} to beat the game!': '达到 {{formatWhole(ENDGAME)}} 去通关游戏!',
    "Loading... (If this takes too long it means there was a serious error!": "正在加载...（如果这花费的时间太长，则表示存在严重错误！",
    'Loading... (If this takes too long it means there was a serious error!)←': '正在加载...（如果时间太长，则表示存在严重错误！）←',
    'Main\n\t\t\t\tPrestige Tree server': '主\n\t\t\t\t声望树服务器',
    'The Modding Tree\n\t\t\t\t\t\t\tDiscord': '模型树\n\t\t\t\t\t\t\tDiscord',
    'Please check the Discord to see if there are new content updates!': '请检查 Discord 以查看是否有新的内容更新！',
    'aqua': '水色',
    'AUTOMATION, INCOMPLETE': '自动化，不完整',
    'LAST, AUTO, INCOMPLETE': '最后，自动，不完整',
    'NONE': '无',
    'P: Reset for': 'P: 重置获得',
    'Git游戏': 'Git游戏',
    'QQ群号': 'QQ群号',
    'x': 'x',
    'QQ群号:': 'QQ群号:',
    '* 启用后台游戏': '* 启用后台游戏',
    '更多同类游戏:': '更多同类游戏:',
    '': '',
    '': '',
    '': '',

}


//需处理的前缀
var cnPrefix = {
    "\n": "",
    "                   ": "",
    "                  ": "",
    "                 ": "",
    "                ": "",
    "               ": "",
    "              ": "",
    "             ": "",
    "            ": "",
    "           ": "",
    "          ": "",
    "         ": "",
    "        ": "",
    "       ": "",
    "      ": "",
    "     ": "",
    "    ": "",
    "   ": "",
    "  ": "",
    " ": "",
    //树游戏
    "\t\t\t": "\t\t\t",
    "\n\n\t\t": "\n\n\t\t",
    "\n\t\t": "\n\t\t",
    "\t": "\t",
    "Show Milestones: ": "显示里程碑：",
    "Autosave: ": "自动保存: ",
    "Offline Prod: ": "离线生产: ",
    "Completed Challenges: ": "完成的挑战: ",
    "High-Quality Tree: ": "高质量树贴图: ",
    "Offline Time: ": "离线时间: ",
    "Theme: ": "主题: ",
    "Anti-Epilepsy Mode: ": "抗癫痫模式：",
    "In-line Exponent: ": "直列指数：",
    "Single-Tab Mode: ": "单标签模式：",
    "Time Played: ": "已玩时长：",
    "Shift-Click to Toggle Tooltips: ": "Shift-单击以切换工具提示：",
    "GFRIEND Disbandment": "GFRIEND 解散",
    "(softcapped)": "(软上限)",
    "Advertising ": "广告 ",
    "Album Sales boost Popularity and Money gain by ": "专辑销售提升人气和金钱收益 ",
    "Multiply Popularity gain by ": "将人气增益乘以 ",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
}

//需处理的后缀
var cnPostfix = {
    "                   ": "",
    "                  ": "",
    "                 ": "",
    "                ": "",
    "               ": "",
    "              ": "",
    "             ": "",
    "            ": "",
    "           ": "",
    "          ": "",
    "         ": "",
    "        ": "",
    "       ": "",
    "      ": "",
    "     ": "",
    "    ": "",
    "   ": "",
    "  ": "",
    " ": " ",
    "\n": "",
    "\n\t\t\t": "\n\t\t\t",
    "\t\t\n\t\t": "\t\t\n\t\t",
    "\t\t\t\t": "\t\t\t\t",
    "\n\t\t": "\n\t\t",
    "\t": "\t",
    "x Popularity and Money gain": "x 人气和金钱增益",
    "x Popularity gain": "x 人气增益",
    "x Money gain": "x 金钱增益",
    "x Subscriber Gain.": "x 订阅增益.",
    " Album Sales/sec": " 专辑销售/秒",
    "": "",
    "": "",
}

//需排除的，正则匹配
var cnExcludeWhole = [
    /^(\d+)$/,
    /^\s*$/, //纯空格
    /^([\d\.]+):([\d\.]+)$/,
    /^([\d\.]+):([\d\.]+):([\d\.]+)$/,
    /^([\d\.]+)\-([\d\.]+)\-([\d\.]+)$/,
    /^([\d\.]+)e(\d+)$/,
    /^([\d\.]+)$/,
    /^([\d\.]+):([\d\.]+):([\d\.]+)$/,
    /^([\d\.]+)K$/,
    /^([\d\.]+)M$/,
    /^([\d\.]+)B$/,
    /^([\d\.]+) K$/,
    /^([\d\.]+) M$/,
    /^([\d\.]+) B$/,
    /^([\d\.]+)s$/,
    /^([\d\.]+)x$/,
    /^x([\d\.]+)$/,
    /^([\d\.,]+)$/,
    /^\+([\d\.,]+)$/,
    /^\-([\d\.,]+)$/,
    /^([\d\.,]+)x$/,
    /^x([\d\.,]+)$/,
    /^([\d\.]+)e([\d\.,]+)$/,
    /^e([\d\.]+)e([\d\.,]+)$/,
    /^x([\d\.]+)e([\d\.,]+)$/,
    /^([\d\.]+)e([\d\.,]+)x$/,
    /^[\u4E00-\u9FA5]+$/
];
var cnExcludePostfix = [
]

//正则替换，带数字的固定格式句子
//纯数字：(\d+)
//逗号：([\d\.,]+)
//小数点：([\d\.]+)
//原样输出的字段：(.+)
//换行加空格：\n(.+)
var cnRegReplace = new Map([
    [/^([\d\.]+) hours ([\d\.]+) minutes ([\d\.]+) seconds$/, '$1 小时 $2 分钟 $3 秒'],
    [/^You are gaining (.+) elves per second$/, '你每秒获得 $1 精灵'],
    [/^You are earning (.+) Money per second$/, '您每秒赚取 $1 金钱'],
    [/^Achievements: (.+) Completed$/, '成就: $1 已完成'],
    [/^Requires (.+) Subscribers.$/, '需要 $1 订阅者。'],
    [/^Requires (.+) Views.$/, '需要 $1 播放。'],
    [/^Reach (.+) Album Sales.$/, '达到 $1 专辑销售。'],
    [/^Reach (.+) Popularity.$/, '达到 $1 人气。'],
    [/^Reach (.+) Video Views.$/, '达到 $1 视频播放。'],
    [/^Reach (.+) Money.$/, '达到 $1 金钱。'],
    [/^Reach (.+) GFRIEND Songs.$/, '达到 $1 GFRIEND 歌曲。'],
    [/^Reach (.+) Fan.$/, '达到 $1 粉丝。'],
    [/^Reach (.+) Fans.$/, '达到 $1 粉丝。'],
    [/^Reach (.+) Subscribers.$/, '达到 $1 订阅。'],
    [/^Buy (.+) first-row Fans upgrades.$/, '购买 $1 个第一行粉丝升级。'],
    [/^Gain (.+) Popularity per second.$/, '每秒获得 $1 人气。'],
    [/^Compose (.+) GFRIEND Song.$/, '创作 $1 首 GFRIEND 歌曲。'],
    [/^Compose (.+) GFRIEND Songs.$/, '创作 $1 首 GFRIEND 歌曲。'],
    [/^Buy the (.+)th Money upgrade.$/, '购买第 $1 个金钱 升级。'],
    [/^Buy the (.+)th Money Upgrade.$/, '购买第 $1 个金钱 升级。'],
    [/^You have (.+) Subscribers$/, '你有 $1 订阅者'],
    [/^You have (.+) Video Views$/, '你有 $1 视频播放'],
    [/^You have (.+) Album Sales$/, '你有 $1 专辑销售'],
    [/^You have (.+) Money$/, '你有 $1 金钱'],
    [/^You have (.+) Popularity$/, '你有 $1 人气'],
    [/^You have (.+) points$/, '你有 $1 点数'],
    [/^Next at (.+) points$/, '下一个在 $1 点数'],
	[/^\((.+)\/sec\)$/, '（$1\/秒）'],
	[/^([\d\.]+)\/sec$/, '$1\/秒'],
	[/^([\d\.]+)\/s$/, '$1\/秒'],
	[/^([\d\.]+)e([\d\.,]+)\/s$/, '$1e$2\/秒'],
	[/^([\d\.,]+)\/sec$/, '$1\/秒'],
	[/^([\d\.,]+)\/s$/, '$1\/秒'],
	[/^([\d\.,]+) OOMs\/sec$/, '$1 OOMs\/秒'],
	[/^([\d\.]+) OOMs\/sec$/, '$1 OOMs\/秒'],
	[/^([\d\.]+)e([\d\.,]+)\/sec$/, '$1e$2\/秒'],
    [/^requires ([\d\.]+) more research points$/, '需要$1个研究点'],
    [/^([\d\.]+)e([\d\.,]+) points$/, '$1e$2 点数'],
    [/^([\d\.]+) elves$/, '$1 精灵'],
    [/^([\d\.]+)d ([\d\.]+)h ([\d\.]+)m$/, '$1天 $2小时 $3分'],
    [/^([\d\.]+)e([\d\.,]+) Money$/, '$1e$2 金钱'],
    [/^([\d\.]+)e([\d\.,]+) elves$/, '$1e$2 精灵'],
    [/^([\d\.,]+) GFRIEND Songs$/, '$1 GFRIEND 歌曲'],
    [/^([\d\.,]+) Money$/, '$1 钱'],
    [/^\+(.+) to base$/, '\+$1 到基数'],
    [/^\+(.+) to exponent$/, '\+$1 到指数'],
    [/^\*(.+) to electricity gain$/, '\*$1 到电力增益'],
    [/^Cost: (.+) Money$/, '成本：$1 金钱'],
    [/^Cost: (.+) points$/, '成本：$1 点数'],
    [/^Req: (.+) elves$/, '要求：$1 精灵'],
    [/^Req: (.+) \/ (.+) Money$/, '要求：$1 \/ $2 金钱'],
    [/^Usages: (\d+)\/$/, '用途：$1\/'],
    [/^workers: (\d+)\/$/, '工人：$1\/'],

]);