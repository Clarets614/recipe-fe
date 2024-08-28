import { Component, Input } from '@angular/core';
import { RecipesComponent } from '../recipes/recipes.component';
import { IngredientComponent } from '../ingredient/ingredient.component';
import { RecipeService } from '../../services/recipe.service';
import { IngredientService } from '../../services/ingredient.service';

@Component({
  selector: 'app-fullrecipe',
  standalone: true,
  imports: [RecipesComponent, IngredientComponent],
  templateUrl: './fullrecipe.component.html', 
  styleUrl: './fullrecipe.component.css'
})
export class FullrecipeComponent {

  constructor(
    private _recipeService: RecipeService, 
    private _ingredService: IngredientService
  ) {}

  @Input()
  titleRecipe!: string;
  @Input()
  ingredients: string[] = [];

}
