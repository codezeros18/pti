import GameLocationPage from '../layout/GameLocationPage';
import collisionData from '../collision/templecollision.json';
import houseBg from '../assets/background/temple1.webp';
import { locationActivities } from "../layout/locationActivities";

const customLocations = [
  { name: 'Pray', top: 84, left: 56 },
  { name: 'Help Clean the Shrine', top: 64, left: 45 },
  { name: 'Buy Lucky Charm', top: 78, left: 30 },
  { name: 'Map', top: 84, left: 80 },
];

export default function Temple() {
  return (
    <GameLocationPage
      locationKey="temple"
      customLocations={customLocations}
      collisionData={collisionData}
      backgroundImage={houseBg}
      activitiesKey={locationActivities.temple}
      startPosition={{ top: 70, left: 60 }}
    />
  );
}