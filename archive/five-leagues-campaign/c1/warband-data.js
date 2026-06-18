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
    storyPoints: 4, //3 Starting story points
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

        name: "Wilhelm von Basque",
        type: "Avatar",
        notes: "Drafted into the Witch Hunters' corps to cover up a family scandal.",
        origin: "Human",
        background: "Noble",
        history: " At his side hangs a fine sword passed down by his family.",
        level: 1,
        xp: 2,
        stats: { agility: 2, speed: "4\" + 3\"", combat: "+1", tough: 3, will: 0, casting: 0, luck: 0 },
        proficiencies: ["Speech +1", "Driven"],
        spells: [],
        equipment: ["Blackpowder Pistol","Standard Weapon (Fine)", "Partial Armor"]
    },
    {
        name: "Bella Le Gosi",
        type: "Hero",
        notes: "Exiled after accusations of robbing her late husband's grave, though nothing was ever proven.",
        origin: "Human",
        background: "Townsfolk",
        history: "",
        level: 1,
        xp: 0,
        stats: { agility: 1, speed: "6\" + 3\"", combat: "+1", tough: 3, will: 2, casting: 0, luck: 0 },
        proficiencies: ["Speech +1", "Driven", "Battlewise +2" ],
        spells: [],
        equipment: ["Crossbow Pistol","Fencing Sword", "Light Armor"]
    },
    {
        name: "Mistlefoot",
        type: "Hero",
        notes: "Cast out of his home for being caught performing an unspeakable act.",
        origin: "Halfling   ",
        background: "Frontier",
        history: "",
        level: 1,
        xp: 2,
        stats: { agility: 2, speed: "4\" + 3\"", combat: "+0", tough: 3, will: 0, casting: 0, luck: 0 },
        proficiencies: [ "Wilderness +1", "Lucky Shot", "Slip Away", "Lacking Strength"],
        spells: [],
        equipment: ["Self Bow", "Light Armor", "Helmet"]
    },
    {
        name: "Father Hammerzeit",
        type: "Hero",
        notes: "Orator and demagogue with a shadowy past.",
        origin: "Human",
        background: "Mystic",
        history: "",
        level: 1,
        xp: 1,
        stats: { agility: 1, speed: "4\" + 3\"", combat: "+0", tough: 3, will: 0, casting: "+1", luck: 0 },
        proficiencies: ["+2 Speech", "Driven"],
        spells: [],
        equipment: ["Warhammer","Shield","Light Armor","2 Congealed Strands"]
    },
    {
        name: "Jaala",
        type: "Follower",
        notes: "Intense and justified fear of cicadas.",
        origin: "Human",
        background: "Deranged Wretch",
        history: "",
        level: 1,
        xp: 0,
        stats: { agility: 1, speed: "4\" + 3\"", combat: "+0", tough: 3, will: 0, casting: 0, luck: 0 },
        proficiencies: ["Speech +1", "Driven"],
        spells: [],
        equipment: ["Standard Weapon", "Light Armor"]
    },
    {
        name: "Jebbie",
        type: "Follower",
        notes: "Once knocked out a city guard by using a fish as a cudgel.",
        origin: "Human",
        background: "Outcast Drifter",
        history: "",
        level: 1,
        xp: 0,
        stats: { agility: 1, speed: "4\" + 3\"", combat: "+0", tough: 3, will: 0, casting: 0, luck: 0 },
        proficiencies: ["Speech +1", "Driven"],
        spells: [],
        equipment: ["Standard Weapon"] 
    }
    // Add more members here
        // {

        //name: "Follower 2", // Name of the character
        //type: "Follower", // Avatar, Hero, Follower, Dead/Retired
        //notes: "", // short desciption or notes
        //origin: "Human", // Human, Fey-blood, Duskling, Preen, Halfling, Feral
        //background: "", // Roll on Follower table.
        //history: "", // Only for Avatar.
        //level: 1,
        //xp: 0,
        //stats: { agility: 1, speed: "4\" + 3\"", combat: "+0", tough: 3, will: 0, casting: 0, luck: 0 },
        //proficiencies: ["+1 Speech, Driven"],
        // Human: "Speech +1", "Driven"
        // Fey-blood: "Wits +1", "Foresight", "Aura of Winter", "Cursed"
        // Duskling: "Traveling +1", "Brute Charge", "Oath of Life", "Distrust"
        // Preen: "Crafting +1", "Outburst","Swift-footed","Slight"
        // Halfling: "Wilderness +1", "Lucky Shot", "Slip Away", "Lacking Strength"
        // Feral: "Scouting +1", "Hunting instincts", "Loping run", "Alien"
        //spells: [], // If Mystic - Pick 2 and roll 3
        //equipment: [""] 
    //}, // Don't forget to remove the comma for the last member
];
