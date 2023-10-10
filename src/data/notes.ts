export type note = {
  id: string;
  title: string;
  tags: string[];
  body: string;
  createdAt: string;
  updatedAt: string;
};

export const notes: Array<note> = [];
