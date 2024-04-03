export enum Columns {
  IDEAS,
  IN_PROGRESS,
  DONE,
}

export type Card = {
  id: bigint;
  description: string;
  due_date: string
  assigned_stakeholder: string
  complete: boolean
};

export type CardsState = { [key in Columns]: Card[] };
