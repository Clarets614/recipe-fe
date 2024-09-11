import { Component, EventEmitter, Output } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../../models/recipetitle';
import { FullrecipeComponent } from '../fullrecipe/fullrecipe.component';
import { IngredientComponent } from '../ingredient/ingredient.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [FullrecipeComponent, IngredientComponent, FormsModule, CommonModule],
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css'
})
export class RecipesComponent {

  recipeList:Recipe[] = [];


  @Output() recipeSelected = new EventEmitter<string>();

  constructor(private recipeservice:RecipeService){};



  ngOnInit(){
    this.CallRecipeAPI();
  }


  CallRecipeAPI(){
    this.recipeservice.getRecipes().subscribe((response) => {
      console.log(response);
      this.recipeList = response;
    })
  }

  onSelectRecipe(title:string){
    this.recipeSelected.emit(title);
  }
}
