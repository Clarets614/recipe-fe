import { Routes } from '@angular/router';
import { MainPageComponent } from './components/main-page/main-page.component';
import { RecipeformComponent } from './components/recipeform/recipeform.component';

export const routes: Routes = [

    //Home page
    { path:"", component: MainPageComponent},
    //form
    {path:"form", component:RecipeformComponent}
];
