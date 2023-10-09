export type note = {
  id: string;
  title: string;
  tags: string[];
  body: string;
  createdAt: Date;
  updatedAt: Date;
};

export const notes: Array<note> = [];
