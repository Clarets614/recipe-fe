import { HttpClient } from '@angular/common/http';
import { Injectable, numberAttribute } from '@angular/core';
import { Observable } from 'rxjs';
import { Recipe } from '../models/recipetitle';
import { Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private http:HttpClient) { }

  url:string = "https://localhost:7020";

  searchRecipe(query:string):Observable<Recipe[]>{
    return this.http.get<Recipe[]>(`${this.url}/api/Recipe?q=${query}`)

  }

  getRecipes():Observable<Recipe[]>{
    return this.http.get<Recipe[]>(`${this.url}/api/Recipe`);
  }

  GetRecipeByID(id:number):Observable<Recipe>{
    return this.http.get<Recipe>(`${this.url}/api/Recipe/${id}`);
  }

  AddRecipeName(newRecipe:Recipe):Observable<Recipe>{
    return this.http.post<Recipe>(`${this.url}/api/Recipe`, newRecipe)
  }

  

}
