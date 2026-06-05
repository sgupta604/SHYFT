/* ============================================================
   Commons UI kit — Today (home / backbone)
   ============================================================ */

function TodayScreen({ announcements, events, kudos, status, weather, out, onOpenAnnouncement, onDeepLink, onRSVP, onCheer, onSeeAllKudos, pluginSlot, goTab }) {
  const nextEvent = events[0];
  return (
    <div className="c-scroll">
      <StatusBanner tone={status.tone} icon={status.icon} title={status.title} text={status.text} />

      <WeatherCard w={weather} />

      <SectionHeader title="Announcements" action="See all" onAction={() => goTab('today')} />
      {announcements.map(a => (
        <AnnouncementCard key={a.id} a={a} onOpen={() => onOpenAnnouncement(a)} onDeepLink={onDeepLink} />
      ))}

      <SectionHeader title="Out today" action="Calendar" onAction={() => goTab('people')} />
      <div className="c-card pad" style={{ paddingTop: 4, paddingBottom: 4 }}>
        {out.map((o, i) => <OutRow key={o.name} o={o} last={i === out.length - 1} />)}
      </div>

      <SectionHeader title="Coming up" action="All events" onAction={() => goTab('events')} />
      <EventCard e={nextEvent} onRSVP={onRSVP} onOpen={() => goTab('events')} />

      {pluginSlot}

      <SectionHeader title="Recent kudos" action="See all" onAction={onSeeAllKudos} />
      <KudosCard k={kudos[0]} onCheer={onCheer} />
    </div>
  );
}

Object.assign(window, { TodayScreen });
