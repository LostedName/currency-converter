import {createStore} from 'redux';

const CURRENCY_VALUE_CHANGE = "CURRENCY_VALUE_CHANGE";
const currencyValueChangeAC = (code,value)=>{
    return {
        type:CURRENCY_VALUE_CHANGE,
        code,
        value
    };
}
const requestToExchange = async (curs,code,value)=>{
    const link = `http://localhost:4000/converter?bank=nbrb&currency=${code}-${+value}`;
       
    const currencies = [
    ];
    for(let currency of curs){
        if (currency.CODE !== "BYN")
        currencies.push({CODE:currency.CODE});
    }
          
        let response = await fetch(link,{
            method:"POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
              },
            body: JSON.stringify(currencies)
        });
        let result = await response.json();
        return result;
}

const createInitialState = ()=>{
    const initialState = {
        currencies:[
        {
            CODE:"USD",
            value:1,
            RUS_NAME:"доллар США",
            exchangeRateToUSD:1,
        },
        {
            CODE:"EUR",
            value:1,
            RUS_NAME:"евро",
            exchangeRateToUSD:0.853,
        },
        {
            CODE:"BYN",
            value:1,
            RUS_NAME:"белорусский рубль",
            exchangeRateToUSD:2.5068,
        },
        {
            CODE:"RUB",
            value:1,
            RUS_NAME:"российский рубль",
            exchangeRateToUSD:73.4766,
        },
        {
            CODE:"PLN",
            value:1,
            RUS_NAME:"польский злотый",
            exchangeRateToUSD:3.8942,
        },
        {
            CODE:"UAH",
            value:1,
            RUS_NAME:"украинская гривна",
            exchangeRateToUSD:26.6412,
        },
        ],
       
    };
    return initialState;
}


const reducer = (state = createInitialState(),action)=>{

    switch(action.type){
        case CURRENCY_VALUE_CHANGE:
        //количество денег каждой валюты    
        let curRates = requestToExchange([...state.currencies],action.code,action.value);
            curRates.then((res)=>{
                let curs = res.result;
                for(let cur in curs){
                    
                }
            });
        //все валюты
            let currencies = [...state.currencies];
            //index валюты чьё value изменился
            let index = currencies.findIndex((item)=>item.CODE === action.code);
            //меняем value нужной валюты
            currencies[index].value = +action.value;
            //Количество доллара
            const countUSD = action.value / currencies[index].exchangeRateToUSD;
            //пересчитываем все валюты исходя из доллара
            currencies.forEach((cur,curIndex)=>{
                if (curIndex !== index)
                cur.value = +((countUSD * cur.exchangeRateToUSD).toFixed(4));
            });
            



            return {...state,currencies:currencies};
        default:
            return state;
    }

};
const store = createStore(reducer);
export {currencyValueChangeAC};
export default store;