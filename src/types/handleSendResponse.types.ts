export type IErrorMessage = string;

export type IApiResponse<Data> = {
  data: Data;
  errors: IErrorMessage[] | null;
  code: number;
  statusText: string;
};
