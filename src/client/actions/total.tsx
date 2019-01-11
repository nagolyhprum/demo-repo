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

export const LIST_FETCH_REQUEST = "LIST_FETCH_REQUEST";
export const LIST_FETCH_SUCCEEDED = "LIST_FETCH_SUCCEEDED";
export const LIST_FETCH_FAILED = "LIST_FETCH_FAILED";

export const fetchList = (): ITotal => ({
  type : LIST_FETCH_REQUEST,
});

export type Total = ITotal;
