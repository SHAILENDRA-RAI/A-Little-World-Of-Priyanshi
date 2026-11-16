export type PhotoKey = 'hero' | 'leader' | 'panda' | 'foodie' | 'kindness' | 'sih';

export type PhotoEntry = {
  key: PhotoKey;
  src: string;
  caption: string;
  alt: string;
  section: string;
  temporary: boolean;
};

export const photos: Record<PhotoKey, PhotoEntry> = {
  hero: {
    key: 'hero',
    src: '/assets/priyanshi/01._Hero.png',
    caption: 'The main character.',
    alt: 'Priyanshi in a pink traditional outfit',
    section: 'introduction',
    temporary: false,
  },
  leader: {
    key: 'leader',
    src: '/assets/priyanshi/02._Leader.png',
    caption: 'CEO of taking things seriously.',
    alt: 'Priyanshi speaking at a podium',
    section: 'leadership',
    temporary: false,
  },
  panda: {
    key: 'panda',
    src: '/assets/priyanshi/03.Panda.png',
    caption: 'Certified panda behaviour.',
    alt: 'Priyanshi wearing a panda hat and making a peace sign',
    section: 'panda',
    temporary: false,
  },
  foodie: {
    key: 'foodie',
    src: '/assets/priyanshi/04._Foodie.png',
    caption: 'Happiness, served on a plate.',
    alt: 'Priyanshi holding a pizza',
    section: 'foodie',
    temporary: false,
  },
  kindness: {
    key: 'kindness',
    src: '/assets/priyanshi/05._Kindness.png',
    caption: 'One of my favourite people.',
    alt: 'Priyanshi smiling in a pink outfit',
    section: 'kindness',
    temporary: false,
  },
  sih: {
    key: 'sih',
    src: '/assets/priyanshi/sih_photo.png',
    caption: 'The team behind the idea.',
    alt: 'A team posing at a Smart India Hackathon event',
    section: 'hackathon',
    temporary: false,
  },
};

export const temporaryMemories = [
  { id: 'memory-01', src: photos.hero.src, caption: 'The main character.', alt: photos.hero.alt, temporary: false },
  { id: 'memory-02', src: photos.leader.src, caption: 'The brain behind the PPT.', alt: photos.leader.alt, temporary: false },
  { id: 'memory-03', src: photos.panda.src, caption: 'A little panda energy.', alt: photos.panda.alt, temporary: false },
  { id: 'memory-04', src: photos.foodie.src, caption: 'Happiness, served on a plate.', alt: photos.foodie.alt, temporary: false },
  { id: 'memory-05', src: photos.kindness.src, caption: 'One of my favourite people.', alt: photos.kindness.alt, temporary: false },
  { id: 'memory-06', src: photos.sih.src, caption: 'The team behind the idea.', alt: photos.sih.alt, temporary: false },
];
