import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { RecipesComponent } from "./components/recipes/recipes.component";
import { FullrecipeComponent } from "./components/fullrecipe/fullrecipe.component";
import { MainPageComponent } from "./components/main-page/main-page.component";
import { SearchComponent } from "./components/search/search.component";
import { RecipeformComponent } from './components/recipeform/recipeform.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RecipesComponent, FullrecipeComponent, MainPageComponent, SearchComponent, RouterLink, RecipeformComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Stock Recipes';
}
