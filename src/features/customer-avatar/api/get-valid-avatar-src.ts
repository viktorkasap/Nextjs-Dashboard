const PLACEHOLDER_AVATAR_SRC = '/customers/avatar-placeholder.png';

export const getValidAvatarSrc = async (url: string): Promise<string> => {
  // Guard
  if (!url) {
    return PLACEHOLDER_AVATAR_SRC;
  }

  const absoluteUrl = new URL(url);

  try {
    const res = await fetch(absoluteUrl.toString(), { method: 'HEAD' });

    if (res.ok) {
      return url;
    } else {
      // eslint-disable-next-line no-console
      console.warn(`Image not found at: ${absoluteUrl}`);

      return PLACEHOLDER_AVATAR_SRC;
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(`Error validating image URL: ${url}`, error);

    return PLACEHOLDER_AVATAR_SRC;
  }
};
