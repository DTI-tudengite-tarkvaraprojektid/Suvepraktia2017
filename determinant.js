// **** GLOBAALSED MUUTUJAD ****

// muutujad maatriksi suuruste jaoks
var matrixSize;

// muutujad determinantide jaoks
var detNumbers = [];
var detValues = "";
var inversionCount = 0;

// muutuja permutatsioonide tabeli jaoks
var matrixPermutationTable = document.getElementById("matrixPermutationTable");

var mistakes = false;

// **** ÜLDINE FUNKTSIOON MAATRIKSI GENEREERIMISEKS ****

function generateMatrixForDeterminant() {

    document.getElementById("mistakeNotification").style.display = "none";

    matrixSize = document.getElementById("determinant").value;
    var matrixForDeterminant = document.getElementById("matrixForDeterminant");
    var matrixPermutationTable = document.getElementById("matrixPermutationTable");
    var matrixDeterminantAnswer = document.getElementById("matrixDeterminantAnswer");

    if (matrixForDeterminant) {

        matrixForDeterminant.innerHTML = "";
        matrixPermutationTable.innerHTML = "";
        matrixDeterminantAnswer.innerHTML = "";
        createMatrixForDeterminant();

    } else {

        matrixPermutationTable.innerHTML = "";
        matrixDeterminantAnswer.innerHTML = "";
        createMatrixForDeterminant();
    }
}


// **** FUNKTSIOON, MIS GENEREERIB ESIMESE MAATRIKSI ****

function generateMatrix(){
	generateMatrixForDeterminant();
	//generateDetMatrix();
} 


function createMatrixForDeterminant() {

    var matrixDeterminantContainer = document.getElementById("matrixDeterminantContainer");
    /*var mWidth = 42 * matrixSize;
	var mHeight = 28 * matrixSize;
	matrixDeterminantContainer.style.width = mWidth + "px";
	matrixDeterminantContainer.style.height = mHeight + "px";
*/
    var matrixForDeterminant = document.getElementById("matrixForDeterminant");
    var tableBody = document.createElement("tbody");

    for (var i = 0; i < matrixSize; i++) {
        var row = document.createElement("tr");

        for (var j = 0; j < matrixSize; j++) {
            var rowId = i + 1;
            var colId = j + 1;
            var cell = document.createElement("input");
            cell.setAttribute("id", "a" + rowId + colId);
            cell.setAttribute("type", "text");
            cell.setAttribute("onkeypress", "validate(event)");
            cell.setAttribute("onblur", "checkInputSequence()");
            cell.setAttribute("maxlength", "10");
            row.appendChild(cell);
        }
        tableBody.appendChild(row);
    }
    matrixForDeterminant.appendChild(tableBody);
}

// **** FUNKTSIOON, MIS GENEREERIB MATHJAXI RUUTMAATRIKSI ***** 
function createDetMatrix(){
    var answerString = "";
    var output = document.getElementById("DetMatrix");
    var table = document.getElementById("matrixForDeterminant");
    for(var r = 0, n = table.rows.length; r < n; r++){
		if(r >= 1){
			var strLength = answerString.length;
			answerString = (answerString.slice(0, strLength - 1));
			answerString +="\\\\";
		}
        for(var c = 0, n = table.rows.length; c<n; c++){
            var rowId = r + 1;
            var colId = c + 1;
            if(c<n){
                var Cell = document.getElementById("a" + rowId + colId).value + "&";
                answerString += Cell;
            }else if(c==n){
                var Cell = document.getElementById("a" + rowId + colId).value;
                answerString += Cell;
            }
        }
    }
    var strLength = answerString.length;
    answerString = (answerString.slice(0, strLength - 1));
    //answerString = answerString.concat(Cell);
    return answerString;
}
console.log(createDetMatrix());

function determinantPhase(){
	var p = document.getElementById("determinant").value;
	if(p==2){
		return "Teist";
	}else if(p==3){
		return "Kolmandat";
	}else if(p==4){
		return "Neljandat";
	}else if(p==5){
		return "Viiendat"
	}
}

function generateDetMatrix(){
	var mathDiv = document.getElementById("math");
	var displayDiv = document.getElementById("display");

	MathJax.Hub.Queue(["Typeset", MathJax.Hub, "math"]);
	MathJax.Hub.Queue(function(){
		var math = MathJax.Hub.getAllJax("MathDiv")[0];
		var i = document.getElementById("determinant").value;
		var j = calculateDeterminant();
		var k = determinantPhase();
		var l = createDetMatrix();

		MathJax.Hub.Queue(["Text", math, k + "\\ järku\\ ruutmaatriksi\\ A_" + i + " = \\begin{pmatrix}" + l + "\\end{pmatrix}" + k + "\\ järku\\ determinandiks\\ nimetatakse\\ reaalarvu \\begin{vmatrix}A_" + i + "\\end{vmatrix} = \\begin{vmatrix}" + l + "\\end{vmatrix} = " + j])
		MathJax.Hub.Queue(function(){
			displayDiv.innerHTML = mathDiv.innerHTML;
		})
	})
}

// ||||| ----- ----- ----- ----- DETERMINANTIDE KALKULAATORI OSA ----- ----- ----- ----- |||||

// **** FUNKTSIOON �IGE PERMUTATSIOONIDE FUNKTSIOONI K�IVITAMISEKS ****

function calculateDeterminant() {


    if (mistakes === false) {
        document.getElementById("mistakeNotification").style.display = "inline";
        document.getElementById("mistakeNotification").innerHTML = "Kõik lahtrid ei ole korralikult täidetud";
    } else {
        document.getElementById("mistakeNotification").style.display = "none";
        var determinant = document.getElementById("determinant").value;

        if (determinant === "4") {
            determinantFor4();
            generateDetMatrix();
			a = determinantFor4();
        }

        if (determinant === "5") {
            determinantFor5();
            generateDetMatrix();
			a = determinantFor5();
        }

        if (determinant === "3") {
            determinantFor3();
            generateDetMatrix();
			a = determinantFor3();
        }

        if (determinant === "2") {
            determinantFor2();
            generateDetMatrix();
			a = determinantFor2();
        }

        mistakes = false;

        document.getElementById("showCalculations").style.display = "inline-block";
        document.getElementById("matrixDeterminantAnswer").style.display = "inline-block";
        document.getElementById("answerHeadline").style.display = "inline-block";


    }
    return a;
}

// **** FUNKTSIOONID PERMUTATSIOONIDE GENEREERIMISEKS ****

function determinantFor2() {

    var matrixPermutationTable = document.getElementById("matrixPermutationTable");
    var matrixDeterminantAnswer = document.getElementById("matrixDeterminantAnswer");
    var permutationTableHead = "<tr><th>" + "Permutatsioonid" + "</th><th>" + "Inversioonid" + "</th><th>" + "Arvutus" + "</th></tr>";
    var matrixPermutationTableString = permutationTableHead;

    // esimene ts�kkel, mis m��rab �ra esimese numbri
    for (var i = 0; i < 2; i++) {

        //console.log("tsykkel 1 -> i: " + i + ", j: " + j + ", k: " + k + ", l: " + l);

        var detNumbers2 = [1, 2];
        var detNumbersTemp = [];
        var detValuesTemp = "";


        // teine ts�kkel, mis m��rab �ra teise numbri
        for (var j = 0; j < 1; j++) {

            //console.log("tsykkel 2 -> i: " + i + ", j: " + j + ", k: " + k + ", l: " + l);

            var detNumbers1 = [];
            for (var n1 = 0; n1 < 2; n1++) {
                detNumbers1[n1] = detNumbers2[n1];
            }
            detNumbers1.splice(i, 1);
            detNumbersTemp = [detNumbers2[i], detNumbers1[j]];
        }


        // siia inversioonid
        for (var i1 = 0; i1 < 2; i1++) {
            if (detNumbersTemp[i1] > detNumbersTemp[i1 + 1]) {
                inversionCount++;
            }
        }


        var cellValue1 = document.getElementById("a1" + detNumbersTemp[0]).value;
        var cellValue2 = document.getElementById("a2" + detNumbersTemp[1]).value;

        if (inversionCount % 2 === 0) {
            detValuesTemp += " + " + cellValue1 + "*" + cellValue2;
            detValues += detValuesTemp;
        } else {
            detValuesTemp += " - " + cellValue1 + "*" + cellValue2;
            detValues += detValuesTemp;
        }

        var permutationTableRow = "<tr><td>" + detNumbersTemp + "</td><td>" + inversionCount + "</td><td>" + detValuesTemp + "</td></tr>";
        matrixPermutationTableString += permutationTableRow;

        console.log("detNumbersTemp: " + detNumbersTemp + ", inversioonid: " + inversionCount + ", arvud: " + detValuesTemp);

        detNumbers.push(detNumbersTemp);
        detNumbersTemp = [];
        detValuesTemp = "";
        inversionCount = 0;
    }
    detValues = detValues.slice(3, detValues.length);
    console.log("vahetulemus: " + detValues);

    var matrixDetAnswer = math.eval(detValues);
    var matrixDeterminantAnswer = document.getElementById("matrixDeterminantAnswer");
    matrixDeterminantAnswer.innerHTML = matrixDetAnswer;
    detValues = "";
    matrixPermutationTable.innerHTML = matrixPermutationTableString;
    matrixPermutationTableString = "";
    return matrixDetAnswer;
}

function determinantFor3() {

    var matrixPermutationTable = document.getElementById("matrixPermutationTable");
    var matrixDeterminantAnswer = document.getElementById("matrixDeterminantAnswer");
    var permutationTableHead = "<tr><th>" + "Permutatsioonid" + "</th><th>" + "Inversioonid" + "</th><th>" + "Arvutus" + "</th></tr>";
    var matrixPermutationTableString = permutationTableHead;

    // esimene ts�kkel, mis m��rab �ra esimese numbri
    for (var i = 0; i < 3; i++) {

        //console.log("tsykkel 1 -> i: " + i + ", j: " + j + ", k: " + k + ", l: " + l);

        var detNumbers3 = [1, 2, 3];
        var detNumbersTemp = [];
        var detValuesTemp = "";


        // teine ts�kkel, mis m��rab �ra teise numbri
        for (var j = 0; j < 2; j++) {

            //console.log("tsykkel 2 -> i: " + i + ", j: " + j + ", k: " + k + ", l: " + l);

            var detNumbers2 = [];
            for (var n2 = 0; n2 < 3; n2++) {
                detNumbers2[n2] = detNumbers3[n2];
            }
            detNumbers2.splice(i, 1);


            // kolmas ts�kkel, mis m��rab �ra kolmanda numbri
            for (var k = 0; k < 1; k++) {

                //console.log("tsykkel 3 -> i: " + i + ", j: " + j + ", k: " + k + ", l: " + l);

                var detNumbers1 = [];
                for (var n1 = 0; n1 < 2; n1++) {
                    detNumbers1[n1] = detNumbers2[n1];
                }
                detNumbers1.splice(j, 1);
                detNumbersTemp = [detNumbers3[i], detNumbers2[j], detNumbers1[k]];
            }

            // siia inversioonid
            for (var i1 = 0; i1 < 2; i1++) {
                if (detNumbersTemp[i1] > detNumbersTemp[i1 + 1]) {
                    inversionCount++;
                }
            }

            for (var i2 = 0; i2 < 1; i2++) {
                if (detNumbersTemp[i2] > detNumbersTemp[i2 + 2]) {
                    inversionCount++;
                }
            }

            var cellValue1 = document.getElementById("a1" + detNumbersTemp[0]).value;
            var cellValue2 = document.getElementById("a2" + detNumbersTemp[1]).value;
            var cellValue3 = document.getElementById("a3" + detNumbersTemp[2]).value;

            if (inversionCount % 2 === 0) {
                detValuesTemp += " + " + cellValue1 + "*" + cellValue2 + "*" + cellValue3;
                detValues += detValuesTemp;
            } else {
                detValuesTemp += " - " + cellValue1 + "*" + cellValue2 + "*" + cellValue3;
                detValues += detValuesTemp;
            }

            var permutationTableRow = "<tr><td>" + detNumbersTemp + "</td><td>" + inversionCount + "</td><td>" + detValuesTemp + "</td></tr>";
            matrixPermutationTableString += permutationTableRow;

            console.log("detNumbersTemp: " + detNumbersTemp + ", inversioonid: " + inversionCount + ", arvud: " + detValuesTemp);

            detNumbers.push(detNumbersTemp);
            detNumbersTemp = [];
            detValuesTemp = "";
            inversionCount = 0;
        }
    }
    detValues = detValues.slice(3, detValues.length);
    console.log("vahetulemus: " + detValues);

    var matrixDetAnswer = math.eval(detValues);
    var matrixDeterminantAnswer = document.getElementById("matrixDeterminantAnswer");
    matrixDeterminantAnswer.innerHTML = matrixDetAnswer;
    detValues = "";
    matrixPermutationTable.innerHTML = matrixPermutationTableString;
    matrixPermutationTableString = "";
    return matrixDetAnswer;
}

function determinantFor4() {

    var matrixPermutationTable = document.getElementById("matrixPermutationTable");
    var matrixDeterminantAnswer = document.getElementById("matrixDeterminantAnswer");
    var permutationTableHead = "<tr><th>" + "Permutatsioonid" + "</th><th>" + "Inversioonid" + "</th><th>" + "Arvutus" + "</th></tr>";
    var matrixPermutationTableString = permutationTableHead;

    // esimene ts�kkel, mis m��rab �ra esimese numbri
    for (var i = 0; i < 4; i++) {

        //console.log("tsykkel 1 -> i: " + i + ", j: " + j + ", k: " + k + ", l: " + l);

        var detNumbers4 = [1, 2, 3, 4];
        var detNumbersTemp = [];
        var detValuesTemp = "";


        // teine ts�kkel, mis m��rab �ra teise numbri
        for (var j = 0; j < 3; j++) {

            //console.log("tsykkel 2 -> i: " + i + ", j: " + j + ", k: " + k + ", l: " + l);

            var detNumbers3 = [];
            for (var n3 = 0; n3 < 4; n3++) {
                detNumbers3[n3] = detNumbers4[n3];
            }
            detNumbers3.splice(i, 1);

            // kolmas ts�kkel, mis m��rab �ra kolmanda numbri
            for (var k = 0; k < 2; k++) {

                //console.log("tsykkel 3 -> i: " + i + ", j: " + j + ", k: " + k + ", l: " + l);

                var detNumbers2 = [];
                for (var n2 = 0; n2 < 3; n2++) {
                    detNumbers2[n2] = detNumbers3[n2];
                }
                detNumbers2.splice(j, 1);

                // neljas ts�kkel, mis m��rab �ra neljanda numbri
                for (var l = 0; l < 1; l++) {

                    //console.log("tsykkel 4 -> i: " + i + ", j: " + j + ", k: " + k + ", l: " + l);

                    var detNumbers1 = [];
                    for (n1 = 0; n1 < 2; n1++) {
                        detNumbers1[n1] = detNumbers2[n1];
                    }
                    detNumbers1.splice(k, 1);
                    detNumbersTemp = [detNumbers4[i], detNumbers3[j], detNumbers2[k], detNumbers1[l]];
                }


                // siia inversioonid
                for (var i1 = 0; i1 < 3; i1++) {
                    if (detNumbersTemp[i1] > detNumbersTemp[i1 + 1]) {
                        inversionCount++;
                    }
                }

                for (var i2 = 0; i2 < 2; i2++) {
                    if (detNumbersTemp[i2] > detNumbersTemp[i2 + 2]) {
                        inversionCount++;
                    }
                }

                for (var i3 = 0; i3 < 1; i3++) {
                    if (detNumbersTemp[i3] > detNumbersTemp[i3 + 3]) {
                        inversionCount++;
                    }
                }

                var cellValue1 = document.getElementById("a1" + detNumbersTemp[0]).value;
                var cellValue2 = document.getElementById("a2" + detNumbersTemp[1]).value;
                var cellValue3 = document.getElementById("a3" + detNumbersTemp[2]).value;
                var cellValue4 = document.getElementById("a4" + detNumbersTemp[3]).value;

                if (inversionCount % 2 === 0) {
                    detValuesTemp += " + " + cellValue1 + "*" + cellValue2 + "*" + cellValue3 + "*" + cellValue4;
                    detValues += detValuesTemp;
                } else {
                    detValuesTemp += " - " + cellValue1 + "*" + cellValue2 + "*" + cellValue3 + "*" + cellValue4;
                    detValues += detValuesTemp;
                }

                var permutationTableRow = "<tr><td>" + detNumbersTemp + "</td><td>" + inversionCount + "</td><td>" + detValuesTemp + "</td></tr>";
                matrixPermutationTableString += permutationTableRow;

                console.log("detNumbersTemp: " + detNumbersTemp + ", inversioonid: " + inversionCount + ", arvud: " + detValuesTemp);

                detNumbers.push(detNumbersTemp);
                detNumbersTemp = [];
                detValuesTemp = "";
                inversionCount = 0;
            }
        }
    }
    detValues = detValues.slice(3, detValues.length);
    console.log("vahetulemus: " + detValues);

    var matrixDetAnswer = math.eval(detValues);
    var matrixDeterminantAnswer = document.getElementById("matrixDeterminantAnswer");
    matrixDeterminantAnswer.innerHTML = matrixDetAnswer;
    detValues = "";
    matrixPermutationTable.innerHTML = matrixPermutationTableString;
    matrixPermutationTableString = "";
    return matrixDetAnswer;
}

function determinantFor5() {

    var matrixPermutationTable = document.getElementById("matrixPermutationTable");
    // var matrixDeterminantAnswer = document.getElementById("matrixDeterminantAnswer");
    var permutationTableHead = "<tr><th>" + "Permutatsioonid" + "</th><th>" + "Inversioonid" + "</th><th>" + "Arvutus" + "</th></tr>";
    var matrixPermutationTableString = permutationTableHead;

    // esimene ts�kkel, mis m��rab �ra esimese numbri
    for (var i = 0; i < 5; i++) {

        //console.log("tsykkel 5 -> i: " + i + ", j: " + j + ", k: " + k + ", l: " + l + ", m: " + m);

        var detNumbers5 = [1, 2, 3, 4, 5];
        var detNumbersTemp = [];
        var detValuesTemp = "";


        // teine ts�kkel, mis m��rab �ra teise numbri
        for (var j = 0; j < 4; j++) {

            //console.log("tsykkel 5 -> i: " + i + ", j: " + j + ", k: " + k + ", l: " + l + ", m: " + m);

            var detNumbers4 = [];
            for (var n4 = 0; n4 < 5; n4++) {
                detNumbers4[n4] = detNumbers5[n4];
            }
            detNumbers4.splice(i, 1);

            // kolmas ts�kkel, mis m��rab �ra kolmanda numbri
            for (var k = 0; k < 3; k++) {

                //console.log("tsykkel 5 -> i: " + i + ", j: " + j + ", k: " + k + ", l: " + l + ", m: " + m);

                var detNumbers3 = [];
                for (var n3 = 0; n3 < 4; n3++) {
                    detNumbers3[n3] = detNumbers4[n3];
                }
                detNumbers3.splice(j, 1);

                // neljas ts�kkel, mis m��rab �ra neljanda numbri
                for (var l = 0; l < 2; l++) {

                    //console.log("tsykkel 5 -> i: " + i + ", j: " + j + ", k: " + k + ", l: " + l + ", m: " + m);

                    var detNumbers2 = [];
                    for (n2 = 0; n2 < 3; n2++) {
                        detNumbers2[n2] = detNumbers3[n2];
                    }
                    detNumbers2.splice(k, 1);

                    // viies ts�kkel, mis m��rab �ra viienda numbri
                    for (var m = 0; m < 1; m++) {

                        //console.log("tsykkel 5 -> i: " + i + ", j: " + j + ", k: " + k + ", l: " + l + ", m: " + m);

                        var detNumbers1 = [];
                        for (n1 = 0; n1 < 2; n1++) {
                            detNumbers1[n1] = detNumbers2[n1];
                        }
                        detNumbers1.splice(l, 1);
                        detNumbersTemp = [detNumbers5[i], detNumbers4[j], detNumbers3[k], detNumbers2[l], detNumbers1[m]];


                        // siia inversioonid
                        for (var i1 = 0; i1 < 4; i1++) {
                            if (detNumbersTemp[i1] > detNumbersTemp[i1 + 1]) {
                                inversionCount++;
                            }
                        }

                        for (var i2 = 0; i2 < 3; i2++) {
                            if (detNumbersTemp[i2] > detNumbersTemp[i2 + 2]) {
                                inversionCount++;
                            }
                        }

                        for (var i3 = 0; i3 < 2; i3++) {
                            if (detNumbersTemp[i3] > detNumbersTemp[i3 + 3]) {
                                inversionCount++;
                            }
                        }

                        for (var i4 = 0; i4 < 1; i4++) {
                            if (detNumbersTemp[i4] > detNumbersTemp[i4 + 4]) {
                                inversionCount++;
                            }
                        }

                        var cellValue1 = document.getElementById("a1" + detNumbersTemp[0]).value;
                        var cellValue2 = document.getElementById("a2" + detNumbersTemp[1]).value;
                        var cellValue3 = document.getElementById("a3" + detNumbersTemp[2]).value;
                        var cellValue4 = document.getElementById("a4" + detNumbersTemp[3]).value;
                        var cellValue5 = document.getElementById("a5" + detNumbersTemp[4]).value;

                        if (inversionCount % 2 === 0) {
                            detValuesTemp += " + " + cellValue1 + "*" + cellValue2 + "*" + cellValue3 + "*" + cellValue4 + "*" + cellValue5;
                            detValues += detValuesTemp;
                        } else {
                            detValuesTemp += " - " + cellValue1 + "*" + cellValue2 + "*" + cellValue3 + "*" + cellValue4 + "*" + cellValue5;
                            detValues += detValuesTemp;
                        }

                        var permutationTableRow = "<tr><td>" + detNumbersTemp + "</td><td>" + inversionCount + "</td><td>" + detValuesTemp + "</td></tr>";
                        matrixPermutationTableString += permutationTableRow;

                        console.log("detNumbersTemp: " + detNumbersTemp + ", inversioonid: " + inversionCount + ", arvud: " + detValuesTemp);

                        detNumbers.push(detNumbersTemp);
                        detNumbersTemp = [];
                        detValuesTemp = "";
                        inversionCount = 0;
                    }
                }
            }
        }
    }
    detValues = detValues.slice(3, detValues.length);
    console.log("vahetulemus: " + detValues);

    var matrixDetAnswer = math.eval(detValues);
    var matrixDeterminantAnswer = document.getElementById("matrixDeterminantAnswer");
    matrixDeterminantAnswer.innerHTML = matrixDetAnswer;
    detValues = "";
    matrixPermutationTable.innerHTML = matrixPermutationTableString;
    matrixPermutationTableString = "";
    return matrixDetAnswer;
}

function displayTable() {
    document.getElementById("determinantTable").style.display = "block";
    //document.getElementById("checkAnswerDeterminant").style.display="none";
    //document.getElementById("showCalculations").style.display="none";

}

function newCalculation() {
    window.location.reload(false);
}


function checkInputSequence() {
    checkInput: for (var i = 0; i < matrixSize; i++) {
        for (var j = 0; j < matrixSize; j++) {
            var rowId = i + 1;
            var colId = j + 1;
            var number = document.getElementById("a" + rowId + colId).value;
            if (number == "") {
                console.log("See kast on tühi");
                var inputColor = document.getElementById("a" + rowId + colId);
                inputColor.style.backgroundColor = "";
                mistakes = false
                break checkInput;
            } else {
                var regex = /^(\-\d+\/\-\d+)$|^(\d+\/\-\d+)$|^(\-\d+\/\d+)$|^(\d+\/\d+)$|^(\d+)$|^(\-\d+)$/
                var found = regex.test(number);
                console.log(found);
                if (found === false) {
                    var inputColor = document.getElementById("a" + rowId + colId);
                    inputColor.style.backgroundColor = "red";
                    mistakes = false;
                    document.getElementById("mistakeNotification").style.display = "inline";
                    document.getElementById("mistakeNotification").innerHTML = "Kusagil on viga";
                } else {
                    var inputColor = document.getElementById("a" + rowId + colId);
                    inputColor.style.backgroundColor = "";
                    document.getElementById("mistakeNotification").style.display = "none";
                    mistakes = true
                }
            }
        }
    }
    if (mistakes === true) {
        //console.log("Vigu ei olnud");
        //document.getElementById("checkAnswerDeterminant").style.display = "block"
        //document.getElementById("newDeterminant").style.display = "block"
        document.getElementById("mistakeNotification").style.display = "block"
    } else {
        //console.log("vigu on");
    }
}


function validate(evt) {
    key = evt.key;
    var allowed = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "/", "-", "Tab", "Backspace"];
    if (allowed.indexOf(evt.key) == -1) {
        evt.preventDefault();
        //console.log("EI LUBA");
    }
    // PRAEGUNE
    if (evt.key === "/" && evt.target.value.indexOf('/') != -1) {
        evt.preventDefault();
    }

}






//täidab testimiseks väljad
document.addEventListener("keypress", function(e) {
    if (e.key === "f") { fill() }

})

function fill() {


    mistakes = true;
    document.querySelectorAll("tr > *").forEach(function(element) { element.value = Math.floor(Math.random() * 300) })
}