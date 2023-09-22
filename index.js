const fs = require("fs"); // module for accessing files
 
fs.readFile("input.cs", "utf8", (err, data) => { // gets content of C# file

  // code must ideally be inside readFile since the data variable exists only in here
  
  if (err) { console.log(err); }
 
  const list = data.split("\n"); // splits each C# code line into a list
  
  let code_array = []; // code_array accounts for multiple lines of functional C# code
  
  for (let i = 0; i < list.length; i++) {
    
    if (i == 0 || i == 1 || i == 2 || i == 3 || i == list.length - 2 || i == list.length - 1 || list[i] == "") {
      continue; // Used to remove C# boilerplate code
    } 

    code_array.push(list[i].trim()); // removes the indent at the front
      
  }

  for (let x = 0; x < code_array.length; x++) {
    let code_string = code_array[x].replace(";","");

    code_array[x] = code_string;

    let code_string2 = code_array[x].replaceAll("(","&"); // & is used to separate the code parts in case any parameter text used in the C# code contains spaces (i.e.: Console.WriteLine("Hello world")), since the code lines are split into a list later on

    code_array[x] = code_string2;

    let code_string3 = code_array[x].replaceAll(")","");

    code_array[x] = code_string3;

    let code_string4 = code_array[x].replaceAll(" = ","&");

    code_array[x] = code_string4;

    let code_string5 = code_array[x].replaceAll(" ! ","&");

    code_array[x] = code_string5;

    // content of for loop removes any unnecessary characters to simplify the strings of code

  }

  
  let content = "";

  for (let y = 0; y < code_array.length; y++) {
    const code_bits = code_array[y].split("&"); // Splits each line of code into arrays of code keywords and values
    
    // C# output to TS output
    
    if (code_bits[0] == "Console.WriteLine" || code_bits[0] == "Console.Write") { 

      /* Type casting in format: 
      Console.Write(Convert.ToString(x));
      or
      Console.Write(Convert.ToInt32(x));
      */
      
      
      if (code_bits[1] == "Convert.ToString") {
        
        content += "\nconsole.log(" + "String(" + code_bits[2] + ")" + ");";
        
      } else if (code_bits[1] = "Convert.ToInt32") {
        
        content += "\nconsole.log(" + "Number(" + code_bits[2] + ")" + ");";
        
      } else {
        
        content += "\nconsole.log("+code_bits[1]+");";
        
      // To prevent the lines of code from overwriting each other, they must be added to the same string and can then be written into the file
        
      }
      

      
      
    } else if (code_bits[0] == "//") {

      // C# comment to TS comment
      
      content += "\n// "+code_bits[1];
      
    } else if (code_bits[0] == "string" || code_bits[0] == "int" || code_bits[0] == "double" || code_bits[0] == "char" || code_bits[0] == "bool" || code_bits[0] == "float" || code_bits[0] == "long") {

      /* variable declaration: 
      [type] variableName = value; -> 
      let variableName = value; */
      
      content += "\nlet " + code_bits[1] + " = " + code_bits[2] + ";";

      
    } else if (code_bits[0] == "re") {

      /* variable re-declaration: 
      
      variableName = newValue;
      
      is allowed after initial declaration */
      
      content += "\n" + code_bits[1] + " = " + code_bits[2] + ";";
      
    } else if (code_bits[0] == "empty") {

      /* Empty variable declaration:
      string hello; (C#)
      to
      let hello; (JS)
      */
      
      content += "\nlet " + code_bits[2] + ";";
      
    } else if (code_bits[0] == "const") {

      // Const variable declaration

      content += "\nconst " + code_bits[2] + " = " + code_bits[3] + ";";
      
    }
  }

  fs.writeFile('output.ts', content, err => {
        
  if (err) {
    console.error(err);
  }
        
      });

  console.log("Compiler ran successfully");
  
});

