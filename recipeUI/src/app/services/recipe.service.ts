import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Recipe } from '../models/recipetitle';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private http:HttpClient) { }

  url:string = "https://localhost:7020";

  getRecipes():Observable<Recipe[]>{
    return this.http.get<Recipe[]>(`${this.url}/api/Recipe`);
  }

  GetRecipeByID(id:number):Observable<Recipe>{
    return this.http.get<Recipe>(`${this.url}/api/Recipe/${id}`);
  }
}
