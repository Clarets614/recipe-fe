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

   formIng: Ingredients= {} as Ingredients;
   formRec: Recipe= {} as Recipe;
   confirmationMessage: string = '';
   list_of_ingredients: Ingredients[] = [];

   constructor(private _recipeservice: RecipeService, private _ingservice: IngredientService, private cd: ChangeDetectorRef){}

   
   ngOnInit(){
    this.CallRecipeAPI();
    console.log(this.multirecipeList);
    this.GetIngredientsByRecipeName(this.formRec.title || '');
    this.cd.detectChanges();

   }
   search():void{
    this._recipeservice.searchRecipe(this.searchControl).subscribe((recipe:Recipe[])=>{

    })
   }
 
   AddIngItem(){
    this._ingservice.AddIng(this.formIng).subscribe(()=>{
      this.confirmationMessage = 'Ingredient added successfully!';
      this.cd.detectChanges();
    })

   }


   AddRecipeItem(){
    let newRecipe: Recipe = { ...this.formRec};
    this._recipeservice.AddRecipeName(newRecipe).subscribe((response) => {
      console.log(newRecipe)
    });
    this.confirmationMessage = 'Recipe added successfully!';
    this.formRec = {} as Recipe;
    this.cd.detectChanges();
    this.CallRecipeAPI();
   }

SubmitIng(){
  let newIngredient: Ingredients = { ...this.formIng};
  this._ingservice.AddIng(newIngredient).subscribe();
  this.formIng = {} as Ingredients;
  this.confirmationMessage = 'Ingredient added successfully!';
}

ShowFormVariable(){
  console.log(this.formIng)
}

GetIngredientsByRecipeName(recipeName: string){
  this._ingservice.GetIngByRecipeName(recipeName).subscribe((response) => {
    this.list_of_ingredients = response;
  })
  this.cd.detectChanges();
  
}


CallRecipeAPI(){
  this._recipeservice.getRecipes().subscribe((response) => {
    console.log(response);
    this.multirecipeList = response;
    this.cd.detectChanges();
  })
}





}
