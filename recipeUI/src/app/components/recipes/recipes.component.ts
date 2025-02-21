import { Component, EventEmitter, Output } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../../models/recipetitle';
import { FullrecipeComponent } from '../fullrecipe/fullrecipe.component';
import { IngredientComponent } from '../ingredient/ingredient.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RecipeDetailComponent } from "../recipe-detail/recipe-detail.component";

@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [FullrecipeComponent, IngredientComponent, FormsModule, CommonModule, RecipeDetailComponent],
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css'
})
export class RecipesComponent {

  recipeList:Recipe[] = [];


  @Output() recipeSelected = new EventEmitter<string>();
  @Output() multirecipesList = new EventEmitter<Recipe[]>;
  constructor(private recipeservice:RecipeService){};



  ngOnInit(){
    this.CallRecipeAPI();
    this.multirecipesList.emit(this.recipeList);
  }


  CallRecipeAPI(){
    this.recipeservice.getRecipes().subscribe((response) => {
      console.log(response);
      this.recipeList = response;
    })
  }

  onSelectRecipe(recipe:Recipe){
    this.recipeSelected.emit(recipe.title);
  }
}
