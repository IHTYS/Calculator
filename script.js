//Get outsourcing elements
var eCalculator = document.getElementById('calculator');
//Container for saving operation data (formula)
var eNumSave = document.getElementById('numSave');
//Current digital container
var eNumCur = document.getElementById('numCur');
//Button external container for event broker
var eBtnWrap = document.getElementById('btnWrap');
//Memory storage flag element
var eShowM = document.getElementById('showM');

var buttonRvt = document.getElementById('Rvt');

buttonRvt.disabled = true;



//Operation formula
var sStep = '';
//Current number
var sCurValue = '0';
//Operation result
var nResult = null;
//Operator
var sMark = '';
//Mr memory storage data
var nMvalue = 0;
//Input status. False: enter a number to replace the original number; True: the input number is added after the original number;
var bLogStatus = false;

var LeftBracketsNum = 0;

var RightBracketsNum = 0;

var MultNum = '';

var DivNum = ' ';

var ResultStorage = ' ';

var MemoryResult = ' ';

var BetweenResult = ' ';

var FormulaStorage = ' ';





//Add a mouse down event to the outsourcing container to prevent selected text
eCalculator.addEventListener('mousedown', function (event) {
    //Prevent the default behavior when the mouse is pressed, and prevent the text from being selected when the button is clicked too fast
    event.preventDefault();
});

//Click events are added to the key container to represent the operation of all keys
eBtnWrap.addEventListener('click', function (event) {
    //Get clicked elements
    var eTarget = event.target;
    //Determine the key pressed
    var key = eTarget.dataset.key;
    //Get the pressed value
    var value = eTarget.dataset.value;

    if (key) {
        //Use the switch statement to judge different keys to perform corresponding operations
        switch (key) {
            //The number keys perform the operation
            case 'Num':
                fnInputNum(value);
                break;
            //Decimal point operation
            case 'Point':
                //Judge whether there is a decimal point. It is used to limit that only one decimal point can be entered
                if (sCurValue.indexOf('.') == -1) {
                    sCurValue = sCurValue + '.';
                    bLogStatus = true;
                }
                break;
            case 'Base':
                fnBaseCount(value);
                break;
            //Equals
            case 'Equal':
                fnEqual();
                document.getElementById("Rvt").disabled = false;
                /*CurrentFormula();*/
                break;
            //Clear
            case 'Clear':
                fnClear()
                break;
            //Backspace
            case 'BACK':
                fnBack();
                break;
            //CE
            case 'CE':
                //Clear the currently displayed value
                sCurValue = '0';
                bLogStatus = false;
                break;
            //Reverse
            case 'Negate':
                //Reverse the current value
                sCurValue = '' + (-sCurValue);
                break;
            //Take the square root
            case 'Square':
                //The current value takes the square root
                nResult = Math.sqrt(+sCurValue);
                //Other data initialization
                sCurValue = '' + nResult;
                sStep = '';
                sMark = '';
                bLogStatus = false;
                break;
            //Countdown
            case 'Reciprocal':
                //The current value is the reciprocal
                //Other data initialization
                nResult = 1 / sCurValue;
                sCurValue = '' + nResult;
                sStep = '';
                sMark = '';
                bLogStatus = false;
                break;
            //M series
            case 'MC':
                //Memory value reset
                nMvalue = 0;
                fnShowM()
                break;
            case 'MR':
                //Display memory value
                sCurValue = '' + nMvalue;
                fnShowM()
                break;
            case 'MS':
                //Change the memorized value to the current value
                nMvalue = +sCurValue;
                fnShowM()
                break;
            case 'MA':
                //The current value is added to the memory value
                nMvalue += +sCurValue;
                fnShowM()
                break;
            case 'ML':
                //Subtract the current value from the memorized value
                nMvalue -= +sCurValue;
                fnShowM()
                break;
            case ')':
                if (sCurValue[0] == 0 && sCurValue.length == 1) {
                    sCurValue = ' ';
                }
                //Subtract the current value from the memorized value
                if (RightBracketsNum == (LeftBracketsNum - 1) && isNumeric(sCurValue.charAt(sCurValue.length - 1))) {
                    sCurValue = sCurValue + ')';
                    RightBracketsNum++;
                   /* bLogStatus = true;*/
                }
                break;
            case '(':
                if (sCurValue[0] == 0 && sCurValue.length == 1 ) {
                    sCurValue = ' ';
                }
                if (LeftBracketsNum == RightBracketsNum && !isNumeric(sStep.charAt(sStep.length - 1))) {
                    sCurValue = sCurValue + '(';
                    LeftBracketsNum++;
                    bLogStatus = true;
                }
                break;
            case 'Rvt':
                //Subtract the current value from the memorized value
                FormulaStorage = sStep;
                /*fnClear()*/
                break;
        }
        //Display data to display digital area
        fnShowResult();
    }

    function isNumeric(value) {
        return /^-{0,1}\d+$/.test(value);
    }
});

//Enter number
function fnInputNum(num) {
    //Determine whether to replace or add the current number according to the input status
    if (bLogStatus) {
        sCurValue = sCurValue + num;
    } else {
        //Limit the first number cannot be 0
        if (num != 0) {
            bLogStatus = true;
        }
        sCurValue = num;
    }
}
//Display calculation results
function fnShowResult() {

    if (sStep.includes('(') | sStep.includes(')') | sStep.includes('*') | sStep.includes('/')) {

    }
    //Display calculation formula
    eNumSave.innerHTML = sStep;
    //Limit the total length of numbers
    if (sCurValue.length > 14) {
        sCurValue = sCurValue.slice(0, 14);
    }
    //Displays the current number
  /*  eNumCur.innerHTML = ResultStorage;*/
    eNumCur.innerHTML = sCurValue;
}

function fnCountResult() {
    //Determine the current operator and perform the operation
    switch (sMark) {
        case '+':
            nResult = nResult === null ? +sCurValue : nResult + (+sCurValue);
            break;
        case '-':
            nResult = nResult === null ? +sCurValue : nResult - sCurValue;
            break;
        case '*':
            MultNum = sStep.charAt(sStep.length - 7) * sCurValue;
            /*nResult = nResult === null ? +sCurValue : +sCurValue;*/


            nResult = ResultStorage + MultNum;
            /*nResult = nResult === null ? +sCurValue : nResult * sCurValue;*/
            break;
        case '/':
            DivNum = sStep.charAt(sStep.length - 7) / sCurValue;

            nResult = ResultStorage + DivNum;
           /* nResult = nResult === null ? +sCurValue : +sCurValue;*/
           /* nResult = nResult === null ? +sCurValue : nResult / sCurValue;*/
            break;
        default:
            nResult = +sCurValue;
    }
}
//Basic operation of addition, subtraction, multiplication and division
function fnBaseCount(key) {
    if (LeftBracketsNum == RightBracketsNum && sStep.charAt(sStep.length - 3) == ')') {
        nResult = nResult + BetweenResult;
    }
    if (LeftBracketsNum - RightBracketsNum == 1) {
        MemoryResult = nResult;
        nResult = null;
        if (bLogStatus) {
            //Modify input status
            bLogStatus = false;
            //Calculation formula
            sStep = sStep + ' ' + sCurValue + ' ' + key;
            //Calculation results
            fnCountResult();
            sCurValue = '' + nResult;
        } else {
            //If the formula is empty, add the original number first
            if (sStep == '') {
                sStep = sCurValue + ' ' + key;
            } else {// if there is an existing formula, change the last operator
                sStep = sStep.slice(0, sStep.length - 1) + ' ' + key;
            }
        }
        BetweenResult = BetweenResult + nResult;
        nResult = MemoryResult;
    }
    if (key == '*' || key == '/') {
        ResultStorage = nResult;
    }
    //If it is an input state, perform the operation
    if (bLogStatus) {
        //Modify input status
        bLogStatus = false;
        //Calculation formula
        sStep = sStep + ' ' + sCurValue + ' ' + key;
        //Calculation results
        fnCountResult();
        sCurValue = '' + nResult;
    } else {
        //If the formula is empty, add the original number first
        if (sStep == '') {
            sStep = sCurValue + ' ' + key;
        } else {// if there is an existing formula, change the last operator
            sStep = sStep.slice(0, sStep.length - 1) + ' ' + key;
        }
    }
    //Change operator for calculation
    sMark = key;
}
//Equals
function fnEqual() {

    /*nResult = calc(sStep);*/

    //If there are no operators, subsequent operations are blocked
    if (sMark == '') return;
    //Calculation results
    fnCountResult();
    sCurValue = '' + nResult;
    //Reset data
    sStep = '';
    sMark = '';
    bLogStatus = false;
}

function parse(str) {
   
    return new Function("", `return ${str}`)();
}
function calc(str) {
    const rgxp = /\(([^\)\(]+)\)/g;
    if (!rgxp.test(str)) {
        return parse(str);
    }
    return calc(str.replace(rgxp, (str, n) => parse(n)));
}

function fnClear() {
    //Initialize all data
    sStep = '';
    sCurValue = '0';
    nResult = null;
    sMark = '';
    bLogStatus = false;
}
//Backspace
function fnBack() {
    //You must be in the input status to backspace
    if (bLogStatus) {
        //Subtract the last digit of the value
        sCurValue = sCurValue.slice(0, sCurValue.length - 1);
        //If the last value is empty or minus (-), change it to 0, reset the input status to false, and you can't backspace
        if (sCurValue == '' || sCurValue == '-') {
            sCurValue = '0';
            bLogStatus = false;
        }
    }
}
//Judge whether there is M memory storage
function fnShowM() {
    bLogStatus = false;
    //Determine whether the memory storage flag is displayed
    eShowM.style.display = nMvalue == 0 ? 'none' : 'block';
}

document.addEventListener('keyup', function (event) {
    //Gets the current keyboard key
    var key = event.key;
    //Get key code
    var code = event.keyCode;
    //Restrict the correct keys to modify the displayed data
    var comply = false;
    //Enter number
    if ((code >= 48 && code <= 57) || (code >= 96 && code <= 105)) {
        fnInputNum(key);
        comply = true;
    }
    //Addition, subtraction, multiplication and division
    if (key == '*' || key == '+' || key == '/' || key == '-') {
        fnBaseCount(key);
        comply = true;
    }
    //ESC key
    if (code == 27) {
        fnClear();
        comply = true;
    }
    //Enter key
    if (code == 13) {
        fnEqual();
        comply = true;
    }
    //Backspace key
    if (code == 8) {
        fnBack();
        comply = true;
    }
    if (comply) {
        //Display data to calculator screen
        fnShowResult();
    }
});