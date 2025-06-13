import GameLocationPage from '../layout/GameLocationPage';
import collisionData from '../collision/mountaincollision.json';
import houseBg from '../assets/background/mountain1.webp';
import { locationActivities } from "../layout/locationActivities";

const customLocations = [
  { name: 'Hike', top: 10, left: 52 },
  { name: 'Camp', top: 20, left: 80 },
  { name: 'Take Photos', top: 60, left: 50 },
  { name: 'Map', top: 94, left: 52 },
  { name: 'Temple', top: 8, left: 11 },
];

export default function Mountain() {
  return (
    <GameLocationPage
      locationKey="mountain"
      customLocations={customLocations}
      collisionData={collisionData}
      backgroundImage={houseBg}
      activitiesKey={locationActivities.mountain}
      startPosition={{ top: 80, left: 52 }}
    />
  );
}