onmessage = function(e) {
    console.log('Worker: Message received from main script');
    const result = e.data[0] * e.data[1];
    if (isNaN(result)) {
      postMessage({error:'OUCH! Write 2 numbers, FGS!'});
    } else {
      const workerResult = 'Donne: ' + result;
      console.log('Worker: Posting message back to main script');
      postMessage(workerResult);
    }
  }

  