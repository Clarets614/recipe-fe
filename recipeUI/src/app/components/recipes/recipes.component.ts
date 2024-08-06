import { Component } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../../models/recipetitle';

@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [],
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css'
})
export class RecipesComponent {

  constructor(private recipeservice:RecipeService){}

  recipeList:Recipe = {} as Recipe;

  ngOnInit(){
    this.CallRecipeAPI();
  }

  CallRecipeAPI(){
    this.recipeservice.getRecipes().subscribe((response) => {
      console.log(response);
    })
  }
}
