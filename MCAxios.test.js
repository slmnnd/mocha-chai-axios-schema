import axios from "axios";
import * as chai from "chai";
import chaiJsonSchemaAjv from "chai-json-schema-ajv";

chai.use(chaiJsonSchemaAjv)

const {expect} = chai

describe('API Testing', function(){
    const reusable = axios.create({
        baseURL : "https://dummyjson.com"            
    }); 

    describe('Todos API Testing', function(){

        it('Menguji API dengan metode GET', async function (){
            const id = 5;
            const res = await reusable.get(`/todos/${id}`)            
              
            //assert
            expect(res.status).to.equal(200)
        })
    
        it('Menguji API dengan metode POST', async function (){
            const createTodo = {
                todo: "Text dulu",
                completed : false,
                userId : 152
                };
            
            const res = await reusable.post(`/todos/add`, createTodo)
            
            //assert
            expect(res.status).to.equal(200)
            
        })
    
        it('Menguji API dengan metode PUT', async function (){
            const updateTodo = {
                todo : "Text a friend",
                completed : false,
                userId : 152
                };
            
            const id = 1;            
            const res = await reusable.put(`/todos/${id}`, updateTodo)

            //assert
            expect(res.status).to.equal(200)
            
        })
    
        it('Menguji API dengan metode DELETE', async function (){
            const id = 2;    
            const res = await reusable.delete(`/todos/${id}`)

            //assert
            expect(res.status).to.equal(200)
            
        })
    })

    describe('Login API Testing', function(){
        it('Login menggunakan token', async function (){
            reusable.post('/auth/login', {
            username: 'addisonw',
            password: 'addisonwpass'
            })

        .then(res =>{ 
            reusable.get('/auth/me', {
                headers: {
                    authorization : 'Bearer ' + res.data.token
                }

                //assert
            })        
        })
    })
})
     

    

    
})