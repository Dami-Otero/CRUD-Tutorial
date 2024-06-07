export interface ApiResponse<T> {
  message?: string;
  data: T; //holds data from api
}

export interface IEmployee { //represents the employee object and its structure
  id?: string;
  name: string;
  email: string;
  mobile: string;
  dob: string;
  doj: string;
  salary: number;
}
