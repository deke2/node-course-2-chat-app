const expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {

    beforeEach( () => {
        users = new Users();
        users.users = [{
            id: '1',
            name: 'Deke',
            room: 'Node Course'
        },{
            id: '2',
            name: 'Zeke',
            room: 'React Course'
        },{
            id: '3',
            name: 'Milo',
            room: 'Node Course'
        }]
    });

    it('Should add a new user', () => {
        var users = new Users();
        var user = {
            id: '1234',
            name: 'Deke',
            room: 'The Office Fans'
        };
        var resUser = users.addUser(user.id, user.name, user.room);

        expect(users.users).toEqual([user]);
    });

    it('Should return names for Node Course', () => {
        var userList = users.getUserList('Node Course');
        expect(userList).toEqual(['Deke', 'Milo']);
    });

    it('Should return names for the React Course', () => {
        var userList = users.getUserList('React Course');
        expect(userList).toEqual(['Zeke']);
    });

    it('Should remove a user', () => {
        var userId = '1';
        var user = users.removeUser(userId);

        expect(user.id).toBe(userId);
        expect(users.users.length).toBe(2);
    });

    it('Should not remove user', () => {
        var userId = '99';
        var user = users.removeUser(userId);

        expect(user).toNotExist();
        expect(users.users.length).toBe(3);
    });

    it('Should find user', () => {
        var userId = '1';
        var user = users.getUser(userId);

        expect(user.id).toBe(userId);
    });

    it('Should not find user', () => {
        var userId = '55';
        var user = users.getUser(userId);

        expect(user).toNotExist();
    });

});