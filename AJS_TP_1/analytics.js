class counterClass{
	constructor(){
		this._counter=0;
	}

	async count(){
		const promise = new Promise((success,reject)=>{
			this._count++;
			setTimeout(()=>{console.log(`count is ${this._count}`)},1000)
		})
		await promise.then(()=>console.log("DONE"));
	}

}

export const counter = new counterClass();