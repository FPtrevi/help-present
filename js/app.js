let wantData = '' //객체
let keys = '';    //객체의 키값
function readExcel() {
    let input = event.target;
    let reader = new FileReader();
    reader.onload = function () {
        let data = reader.result;
        let workBook = XLSX.read(data, { type: 'binary' });
        workBook.SheetNames.forEach(function (sheetName) {
            let rows = XLSX.utils.sheet_to_json(workBook.Sheets[sheetName]);
            wantData = rows
            keys = Object.keys(wantData[0]);
        })
    };
    reader.readAsBinaryString(input.files[0]);
    let checkTheFile = document.querySelector(".checkFile");
    checkTheFile.textContent = "준비가 완료 되었습니다."
}

//뽑기
let len = ""
let randomId=""
let randomUniversity=""
let randomDepartment=""
let getNumber=0

function getRandom1(){
    len = wantData.length;
    getNumber = Math.floor(Math.random()*len);
    randomId = wantData[getNumber].이름;
    randomUniversity = wantData[getNumber].학과;
    randomDepartment = wantData[getNumber].학교;
    wantData.splice(getNumber,1);
    return [randomId, randomUniversity, randomDepartment]
    // console.log(`${randomId}\n${randomUniversity}\n${randomDepartment}`);
}

function getStart(x){
    let rankArray = [];
    let getresult= document.getElementById("result");

    let disDiv = document.getElementById("indexOfRank");
    disDiv.style.display = "none";
    let disDiv1 = document.querySelector(".file");
    disDiv1.style.display = "none";
    let disImg = document.querySelector(".img");
    disImg.style.display = "none";

    for(let j=1; j<=x; j++){
        let getIdOfRank = document.getElementById(`rank${j}`).value;
        rankArray.push(getIdOfRank);
    }
    for(let num=0; num<rankArray.length; num++){
        let newIndex = document.createElement("div");
        let newShowRank = document.createElement("div");
        newIndex.className = "indexOfResult";
        newShowRank.className = "showRank";
        newShowRank.innerHTML = `${num+1}등`;
        
        getresult.appendChild(newIndex);
        newIndex.appendChild(newShowRank);
        
        for(let rep=0; rep<rankArray[num]; rep++){
            let newRList = document.createElement("div");
            newRList.className = "resultList";
            newIndex.appendChild(newRList);
            let newName = document.createElement("div");
            let newUni = document.createElement("div");
            let newDep = document.createElement("div");
            newName.className = "name";
            newUni.className = "uni";
            newDep.className = "dep";
            let getItem = getRandom1();
            newName.innerHTML = getItem[0];
            newUni.innerHTML = getItem[1];
            newDep.innerHTML = getItem[2];                            
            newRList.appendChild(newName);
            newRList.appendChild(newUni);
            newRList.appendChild(newDep);                            
        };
    };
};

function startRank(){
    let checkIsFile = document.querySelector(".checkFile");
    if(checkIsFile.textContent === "파일 선택"){
        alert("파일을 선택해 주세요.")
    }else{
        let importInput = document.getElementById("countRank");
        let inputRank = parseInt(importInput.value);
        let getId = document.getElementById("indexOfRank");
        let disDiv = document.getElementById("inputRank");
        disDiv.style.display = "none"
        let disDiv1 = document.querySelector(".file");
        disDiv1.style.display = "none";
        let disImg = document.querySelector(".img");
        disImg.style.display = "none";
        for(let i=1; i<=inputRank; i++){
            let newDiv = document.createElement("div");
            newDiv.innerHTML = `${i}등 <input type="text" id="rank${i}">명`;
            newDiv.className = `rank${i}`;
            getId.appendChild(newDiv);
        };
        let newStart = document.createElement("Button");
        let newStartText = document.createTextNode('시작');
        newStart.appendChild(newStartText);
        newStart.setAttribute("onclick",`getStart(${inputRank})`)
        getId.appendChild(newStart);
    }
}