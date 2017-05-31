import { forEach } from 'lodash';

export const draw = (hand, library, n) => {
    const drawnCards = library.splice(0, n);

    forEach(drawnCards, card => {
        hand.push(card);
    });
}
