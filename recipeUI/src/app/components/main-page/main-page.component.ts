import { Component } from '@angular/core';
import { FullrecipeComponent } from '../fullrecipe/fullrecipe.component';
import { RecipesComponent } from '../recipes/recipes.component';
import { IngredientComponent } from '../ingredient/ingredient.component';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [FullrecipeComponent, RecipesComponent, IngredientComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent {

}
