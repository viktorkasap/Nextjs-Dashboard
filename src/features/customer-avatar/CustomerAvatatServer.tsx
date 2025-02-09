import Image from 'next/image';

import { getValidAvatarSrc } from './api';

/**
 * This is server side component
 */
export const CustomerAvatarServer = async ({ name, src }: { name: string; src: string }) => {
  const avatarSrc = await getValidAvatarSrc(src);

  return <Image src={avatarSrc} alt={`${name}'s profile picture`} width={28} height={28} className="rounded-full" />;
};
