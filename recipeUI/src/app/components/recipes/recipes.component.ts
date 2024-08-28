import { Component, EventEmitter, Output } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../../models/recipetitle';
import { FullrecipeComponent } from '../fullrecipe/fullrecipe.component';
import { IngredientComponent } from '../ingredient/ingredient.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [FullrecipeComponent, IngredientComponent, FormsModule],
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css'
})
export class RecipesComponent {

  constructor(private recipeservice:RecipeService){};

  recipeList:Recipe[] = [];


  @Output() CreatedEvent = new EventEmitter<Recipe>();


  ngOnInit(){
    this.CallRecipeAPI();
  }


  CallRecipeAPI(){
    this.recipeservice.getRecipes().subscribe((response) => {
      console.log(response);
      this.recipeList = response;
    })
  }
}
