import { Component } from '@angular/core';
import { FullrecipeComponent } from '../fullrecipe/fullrecipe.component';
import { RecipesComponent } from '../recipes/recipes.component';
import { IngredientComponent } from '../ingredient/ingredient.component';
import { RecipeformComponent } from '../recipeform/recipeform.component';
import { CommonModule } from '@angular/common';
import { Recipe } from '../../models/recipetitle';
import { RecipeService } from '../../services/recipe.service';
import { IngredientService } from '../../services/ingredient.service';
import { Ingredients } from '../../models/ingredients';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [FullrecipeComponent, RecipesComponent, IngredientComponent, RecipeformComponent, CommonModule],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent {
  
  recipeList: Recipe[] = []; // the variable here will receive the stored values from the loadRecipes method
  selectedRecipe:string | null = null;
  IngredientList:Ingredients[] = [];

//constructor to inject the api service
  constructor(private _recipeService: RecipeService, private _ingservice: IngredientService){}

  //when the page loads this starts the method inside it
  ngOnInit():void{
    this.loadRecipes();
    this.loadIngredients();
  }

  //this method grabs the recipes from the API called in the service and stores the result in the variable 
  loadRecipes():void {
    this._recipeService.getRecipes().subscribe((recipes:Recipe[])=>{
      this.recipeList = recipes;
    })
  }

  loadIngredients():void {
    this._ingservice.GetAllIngredients().subscribe((items:Ingredients[])=>{
      this.IngredientList = items;
    })  
  }
  
  // onRecipeSelected(recipe:string):void{
  //   this.selectedRecipe = recipe;
  // }

  onRecipeClick(recipe:string):void {
    this.selectedRecipe = recipe;
  }


}
