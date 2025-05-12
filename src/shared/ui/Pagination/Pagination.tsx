import { FC } from 'react';

import { Flex } from '../Stack/Flex/Flex';
import { HStack } from '../Stack';

import cls from './styles.module.css';

interface PropsItem extends React.PropsWithChildren {
  onClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>): void
  disabled?: boolean;
  active?: boolean;
}

export const PaginationItem: React.FC<PropsItem> = ({ disabled, active, onClick, children }) => {
    const classes = [
      disabled && cls.paginationItemDisabled,
      active && cls.paginationItemActive,
      cls.paginationItem,
    ].filter(Boolean).join(' ');

  return (
    <Flex
      className={classes}
      onClick={onClick}
      justify="center"
      direction="row"
      align="center"
      role="button"
    >
      {children}
    </Flex>
)
}

export const Pagination: FC<React.PropsWithChildren > = ({ children }) => {
  return (
    <HStack gap="16" max justify="center">
      {children}
    </HStack>
  );
};
