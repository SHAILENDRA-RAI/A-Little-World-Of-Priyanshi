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
};

// Automatically uses the correct GitHub Pages base path
const asset = (filename: string) =>
  `${import.meta.env.BASE_URL}assets/priyanshi/${filename}`;

export const photos: Record<PhotoKey, PhotoEntry> = {
  hero: {
    key: 'hero',
    src: asset('01._Hero.png'),
    caption: 'The main character.',
    alt: 'Priyanshi in a pink outfit',
    section: 'introduction',
    temporary: false,
  },

  leader: {
    key: 'leader',
    src: asset('02._Leader.png'),
    caption: 'CEO of taking things seriously.',
    alt: 'Priyanshi speaking at a podium',
    section: 'leadership',
    temporary: false,
  },

  panda: {
    key: 'panda',
    src: asset('03.Panda.png'),
    caption: 'Certified panda behaviour.',
    alt: 'Priyanshi wearing a panda hat',
    section: 'panda',
    temporary: false,
  },

  foodie: {
    key: 'foodie',
    src: asset('04._Foodie.png'),
    caption: 'Happiness, served on a plate.',
    alt: 'Priyanshi holding pizza',
    section: 'foodie',
    temporary: false,
  },

  kindness: {
    key: 'kindness',
    src: asset('05._Kindness.png'),
    caption: 'One of my favourite people.',
    alt: 'Priyanshi smiling',
    section: 'kindness',
    temporary: false,
  },

  friendship: {
    key: 'friendship',
    src: asset('06. Friendship.png'),
    caption: 'A little friendship moment.',
    alt: 'Both of us doing a fist bump',
    section: 'friendship',
    temporary: false,
  },

  hackathon: {
    key: 'hackathon',
    src: asset('07. Hackathon.png'),
    caption: 'One team, countless ideas.',
    alt: 'Both of us working together at a laptop',
    section: 'hackathon',
    temporary: false,
  },

  specialDuo: {
    key: 'specialDuo',
    src: asset('08. Special Duo.png'),
    caption: 'One panda. One human. Double the chaos.',
    alt: 'Both of us with a panda plushie',
    section: 'special-duo',
    temporary: false,
  },

  sih: {
    key: 'sih',
    src: asset('sih_photo.png'),
    caption: 'The team behind the idea.',
    alt: 'Our Smart India Hackathon team',
    section: 'hackathon',
    temporary: false,
  },
};

// All eight photographs available in the memory gallery
export const temporaryMemories = [
  photos.hero,
  photos.leader,
  photos.panda,
  photos.foodie,
  photos.kindness,
  photos.friendship,
  photos.hackathon,
  photos.specialDuo,
].map((photo, index) => ({
  id: `memory-${String(index + 1).padStart(2, '0')}`,
  src: photo.src,
  caption: photo.caption,
  alt: photo.alt,
  temporary: false,
}));
