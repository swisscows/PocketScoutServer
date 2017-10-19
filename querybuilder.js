var vaildCommands = ["INSERT", "Insert", "insert", "ALTER", "Alter", "alter", "DROP", "Drop", "drop", "SELECT", "Select", "select", "DELETE", "Delete", "delete"];
var invalidChars = "!@#$%^&*()_+=-{}[]\|\/";

function buildQuery(command, colVals, vals){

}

function cleanInputs(vals){
    vals.map(function(curr, index, arr){
        return curr.replace(/\W/g, curr);
    });

    return vals;
}