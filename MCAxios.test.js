import axios from "axios";
import * as chai from "chai";
import chaiJsonSchemaAjv from "chai-json-schema-ajv";

chai.use(chaiJsonSchemaAjv)

const {expect} = chai;

const reusable = axios.create({
    baseURL : "https://dummyjson.com"            
});

const schemaTodos = {
    type : 'object',
    properties:{
        id : {type : 'number'},
        userId : {type : 'number'},
        todo : {type : 'string', "minLength": 1, "maxLength": 1000},
        completed : {type : 'boolean'},
    }
}

const schemaLogin = {
    type : 'object',
    properties:{
        id : {type : 'number'},
        username : {type : 'string'},
        password : {type : 'string'},
        token : {type : 'string'},

    }
};


describe('API Testing', function(){    
    describe('Todos API Testing', function(){     
        it('Menguji API dengan metode GET', async function (){
            const id = 5;
            const res = await reusable.get(`/todos/${id}`)            
              
            //assert
            expect(res.status).to.equal(200)
            expect(res.data).to.be.jsonSchema(schemaTodos)
        })
    
        //positive test case
        it('Menguji API dengan metode POST dengan tipe data yang benar', async function (){
            const createTodo = {
                todo: "Text dulu",
                completed : false,
                userId : 152
                };
            
            const res = await reusable.post(`/todos/add`, createTodo)
            
            //assert
            expect(res.status).to.equal(201)
            expect(res.data).to.be.jsonSchema(schemaTodos)
            
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
            expect(res.data).to.be.jsonSchema(schemaTodos)
            
        })
    
        it('Menguji API dengan metode DELETE', async function (){
            const id = 2;    
            const res = await reusable.delete(`/todos/${id}`)

            //assert
            expect(res.status).to.equal(200)
            expect(res.data.isDeleted).to.equal(true)
            expect(res.data).to.be.jsonSchema(schemaTodos)
            
        })
    })

    describe('Login API Testing', function(){        
        it('Login menggunakan token', async function (){
            const res = await reusable.post('/auth/login', {
            username: 'addisonw',
            password: 'addisonwpass'
            })
        
            const login = await reusable.get('/auth/me', {
                headers: {
                    authorization : 'Bearer ' + res.data.token
                }                                 
            })   

        //assert
        expect(login.status).to.equal(200)
        expect(res.data).to.be.jsonSchema(schemaLogin)
    })
})
     

    

    
})