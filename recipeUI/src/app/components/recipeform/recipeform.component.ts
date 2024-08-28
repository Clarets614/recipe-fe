import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Recipe } from '../../models/recipetitle';
import { Ingredients } from '../../models/ingredients';
import { setThrowInvalidWriteToSignalError } from '@angular/core/primitives/signals';
import { RecipeService } from '../../services/recipe.service';
import { IngredientService } from '../../services/ingredient.service';

@Component({
  selector: 'app-recipeform',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './recipeform.component.html',
  styleUrl: './recipeform.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipeformComponent {
  constructor(private _recipeservice: RecipeService, _ingservice: IngredientService){}
  search:string = "toast";
  recipeResult: Recipe = {} as Recipe;

  formRecipe: Recipe = {} as Recipe;
  formIngredient: Ingredients = {} as Ingredients;

 



  
  CallSearchRecipe():void{
    this._recipeservice.searchRecipe(this.search).subscribe((response:Recipe)=>{
      console.log(response);
      this.recipeResult = response;
    })
  }

  CallIngSearch():void{
    this.
  }
}
