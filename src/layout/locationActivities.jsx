export const locationActivities = {
  home: [
    {
      name: "Eat",
      benefit: "Recover hunger.",
      effect: { hunger: +20 },
    },
    {
      name: "Take a Bath",
      benefit: "Improve hygiene.",
      effect: { hygiene: +20 },
    },
    {
      name: "Sleep",
      benefit: "Restore energy.",
      effect: { energy: +20 },
    },
    {
      name: "Do Chores",
      benefit: "Gain money, lose hygiene.",
      effect: { money: +10, hygiene: -10 },
    },
  ],
  beach: [
    {
      name: "Explore the Beach",
      benefit: "Increase happiness, lose energy and hygiene.",
      effect: { happiness: +15, energy: -10, hygiene: -10 },
    },
    {
      name: "Buy Souvenir",
      benefit: "Cost money, increase happiness.",
      effect: { money: -15, happiness: +10 },
      info: "Costs 15 money 💰", // For tooltip
    },
    {
      name: "Eat at Local Restaurant",
      benefit: "Recover hunger, costs money.",
      effect: { hunger: +15, money: -10 },
      info: "Costs 10 money 💰",
    },
    {
      name: "Play Volleyball",
      benefit: "Big energy drain, big fun",
      effect: { energy: -20, happiness: +10 },
    }
  ],
  lake: [
    {
      name: "Row a Boat",
      benefit: "Boost happiness, but you’ll get tired.",
      effect: { happiness: +15, energy: -10 },
    },
    {
      name: "Buy Fish Snack",
      benefit: "Increase hunger, decrease money.",
      effect: { hunger: +10, money: -8 },
      info: "Costs 8 money 💰",
    },
    {
      name: "Splash Face",
      benefit: "Refresh yourself.",
      effect: { hygiene: +5, energy: +5 },
    },
  ],
  temple: [
    {
      name: "Pray",
      benefit: "Peaceful! Increases happiness.",
      effect: { happiness: +10 },
    },
    {
      name: "Help Clean the Shrine",
      benefit: "Gain karma/money, lose energy.",
      effect: { money: +5, energy: -5, hygiene: -10 },
    },
    {
      name: "Buy Lucky Charm",
      benefit: "Costs money, might protect against random events?",
      effect: { money: -20, happiness: +5 },
      info: "Costs 20 money 💰", // For tooltip
    },
  ],
  mountain: [
    {
      name: "Hike",
      benefit: "Gain happiness but Tires you out.",
      effect: { happiness: +10, energy: -15 },
    },
    {
      name: "Camp",
      benefit: "Rest and recover energy.",
      effect: { energy: +20, hunger: -5 },
    },
    {
      name: "Take Photos",
      benefit: "No stat gain, but stores memories",
      effect: { happiness: +5 },
    },
  ],
  dungeon: [
    {
      name: "Explore the Dungeon",
      benefit: "Gain money, lose energy and hygiene.",
      effect: { money: +10, energy: -10, hygiene: -10 },
    },
    {
      name: "Buy Potion",
      benefit: "Cost money, increase happiness.",
      effect: { money: -15, happiness: +10 },
    },
    {
      name: "Fight Monster",
      benefit: "	Gain money, lose energy.",
      effect: { energy: -10, money: +10, hygiene: -10 },}
  ],
};
