// Define all tooltips in one place
const tooltips = {
    // Resources
    'Story Points': 'Page 58, add this later.',
    'Adventure Points': 'These represent the efforts of your warband in exploring and uncovering the secrets of the land and will help you progress in various ways.',

    
    // Origin   
    // 'Human': 'Just a plain human.',

    // Stats
    'Will': 'Spend to:&#10;* Move 4&quot; extra during normal Move. &#10;* Activate in Quick Actions Phase &#10; * Remove Stunned and gain Initiative at end of melee exchange &#10;* +2 to proficiency test. Declare before rolling. &#10;Non-humans max 1.&#10;Spent during encounter and regained afterwards.',
    'Luck': 'Spend permanently to ignore a result from Injury Table or Flight in the Dark Table.',
    // Story Events
    'Better Part of Valor': 'The entire warband immediately escapes from the battle and does not have to roll on the Flight in the Dark table. ',
    'A Lucky Break!': 'A character may ignore a roll they just made on the post-game Injury Table or Flight in the Dark Table.',
    'What About Old Friends?': 'At the beginning of a battle round, roll up a new Hero character and place them within 6&quot; of any battlefield edge. They join your warband in the battle, and may act immediately. After the game, the character will remain as part of your warband, if desired.',
    "I Don't Think That's How The Story Went...": 'When rolling on any type of random events table, roll twice and pick the result you like best. If you dislike both results, you may choose to have nothing happen.',
    'Did I Ever Tell You How I Learned To Do This?': 'Automatically succeed at a proficiency test, and if a skill is applicable, add the skill to the character permanently.',

    // Threats
    'The Whispers from Beyond': 'A sickness lies upon the land, bringing the stench of unnatural sorceries. &#10; Foes within: Undead and Cultists.',
    'The Ruin Within': 'Criminals and murderers, compelled by a dark power.&#10; Foes within: Brigands and Bandits. ',
    'The Curse of War': 'A brutal war becomes a curse upon the land.&#10;Foes without: Ghouls and War Cultists.',
    'Threat 1 Name': 'Description of the first threat.',
    'Threat 2 Name': 'Description of the second threat.',
    'Threat 3 Name': 'Description of the third threat.',

    // Proficiencies
    'Driven': 'Only race that can gain more than 1 point of Will (p.53). +2 XP when gaining Will from Advancement.',
    'Lucky Shot': '5+ to hit with ranged attacks if target is concealed or in cover.',
    'Slip Away': 'Never have to roll on Flight in the Dark Table after a battle.',
    'Lacking Strength': 'Cannot use Warhammers, Bastard Swords or Long Bows.',
    
    //Equipment
    'Backpack': 'Max 8 items. Cannot be used by temporary allies',
    'Stash': 'Only accessible in settlements.',
    //Weapons
    // Weapon traits (Bulky, Parry etc) can be found on pg.60.
    'Improvised Weapon': 'Melee -1 / -1',
    'Unarmed': 'Melee -1 / -1',
    'Light Weapon': 'Melee -1 / +0',
    'Self Bow': 'Ranged 18&quot; +0 / +0&#10; Cannot be used with Shield, Out of ammo on natural 1 to hit.',
    'Sling': 'Ranged 10&quot; -1 / +0',
    'Staff': 'Melee +0 / +0&#10;Parry (p.42)',
    'Standard Weapon': 'Melee +0 / +0',
    'Bastard Sword': 'Melee +0 / +1',
    'Crossbow': 'Ranged 24&quot; +1 / +0&#10; Cannot be used with Shield,  Out of ammo on natural 1 to hit., Move or Shoot',
    'Fencing Sword': 'Melee +0 / +0 &#10;Parry(p.42)',
    'Long Bow': 'Ranged 24&quot; +0 / +0&#10; Cannot be used with Shield, Out of ammo on natural 1 to hit.',
    'Throwing Knives': 'Ranged 9&quot; -1 / +0&#10; Add Combat Skill even if moved.&#10; Once per battle, recovered if you Hold the Field',
    'Warhammer': 'Melee +1 / +0',
    'War Spear': 'Melee +0 / +0&#10; May always Counter Attack in melee.',
    'Crossbow Pistol': 'Ranged 12&quot; +0 / +0&#10;Out of ammo on natural 1 to hit.&#10;Homebrew.',
    'Blackpowder Pistol': 'Ranged 12&quot; +1 / +1&#10;Once per battle.&#10;Homebrew.',
    

    
    // Armor
    // Fine, Damaged, Fey steel can be found on 62. 
    'Full Armor': 'Armor Rating: 3&#10; Movement reduced by -0&quot / -2&quot',
    'Partial Armor': 'Armor Rating: 2&#10; Movement reduced by -0&quot / -1&quot',
    'Light Armor': 'Armor Rating: 1',
    'Knight Armor': 'Armor Rating: 3&#10;Cannot Dash',
    'Helmet': 'If rolling Double on Injury Table, they are simply Knocked Out, not injured.&#10;Helmet becomes Damaged.',
    'Shield': 'Armor Rating +1 against Ranged attacks. &#10;Parry against Melee strikes.',
    // Quality
    'Fine': 'If Damaged, ignore the damage, but the item is no longer Fine',
    'Damaged': 'Cannot be used until repaired, either with a Repair kit or by a Blacksmith (pg.82)',
    'Fey Steel': 'Item cannot be Damaged. &#10; Weapons: Only Standard Weapon, Fencing Sword and Bastard Sword.&#10;Armor: Only Partial or Full Armor.',
    'Quality': 'Add +1 to damage rolls.',
    'Quick': 'Add +1 to attack rolls.',
    // Items
    // Items can be either S (Single Use),B (Backpack to be used), C (Consumable) or W (Worn by a character)
    'Silvertree Leaf': 'Reroll one post-game Injury.&#10; If character would have initially died, increase recovery by 1d3 turns.&#10;No effect on rolls on Flight in the Dark table.&#10;Single Use. Can be used from Stash.',
    'Congealed Strands': 'Used to cast spells, can be used in place of normal Strand.&#10;Single Use. Can be used from Stash.',
    //Spells
    
    // Add more as needed
};

// Function to create tooltip span
function tt(key) {
    return `<span title="${tooltips[key]}" style="border-bottom: 1px dotted #0099ff; cursor: help; color: #0099ff;">${key}</span>`;
}
