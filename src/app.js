import 'babel-polyfill';
import _ from 'lodash';
import Promise from 'bluebird';
import deckBuilder from './deck-builder/run';
import { shuffle } from './utils/shuffle';
import { draw } from './utils/draw';
import { playMana } from './utils/play-mana';
import { castSpell } from './utils/cast-spell';
import { discard } from './utils/discard';
import { trackStats } from './utils/track-stats';

const argv = require('yargs').argv;

const NUMBER_OF_TURNS = argv.numOfTurns;

if (!NUMBER_OF_TURNS) {
    console.log('[numOfTurns] is a required argument.');
    process.exit(1);
}

const turns = Array.from(Array(NUMBER_OF_TURNS + 1).keys());

let MANA_IN_STARTING_HAND;
let DMG_DEALT = 0;
let hand = [];
let life = 20;
let battlefield = {
    nonPermNonCreatureSpells: [],
    permNonCreatureSpells: [],
    creatureSpells: [],
    planeswalkers: [],
    graveyard: [],
    mana: [],
};

deckBuilder()
    .then(library => {
        Promise.mapSeries(turns, turnId => {
            console.log(`Turn ${turnId}`);

            // Opening Hand
            if (!turnId) {
                shuffle(library);
                draw(hand, library, 7);
                MANA_IN_STARTING_HAND = _.filter(hand, { generalType: 'Land' }).length;
                trackStats(hand, library, battlefield, MANA_IN_STARTING_HAND);
                return;
            }

            const initManaCount = battlefield.mana.length;

            // Untap
            _.forEach(battlefield, (val, key) => {
                battlefield[key] = _.map(val, card => {
                    if (card.canUntap) card.tapped = false;

                    return card;
                });
            });

            // Upkeep

            // Draw
            draw(hand, library, 1);

            // Main Phase 1
            playMana(battlefield, hand, initManaCount);

            // check to see if a spell can be played this turn
            castSpell(hand, battlefield, DMG_DEALT);

            playMana(battlefield, hand, initManaCount);

            // check to see if a spell can be played this turn

            console.log(hand);
            console.log(battlefield);

            // Start Combat

            // Attack

            // Block

            // Damage

            // End Combat

            // Main Phase 2
            playMana(battlefield, hand, initManaCount);

            // check to see if a spell can be played this turn

            playMana(battlefield, hand, initManaCount);

            // check to see if a spell can be played this turn

            // End Step

            // TODO These will vary based on different deck strategies.
            if (hand.length > 7) discard(hand, battlefield.graveyard);

            trackStats(hand, library, battlefield, MANA_IN_STARTING_HAND);
        });
    });