# SharpType

## Version

> **Current: Version 2.0:**
>
> **The compiler now supports C# variable declarations of types string, int, double, char, bool, float, and long**
>
> The C# variable declaration must be in this format:

~~~csharp
string variableName = "value"; 
~~~


> *Previous versions:*
> 
> 1. Version 1.0:
>  The compiler supports C# Console.WriteLine, Console.Write, and comments
>
> The number before the decimal is increased each time support for a C# feature is added to the compiler code
>
> The number after the decimal is increased if other changes to the code occur (e.g.: bug fixes, minor edits, etc.)

## License
MIT License (free to use)

## Project Pages
- Replit: https://replit.com/@dtecoder46/SharpType?v=1
- Github: https://github.com/dtecoder46/SharpType

## Description
A JavaScript-based compiler that converts C# into TypeScript that can then be run separately or modified for compatibility with HTML or web frameworks. This is designed to make compiling C# to TS easy to do.

## How To Use

1. If using Replit, fork this project.
2. If using VSCode, fork the GitHub repository and import into VSCode. Then install the latest version of NodeJS and any neccessary extensions.
3. Edit the C# code until it's what you desire. **For comments, be sure to replace the space between the // symbol and the comment text with the & symbol. For variable declaration, put " ! " (without the quotes) between the type and variable name**.
4. Then, run the project. Check the output.ts file for the compiled code. If the compiler is used for web applications, use this command in your terminal/shell:

~~~sh 
node index.js 
~~~

Again, check the output.ts file for the compiled code. Afterwards, connect the output.ts file to the script tag of your HTML/web framework file.


## How It Works

1. The program gets the text of the C# file and splts the code into a list, where each line of code is a list item.
2. The list is looped over and the functional code is stripped of any indents and is put into a new list. The boilerplate code is ignored by the program. **However, the C# boilerplate may differ depending on what you use**. If using a "Hello World" program from Replit's C# template, the compiler will run fine. Otherwise, feel free to alter the boilerplate if statement to suit your amount of C# boilerplate lines.
3. This new list is looped over to strip each code line of any unnecessary characters, namely ";", "(", and ")" to simplify the compiling process. The & delimiter is also added in place of "(".
4. In yet another loop, each line of code is split by the aforementioned & delimiter into individual lists of keywords and parameters, which is why the & symbol must manually be put in between the comment symbol and text. If a space was used as the delimiter, **it would also split any text containing spaces**, which would only complicating everything.
5. Within the aforementioned loop, the program detects certain C# keywords in each list and adds the corresponding TypeScript code containing the parameters into one string.
6. The string is written into the TypeScript file.


## My Signature

![my programming signature](signature.jpeg)
