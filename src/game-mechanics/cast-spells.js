import { filter, maxBy } from 'lodash';

// Cast the spell with the lowest cmc and highest spell damage amount.

const NO_SPELL_CAST = 0;

const getUntappedMana = battlefield => {
    return
};

export const castSpells = (hand, battlefield) => {
    const availableManaCount = filter(battlefield.mana, card => {
        if (!card.tapped) return true;
        return false;
    }).length;

    const spellCards = filter(hand, card => {
        if (card.spellDamage) return true;
        return false;
    });

    const availableSpells = filter(spellCards, card => {
        if (card.cmc <= availableManaCount) return true;
        return false;
    });

    if (!availableSpells || !availableSpells.length) return NO_SPELL_CAST;

    const spellToCast = maxBy(availableSpells, 'spellDamage.amount');

    const i = hand.indexOf(spellToCast);

    hand.splice(i, 1);

    battlefield.graveyard.push(spellToCast);

    return spellToCast.spellDamage.amount;
};
