const Task = require('./Task.js');


class TaskService{

	constructor(data){ 
		this.array = new Array();
		this.db = {};
	}

	static async create(){ 
		return new TaskService();
	}

	addTask(dataObject){
  		let newTask;
  		if(undefined !== (newTask = new Task(dataObject))){
			this.array.push(newTask);
			return newTask;
		}
		throw new Error("cannot create Task");
	}

	updateTask(id, dataObject){
		let index = this.array.findIndex(e=> e.id == id);
		if(index >-1 ){
			let updatedTask = ((this.array)[index]).update(dataObject)
			return  updatedTask;
		}
		throw new Error(`cannot update task id ${id}`);
	}

	removeTask(id){
		let index = this.array.findIndex(e=> e.id == id);
		if(index >-1 ){
			this.array.splice(index,1);
			return `removed task of id ${id}`;
		}
		throw new Error(`cannot find task of id ${id}`);
		
	}

	getTask(id){
		let index = this.array.findIndex(e=> e.id == id);
		if(index >-1 ){
			return  (this.array)[index];
		}
		throw new Error(`cannot find task of id ${id}`);	
	}

	getTasks(){
		return this.array;
	}

}

module.exports = TaskService;