export interface IBlogPost {
  id: number;
  title: string;
  detail: string;
  text?: string;
  image?: string;
  thumbnail: string;
  tags: number[];
}

export interface ITag {
  id: number;
  name: string;
}

export interface INewTag {
  name: string;
}

export interface ITagsState {
  tags:      ITag[];
  tagsTotal: number | null;
  loading:   boolean;
  errors:    any;
}

export const BlogPost = {
  selectId: (a: IBlogPost): number => {
    return a.id;
  },
}

export const Tag = {
  selectId: (a: ITag): number => {
    return a.id;
  },
}


