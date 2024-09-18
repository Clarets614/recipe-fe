import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Recipe } from '../../models/recipetitle';
import { Ingredients } from '../../models/ingredients';
import { setThrowInvalidWriteToSignalError } from '@angular/core/primitives/signals';
import { RecipeService } from '../../services/recipe.service';
import { IngredientService } from '../../services/ingredient.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recipeform',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './recipeform.component.html',
  styleUrl: './recipeform.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipeformComponent {

   searchControl : string = '';
    multirecipeList : Recipe [] = []
   @Output() recipeSelected = new EventEmitter<Recipe[]>();

   @Output() submittedIng = new EventEmitter<Ingredients>();
   @Input() multirecipelist:Recipe [] = [];
   formIng: Ingredients= {} as Ingredients;

   constructor(private _recipeservice: RecipeService, private _ingservice: IngredientService, private cd: ChangeDetectorRef){}

   ngOnInit(){
    this.CallRecipeAPI()
   }
   search():void{
    this._recipeservice.searchRecipe(this.searchControl).subscribe((recipe:Recipe[])=>{
      
      this.recipeSelected.emit(recipe)
      
    })
   }
 
   AddIngItem(){
    this._ingservice.AddIng(this.formIng).subscribe()

   }

EmitSubmittedIng(){
  let newIngredient: Ingredients = { ...this.formIng};
  this.submittedIng.emit(newIngredient);
}


CallRecipeAPI(){
  this._recipeservice.getRecipes().subscribe((response) => {
    console.log(response);
    this.multirecipeList = response;
  })
}





}
