export interface ApiResponse<T> {
    message?: string;
    data: T; //holds data from api
    
  }
  
  export interface _outcome {
    
    id?: number;
    company: string;
    invoice_number: number;
    invoice_date: string;
    amount: string;
    due_date: string;
    is_paid: boolean;
  }

  
  