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

    let code_string2 = code_array[x].replace("(","&"); // & is used to separate the code parts in case any parameter text used in the C# code contains spaces (i.e.: Console.WriteLine("Hello world")), since the code lines are split into a list later on

    code_array[x] = code_string2;

    let code_string3 = code_array[x].replace(")","");

    code_array[x] = code_string3;

    // content of for loop removes any unnecessary characters to simplify the strings of code
    
  }

  let content = "";

  for (let y = 0; y < code_array.length; y++) {
    const code_bits = code_array[y].split("&"); // Splits each line of code into arrays of code keywords and values

    // C# output to TS output
    
    if (code_bits[0] == "Console.WriteLine" || code_bits[0] == "Console.Write") { 

      content += "\nconsole.log("+code_bits[1]+");";
      // To prevent the lines of code from overwriting each other, they must be added to the same string and can then be written into the file
      
    } else if (code_bits[0] == "//") {

      // C# comment to TS comment
      
      content += "\n// "+code_bits[1];
      
    }
  }

  fs.writeFile('output.ts', content, err => {
        
  if (err) {
    console.error(err);
  }
        
      });

  console.log("Compiler ran successfully");
  
});

