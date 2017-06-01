import fs from 'fs';
import Promise from 'bluebird';
import xmlParser from 'xml2js';

const readFile = Promise.promisify(fs.readFile, { context: fs });
const parser = Promise.promisify(xmlParser.parseString, { context: xmlParser });

const cardsFilePath = `${__dirname}/cards.xml`;

export const prepExistingCards = () => {
    return readFile(cardsFilePath)
        .then(rawData => {
            return parser(rawData);
        })
        .then(data => {
            const cardData = data.cockatrice_carddatabase.cards[0].card;

            return cardData.map(card => {
                const { name, set, color, manacost, cmc, type, pt, tablerow, text } = card;

                return {
                    name: name ? name[0] : null,
                    color: color ? color : null,
                    manacost: manacost ? manacost[0] : null,
                    cmc: cmc ? Number(cmc[0]) : null,
                    type: type ? type[0] : null,
                    tablerow: tablerow ? tablerow[0] : null,
                    text: text ? text[0] : null,
                    pt: pt ? pt[0] : null,
                    canUntap: true,
                    tapped: false,
                    drawn: false,
                };
            });
        });
};
