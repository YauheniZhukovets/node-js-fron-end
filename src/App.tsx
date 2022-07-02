import React, {useEffect, useState} from 'react';
import './App.css';
import axios from 'axios';


function App() {
    const [users, setUsers] = useState<Array<{ id: number | string, name: string, banned: boolean }>>([])

    const getUsers = () => {
        axios.get('http://localhost:5000/users')
            .then((res) => {
                setUsers(res.data)
            })
    }

    const onClickHandler = () => {
        axios.post('http://localhost:5000/users',)
            .then(res => {
                    console.log(res.data)
                    getUsers()
                }
            )
    }

    const onChangeHandler = (userId: number | string) => {
        axios.put('http://localhost:5000/users', {userId})
            .then(res => {
                console.log(res.data)
                getUsers()
            })
    }

    useEffect(() => {
        getUsers()
    }, [])

    return (
        <div style={{display: 'flex'}}>
            <div>
                {users.map(u =>
                    <div key={u.id}>Name: {u.name}, Banned: <input type={'checkbox'}
                                                                   onChange={() => onChangeHandler(u.id)}
                                                                   checked={u.banned}/>
                    </div>)
                }
            </div>
            <div>
                <button onClick={onClickHandler}>Add user</button>
            </div>
        </div>
    );
}

export default App;
