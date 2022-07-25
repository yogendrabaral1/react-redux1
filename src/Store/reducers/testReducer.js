import { sortList } from "../../utils";
import uuid from 'react-uuid';

const initialState = {
    friends: [
        {
            id: uuid(),
            name: "Yogendra Baral",
            isFriend: true,
            isFavorite: true,
        },
        {
            id: uuid(),
            name: "Shivangi Sharma",
            isFriend: true,
            isFavorite: false,
        },
        {
            id: uuid(),
            name: "Akash Singh",
            isFriend: true,
            isFavorite: false,
        },
        {
            id: uuid(),
            name: "Rahul Gupta",
            isFriend: true,
            isFavorite: true,
        },
    ]
};

export function TestReducer(state = initialState, action) {
    switch (action.type) {
        case 'makeFavorite':
            var list = state.friends;
            for(let i=0;i<list.length;i++){
                if(list[i].id === action.payload){
                    list[i].isFavorite = !list[i].isFavorite
                }   
            }
            list = sortList(list);
            return {
                ...state,
                friends: [...list],
            };
        case 'delete':
            var list = state.friends;
            for(let i=0;i<list.length;i++){
                if(list[i].id === action.payload.id){
                    list.splice(action.payload, 1);
                }
            }
            return {
                ...state,
                friends: [...list],
            };
        case 'addFriend':
            var list = state.friends;
            let status;
            for(let i=0;i<list.length;i++){
                if(action.payload.toLowerCase() === list[i].name.toLowerCase()){
                    status = true;
                    alert("Friend already in list");
                    break;
                }
            }
            if(!status){
                list = [
                    {
                        id: uuid(),
                        name: action.payload,
                        isFriend: true,
                        isFavorite: false,
                    },
                    ...list
                ]
                // list.push({
                //     name: action.payload,
                //     isFriend: true,
                //     isFavorite: false,
                // });
            }
            return {
                ...state,
                friends: [...list],
            };
        default:
            return state;
    }
}
