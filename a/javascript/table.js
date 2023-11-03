// highlight odd rows after sorting happens (makes it look nicer)
highlightRows = () => {
    const rows = document.querySelectorAll('tbody tr.show');

    rows.forEach((row, index) => {
        if (!row.classList.contains('description-row')) {
            const color = index % 2 === 0 ? '#dedede' : '#b7b7b7';
            row.style.background = color;
        }
    });
};

window.addEventListener('load', highlightRows);

//! Innovative Modification Table
// sets the filters all back to nothing, then resets table
function clearFilter() {
    document.getElementById('level').selectedIndex = 0;
    document.getElementById('subclass').selectedIndex = 0;
    document.getElementById('color').selectedIndex = 0;
    filterTable();
}

// tell the checkbox where it is and what size to be
function toggleDropdown(dropdownId) {
    const dropdownContent = document.getElementById(dropdownId);

    let headerWidth = 0;
    if (dropdownId === "levelDropdown") {
        const levelHeader = document.getElementById('levelHeader');
        headerWidth = levelHeader.offsetWidth - 25;
    } else if (dropdownId === "subclassDropdown") {
        const subclassHeader = document.getElementById('subclassHeader');
        headerWidth = subclassHeader.offsetWidth - 25;
    } else if (dropdownId === "colorDropdown") {
        const colorHeader = document.getElementById('colorHeader');
        headerWidth = colorHeader.offsetWidth - 25;
    }

    dropdownContent.style.width = headerWidth + 'px';

    if (dropdownContent.style.display === 'block') {
        dropdownContent.style.display = 'none';
        dropdownState[dropdownId] = false;
    } else {
        dropdownContent.style.display = 'block';
        dropdownState[dropdownId] = true;
    }
}

// make the select all and select none toggle actually do those things
function toggleSelectAll(dropdownId) {
    const checkboxes = document.querySelectorAll(`#${dropdownId} input[type="checkbox"]`);
    const totalCheckboxes = checkboxes.length;
    let checkedCount = 0;

    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            checkedCount++;
        }
    });

    const shouldSelectAll = checkedCount < totalCheckboxes / 2;

    checkboxes.forEach(checkbox => {
        checkbox.checked = shouldSelectAll;
        checkbox.dispatchEvent(new Event('change')); // swap to either all or none toggled
    });
}

// filter the table as the checkboxes change
function filterTable() {
    const table = document.getElementById('table');
    const rows = table.getElementsByTagName('tr');

    const levelCheckboxes = document.querySelectorAll('#levelDropdown input[type="checkbox"]');
    const subclassCheckboxes = document.querySelectorAll('#subclassDropdown input[type="checkbox"]');
    const colorCheckboxes = document.querySelectorAll('#colorDropdown input[type="checkbox"]');

    $('.description-row').remove(); // delete all the description rows so that sorting isn't massively boned

    for (let i = 1; i < rows.length; i++) {
        const row = rows[i];
        const cells = row.getElementsByTagName('td');

        const level = cells[1].innerText.trim();
        const subclass = cells[2].innerText.trim();
        const color = cells[3].innerText.trim();

        let showRow = true;

        if (!isAnyCheckboxChecked(levelCheckboxes, level)) {
            showRow = false;
        }

        if (!isAnyCheckboxChecked(subclassCheckboxes, subclass)) {
            showRow = false;
        }

        if (!isAnyCheckboxChecked(colorCheckboxes, color)) {
            showRow = false;
        }

        if (showRow) {
            row.style.display = '';
            row.classList.add('show');
        } else {
            row.style.display = 'none';
            row.classList.remove('show');
        }
    }

    highlightRows();
}

function isAnyCheckboxChecked(checkboxes, value) {
    for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked && value.includes(checkboxes[i].value)) {
            return true;
        }
    }
    return false;
}

//! Spell Modification Table
function toggleRadioDropdown(dropdownId) {
    const dropdownContent = document.getElementById(dropdownId);

    let headerWidth = 0;
    if (dropdownId === 'colorRadioDropdown') {
        const colorRadioHeader = document.getElementById('colorRadioHeader');
        headerWidth = colorRadioHeader.offsetWidth - 25;
    }
    
    const initialLeft = -14; // Adjust this value to the desired position
    dropdownContent.style.right = initialLeft + 'px';
    
    dropdownContent.style.width = headerWidth + 'px';

    if (dropdownContent.style.display === 'block') {
        dropdownContent.style.display = 'none';
        dropdownState[dropdownId] = false;
    } else {
        dropdownContent.style.display = 'block';
        dropdownState[dropdownId] = true;
    }
}

// filter the table as the radio changes
function filterSpellTable() {
    const table = document.getElementById('spell-table');
    const rows = table.getElementsByTagName('tr');

    const colorRadio = document.querySelector('#colorRadioDropdown input[type="radio"]:checked');

    $('.description-row').remove(); // delete all the description rows so that sorting isn't massively boned

    for (let i = 1; i < rows.length; i++) {
        const row = rows[i];
        const cells = row.getElementsByTagName('td');

        const color = cells[1].innerText.trim();

        let showRow = true;

        if (colorRadio.value !== 'All' && !isRadioToggled(colorRadio, color)) {
            showRow = false;
        }

        if (showRow) {
            row.style.display = '';
            row.classList.add('show');
        } else {
            row.style.display = 'none';
            row.classList.remove('show');
        }
    }

    highlightRows();
}

function isRadioToggled(radio, value) {
    return radio.checked && value.includes(radio.value);
}

//! Description
$(document).ready(function () {
    var innovativeContentMap = { //descriptions of everything
        'Bending Light': 'You can cast disguise self at will, without using willpower.',
        'Cerulean Serenity': 'You have advantage on saving throws against being charmed or frightened.',
        'Crimson Resilience': 'When you are reduced to 0 hit points but not killed outright, you can drop to 1 hit point instead. You can’t use this feature again until you finish a long rest.',
        'Dazzling Defense': 'When you are hit by an attack, you can use your reaction and 1 willpower to create a blinding burst of light, imposing disadvantage on the attacker’s next attack roll against you.',
        'Drafter’s Resilience': 'Your body adapts to the effects of drafting, granting you advantage on saving throws against spells and effects that deal radiant or elemental damage.',
        'Edgedancer': 'While on difficult terrain, gain an additional 10 feet of movement and ignore the movement penalty.',
        'Eidetic Memory': 'You gain expertise in History and Religion checks. If you were not already proficient in them, gain proficiency.',
        'Empowered Casting': 'When you cast a drafting spell, you can expend 1 willpower to add a +2 to the attack roll or the DC save required.',
        'Fire-heart': 'You are immune to fire damage from difficult terrain and surface effects.',
        'Impose Will': 'You can cast Command at will, spending 1 willpower.',
        'Incombustible': 'You gain resistance to fire damage.',
        'Infra-red Vision': 'You see invisible creatures and objects as if they were visible.',
        'Leg Springs': 'You can use your reaction and spend 1 willpower to gain resistance to falling damage and double your jump distance for one minute (10 turns).',
        'Resonance Pulse': 'Once per turn, using a bonus action and 1 willpower, you can emit a bright pulse of light from yellow luxin that disrupts all illusions within a 30-foot radius.',
        'Spectrum Sight': 'You can see the auras of creatures, allowing you to determine their emotional state and intentions. You gain proficiency in Insight checks, and you have advantage on Insight checks when dealing with living creatures.',
        'Surprise Attack': 'When you attack out of stealth, your opponent can’t take reactions until the start of its next turn.',
        'Tenacity': 'Once per short rest, as a reaction, you can spend 1 willpower to gain temporary hitpoints equal to your drafter level.',
        'Thrill of Victory': 'Once per minute, when you reduce a creature to 0 hit points with your drafting spell, you regain willpower equal to your proficiency modifier.',
        'Uncanny Intuition': 'You can add your Intelligence modifier to your armor class, as long as you have proficiency in the armor you’re wearing.',
        'Unhindered Movement': 'You can ignore the movement penalty that comes with moving through difficult terrain.',
        'Wrathful Presence': 'Gain advantage on Intimidation checks against living creatures.',
        'Blinding Radiance': 'Once per short rest, after taking damage, you can use your reaction to blind creatures within 10 feet of you until the start of your turn.',
        'Calculated Retaliation': 'When a creature misses their attack on you, use your reaction to make an opportunity attack on that creature.',
        'Combat Savant': 'You may use your Intelligence modifier instead of your Dexterity modifier on attack rolls and damage rolls made with finesse weapons.',
        'Empathic Resolve': 'You have advantage on saving throws against being charmed or frightened. Additionally, whenever you resist one of the conditions you can attempt to direct the condition to an enemy, giving them the same DC you had to resist being charmed or frightened.',
        'Energizing Aura': 'You can use an action and 1 willpower to give yourself and your allies within 10 feet a bonus equal to your spellcasting modifier to saving throws against being frightened or charmed for 1 minute.',
        'Erupting Rage': 'Once per turn, when you attack with a sub-red or red drafting spell, you can spend 1 extra willpower to add an additional damage die.',
        'Exploding Fury': 'Once per turn, when you attack with a sub-red or red drafting spell, you can spend 1 extra willpower to set one damage die to its maximum value.',
        'Exploit Weakness': 'When a creature goes prone on difficult terrain you created, you can use your reaction to deal 2d6 damage to them.',
        'Iridescent Reflection': 'Once per short rest, you can create illusory duplicates of yourself, making it difficult for enemies to target you. As a reaction, you can create duplicates that grant attackers disadvantage on their attacks for one round.',
        'Luxin Mace': 'You gain the ability to transform your fists into green-luxin maces. When you make an unarmed attack, you can spend 2 willpower to temporarily infuse your fists with green luxin, causing your unarmed strikes to deal bludgeoning damage equal to 1d8 + your strength modifier. This effect lasts for one minute, or until you dismiss it.',
        'Trace': 'Once per short rest, you can use your action and 1 willpower to attach a string of Super-Violet to an adjacent enemy. You gain advantage on attacks against the creature until the creature dies or you lose concentration on using the string.',
        'Verdant Shield': 'You can use your action to coat yourself in green luxin, spending 1 willpower to gain resistance to all non-magical damage for one minute.',
        'Deflect Projectile': 'You learn to use your bound weapon to deflect incoming ranged attacks. Ranged attacks against you have disadvantage while wielding your bound weapon.',
        'Multi-strike Binding': 'When you take the attack action with your bound weapon on your turn, you can spend 2 willpower to attack one additional time.',
        'Iron-clad Will': 'Each strike with the bound weapon revitalizes your own willpower. Following a hit with your bound weapon, you recover 1 willpower.',
        'Perfected Binding': 'You can add your spellcasting ability to the attack and damage rolls of melee attacks using your bound weapon.',
        'Advanced Multi-strike Binding': 'When you take the attack action with your bound weapon on your turn, you can spend 2 willpower to attack one additional time.',
    };

    var spellContentMap = {
        'Molten Surge': '<div class="mod-spell-card dropdown-mod-spells sc-subred"><h3>Molten Surge</h3><div class="spell-type">Drafting Conjuration</div><div class="spell-info"><p><b>Casting Time: </b>1 action</p><p><b>Range: </b>Self</p><p><b>Components: </b>S, M (heat)</p><p><b>Duration: </b>1 minute</p></div><p class="spell-desc">You tap into the fiery essence of sub-red luxin, causing molten luxin to surge through your body. For the duration, your unarmed strikes, melee weapon attacks, and melee spell attacks deal an additional 1d8 fire damage. Additionally, creatures that hit you with a melee attack while within 5 feet of you take 1d8 fire damage. You become immune to fire damage.</p></div>',
        'Pyroclastic Eruption': '<div class="mod-spell-card sc-red dropdown-mod-spells"><h3>Pyroclastic Eruption</h3><div class="spell-type">Drafting Conjuration</div><div class="spell-info"><p><b>Casting Time: </b>1 action</p><p><b>Range: </b>Self (10-foot radius)</p><p><b>Components: </b>S, M (the color red)</p><p><b>Duration: </b>Instantaneous</p></div><p class="spell-desc">You channel the volatile essence of red luxin, causing the ground within a 10-foot radius around you to tremble and erupt in a shower of molten rock and flames. Creatures within the area must make a Dexterity saving throw, taking 4d12 fire damage on a failed save, or half as much on a successful one.</p></div>',
        'Spikefield': '<div class="mod-spell-card dropdown-mod-spells sc-orange"><h3>Spikefield</h3><div class="spell-type">Drafting Conjuration</div><div class="spell-info"><p><b>Casting Time: </b>1 action</p><p><b>Range: </b>Self (20-foot radius)</p><p><b>Components: </b>S, M (the color orange)</p><p><b>Duration: </b>1 minute</p></div><p class="spell-desc">You transform a 20-foot radius around you into difficult terrain. When the terrain appears, each creature standing in its area must succeed on a Constitution saving throw or become restrained. Additionally, this terrain deals 2d10 damage to any creature, apart from the caster, for every 5 feet they walk in the terrain.</p></div>',
        'Spear of Gold': '<div class="mod-spell-card dropdown-mod-spells sc-yellow"><h3>Spear of Gold</h3><div class="spell-type">Drafting Conjuration</div><div class="spell-info"><p><b>Casting Time: </b>1 action</p><p><b>Range: </b>60 feet</p><p><b>Components: </b>S, M (the color yellow)</p><p><b>Duration: </b>Instantaneous</p></div><p class="spell-desc">You draft a lance of hardened yellow luxin, making a ranged spell attack against a single enemy at a range of 60 feet. On a hit, this attack does 8d10 fire damage.</p></div>',
        'Green Golem': '<div class="mod-spell-card dropdown-mod-spells sc-green"><h3>Green Golem</h3><div class="spell-type">Drafting Conjuration</div><div class="spell-info"><p><b>Casting Time: </b>1 action</p><p><b>Range: </b>Self</p><p><b>Components: </b>S, M (the color green)</p><p><b>Duration: </b>Up to 1 minute</p></div><p class="spell-desc">INSERT GREEN GOLEM DESC HERE</p></div>',
        'Spear of the Azure': '<div class="mod-spell-card dropdown-mod-spells sc-blue"><h3>Spear of the Azure</h3><div class="spell-type">Drafting Conjuration</div><div class="spell-info"><p><b>Casting Time: </b>1 action</p><p><b>Range: </b>60 feet</p><p><b>Components: </b>S, M (the color blue)</p><p><b>Duration: </b>Instantaneous</p></div><p class="spell-desc">You draft a spear of sharp blue luxin, making a ranged spell attack against a single enemy at a range of 60 feet. On a hit, this attack does 6d8 piercing damage. Hit or miss, the spear then explodes into shards of blue luxin. The target and each creature within 5 feet of the point where the spear exploded must succeed on a Dexterity saving throw or take 2d8 slashing damage.</p></div>',
        'Phased Invisibility': '<div class="mod-spell-card dropdown-mod-spells sc-superviolet"><h3>Phased Invisibility</h3><div class="spell-type">Drafting Conjuration</div><div class="spell-info"><p><b>Casting Time: </b>1 action</p><p><b>Range: </b>Self</p><p><b>Components: </b>S</p><p><b>Duration: </b>Concentration, up to 1 minute</p></div><p class="spell-desc">You distort your presence with superviolet luxin, making yourself transparent and difficult to perceive. While the spell is active, you and anything you are carrying become invisible. This invisibility is not dropped when making drafting attacks. Once per use of this spell, if your attack misses a target within range, you can turn the miss into a hit.</p></div>',
    };

    function handleSpellTableClick() {
        $('.spell-table').on('click', '.btn', function () {
            var nextRow = $(this).closest('tr').next();
            var name = $(this).closest('tr').find('.name').text().trim(); // check row name

            // check for description row
            if (nextRow.hasClass('description-row')) {
                nextRow.remove(); // remove description row
                $(this).text('+');
            } else {
                // $('.description-row').remove();
                // deletes all other description rows too, mostly here just in case user feedback prefers only one at a time

                // check content map to add the correct information.
                var content = spellContentMap[name] || 'Default content for unknown name';

                var newRow = '<tr class="description-row"><td colspan="4">' + content + '</td></tr>'; // add description row
                $(newRow).insertAfter($(this).closest('tr'));
                $(this).text('–');
            }

            highlightRows();
        });
    }

    function handleInnovativeTableClick() {
        $('.innovative-table').on('click', '.btn', function () {
            var nextRow = $(this).closest('tr').next();
            var name = $(this).closest('tr').find('.name').text().trim(); // check row name

            // check for description row
            if (nextRow.hasClass('description-row')) {
                nextRow.remove(); // remove description row
                $(this).text('+');
            } else {
                // $('.description-row').remove(); 
                //deletes all other description rows too, mostly here just in case user feedback prefers only one at a time

                // check content map to add the correct information.
                var content = innovativeContentMap[name] || 'Default content for unknown name';

                var newRow = '<tr class="description-row"><td colspan="5">' + content + '</td></tr>'; // add description row
                $(newRow).insertAfter($(this).closest('tr'));
                $(this).text('–');
            }

            highlightRows();
        });
    }

    handleSpellTableClick();
    handleInnovativeTableClick();
});