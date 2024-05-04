export type DemoCard = {
  height: number;
  sample_url: string;
  width: number;
  name: string;
};

export type DemoCardWithId = { id: number } & DemoCard;

export type CheckedImages = { [index: string]: number };

export type CheckedImageState = {
  cardCheck?: { id: number; price: number };
  options?: { all: boolean };
};

export type RemoveOptions = { reset: boolean };
