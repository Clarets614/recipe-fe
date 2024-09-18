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

  selectedRecipe:string | undefined;

  @Input() recipe: string | null = null;

  constructor(
    private _recipeService: RecipeService, 
    private _ingredService: IngredientService
  ) {}



}
