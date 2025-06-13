import hikeGif from '../assets/animation/hike.gif';
import boatGif from '../assets/animation/boat.gif';
import bathGif from '../assets/animation/bath.gif';
import campGif from '../assets/animation/camp.gif';
import choresGif from '../assets/animation/chores.gif';
import cleanShrineGif from '../assets/animation/cleanShrine.gif';
import eatGif from '../assets/animation/eat.gif';
import exploretheBeachGif from '../assets/animation/explorethebeach.gif';
import exploretheDungeonGif from '../assets/animation/explorethedungeon.gif';
import fightingMonsterGif from '../assets/animation/fightmonster.gif';
import photoGif from '../assets/animation/photo.gif';
import prayGif from '../assets/animation/pray.gif';
import splashFaceGif from '../assets/animation/splashface.gif';
import sleepGif from '../assets/animation/sleep.gif';
import volleyBallGif from '../assets/animation/volleyball.gif';
import buyGif from '../assets/animation/buy.gif';

export const locationActivities = {
  home: [
    {
      name: "Eat",
      benefit: "Recover hunger.",
      effect: { hunger: +20 },
      duration: 10,
      animation: eatGif,
    },
    {
      name: "Take a Bath",
      benefit: "Improve hygiene.",
      effect: { hygiene: +20 },
      duration: 10,
      animation: bathGif,
    },
    {
      name: "Sleep",
      benefit: "Restore energy.",
      effect: { energy: +20 },
      duration: 10,
      animation: sleepGif,
    },
    {
      name: "Do Chores",
      benefit: "Gain money, lose hygiene.",
      effect: { money: +10, hygiene: -10 },
      duration: 10,
      animation: choresGif,
    },
  ],
  beach: [
    {
      name: "Explore the Beach",
      benefit: "Increase happiness, lose energy and hygiene.",
      effect: { happiness: +15, energy: -10, hygiene: -10 },
      duration: 10,
      animation: exploretheBeachGif,
    },
    {
      name: "Buy Souvenir",
      benefit: "Cost money, increase happiness.",
      effect: { money: -15, happiness: +10 },
      info: "Costs 15 money 💰",
      duration: 10,
      animation: buyGif,
    },
    {
      name: "Eat at Local Restaurant",
      benefit: "Recover hunger, costs money.",
      effect: { hunger: +15, money: -10 },
      info: "Costs 10 money 💰",
      duration: 10,
      animation: eatGif,
    },
    {
      name: "Play Volleyball",
      benefit: "Big energy drain, big fun",
      effect: { energy: -20, happiness: +10 },
      duration: 10,
      animation: volleyBallGif,
    }
  ],
  lake: [
    {
      name: "Row a Boat",
      benefit: "Boost happiness, but you’ll get tired.",
      effect: { happiness: +15, energy: -10 },
      duration: 10,
      animation: boatGif,
    },
    {
      name: "Buy Fish Snack",
      benefit: "Increase hunger, decrease money.",
      effect: { hunger: +10, money: -8 },
      info: "Costs 8 money 💰",
      duration: 10,
      animation: buyGif,
    },
    {
      name: "Splash Face",
      benefit: "Refresh yourself.",
      effect: { hygiene: +5, energy: +5 },
      duration: 10,
      animation: splashFaceGif,
    },
    {
      name: "Go Fishing",
      benefit: "Gain money, lose energy.",
      effect: { money: +10, energy: -15 },
      duration: 10,
      animation: boatGif,
    }
  ],
  temple: [
    {
      name: "Pray",
      benefit: "Peaceful! Increases happiness.",
      effect: { happiness: +10 },
      duration: 10,
      animation: prayGif,
    },
    {
      name: "Help Clean the Shrine",
      benefit: "Gain karma/money, lose energy.",
      effect: { money: +5, energy: -5, hygiene: -10 },
      duration: 10,
      animation: cleanShrineGif,
    },
    {
      name: "Buy Lucky Charm",
      benefit: "Costs money, might protect against random events?",
      effect: { money: -20, happiness: +5 },
      info: "Costs 20 money 💰",
      duration: 10,
      animation: buyGif,
    },
  ],
  mountain: [
    {
      name: "Hike",
      benefit: "Gain happiness but Tires you out.",
      effect: { happiness: +10, energy: -15 },
      duration: 10,
      animation: hikeGif,
    },
    {
      name: "Camp",
      benefit: "Rest and recover energy.",
      effect: { energy: +20, hunger: -5 },
      duration: 10,
      animation: campGif,
    },
    {
      name: "Take Photos",
      benefit: "No stat gain, but stores memories",
      effect: { happiness: +5 },
      duration: 10,
      animation: photoGif,
    },
  ],
  dungeon: [
    {
      name: "Explore the Dungeon",
      benefit: "Gain money, lose energy and hygiene.",
      effect: { money: +10, energy: -10, hygiene: -10 },
      duration: 10,
      animation: exploretheDungeonGif,
    },
    {
      name: "Buy Potion",
      benefit: "Cost money, increase happiness.",
      effect: { money: -15, happiness: +10 },
      duration: 10,
      animation: buyGif,
    },
    {
      name: "Fight Monster",
      benefit: "	Gain money, lose energy.",
      effect: { energy: -10, money: +10, hygiene: -10 },
      duration: 10,
      animation: fightingMonsterGif,
    }
  ],
};
