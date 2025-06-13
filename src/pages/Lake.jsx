import GameLocationPage from '../layout/GameLocationPage';
import collisionData from '../collision/lakecollision.json';
import lakeBg from '../assets/background/lake.webp';
import { locationActivities } from "../layout/locationActivities";

const customLocations = [
  { name: 'Row a Boat', top: 4, left: 52 },
  { name: 'Buy Fish Snack', top: 20, left: 80 },
  { name: 'Splash Face', top: 20, left: 60 },
  { name: 'Go Fishing', top: 65, left: 55 },
  { name: 'Map', top: 20, left: 98 },
  { name: 'Temple', top: 8, left: 11 },
];


export default function Lake() {
  return (
    <GameLocationPage
      locationKey="lake"
      customLocations={customLocations}
      collisionData={collisionData}
      backgroundImage={lakeBg}
      activitiesKey={locationActivities.lake}
      startPosition={{ top: 30, left: 90 }}
    />
  );
}