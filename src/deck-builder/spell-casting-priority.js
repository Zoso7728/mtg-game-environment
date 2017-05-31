/*

The concept of this deck is to deal as much damage as possible on a given turn.
Priority for casting spells will be set as follows:

Enchantments/Artifacts get the highest priority
Non perminate spells get the lowest priority

*/

export const spellCastingPriority = type => {
    if (type.includes('Enchantment') || type.includes('Artifact')) return 1;

    if (type.includes('Sorcery') || type.includes('Instant')) return 2;

    return null;
};
