import Search from "./models/Search";
import * as searchView from './views/searchView';
import { elements } from './views/base';

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
    console.log(query);

    if(query) {
        //new search object and add to state
        state.search = new Search(query);

        //prepare UI
        searchView.clearInput();
        searchView.clearResults();

        //do search
        await state.search.getResults();

        //render results on UI
        searchView.renderResults(state.search.result);
    }
};


elements.searchForm.addEventListener(
    'submit', e=> {
        e.preventDefault();
        controlSearch();
});