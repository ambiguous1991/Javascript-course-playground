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

    var calculateTotal = function (type) {
        var sum = 0;
        data.allItems[type].forEach(function (cur) {
            sum+=cur.value;
        });
        data.totals[type]=sum;
    };

    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        },
        budget: 0,
        percentage: -1
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
        },
        deleteItem: function(type, id){
            var ids, index;

            ids = data.allItems[type].map(function (curr) {
                return curr.id;
            });

            index = ids.indexOf(id);

            if(index!==-1){
                data.allItems[type].splice(index, 1);
            }
        },
        testing: function () {
            console.log(data);
        },
        calculateBudget: function () {
            calculateTotal('exp');
            calculateTotal('inc');

            data.budget = data.totals.inc-data.totals.exp;

            if(data.totals.inc>0){
                data.percentage = Math.round(data.totals.exp/data.totals.inc * 100)
            }
            else {
                data.percentage = -1;
            }
        },
        getBudget: function () {
            return {
                budget: data.budget,
                percentage: data.percentage,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp
            }
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
        expansesContainer: '.expenses__list',
        totalIncomeLabel: '.budget__income--value',
        totalExpanseLabel: '.budget__expenses--value',
        budgetLabel: '.budget__value',
        percentageLabel: '.budget__expenses--percentage',
        container: '.container'
    };

    var getInputData = function () {
        var type = document.querySelector(DOMStrings.inputType).value;
        var description = document.querySelector(DOMStrings.description).value;
        var value = parseFloat(document.querySelector(DOMStrings.value).value);

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
                html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">+  %value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
                insertionPoint = document.querySelector(DOMStrings.incomeContainer);
            }
            else if (type==='exp') {
                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">-  %value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
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

        displayBudget: function(obj){
            document.querySelector(DOMStrings.totalIncomeLabel).textContent = obj.totalInc;
            document.querySelector(DOMStrings.totalExpanseLabel).textContent = obj.totalExp;
            document.querySelector(DOMStrings.budgetLabel).textContent = obj.budget;

            if(obj.percentage>=0) {
                document.querySelector(DOMStrings.percentageLabel).textContent = obj.percentage + '%';
            }
            else {
                document.querySelector(DOMStrings.percentageLabel).textContent = '---';
            }
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
        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);
        document.addEventListener('keypress', function (event) {
            if(event.keyCode===13 || event.which===13){
                ctrlAddItem();
            }
        });
    };

    var updateBudget = function () {
        //calculate the budget
        budgetCtrl.calculateBudget();
        //return the budget
        var budget = budgetCtrl.getBudget();
        UICtrl.displayBudget(budget);
    };

    var ctrlAddItem = function () {
        //get input data
        var input = UICtrl.getInputData();

        if(input.description!=='' && !isNaN(input.value)) {
            //add item to budget controller
            var newItem = budgetCtrl.addItem(input.type, input.description, input.value);
            //add item to UI
            UICtrl.addListItem(newItem, input.type);
            UICtrl.clearFields();
            updateBudget();
        }
    };

    var ctrlDeleteItem = function (event) {
        var itemId, splitId, type, id;

        itemId = event.target.parentNode.parentNode.parentNode.parentNode.id;

        if(itemId){
            splitId = itemId.split('-');
            type = splitId[0];
            id = parseInt(splitId[1]);
            budgetCtrl.deleteItem(type, id);
        }
    };

    return {
        init: function () {
            console.log('Application started');
            UICtrl.displayBudget({
                budget: 0,
                percentage: 0,
                totalInc: 0,
                totalExp: -1
            });
            setupEventListeners();
        }
    }

})(budgetController, UIController);

controller.init();