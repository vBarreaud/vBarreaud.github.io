class Person{

  constructor({name = "default name", firstName = "default firstname", email="default email"}){  
    // discard any passed id : the model decides wich id to use.
    this.id = parseInt(    Math.floor(Math.random() * Math.floor(100000))     );
    this.log = new Array();
    this.log.push({event:"created",date:new Date()});
    this.name=name;
    this.firstName=firstName;
    this.email=email;
  }
  update(dataObject){
    let newName, newFirstName,newEmail;
    if(undefined != (newName = dataObject.name)){ this.name= newName}
    if(undefined != (newFirstName = dataObject.firstName)){ this.firstName= newFirstName}
    if(undefined != (newEmail = dataObject.email)){ this.email= newEmail}
    this.log.push({event:"updated",date:new Date()});
    return this;
  }
}

module.exports = Person;