import { Component } from '@angular/core';
import { FullrecipeComponent } from '../fullrecipe/fullrecipe.component';
import { RecipesComponent } from '../recipes/recipes.component';
import { IngredientComponent } from '../ingredient/ingredient.component';
import { RecipeformComponent } from '../recipeform/recipeform.component';
import { CommonModule } from '@angular/common';
import { Recipe } from '../../models/recipetitle';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [FullrecipeComponent, RecipesComponent, IngredientComponent, RecipeformComponent, CommonModule],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent {
  
  recipeList: Recipe[] = []; // the variable here will receive the stored values from the loadRecipes method
  selectedRecipe:Recipe | null = null;

//constructor to inject the api service
  constructor(private _recipeService: RecipeService){}

  //when the page loads this starts the method inside it
  ngOnInit():void{
    this.loadRecipes();
  }

  //this method grabs the recipes from the API called in the service and stores the result in the variable 
  loadRecipes():void {
    this._recipeService.getRecipes().subscribe((recipes:Recipe[])=>{
      this.recipeList = recipes;
    })
  }

  
  onRecipeSelected(recipe:Recipe):void{
    this.selectedRecipe = recipe;
  }

  onRecipeClick(recipe:Recipe):void {
    this.selectedRecipe = recipe;
  }


}
