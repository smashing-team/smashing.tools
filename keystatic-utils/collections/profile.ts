import { collection, fields } from '@keystatic/core';

export const profile = collection({
  label: 'Profiles',
  slugField: 'name',
  path: 'src/content/profiles/**',
  schema: {
    name: fields.slug({
      name: {
        label: 'Name',
        validation: {
          length: { min: 1 },
        },
      },
    }),
    avatar: fields.image({
      label: 'Avatar',
      publicPath: './',
      description:
        'Avatar of the author. The image should be 1:1 ratio (e.g. 500x500) for best results.',
      validation: {
        isRequired: true,
      },
    }),
    twitter: fields.text({
      label: 'X (formerly Twitter)',
    }),
    github: fields.text({
      label: 'GitHub',
    }),
    website: fields.url({
      label: 'Website',
    }),
    bio: fields.text({
      label: 'Bio',
      multiline: false,
      validation: {
        length: { max: 160 },
      },
      description: 'A short description of the author. max 160 characters.',
    }),
  },
});
