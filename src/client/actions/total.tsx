export const TOTAL_ADD = "TOTAL_ADD";

interface ITotal {
  readonly type: string;
}

export const add = (): ITotal => ({
  type : TOTAL_ADD,
});

export const TOTAL_SUB = "TOTAL_SUB";

export const sub = (): ITotal => ({
  type : TOTAL_SUB,
});

export type Total = ITotal;
