import { useMemo, useState } from 'react';

type Memory = {
  id: string;
  src: string;
  alt: string;
  caption: string;
  featured?: boolean;
};

type Props = {
  memories: Memory[];
  onSelect: (index: number) => void;
};

type PositionedMemory = {
  memory: Memory;
  index: number;
  x: number;
  y: number;
  radius: number;
};

const WIDTH = 1200;

const SMALL_RADIUS = 51;
const BIG_RADIUS = 79;

const STEP_X = Math.sqrt(3) * SMALL_RADIUS;
const STEP_Y = 1.5 * SMALL_RADIUS;

const PADDING = BIG_RADIUS + 8;
const COLUMNS = 14;

function shuffle<T>(items: T[]): T[] {
  const result = [...items];

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
}

function overlaps(
  a: { x: number; y: number; radius: number },
  b: { x: number; y: number; radius: number }
) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;

  const apothem = (Math.sqrt(3) / 2) * (a.radius + b.radius);

  const axes = [
    { x: 1, y: 0 },
    { x: 0.5, y: Math.sqrt(3) / 2 },
    { x: -0.5, y: Math.sqrt(3) / 2 },
  ];

  return axes.every(
    axis =>
      Math.abs(dx * axis.x + dy * axis.y) < apothem - 0.5
  );
}

function hexPoints(radius: number) {
  return Array.from({ length: 6 }, (_, index) => {
    const angle = (Math.PI / 180) * (60 * index - 90);

    return `${(
      radius + radius * Math.cos(angle)
    ).toFixed(2)},${(
      radius + radius * Math.sin(angle)
    ).toFixed(2)}`;
  }).join(' ');
}

function getLayout(memories: Memory[]) {
  const candidates: { x: number; y: number }[] = [];

  // Generate the complete staggered honeycomb.
  for (let row = 0; row < 80; row++) {
    for (let col = 0; col < COLUMNS; col++) {
      const x =
        PADDING +
        col * STEP_X +
        (row % 2 === 1 ? STEP_X / 2 : 0);

      if (x <= WIDTH - PADDING) {
        candidates.push({
          x,
          y: PADDING + row * STEP_Y,
        });
      }
    }
  }

  const featured = shuffle(
    memories
      .map((memory, index) => ({ memory, index }))
      .filter(item => item.memory.featured)
  );

  const regular = shuffle(
    memories
      .map((memory, index) => ({ memory, index }))
      .filter(item => !item.memory.featured)
  );

  const placed: PositionedMemory[] = [];

  // Eight balanced positions for the featured photos.
  const featuredSlots = [
    [0.13, 1.4],
    [0.37, 1.4],
    [0.63, 1.4],
    [0.87, 1.4],

    [0.13, 5.3],
    [0.37, 5.3],
    [0.63, 5.3],
    [0.87, 5.3],
  ];

  featured.forEach((item, index) => {
    const [targetX, targetRow] = featuredSlots[index] ?? [
      0.5,
      8 + index,
    ];

    const target = {
      x: WIDTH * targetX,
      y: PADDING + STEP_Y * targetRow,
    };

    let bestIndex = -1;
    let bestDistance = Infinity;

    candidates.forEach((candidate, candidateIndex) => {
      const current = {
        ...candidate,
        radius: BIG_RADIUS,
      };

      const valid = placed.every(
        existing => !overlaps(current, existing)
      );

      if (!valid) return;

      const distance = Math.hypot(
        candidate.x - target.x,
        candidate.y - target.y
      );

      if (distance < bestDistance) {
        bestDistance = distance;
        bestIndex = candidateIndex;
      }
    });

    if (bestIndex === -1) return;

    const position = candidates.splice(bestIndex, 1)[0];

    placed.push({
      ...item,
      x: position.x,
      y: position.y,
      radius: BIG_RADIUS,
    });
  });

  // Fill the remaining honeycomb positions.
  regular.forEach(item => {
    const positionIndex = candidates.findIndex(candidate => {
      const current = {
        ...candidate,
        radius: SMALL_RADIUS,
      };

      return placed.every(
        existing => !overlaps(current, existing)
      );
    });

    if (positionIndex === -1) return;

    const position = candidates.splice(positionIndex, 1)[0];

    placed.push({
      ...item,
      x: position.x,
      y: position.y,
      radius: SMALL_RADIUS,
    });
  });

  const height = Math.max(
    700,
    ...placed.map(item => item.y + item.radius + PADDING)
  );

  return { items: placed, height };
}

function captionLines(caption: string) {
  const words = caption.split(' ');
  const lines: string[] = [];
  let current = '';

  words.forEach(word => {
    const next = current ? `${current} ${word}` : word;

    if (next.length > 19 && current) {
      lines.push(current);
      current = word;
    } else {
      current = next;
    }
  });

  if (current) lines.push(current);

  return lines.slice(0, 2);
}

export default function MemoryHoneycomb({
  memories,
  onSelect,
}: Props) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(
    null
  );

  const { items, height } = useMemo(
    () => getLayout(memories),
    [memories]
  );

  const hoveredItem = items.find(
    item => item.index === hoveredIndex
  );

