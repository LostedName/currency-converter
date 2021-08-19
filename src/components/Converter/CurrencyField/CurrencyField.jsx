import React from "react"
export default function CurrencyField(props){
    const inputElement = React.createRef();
    const onValueChanged = ()=>{
        const value = inputElement.current.value;
        console.log(+value);
        if (+value || +value === 0)
        {
            props.onValueChanged(props.currency,value);
        }
    }
    return (
        <div className="single_converter">
                        <div className="currency">
                            {props.currency}
                        </div>
                        <input type="text" ref={inputElement} onChange={onValueChanged} value={props.value}/>
                        <div className="currency_name">
                            {props.currencyRus}
                        </div>
                    </div>
    );

}