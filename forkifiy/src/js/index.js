import Search from "./models/Search";
import Recipe from "./models/Recipe";
import List from './models/List';
import Likes from "./models/Likes";
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import { elements, renderLoader, clearLoader } from './views/base';

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

        if(state.search) {
            searchView.highlightSelected(id);
        }

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

const controlList = () => {
    //create list if not existant
    if(!state.list){
        state.list = new List();
    }
    //add each ingredient
    state.recipe.ingredients.forEach(el => {
        const item = state.list.addItem(el.count, el.unit, el.ingredient);
        listView.renderItem(item);
    });
};

elements.shopping.addEventListener('click', e => {
    const id = e.target.closest('.shopping__item').dataset.itemid;
    if(e.target.matches('.shopping__delete, .shopping__delete *')){
        state.list.deleteItem(id);
        listView.deleteItem(id);
    }
    else if (e.target.matches('.shopping__count-value')){
        const val = parseFloat(e.target.value);
        state.list.updateCount(id, val);
    }
});

const controlLike = () => {
    if(!state.likes){
        state.likes = new Likes();
    }
    const currentId = state.recipe.id;
    if(!state.likes.isLiked(currentId)){
        const newLike = state.likes.addLike(
            currentId,
            state.recipe.title,
            state.recipe.author,
            state.recipe.img
        );

        console.log(state.likes);
    }
    else {
        state.likes.deleteLike(currentId);
        console.log(state.likes);
    }
};

elements.recipe.addEventListener('click', e => {
    if(e.target.matches('.btn-decrease, .btn-decrease *')){
        if(state.recipe.servings>1) {
            state.recipe.updateServings('dec');
            recipeView.updateServingsIngredients(state.recipe);
        }
    }
    else if (e.target.matches('.btn-increase, .btn-increase *')) {
        state.recipe.updateServings('inc');
        recipeView.updateServingsIngredients(state.recipe);
    }
    else if (e.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
        controlList();
    }
    else if (e.target.matches('.recipe__love, .recipe__love *')){
        controlLike();
    }
});

