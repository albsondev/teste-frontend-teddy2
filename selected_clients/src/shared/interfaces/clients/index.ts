export interface ClientProps {
  id: number;
  name: string;
}

export interface UserDTO {
  id: number;
  name: string;
  salary: number | string;
  companyValuation: number | string;
}

export interface UpdateUserDTO {
  name: string;
  salary: number;
  companyValuation: number;
}
