import { useMemo } from 'react';

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
const SMALL_RADIUS = 43;
const BIG_RADIUS = 68;
const STEP_X = Math.sqrt(3) * SMALL_RADIUS;
const STEP_Y = 1.5 * SMALL_RADIUS;
const PADDING = BIG_RADIUS + 12;
const COLUMNS = 14;

function shuffle<T>(items: T[]): T[] {
  const result = [...items];

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
}

// Exact overlap test for two regular hexagons with the same orientation.
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
    axis => Math.abs(dx * axis.x + dy * axis.y) < apothem - 0.5
  );
}

function hexPoints(radius: number) {
  return Array.from({ length: 6 }, (_, index) => {
    const angle = (Math.PI / 180) * (60 * index - 90);

    return `${(radius + radius * Math.cos(angle)).toFixed(2)},${(
      radius + radius * Math.sin(angle)
    ).toFixed(2)}`;
  }).join(' ');
}

function getLayout(memories: Memory[]): {
  items: PositionedMemory[];
  height: number;
} {
  const candidates: { x: number; y: number }[] = [];

  // Generate staggered honeycomb positions.
  for (let row = 0; row < 80; row++) {
    const rowPositions = [];

    for (let col = 0; col < COLUMNS; col++) {
      const x =
        PADDING +
        col * STEP_X +
        (row % 2 === 1 ? STEP_X / 2 : 0);

      if (x <= WIDTH - PADDING) {
        rowPositions.push({
          x,
          y: PADDING + row * STEP_Y,
        });
      }
    }

    candidates.push(...shuffle(rowPositions));
  }

  const placed: PositionedMemory[] = [];

  memories.forEach((memory, index) => {
    const radius = memory.featured ? BIG_RADIUS : SMALL_RADIUS;

    const positionIndex = candidates.findIndex(candidate => {
      const current = { ...candidate, radius };

      return placed.every(existing => !overlaps(current, existing));
    });

    if (positionIndex === -1) return;

    const position = candidates.splice(positionIndex, 1)[0];

    placed.push({
      memory,
      index,
      x: position.x,
      y: position.y,
      radius,
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
  const { items, height } = useMemo(
    () => getLayout(memories),
    [memories]
  );

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
            <stop offset="100%" stopColor="#241713" stopOpacity=".85" />
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
          {items.map(item => {
            const { memory, radius, x, y, index } = item;
            const lines = captionLines(memory.caption);

            return (
              <g
                key={memory.id}
                className={`memory-svg-tile ${
                  memory.featured ? 'memory-svg-tile--featured' : ''
                }`}
                transform={`translate(${x - radius}, ${y - radius})`}
                role="button"
                tabIndex={0}
                aria-label={memory.caption}
                onClick={() => onSelect(index)}
                onKeyDown={event => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    onSelect(index);
                  }
                }}
              >
                <title>{memory.caption}</title>

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
                        lineIndex * (memory.featured ? 16 : 12)
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
            );
          })}
        </g>
      </svg>
    </div>
  );
}
