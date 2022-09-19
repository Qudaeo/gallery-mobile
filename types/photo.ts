type PhotoUrlsType = {
  regular: string;
  large: string;
  raw: string;
};

export type PhotoType = {
  id: string;
  created_at: string;
  updated_at: string;
  width: number;
  height: number;
  urls: PhotoUrlsType;
  user: {
    name: string;
  };
};

export type DetailsType = {
  id: string;
  description: string;
  width: number;
  height: number;
  likes: number;
  user: {
    id: string;
    name: string;
    location: string;
    profile_image: PhotoUrlsType;
  };
  urls: PhotoUrlsType;
  tags: {
    title: string;
  }[];
};
