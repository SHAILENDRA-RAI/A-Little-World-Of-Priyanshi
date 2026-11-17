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

  // Draw the active image last so it appears above its neighbours.
  const renderItems =
    hoveredIndex === null
      ? items
      : [
          ...items.filter(item => item.index !== hoveredIndex),
          ...items.filter(item => item.index === hoveredIndex),
        ];

  return (
    <div className="memory-svg-container">
      <svg
        className="memory-svg-wall"
        viewBox={`0 0 ${WIDTH} ${height}`}
        role="group"
        aria-label="Priyanshi's memory gallery"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient
            id="memory-caption-gradient"
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop offset="0%" stopColor="#241713" stopOpacity="0" />
            <stop offset="100%" stopColor="#241713" stopOpacity=".88" />
          </linearGradient>

          {items.map(item => (
            <clipPath
              id={`clip-${item.memory.id}`}
              key={`clip-${item.memory.id}`}
            >
              <polygon points={hexPoints(item.radius)} />
            </clipPath>
          ))}
        </defs>

        <g className="memory-svg-grid">
          {renderItems.map(item => {
            const {
              memory,
              radius,
              x,
              y,
              index,
            } = item;

            const isHovered = hoveredIndex === index;

            const isNearby =
              hoveredItem !== undefined &&
              !isHovered &&
              Math.hypot(
                hoveredItem.x - x,
                hoveredItem.y - y
              ) < STEP_X * 1.85;

            const lines = captionLines(memory.caption);

            return (
              <g
                key={memory.id}
                className="memory-svg-tile"
                transform={`translate(${x - radius}, ${y - radius})`}
                style={{
                  animationDelay: `${Math.min(index, 35) * 15}ms`,
                }}
                onPointerEnter={event => {
                  if (event.pointerType !== 'touch') {
                    setHoveredIndex(index);
                  }
                }}
                onPointerLeave={() => setHoveredIndex(null)}
                onClick={() => onSelect(index)}
                onKeyDown={event => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    onSelect(index);
                  }
                }}
                role="button"
                tabIndex={0}
                aria-label={memory.caption}
              >
                <title>{memory.caption}</title>

                <g
                  className={`memory-svg-tile-inner ${
                    isHovered ? 'is-active' : ''
                  } ${isNearby ? 'is-nearby' : ''}`}
                >
                  <polygon
                    points={hexPoints(radius)}
                    className="memory-svg-border"
                  />

                  <image
                    href={memory.src}
                    x="0"
                    y="0"
                    width={radius * 2}
                    height={radius * 2}
                    preserveAspectRatio="xMidYMid slice"
                    clipPath={`url(#clip-${memory.id})`}
                  />

                  <g
                    className="memory-svg-caption"
                    clipPath={`url(#clip-${memory.id})`}
                  >
                    <rect
                      x="0"
                      y={radius * 0.55}
                      width={radius * 2}
                      height={radius}
                      fill="url(#memory-caption-gradient)"
                    />

                    {lines.map((line, lineIndex) => (
                      <text
                        key={lineIndex}
                        x={radius}
                        y={
                          radius * 1.42 +
                          lineIndex *
                            (memory.featured ? 16 : 13)
                        }
                        textAnchor="middle"
                        className="memory-svg-caption-text"
                      >
                        {line}
                      </text>
                    ))}
                  </g>

                  <polygon
                    points={hexPoints(radius)}
                    className="memory-svg-outline"
                  />
                </g>
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
}
