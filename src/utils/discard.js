import { minBy, isEmpty, find, remove } from 'lodash';

/*

The concept of this deck is to deal as much damage as possible on a given turn.
Discarding rules are is follows:

First discard a non perm non creature spell with the least potential points of damage.
If none of those are present then discard a perm non creature spell.

*/

export const discard = (hand, graveyard) => {
    let cardToDiscard;

    const handWithDamagePotential = hand.map(card => {
        const damageRegex = /deals [1-9] damage/;
        const amountRegex = /[1-9]/;
        card.doesCardDealDamage = damageRegex.test(card.text);
        card.howMuchDamage = (card.doesCardDealDamage && card.generalType === 'permNonCreatureSpells')
          ? Number(damageRegex.exec(card.text)[0].substring(6, 7))
          : null;

        return card;
    });

    cardToDiscard = minBy(handWithDamagePotential, 'howMuchDamage');

    cardToDiscard = hand.splice(hand[cardToDiscard], 1);

    cardToDiscard.forEach(card => {
        graveyard.push(card);
    });
};
