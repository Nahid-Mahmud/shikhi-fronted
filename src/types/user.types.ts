// User types for API

export interface IUser {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin" | "super_admin";
  status: "active" | "inactive";
  // Add other fields as needed
}



export interface IGetAllUsersResponse {
  users: IUser[];
  total: number;
}



export interface IUpdateUserStatusRequest {
  id: string;
  status: "active" | "inactive";
}

export interface IUpdateUserRequest {
  id: string;
  name?: string;
  email?: string;
  // Add other updatable fields
}

export interface IUpdateAdminRequest {
  id: string;
  name?: string;
  email?: string;
  // Add other updatable fields
}

export interface IUpdateUserRoleRequest {
  id: string;
  role: "user" | "admin" | "super_admin";
}

export interface IDeleteUserRequest {
  id: string;
}
