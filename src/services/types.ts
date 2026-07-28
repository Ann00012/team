export type User = {
    id: number,
    firstName: string,
    lastName:string
    username: string,
    email: string,
    image: string,
    age: number,
    role: string,
    phone: string,
    isDeleted: boolean,
    company:Company
};

type Company = {
    title: string,
    
}