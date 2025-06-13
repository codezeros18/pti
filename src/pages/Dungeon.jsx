import GameLocationPage from '../layout/GameLocationPage';
import collisionData from '../collision/dungeoncollision.json';
import dungeonBg from '../assets/background/dungeon1.webp';
import { locationActivities } from "../layout/locationActivities";

const customLocations = [
  { name: 'Explore the Dungeon', top: 8, left: 44 },
  { name: 'Buy Potion', top: 19, left: 81 },
  { name: 'Fight Monster', top: 40, left: 22 },
  { name: 'Map', top: 88, left: 52 },
  { name: 'Temple', top: 8, left: 11 },
];

export default function Dungeon() {
  return (
    <GameLocationPage
      locationKey="dungeon"
      customLocations={customLocations}
      collisionData={collisionData}
      backgroundImage={dungeonBg}
      activitiesKey={locationActivities.dungeon}
      startPosition={{ top: 90, left: 60 }}
    />
  );
}