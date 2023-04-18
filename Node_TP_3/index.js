const express = require('express');
const bodyParser = require('body-parser');

const TaskService = require('./model/TaskService_ArrayImpl.js');
const PersonService = require('./model/PersonService_ArrayImpl.js');

let taskServiceInstance;
let personServiceInstance;

const app = express()
const port = 3001

app.use(bodyParser.json()) 
app.use(bodyParser.urlencoded({ extended: true })) 

//End point to get all the persons
app.get('/Persons', (req, res)=>{
	try{
		let myArrayOfPersons;
		if( undefined == (myArrayOfPersons = personServiceInstance.getPersons() )){
			throw new Error("No tasks to get");
		}
		res.status(200).json(myArrayOfPersons);
	}
	catch(err){
		console.log(`Error ${err} thrown`);
		res.status(404).send('NOT FOUND');
	}
});

//End point to get a person
app.get('/Persons/:id', (req, res)=>{
	let id = req.params.id;
	if(!isInt(id)) {
		//not the expected parameter
		res.status(400).send('BAD REQUEST');
	}else{
		try{
			let myPerson = personServiceInstance.getPerson(id);
			res.status(200).json(myPerson);
		}
		catch(err){
			console.log(`Error ${err} thrown`);
			res.status(404).send('NOT FOUND');
		}
	}
});

//End point to delete a person
app.delete('/Persons/:id', async (req, res)=>{
	let id = req.params.id;
	if(!isInt(id)) {
		//not the expected parameter
		res.status(400).send('BAD REQUEST');
	}else{
		try{
			personServiceInstance.removePerson(id);
			res.status(200).send(`Successfully removed task ${id}`);
		}
		catch(err){
			console.log(`Error ${err} thrown`);
			res.status(404).send('NOT FOUND');
		}
	}
});


app.put('/Persons/:id', async (req, res)=>{
	let id = req.params.id;
	if(!isInt(id)) {
		//not the expected parameter
		res.status(400).send('BAD REQUEST');
	}else{
		try{
			let myPerson = personServiceInstance.updatePerson(id,req.body);
			res.status(200).json(myPerson);
		}
		catch(err){
			console.log(`Error ${err} thrown`);
			res.status(404).send('NOT FOUND');
		}
	}
});


//End point to get all the tasks
app.get('/Tasks', (req, res)=>{
	try{
		let myArrayOfTasks;
		if( undefined == (myArrayOfTasks = taskServiceInstance.getTasks() )){
			throw new Error("No tasks to get");
		}
		res.status(200).json(myArrayOfTasks);
	}
	catch(err){
		console.log(`Error ${err} thrown`);
		res.status(404).send('NOT FOUND');
	}
});

//End point to get a task
app.get('/Tasks/:id', (req, res)=>{
	let id = req.params.id;
	if(!isInt(id)) {
		//not the expected parameter
		res.status(400).send('BAD REQUEST');
	}else{
		try{
			let myTask = taskServiceInstance.getTask(id);
			res.status(200).json(myTask);
		}
		catch(err){
			console.log(`Error ${err} thrown`);
			res.status(404).send('NOT FOUND');
		}
	}
});

//End point to delete a task
app.delete('/Tasks/:id', async (req, res)=>{
	let id = req.params.id;
	if(!isInt(id)) {
		//not the expected parameter
		res.status(400).send('BAD REQUEST');
	}else{
		try{
			taskServiceInstance.removeTask(id);
			res.status(200).send(`Successfully removed task ${id}`);
		}
		catch(err){
			console.log(`Error ${err} thrown`);
			res.status(404).send('NOT FOUND');
		}
	}
});


app.put('/Tasks/:id', async (req, res)=>{
	let id = req.params.id;
	if(!isInt(id)) {
		//not the expected parameter
		res.status(400).send('BAD REQUEST');
	}else{
		try{
			let myTask = taskServiceInstance.updateTask(id,req.body);
			res.status(200).json(myTask);
		}
		catch(err){
			console.log(`Error ${err} thrown`);
			res.status(404).send('NOT FOUND');
		}
	}
});




let Promise1 = TaskService.create()
	.then(ts=>{
		taskServiceInstance=ts;
		taskServiceInstance.addTask({title:"chercher du pain"});
		taskServiceInstance.addTask({title:"promener le chien"});
		taskServiceInstance.addTask({title:"prendre du lait"});
	})
let Promise2 = PersonService.create()
	.then(ps=>{
		personServiceInstance=ps;
		personServiceInstance.addPerson({name:"Dalton",firstName:"Joe",email:"joe@dalton.com"});
		personServiceInstance.addPerson({name:"Dalton",firstName:"Jack",email:"jack@dalton.com"});
		personServiceInstance.addPerson({name:"Dalton",firstName:"William",email:"william@dalton.com"});
		personServiceInstance.addPerson({name:"Dalton",firstName:"Avrell",email:"avrell@dalton.com"});
	})


	Promise.all([Promise1,Promise2]).then(()=>{
		app.listen(port, () => {
  		console.log(`Example app listening at http://localhost:${port}`)
		});
	});


function isInt(value) {
  let x = parseFloat(value);
  return !isNaN(value) && (x | 0) === x;
}

