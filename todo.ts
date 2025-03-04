import * as readline from "readline-sync";

const items: string[] = [];
let input: string = "";

do {
  input = readline.prompt({prompt: "enter command: "}).trim();
  if (input.indexOf("add ") === 0) {
    const space = input.indexOf(" ");
    const item = input.substring(space).trim();
    console.log(`adding "${item}"`);
    items.push(item);
  }
  if (input.indexOf("list") === 0) {
    for (let i : number = 0; i < items.length; i++) {
      console.log(`${i}. ${items[i]}`);
    }
  }
} while (input !== "exit");
