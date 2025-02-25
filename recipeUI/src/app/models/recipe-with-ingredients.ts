import { Recipe } from "./recipetitle";
import { Ingredients } from "./ingredients";

export class RecipeWithIngredients {
    constructor(
        public recipe: Recipe,
        public ingredients: Ingredients[]
    ){}

    getPair(): [Recipe, Ingredients[]]{
        return [this.recipe, this.ingredients];
    }
    
    addToList(list:RecipeWithIngredients[]):void{
        list.push(this);
    }

    static createPairsList(recipes: Recipe[], allIngredients: Ingredients[]):RecipeWithIngredients[]{
        const pairsList: RecipeWithIngredients[] = [];

        recipes.forEach(recipe => {
            const matchingIngredients = allIngredients.filter(
                ingredient => ingredient.recipe === recipe.title
            );
            const pair = new RecipeWithIngredients(recipe, matchingIngredients);
            pairsList.push(pair);
        });
    
    return pairsList;
    }

}

