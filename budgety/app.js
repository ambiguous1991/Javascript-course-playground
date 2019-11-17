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
    };

    return {
        addItem: function(type, desc, val) {
            var newItem, ID;

            if(data.allItems[type].length===0){
                ID=0;
            }
            else {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            }

            if(type==='exp') {
                newItem = new Expanse(ID, desc, val);
            }
            else if (type==='inc'){
                newItem = new Income(ID, desc, val);
            }
            data.allItems[type].push(newItem);
            return newItem;
        }
    };
})();

var UIController = (function () {
    var DOMStrings = {
        inputType: '.add__type',
        description: '.add__description',
        value: '.add__value',
        inputButton: '.add__btn',
        incomeContainer: '.income__list',
        expansesContainer: '.expenses__list'
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

        addListItem: function(obj, type){
            var html, newHtml, insertionPoint;
            if(type==='inc') {
                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">+  %value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
                insertionPoint = document.querySelector(DOMStrings.incomeContainer);
            }
            else if (type==='exp') {
                html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">-  %value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
                insertionPoint = document.querySelector(DOMStrings.expansesContainer);
            }

            newHtml = html
                .replace('%id%', obj.id)
                .replace('%description%', obj.description)
                .replace('%value%', obj.value);

            insertionPoint.insertAdjacentHTML('beforeend', newHtml);
        },

        clearFields: function(){
            var fields, fieldsArray;
            fields = document.querySelectorAll(DOMStrings.description+', '+DOMStrings.value);

            fieldsArray = Array.prototype.slice.call(fields);
            fieldsArray.forEach(function(current){
                current.value='';
            });
            fieldsArray[0].focus();
        },

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
        var newItem = budgetCtrl.addItem(input.type,  input.description, input.value);
        //add item to UI
        UICtrl.addListItem(newItem, input.type);
        UICtrl.clearFields();
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