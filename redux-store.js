//Action creators
//person who is submitting the form
const newBooking = (name,amount) =>{
    return {
        type:"NEW_BOOKING",
        payload:{
            name,
            amount,
        },
    };
};

const cancelBooking = (name,refundAmount) =>{
    return {
        type:"CANCEL_BOOKING",
        payload:{
            name,
            refundAmount,
        },
    };
};
//Reducers
const reservationHistory = (oldReservationList = [],action)=>{
    if (action.type === "NEW_BOOKING"){
        return [...oldReservationList,action.payload];
    }else if (action.type === "CANCEL_BOOKING"){
        return oldReservationList.filter((record)=>{
            return record.name !== action.payload.name;
        });
    }
    return oldReservationList;
};

const cancellationHistory = (oldCancellationList = [],action)=>{
    if (action.type === "CANCEL_BOOKING"){
        return [...oldCancellationList,action.payload];
    }
    return oldCancellationList
}

const accounting = (totalMoney = 100,action)=>{
    if(action.type === "NEW_BOOKING"){
        return totalMoney + action.payload.amount;
    }else if(action.type === "CANCEL_BOOKING"){
        return totalMoney - action.payload.refundAmount;
    }
    return totalMoney;
}


//Redux store
const Redux = require('redux');
console.log(Redux);
const {createStore,combineReducers} = Redux;
//combining all the reducers together
const railwayCentreStore = combineReducers({
    accounting: accounting,
    reservationHistory: reservationHistory,
    cancellationHistory: cancellationHistory
});
//creating a store
const store = createStore(railwayCentreStore);
//need to dispatch the actions to the reducers
const action = newBooking("AMAL",20);
store.dispatch(action);
store.dispatch(newBooking("AML",20));
store.dispatch(newBooking("sagar",60));
store.dispatch(cancelBooking("AMAL",10));

//to log these result in console
console.log(store.getState());
