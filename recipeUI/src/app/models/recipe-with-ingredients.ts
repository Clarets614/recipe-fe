import { Recipe } from "./recipetitle";
import { Ingredients } from "./ingredients";

export class RecipeWithIngredients {
    constructor(
        public recipe: Recipe,
        public ingredients: Ingredients[]
    ){}
}