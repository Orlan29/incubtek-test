export interface IResult<T> {
  StatusCode: number;
  Result: T;
  Message: string;
}
