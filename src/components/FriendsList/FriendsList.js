import React, { useEffect, useState } from 'react';
import { PaginatedList } from 'react-paginated-list';

import {store} from "../../Store/store";
import { sortList } from '../../utils';

import "./FriendsList.css";

function FriendsList() {
    const [lists, setLists] = useState([]);
    const [inputVal, setInputVal] = useState('');

    const handleFavorite = (item) => {
        store.dispatch({
            type: "makeFavorite",
            payload: item
        });
    }

    const handleDelete = (item, id) => {
        if (window.confirm("Do you want to Delete?") == true) {
            store.dispatch({
                type: "delete",
                payload: {
                    item: item,
                    id: id
                }
            })
        }
    }

    const handleInputChange = (e) => {
        if(e.keyCode === 13){
            setInputVal('');
            store.dispatch({
                type: "addFriend",
                payload: e.target.value
            });
        }
        else {
            var result = store.getState();
            result = result.friends;
            if(e.target.value !== '' ){
                result = result.filter(item => item.name.toLowerCase().includes(e.target.value.toLowerCase()));
            }
            setLists(result);
        }
    }

    const updateState = () => {
        const state = store.getState();
        var items = sortList(state.friends);
        setLists(items);
    }

    useEffect(() => {
        updateState();
        store.subscribe(updateState);
    }, []);

    return (
        <div className='friendsListWrapper'>
            <p className='heading'>Friends List</p>
            <input type="text" placeholder='Enter your friends name' value={inputVal} onChange={(e) => setInputVal(e.target.value)} onKeyUp={(e) => handleInputChange(e)} />
            {/* {
                lists && lists.length > 0 &&
                <ul className='listItems'>
                    {
                        lists.map((item, index) => (
                            <li key={index}>
                                <p>
                                    <span>{item.name}</span>
                                    <span className='isFriendText'>{item.isFriend ? "is your friend" : "is not your friend"}</span>
                                </p>
                                <span className='favoriteStar' onClick={() => handleFavorite(index)}>
                                    <i className={`${item.isFavorite ? 'fa-solid favorite' : 'fa-regular'} fa-star`}></i>
                                </span>
                                <span className='deleteIcon' onClick={() => handleDelete(index)}>
                                    <i className="fa fa-trash" aria-hidden="true"></i>
                                </span>
                            </li>
                        ))
                    }
                </ul>
            } */}
            <PaginatedList
                list={lists}
                itemsPerPage={4}
                renderList={(lists) => (
                    <ul className='listItems'>
                        {
                            lists.map((item, index) => (
                                <li key={index} id={item.id}>
                                    <p>
                                        <span>{item.name}</span>
                                        <span className='isFriendText'>{item.isFriend ? "is your friend" : "is not your friend"}</span>
                                    </p>
                                    <span className='favoriteStar' onClick={() => handleFavorite(item.id)}>
                                        <i className={`${item.isFavorite ? 'fa-solid favorite' : 'fa-regular'} fa-star`}></i>
                                    </span>
                                    <span className='deleteIcon' onClick={() => handleDelete(index, item.id)}>
                                        <i className="fa fa-trash" aria-hidden="true"></i>
                                    </span>
                                </li>
                            ))
                        }
                    </ul>
                )}
            />
        </div>
    )
}

export default FriendsList
