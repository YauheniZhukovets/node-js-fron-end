import React, {useEffect, useRef, useState} from 'react';
import './App.css';
import axios from 'axios';

const baseURL = 'https://users-nodejs-back-end.herokuapp.com/'

function App() {
    const [users, setUsers] = useState<Array<{ _id: string, name: string, banned: boolean }>>([])
    let userNameRef = useRef<HTMLInputElement | null>(null)


    const getUsers = () => {
        axios.get(baseURL + 'users/' + window.location.search)
            .then((res) => {
                setUsers(res.data)
            })
    }

    const createUser = () => {
        axios.post(baseURL + 'users/', {
            name: userNameRef.current?.value,
            banned: false
        })
            .then(res => {
                    console.log(res.data)
                    getUsers()
                }
            )
        userNameRef.current!.value = '';
    }

    const deleteUser = (userId: string) => {
        axios.delete(baseURL + `users/${userId}`)
            .then(res => {
                    console.log(res.data)
                    getUsers()
                }
            )
    }

    const updateUser = (userId: string, name: string, banned: boolean) => {
        axios.put(baseURL + `users/`, {userId, name, banned})
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
            <div style={{margin: '10px'}}>
                {users.map(u => {
                    return (
                        <div key={u._id}
                             style={{margin: '10px'}}>
                            <span> Name: </span>
                            <input
                                defaultValue={u.name}
                                onBlur={(e) => updateUser(u._id, e.currentTarget.value, u.banned)}>
                            </input>
                            <span> Banned: </span>
                            <input type={'checkbox'}
                                   onChange={(event) => updateUser(u._id, u.name, event.currentTarget.checked)}
                                   checked={u.banned}
                            />
                            <button onClick={() => deleteUser(u._id)}>X</button>
                        </div>
                    )
                })
                }
            </div>
            <div style={{margin: '20px'}}>
                <input type="text" ref={userNameRef}/>
                <button onClick={createUser}>Add user</button>
            </div>
        </div>
    );
}

export default App;
