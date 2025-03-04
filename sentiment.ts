import * as Sentiment from "sentiment";

const sentiment: Sentiment = new Sentiment();
const minParam: number = 3;

try {
  if (process.argv.length < minParam) throw new Error("missing parameters");
  console.log(process.argv);  
  const words = process.argv.slice(minParam - 1).join(" ");
  console.log(words);
  const result = sentiment.analyze(words);
  console.log(result);
} catch (err: any) {
  console.log(err.message);
}
