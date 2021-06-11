export interface Recipe {
  id: string;
  recipeName: string;
  imageLink: string;
  authorId: string;
  recipeSummary: string;
  recipeDetails: string;
  cookingTime: number;
  recipeRatingAverage: number;
}


export interface User {
  id: string;
  name: string;
  username: string;
  mail: string;
  password: string;
  loggedIn: boolean;
}

export interface Rating {
  id: string;
  ratingNr: number;
  userID: string;
  recipeID: string;
}

export interface Ingredient {
  id: string;
  name: string;
  details: string;
}

export interface IngredientData {
  id: string;
  recipeID: string;
  ingredientID: string;
  quantity: string;
}

export interface CommentTable {
  id: string;
  msg: string;
  recipeID: string;
  userID: string;
  sentDate: Date;
}


