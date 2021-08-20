import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk'
const CURRENCY_VALUE_CHANGE = "CURRENCY_VALUE_CHANGE";
const UPDATE_CURRENCY_RATES = "UPDATE_CURRENCY_RATES";
const currencyValueChangeAction = (code, value) => {
    return {
        type: CURRENCY_VALUE_CHANGE,
        code,
        value
    };
}
const updateCurrencyRatesAction = ({ result }) => {
    return {
        type: UPDATE_CURRENCY_RATES,
        currencies: result
    }
};

const createInitialState = () => {
    const initialState = {
        currencies: [
            {
                CODE: "USD",
                value: 1,
                RUS_NAME: "доллар США",
                RATE: 1,
            },
            {
                CODE: "EUR",
                value: 1,
                RUS_NAME: "евро",
                RATE: 0.853,
            },
            {
                CODE: "BYN",
                value: 1,
                RUS_NAME: "белорусский рубль",
                RATE: 2.5068,
            },
            {
                CODE: "RUB",
                value: 1,
                RUS_NAME: "российский рубль",
                RATE: 73.4766,
            },
            {
                CODE: "PLN",
                value: 1,
                RUS_NAME: "польский злотый",
                RATE: 3.8942,
            },
            {
                CODE: "UAH",
                value: 1,
                RUS_NAME: "украинская гривна",
                RATE: 26.6412,
            },
        ],

    };
    return initialState;
}


const reducer = (state = createInitialState(), action) => {

    switch (action.type) {
        case CURRENCY_VALUE_CHANGE:
            //все валюты
            let currencies = [...state.currencies];
            //index валюты чьё value изменился
            let index = currencies.findIndex((item) => item.CODE === action.code);
            //меняем value нужной валюты
            currencies[index].value = action.value;
            //Количество доллара
            const countBYN = action.value / currencies[index].RATE;
            //пересчитываем все валюты исходя из доллара
            currencies.forEach((cur, curIndex) => {
                if (curIndex !== index)
                    cur.value = +((countBYN * cur.RATE).toFixed(4));
            });
            return { ...state, currencies: currencies };

            case UPDATE_CURRENCY_RATES:
            let curs = [...action.currencies];
            let stateCurrencies = [...state.currencies];
            let newCurrencies = curs.map((cur) => {
                return {
                    CODE: cur.CODE,
                    RATE: 1 / (cur.Cur_OfficialRate / cur.Cur_Scale)
                }
            });
            console.log(newCurrencies);
            for (let cur of newCurrencies) {
                let index = stateCurrencies.findIndex((currency) => currency.CODE === cur.CODE);
                if (index !== -1)
                    stateCurrencies[index].RATE = cur.RATE;
            }
            let indexBYN = stateCurrencies.findIndex((currency) => currency.CODE === "BYN");
            stateCurrencies[indexBYN].RATE = 1;
            console.log(stateCurrencies);

            //Подставляем данные под новые курсы валют
            let indexUSD = stateCurrencies.findIndex((item) => item.CODE === "USD");
            stateCurrencies[indexUSD].value = 1;
            const countOfBYN = 1 / stateCurrencies[indexUSD].RATE;
            stateCurrencies.forEach((cur, curIndex) => {
                if (curIndex !== indexUSD)
                {
                    cur.value = +((countOfBYN * cur.RATE).toFixed(4));
                }
            });

            return { ...state, currencies: stateCurrencies };
        default:
            return state;
    }

};
const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));
export { currencyValueChangeAction, updateCurrencyRatesAction };
export default store;