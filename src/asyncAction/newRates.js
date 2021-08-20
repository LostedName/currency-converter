import { updateCurrencyRatesAction } from "../redux/store";

export const fetchRates = (curs) => {
    return dispatch => {

        const link = `http://localhost:4000/converter?bank=nbrb&currency=USD-1`;
        const currencies = [
        ];
        for (let currency of curs) {
            if (currency.CODE !== "BYN")
                currencies.push({ CODE: currency.CODE });
        }

       fetch(link, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(currencies)
        })
        .then(response=>response.json())
        .then(json => dispatch(updateCurrencyRatesAction(json)));
    }
}