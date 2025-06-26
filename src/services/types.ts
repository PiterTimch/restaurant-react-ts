//Категорії

export interface ICategoryItem
{
    id: number;
    name: string;
    slug: string;
    image: string;
}

export interface ICategoryCreate
{
    name: string;
    slug: string;
    imageFile: string;
}

export interface ICategoryEdit
{
    id: number;
    name: string;
    slug: string;
    imageFile: string;
}

export interface ICategoryDelete
{
    id: number;
}

//Додаткові
export interface ServerError {
    status: number;
    data: {
        errors: Record<string, string[]>;
    };
}

//Користувач
export interface IRegister
{
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    imageFile: string;
}

export interface ILogin
{
    email: string;
    password: string;
}

export interface User {
    name: string;
    email: string;
    image: string;
    token: string;
    role: string;
}

//Товари
export interface IProductSize {
    id: number;
    name: string;
}

export interface IProductImages {
    name: string;
    priority: number;
}

export interface IIngredient {
    id: number;
    name: string;
    image: string;
}

export interface IProductVariant {
    id: number;
    weight: number;
    price: number;
    productSize: IProductSize;
    productImages: IProductImages[];
}

export interface IProductItem {
    id: number;
    name: string;
    slug: string;
    weight: number;
    price: number;
    category: ICategoryItem;
    productSize: IProductSize;
    productImages: IProductImages[];
    productIngredients: IIngredient[];
    variants: IProductVariant[];
}

export interface IProductCreate {
    name: string;
    slug: string;
    weight: number;
    price: number;
    categoryId: number;
    productSizeId: number | null;
    ingredientIds: number[] | null;
    imageFiles: string[] | null;
}