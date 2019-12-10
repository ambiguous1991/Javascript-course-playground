import Search from "./models/Search";
import Recipe from "./models/Recipe";
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import { elements, renderLoader, clearLoader } from './views/base';
import {renderRecipe} from "./views/recipeView";

/** Global state of the app
* - Search object'
* - Current recipe object
* - Shopping list object
* - Liked recipes
* */
const state = {};

const controlSearch = async () => {
    //get query from view
    const query = searchView.getInput();

    if(query) {
        //new search object and add to state
        state.search = new Search(query);

        //prepare UI
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchResults);

        try {
            //do search
            await state.search.getResults();

            //render results on UI
            clearLoader();
            searchView.renderResults(state.search.result);
        }
        catch (exception) {
            alert('Error processing request!');
        }
    }
};

elements.searchForm.addEventListener(
    'submit', e=> {
        e.preventDefault();
        controlSearch();
});

elements.searchResPages.addEventListener('click', e=> {
    const btn = e.target.closest('.btn-inline');
    if(btn) {
        const goToPage = btn.dataset.goto;
        searchView.clearResults();
        searchView.renderResults(state.search.result, parseInt(goToPage));
    }
});

/*RECIPE CONTROLLER*/

const controlRecipe = async () => {
    const id = window.location.hash.replace('#','');
    if(id){
        recipeView.clearRecipe();
        renderLoader(elements.recipe);

        state.recipe = new Recipe(id);

        try {
            await state.recipe.getRecipe();
            state.recipe.parseIngredients();

            state.recipe.calcServings();
            state.recipe.calcTime();

            clearLoader();
            recipeView.renderRecipe(state.recipe);
        }
        catch (exception) {
            alert('Error fetching recipe!');
        }
    }
};

['hashchange','load'].forEach(event => window.addEventListener(event, controlRecipe));