// Copyright 2019-2022 @polkadot/extension-koni-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import Password from '@polkadot/extension-koni-ui/components/Password';
import Toggle from '@polkadot/extension-koni-ui/components/Toggle';
import useTranslation from '@polkadot/extension-koni-ui/hooks/useTranslation';
import { ThemeProps } from '@polkadot/extension-koni-ui/types';

const UNLOCK_MINS = 15;

interface Props extends ThemeProps {
  address: string;
  className?: string;
  error?: string;
  onChange: (password: string, isUnlockCached: boolean) => void;
  onEnter?: () => void;
  password: string;
  tabIndex?: number;
}

function Unlock ({ className, error, onChange, onEnter, tabIndex }: Props): React.ReactElement<Props> | null {
  const { t } = useTranslation();
  const [password, setPassword] = useState('');
  const [isUnlockCached, setIsUnlockCached] = useState(false);

  useEffect((): void => {
    onChange(password, isUnlockCached);
  }, [onChange, isUnlockCached, password]);

  return (
    <div className={className}>
      <Password
        autoFocus
        isError={!!error}
        label={t<string>('unlock account with password')}
        onChange={setPassword}
        onEnter={onEnter}
        tabIndex={tabIndex}
        value={password}
      >
      </Password>

      <div className={'sending-password-toggle-wrapper'}>
        <Toggle
          isOverlay
          label={t<string>('Unlock for {{expiry}} min', { replace: { expiry: UNLOCK_MINS } })}
          onChange={setIsUnlockCached}
          value={isUnlockCached}
        />
      </div>
    </div>
  );
}

export default React.memo(styled(Unlock)(() => `
  .sending-password-toggle-wrapper {
      display: flex;
      margin-top: 10px;
      display: none;
      justify-content: flex-end;
  }
`));
