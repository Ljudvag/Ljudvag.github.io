// Campaign 0 Warband Data
var campaignName = 'Template Campaign';
var overview = `Campaign 0: This is a campaign template.

<p>Stuff that needs to be added/fixed:
<li>Story Events tracking</li>
<li>Cool pixel hero for map</li>
</p>

<p>You can use HTML tags like <strong>bold</strong> and <em>italic</em>.</p>`;

var warbandResources = {
    storyPoints: 3, // Starting story points
    adventurePoints: 0, // Starting adventure points
    goldMarks: 3 // Starting gold marks
};

var stash = {
    equipmentStash: ["2 Silvertree Leaf"], 
    backpack: [""]
};

var quests = {
    active: [""],
    completed: [""]
};
var storyEvents = {
    Event1: {Name: "Better Part of Valor", Used: false},
    Event2: {Name: "A Lucky Break!", Used: false},
    Event3: {Name: "What About Old Friends?", Used: false},
    Event4: {Name: "I Don't Think That's How The Story Went...", Used: false},
    Event5: {Name: "Did I Ever Tell You How I Learned To Do This?", Used: false}
};

var warband = [
    {

        name: "", // Name of the character
        type: "", // Avatar, Hero, Follower, Dead/Retired
        notes: "", // short desciption or notes
        origin: "", // Human, Fey-blood, Duskling, Preen, Halfling, Feral
        background: "", // Frontier (Halfling, Human), Mystic (One), Noble (Human), Outsider (Fey-blood, Duskling), Townsfolk (Human, Preen, Feral), Zealot (Human)
        history: "", // Only for Avatar.
        level: 1,
        xp: 0,
        stats: { agility: 1, speed: "4\" + 3\"", combat: "+0", tough: 3, will: 0, casting: 0, luck: 0 },
        proficiencies: [""],
        // Human: "Speech +1", "Driven"
        // Fey-blood: "Wits +1", "Foresight", "Aura of Winter", "Cursed"
        // Duskling: "Traveling +1", "Brute Charge", "Oath of Life", "Distrust"
        // Preen: "Crafting +1", "Outburst","Swift-footed","Slight"
        // Halfling: "Wilderness +1", "Lucky Shot", "Slip Away", "Lacking Strength"
        // Feral: "Scouting +1", "Hunting instincts", "Loping run", "Alien"
        spells: [], // If Mystic - Pick 2 and roll 3
        equipment: [""] // Heroes: 2 Quality Weapons, 2 Basic Weapons. Max 2 Ranged.
                        // 2 partial Armor, 2 Light Armor, 1 Helmet, 1 Shield.
                        // OR: 1 Full Armor, 1 Partial Armor, 1 Light Armor
                        // Followers: Standard Weapon or Staff. Self-bow and Light weapon if not maxed out on ranged.
                        // 1 Light Armor
    }, // Don't forget to remove the comma for the last member
    // Add more members here
];
