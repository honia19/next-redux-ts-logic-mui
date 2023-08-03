export interface IImage {
  id: string;
  url: string;
  filename: string;
  description: string;
  uploadedBy: string;
  createdAt: string;
  updatedAt: string;
  dimensions: {
    height: number;
    width: number;
  };
  resolution: {
    height: number;
    width: number;
  };
  sizeInBytes: number;
  sharedWith: {
    id: string;
    name: string;
    avatar: string;
  }[];
  favorited: boolean;
}

export type IAddImagesPayload = {
  entities: Record<string, IImage>;
};

export interface IImagesState {
  byId: Record<string, IImage>;
  allIds: string[];
}
