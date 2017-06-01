import { maxBy, isEmpty, find, remove } from 'lodash';

// Discard the non-perm-non-creature-spell card with the MOST cmc.

export const discard = (hand, graveyard) => {
    const cardToDiscard = maxBy(hand, 'cmc');
    const i = hand.indexOf(cardToDiscard);

    hand.splice(i, 1);

    graveyard.push(cardToDiscard);
};
