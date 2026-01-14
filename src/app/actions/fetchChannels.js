'use server';

export async function fetchChannelsWithConfigs() {
  try {
    const response = await fetch('https://epg.itvt.xyz/api/channels');
    if (!response.ok) {
      throw new Error('Failed to fetch channels');
    }

    const channelsData = await response.json();

    // Load configs for all channels
    const configs = {};
    for (const channel of channelsData) {
      try {
        // Convert channel name to slug (lowercase, spaces to dashes)
        const slug = channel.name.toLowerCase().replace(/\s+/g, '-');
        
        // Dynamically import JSON config
        try {
          const config = await import(`@/json/channels/${slug}.json`);
          configs[slug] = config.default || config;
        } catch (err) {
          // Config file doesn't exist for this channel
          console.log(`No config found for channel ${slug}`);
        }
      } catch (err) {
        console.error(`Failed to load config for channel ${channel.name}:`, err);
      }
    }

    return { channels: channelsData, configs };
  } catch (err) {
    console.error('Failed to fetch channels:', err);
    return { channels: [], configs: {} };
  }
}
