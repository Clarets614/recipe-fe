import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Output } from '@angular/core';
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

   @Output() recipeSelected = new EventEmitter<Recipe>();

   constructor(private _recipeservice: RecipeService, private _ingservice: IngredientService, private cd: ChangeDetectorRef){}

   search():void{
    this._recipeservice.searchRecipe(this.searchControl).subscribe((recipes:Recipe)=>{
      
      this.recipeSelected.emit(recipes)
      
    })
   }
 



  /* searchString :string = '';
  recipeResult: Recipe | null = null;
  isLoading:boolean = false;
  errorMessage: string | null = null;

  formRecipe: Recipe = {} as Recipe;
  formIngredient: Ingredients = {} as Ingredients;

  pageingredients: Ingredients[] = [];
 */

/* ngOnInit(){
  this.searchControl.valueChanges.subscribe(value =>{
    this.searchString = value ?? ''; //this updates the searchString as user types
  })
} */
  
/*   CallSearchRecipe():void{
    this.searchString = this.searchControl.value ?? '';
    console.log('Searching for:', this.searchString);

    this._recipeservice.searchRecipe(this.searchString).subscribe({
      next: (data: Recipe) => {
        this.recipeResult = data;
      },
      error: (error) => {
      this.errorMessage = 'Error Fetching Recipe';
    },
      complete: () => {
      console.log('Recipe search completed');
      this.cd.detectChanges();
    }
  });
}

  CallIngSearch():void{
    
    this._ingservice.GetIngByRecipeName(this.searchString).subscribe((response:Ingredients[])=>{
      console.log(response);
      this.pageingredients = response;
    })
  } */
}
