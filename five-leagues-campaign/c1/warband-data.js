// Campaign 1 Warband Data
var campaignName = 'Wilhelms Hounds';
var playerName = 'ljudvag';
var regionName = 'Alter Erob';
var overview = `<em>The Darkest Descent</em>

<p>Stuff that needs to be added/fixed:
<li>Roll up warband. </li>
<li>Roll Campaign -starts at page 70.</li>
<li>Fix Cool pixel hero for map</li>
</p>

<p>You can use HTML tags like <strong>bold</strong> and <em>italic</em>.</p>`;

var warbandResources = {
    storyPoints: 3, //3 Starting story points
    adventurePoints: 0, // Starting adventure points
    goldMarks: 6 //3 Starting gold marks
};

var stash = {
    equipmentStash: ["2 Silvertree Leaf", "Standard Weapon"],
    backpack: [""]
};

var quests = {
    active: [""],
    completed: [""]
};
var contracts = {
    active: [""],
    completed: [""]
};
var friends = [""];

var storyEvents = {
    Event1: { Name: "Better Part of Valor", Used: false },
    Event2: { Name: "A Lucky Break!", Used: false },
    Event3: { Name: "What About Old Friends?", Used: false },
    Event4: { Name: "I Don't Think That's How The Story Went...", Used: false },
    Event5: { Name: "Did I Ever Tell You How I Learned To Do This?", Used: false }
};

var threats = {
    threat1: { name: "The Ruin Within", level: 5, revealed: false },
    threat3: { name: "The Whispers from Beyond", level: 6, revealed: false },
    threat2: { name: "The Curse of War", level: 5, revealed: false }
};

var warband = [
    {

        name: "Wilhelm von Basque", // Name of the character
        type: "Avatar", // Avatar, Hero, Follower, Dead/Retired
        notes: "", // short desciption or notes
        origin: "Human", // Human, Fey-blood, Duskling, Preen, Halfling, Feral
        background: "Noble", // Frontier (Halfling, Human), Mystic (One), Noble (Human), Outsider (Fey-blood, Duskling), Townsfolk (Human, Preen, Feral), Zealot (Human)
        history: " At his side hangs a fine sword passed down by his family.", // Only for Avatar.
        level: 1,
        xp: 2,
        stats: { agility: 2, speed: "4\" + 3\"", combat: "+1", tough: 3, will: 0, casting: 0, luck: 0 },
        proficiencies: ["Speech +1", "Driven"],
        // Human: "Speech +1", "Driven"
        // Fey-blood: "Wits +1", "Foresight", "Aura of Winter", "Cursed"
        // Duskling: "Traveling +1", "Brute Charge", "Oath of Life", "Distrust"
        // Preen: "Crafting +1", "Outburst","Swift-footed","Slight"
        // Halfling: "Wilderness +1", "Lucky Shot", "Slip Away", "Lacking Strength"
        // Feral: "Scouting +1", "Hunting instincts", "Loping run", "Alien"
        spells: [], // If Mystic - Pick 2 and roll 3
        equipment: ["Blackpowder Pistol","Standard Weapon (Fine)", "Partial Armor"] // Heroes: 2 Quality Weapons, 2 Basic Weapons. Max 2 Ranged.
        // 2 partial Armor, 2 Light Armor, 1 Helmet, 1 Shield.
        // OR: 1 Full Armor, 1 Partial Armor, 1 Light Armor
        // Followers: Standard Weapon or Staff. Self-bow and Light weapon if not maxed out on ranged.
        // 1 Light Armor
    },
    {
        name: "Caspina", // Name of the character
        type: "Hero", // Avatar, Hero, Follower, Dead/Retired
        notes: "", // short desciption or notes
        origin: "Human", // Human, Fey-blood, Duskling, Preen, Halfling, Feral
        background: "Townsfolk", // Frontier (Halfling, Human), Mystic (One), Noble (Human), Outsider (Fey-blood, Duskling), Townsfolk (Human, Preen, Feral), Zealot (Human)
        history: "", // Only for Avatar.
        level: 1,
        xp: 0,
        stats: { agility: 1, speed: "6\" + 3\"", combat: "+1", tough: 3, will: 2, casting: 0, luck: 0 },
        proficiencies: ["Speech +1", "Driven", "Battlewise +2" ],
        // Human: "Speech +1", "Driven"
        // Fey-blood: "Wits +1", "Foresight", "Aura of Winter", "Cursed"
        // Duskling: "Traveling +1", "Brute Charge", "Oath of Life", "Distrust"
        // Preen: "Crafting +1", "Outburst","Swift-footed","Slight"
        // Halfling: "Wilderness +1", "Lucky Shot", "Slip Away", "Lacking Strength"
        // Feral: "Scouting +1", "Hunting instincts", "Loping run", "Alien"
        spells: [], // If Mystic - Pick 2 and roll 3
        equipment: ["Crossbow Pistol","Fencing Sword", "Light Armor"] // Heroes: 2 Quality Weapons, 2 Basic Weapons. Max 2 Ranged.
        // 2 partial Armor, 2 Light Armor, 1 Helmet, 1 Shield.
        // OR: 1 Full Armor, 1 Partial Armor, 1 Light Armor
        // Followers: Standard Weapon or Staff. Self-bow and Light weapon if not maxed out on ranged.
        // 1 Light Armor
    },
    {
        name: "Mistlefoot", // Name of the character
        type: "Hero", // Avatar, Hero, Follower, Dead/Retired
        notes: "", // short desciption or notes
        origin: "Halfling   ", // Human, Fey-blood, Duskling, Preen, Halfling, Feral
        background: "Frontier", // Frontier (Halfling, Human), Mystic (One), Noble (Human), Outsider (Fey-blood, Duskling), Townsfolk (Human, Preen, Feral), Zealot (Human)
        history: "", // Only for Avatar.
        level: 1,
        xp: 2,
        stats: { agility: 2, speed: "4\" + 3\"", combat: "+0", tough: 3, will: 0, casting: 0, luck: 0 },
        proficiencies: [ "Wilderness +1", "Lucky Shot", "Slip Away", "Lacking Strength"],
        // Human: "Speech +1", "Driven"
        // Fey-blood: "Wits +1", "Foresight", "Aura of Winter", "Cursed"
        // Duskling: "Traveling +1", "Brute Charge", "Oath of Life", "Distrust"
        // Preen: "Crafting +1", "Outburst","Swift-footed","Slight"
        // Halfling: "Wilderness +1", "Lucky Shot", "Slip Away", "Lacking Strength"
        // Feral: "Scouting +1", "Hunting instincts", "Loping run", "Alien"
        spells: [], // If Mystic - Pick 2 and roll 3
        equipment: ["Self Bow", "Light Armor", "Helmet"] // Heroes: 2 Quality Weapons, 2 Basic Weapons. Max 2 Ranged.
        // 2 partial Armor, 2 Light Armor, 1 Helmet, 1 Shield.
        // OR: 1 Full Armor, 1 Partial Armor, 1 Light Armor
        // Followers: Standard Weapon or Staff. Self-bow and Light weapon if not maxed out on ranged.
        // 1 Light Armor
    },
    {
        name: "Father Hammerzeit", // Name of the character
        type: "Hero", // Avatar, Hero, Follower, Dead/Retired
        notes: "", // short desciption or notes
        origin: "Human", // Human, Fey-blood, Duskling, Preen, Halfling, Feral
        background: "Mystic", // Frontier (Halfling, Human), Mystic (One), Noble (Human), Outsider (Fey-blood, Duskling), Townsfolk (Human, Preen, Feral), Zealot (Human)
        history: "", // Only for Avatar.
        level: 1,
        xp: 1,
        stats: { agility: 1, speed: "4\" + 3\"", combat: "+0", tough: 3, will: 0, casting: +1, luck: 0 },
        proficiencies: ["+2 Speech", "Driven"],
        // Human: "Speech +1", "Driven"
        // Fey-blood: "Wits +1", "Foresight", "Aura of Winter", "Cursed"
        // Duskling: "Traveling +1", "Brute Charge", "Oath of Life", "Distrust"
        // Preen: "Crafting +1", "Outburst","Swift-footed","Slight"
        // Halfling: "Wilderness +1", "Lucky Shot", "Slip Away", "Lacking Strength"
        // Feral: "Scouting +1", "Hunting instincts", "Loping run", "Alien"
        spells: [], // If Mystic - Pick 2 and roll 3
        equipment: ["Warhammer","Shield","Light Armor","2 Congealed Strands"] // Heroes: 2 Quality Weapons, 2 Basic Weapons. Max 2 Ranged.
        // 2 partial Armor, 2 Light Armor, 1 Helmet, 1 Shield.
        // OR: 1 Full Armor, 1 Partial Armor, 1 Light Armor
        // Followers: Standard Weapon or Staff. Self-bow and Light weapon if not maxed out on ranged.
        // 1 Light Armor
    },
    {
        name: "Jaala", // Name of the character
        type: "Follower", // Avatar, Hero, Follower, Dead/Retired
        notes: "", // short desciption or notes
        origin: "Human", // Human, Fey-blood, Duskling, Preen, Halfling, Feral
        background: "Deranged Wretch", // Frontier (Halfling, Human), Mystic (One), Noble (Human), Outsider (Fey-blood, Duskling), Townsfolk (Human, Preen, Feral), Zealot (Human)
        history: "", // Only for Avatar.
        level: 1,
        xp: 0,
        stats: { agility: 1, speed: "4\" + 3\"", combat: "+0", tough: 3, will: 0, casting: 0, luck: 0 },
        proficiencies: ["Speech +1", "Driven"],
        // Human: "Speech +1", "Driven"
        // Fey-blood: "Wits +1", "Foresight", "Aura of Winter", "Cursed"
        // Duskling: "Traveling +1", "Brute Charge", "Oath of Life", "Distrust"
        // Preen: "Crafting +1", "Outburst","Swift-footed","Slight"
        // Halfling: "Wilderness +1", "Lucky Shot", "Slip Away", "Lacking Strength"
        // Feral: "Scouting +1", "Hunting instincts", "Loping run", "Alien"
        spells: [], // If Mystic - Pick 2 and roll 3
        equipment: ["Standard Weapon", "Light Armor"] // Heroes: 2 Quality Weapons, 2 Basic Weapons. Max 2 Ranged.
        // 2 partial Armor, 2 Light Armor, 1 Helmet, 1 Shield.
        // OR: 1 Full Armor, 1 Partial Armor, 1 Light Armor
        // Followers: Standard Weapon or Staff. Self-bow and Light weapon if not maxed out on ranged.
        // 1 Light Armor
    }, // Don't forget to remove the comma for the last member
    {
        name: "Jebbie", // Name of the character
        type: "Follower", // Avatar, Hero, Follower, Dead/Retired
        notes: "", // short desciption or notes
        origin: "Human", // Human, Fey-blood, Duskling, Preen, Halfling, Feral
        background: "Outcast Drifter", // Frontier (Halfling, Human), Mystic (One), Noble (Human), Outsider (Fey-blood, Duskling), Townsfolk (Human, Preen, Feral), Zealot (Human)
        history: "", // Only for Avatar.
        level: 1,
        xp: 0,
        stats: { agility: 1, speed: "4\" + 3\"", combat: "+0", tough: 3, will: 0, casting: 0, luck: 0 },
        proficiencies: ["Speech +1", "Driven"],
        // Human: "Speech +1", "Driven"
        // Fey-blood: "Wits +1", "Foresight", "Aura of Winter", "Cursed"
        // Duskling: "Traveling +1", "Brute Charge", "Oath of Life", "Distrust"
        // Preen: "Crafting +1", "Outburst","Swift-footed","Slight"
        // Halfling: "Wilderness +1", "Lucky Shot", "Slip Away", "Lacking Strength"
        // Feral: "Scouting +1", "Hunting instincts", "Loping run", "Alien"
        spells: [], // If Mystic - Pick 2 and roll 3
        equipment: ["Standard Weapon"] // Heroes: 2 Quality Weapons, 2 Basic Weapons. Max 2 Ranged.
        // 2 partial Armor, 2 Light Armor, 1 Helmet, 1 Shield.
        // OR: 1 Full Armor, 1 Partial Armor, 1 Light Armor
        // Followers: Standard Weapon or Staff. Self-bow and Light weapon if not maxed out on ranged.
        // 1 Light Armor
    } // Don't forget to remove the comma for the last member
    // Add more members here
];
