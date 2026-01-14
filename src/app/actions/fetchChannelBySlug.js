'use server';

export async function fetchChannelBySlug(slug) {
  try {
    const response = await fetch('https://epg.itvt.xyz/api/channels');
    if (!response.ok) {
      throw new Error('Failed to fetch channels');
    }

    const channels = await response.json();
    
    // Find channel by slug (name lowercase with dashes)
    const foundChannel = channels.find(ch => {
      const channelSlug = ch.name.toLowerCase().replace(/\s+/g, '-');
      return channelSlug === slug;
    });

    if (!foundChannel) {
      return { channel: null, config: null };
    }

    // Load channel config
    let config = null;
    try {
      const configModule = await import(`@/json/channels/${slug}.json`);
      config = configModule.default || configModule;
    } catch (err) {
      console.error(`Failed to load config for channel ${slug}:`, err);
    }

    return { channel: foundChannel, config };
  } catch (err) {
    console.error('Failed to fetch channel:', err);
    return { channel: null, config: null };
  }
}
