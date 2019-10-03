const initial_state={
        userExisted:false,
        userLogin:false,
        username:"",
        unorpw:"",
        token:"",
        admin:false
}

const Reducer=(state=initial_state,action)=>{
    switch(action.type){
        case "userExist":
            return{ ...state,userExisted:action.payload}
        case "userLogin":
            return{...state,userLogin:action.payload,username:""}
        case "unorpw":
               return{...state,unorpw:action.payload}    
        case "token":
            return{...state,token:action.payload}
        case "admin":
            return{...state,admin:action.payload}
        case "loggeduser":
            return{...state,username:action.payload}
        default:
                return state  
    }
    
}

export default Reducer;