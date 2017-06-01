import { find, filter, forEach, maxBy } from 'lodash';

// Cast the spell with the lowest cmc and highest spell damage amount.

const NO_SPELL_CAST = 0;

const getAvailableMana = mana => {
    return filter(mana, card => {
        if (!card.tapped) return true;
        return false;
    });
};

const getSpellCards = hand => {
    return filter(hand, card => {
        if (card.spellDamage) return true;
        return false;
    });
};

const getAvailableSpells = (hand, availableManaCount) => {
    const spellCards = getSpellCards(hand);

    return filter(spellCards, card => {
        if (card.cmc <= availableManaCount) return true;
        return false;
    });
}

export const castSpells = (hand, battlefield, DAMAGE_DEALT) => {
    const availableMana = getAvailableMana(battlefield.mana);
    const availableSpells = getAvailableSpells(hand, availableMana.length);

    if (!availableSpells || !availableSpells.length) return NO_SPELL_CAST;

    const spellToCast = maxBy(availableSpells, 'spellDamage.amount');

    for(let i = 0; i < spellToCast.cmc; i++) {
        availableMana[i].tapped = true;
    }

    const i = hand.indexOf(spellToCast);

    hand.splice(i, 1);

    battlefield.graveyard.push(spellToCast);

    return spellToCast.spellDamage.amount;
};
