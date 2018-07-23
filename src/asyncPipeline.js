const fs = require('fs');

const operations = {
    addFromFile: (input, arg, fn)=> {
      if(typeof input === 'undefined'){
        return fn('input is required');
      }
      fs.readFile(arg, (err, result)=> {
          if(err) {
              fn(err);
          }
          else {
            fn(null, input + result.toString()*1);
          }      
      });
    },
    set: (input, arg, fn) => {
      fn(null, arg*1);
    },
    add: (input, arg, fn)=> {
      if(typeof input === 'undefined'){
        return fn('input is required');
      }
      fn(null, input + arg*1);
    },
    mult: (input, arg, fn)=> {
      if(typeof input === 'undefined'){
        return fn('input is required');
      }
      fn(null, input * arg*1);
    }
  };
  
const pipelineASync = (cmdString, cb) => {
    const parsedCmds = cmdString.split("|").reduce((memo, cmd) => {
                            const parts = cmd.trim().split(" ");
                            memo.push( {
                                operation: operations[parts[0].trim()],
                                input: parts[1].trim()
                            });
                            return memo;
                        }, []);
                    
    const next = (err, result) => {
        if(err) {
            cb(err);
            return;
        }
        if(parsedCmds.length === 0) {
            cb(null, result);
            return;
        }
        const cmd = parsedCmds.shift();
        cmd.operation(result, cmd.input, next);
    }

    next();
}

module.exports = {
    pipelineASync
}