import { Component } from '@angular/core';
import { IngredientService } from '../../services/ingredient.service';
import { Ingredients } from '../../models/ingredients';
import { RecipesComponent } from '../recipes/recipes.component';

@Component({
  selector: 'app-ingredient',
  standalone: true,
  imports: [RecipesComponent],
  templateUrl: './ingredient.component.html',
  styleUrl: './ingredient.component.css'
})
export class IngredientComponent {

  constructor(private _ingredientService: IngredientService){};

  ingredientList:Ingredients[] = [];

  GetIngbyRecipe(name:string){
    this._ingredientService.GetIngByRecipeName(name).subscribe((response)=>{
     console.log(response) 
    })

  }
}

