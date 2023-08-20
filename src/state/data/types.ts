export type DataState = {
  meta: {
    [endpoint: string]: { loading?: boolean };
  };
};

export interface DataApiRequestAction {
  endpoint: string;
}

export type DataStateMeta = {
  data: DataState;
};
