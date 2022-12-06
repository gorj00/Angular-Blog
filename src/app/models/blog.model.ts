export interface IBlogPost {
  id: number;
  title: string;
  detail: string;
  text: string;
  image: string;
  thumbnail: string;
  tags: number[];
}

export const BlogPost = {
  selectId: (a: IBlogPost): number => {
    return a.id;
  },
}

