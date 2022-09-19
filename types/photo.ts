export type PhotoType = {
  id: string;
  created_at: string;
  updated_at: string;
  width: number;
  height: number;
  urls: {
    regular: string;
    raw: string;
  };
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
    profile_image: {
      large: string;
    };
  };
  urls: {
    regular: string;
  };
  tags: {
    title: string;
  }[];
};
