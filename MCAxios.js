function dataTodos (id, userId, todo, completed){
    if(id != "number" ) throw 'data type harus number'
    if(userId != "number" ) throw 'data type harus number'
    if(todo != "string" ) throw 'data type harus string'
    if(completed != "boolean" ) throw 'data type harus boolean' 
    
}

export default dataTodos