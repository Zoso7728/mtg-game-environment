import { filter } from 'lodash';

export const trackStats = (hand, library, battlefield, MANA_IN_STARTING_HAND, DAMAGE_DEALT) => {
    const nonPermNonCreatureSpells_count = filter(hand, { generalType: 'non-perm-non-creature-spell' }).length;
    const permNonCreatureSpells_count = filter(hand, { generalType: 'perm-non-creature-spell' }).length;
    const manaInHand = filter(hand, { generalType: 'land' }).length;

    console.log(`
        Mana in starting hand: ${MANA_IN_STARTING_HAND} \n
        Cards in library: ${library.length} \n
        Cards in graveyard: ${battlefield.graveyard.length} \n
        Cards in hand: ${hand.length} \n
        Mana in hand: ${manaInHand} \n
        Non perm non creature spells in hand: ${nonPermNonCreatureSpells_count} \n
        Perm non creature spells in hand: ${permNonCreatureSpells_count} \n
        Mana in play: ${battlefield.mana.length} \n
        Damage dealt: ${DAMAGE_DEALT} \n
    `);
};
