import React, {useEffect, useRef, useState} from 'react';
import './App.css';
import axios from 'axios';


function App() {
    const [users, setUsers] = useState<Array<{ _id: string, name: string, banned: boolean }>>([])
    let userNameRef = useRef<HTMLInputElement | null>(null)
    let userBannedRef = useRef<HTMLInputElement | null>(null)



    const getUsers = () => {
        axios.get('http://localhost:5000/users/' + window.location.search )
            .then((res) => {
                setUsers(res.data)

            })
    }

    const createUser = () => {
        axios.post('http://localhost:5000/users/', {
            name: userNameRef.current?.value,
            banned: userBannedRef.current?.checked
        })
            .then(res => {
                    console.log(res.data)
                    getUsers()
                }
            )
        userBannedRef.current!.checked = false
        userNameRef.current!.value = '';
    }

    const deleteUser = (userId: string) => {
        axios.delete(`http://localhost:5000/users/${userId}`)
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
                    <div key={u._id}>Name: {u.name},
                        Banned: <input type={'checkbox'} checked={u.banned}/>
                        <button onClick={() => deleteUser(u._id)}>X</button>
                    </div>)
                }
            </div>
            <div>
                <input type="text" ref={userNameRef}/>
                <input type={'checkbox'} ref={userBannedRef}/>
                <button onClick={createUser}>Add user</button>
            </div>
        </div>
    );
}

export default App;
