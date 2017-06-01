import { map, forEach, filter } from 'lodash';

const filterAbilityLine = (text, regex) => {
    const textLines = text.match(/[^\r\n]+/g);

    return filter(textLines, line => {
        if (regex.test(line)) return true;
        return false;
    })[0];
};

const abilities = [
    {
        key: 'Hellbent',
        regex: /Hellbent/,
        description: 'As long as you have no cards in hand, you may activate a special ability.',
        fn: hand => {
            if (!hand || !hand.length) return true;
            return false;
        },
        text: card => {
            return filterAbilityLine(card.text, /Hellbent/);
        }
    },
    {
        key: 'Miracle',
        regex: /Miracle/,
        description: 'You may cast this card for its miracle cost when you draw it if it\'s the first card you drew this turn.',
        fn: card => {
            if (!card.drawn) return true;
            return false;
        },
        text: card => {
            return filterAbilityLine(card.text, /Miracle/);
        }
    },
];

export const abilityInfo = card => {
    if (card.generalType !== 'non-perm-non-creature-spell') return null;

    let info = { hasAbility: false };

    forEach(abilities, ability => {
        if (!ability.regex.test(card.text)) return;

        info = ability;
        info.hasAbility = true;
    });

    return info;
}
