let checkSerie, buttonWithCorrectResult, formTerms;
let countSerie = 0;
let countQuestions = 1;
let arrayOfSeries;
let checkView = false;
let checkTable = false;
let howManyTerms = true;
let isTable = false;
let checkButton = false;
const multiplicationForm = document.getElementById("multiplication-form");
const multiplicationTable = document.getElementById("multiplication-table");
const buttonSetQuestions = document.getElementById("button-set-questions");
const questions = document.getElementById("questions");
const multiplier1 = document.getElementById("multiplier1");
const multiplier2 = document.getElementById("multiplier2");
const button0 = document.getElementById("button0");
const button1 = document.getElementById("button1");
const button2 = document.getElementById("button2");
function checkAll(){
    //console.log("OK");
    
    const serieNumber = multiplicationForm.elements[0].value;
    const allChecked = multiplicationForm.elements[0].checked;
    
    //console.log(allChecked);
    
    for(let i=0;i<11;i++){
        if(serieNumber == 1 && allChecked) multiplicationForm.elements[i+1].checked = true;
        else if(serieNumber == 1 && !allChecked) multiplicationForm.elements[i+1].checked = false;   
    }
    //if(isChecked11 == 11) multiplicationForm.elements[0].checked = true;
}
function uncheckAll(){
    let isChecked11 = 0
    for(let i=0;i<11;i++){
        if(multiplicationForm.elements[i+1].checked) isChecked11++;
        //console.log("isChecked11: "+isChecked11);
    }
    if(multiplicationForm.elements[0].checked) multiplicationForm.elements[0].checked = false;
    if(isChecked11 == 11) multiplicationForm.elements[0].checked = true;
}
function checkTerms(numberOfTerms){
    let isChecked;
    if(numberOfTerms == 10) howManyTerms = true;
    else howManyTerms = false;
    for(let i=12;i<14;i++){
        isChecked = multiplicationForm.elements[i].checked;
        //console.log(isChecked+" "+i);
        if(i<13 && isChecked && numberOfTerms == 12) multiplicationForm.elements[i].checked = false;
        else if(i>12 && isChecked && numberOfTerms == 10) multiplicationForm.elements[i].checked = false;
    }
}
function getValue(){
    let formValue;
    let countArrayOfSeries = 0;
    button0.disabled = true;
    button1.disabled = true;
    button2.disabled = true;
    countQuestions = 1;
    arrayOfSeries = [];
    let checkValue = 1;
    checkSerie = 0;
    for(let i=12;i<14;i++){
        if(multiplicationForm.elements[i].checked) formTerms = multiplicationForm.elements[i].value;
    }
    setTable("1", formTerms);
    questions.innerHTML = formTerms-1;
    for(let j=0;j<11;j++){
        const isSerieChecked = multiplicationForm.elements[j+1].checked;
        if(isSerieChecked){
            checkButton = true;
            formValue = multiplicationForm.elements[j+1].value;
            arrayOfSeries[countArrayOfSeries] = formValue;
            countArrayOfSeries++;
            checkValue++;   
            setTable(formValue, formTerms);
            if(checkValue == formValue || multiplicationForm.elements[11].checked){
                checkSerie++;
                //checkValue--;
                if(formValue > 10){
                    checkSerie = checkSerie - 2;
                }
                //console.log("checkSerie++: "+checkSerie);
                checkValue = formValue;
            }
            //console.log("checkValue: "+checkValue);
        }
        //if(j == 10 && !checkButton) checkButton = false;
        //else arrayOfSeries[j] = "notChecked";
        console.log(isSerieChecked+" "+formValue);
        console.log(checkButton);    
    }
    //console.log("arrayOfSeries.length: "+arrayOfSeries.length);
    if(arrayOfSeries.length == 9 && !multiplicationForm.elements[10].checked && !multiplicationForm.elements[11].checked || arrayOfSeries.length == 11 && multiplicationForm.elements[10].checked) arrayOfSeries.unshift("1");
    //console.log("arrayOfSeries: "+arrayOfSeries);
    //console.log("checkSerie: "+checkSerie)
    if(checkSerie < 9 && !multiplicationForm.elements[0].checked) removeTable();
    else if(checkSerie == 9 && !howManyTerms) removeTable();
    else if(checkSerie == 7 && howManyTerms) removeTable();
    else if(checkSerie == 9 && howManyTerms){
        isTable = true;
        setAttributeSquare();
    }
    else if(checkSerie == 7 && !howManyTerms){
        isTable = true;
        setAttributeSquare();
    }
    checkView = true;
    setButtons();
    checkButton = false;
}
function setButtons(){
    if(checkButton) buttonSetQuestions.disabled = false;
    else{
        buttonSetQuestions.disabled = true;
        button0.disabled = true;
        button1.disabled = true;
        button2.disabled = true;
    }
}
function setTable(formValue, formTerms){
    let nodeTR, howManyRows, howManyCols;
    let serieNumber = 1;
    //let countTD = 0;
    if(checkView){
        while(multiplicationTable.hasChildNodes() || checkTable){
            removeTable();
        }
        checkView = false;
    }
    if(formValue>=1 && formValue <=12) howManyRows = 1;
    else howManyRows = 12;
    if(formTerms == 11) howManyCols = 10;
    else howManyCols = 12;
    for(let i=0;i<howManyRows;i++){
        countSerie++;
        //console.log(i);
        nodeTR = document.createElement("TR");
        //nodeTR.setAttribute("class", "multiplication");
        if(formValue == 13 || formValue == 14) serieNumber = i+1;
        else serieNumber = formValue;
        //arrayOfSeries += serieNumber;
        for(let j=0;j<howManyCols;j++){
            const nodeTD = document.createElement("TD");
            const textnode = document.createTextNode((j+1)+" x "+serieNumber);
            nodeTD.setAttribute("id", (j+1)+serieNumber);
            //console.log(nodeTR.getAttribute(nodeTR.firstChild));
            nodeTD.appendChild(textnode);
            nodeTR.appendChild(nodeTD);
            //countTD++;
        }
        document.getElementById("multiplication-table").appendChild(nodeTR);
    }
    //if(countSerie < 9 && countSerie > 9)    
}
function setAttributeSquare(){
    //console.log("checkSerie: "+checkSerie+" | howManyTerms: "+howManyTerms);
    if(isTable && howManyTerms){
        let count = 0;
        document.querySelectorAll("TD").forEach(function(node){
            if(Number.isInteger(count/11)) node.setAttribute("class", "square");
            count++;
        });
        isTable = false;
    }
    else if(isTable && !howManyTerms){
        let count = 0;
        document.querySelectorAll("TD").forEach(function(node){
            if(Number.isInteger(count/13)) node.setAttribute("class", "square");
            count++;
        });
        isTable = false;
    }
}
function removeTable(){
    multiplicationTable.removeChild(multiplicationTable.firstChild);
}
function setQuestions(){
    buttonSetQuestions.disabled = true;
    button0.disabled = false;
    button1.disabled = false;
    button2.disabled = false;
    multiplier1.innerHTML = arrayOfSeries[0];
    multiplier2.innerHTML = countQuestions;
    const result = arrayOfSeries[0] * countQuestions;
    const randomButtonNumber = Math.floor(Math.random() * 3);
    const randomResultPlus = Math.floor(Math.random()*result+1);
    const randomResultMinus = Math.floor(Math.random()*result+1);
    if(randomButtonNumber == 0){
        button0.innerHTML = result;
        button1.innerHTML = result+randomResultPlus;
        button2.innerHTML = result-randomResultMinus;
        buttonWithCorrectResult = "button0";
    }
    else if(randomButtonNumber == 1){
        button0.innerHTML = result-randomResultMinus;
        button1.innerHTML = result;
        button2.innerHTML = result+randomResultPlus;
        buttonWithCorrectResult = "button1";
    }
    else{
        button0.innerHTML = result+randomResultPlus;
        button1.innerHTML = result-randomResultMinus;
        button2.innerHTML = result;
        buttonWithCorrectResult = "button2";
    }
    //let countQuestionsString = toString(countQuestions);
    console.log(formTerms);
    if(formTerms == countQuestions){
        setButtons();
        countQuestions = 0;
        multiplier2.innerHTML = 1;
        alert("You did it!");
    } 
    countQuestions++;
    console.log("countQuestions: "+countQuestions);
}
function checkResult0(){
    if(button0.id == buttonWithCorrectResult) setQuestions();
    else alert("Try again!");
}
function checkResult1(){
    if(button1.id == buttonWithCorrectResult) setQuestions();
    else alert("Try again!");
}
function checkResult2(){
    if(button2.id == buttonWithCorrectResult) setQuestions();
    else alert("Try again!");
}
