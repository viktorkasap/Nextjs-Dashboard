const DEFAULT_ABSOLUTE_PATH = 'http://localhost:3000';
const PLACEHOLDER_AVATAR_SRC = '/customers/avatar-placeholder.png';

export const getValidAvatarSrc = async (relativeUrl: string): Promise<string> => {
  // Guard
  if (!relativeUrl) {
    return PLACEHOLDER_AVATAR_SRC;
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || DEFAULT_ABSOLUTE_PATH;
  const absoluteUrl = new URL(relativeUrl, baseUrl);

  try {
    const res = await fetch(absoluteUrl.toString(), { method: 'HEAD' });

    if (res.ok) {
      return relativeUrl;
    } else {
      // eslint-disable-next-line no-console
      console.warn(`Image not found at: ${absoluteUrl}`);

      return PLACEHOLDER_AVATAR_SRC;
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(`Error validating image URL: ${relativeUrl}`, error);

    return PLACEHOLDER_AVATAR_SRC;
  }
};
