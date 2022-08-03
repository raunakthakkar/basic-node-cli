#!/usr/bin/env node

import nodefetch from "node-fetch";
import minimist from "minimist";

const baseTodosURL = "https://jsonplaceholder.typicode.com/todos/";
const args = minimist(process.argv.slice(2));
const printHelp=()=>{
  console.log(`
  --todoId=number fetches todo of given id
  --userId=number fetches todos created by given user number
  `)
}
const createURL = () => {
  const url = `${baseTodosURL}${!args.todoId?`?userId=${args.userId}`:args.todoId}`;
  if (url.includes(undefined)) {
    return "";
  }
  return url;
};
const url = createURL();
if (url) {
  nodefetch(url)
    .then((resp) => {
      if (resp.status !== 200) {
        throw new Error(" something is wrong");
      }
      return resp.json();
    })
    .then((respJson) => {
      console.log("json response", respJson);
    });
} else {
  printHelp()
}
