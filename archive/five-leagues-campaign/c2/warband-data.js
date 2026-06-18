// Campaign 2 Warband Data
var campaignName = 'Campaign Example';
var playerName = 'Player Name';
var regionName = 'Region Name';
var overview = 'Campaign 2: This is an example campaign.';

var warbandResources = {
    storyPoints: 242,
    adventurePoints: 242,
    goldMarks: 242
};

var stash = {
    equipmentStash: ["2 Staff (Fine)"],
    backpack: ["Rations", "Bandages", "Map"]
};

var quests = {
    active: ["Grab sword"],
    completed: ["It's dangerous to go alone"]
};
var contracts = {
    active: [""],
    completed: [""]
};
var friends = [""];

var storyEvents = {
    Event1: {Name: "Better Part of Valor", Used: false},
    Event2: {Name: "A Lucky Break!", Used: true},
    Event3: {Name: "What About Old Friends?", Used: false},
    Event4: {Name: "I Don't Think That's How The Story Went...", Used: true},
    Event5: {Name: "Did I Ever Tell You How I Learned To Do This?", Used: false}
};
var threats = {
    threat1: {name: "Threat 1 Name", level: 0, revealed: false},
    threat2: {name: "Threat 2 Name", level: 0, revealed: false},
    threat3: {name: "Threat 3 Name", level: 0, revealed: false}
};
var warband = [
    {
        type: "Avatar",
        name: "Brave McBravesson",
        notes: "The brave leader of the warband",
        origin: "Human",
        background: "Noble",
        level: 1,
        xp: 0,
        stats: { agility: 0, speed: "5 / +3", combat: "+0", tough: 3, luck: 0 , casting: "0", will: 0 },
        proficiencies: ["Speech +1", "Driven"],
        spells: [],
        equipment: ["Bastard Sword", "Shield", "Full Armor"]
    },
    {
        type: "Hero",
        name: "Hero McHerosson",
        notes: "Heroes are the best.",
        origin: "Duskling",
        background: "Outsider",
        level: 1,
        xp: 0,
        stats: { agility: 1, speed: "5 / +3", combat: "+1", tough: 3, luck: 0, casting: 0, will: 0 },
        proficiencies: ["Tracking +2", "Lucky"],
        spells: [],
        equipment: ["Crossbow", "Light Weapon", "Helmet","Light Armor"]
    },
    {
        type: "Follower",
        name: "Old McDonald",
        notes: "Just a farmer looking for adventure",
        origin: "Human",
        background: "Brave Villager",
        level: 1,
        xp: 0,
        stats: { agility: 1, speed: 5, combat: "+1", tough: 3, luck: 0 },
        proficiencies: ["Speech +1", "Driven"],
        spells: [],
        equipment: ["Self Bow", "Dagger", "Light Armor"]
    }
    // Add more members here
];
