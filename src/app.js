import 'babel-polyfill';
import async from 'async';
import _ from 'lodash';
import Promise from 'bluebird';
import deckBuilder from './deck-builder/run';
import { shuffle } from './game-mechanics/shuffle';
import { draw } from './game-mechanics/draw';
import { untap } from './game-mechanics/untap';
import { playMana } from './game-mechanics/play-mana';
import { castSpells } from './game-mechanics/cast-spells';
import { discard } from './game-mechanics/discard';
import { trackStats } from './game-mechanics/track-stats';

const argv = require('yargs').argv;

const NUMBER_OF_TURNS = argv.numOfTurns;

if (!NUMBER_OF_TURNS) {
    console.log('[numOfTurns] is a required argument.');
    process.exit(1);
}

const turns = Array.from(Array(NUMBER_OF_TURNS + 1).keys());

let MANA_IN_STARTING_HAND;
let DAMAGE_DEALT = 0;
let LIFE = 20;
let hand = [];
let battlefield = {
    nonPermNonCreatureSpells: [],
    permNonCreatureSpells: [],
    creatureSpells: [],
    planeswalkers: [],
    graveyard: [],
    mana: [],
};

(async function() {
    const library = await deckBuilder();

    Promise.mapSeries(turns, turnId => {
        console.log(`Turn ${turnId}`);

        // Opening Hand
        if (!turnId) {
            shuffle(library);
            draw(hand, library, 7);
            MANA_IN_STARTING_HAND = _.filter(hand, { generalType: 'land' }).length;
            trackStats(hand, library, battlefield, MANA_IN_STARTING_HAND, DAMAGE_DEALT);
            return;
        }

        const initManaCount = battlefield.mana.length;

        // Untap
        untap(battlefield);

        // Upkeep

        // Draw
        draw(hand, library, 1);

        // Main Phase 1
        playMana(battlefield, hand, initManaCount);

        // check to see if a spell can be played this turn
        DAMAGE_DEALT += castSpells(hand, battlefield);

        // Start Combat

        // Attack

        // Block

        // Damage

        // End Combat

        // Main Phase 2
        playMana(battlefield, hand, initManaCount);

        // check to see if a spell can be played this turn
        DAMAGE_DEALT += castSpells(hand, battlefield);

        // End Step

        // TODO These will vary based on different deck strategies.
        if (hand.length > 7) discard(hand, battlefield.graveyard);

        trackStats(hand, library, battlefield, MANA_IN_STARTING_HAND, DAMAGE_DEALT);

        console.log(hand);
        console.log(battlefield);
    });
})();
