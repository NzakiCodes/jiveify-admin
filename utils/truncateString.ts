const truncateString = (str: any, num: number, repl?: string) => {
  if (str.length > num) {
    let subStr = str.substring(str, num);
    return subStr + (repl ? repl : "...");
  } else {
    return str;
  }
};

export default truncateString;
