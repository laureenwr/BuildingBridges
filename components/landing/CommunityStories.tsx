'use client';

import type { MutableRefObject } from 'react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useLandingLocale } from '@/lib/landing/locale';
import {
  getAllCommunityStories,
  stripHtml,
  type CommunityStoryData,
  type StoryType,
} from '@/lib/content/communityStories';
import './community-stories.css';

type StoryFormat = 'immersive' | 'card' | 'video' | 'timeline' | 'quotes' | 'globe' | 'album';
type StoryFilter = 'all' | StoryType;

const StoryGlobe = dynamic(() => import('./StoryGlobe').then((m) => m.StoryGlobe), {
  ssr: false,
});

function TrustedHtml({ html, className }: { html: string; className?: string }) {
  return <span className={className} dangerouslySetInnerHTML={{ __html: html }} />;
}

export function CommunityStories({ extraStories = [] }: { extraStories?: CommunityStoryData[] }) {
  const { locale, t } = useLandingLocale();
  const allStories = useMemo(
    () => [...extraStories, ...getAllCommunityStories(locale)],
    [extraStories, locale]
  );
  const [filter, setFilter] = useState<StoryFilter>('all');
  const [view, setView] = useState<'browser' | 'viewer'>('browser');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [format, setFormat] = useState<StoryFormat>('immersive');
  const [cardChapter, setCardChapter] = useState(0);
  const [albumIndex, setAlbumIndex] = useState(0);
  const [activeChapter, setActiveChapter] = useState(0);
  const touchStartX = useRef(0);
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  const visibleStories = useMemo(() => {
    if (filter === 'all') return allStories;
    return allStories.filter((s) => s.type === filter);
  }, [allStories, filter]);

  const publishedCount = visibleStories.length;
  const placeholders = Math.max(0, 3 - publishedCount);

  const story = selectedId ? allStories.find((item) => item.id === selectedId) : undefined;

  const albumSlides = useMemo(() => {
    if (!story) return [];
    const coverOverline = t('Building Bridges · Mentor Story', 'Building Bridges · Mentorinnen-Story');
    const slides: Array<{
      overline: string;
      titleHtml: string;
      body: string;
      quote: string;
      bg: string;
      deco: string;
    }> = [
      {
        overline: coverOverline,
        titleHtml: story.headline,
        body: story.tagline,
        quote: '',
        bg: story.chapters[0]?.albumBg ?? '',
        deco: story.chapters[0]?.albumDeco ?? '',
      },
      ...story.chapters.map((ch) => ({
        overline: `${t('Chapter', 'Kapitel')} ${ch.num} · ${ch.label}`,
        titleHtml: ch.heading,
        body: stripHtml(ch.body).slice(0, 200) + (stripHtml(ch.body).length > 200 ? '…' : ''),
        quote: ch.quote,
        bg: ch.albumBg,
        deco: ch.albumDeco,
      })),
      {
        overline: t('Building Bridges · Community', 'Building Bridges · Community'),
        titleHtml: t('More stories<br><em>are coming</em>', 'Weitere Stories<br><em>folgen</em>'),
        body: t(
          'This is one of many journeys. Share yours and inspire the next generation of FLINTA* of Colour in psychosocial careers.',
          'Dies ist eine von vielen Reisen. Teile deine und inspiriere die nächste Generation FLINTA* of Colour in psychosozialen Karrieren.'
        ),
        quote: '',
        bg: 'linear-gradient(160deg,#0c0428,#1a0438,#060410)',
        deco: 'radial-gradient(circle,#B580FF,transparent 70%)',
      },
    ];
    return slides;
  }, [story, locale, t]);

  const albumTotal = albumSlides.length;

  const goAlbum = useCallback(
    (idx: number) => {
      setAlbumIndex(Math.max(0, Math.min(idx, albumTotal - 1)));
    },
    [albumTotal]
  );

  useEffect(() => {
    if (format !== 'album' || view !== 'viewer') return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goAlbum(albumIndex + 1);
      if (e.key === 'ArrowLeft') goAlbum(albumIndex - 1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [format, view, albumIndex, goAlbum]);

  useEffect(() => {
    setAlbumIndex(0);
    setActiveChapter(0);
  }, [selectedId]);

  useEffect(() => {
    if (view !== 'viewer' || format !== 'immersive') return;
    const stage = stageRef.current;
    if (!stage) return;

    const updateActiveChapter = () => {
      const chapters = Array.from(stage.querySelectorAll<HTMLElement>('[data-chapter]'));
      if (chapters.length === 0) return;
      let current = 0;
      chapters.forEach((chapter, index) => {
        if (chapter.getBoundingClientRect().top - stage.getBoundingClientRect().top < stage.clientHeight * 0.42) {
          current = index;
        }
      });
      setActiveChapter(current);
    };

    updateActiveChapter();
    stage.addEventListener('scroll', updateActiveChapter, { passive: true });
    return () => stage.removeEventListener('scroll', updateActiveChapter);
  }, [view, format, selectedId]);

  useEffect(() => {
    if (format === 'album') setAlbumIndex(0);
  }, [format]);

  useEffect(() => {
    if (view !== 'viewer') return;
    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setView('browser');
      setSelectedId(null);
      sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [view]);

  const scrollToStoryTool = () => {
    document.getElementById('ai-story-tool')?.scrollIntoView({ behavior: 'smooth' });
  };

  const openStory = (id: string) => {
    setSelectedId(id);
    setView('viewer');
    setFormat('immersive');
    setCardChapter(0);
    setAlbumIndex(0);
    sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const closeViewer = () => {
    setView('browser');
    setSelectedId(null);
    sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const filters: { id: StoryFilter; label: string }[] = [
    { id: 'all', label: t('All', 'Alle') },
    { id: 'mentor', label: t('Mentors', 'Mentorinnen') },
    { id: 'participant', label: t('Participants', 'Teilnehmende') },
    { id: 'researcher', label: t('Researchers', 'Forschende') },
  ];

  const formats: { id: StoryFormat; icon: string; label: string }[] = [
    { id: 'immersive', icon: '📖', label: t('Immersive', 'Immersiv') },
    story?.videoSrc
      ? { id: 'video', icon: '▶', label: t('Video', 'Video') }
      : { id: 'card', icon: '🃏', label: t('Story Card', 'Story-Karte') },
    { id: 'timeline', icon: '⏱', label: t('Timeline', 'Zeitleiste') },
    { id: 'quotes', icon: '❝', label: t('Quotes', 'Zitate') },
    { id: 'globe', icon: '🌐', label: t('Globe', 'Globus') },
    { id: 'album', icon: '🖼', label: t('Album', 'Album') },
  ];

  const viewingLabel = formats.find((item) => item.id === format)?.label ?? t('Immersive', 'Immersiv');

  const scrollToChapter = (index: number) => {
    setFormat('immersive');
    requestAnimationFrame(() => {
      const chapter = stageRef.current?.querySelector<HTMLElement>(`[data-chapter="${index}"]`);
      chapter?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  const placeholderLabels = [
    t('Interview in progress…', 'Interview läuft…'),
    t('Coming soon', 'Demnächst'),
    t('Coming soon', 'Demnächst'),
  ];

  const browserCount =
    publishedCount === 1
      ? t('1 story published', '1 Story veröffentlicht')
      : t(`${publishedCount} stories published`, `${publishedCount} Stories veröffentlicht`);

  const chaptersWord = t('chapters', 'Kapitel');

  return (
    <section ref={sectionRef} id="community-stories" className="community-stories scroll-mt-[70px]">
      <div className="cs-inner">
        <div className="cs-eyebrow">{t('Community Stories — Building Bridges', 'Community Stories — Building Bridges')}</div>
        <h2 className="cs-title">
          {t('Stories that ', 'Geschichten, die ')}
          <em>{t('build bridges', 'Brücken bauen')}</em>
        </h2>
        <p className="cs-subtitle">
          {t(
            'Real experiences from mentors, researchers and participants — shared to inspire, connect and empower. More stories are added as interviews are conducted.',
            'Echte Erfahrungen von Mentorinnen, Forschenden und Teilnehmende — geteilt, um zu inspirieren, zu verbinden und zu stärken. Weitere Stories werden mit laufenden Interviews ergänzt.'
          )}
        </p>

        {view === 'browser' ? (
          <>
            <div className="browser-meta">
              <div className="browser-count">{browserCount}</div>
              <div className="browser-filters" role="tablist" aria-label={t('Filter stories', 'Stories filtern')}>
                {filters.map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    role="tab"
                    aria-selected={filter === f.id}
                    className={`filter-btn ${filter === f.id ? 'active' : ''}`}
                    onClick={() => setFilter(f.id)}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="stories-grid">
              {visibleStories.map((s) => (
                <button key={s.id} type="button" className="story-browse-card" onClick={() => openStory(s.id)}>
                  <div className="sbc-header">
                    <div className="sbc-avatar" style={{ background: s.avatarBg }}>
                      {s.avatar}
                    </div>
                    <div className="sbc-meta">
                      <div className="sbc-name">{s.name}</div>
                      <div className="sbc-origin">{s.origin}</div>
                    </div>
                  </div>
                  <div className="sbc-tags">
                    {s.tags.map((tag, i) => (
                      <span key={tag} className={`sbc-tag ${s.tagStyles[i] || ''}`}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="sbc-teaser">{s.teaser}</div>
                  <div className="sbc-footer">
                    <span className="sbc-chapters">
                      {s.chapters.length} {chaptersWord}
                    </span>
                    <span className="sbc-read-btn">
                      {t('Read story', 'Story lesen')} →
                    </span>
                  </div>
                </button>
              ))}
              {Array.from({ length: placeholders }).map((_, i) => (
                <div key={`ph-${i}`} className="story-browse-card placeholder">
                  <div className="sbc-coming">
                    <div className="sbc-coming-icon">📖</div>
                    <div className="sbc-coming-text">
                      {placeholderLabels[i]}
                      <br />
                      {t('More interviews are being conducted.', 'Weitere Interviews laufen.')}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="cta-strip">
              <div className="cta-left">
                <div className="cta-eyebrow">{t('Share Your Story', 'Teile deine Story')}</div>
                <div className="cta-title">{t('Your journey belongs here too', 'Auch deine Reise gehört hierher')}</div>
                <div className="cta-sub">
                  {t(
                    'More interviews are being conducted. In the meantime, use the Story Creation Tool above to share your own experience.',
                    'Weitere Interviews laufen. In der Zwischenzeit kannst du mit dem Story-Creation-Tool oben deine eigene Erfahrung teilen.'
                  )}
                </div>
              </div>
              <div className="cta-right-wrap">
                <div>
                  <div className="cs-avatars" aria-hidden>
                    <div className="cs-av">👩🏾</div>
                    <div className="cs-av">👩🏽</div>
                    <div className="cs-av">👩🏿</div>
                    <div className="cs-av">👩🏻</div>
                  </div>
                  <div className="cta-meta">
                    {publishedCount === 1
                      ? t('1 story · more coming soon', '1 Story · weitere demnächst')
                      : t(
                          `${publishedCount} stories · more coming soon`,
                          `${publishedCount} Stories · weitere demnächst`
                        )}
                  </div>
                </div>
                <button type="button" className="cta-btn" onClick={scrollToStoryTool}>
                  ✍️ {t('Create Your Story', 'Story erstellen')}
                </button>
              </div>
            </div>
          </>
        ) : null}
      </div>
      {story && view === 'viewer'
        ? createPortal(
            <div className="community-stories">
              <div className="story-viewer-modal" role="dialog" aria-modal="true" aria-labelledby="story-viewer-title">
                <div className="story-reader">
                  <nav className="reader-rail" aria-label={t('Story view modes', 'Story-Ansichten')}>
                    <div className="rail-brand">
                      <Image
                        src="/logo.png"
                        alt="Building Bridges"
                        width={40}
                        height={40}
                        className="rail-logo"
                      />
                      <span>
                        Building<em>Bridges</em>
                      </span>
                    </div>
                    {formats.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        className={`rail-item ${format === item.id ? 'active' : ''}`}
                        aria-pressed={format === item.id}
                        onClick={() => setFormat(item.id)}
                      >
                        <span className="rail-icon" aria-hidden>
                          {item.icon}
                        </span>
                        <span className="rail-label">{item.label}</span>
                      </button>
                    ))}
                    <div className="rail-spacer" />
                    <button type="button" className="rail-item rail-exit" onClick={closeViewer}>
                      <span className="rail-icon" aria-hidden>
                        ✕
                      </span>
                      <span className="rail-label">{t('Exit story', 'Story verlassen')}</span>
                    </button>
                  </nav>

                  <main
                    ref={stageRef}
                    className={`reader-stage ${format === 'immersive' ? 'is-read' : 'is-wide'}${format === 'video' ? ' is-video' : ''}`}
                  >
                    <div className="reader-stage-inner">
                      {format !== 'immersive' ? (
                        <h1 id="story-viewer-title" className="sr-only">
                          {story.name}
                        </h1>
                      ) : null}
                      <StoryViewerFormats
                        story={story}
                        format={format}
                        viewingLabel={viewingLabel}
                        cardChapter={cardChapter}
                        setCardChapter={setCardChapter}
                        albumSlides={albumSlides}
                        albumIndex={albumIndex}
                        goAlbum={goAlbum}
                        touchStartX={touchStartX}
                        t={t}
                      />
                    </div>
                  </main>

                  <div className="reader-progress" aria-hidden={format !== 'immersive'}>
                    {story.chapters.map((chapter, index) => (
                      <div key={chapter.num} className="progress-step">
                        {index > 0 ? <div className="progress-line" /> : null}
                        <button
                          type="button"
                          className={`progress-dot ${format === 'immersive' && activeChapter === index ? 'current' : ''}`}
                          aria-label={`${t('Chapter', 'Kapitel')} ${chapter.num} · ${chapter.label}`}
                          onClick={() => scrollToChapter(index)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>,
            document.body
          )
        : null}
    </section>
  );
}

function firstSentence(text: string): string {
  const t = stripHtml(text).trim();
  const dot = t.indexOf('.');
  return dot > 0 ? t.slice(0, dot + 1) : t.slice(0, 120);
}

function StoryViewerFormats({
  story,
  format,
  viewingLabel,
  cardChapter,
  setCardChapter,
  albumSlides,
  albumIndex,
  goAlbum,
  touchStartX,
  t,
}: {
  story: CommunityStoryData;
  format: StoryFormat;
  viewingLabel: string;
  cardChapter: number;
  setCardChapter: (n: number) => void;
  albumSlides: Array<{ overline: string; titleHtml: string; body: string; quote: string; bg: string; deco: string }>;
  albumIndex: number;
  goAlbum: (i: number) => void;
  touchStartX: MutableRefObject<number>;
  t: (en: string, de: string) => string;
}) {
  const immOverline = `Building Bridges · ${story.field} · ${story.origin}`;

  return (
    <>
      <div className={`fmt-view ${format === 'immersive' ? 'active' : ''}`} id="fmt-immersive" hidden={format !== 'immersive'}>
        <div className="immersive-shell">
          <div className="imm-hero">
            <div className="imm-overline">{immOverline}</div>
            <h1 id="story-viewer-title" className="imm-h1">
              <TrustedHtml html={story.headline} />
            </h1>
            <div className="imm-meta-row">
              {story.tags.map((tag, i) => (
                <span key={tag} className={`imm-badge ${story.tagStyles[i] || ''}`}>
                  {tag}
                </span>
              ))}
              <span className="imm-viewing">
                {t('Viewing:', 'Ansicht:')} <strong>{viewingLabel}</strong>
              </span>
            </div>
          </div>
          <div className="imm-chapters">
            {story.chapters.map((ch, index) => (
              <div key={ch.num} className="imm-ch" data-chapter={index}>
                <div className="imm-ch-num">
                  {ch.num} · {ch.label}
                </div>
                <div className="imm-ch-heading">
                  <TrustedHtml html={ch.heading} />
                </div>
                <div className="imm-ch-body">
                  <TrustedHtml html={ch.body} />
                </div>
                {ch.quote ? (
                  <div className="imm-quote">
                    &ldquo;{ch.quote}&rdquo;
                    {ch.quoteCaption ? <cite>{ch.quoteCaption}</cite> : null}
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={`fmt-view ${format === 'video' ? 'active' : ''}`} id="fmt-video" hidden={format !== 'video'}>
        {story.videoSrc ? (
          <div className="story-video-panel">
            <video className="story-video-player" controls playsInline preload="metadata" aria-label={story.name}>
              <source src={story.videoSrc} type="video/mp4" />
            </video>
          </div>
        ) : null}
      </div>

      <div className={`fmt-view ${format === 'card' ? 'active' : ''}`} id="fmt-card" hidden={format !== 'card'}>
        <div className="card-format">
          <div className="story-card-main">
            <div className="sc-portrait" style={{ background: story.avatarBg }}>
              {story.avatar}
            </div>
            <div className="sc-name">{story.name}</div>
            <div className="sc-role">
              {story.field} · {story.origin}
            </div>
            <div className="sc-story-text">{story.cardText}</div>
            <div className="sc-key-quote">{story.keyQuote}</div>
            <div className="sc-tags">
              {story.tags.map((tag) => (
                <span key={tag} className="sc-tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="card-chapters">
            {story.chapters.map((ch, i) => (
              <button
                key={ch.num}
                type="button"
                className={`ch-mini ${cardChapter === i ? 'active' : ''}`}
                onClick={() => setCardChapter(i)}
              >
                <div className="ch-mini-num">
                  {t('Chapter', 'Kapitel')} {i + 1}
                </div>
                <div className="ch-mini-title">
                  {ch.icon} {ch.label}
                </div>
                <div className="ch-mini-snippet">{stripHtml(ch.body).slice(0, 90)}…</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className={`fmt-view ${format === 'timeline' ? 'active' : ''}`} id="fmt-timeline" hidden={format !== 'timeline'}>
        <div className="timeline-header">
          <div className="tl-mentor-row">
            <div className="tl-avatar" style={{ background: story.avatarBg }}>
              {story.avatar}
            </div>
            <div>
              <div className="tl-mentor-name">{story.name}</div>
              <div className="tl-mentor-role">
                {story.field} · {story.origin}
              </div>
            </div>
          </div>
          <div className="tl-desc">{story.timelineDesc}</div>
        </div>
        <div className="timeline-track">
          {story.chapters.map((ch) => (
            <div key={ch.num} className="tl-item">
              <div className="tl-dot-col">
                <div className={`tl-dot ${ch.dotClass}`.trim()} />
              </div>
              <div className="tl-content">
                <div className="tl-period">{ch.period}</div>
                <div className="tl-icon" aria-hidden>
                  {ch.icon}
                </div>
                <div className="tl-ch-title">
                  <TrustedHtml html={ch.heading} />
                </div>
                <div className="tl-ch-body">
                  <TrustedHtml html={ch.body} />
                </div>
                {ch.quote ? <div className="tl-ch-quote">&ldquo;{ch.quote}&rdquo;</div> : null}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={`fmt-view ${format === 'quotes' ? 'active' : ''}`} id="fmt-quotes" hidden={format !== 'quotes'}>
        <div className="quotes-header">
          <div className="qh-avatar" style={{ background: story.avatarBg }}>
            {story.avatar}
          </div>
          <div>
            <div className="qh-name">{story.name}</div>
            <div className="qh-sub">
              {story.field} · {story.origin}
            </div>
          </div>
        </div>
        <div className="quotes-grid">
          {story.chapters.map((ch, i) => {
            const col = story.quoteColors[i % story.quoteColors.length];
            const qText = ch.quote || firstSentence(ch.body);
            return (
              <div
                key={ch.num}
                className="quote-card"
                style={{ background: col.bg, border: `1px solid ${col.border}` }}
              >
                <span className="qc-mark" style={{ color: col.border }}>
                  &ldquo;
                </span>
                <div className="qc-text">{qText}</div>
                <div className="qc-chapter">
                  {t('Chapter', 'Kapitel')} {i + 1} · {ch.label}
                </div>
                <div className="qc-bar" style={{ background: col.bar }} />
              </div>
            );
          })}
        </div>
      </div>

      <div className={`fmt-view ${format === 'globe' ? 'active' : ''}`} id="fmt-globe" hidden={format !== 'globe'}>
        {format === 'globe' && story.id === 'cairo-to-charite' ? (
          <iframe
            className="cairo-globe-iframe"
            src="/cairo-to-charite-globe.html"
            title="From Cairo to Charité — 3D Globe"
            allow="autoplay"
          />
        ) : format === 'globe' ? (
          <StoryGlobe story={story} t={t} />
        ) : null}
      </div>

      <div
        className={`fmt-view ${format === 'album' ? 'active' : ''}`}
        id="fmt-album"
        hidden={format !== 'album'}
        onTouchStart={(e) => {
          touchStartX.current = e.touches[0].clientX;
        }}
        onTouchEnd={(e) => {
          const diff = touchStartX.current - e.changedTouches[0].clientX;
          if (Math.abs(diff) > 40) goAlbum(albumIndex + (diff > 0 ? 1 : -1));
        }}
      >
        <div className="album-board-shell">
          <div className="album-board">
            <div className="album-board-intro">
              <div className="album-board-kicker">📷 {t('Memory Album', 'Erinnerungsalbum')}</div>
              <h3>
                {t('Memories, ', 'Erinnerungen, ')}
                <em>{t('stacked', 'gestapelt')}</em>
              </h3>
              <p>{t('Click any polaroid to read that memory in detail.', 'Klicke auf ein Polaroid, um diese Erinnerung genauer zu lesen.')}</p>
            </div>
            <div className="album-polaroids">
              {albumSlides.map((sl, i) => {
                const chapter = i > 0 && i <= story.chapters.length ? story.chapters[i - 1] : undefined;
                const rotations = [-6, 4, -3, 7, -5, 3, -2, 5];
                return (
                  <button
                    key={i}
                    type="button"
                    className={`album-polaroid ${i === albumIndex ? 'active' : ''}`}
                    style={{ transform: `rotate(${rotations[i % rotations.length]}deg)` }}
                    onClick={() => goAlbum(i)}
                    aria-current={i === albumIndex}
                  >
                    <span className="album-photo" style={{ background: sl.bg }}>
                      <span className="album-photo-wash" style={{ background: sl.deco }} />
                      <span className="album-photo-icon">{chapter?.icon ?? story.avatar}</span>
                    </span>
                    <span className="album-caption">{chapter?.label ?? story.name}</span>
                    <span className="album-stamp">{i === 0 ? t('Start', 'Start') : String(i).padStart(2, '0')}</span>
                  </button>
                );
              })}
            </div>
            <aside className="album-memory-note">
              <div className="album-note-overline">{albumSlides[albumIndex]?.overline}</div>
              <h4>
                <TrustedHtml html={albumSlides[albumIndex]?.titleHtml ?? ''} />
              </h4>
              {albumSlides[albumIndex]?.body ? <p>{albumSlides[albumIndex]?.body}</p> : null}
              {albumSlides[albumIndex]?.quote ? <blockquote>&ldquo;{albumSlides[albumIndex].quote}&rdquo;</blockquote> : null}
              <div className="album-note-controls">
                <button type="button" onClick={() => goAlbum(albumIndex - 1)} aria-label={t('Previous memory', 'Vorherige Erinnerung')}>
                  ←
                </button>
                <span>
                  {albumIndex + 1} / {albumSlides.length}
                </span>
                <button type="button" onClick={() => goAlbum(albumIndex + 1)} aria-label={t('Next memory', 'Nächste Erinnerung')}>
                  →
                </button>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
