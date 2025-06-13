import GameLocationPage from '../layout/GameLocationPage';
import collisionData from '../collision/beachcollision.json';
import beachBg from '../assets/background/beach2.webp';
import { locationActivities } from "../layout/locationActivities";

const customLocations = [
  { name: 'Play Volleyball', top: 30, left: 57 },
  { name: 'Eat at Local Restaurant', top: 24, left: 18 },
  { name: 'Buy Souvenir', top: 60, left: 30 },
  { name: 'Explore the Beach', top: 48, left: 75 },
  { name: 'Map', top: 8, left: 60 },
];

export default function Beach() {
  return (
    <GameLocationPage
      locationKey="beach"
      customLocations={customLocations}
      collisionData={collisionData}
      backgroundImage={beachBg}
      activitiesKey={locationActivities.beach}
      startPosition={{ top: 20, left: 60 }}
    />
  );
}