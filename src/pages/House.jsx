import GameLocationPage from '../layout/GameLocationPage';
import collisionData from '../collision/housecollision.json';
import houseBg from '../assets/background/house2.webp';
import { locationActivities } from "../layout/locationActivities";

const customLocations = [
  { name: 'Eat', top: 34, left: 28 },
  { name: 'Take a Bath', top: 38, left: 55 },
  { name: 'Sleep', top: 20, left: 40 },
  { name: 'Do Chores', top: 18, left: 27 },
  { name: 'Map', top: 44, left: 35 },
];

export default function House() {
  return (
    <GameLocationPage
      locationKey="house"
      customLocations={customLocations}
      collisionData={collisionData}
      backgroundImage={houseBg}
      activitiesKey={locationActivities.home}
      startPosition={{ top: 38, left: 34 }}
    />
  );
}