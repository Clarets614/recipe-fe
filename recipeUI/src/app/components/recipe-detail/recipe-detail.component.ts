import { Component, Input } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Recipe } from '../../models/recipetitle';
import { RecipeService } from '../../services/recipe.service';
import { CommonModule } from '@angular/common';
import { IngredientComponent } from "../ingredient/ingredient.component";
import { Ingredients } from '../../models/ingredients';
import { RecipesComponent } from '../recipes/recipes.component';

@Component({
  selector: 'app-recipe-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, IngredientComponent,RecipesComponent],
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css'
})
export class RecipeDetailComponent {
  constructor(private activatedRoute: ActivatedRoute, private _recipeService:RecipeService) {}
//Not sure I am going to keep the following variables
  displayRecipeDetails: Recipe[] = [];
  displayIngredient: Ingredients[] =[];
  @Input() displayRecipe: Recipe = {} as Recipe;


  ngOnInit(){
    this.activatedRoute.queryParams.subscribe((params)=>{
      const query = params['query'];
      console.log(query);
      this._recipeService.searchRecipe(query).subscribe(recipe=>{
        this.displayRecipeDetails = recipe;
        console.log(this.displayRecipeDetails);
      })
    })
  }

}
