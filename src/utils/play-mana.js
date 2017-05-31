const _ = require('lodash');

const hasManaBeenPlayedThisTurn = (battlefield, initManaCount) => {
    return _.isEqual(battlefield.mana.length, initManaCount);
};

const hasManaInHand = manaInHand => {
    return !_.isEmpty(manaInHand);
};

export const playMana = (battlefield, hand, initManaCount) => {
    const manaInHand = _.filter(hand, { generalType: 'Land' });

    if (hasManaBeenPlayedThisTurn(battlefield, initManaCount) && hasManaInHand(manaInHand)) {
        const manaToPlay = manaInHand[Math.floor(Math.random()*manaInHand.length)];
        battlefield.mana.push(manaToPlay);
        hand.splice(hand.indexOf(manaToPlay), 1);
    }
};
