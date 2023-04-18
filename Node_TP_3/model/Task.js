class Task{

  constructor({title = "default title", person = 0}){  
    // discard any passed id : the model decides wich id to use.
    this.id = parseInt(    Math.floor(Math.random() * Math.floor(100000))     );
    this.log = new Array();
    this.log.push({event:"created",date:new Date()});
    this.title=title;
    this.person=person;
  }
  update(dataObject){
    let newTitle, newPerson;
    if(undefined != (newTitle = dataObject.title)){ this.title= newTitle}
    if(undefined != (newPerson = dataObject.person)){ this.person = newPerson}
    this.log.push({event:"updated",date:new Date()});
    return this;
  }
}

module.exports = Task;