import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ingredients } from '../models/ingredients';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {

  constructor(private http:HttpClient) { }

  url:string = "https://localhost:7020";

  GetIngByRecipeName(name:string):Observable<Ingredients[]>{
    return this.http.get<Ingredients[]>(`${this.url}/api/Ingredient/recipe?recipe=${name}`)
  }
  
  DeleteIng(id:number): Observable<void>{
    return this.http.delete<void>(`${this.url}/Ingredient/${id}`)
  }

  AddIng(newIngredient: Ingredients): Observable<Ingredients>{
    return this.http.post<Ingredients>(`${this.url}/Ingredient`, newIngredient)
  }
}
