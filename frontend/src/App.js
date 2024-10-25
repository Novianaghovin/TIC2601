// App.js  -- function from controller can be all added here to run before ssplitting to neww page
import React from 'react';
import Badge from './controller/badge.js';
import UserForm from './controller/addUser.js';
import UserList from './controller/userList.js';

function App() {
    return (
        <div className="App">
            <h1>My Badges</h1>
            <Badge />
            <UserList />
            <UserForm />
        </div>
    );
}

export default App;
