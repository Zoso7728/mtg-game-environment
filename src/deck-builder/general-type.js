export const generalType = type => {
    if (type.includes('Land')) return 'Land';

    if (type.includes('Sorcery') || type.includes('Instant')) return 'nonPermNonCreatureSpell';

    if (type.includes('Enchantment') || type.includes('Artifact')) return 'permNonCreatureSpells';

    return null;
};
