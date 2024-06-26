
export type TErrorMessages = {
    path: string | number;
    message: any;
  }[];
  
  export type TGenericErrorResponse = {
    statusCode: number;
    message: string;
    errorMessages: TErrorMessages;
  };