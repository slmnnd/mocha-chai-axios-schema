import axios from "axios";

const reusable = axios.create({
    baseURL : "https://dummyjson.com"            
});   

//get
function getTodos(){

    const id = 5;
reusable
.get(`/todos/${id}`)
.then(({data}) => {
    console.log('berhasil GET!', data);
})
.catch((err) => { 
    console.log('error heh ', err);
})
.finally (() => {
console.log('selesai.');
})
}        

//delete
function deleteTodos(){

    const id = 2;
    
    reusable
.delete(`/todos/${id}`)
.then(({data}) => {
    console.log('berhasil DELETE!', data);
})
.catch((err) => { 
    console.log('error heh ', err);
})
.finally (() => {
console.log('selesai.');
})
}

//put
function updateTodos(){
    const updateTodo = {
    todo : "Text a friend",
    completed : false,
    userId : 152
    };

    const id = 1;

reusable
.put(`/todos/${id}`, updateTodo)
.then(({data}) => {
    console.log('berhasil PUT!', data);
})
.catch((err) => { 
    console.log('error heh ', err);
})
.finally (() => {
console.log('selesai.');
})

}

//create
function createTodos(){
    const createTodo = {
    todo: "Text dulu",
    completed : false,
    userId : 152
    };

    reusable
.post(`/todos/add`, createTodo)
.then(({data}) => {
    console.log('berhasil POST!', data);
})
.catch((err) => { 
    console.log('error heh ', err);
})
.finally (() => {
console.log('selesai.');
})

}

//auth login
function authLogin(){
    const userLogin = {
    username: "addisonw",
    password : "addisonwpass",
    };

    reusable
.post(`/auth/login`, userLogin)
.then(({data}) => {
    console.log('berhasil Login!', data);
})
.catch((err) => { 
    console.log('error heh ', err);
})
.finally (() => {
console.log('selesai.');
})

}

//token
function token (){
    axios.post('https://dummyjson.com/auth/login',{
    username: 'addisonw',
    password: 'addisonwpass'
})
.then(res =>{ 
    axios.get('https://dummyjson.com/auth/me', {
        headers: {
            authorization : 'Bearer ' + res.data.token
        }
    })
.then(({data}) => {
    console.log('berhasil Login pakai token!', data);
})
.catch((err) => { 
    console.log('error heh ', err);
})
.finally (() => {
console.log('selesai.');
})
})
}

getTodos();
createTodos();
updateTodos();
deleteTodos();
authLogin();
token();