export type PhotoKey =
  | 'hero'
  | 'leader'
  | 'panda'
  | 'foodie'
  | 'kindness'
  | 'friendship'
  | 'hackathon'
  | 'specialDuo'
  | 'sih';

export type PhotoEntry = {
  key: PhotoKey;
  src: string;
  caption: string;
  alt: string;
  section: string;
  temporary: boolean;
  featured?: boolean;
};

const asset = (filename: string) =>
  `${import.meta.env.BASE_URL}assets/priyanshi/${filename}`;

export const photos: Record<PhotoKey, PhotoEntry> = {
  hero: {
    key: 'hero',
    src: asset('01._Hero.png'),
    caption: 'The world looks a little brighter here.',
    alt: 'Priyanshi in a pink outfit',
    section: 'introduction',
    temporary: false,
    featured: true,
  },

  leader: {
    key: 'leader',
    src: asset('02._Leader.png'),
    caption: 'Born to lead, not to follow.',
    alt: 'Priyanshi speaking at a podium',
    section: 'leadership',
    temporary: false,
    featured: true,
  },

  panda: {
    key: 'panda',
    src: asset('03.Panda.png'),
    caption: 'Panda energy is a real personality trait.',
    alt: 'Priyanshi wearing a panda hat',
    section: 'panda',
    temporary: false,
    featured: true,
  },

  foodie: {
    key: 'foodie',
    src: asset('04._Foodie.png'),
    caption: 'Good food. Better company.',
    alt: 'Priyanshi holding pizza',
    section: 'foodie',
    temporary: false,
    featured: true,
  },

  kindness: {
    key: 'kindness',
    src: asset('05._Kindness.png'),
    caption: 'A kind heart is always in style.',
    alt: 'Priyanshi smiling',
    section: 'kindness',
    temporary: false,
    featured: true,
  },

  friendship: {
    key: 'friendship',
    src: asset('06. Friendship.png'),
    caption: 'Some moments need no explanation.',
    alt: 'Both of us doing a fist bump',
    section: 'friendship',
    temporary: false,
    featured: true,
  },

  hackathon: {
    key: 'hackathon',
    src: asset('07. Hackathon.png'),
    caption: 'One team. A thousand possibilities.',
    alt: 'Both of us working together at a laptop',
    section: 'hackathon',
    temporary: false,
    featured: true,
  },

  specialDuo: {
    key: 'specialDuo',
    src: asset('08. Special Duo.png'),
    caption: 'Two humans. Questionable decisions.',
    alt: 'Both of us with a panda plushie',
    section: 'special-duo',
    temporary: false,
    featured: true,
  },

  sih: {
    key: 'sih',
    src: asset('sih_photo.png'),
    caption: 'Big ideas begin with a team.',
    alt: 'Our Smart India Hackathon team',
    section: 'hackathon',
    temporary: false,
  },
};

// The remaining 46 photographs
const extraMemoryFiles = [
  "1.jpg", "2.jpg", "3.jpg", "4.jpg",
  "5.png", "6.png", "7.png", "8.png", "9.png",
  "10.png", "11.png", "12.png",
  "13.jpg", "14.jpg", "15.png", "16.jpg",
  "17.jpg", "18.jpg", "19.jpg", "20.jpg",
  "21.jpg", "22.jpg", "23.jpg", "24.jpg",
  "25.jpg", "26.jpg", "27.jpg", "28.jpg",
  "29.jpg", "30.jpg", "31.jpg", "32.jpg",
  "33.jpg", "34.jpg", "35.jpg", "36.jpg",
  "37.jpg", "38.jpg", "39.jpg", "40.jpg",
  "41.jpg", "42.jpg", "43.jpg", "44.jpg",
  "45.jpg", "46.jpg"
];

// Each photograph gets its own caption.
// Captions remain attached to their respective photographs after shuffling.
const memoryCaptions = [
  'A little moment worth keeping.',
  'Some days deserve a frame.',
  'A memory with its own magic.',
  'The little things stay forever.',
  'Proof that ordinary days can be special.',
  'A smile that says everything.',
  'A moment from the good old days.',
  'One for the memory collection.',
  'Happiness looks good in every frame.',
  'A story hidden in a photograph.',
  'A little sunshine in the middle of everything.',
  'Some memories never get old.',
  'The kind of moment you revisit.',
  'A frame full of good energy.',
  'A day that deserves a replay.',
  'Collecting moments, not things.',
  'A tiny chapter of a bigger story.',
  'One more reason to smile.',
  'The camera caught a little happiness.',
  'A moment that feels like home.',
  'A beautiful kind of chaos.',
  'A memory with a permanent place.',
  'The best things happen naturally.',
  'A little happiness, captured.',
  'Some pictures tell better stories.',
  'A day worth remembering twice.',
  'A frame from the happy archive.',
  'Just another lovely little chapter.',
  'A moment that made the day.',
  'Keeping this one close.',
  'A little snapshot of joy.',
  'The memories make the journey.',
  'A photograph, a thousand feelings.',
  'A day that turned into a memory.',
  'A little piece of the good times.',
  'The moments between the big moments.',
  'A memory made of smiles.',
  'A little chaos, a lot of happiness.',
  'One of those days.',
  'A frame from our favourite stories.',
  'The good times look like this.',
  'A moment worth pressing pause for.',
  'A little reminder to smile.',
  'Some memories deserve their own space.',
  'A happy little accident of life.',
  'A chapter I would revisit.',
  'A memory that found its way here.'
];

const allGalleryPhotos = [
  photos.hero,
  photos.leader,
  photos.panda,
  photos.foodie,
  photos.kindness,
  photos.friendship,
  photos.hackathon,
  photos.specialDuo,
  ...extraMemoryFiles.map((filename, index) => ({
    key: `extra-${index + 1}`,
    src: asset(filename),
    caption: memoryCaptions[index],
    alt: `A personal memory photograph ${index + 1}`,
    section: 'memories',
    temporary: false,
    featured: false,
  })),
];

export const temporaryMemories = allGalleryPhotos.map((photo, index) => ({
  id: `memory-${index + 1}`,
  src: photo.src,
  caption: photo.caption,
  alt: photo.alt,
  temporary: false,
  featured: Boolean(photo.featured),
}));
