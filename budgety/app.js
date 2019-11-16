var budgetController = (function (){
    var Expanse = function (id, description, value) {
        this.id=id;
        this.description=description;
        this.value=value;
    };

    var Income = function (id, description, value) {
        this.id=id;
        this.description=description;
        this.value=value;
    };

    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        }
    }

})();

var UIController = (function () {
    var DOMStrings = {
        inputType: '.add__type',
        description: '.add__description',
        value: '.add__value',
        inputButton: '.add__btn'
    };

    var getInputData = function () {
        var type = document.querySelector(DOMStrings.inputType).value;
        var description = document.querySelector(DOMStrings.description).value;
        var value = document.querySelector(DOMStrings.value).value;

        return {
            type,
            description,
            value
        }
    };

    return {
        getInputData,
        getDOMStrings: function () {
            return DOMStrings;
        }
    }
})();

var controller = (function (budgetCtrl, UICtrl) {

    var setupEventListeners = function () {
        var DOM = UICtrl.getDOMStrings();

        document.querySelector(DOM.inputButton).addEventListener('click', ctrlAddItem);
        document.addEventListener('keypress', function (event) {
            if(event.keyCode===13 || event.which===13){
                ctrlAddItem();
            }
        });
    };

    var ctrlAddItem = function () {
        //get input data
        var input = UICtrl.getInputData();
        //add item to budget controller

        //add item to UI

        //calculate budget

        //display budget
    };

    return {
        init: function () {
            console.log('Application started');
            setupEventListeners();
        }
    }

})(budgetController, UIController);

controller.init();