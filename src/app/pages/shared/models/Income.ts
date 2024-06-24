export interface ApiResponse<T> {
    message?: string;
    data: T; //holds data from api
    
  }
  
  export interface _income { //represents the employee object and its structure
    
    id?: number;
    company: string;
    invoice_number: string;
    invoice_date: string;
    amount: string;
    due_date: string;
    is_paid: boolean | string;
  }

  
  