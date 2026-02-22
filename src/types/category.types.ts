export interface ICategory {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface ICreateCategoryRequest {
  name: string;
}

export interface IUpdateCategoryRequest {
  name?: string;
}
