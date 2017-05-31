import { filter } from 'lodash';

export const trackStats = (hand, library, battlefield, MANA_IN_STARTING_HAND) => {
    const nonPermNonCreatureSpells_count = filter(hand, { generalType: 'nonPermNonCreatureSpell' }).length;
    const permNonCreatureSpells_count = filter(hand, { generalType: 'permNonCreatureSpells' }).length;
    const manaInHand = filter(hand, { generalType: 'Land' }).length;

    console.log(`
        Mana in starting hand: ${MANA_IN_STARTING_HAND} \n
        Cards in library: ${library.length} \n
        Cards in graveyard: ${battlefield.graveyard.length} \n
        Cards in hand: ${hand.length} \n
        Mana in hand: ${manaInHand} \n
        Non perm non creature spells in hand: ${nonPermNonCreatureSpells_count} \n
        Perm non creature spells in hand: ${permNonCreatureSpells_count} \n
        Mana in play: ${battlefield.mana.length} \n
    `);
};
