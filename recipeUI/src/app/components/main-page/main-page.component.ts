import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FullrecipeComponent } from '../fullrecipe/fullrecipe.component';
import { RecipesComponent } from '../recipes/recipes.component';
import { IngredientComponent } from '../ingredient/ingredient.component';
import { RecipeformComponent } from '../recipeform/recipeform.component';
import { CommonModule } from '@angular/common';
import { Recipe } from '../../models/recipetitle';
import { RecipeService } from '../../services/recipe.service';
import { IngredientService } from '../../services/ingredient.service';
import { Ingredients } from '../../models/ingredients';
import { RecipeDetailComponent } from "../recipe-detail/recipe-detail.component";
import { RecipeWithIngredients } from '../../models/recipe-with-ingredients';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [FullrecipeComponent, RecipesComponent, IngredientComponent, RecipeformComponent, CommonModule, RecipeDetailComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent implements OnInit{
  //new variable from our brand spanking new class for refactoring
  recipeWithIngredients: RecipeWithIngredients[] = [];
  
  recipeList: Recipe[] = []; // the variable here will receive the stored values from the loadRecipes method
  selectedRecipe:RecipeWithIngredients | null = null;
  displayRecipe: Recipe = {} as Recipe;
  @Output() recipePair = new EventEmitter<RecipeWithIngredients>();
  

//constructor to inject the api service
  constructor(private _recipeService: RecipeService, private _ingservice: IngredientService){}

  //when the page loads this starts the method inside it
  ngOnInit():void{
    this.loadRecipes();
    this.loadData();
  }

  //refactoring the way the data is going to be brought into component
  async loadData(): Promise<void> {
    try{
      const recipes = await lastValueFrom(this._recipeService.getRecipes());
      const ingredients = await lastValueFrom(this._ingservice.GetAllIngredients());

      this.recipeWithIngredients = RecipeWithIngredients.createPairsList(recipes, ingredients);

    } catch (error){
      console.error('Error loading page data', error);
    };
  }

  //this method grabs the recipes from the API called in the service and stores the result in the variable 
  loadRecipes():void {
    this._recipeService.getRecipes().subscribe((recipes:Recipe[])=>{
      this.recipeList = recipes;
    })
  }

  pickedRecipe(r:Recipe){
    let choice = this.recipeWithIngredients.find(i => i.recipe.id == r.id)
    this.recipePair.emit(choice);
  }
  
  onRecipeClick(recipe:string):void {
    this.selectedRecipe = this.recipeWithIngredients.find(r=> r.recipe.title === recipe) || null;
  }
  deleteRecipe(id:number){
    this.loadRecipes();
    this._recipeService.DeleteRecipe(id).subscribe();
    this.loadData()
  }


  }




