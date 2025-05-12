import React from 'react';
import { useNavigate } from 'react-router-dom';

import { signinPagePath } from '@/shared/const/router';
import { GithubIcon } from '@/shared/assets/icons';
import { LogoutIcon } from '@/shared/assets/icons';
import { HStack } from '@/shared/ui/Stack';

import cls from './styles.module.css';

interface Props extends React.PropsWithChildren {
  onClickIcon?: () => void;
}

export const Header: React.FC<Props> = React.memo(({ children, onClickIcon }) => {
  const navigate = useNavigate();

  const githubIconClasses = [
    cls.navigateIcon,
    onClickIcon && cls.navigateIconActive,
  ].filter(Boolean).join(' ');

  const logoutIconClasses = [cls.navigateIcon, cls.navigateIconActive].filter(Boolean).join(' ');

  const onLogoutClick = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate(signinPagePath);
  }

  return (
    <HStack gap="16" justify="between" max>
      <GithubIcon className={githubIconClasses} onClick={onClickIcon} />
      <HStack className={cls.headerContent} max>{children}</HStack>
      <LogoutIcon className={logoutIconClasses} onClick={onLogoutClick} />
    </HStack>
  );
});
