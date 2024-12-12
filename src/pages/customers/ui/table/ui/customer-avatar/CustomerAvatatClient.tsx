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
  const [safeSrc, setSafeSrc] = useState(src || PLACEHOLDER_AVATAR_SRC);

  const handleError = () => {
    setSafeSrc(PLACEHOLDER_AVATAR_SRC);
  };

  return (
    // eslint-disable-next-line jsx-a11y/img-redundant-alt
    <img src={safeSrc} width={28} height={28} onError={handleError} className="rounded-full" alt={`${name}'s profile picture`} />
  );
};
