export interface ProjectData {
  title: string;
  description: string;
  portfolioImgUrl: string;
  portfolioProjectImgUrl: string[];
  _id?: string;
}

export interface ProjectForm {
  title: string;
  description: string;
  portfolioImgUrl: string;
  img1: string;
  img2?: string;
  img3?: string;
  _id?: string;
}

export interface EditProjectData {
  title: string;
  description: string;
  portfolioImgUrl: string;
  portfolioProjectImgUrl: string[];
  _id: string;
}

export interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  passwordConfirmation?: string;
  _id?: string;
}

export interface EditUserData {
  firstName: string;
  lastName: string;
  email: string;
  _id: string;
}

export interface UserLoginData {
  email: string;
  password: string;
}

export interface ContactData {
  firstName: string;
  lastName: string;
  email: string;
  address?: string;
  phoneNumber?: string;
  subject: string;
  content: string;
}

export interface HeaderData {
  title: string;
}

export interface ProjectImgUrlAndIdData {
  id: string;
  imgUrl: string;
}

export interface EmailData {
  email: string;
}