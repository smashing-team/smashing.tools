import { collection, fields } from "@keystatic/core";

export const profile = collection({
  label: "Profiles",
  slugField: "name",
  previewUrl:
    process.env.NODE_ENV !== "production" ? "/profile/{slug}" : undefined,
  path: "static/content/profiles/**",
  schema: {
    name: fields.slug({
      name: {
        label: "Name",
        validation: {
          length: { min: 1 },
        },
      },
    }),
    avatar: fields.image({
      label: "Avatar",
      directory: `public/images/profiles`,
      publicPath: `/images/profiles`,
      description:
        "Avatar of the author. The image should be 1:1 ratio (e.g. 500x500) for best results.",
      validation: {
        isRequired: true,
      },
    }),
    twitter: fields.text({
      label: "X (formerly Twitter)",
    }),
    github: fields.text({
      label: "GitHub",
    }),
    website: fields.url({
      label: "Website",
    }),
    bio: fields.text({
      label: "Bio",
      multiline: false,
      validation: {
        length: { max: 160 },
      },
      description: "A short description of the author. max 160 characters.",
    }),
  },
});
