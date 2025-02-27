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
  recipeWithIngredients: RecipeWithIngredients[] = []
  
  recipeList: Recipe[] = []; // the variable here will receive the stored values from the loadRecipes method
  selectedRecipe:string | null = null;
  IngredientList:Ingredients[] = [];
  Recipe1: Recipe = {} as Recipe;
  Ing1List: Ingredients[] = [];
  displayRecipe: Recipe = {} as Recipe;
  @Output() bookmark = new EventEmitter<Recipe>();
  

//constructor to inject the api service
  constructor(private _recipeService: RecipeService, private _ingservice: IngredientService){}

  //when the page loads this starts the method inside it
  ngOnInit():void{
    this.loadRecipes();
    this.loadIngredients();
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

  emitRecipe(){
    this.bookmark.emit(this.Recipe1)
  }


  //this method grabs the recipes from the API called in the service and stores the result in the variable 
  loadRecipes():void {
    this._recipeService.getRecipes().subscribe((recipes:Recipe[])=>{
      this.recipeList = recipes;
    })
  }

  loadIngredients():void {
    this._ingservice.GetAllIngredients().subscribe((items:Ingredients[])=>{
      this.IngredientList = items;
    })  
  }

  pickedRecipe(r:Recipe){
    this.Recipe1 = r
  }
  
  onRecipeClick(recipe:string):void {
    this.selectedRecipe = recipe;
  }
  deleteRecipe(){
    console.log(`I want to delete this recipe with ${this.Recipe1.title} and ${this.Recipe1.directions}`)
    this.loadRecipes();
    this._recipeService.DeleteRecipe(this.Recipe1.id).subscribe();

  }
  // async function fetchRecipe(id:number){
  //   const rec1 = await fetch(this._recipeService(id).subscribe())
  // }

//what is this method doing???

  CompleteRecipe(id:number):void{
    const card = new Set([this.Recipe1, ...this.Ing1List]);
    this._recipeService.GetRecipeByID(id).subscribe((recipe:Recipe)=>{
      this.Recipe1 = recipe;
      this._ingservice.GetIngByRecipeName(recipe.title).subscribe((ing:Ingredients[])=>{
        this.Ing1List = ing;
      })
    })};
  }
  // onRecipeSelected(recipe:string):void{
  //   this.selectedRecipe = recipe;
  // }




