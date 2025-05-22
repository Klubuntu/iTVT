export async function fetchPrograms() {
  const res = await fetch('https://epg.itvt.xyz/api/epg'); // Podmień na swoje API
  if (!res.ok) {
    throw new Error('Failed to fetch programs');
  }

  const channels = await res.json();

  const formatHHmm = (date) =>
    `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;

  const formatMMDD = (date) =>
    `${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;

  const formatYYYYMMDD = (date) =>
    `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

  const allPrograms = channels.flatMap(channel =>
    channel.epg.map(program => {
      const start = new Date(program.start);
      const end = new Date(program.end);

      const sameDay =
        start.getFullYear() === end.getFullYear() &&
        start.getMonth() === end.getMonth() &&
        start.getDate() === end.getDate();

      return {
        ...program,
        channelName: channel.name,
        channelCategory: channel.category,
        date: formatYYYYMMDD(start),
        startTime: sameDay
          ? formatHHmm(start)
          : `${formatHHmm(start)} `,
        endTime: sameDay
          ? formatHHmm(end)
          : `${formatHHmm(end)} (${formatMMDD(start)}-${formatMMDD(end)})`,
      };
    })
  );

  return allPrograms;
}
