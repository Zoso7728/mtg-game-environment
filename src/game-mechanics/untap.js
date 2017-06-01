import { forEach, map } from 'lodash';

export const untap = battlefield => {
    forEach(battlefield, (val, key) => {
        battlefield[key] = map(val, card => {
            if (card.canUntap) card.tapped = false;

            return card;
        });

        return battlefield[key];
    });
};
