export const generalType = type => {
    if (type.includes('Land')) return 'land';

    if (type.includes('Sorcery') || type.includes('Instant')) return 'non-perm-non-creature-spell';

    return null;
};
