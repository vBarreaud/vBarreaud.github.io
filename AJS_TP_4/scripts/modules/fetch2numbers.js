

class Fetch2NumbersRequestError extends Error {
    constructor(message, options) {
      super(message, options);
      this.name = 'Fetch2NumbersRequestError';
    }
  }

class Fetch2NumbersH2G2Error extends Error {
    constructor(message, options) {
      super(message, options);
      this.name = 'Fetch2NumbersH2G2Error';
    }
}


function fetch2numbers(){
    const uri = "https://www.random.org/integers/?num=2&min=-100&max=100&col=2&base=10&format=plain&rnd=new"
    const options = {
        mode:"no-cors"
    }

    return new Promise( (resolve, reject)=>{
        fetch(uri)
            .then(
                (response)=>{
                    if (response.status !== 200) {
                        throw new Fetch2NumbersRequestError(`Looks like there was a problem. Status Code Respons: ${response.status}`);
                    }
                    return response.text();
                })
            .then(
                (text)=>{
                    const temp = text.split("\t");

                    for(const val of temp){
                        if(val==42) throw new Fetch2NumbersH2G2Error(`Don't talk to me about life!`)
                    }
                    
                    return temp;
                }
            )
            .then(resolve)
            .catch(reject);
        })
}


export {Fetch2NumbersRequestError,Fetch2NumbersH2G2Error,fetch2numbers}
