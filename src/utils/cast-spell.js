import { filter } from 'lodash';

/*

The concept of this deck is to deal as much damage as possible on a given turn.
Casting spells rules are is follows:

If there is a perm non creature spell in your hand, play that card.
Otherwise deal as much damage as possible per turn.

*/

// filter possible cards to play
//    first look for perm non creature spells
//    then look for non perm non creature spells
// figure out if mana can be tapped to cast the spell
// if anything doesn't work out regarding the statments above, exit out of this method
//
// Otherwise, loop though mana to tap the proper amount of mana
// send spell to the proper position on the battlefield
//

const getUntappedMana = battlefield => {
    return filter(battlefield.mana, card => {
        if (!card.tapped) return true;
        return false;
    });
};

const getCardsFromHand = (hand, type) => {
    return filter(hand, card => {
        if (card.generalType === type) return true;
        return false;
    });
};

export const castSpell = (hand, battlefield, DMG_DEALT) => {
    const availableMana = getUntappedMana(battlefield);

    const permNonCreatureSpells = getCardsFromHand(hand, 'permNonCreatureSpells');
    const nonPermNonCreatureSpells = getCardsFromHand(hand, 'nonPermNonCreatureSpells');

    if (permNonCreatureSpells && permNonCreatureSpells.length) {

    }

    if (nonPermNonCreatureSpells && nonPermNonCreatureSpells.length) {

    }
};
