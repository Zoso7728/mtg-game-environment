export const spellDamage = card => {
    const damageRegex = /deals [1-9] damage/;
    const amountRegex = /[1-9]/;
    const doesCardDealDamage = damageRegex.test(card.text);

    if (!doesCardDealDamage) return null;

    return {
        doesCardDealDamage,
        amount: doesCardDealDamage ? Number(damageRegex.exec(card.text)[0].substring(6, 7)) : null,
    };
};
