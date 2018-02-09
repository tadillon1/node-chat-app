[{
  id: '/#12poiajdasdf',
  name:  'Andrew',
  room: 'The Office Fans'
}]



class Users {
  constructor () {
    this.users = [];  //Initialize the user as an empty array.
  }
  //addUser(id, name, room)
  addUser (id, name, room){
    var user = {id, name, room};  //define an OBJECT with the parameters of the user
    this.users.push(user);  //push the user object into the Users array.
    return user;      //return the user just created and added to the array.
  }

  //removeUser(id) - return the user that was removed
  removeUser (id) {
    var user = this.getUser(id);

    if(user) {
      this.users = this.users.filter((user) => user.id !== id);
    }

    return user;
  }

  //getUser(id)
  getUser (id) {
    return this.users.filter((user) => user.id === id)[0]
  }

  //getUserList(room)
  getUserList (room) {
    var users = this.users.filter((user) => {  //The filter takes a function as an argument passing in each user individually
      return user.room === room;  //retrun TRUE is the passed in user's room is the same as the passed in room
    });                           //If true, then the user is added to the users array.  If FALSE the users will not be added to the list.

    var namesArray = users.map((user) => {  //Convert the array of "users" objects as an array of "strings"
      return user.name;
    });

    return namesArray;
  }

}

module.exports = {Users};











// class Person {
//   constructor (name, age) {  //constructor functions do not have the => arrow and are called automatically when a new instance of the class is called.
//     this.name = name;       //using the keyword "this" creates a new Person's instance and initializes individual instance...
//     this.age = age;
//   }  //no comma
//   getUserDescription() {    //method for accessing class' information.
//     return `${this.name} is ${this.age} year(s) old.`;
//   }
// }
//
// var me = new Person('Andrew', 25);  //create a new instance of the Person class
//
// var description = me.getUserDescription();  //Use the method for getting information out of the class
// console.log(description);
