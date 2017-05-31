# mtg-game-environment
A customized environment for randomizing and automating mtg games.

# Disclaimer
This idea/program is currently in its most fundamental form. Most everything is specific to my needs and not
easily adaptable to other play styles or decks.

I am not including the card files for this program.
Simply plug them in if you would like to run this for yourself.

I am mainly housing this program here strictly for version control only.
Others can obviously clone and play with it... but at their own risk/reward :)

# Cards
The cards for this program are generated from:

`./src/decks/cards.xml`

This file is from the application Cockatrice and also may need to be updated as new packs are released.
I currently don't have a good solution for this.

# Decks
Currently working on the concept of a burn deck.

Card list:

`./src/decks/burn.cod`

I've got a .txt file over the main strategy/concept around this burn deck here:

`./src/decks/burn-strategy.txt`

# Running the program
First off this process is far too messy, but being as this is a V1 I'm just going to stick with what I have.

If you are just cloning this project be sure to run these commands:

`npm i` and `yarn`

If you do not have yarn installed, run this:

`npm i -g yarn`

You `should` always clean your `./dist` folder before running this program for the first time or after
applying changes to the decks `.cod` file.
This can be done like so:

`gulp clean`

Next you will want to pipe over the files in `./src/decks` folder to the `./dist` folder.
The default gulp command is configured to run this task.

`gulp`

Finally with all of that in place, we will want to run the following command to actually kick off the
simulation of a game:

`yarn build && node dist/app.js --numOfTurns=3`

The `--numOfTurns` argument may vary depending on how many turns you want to see play out.
