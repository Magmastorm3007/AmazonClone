export const initialState ={
    basket: [],
    user:null
};
const reducer =(state,action)=>{
  console.log(action)
    switch(action.type){
        case 'ADD_TO_BASKET':
           
            return{
                ...state,
                basket:[...state.basket,action.item],
            };
        case 'REMOVE_FROM_BASKET':
            const index=state.basket.findIndex((b)=>b.id===action.id)
            let newb=[...state.basket];
            if(index>=0)
            newb.splice(index,1)
        return {...state,
            basket:newb 
        
        };
        case 'EMPTY_BASKET':
            return{
                ...state,
                basket:[]
            }
        case 'SET_USER':
        return{
            ...state,
            user:action.user
        }
            default:
                return state;
    }

}
export default reducer