import create from 'zustand'
import {persist} from 'zustand/middleware';
import axios from 'axios';
import { auth } from '../utils/firebase';


const authStore = (set) => ({
    userProfile: null,
    currentPost: null,
    allUsers: null,
    addUser: (user) => set({userProfile: user}),
    deleteUser: () => set({userProfile: null}),
    setPost: (post) => set({currentPost: post}),
    fetchAllUsers: async () => {
        const data = await axios.get(`${process.env.base_url}api/users`)
        if (data) {
            set({allUsers: data.data})
        }
    }
})
const useAuthStore = create(
    persist(authStore, {
        name: 'auth',
    })
)
export default useAuthStore
// const useStore = create(set => ({
//   count: 1,
//   inc: () => set(state => ({ count: state.count + 1 })),
// }))

// function Controls() {
//   const inc = useStore(state => state.inc)
//   return <button onClick={inc}>one up</button>
// }

// function Counter() {
//   const count = useStore(state => state.count)
//   return <h1>{count}</h1>  
// }