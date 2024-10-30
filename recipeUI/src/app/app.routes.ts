import { Routes } from '@angular/router';
import { MainPageComponent } from './components/main-page/main-page.component';
import { RecipeformComponent } from './components/recipeform/recipeform.component';
import { RecipeDetailComponent } from './components/recipe-detail/recipe-detail.component';
import { NotFoundComponent } from './component/not-found/not-found.component';

export const routes: Routes = [

    //Home page
    { path:"", component: MainPageComponent},
    //form
    {path:"form", component:RecipeformComponent},
    //search result
    {path:":id", component:RecipeDetailComponent},
    //not found component to catch anything else
    {path:"**", component:NotFoundComponent}
];
