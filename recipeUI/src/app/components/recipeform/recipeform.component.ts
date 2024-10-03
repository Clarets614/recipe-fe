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
  //  @Output() recipeSelected = new EventEmitter<Recipe[]>();

  //  @Output() submittedIng = new EventEmitter<Ingredients>();
  //  @Input() multirecipelist:Recipe [] = [];
   formIng: Ingredients= {} as Ingredients;
   formRec: Recipe= {} as Recipe;

   constructor(private _recipeservice: RecipeService, private _ingservice: IngredientService, private cd: ChangeDetectorRef){}

   ngOnInit(){
    this.CallRecipeAPI();
    console.log(this.multirecipeList);
    this.cd.detectChanges();
   }
   search():void{
    this._recipeservice.searchRecipe(this.searchControl).subscribe((recipe:Recipe[])=>{
      
      // this.recipeSelected.emit(recipe)
      
    })
   }
 
   AddIngItem(){
    this._ingservice.AddIng(this.formIng).subscribe()

   }
   OnSubmitRecipe(rTitle:string){
    let newRecipe:Recipe = {
      id:0,
      title:rTitle

    }
    this.formRec = newRecipe;
   }

   AddRecipeItem(){
    this._recipeservice.AddRecipeName(this.formRec).subscribe();
   }

SubmitIng(){
  let newIngredient: Ingredients = { ...this.formIng};
  this._ingservice.AddIng(newIngredient).subscribe();
}

ShowFormVariable(){
  console.log(this.formIng)
}


CallRecipeAPI(){
  this._recipeservice.getRecipes().subscribe((response) => {
    console.log(response);
    this.multirecipeList = response;
    this.cd.detectChanges();
  })
}





}
