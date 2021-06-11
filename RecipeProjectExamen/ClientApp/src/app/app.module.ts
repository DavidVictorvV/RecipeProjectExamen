import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { RatingModule } from 'ng-starrating';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { RecipeComponent } from './recipe/recipe.component';
import { RecipeUpdateComponent } from './recipe/recipe-update.component';
import { RecipeAddComponent } from './recipe/recipe-add.component';

import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSortModule } from '@angular/material/sort';
import { MatSnackBarModule } from '@angular/material/snack-bar';


import { UserAddComponent } from './user/user-add.component';
import { UserUpdateComponent } from './user/user-update.component';
import { RatingUpdateComponent } from './rating/rating-update.component';
import { RatingAddComponent } from './rating/rating-add.component';
import { IngredientUpdateComponent } from './ingredient/ingredient-update.component';
import { IngredientAddComponent } from './ingredient/ingredient-add.component';
import { IngredientDataAddComponent } from './ingredientData/ingredientData-add.component';
import { IngredientDataUpdateComponent } from './ingredientData/ingredientData-update.component';
import { CommentTableUpdateComponent } from './messageTable/commentTable-update.component';
import { CommentTableAddComponent } from './messageTable/commentTable-add.component';
import { RecipeListComponent } from './recipeListPage/recipeList.component';
import { RecipeListReadComponent } from './recipeListPage/recipeList-read.component';
import { LogInComponent } from './logIn/logIn.component';


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    RecipeComponent,
    RecipeUpdateComponent,
    RecipeAddComponent,
    RecipeListComponent,
    RecipeListReadComponent,
    UserAddComponent,
    UserUpdateComponent,
    RatingUpdateComponent,
    RatingAddComponent,
    IngredientUpdateComponent,
    IngredientAddComponent,
    IngredientDataAddComponent,
    IngredientDataUpdateComponent,
    CommentTableUpdateComponent,
    CommentTableAddComponent,
    LogInComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: RecipeListComponent, pathMatch: 'full' },
      { path: 'recipes', component: RecipeComponent },
      { path: 'recipe-update', component: RecipeUpdateComponent },
      { path: 'recipe-add', component: RecipeAddComponent },
      { path: 'user-add', component: UserAddComponent },
      { path: 'user-update', component: UserUpdateComponent },
      { path: 'rating-add', component: RatingAddComponent },
      { path: 'rating-update', component: RatingUpdateComponent },
      { path: 'ingredient-add', component: IngredientAddComponent },
      { path: 'ingredient-update', component: IngredientUpdateComponent },
      { path: 'ingredientData-add', component: IngredientDataAddComponent },
      { path: 'ingredientData-update', component: IngredientDataUpdateComponent },
      { path: 'commentTable-add', component: CommentTableAddComponent },
      { path: 'commentTable-update', component: CommentTableUpdateComponent },
      { path: 'recipeList', component: RecipeListComponent },
      { path: 'recipeList-read/:id', component: RecipeListReadComponent },
      { path: 'logIn', component: LogInComponent },

], { relativeLinkResolution: 'legacy' }),
    BrowserAnimationsModule,
    RatingModule,
    MatTableModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatInputModule,
    MatDatepickerModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatExpansionModule,
    MatSortModule,
    MatSnackBarModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
