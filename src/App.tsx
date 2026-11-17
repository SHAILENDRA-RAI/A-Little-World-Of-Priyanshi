import { useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft, ArrowRight, ArrowUp, Cake, Check, Crown, Gift, Heart,
  LockKeyhole, Mail, Sparkles, Utensils, X, Zap,
} from 'lucide-react';
import { photos, temporaryMemories } from '@/data/photos';

type SectionTitleProps = { eyebrow: string; title: string; copy?: string; light?: boolean };

const pandaMessages = [
  'Panda needs food.', 'Stop scrolling and eat something.', 'Your cuteness has been reported.',
  'Team Leader detected.', 'Another hackathon? Let’s go!', 'Panda approves this friendship.', 'Have you eaten yet?',
];

const gratitudeLines = [
  'Thank you for helping me.', 'Thank you for being there.', 'Thank you for listening.',
  'Thank you for understanding.', 'Thank you for believing in me.', 'Thank you for showing up.',
  'Thank you for teaching me things I didn’t know.', 'Thank you for making difficult days feel lighter.',
  'Thank you for every random conversation.', 'Thank you for every hackathon and every crazy idea.',
  'Thank you for making me laugh when I didn’t feel like smiling.', 'Thank you for being YOU.',
];

function SectionTitle({ eyebrow, title, copy, light = false }: SectionTitleProps) {
  return <div className={`section-heading ${light ? 'section-heading--light' : ''}`}>
    <span className="eyebrow">{eyebrow}</span><h2>{title}</h2>{copy && <p>{copy}</p>}
  </div>;
}

function PandaDoodle({ mood = 'wave' }: { mood?: 'wave' | 'snack' | 'sleep' | 'balloon' }) {
  return <div className={`panda-doodle panda-doodle--${mood}`} aria-hidden="true"><span className="panda-ear panda-ear--left" /><span className="panda-ear panda-ear--right" /><span className="panda-head"><i className="panda-eye panda-eye--left" /><i className="panda-eye panda-eye--right" /><b>•ᴗ•</b></span><span className="panda-body" /><span className="panda-foot panda-foot--left" /><span className="panda-foot panda-foot--right" />{mood === 'snack' && <span className="bamboo">✦</span>}{mood === 'balloon' && <span className="balloon">○</span>}</div>;
}

function Placeholder({ label }: { label: string }) {
  return <div className="photo-placeholder"><span><LockKeyhole size={18} />{label}</span></div>;
}

function App() {
  const [lightsOn, setLightsOn] = useState(false);
  const [lightReveal, setLightReveal] = useState(false);
  const [opened, setOpened] = useState(false);
  const [candlesOut, setCandlesOut] = useState(false);
  const [letterOpen, setLetterOpen] = useState(false);
  const [pandaMessage, setPandaMessage] = useState('');
  const [leaderBadge, setLeaderBadge] = useState(false);
  const [streakOpen, setStreakOpen] = useState(false);
  const [randomMemory, setRandomMemory] = useState<number | null>(null);
  const [lightbox, setLightbox] = useState<number | null>(null);

  const visibleMemory = randomMemory === null ? null : temporaryMemories[randomMemory];
  const currentMemory = lightbox === null ? null : temporaryMemories[lightbox];
  const candles = useMemo(() => Array.from({ length: 20 }, (_, index) => index), []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setLightbox(null);
      if (lightbox !== null && event.key === 'ArrowRight') setLightbox((lightbox + 1) % temporaryMemories.length);
      if (lightbox !== null && event.key === 'ArrowLeft') setLightbox((lightbox - 1 + temporaryMemories.length) % temporaryMemories.length);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightbox]);

  const showPandaMessage = () => setPandaMessage(pandaMessages[Math.floor(Math.random() * pandaMessages.length)]);
  const turnOnLights = () => {
    setLightReveal(true);
    window.setTimeout(() => setLightsOn(true), 1800);
  };
  const showRandomMemory = () => setRandomMemory(Math.floor(Math.random() * temporaryMemories.length));

  return <main>
    {!lightsOn && <section className={`dark-opening ${lightReveal ? 'dark-opening--revealing' : ''}`} aria-label="Turn on the lights">
      <div className="dark-stars" /><div className="dark-opening-glow" /><div className="dark-opening-content"><span className="dark-kicker">A private little universe</span><button className="lights-button" onClick={turnOnLights} disabled={lightReveal}><span className="lights-button-icon"><Sparkles size={18} /></span><span>Turn on the lights</span></button><p>Someone has a little surprise waiting for you...</p></div><span className="dark-opening-mark">17 · 11 · 2026</span>
    </section>}

    {lightsOn && !opened && <section className="opening-screen opening-screen--revealed" aria-label="Opening surprise">
      <div className="confetti confetti--one" /><div className="confetti confetti--two" /><div className="confetti confetti--three" />
      <div className="opening-kicker">A tiny birthday universe, made just for you</div>
      <div className="opening-content"><PandaDoodle mood="balloon" /><div className="cake-illustration"><Cake size={68} strokeWidth={1.2} /><span>20</span></div><p className="handwritten">psst... Priyanshi</p><h1>HEY, PANDA<span>!</span></h1><p className="opening-copy">Someone has made something for you.<br />Not another ordinary birthday wish.<br />Something a little more personal.</p><button className="button button--dark" onClick={() => setOpened(true)}><Gift size={18} /> Open your little surprise</button></div>
      <div className="opening-footer">17 November 2026 <span>•</span> Chapter 20 begins</div>
    </section>}

    {opened && <>
      <header className="site-nav"><a className="brand" href="#top"><span className="brand-mark">P</span><span>Priyanshi <em>20</em></span></a><nav><a href="#story">The story</a><a href="#memories">Memories</a><a href="#letter">The letter</a></nav><button className="nav-panda" onClick={showPandaMessage} aria-label="Ask the panda"><span>●</span></button></header>

      <section className="cake-section" id="top"><div className="cake-copy"><span className="eyebrow">Chapter 20 · birthday ritual</span><h2>Make a wish,<br /><em>Priyanshi.</em></h2><p>Twenty candles for twenty years of being clever, kind, slightly dramatic and completely impossible to replace.</p><button className="button button--pink" onClick={() => setCandlesOut(!candlesOut)}>{candlesOut ? 'Light them again' : 'Blow out the candles'} <Sparkles size={16} /></button>{candlesOut && <div className="birthday-message"><strong>Happy birthday, Priyanshi!</strong><span>17 November 2006 · Chapter 20 begins</span></div>}</div><div className={`birthday-cake ${candlesOut ? 'birthday-cake--out' : ''}`}><div className="cake-candles">{candles.map((candle) => <span key={candle} className="candle"><i /></span>)}</div><div className="cake-top" /><div className="cake-middle" /><div className="cake-bottom" /><div className="cake-plate" /></div><PandaDoodle mood="snack" /></section>

      <section className="hero-section"><div className="hero-copy"><span className="eyebrow">Introducing</span><h2>The main<br /><em>character.</em></h2><p className="hero-lede">One girl. Countless personalities. An unreasonable amount of cuteness.</p><div className="fact-list"><span><small>Birthday</small>17.11.2006</span><span><small>Branch</small>Information Technology</span><span><small>Official status</small>Friend, mentor, team leader</span></div></div><div className="hero-portrait"><div className="portrait-label">01 / the original</div><img src={photos.hero.src} alt={photos.hero.alt} /><span className="portrait-sticker">main character energy</span></div></section>

      <section className="personality-section" id="story"><SectionTitle eyebrow="The many sides of Priyanshi" title="A personality, in little chapters." copy="Some people are easy to describe. You are more of a full editorial spread." /><div className="personality-grid">
        <article className="personality-card personality-card--leader"><div className="card-text"><span className="eyebrow">The leader</span><h3>The one who was born to lead.</h3><p>Some people become leaders because they are given a position. Some become leaders because people naturally trust them. You’re definitely the second kind.</p><p>From problem statements to PPTs, prototypes and hackathons, I’ve learned so much just by being your teammate.</p><button className="text-button" onClick={() => setLeaderBadge(!leaderBadge)}><Crown size={16} /> {leaderBadge ? 'Officially certified' : 'Tap the badge'}</button>{leaderBadge && <div className="mini-note"><Check size={14} /> No elections required. The position is permanent.</div>}</div><img src={photos.leader.src} alt={photos.leader.alt} /></article>
        <article className="personality-card personality-card--panda"><img src={photos.panda.src} alt={photos.panda.alt} /><div className="card-text"><span className="eyebrow">The panda</span><h3>Cuteness level: unreasonable.</h3><p>Your behaviour sometimes makes me wonder whether you’re actually human or a panda who somehow got admission into IT.</p><p className="accent-copy">Cute? Absolutely. Dramatic? Probably. Annoying? Occasionally. Replaceable? Never.</p></div></article>
        <article className="personality-card personality-card--foodie"><div className="foodie-note"><Utensils size={18} /> disclaimer: this panda runs on snacks</div><div className="card-text"><span className="eyebrow">The foodie</span><h3>Food is the answer. What was the question?</h3><p>Bad day? Outside food. Good day? Outside food. Depression? Double outside food. Celebration? Obviously, outside food.</p><p>At this point, your relationship with food deserves its own documentary.</p></div><img src={photos.foodie.src} alt={photos.foodie.alt} /></article>
        <article className="personality-card personality-card--kindness"><div className="card-text"><span className="eyebrow">The one who shows up</span><h3>The person who showed up.</h3><p>Some people enter your life and make it a little happier. Some enter and make difficult days a little easier.</p><p>You did both. I’ll always remember how you stood beside me when I wasn’t doing well. You listened, helped me recover, and even helped me let go of things I couldn’t let go of myself.</p><p>You probably don’t realise how much that meant to me. But I do.</p></div><img src={photos.kindness.src} alt={photos.kindness.alt} /></article>
      </div></section>

      <section className="timeline-section"><div className="timeline-intro"><SectionTitle eyebrow="Our little story" title="Some of the best people enter your life unexpectedly." copy="A scrapbook of the chapters, the chaos and the tiny connections that made this friendship feel like home." /><PandaDoodle mood="wave" /></div><div className="timeline">
        <article className="timeline-entry"><div className="timeline-marker">01</div><div><span className="eyebrow">MNIT E-Summit · where it started</span><h3>Who knew one trip would introduce me to someone so important?</h3><p>I was there as a Campus Ambassador, and you accompanied the group to MNIT Jaipur. That trip began a friendship neither of us had planned for.</p><figure className="timeline-memory-photo">
  <img
    className="timeline-photo"
    src={photos.friendship.src}
    alt={photos.friendship.alt}
  />
  <figcaption>{photos.friendship.caption}</figcaption>
</figure></div></article>
        <article className="timeline-entry timeline-entry--dark"><div className="timeline-marker">02</div><div><span className="eyebrow">Hackathon partners</span><h3>One team. Countless ideas. Questionable sleep schedules.</h3><p>We worked through problem statements, PPTs, prototypes, brainstorming, last-minute changes and everything in between. Every hackathon gave me something new to learn. And somehow, you’re always the person leading the way.</p><img className="timeline-photo" src={photos.sih.src} alt={photos.sih.alt} /></div></article>
        <article className="timeline-entry timeline-entry--duo"><div className="timeline-marker">03</div><div><span className="eyebrow">The special duo</span><h3>One panda. One human. Double the chaos.</h3><p>Honestly, I still haven’t figured out who’s the actual panda here.</p><p>You have the panda energy. I have the questionable decisions. Together, we’re probably a team that shouldn’t be left unsupervised.</p><p>But somehow, we make it work. Officially certified: one of my favourite duos.</p><span className="handwritten timeline-annotation">Two humans? Under investigation.</span><Placeholder label="Special duo photograph coming soon" /><button className="streak-button" onClick={() => setStreakOpen(!streakOpen)}><Zap size={17} /> 154 day streak</button>{streakOpen && <div className="streak-reveal">154 days of snaps. Countless little moments. One friendship worth keeping.</div>}</div></article>
      </div></section>

      <section className="memory-section" id="memories"><SectionTitle eyebrow="The Priyanshi collection" title="A little corner of our memories." copy="Some moments weren’t planned. Some photographs weren’t perfect. But somehow, they’re all worth keeping." light /><div className="memory-actions"><button className="button button--outline" onClick={showRandomMemory}><Sparkles size={17} /> Show me a random memory</button>{visibleMemory && <div className="random-memory"><img src={visibleMemory.src} alt={visibleMemory.alt} /><div><span>randomly selected</span><strong>{visibleMemory.caption}</strong></div></div>}</div><div className="memory-wall">{temporaryMemories.map((memory, index) => <button key={memory.id} className={`memory-photo memory-photo--${index + 1}`} onClick={() => setLightbox(index)} aria-label={`Open memory: ${memory.caption}`}><img src={memory.src} alt={memory.alt} loading="lazy" /><span>{memory.caption}</span><i>temporary visual</i></button>)}</div><p className="closing-line">The best memories are usually the ones we never planned.</p></section>

      <section className="report-section"><div className="report-copy"><SectionTitle eyebrow="Filed under: scientifically questionable" title="Official panda personality report." copy="Results gathered after extensive observation and several outside-food incidents." /><div className="report-list">{[['Leadership', '100/100', '100%'], ['Cuteness', '1000/100', '100%'], ['Food consumption', 'Beyond measurement', '96%'], ['Kindness', 'Infinite', '100%'], ['Friendship score', '11/10', '100%']].map(([label, value, width]) => <div className="report-row" key={label}><div><span>{label}</span><strong>{value}</strong></div><div className="report-track"><i style={{ width }} /></div></div>)}</div></div><div className="report-card"><div className="report-stamp">VERIFIED<br />ISH</div><PandaDoodle mood="sleep" /><div className="report-card-footer">Results: emotionally accurate<br /><small>no elections required</small></div></div></section>

      <section className="appreciation-section"><div className="appreciation-intro"><span className="eyebrow">A note before the year ends</span><h2>Before 2026 ends,<br /><em>there’s something I want you to know.</em></h2></div><div className="gratitude-cloud">{gratitudeLines.map((line, index) => <p className={`gratitude-line gratitude-line--${(index % 4) + 1}`} key={line}>{line}</p>)}</div><div className="appreciation-quote">“I don’t think I say this enough, but having you around has genuinely made my life better.”</div></section>

      <section className="letter-section" id="letter"><div className="letter-intro"><SectionTitle eyebrow="The emotional climax" title="A little something I wanted to tell you." copy="No grand gesture. Just a few honest words, on paper." /><button className="button button--dark" onClick={() => setLetterOpen(!letterOpen)}><Mail size={17} /> {letterOpen ? 'Close the letter' : 'Open your letter'}</button></div><div className={`envelope ${letterOpen ? 'envelope--open' : ''}`}><button type="button" className="envelope-trigger" onClick={() => setLetterOpen(true)} aria-label="Open the birthday letter" > <span className="sr-only">Open the birthday letter</span> </button> <div className="envelope-paper"><div className="letter-content">

  <p>
    Before 2026 ends, there's something I really want you to know.
  </p>

  <p>
    Some people enter our lives unexpectedly and, without even trying,
    become a beautiful part of our everyday stories. You're definitely
    one of those people.
  </p>

  <p>
    I don't think I say this enough, but I'm genuinely grateful to have
    you in my life.
  </p>

  <p>
    Thank you for being there, for listening to my endless conversations,
    tolerating my nonsense, understanding my silences, and making
    ordinary days a little more memorable.
  </p>

  <p>
    Thank you for all the random conversations, unexpected laughs,
    silly arguments, food plans, crazy ideas, and memories that
    probably seemed ordinary at the time but mean a lot to me now.
  </p>

  <p>
    I admire the person you are. Your kindness, your determination,
    your leadership, your craziness, and that little panda energy
    of yours. Never lose any of it.
  </p>

  <p>
    Keep winning, keep leading, keep eating (obviously),
    and keep being the person you are.
  </p>

  <p>
    I hope this new chapter brings you opportunities bigger than
    your dreams, happiness beyond your expectations, and people
    who appreciate you as much as you deserve.
  </p>

  <p className="birthday-highlight">
  Happy 20th Birthday, Priyanshi! 🎀
  </p>

  <p>
    Here's to more adventures, more memories, more food outings,
    more laughter, and hopefully a lifetime supply of reasons to smile.
  </p>

  <p>
    One last thing...
    <br />
    <strong>
      Some friendships are simply too special to be explained in words.
      <br />
      I'm just glad ours is one of them.
    </strong>
  </p>

  <p className="signature">
    With lots of appreciation,
    <br />
    <em>Your Hackathon Teammate & Panda's Official Friend. 🐼</em>
  </p>

</div></div>
<div className="envelope-flap" />
<div className="wax-seal">
  <Heart size={17} fill="currentColor" />
</div>
</div></section>

      <section className="wish-section"><div className="wish-card"><span className="eyebrow">A birthday wish from Shailendra</span><h2>HEY, PRIYANSHI!</h2><p>I hope this year brings you everything you’ve been working for.</p><p>More achievements. Bigger opportunities. New adventures. Crazy hackathons. Unlimited food (obviously). And countless reasons to smile.</p><p>May you continue leading teams, winning hearts, achieving dreams and being the adorable little panda you are.</p><p>Never stop being kind. Never stop being ambitious. And never stop being YOU.</p><strong>WISHING YOU THE HAPPIEST 20TH BIRTHDAY!</strong><small>17.11.2026</small><div className="wish-signature">With lots of love and appreciation,<br /><em>Shailendra Rai</em></div></div></section>

      <footer className="site-footer"><PandaDoodle mood="balloon" /><span className="eyebrow">The end, for now</span><h2>And that’s a little piece<br /><em>of your world.</em></h2><p>Happy 20th Birthday, Priyanshi.<br />Stay kind. Stay crazy. Keep leading. Keep eating.</p><p className="footer-final">The world is a little better with a panda like you in it.</p><div className="footer-credit">Made with friendship, appreciation & a little too much effort.<br /><strong>Designed & Developed by Shailendra Rai.</strong><br />For Priyanshi Jain.</div><button className="back-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Back to the beginning <ArrowUp size={16} /></button><small>No pandas were harmed. Only one friend spent questionable amounts of time building this website.</small></footer>

      <button className="floating-panda" onClick={showPandaMessage} aria-label="Show a panda message"><span>●</span></button>{pandaMessage && <div className="panda-toast" role="status"><PandaDoodle mood="wave" /><span>{pandaMessage}</span><button onClick={() => setPandaMessage('')} aria-label="Close message"><X size={15} /></button></div>}
      {lightbox !== null && currentMemory && <div className="lightbox" role="dialog" aria-modal="true" aria-label="Memory viewer"><button className="lightbox-close" onClick={() => setLightbox(null)} aria-label="Close"><X /></button><button className="lightbox-arrow lightbox-arrow--left" onClick={() => setLightbox((lightbox - 1 + temporaryMemories.length) % temporaryMemories.length)} aria-label="Previous"><ArrowLeft /></button><figure><img src={currentMemory.src} alt={currentMemory.alt} /><figcaption><span>{currentMemory.temporary ? 'temporary memory visual' : 'memory'}</span>{currentMemory.caption}</figcaption></figure><button className="lightbox-arrow lightbox-arrow--right" onClick={() => setLightbox((lightbox + 1) % temporaryMemories.length)} aria-label="Next"><ArrowRight /></button></div>}
    </>}
  </main>;
}

export default App;
