const operations = {
    set: (input, arg )=> {
      return arg*1;
    },
    add: (input, arg)=> {
      //we need to add to something
      if(typeof input === 'undefined'){
        throw 'input required';
      }
      return input + arg*1;
    },
    mult: (input, arg)=> {
      //we need to multiply by something
      if(typeof input === 'undefined'){
        throw 'input required';
      }
      return input * arg*1;
    }
  };
  
  const pipelineSync = (command) => {
    const cmds = command.split("|");
    const result = cmds.reduce( (result, cmd) => {
        const cmdArr = cmd.trim().split(" ");
        const fn = operations[cmdArr[0]];
        result = fn(result, cmdArr[1]);
        return result;
    } , 0);
    return result;
}

module.exports = {
    pipelineSync
}

