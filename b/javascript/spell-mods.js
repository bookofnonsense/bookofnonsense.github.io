// jshint esversion: 6

function updateSpellInfo(selectedValue) {

	//default fallback if things go wrong
	const selectedSpellInfo = customSpellInfoMap[selectedValue] || {
		range: 'Unknown',
		components: 'Unknown',
		duration: 'Unknown',
		upcast: 'Unknown',
		description: 'Description not available for this color.'
	};

	// a ton of calling and naming variables
	const spellTypeSpan = document.querySelector('.d-type');
	const rangeSpan = document.querySelector('.range');
	const componentsSpan = document.querySelector('.components');
	const durationSpan = document.querySelector('.duration');
	const upcastSpan = document.querySelector('.upcast');
	const descriptionSpan = document.querySelector('.description');

	spellTypeSpan.textContent = selectedValue;
	rangeSpan.textContent = selectedSpellInfo.range;
	componentsSpan.textContent = selectedSpellInfo.components;
	durationSpan.textContent = selectedSpellInfo.duration;
	upcastSpan.textContent = selectedSpellInfo.upcast;
	descriptionSpan.textContent = selectedSpellInfo.description;

	const upcastSelect = document.getElementById('upcastOption');
	upcastSelect.disabled = false;

	//making willpower reset upon changing the drafting color
	const willpowerSelect = document.getElementById('willpowerOption');
	willpowerSelect.disabled = true;

	while (willpowerSelect.firstChild) {
		willpowerSelect.removeChild(willpowerSelect.firstChild);
	}

	const option = document.createElement('option');
	option.value = 'willpower_used'; // Set an appropriate value for the option
	option.textContent = 'Willpower Used'; // Set the text to display

	willpowerSelect.appendChild(option);

	// what to actually assign to the second dropdown based on the first ones input
	const upcastOptions = {
		'Sub-red': ['Upcast Option', 'None', 'Crank the Heat', 'Third-degree Burns'],
		'Red': ['Upcast Option', 'None', 'Extra Boom', 'Gooped Up'],
		'Orange': ['Upcast Option', 'None', 'Pretty Slippery', 'Big Puddle'],
		'Yellow': ['Upcast Option', 'None', 'Burning Mist', 'Blinding Flash'],
		'Green': ['Upcast Option', 'None', 'Bouncy Ball', 'Weighted Luxin'],
		'Blue': ['Upcast Option', 'None', 'Shrapnel', 'Calculated Aim'],
		'Superviolet': ['Upcast Option', 'None', 'Multi-target', 'Nimble Weaving'],
	};

	const upcastSelectOptions = upcastOptions[selectedValue] || [];
	const upcastSelectElement = document.getElementById('upcastOption');

	upcastSelectElement.innerHTML = '';

	//used to find the first in the list to then modify it
	for (let i = 0; i < upcastSelectOptions.length; i++) {
		const option = upcastSelectOptions[i];
		const optionElement = document.createElement('option');
		optionElement.value = option;
		optionElement.textContent = option;

		// Set the first option to be disabled but still selected to keep title
		if (i === 0) {
			optionElement.disabled = true;
			optionElement.selected = true;
		}

		upcastSelectElement.appendChild(optionElement);
	}
}

function updateWillpowerOptions(selectedValue) {
	const selectedUpcastOption = document.getElementById('upcastOption').value;
	const willpowerSelect = document.getElementById('willpowerOption');
	const upcastSpan = document.querySelector('.upcast');
	const rangeSpan = document.querySelector('.range'); //range option for big puddle orange
	const descriptionSpan = document.querySelector('.description');

	upcastSpan.textContent = selectedUpcastOption;

	willpowerSelect.disabled = false;

	if (selectedUpcastOption === 'None') {
		willpowerSelect.disabled = true;
	}

	const willpowerOptions = {
		'Crank the Heat': ['Willpower Used', '1', '2'],
		'Third-degree Burns': ['Willpower Used', '1', '2', '3', '4'],
		'Extra Boom': ['Willpower Used', '1', '2'],
		'Gooped Up': ['Willpower Used', '1', '2', '3', '4'],
		'Pretty Slippery': ['Willpower Used', '1', '2'],
		'Big Puddle': ['Willpower Used', '1', '2', '3', '4'],
		'Burning Mist': ['Willpower Used', '1', '2'],
		'Blinding Flash': ['Willpower Used', '1', '2', '3', '4'],
		'Bouncy Ball': ['Willpower Used', '1', '2'],
		'Weighted Luxin': ['Willpower Used', '1', '2', '3', '4'],
		'Shrapnel': ['Willpower Used', '1', '2'],
		'Calculated Aim': ['Willpower Used', '1', '2', '3', '4'],
		'Multi-target': ['Willpower Used', '1', '2'],
		'Nimble Weaving': ['Willpower Used', '1', '2', '3', '4'],
		'None': ['Willpower Used']
	};

	if (selectedUpcastOption === 'Big Puddle') {
		const selectedUpcastDesc = customSpellDescMap[selectedUpcastOption] || {
			range: 'Range not available for this color.',
			description: 'Description not available for this color.'
		};

		descriptionSpan.textContent = selectedUpcastDesc.description;
		rangeSpan.textContent = selectedUpcastDesc.range;
	}
	else if (selectedUpcastOption !== 'Big Puddle') {

		const selectedValue = document.getElementById('spellType').value;

		const selectedSpellInfo = customSpellInfoMap[selectedValue] || {
			range: 'Unknown',
		};

		rangeSpan.textContent = selectedSpellInfo.range;

		if (selectedUpcastOption !== 'None') {
			const selectedUpcastDesc = customSpellDescMap[selectedUpcastOption] || {
				description: 'Description not available for this color.'
			};

			descriptionSpan.textContent = selectedUpcastDesc.description;
		}
		else {
			const selectedValue = document.getElementById('spellType').value;
			const selectedSpellUpcastDesc = customSpellInfoMap[selectedValue] || {
				description: 'Description not available for this color.'
			};
			const descriptionSpan = document.querySelector('.description');

			descriptionSpan.textContent = selectedSpellUpcastDesc.description;
		}
	}
	const willpowerSelectOptions = willpowerOptions[selectedUpcastOption] || [];
	willpowerSelect.innerHTML = '';

	for (let i = 0; i < willpowerSelectOptions.length; i++) {
		const option = willpowerSelectOptions[i];
		const optionElement = document.createElement('option');
		optionElement.value = option;
		optionElement.textContent = option;

		if (i === 0) {
			optionElement.disabled = true;
			optionElement.selected = true;
		}

		willpowerSelect.appendChild(optionElement);
	}
}

// what to set for each variable based on the given upcast option
const customSpellDescMap = {
	'Crank the Heat': {
		description: 'Spend X willpower to channel the heat around you, then reach out and touch a nearby enemy, drafting that heat onto their skin. Make a melee spell attack against the target. You have advantage on the attack roll if the target is not wearing armor and doesn’t have natural armor. On a hit, the target takes Xd10 + X fire damage.'
	},
	'Third-degree Burns': {
		description: 'Spend X willpower to channel the heat around you, then reach out and touch a nearby enemy, drafting that heat onto their skin. Make a melee spell attack against the target. You have advantage on the attack roll if the target is not wearing armor and doesn’t have natural armor. On a hit, the target takes 2d10 + Xd6 fire damage.'
	},
	'Extra Boom': {
		description: 'Spend X willpower to draft the red you can see into a stream of red luxin and direct it at a creature or object within range. Make a ranged spell attack against the target. On a hit, the target takes 2d6 fire damage and is coated in red luxin for 2 turns. This red luxin coating will explode if the creature is hit with fire, sub-red luxin, or yellow luxin, dealing Xd6 fire damage to the one coated and each creature in a 5-foot radius that fails a DC 12 Dexterity Saving Throw.'
	},
	'Gooped Up': {
		description: 'Spend X willpower to draft the red you can see into a stream of red luxin and direct it at a creature or object within range. Make a ranged spell attack against the target. On a hit, the target takes 2d6 fire damage and is coated in red luxin for 2 turns. This red luxin coating will explode if the creature is hit with fire, sub-red luxin, or yellow luxin, dealing 1d6 fire damage to the one coated and each creature in a 5-foot radius that fails a DC 12 Dexterity Saving Throw. While the creature is coated in this luxin, or until 2 turns have passed, lower the creatures movement speed by X feet.'
	},
	'Pretty Slippery': {
		description: 'Spend X willpower to draft the orange you can see into a pool of orange luxin, transforming a 10-foot radius around you into difficult terrain, and putting out any fire in the area. If you already have this surface made, you can spend 1 willpower to move the original pool to your current location. When the terrain appears, each creature standing in its area must succeed on a Dexterity saving throw, with a -X penalty, or fall prone. A creature that enters the area or starts its turn there must also succeed on a Dexterity saving throw, with a -X penalty, or fall prone.'
	},
	'Big Puddle': {
		range: 'Self (X-foot radius)',
		description: 'Spend X willpower to draft the orange you can see into a pool of orange luxin, transforming an X-foot radius around you into difficult terrain, and putting out any fire in the area. If you already have this surface made, you can spend 1 willpower to move the original pool to your current location. When the terrain appears, each creature standing in its area must succeed on a Dexterity saving throw or fall prone. A creature that enters the area or starts its turn there must also succeed on a Dexterity saving throw or fall prone.'
	},
	'Burning Mist': {
		description: 'Spend X willpower to draft the yellow you can see into a blinding spray of yellow luxin. Each creature in a 10-foot cone takes Xd4 fire damage and must make a Dexterity saving throw or take an additional 3d4 fire damage. Creatures who fail the saving throw must make a Constitution saving throw or are blinded until the end of their turn.'
	},
	'Blinding Flash': {
		description: 'Spend X willpower to draft the yellow you can see into a blinding spray of yellow luxin. Each creature in a 10-foot cone must make a Dexterity saving throw, with a -X penalty, or take 3d4 fire damage. Creatures who fail the saving throw must make a Constitution saving throw or are blinded until the end of their turn.'
	},
	'Bouncy Ball': {
		description: 'Spend X willpower to draft the green you can see into a ball of green luxin and direct it at a creature or object in range. Make a ranged spell attack against the target. On a hit, the creature takes 2d8 bludgeoning damage, and you make an additional ranged spell attack against a creature within 30 feet of the creature hit. You can make this additional attack X times. A creature hit with this attack is knocked backwards 10 feet.'
	},
	'Weighted Luxin': {
		description: 'Spend X willpower to draft the green you can see into a ball of green luxin and direct it at a creature or object in range. Make a ranged spell attack against the target. On a hit, the creature takes 2d8 bludgeoning damage. A creature hit with this attack is knocked backwards X feet.'
	},
	'Shrapnel': {
		description: 'Spend X willpower to draft the blue you can see into a wave of blue luxin spikes. Each creature in a 15-foot cone takes Xd6 and must make a Dexterity saving throw or take an additional 2d8 piercing damage on a failed save, or half as much damage on a successful one.'
	},
	'Calculated Aim': {
		description: 'Spend X willpower to draft the blue you can see into a wave of blue luxin spikes. Each creature in a 15-foot cone must make a Dexterity saving throw, with a -X penalty, or take 2d8 piercing damage on a failed save, or half as much damage on a successful one.'
	},
	'Multi-target': {
		description: 'Spend X willpower to  draft the superviolet you can see into three invisible luxin darts. These darts hit a creature of your choice that you can see within range. Each dart deals 1d4 piercing damage to its target. X of the darts may target a different creature from the rest.'
	},
	'Nimble Weaving': {
		description: 'Spend X willpower to  draft the superviolet you can see into X invisible luxin darts. These darts hit a creature of your choice that you can see within range. Each dart deals 1d4 piercing damage to its target.'
	},
};

// what to set for each variable based on the given value
const customSpellInfoMap = {
	'Sub-red': {
		range: 'Touch',
		components: 'S, M (heat)',
		duration: 'Instantaneous',
		upcast: 'None',
		description: 'Spend 2 willpower to channel the heat around you, then reach out and touch a nearby enemy, drafting that heat onto their skin. Make a melee spell attack against the target. You have advantage on the attack roll if the target is not wearing armor and doesn’t have natural armor. On a hit, the target takes 2d10 fire damage.',
	},
	'Red': {
		range: '30 feet',
		components: 'S, M (the color red)',
		duration: 'Instantaneous',
		upcast: 'None',
		description: 'Spend 2 willpower to draft the red you can see into a stream of red luxin and direct it at a creature or object within range. Make a ranged spell attack against the target. On a hit, the target takes 2d6 fire damage and is coated in red luxin for 2 turns. This red luxin coating will explode if the creature is hit with fire, sub-red luxin, or yellow luxin, dealing 1d6 fire damage to the one coated and each creature in a 5-foot radius that fails a DC 12 Dexterity Saving Throw.',
	},
	'Orange': {
		range: 'Self (10-foot radius)',
		components: 'S, M (the color orange)',
		duration: '1 minute',
		upcast: 'None',
		description: 'Spend 2 willpower to draft the orange you can see into a pool of orange luxin, transforming a 10-foot radius around you into difficult terrain, and putting out any fire in the area. If you already have this surface made, you can spend 1 willpower to move the original pool to your current location. When the terrain appears, each creature standing in its area must succeed on a Dexterity saving throw or fall prone. A creature that enters the area or starts its turn there must also succeed on a Dexterity saving throw or fall prone.',
	},
	'Yellow': {
		range: 'Self (10-foot cone)',
		components: 'S, M (the color yellow)',
		duration: 'Instantaneous',
		upcast: 'None',
		description: 'Spend 2 willpower to draft the yellow you can see into a blinding spray of yellow luxin. Each creature in a 10-foot cone must make a Dexterity saving throw or take 3d4 fire damage. Creatures who fail the saving throw must make a Constitution saving throw or are blinded until the end of their turn.',
	},
	'Green': {
		range: '40/80 feet',
		components: 'S, M (the color green)',
		duration: 'Instantaneous',
		upcast: 'None',
		description: 'Spend 2 willpower to draft the green you can see into a ball of green luxin and direct it at a creature or object in range. Make a ranged spell attack against the target. On a hit, the creature takes 2d8 bludgeoning damage. A creature hit with this attack is knocked backwards 10 feet.',
	},
	'Blue': {
		range: 'Self (15-foot cone)',
		components: 'S, M (the color blue)',
		duration: 'Instantaneous',
		upcast: 'None',
		description: 'Spend 2 willpower to draft the blue you can see into a wave of blue luxin spikes. Each creature in a 15-foot cone must make a Dexterity saving throw or take 2d8 piercing damage on a failed save, or half as much damage on a successful one.',
	},
	'Superviolet': {
		range: '120 feet',
		components: 'S',
		duration: 'Instantaneous',
		upcast: 'None',
		description: 'Spend 2 willpower to draft the superviolet you can see into three invisible luxin darts. These darts hit a creature of your choice that you can see within range. Each dart deals 1d4 piercing damage to its target.',
	}
};

function updateDescription() {
	const selectedValue = document.getElementById('spellType').value; // Get the selected spell type
	const selectedWillpowerOption = document.getElementById('willpowerOption').value; // get the selected willpower option
	const selectedUpcastOption = document.getElementById('upcastOption').value; // get the selected upcast option
	const spellInfo = getSpellInfo(selectedValue, selectedUpcastOption, selectedWillpowerOption); // grab the data from the get spell option function
	const description = spellInfo.description || ''; // make description equal to the returned function value for description
	const descriptionSpan = document.querySelector('.description'); // define where the description to replace is in the code

	if (selectedUpcastOption === 'Big Puddle'){
		const range = spellInfo.range || '';
		const rangeSpan = document.querySelector('.range');

		rangeSpan.textContent = range; //replace the range if the upcast option was Big Puddle
	}

	descriptionSpan.textContent = description; //replace the description
}

function getSpellInfo(spellType, upcastOption, willpowerOption) {
	// what to assign to the description fields based on the chosen color
	const spellInfoMap = {
		'Sub-red': {
			'Crank the Heat': {
				'1': {
					description: 'Spend 3 willpower to channel the heat around you, then reach out and touch a nearby enemy, drafting that heat onto their skin. Make a melee spell attack against the target. You have advantage on the attack roll if the target is not wearing armor and doesn’t have natural armor. On a hit, the target takes 1d10 + 10 fire damage.'
				},
				'2': {
					description: 'Spend 4 willpower to channel the heat around you, then reach out and touch a nearby enemy, drafting that heat onto their skin. Make a melee spell attack against the target. You have advantage on the attack roll if the target is not wearing armor and doesn’t have natural armor. On a hit, the target takes 20 fire damage.'
				}
			},
			'Third-degree Burns': {
				'1': {
					description: 'Spend 3 willpower to channel the heat around you, then reach out and touch a nearby enemy, drafting that heat onto their skin. Make a melee spell attack against the target. You have advantage on the attack roll if the target is not wearing armor and doesn’t have natural armor. On a hit, the target takes 2d10 + 1d6 fire damage.'
				},
				'2': {
					description: 'Spend 4 willpower to channel the heat around you, then reach out and touch a nearby enemy, drafting that heat onto their skin. Make a melee spell attack against the target. You have advantage on the attack roll if the target is not wearing armor and doesn’t have natural armor. On a hit, the target takes 2d10 + 2d6 fire damage.'
				},
				'3': {
					description: 'Spend 5 willpower to channel the heat around you, then reach out and touch a nearby enemy, drafting that heat onto their skin. Make a melee spell attack against the target. You have advantage on the attack roll if the target is not wearing armor and doesn’t have natural armor. On a hit, the target takes 2d10 + 3d6 fire damage.'
				},
				'4': {
					description: 'Spend 6 willpower to channel the heat around you, then reach out and touch a nearby enemy, drafting that heat onto their skin. Make a melee spell attack against the target. You have advantage on the attack roll if the target is not wearing armor and doesn’t have natural armor. On a hit, the target takes 2d10 + 4d6 fire damage.'
				}
			}
		},
		'Red': {
			'Extra Boom': {
				'1': {
					description: 'Spend 3 willpower to draft the red you can see into a stream of red luxin and direct it at a creature or object within range. Make a ranged spell attack against the target. On a hit, the target takes 2d6 fire damage and is coated in red luxin for 2 turns. This red luxin coating will explode if the creature is hit with fire, sub-red luxin, or yellow luxin, dealing 2d6 fire damage to the one coated and each creature in a 5-foot radius that fails a DC 12 Dexterity Saving Throw.'
				},
				'2': {
					description: 'Spend 4 willpower to draft the red you can see into a stream of red luxin and direct it at a creature or object within range. Make a ranged spell attack against the target. On a hit, the target takes 2d6 fire damage and is coated in red luxin. This red luxin coating will explode if the creature is hit with fire, sub-red luxin, or yellow luxin, dealing 3d6 fire damage to the one coated and each creature in a 5-foot radius that fails a DC 12 Dexterity Saving Throw.'
				}
			},
			'Gooped Up': {
				'1': {
					description: 'Spend 3 willpower to draft the red you can see into a stream of red luxin and direct it at a creature or object within range. Make a ranged spell attack against the target. On a hit, the target takes 2d6 fire damage and is coated in red luxin for 2 turns. This red luxin coating will explode if the creature is hit with fire, sub-red luxin, or yellow luxin, dealing 1d6 fire damage to the one coated and each creature in a 5-foot radius that fails a DC 12 Dexterity Saving Throw. While the creature is coated in this luxin, or until 2 turns have passed, lower the creatures movement speed by 5 feet.'
				},
				'2': {
					description: 'Spend 4 willpower to draft the red you can see into a stream of red luxin and direct it at a creature or object within range. Make a ranged spell attack against the target. On a hit, the target takes 2d6 fire damage and is coated in red luxin for 2 turns. This red luxin coating will explode if the creature is hit with fire, sub-red luxin, or yellow luxin, dealing 1d6 fire damage to the one coated and each creature in a 5-foot radius that fails a DC 12 Dexterity Saving Throw. While the creature is coated in this luxin, or until 2 turns have passed, lower the creatures movement speed by 10 feet.'
				},
				'3': {
					description: 'Spend 5 willpower to draft the red you can see into a stream of red luxin and direct it at a creature or object within range. Make a ranged spell attack against the target. On a hit, the target takes 2d6 fire damage and is coated in red luxin for 2 turns. This red luxin coating will explode if the creature is hit with fire, sub-red luxin, or yellow luxin, dealing 1d6 fire damage to the one coated and each creature in a 5-foot radius that fails a DC 12 Dexterity Saving Throw. While the creature is coated in this luxin, or until 2 turns have passed, lower the creatures movement speed by 15 feet.'
				},
				'4': {
					description: 'Spend 6 willpower to draft the red you can see into a stream of red luxin and direct it at a creature or object within range. Make a ranged spell attack against the target. On a hit, the target takes 2d6 fire damage and is coated in red luxin for 2 turns. This red luxin coating will explode if the creature is hit with fire, sub-red luxin, or yellow luxin, dealing 1d6 fire damage to the one coated and each creature in a 5-foot radius that fails a DC 12 Dexterity Saving Throw. While the creature is coated in this luxin, or until 2 turns have passed, lower the creatures movement speed by 20 feet.'
				}
			}
		},
		'Orange': {
			'Pretty Slippery': {
				'1': {
					description: 'Spend 3 willpower to draft the orange you can see into a pool of orange luxin, transforming a 10-foot radius around you into difficult terrain, and putting out any fire in the area. If you already have this surface made, you can spend 1 willpower to move the original pool to your current location. When the terrain appears, each creature standing in its area must succeed on a Dexterity saving throw, with a -1 penalty, or fall prone. A creature that enters the area or starts its turn there must also succeed on a Dexterity saving throw, with a -1 penalty, or fall prone.'
				},
				'2': {
					description: 'Spend 4 willpower to draft the orange you can see into a pool of orange luxin, transforming a 10-foot radius around you into difficult terrain, and putting out any fire in the area. If you already have this surface made, you can spend 1 willpower to move the original pool to your current location. When the terrain appears, each creature standing in its area must succeed on a Dexterity saving throw, with a -2 penalty, or fall prone. A creature that enters the area or starts its turn there must also succeed on a Dexterity saving throw, with a -2 penalty, or fall prone.'
				}
			},
			'Big Puddle': {
				'1': {
					range: 'Self (15-foot radius)' ,
					description: 'Spend 3 willpower to draft the orange you can see into a pool of orange luxin, transforming a 15-foot radius around you into difficult terrain, and putting out any fire in the area. If you already have this surface made, you can spend 1 willpower to move the original pool to your current location. When the terrain appears, each creature standing in its area must succeed on a Dexterity saving throw or fall prone. A creature that enters the area or starts its turn there must also succeed on a Dexterity saving throw or fall prone.'
				},
				'2': {
					range: 'Self (20-foot radius)' ,
					description: 'Spend 4 willpower to draft the orange you can see into a pool of orange luxin, transforming a 20-foot radius around you into difficult terrain, and putting out any fire in the area. If you already have this surface made, you can spend 1 willpower to move the original pool to your current location. When the terrain appears, each creature standing in its area must succeed on a Dexterity saving throw or fall prone. A creature that enters the area or starts its turn there must also succeed on a Dexterity saving throw or fall prone.'
				},
				'3': {
					range: 'Self (25-foot radius)' ,
					description: 'Spend 5 willpower to draft the orange you can see into a pool of orange luxin, transforming a 25-foot radius around you into difficult terrain, and putting out any fire in the area. If you already have this surface made, you can spend 1 willpower to move the original pool to your current location. When the terrain appears, each creature standing in its area must succeed on a Dexterity saving throw or fall prone. A creature that enters the area or starts its turn there must also succeed on a Dexterity saving throw or fall prone.'
				},
				'4': {
					range: 'Self (30-foot radius)' ,
					description: 'Spend 6 willpower to draft the orange you can see into a pool of orange luxin, transforming a 30-foot radius around you into difficult terrain, and putting out any fire in the area. If you already have this surface made, you can spend 1 willpower to move the original pool to your current location. When the terrain appears, each creature standing in its area must succeed on a Dexterity saving throw or fall prone. A creature that enters the area or starts its turn there must also succeed on a Dexterity saving throw or fall prone.'
				}
			}
		},
		'Yellow': {
			'Burning Mist': {
				'1': {
					description: 'Spend 3 willpower to draft the yellow you can see into a blinding spray of yellow luxin. Each creature in a 10-foot cone takes 1d4 fire damage and must make a Dexterity saving throw or take an additional 3d4 fire damage. Creatures who fail the saving throw must make a Constitution saving throw or are blinded until the end of their turn.'
				},
				'2': {
					description: 'Spend 4 willpower to draft the yellow you can see into a blinding spray of yellow luxin. Each creature in a 10-foot cone takes 2d4 fire damage and must make a Dexterity saving throw or take an additional 3d4 fire damage. Creatures who fail the saving throw must make a Constitution saving throw or are blinded until the end of their turn.'
				}
			},
			'Blinding Flash': {
				'1': {
					description: 'Spend 3 willpower to draft the yellow you can see into a blinding spray of yellow luxin. Each creature in a 10-foot cone must make a Dexterity saving throw, with a -1 penalty, or take 3d4 fire damage. Creatures who fail the saving throw must make a Constitution saving throw or are blinded until the end of their turn.'
				},
				'2': {
					description: 'Spend 4 willpower to draft the yellow you can see into a blinding spray of yellow luxin. Each creature in a 10-foot cone must make a Dexterity saving throw, with a -2 penalty, or take 3d4 fire damage. Creatures who fail the saving throw must make a Constitution saving throw or are blinded until the end of their turn.'
				},
				'3': {
					description: 'Spend 5 willpower to draft the yellow you can see into a blinding spray of yellow luxin. Each creature in a 10-foot cone must make a Dexterity saving throw, with a -3 penalty, or take 3d4 fire damage. Creatures who fail the saving throw must make a Constitution saving throw or are blinded until the end of their turn.'
				},
				'4': {
					description: 'Spend 6 willpower to draft the yellow you can see into a blinding spray of yellow luxin. Each creature in a 10-foot cone must make a Dexterity saving throw, with a -4 penalty, or take 3d4 fire damage. Creatures who fail the saving throw must make a Constitution saving throw or are blinded until the end of their turn.'
				}
			}
		},
		'Green': {
			'Bouncy Ball': {
				'1': {
					description: 'Spend 3 willpower to draft the green you can see into a ball of green luxin and direct it at a creature or object in range. Make a ranged spell attack against the target. On a hit, the creature takes 2d8 bludgeoning damage, and you make an additional ranged spell attack against a creature within 30 feet of the creature hit. You can make this additional attack 1 time. A creature hit with this attack is knocked backwards 10 feet.'
				},
				'2': {
					description: 'Spend 4 willpower to draft the green you can see into a ball of green luxin and direct it at a creature or object in range. Make a ranged spell attack against the target. On a hit, the creature takes 2d8 bludgeoning damage, and you make an additional ranged spell attack against a creature within 30 feet of the creature hit. You can make this additional attack 2 times. A creature hit with this attack is knocked backwards 10 feet.'
				}
			},
			'Weighted Luxin': {
				'1': {
					description: 'Spend 3 willpower to draft the green you can see into a ball of green luxin and direct it at a creature or object in range. Make a ranged spell attack against the target. On a hit, the creature takes 2d8 bludgeoning damage. A creature hit with this attack is knocked backwards 15 feet.'
				},
				'2': {
					description: 'Spend 4 willpower to draft the green you can see into a ball of green luxin and direct it at a creature or object in range. Make a ranged spell attack against the target. On a hit, the creature takes 2d8 bludgeoning damage. A creature hit with this attack is knocked backwards 20 feet.'
				},
				'3': {
					description: 'Spend 5 willpower to draft the green you can see into a ball of green luxin and direct it at a creature or object in range. Make a ranged spell attack against the target. On a hit, the creature takes 2d8 bludgeoning damage. A creature hit with this attack is knocked backwards 25 feet.'
				},
				'4': {
					description: 'Spend 6 willpower to draft the green you can see into a ball of green luxin and direct it at a creature or object in range. Make a ranged spell attack against the target. On a hit, the creature takes 2d8 bludgeoning damage. A creature hit with this attack is knocked backwards 30 feet.'
				}
			}
		},
		'Blue': {
			'Shrapnel': {
				'1': {
					description: 'Spend 3 willpower to draft the blue you can see into a wave of blue luxin spikes. Each creature in a 15-foot cone takes Xd6 and must make a Dexterity saving throw or take an additional 2d8 piercing damage on a failed save, or half as much damage on a successful one.'
				},
				'2': {
					description: 'Spend 4 willpower to draft the blue you can see into a wave of blue luxin spikes. Each creature in a 15-foot cone takes Xd6 and must make a Dexterity saving throw or take an additional 2d8 piercing damage on a failed save, or half as much damage on a successful one.'
				}
			},
			'Calculated Aim': {
				'1': {
					description: 'Spend 3 willpower to draft the blue you can see into a wave of blue luxin spikes. Each creature in a 15-foot cone must make a Dexterity saving throw, with a -1 penalty, or take 2d8 piercing damage on a failed save, or half as much damage on a successful one.'
				},
				'2': {
					description: 'Spend 4 willpower to draft the blue you can see into a wave of blue luxin spikes. Each creature in a 15-foot cone must make a Dexterity saving throw, with a -2 penalty, or take 2d8 piercing damage on a failed save, or half as much damage on a successful one.'
				},
				'3': {
					description: 'Spend 5 willpower to draft the blue you can see into a wave of blue luxin spikes. Each creature in a 15-foot cone must make a Dexterity saving throw, with a -3 penalty, or take 2d8 piercing damage on a failed save, or half as much damage on a successful one.'
				},
				'4': {
					description: 'Spend 6 willpower to draft the blue you can see into a wave of blue luxin spikes. Each creature in a 15-foot cone must make a Dexterity saving throw, with a -4 penalty, or take 2d8 piercing damage on a failed save, or half as much damage on a successful one.'
				}
			}
		},
		'Superviolet': {
			'Multi-target': {
				'1': {
					description: 'Spend 3 willpower to draft the superviolet you can see into three invisible luxin darts. These darts hit a creature of your choice that you can see within range. Each dart deals 1d4 piercing damage to its target. 1 of the darts may target a different creature from the rest.'
				},
				'2': {
					description: 'Spend 4 willpower to draft the superviolet you can see into three invisible luxin darts. These darts hit a creature of your choice that you can see within range. Each dart deals 1d4 piercing damage to its target. 2 of the darts may target a different creature from the rest.'
				}
			},
			'Nimble Weaving': {
				'1': {
					description: 'Spend 3 willpower to  draft the superviolet you can see into 4 invisible luxin darts. These darts hit a creature of your choice that you can see within range. Each dart deals 1d4 piercing damage to its target.'
				},
				'2': {
					description: 'Spend 4 willpower to  draft the superviolet you can see into 5 invisible luxin darts. These darts hit a creature of your choice that you can see within range. Each dart deals 1d4 piercing damage to its target.'
				},
				'3': {
					description: 'Spend 5 willpower to  draft the superviolet you can see into 6 invisible luxin darts. These darts hit a creature of your choice that you can see within range. Each dart deals 1d4 piercing damage to its target.'
				},
				'4': {
					description: 'Spend 6 willpower to  draft the superviolet you can see into 7 invisible luxin darts. These darts hit a creature of your choice that you can see within range. Each dart deals 1d4 piercing damage to its target.'
				}
			}
		},
	};

	return ((spellInfoMap[spellType] && spellInfoMap[spellType][upcastOption]) && spellInfoMap[spellType][upcastOption][willpowerOption]) || {
		description: ''
	};
}