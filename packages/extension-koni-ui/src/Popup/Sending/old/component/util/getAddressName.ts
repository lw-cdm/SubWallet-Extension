// Copyright 2019-2022 @polkadot/extension-koni-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { KeyringItemType } from '@polkadot/ui-keyring/types';

import { getAddressMeta } from './getAddressMeta';
import { toShortAddress } from './toShortAddress';

// isName, isDefault, name
export function getAddressName (address: string, type: KeyringItemType | null = null, defaultName?: string): [boolean, boolean, string] {
  const meta = getAddressMeta(address, type);

  return meta.name
    ? [false, false, meta.name.toUpperCase()]
    : defaultName
      ? [false, true, defaultName.toUpperCase()]
      : [true, false, toShortAddress(address)];
}
