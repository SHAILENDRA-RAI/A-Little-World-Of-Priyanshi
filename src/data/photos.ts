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

// All 54 photographs in the memory gallery
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

export const temporaryMemories = [
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
    id: `extra-memory-${index + 1}`,
    src: asset(filename),
    caption: `Little moment ${String(index + 1).padStart(2, "0")}`,
    alt: `Priyanshi photo ${index + 1}`,
    section: "memories",
    temporary: false,
  })),
].map((photo, index) => ({
  id: "id" in photo
    ? photo.id
    : `featured-memory-${String(index + 1).padStart(2, "0")}`,
  src: photo.src,
  caption: photo.caption,
  alt: photo.alt,
  temporary: false,
}));
