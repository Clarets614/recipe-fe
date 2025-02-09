import { Component, input, Input } from '@angular/core';
import { RecipesComponent } from '../recipes/recipes.component';
import { IngredientComponent } from '../ingredient/ingredient.component';
import { RecipeService } from '../../services/recipe.service';
import { IngredientService } from '../../services/ingredient.service';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { Recipe } from '../../models/recipetitle';

@Component({
  selector: 'app-fullrecipe',
  standalone: true,
  imports: [RecipesComponent, IngredientComponent, CommonModule],
  templateUrl: './fullrecipe.component.html', 
  styleUrl: './fullrecipe.component.css'
})
export class FullrecipeComponent {

  selectedRecipe:string| undefined;
  displayRecipe: Recipe = {} as Recipe;
  recipeList: Recipe[] = [];

  @Input() recipe: string | null = null;
  @Input() directions: string | null = null;
  constructor(
    private _recipeService: RecipeService, 
    private _ingredService: IngredientService
  ) {}

  loadRecipes():void {
    this._recipeService.getRecipes().subscribe((recipes:Recipe[])=>{
      this.recipeList = recipes;
    })
  }

  findRecipe(recipe: string):void{
    this.recipeList.forEach(r => {
      if(r.title === recipe){
        this.displayRecipe = r;
      }
      console.log(recipe);  
    });
  }

  deleteRecipe(id:number){
    console.log(`I want to delete this recipe with ${id}`)
    this._recipeService.DeleteRecipe(id).subscribe();
    this.loadRecipes();
  }

}
