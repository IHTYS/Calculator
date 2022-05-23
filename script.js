var eCalculator = document.getElementById('calculator');
var eNumSave = document.getElementById('numSave');
var eNumCur = document.getElementById('numCur');
var eBtnWrap = document.getElementById('btnWrap');
var eShowM = document.getElementById('showM');
var buttonRvt = document.getElementById('Rvt');

buttonRvt.disabled = true;

var sStep = '';
var sCurValue = '0';
var nResult = null;
var sMark = '';
var nMvalue = 0;
var bLogStatus = false;
var LeftBracketsNum = 0;
var RightBracketsNum = 0;
var MultNum = '';
var DivNum = ' ';
var ResultStorage = ' ';
var MemoryResult = ' ';
var BetweenResult = ' ';
var FormulaStorage = ' ';

eCalculator.addEventListener('mousedown', function (event) {   
    event.preventDefault();
});

eBtnWrap.addEventListener('click', function (event) {
    
    var eTarget = event.target;    
    var key = eTarget.dataset.key;    
    var value = eTarget.dataset.value;

    if (key) {        
        switch (key) {            
            case 'Num':
                fnInputNum(value);
                break;            
            case 'Point':                
                if (sCurValue.indexOf('.') == -1) {
                    sCurValue = sCurValue + '.';
                    bLogStatus = true;
                }
                break;
            case 'Base':
                fnBaseCount(value);
                break;
            case 'Equal':
                fnEqual();
                /*if (sStep != null | sStep != ' ') {*/
                    document.getElementById("Rvt").disabled = false;
                var elem = document.getElementById("Rvt");
                elem.style.backgroundColor = '#666';


              /*  }*/
                break;
            case 'Clear':
                fnClear()
                break;
            case 'BACK':
                fnBack();
                break;
            case 'CE':
                sCurValue = '0';
                bLogStatus = false;
                break;
            case 'Negate':
                sCurValue = '' + (-sCurValue);
                break;
            case 'Square':
                nResult = Math.sqrt(+sCurValue);
                sCurValue = '' + nResult;
                sStep = '';
                sMark = '';
                bLogStatus = false;
                break;
            case 'Reciprocal':
                nResult = 1 / sCurValue;
                sCurValue = '' + nResult;
                sStep = '';
                sMark = '';
                bLogStatus = false;
                break;
            case 'MC':
                nMvalue = 0;
                fnShowM()
                break;
            case 'MR':
                sCurValue = '' + nMvalue;
                fnShowM()
                break;
            case 'MS':
                nMvalue = +sCurValue;
                fnShowM()
                break;
            case 'MA':
                nMvalue += +sCurValue;
                fnShowM()
                break;
            case 'ML':
                nMvalue -= +sCurValue;
                fnShowM()
                break;
            case ')':
                if (sCurValue[0] == 0 && sCurValue.length == 1) {
                    sCurValue = ' ';
                }
                if (RightBracketsNum == (LeftBracketsNum - 1) && isNumeric(sCurValue.charAt(sCurValue.length - 1))) {
                    sCurValue = sCurValue + ')';
                    RightBracketsNum++;
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
                if (sStep != null | sStep != ' ') {
                    var NewFormula = sStep;
                    sStep = FormulaStorage;
                    FormulaStorage = NewFormula;
                    fnShowResult();
                }
                break;
        }
        fnShowResult();
    }

    function isNumeric(value) {
        return /^-{0,1}\d+$/.test(value);
    }
});

function fnInputNum(num) {
    if (bLogStatus) {
        sCurValue = sCurValue + num;
    } else {
        if (num != 0) {
            bLogStatus = true;
        }
        sCurValue = num;
    }
}

function fnShowResult() {

    if (sStep.includes('(') | sStep.includes(')') | sStep.includes('*') | sStep.includes('/')) {

    }
    eNumSave.innerHTML = sStep;
    if (sCurValue.length > 14) {
        sCurValue = sCurValue.slice(0, 14);
    }
    eNumCur.innerHTML = sCurValue;
}

function fnCountResult() {
    switch (sMark) {
        case '+':
            nResult = nResult === null ? +sCurValue : nResult + (+sCurValue);
            break;
        case '-':
            nResult = nResult === null ? +sCurValue : nResult - sCurValue;
            break;
        case '*':
            MultNum = sStep.charAt(sStep.length - 7) * sCurValue;
            nResult = ResultStorage + MultNum;
            break;
        case '/':
            DivNum = sStep.charAt(sStep.length - 7) / sCurValue;
            nResult = ResultStorage + DivNum;
            break;
        default:
            nResult = +sCurValue;
    }
}

function fnBaseCount(key) {
    if (LeftBracketsNum == RightBracketsNum && sStep.charAt(sStep.length - 3) == ')') {
        nResult = nResult + BetweenResult;
    }
    if (LeftBracketsNum - RightBracketsNum == 1) {
        MemoryResult = nResult;
        nResult = null;
        if (bLogStatus) {
            bLogStatus = false;
            sStep = sStep + ' ' + sCurValue + ' ' + key;
            fnCountResult();
            sCurValue = '' + nResult;
        } else {
            if (sStep == '') {
                sStep = sCurValue + ' ' + key;
            } else {
                sStep = sStep.slice(0, sStep.length - 1) + ' ' + key;
            }
        }
        BetweenResult = BetweenResult + nResult;
        nResult = MemoryResult;
    }
    if (key == '*' || key == '/') {
        ResultStorage = nResult;
    }
    if (bLogStatus) {
        bLogStatus = false;
        sStep = sStep + ' ' + sCurValue + ' ' + key;
        fnCountResult();
        sCurValue = '' + nResult;
    } else {
        if (sStep == '') {
            sStep = sCurValue + ' ' + key;
        } else {
            sStep = sStep.slice(0, sStep.length - 1) + ' ' + key;
        }
    }
    sMark = key;
}

function fnEqual() {

    if (sMark == '') return;
    
    fnCountResult();
    sCurValue = '' + nResult;
    
    sStep = '';
    sMark = '';
    bLogStatus = false;
}

function fnClear() {
    
    sStep = '';
    sCurValue = '0';
    nResult = null;
    sMark = '';
    bLogStatus = false;
}

function fnBack() {
    if (bLogStatus) {
        sCurValue = sCurValue.slice(0, sCurValue.length - 1);
        if (sCurValue == '' || sCurValue == '-') {
            sCurValue = '0';
            bLogStatus = false;
        }
    }
}

function fnShowM() {
    bLogStatus = false;
    eShowM.style.display = nMvalue == 0 ? 'none' : 'block';
}

document.addEventListener('keyup', function (event) {
    var key = event.key;
    var code = event.keyCode;
    var comply = false;

    if ((code >= 48 && code <= 57) || (code >= 96 && code <= 105)) {
        fnInputNum(key);
        comply = true;
    }

    if (key == '*' || key == '+' || key == '/' || key == '-') {
        fnBaseCount(key);
        comply = true;
    }

    if (code == 27) {
        fnClear();
        comply = true;
    }

    if (code == 13) {
        fnEqual();
        comply = true;
    }

    if (code == 8) {
        fnBack();
        comply = true;
    }
    if (comply) {
        fnShowResult();
    }
});