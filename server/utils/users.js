[{
    id: '/#asdgasdgsdgsdgsd',
    name: 'Andrew',
    room: 'The Office fans'
}]

// adduser(id, name, room)
// removeUser(id)
// getUser(id)
// getUserList(room)

class Users {
    constructor () {
        this.users = [];
    }
    addUser (id, name, room) {
        var user = {id, name, room};
        this.users.push(user); // Add the user to the array
        return user;
    }
    removeUser(id) {
        var user = this.getUser(id);

        if (user) {
            this.users = this.users.filter((user) => user.id !== id);
        }
        return user;
    }
    getUser(id) {
        return this.users.filter((user) => user.id === id)[0];
    }
    getUserList (room) {
        var users = this.users.filter((user) => user.room === room);
        var namesArray = users.map((user) => user.name);

        return namesArray;
    }
}

module.exports = {Users};

// Create a new class
// class Person {
//     constructor (name, age) {  // A constructor gets called by default when an instance of class is created
//         this.name = name;   // This refers to the instance of the class, not the class
//         this.age = age;
//     }
//     getUserDescription () {   // This is a method
//         return `${this.name} is ${this.age} year(s) old.`
//     }
// }

// var me = new Person('Deke', 48);
// var description = me.getUserDescription();
// console.log(description);