const Person = require('./Person.js');


class PersonService{

	constructor(data){ 
		this.array = new Array();
		this.db = {};
	}

	static async create(){ 
		return new PersonService();
	}

	addPerson(dataObject){
  		let newPerson;
  		if(undefined !== (newPerson = new Person(dataObject))){
			this.array.push(newPerson);
			return newPerson;
		}
		throw new Error("cannot create Person");
	}

	updatePerson(id, dataObject){
		let index = this.array.findIndex(e=> e.id == id);
		if(index >-1 ){
			let updatedPerson = ((this.array)[index]).update(dataObject)
			return  updatedPerson;
		}
		throw new Error(`cannot update task id ${id}`);
	}

	removePerson(id){
		let index = this.array.findIndex(e=> e.id == id);
		if(index >-1 ){
			this.array.splice(index,1);
			return `removed task of id ${id}`;
		}
		throw new Error(`cannot find task of id ${id}`);
		
	}

	getPerson(id){
		let index = this.array.findIndex(e=> e.id == id);
		if(index >-1 ){
			return  (this.array)[index];
		}
		throw new Error(`cannot find task of id ${id}`);	
	}

	getPersons(){
		return this.array;
	}

}

module.exports = PersonService;