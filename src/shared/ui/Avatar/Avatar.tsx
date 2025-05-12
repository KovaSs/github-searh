import React from 'react';

import cls from './styles.module.css';

interface Props {
  src: string;
  alt: string;
}

export const Avatar: React.FC<Props> = ({ src, alt }) => {
  return (
    <img className={cls.avatar} src={src} alt={alt} />
  );
}
