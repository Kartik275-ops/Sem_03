function runcode(){
let num1 = 10;
let num2 = 12;

let sum = num1 + num2;

document.getElementById("result").innerText = "Sum is: " + sum;
}


function runcode2(){

    let age = 20;

    let name ="Kartik";

    let isStudent = true;

    document.getElementById("result2").innerText = "age type: " + typeof age + " | " +
    "name type: " + typeof name + " | " +
    "isStudent type: " + typeof isStudent;
}

function runcode4(){

    let marks = prompt("Enter the marks");

    if(marks >= 90){
        document.getElementById("result4").innerText = "Grade: A";

    }else if(marks >= 60){
        document.getElementById("result4").innerText = "Grade: B";
    }else{
        document.getElementById("result4").innerText = "Grade: C - Needs Improvement";
    }
}


function runcode5(){

    function addNumbers(x,y){
        return x+y;
    }

    let sum = addNumbers(5,7);

    document.getElementById("result5").innerText = "sum = " + sum;
}


function runcode6(){

    let students =["Kartik","Riya","Karan"];

    let first = students[0];

    let total = students.length;

    students.push("jashn");

    document.getElementById("result6").innerText = "first: " + first + " | " +
    "total: " + total + " | " +
    "After Add: " + students;
}


function runcode7(){

    let student = {
        name: "kartik",
        age: 20,
        marks: 85,
    };

    let studentname = student.name;

    let studentage = student["age"];

    student.marks = 90;

    document.getElementById("result7").innerText = 
    "name: " + studentname + " | " +
    "Age: " + studentage + " | " +
    "Updated Marks: " + student.marks; 
}

function runcode8(){
    document.getElementById("result8").innerText = "hello! javascript changed this text.";
                document.getElementById("result8").style.color = "green";
}

function setupevent(){

    document.getElementById("clickMeBtn").addEventListener("click", function(){
        alert("you clicked the button");
    });
}

function runcode9(){

    let name = "riya";
    let marks = 88;

    let message = `Name : ${name}, Marks : ${marks}`;

    document.getElementById("result9").innerText = message;
}



    class Student{

    constructor(name,marks){
        this.name = name;
        this.marks = marks;
    }

    showResult(){
        return this.name + " scored " + this.marks;
    }
}

function runcode11(){


let student1 = new Student("karan", 78);

document.getElementById("result11").innerText = student1.showResult();
}
