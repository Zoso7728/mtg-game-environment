import fs from 'fs';
import async from 'async';
import Promise from 'bluebird';
import _ from 'lodash';
import xmlParser from 'xml2js';
import { prepExistingCards } from './prep-existing-cards';
import { generalType } from './general-type';

const readFile = Promise.promisify(fs.readFile, { context: fs });
const parser = Promise.promisify(xmlParser.parseString, { context: xmlParser });

const deckFilePath = `${__dirname}/burn.cod`;

export default async function deckBuilder() {
    const cardsInExistence = await prepExistingCards();
    const rawData = await readFile(deckFilePath);
    const data = await parser(rawData);
    const cards = data.cockatrice_deck.zone[0].card;
    const deck = [];

    cards.forEach(({ $ }) => {
        const card = $;

        for (let i = 0; i < card.number; i++) {
            const completeCardObj = _.find(cardsInExistence, { name: card.name });
            const { type } = completeCardObj;

            completeCardObj.generalType = generalType(type);

            deck.push(completeCardObj);
        }
    });

    return Promise.resolve(deck);
};
