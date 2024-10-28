export interface Application {
    id: string;
    name: string;
    category: string;
    connectors: string[];
    users: User[];
}
  
export interface User {
    id: string;
    name: string;
    email: string;
}