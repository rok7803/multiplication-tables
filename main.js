let checkSerie;
let checkView = false;
let checkTable = false;
let howManyTerms = true;
let isTable = false;
const multiplicationForm = document.getElementById("multiplication-form");
const multiplicationTable = document.getElementById("multiplication-table");
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
    let formValue, formTerms;
    let checkValue = 1;
    checkSerie = 0;
    for(let i=12;i<14;i++){
        if(multiplicationForm.elements[i].checked) formTerms = multiplicationForm.elements[i].value;
    }
    setTable("1", formTerms);
    for(let j=0;j<11;j++){
        const isSerieChecked = multiplicationForm.elements[j+1].checked;
        if(isSerieChecked){
            formValue = multiplicationForm.elements[j+1].value;    
            setTable(formValue, formTerms);
            checkValue++;
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
        //console.log(isSerieChecked+" "+formValue);    
    }
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
    if(formTerms == 13) howManyCols = 10;
    else howManyCols = 12;
    for(let i=0;i<howManyRows;i++){
        //console.log(i);
        nodeTR = document.createElement("TR");
        //nodeTR.setAttribute("class", "multiplication");
        if(formValue == 13 || formValue == 14) serieNumber = i+1;
        else serieNumber = formValue;
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