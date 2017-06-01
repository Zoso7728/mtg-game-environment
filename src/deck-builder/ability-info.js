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
        notes: 'This card should only be played when there are no cards in hand.',
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
        notes: 'This card is immediately played if drawn.',
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
    let info = { hasAbility: false };
    if (card.generalType !== 'non-perm-non-creature-spell') return info;

    forEach(abilities, ability => {
        if (!ability.regex.test(card.text)) return null;

        info.ability = ability;
        info.hasAbility = true;
    });

    return info;
}
