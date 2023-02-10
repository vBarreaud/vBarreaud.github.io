class analyticsClass{
	constructor(){
		this._value=1;
	}

	async evaluate(){
		const promise = new Promise((success,reject)=>{
			this._count++;
			setTimeout(()=>{console.log(`value is ${this._value}`)},1000)
		})
		await promise.then(()=>console.log("DONE"));
	}

}

export const analytics = new analyticsClass();