import React, {useEffect, useRef, useState} from 'react';
import './App.css';
import axios from 'axios';


function App() {
    const [users, setUsers] = useState<Array<{ id: number | string, name: string, banned: boolean }>>([])
    const userNameRef = useRef<HTMLInputElement | null>(null)
    const userBannedRef = useRef<HTMLInputElement | null>(null)

    const getUsers = () => {
        axios.get('http://localhost:5000/users')
            .then((res) => {
                setUsers(res.data)
            })
    }

    const onClickHandler = () => {
        axios.post('http://localhost:5000/users', {
            name: userNameRef.current?.value,
            banned: userBannedRef.current?.checked
        })
            .then(res => {
                    console.log(res.data)
                    getUsers()
                }
            )
    }

    useEffect(() => {
        getUsers()
    }, [])

    return (
        <div style={{display: 'flex'}}>
            <div>
                {users.map(u =>
                    <div key={u.id}>Name: {u.name}, Banned: <input type={'checkbox'}
                                                                   checked={u.banned}/>
                    </div>)
                }
            </div>
            <div>
                <input type="text" ref={userNameRef}/>
                <input type={'checkbox'} ref={userBannedRef}/>
                <button onClick={onClickHandler}>Add user</button>
            </div>
        </div>
    );
}

export default App;
