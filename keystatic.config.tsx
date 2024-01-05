import { config } from '@keystatic/core';
import { designKit } from 'keystatic-utils/collections/designKit';
import { profile } from 'keystatic-utils/collections/profile';
import { starterKit } from 'keystatic-utils/collections/starterKit';
import { uiComponent } from 'keystatic-utils/collections/uiComponent';

export default config({
  ui: {
    brand: {
      name: 'smashing.tools',
      mark: () => {
        return <img src="/logo.svg" height={24} />;
      },
    },
    navigation: {
      Tools: ['starterKit', 'designKit', 'uiComponent'],
      People: ['profile'],
    },
  },
  storage: {
    kind: process.env.NODE_ENV === 'production' ? 'cloud' : 'local',
    branchPrefix: 'tool/',
  },
  ...(process.env.NODE_ENV === 'production' && {
    cloud: { project: 'smashing/tools' },
  }),
  collections: {
    starterKit,
    designKit,
    uiComponent,
    profile,
  },
});
