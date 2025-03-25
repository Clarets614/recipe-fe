import { Component, EventEmitter, Input, OnChanges, Output, SimpleChange, SimpleChanges } from '@angular/core';
import { IngredientService } from '../../services/ingredient.service';
import { Ingredients } from '../../models/ingredients';
import { RecipesComponent } from '../recipes/recipes.component';
import { RecipeService } from '../../services/recipe.service';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Recipe } from '../../models/recipetitle';
import { RecipeWithIngredients } from '../../models/recipe-with-ingredients';

@Component({
  selector: 'app-ingredient',
  standalone: true,
  imports: [RecipesComponent, CommonModule],
  templateUrl: './ingredient.component.html',
  styleUrl: './ingredient.component.css'
})
export class IngredientComponent implements OnChanges {

  @Input() recipeTitle:string | undefined;
  @Output() delete = new EventEmitter<Ingredients>;
  @Input() recipePair: RecipeWithIngredients[] = [];

   ingredientList:Ingredients[] = []; 

  constructor(private _ingredientService: IngredientService, private _recipeService: RecipeService){};

  ngOnChanges(changes: SimpleChanges) {
    if(changes['recipeTitle'] && this.recipeTitle){
      this.GetIngbyRecipe(this.recipeTitle);
    }
  }

  emitDelete(item:Ingredients){
    this.delete.emit(item);
    this._ingredientService.DeleteIng(item.id).subscribe();
    this.GetIngbyRecipe(item.recipe);
  }

  GetIngbyRecipe(recipeName:string){
    this._ingredientService.GetIngByRecipeName(recipeName).subscribe((response)=>{
     console.log(response);
     this.ingredientList = response; 
    })

  }

}

