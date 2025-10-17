export type Site = {
  brand: string;
  tagline: string;
  whatsapp: string;
  instagram?: string;
  address?: string;
  hours?: string;
  pro?: {
    name: string;
    role?: string;
    avatar?: string;
    avatars?: string[];
    bio: string;
  };
};

export type Service = {
  id: string;
  title: string;
  desc?: string;
  price?: string;
  image: string;
};

export type GalleryItem = {
  src: string;
  alt?: string;  // ✅ opcional para que compile con `alt ?? ""`
};
