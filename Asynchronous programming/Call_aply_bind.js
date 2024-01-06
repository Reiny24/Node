let name = {
    firstname: "Dmytro",
    lastname: "Huk"
}

let printFullName = function (hometown, country) {
    console.log(this.firstname + " " + this.lastname + " from " + hometown + ", " + country);
}

printFullName.call(name, "Cherkasy", "Ukraine");

let name2 = {
    firstname: "Petro",
    lastname: "Petrov"
}

// function borrowing
printFullName.call(name2, "Kyiv", "Ukraine");
printFullName.apply(name2, ["Kyiv", "Ukraine"]);
// bind method
let printMyName = printFullName.bind(name2, "Kyiv", "Ukraine");
console.log(printMyName);
printMyName();