/**
 * Photography registry. All files live in /public/images and are free-licence Unsplash photos
 * (credits in /public/images/CREDITS.json and on /legal/image-credits).
 * Plan §11 prefers real Finmirai photography — swap files here when the client supplies them.
 */
export type SiteImage = { src: string; alt: string };

const img = (file: string, alt: string): SiteImage => ({ src: `/images/${file}.jpg`, alt });

export const images = {
  familyMotherDaughter: img("family-mother-daughter", "Mother and young daughter laughing together on a sofa at home"),
  familyFour: img("family-four", "Indian family of four standing together and smiling"),
  elderGrandson: img("elder-grandson", "Elderly man sitting beside his grandson"),
  tamilFamilyTraditional: img(
    "tamil-family-traditional",
    "Smiling Tamil family in traditional veshti and silk saree, the father holding their young son",
  ),
  // Supplied by the client (not Unsplash) — not listed on /legal/image-credits.
  travelPassportAirport: img("travel-passport-airport", "Smiling traveller at an airport holding his passport and travel insurance policy"),
  accidentArmCast: img("accident-arm-cast", "Man in a hospital gown with his arm in a cast, supported by a helping arm"),
  healthDoctorNursePatient: img("health-doctor-nurse-patient", "Doctor and nurse smiling as they talk with a patient in a bright hospital corridor"),
  homeFamilyRoof: img("home-family-roof", "Family on their living-room sofa, the parents making a roof shape with their hands over their daughter"),
  cyberInsuranceNetwork: img("cyber-insurance-network", "Hand holding a glowing digital network with the words Cyber Insurance"),
  engineeringConstructionSite: img(
    "engineering-construction-site",
    "Engineer in a hard hat and safety vest reviewing plans at an industrial construction site with a crane at sunset",
  ),
  propertyFire: img("property-fire", "Fire and heavy smoke engulfing a commercial building"),
  motorCarCollision: img("motor-car-collision", "Two cars with damaged front bumpers after a minor collision on the road"),
  teamMeeting: img("team-meeting", "Professional presenting to colleagues in a meeting room"),
  corporateTeam: img("corporate-team", "Corporate team gathered in a boardroom"),
  businessOwner: img("business-owner", "Business owner working at his office desk"),
  professionalWoman: img("professional-woman", "Professional woman in a blazer seated in a modern office"),
  supportDesk: img("support-desk", "Client service professional at her desk ready to help"),
  hospitalRoom: img("hospital-room", "Clean, modern hospital room with a patient bed and monitoring equipment"),
  hospitalWard: img("hospital-ward", "Hospital ward with patient beds and medical equipment"),
  doctor: img("doctor", "Doctor in a white coat with a stethoscope"),
  carCity: img("car-city", "Red hatchback driving on a city road"),
  carBridge: img("car-bridge", "Car driving across a bridge on an open road"),
  twoWheelerTraffic: img("two-wheeler-traffic", "Two-wheeler riders and buses in busy Indian city traffic"),
  airport: img("airport", "Modern airport terminal under a bright sky"),
  apartments: img("apartments", "Colourful residential apartment building facade"),
  apartmentTower: img("apartment-tower", "Residential apartment block with balconies"),
  cargoShip: img("cargo-ship", "Container ship being loaded under port cranes"),
  portCranes: img("port-cranes", "Cargo vessel berthed beside container cranes at a port"),
  factoryFloor: img("factory-floor", "Manufacturing shop floor with production machinery"),
  machinery: img("machinery", "Industrial machinery inside a production facility"),
  garmentUnit: img("garment-unit", "Workers at tables in a garment manufacturing unit"),
  chennaiCoast: img("chennai-coast", "View over Chennai towards the coastline"),
} satisfies Record<string, SiteImage>;
