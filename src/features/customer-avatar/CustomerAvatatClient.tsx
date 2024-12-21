'use client';

import { useState } from 'react';

const PLACEHOLDER_AVATAR_SRC = '/customers/avatar-placeholder.png';

/**
 * This is a client component that will return a placeholder image if the image SRC is not correct
 * @param name
 * @param src
 * @constructor
 */
export const CustomerAvatarClient = ({ name, src }: { name: string; src: string }) => {
  const initialSrc = src.startsWith('/customers/') ? src : PLACEHOLDER_AVATAR_SRC;
  const [safeSrc, setSafeSrc] = useState(initialSrc);

  const handleError = () => {
    setSafeSrc(PLACEHOLDER_AVATAR_SRC);
  };

  return <img src={safeSrc} width={28} height={28} onError={handleError} className="rounded-full" alt={`${name}'s profile picture`} />;
};
