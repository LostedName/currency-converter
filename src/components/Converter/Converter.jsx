import { currencyValueChangeAction } from '../../redux/store';
import CurrencyField from './CurrencyField/CurrencyField';
import { useHistory } from 'react-router';
import { fetchRates } from './../../asyncAction/newRates';
export default function Converter(props) {
    const history = useHistory();
    const onValueChanged = (code,value)=>{
        
        history.push(`/converter?bank=nbrb&currency=${code}-${+value}`);
      
        props.store.dispatch(currencyValueChangeAction(code,value));
    }
    return (
        <div className="converter_board">
            <div className="header">
                Конвертер валют онлайн
            </div>
            <div className="content">
                <div className="content_header">Конвертер валют</div>
                <div className="converter">
                    <div className="converter_header">
                        <div className="converter_title">
                            По лучшему курсу в Беларуси
                        </div>
                        <div className="converter_bank">
                            <a href="#fff" className="converter_link">
                                Все банки
                            </a>
                        </div>
                    </div>
                    <div className="converter_body">
                        <div className="buttons noselect">
                            <div className="button active left">Банк покупает</div>
                            <div className="button right">Банк продаёт</div>
                        </div>
                        <div className="body_converters">
                            {props.store.getState().currencies.map((cur)=><CurrencyField key={cur.CODE}
                                                                                         currency={cur.CODE} 
                                                                                         currencyRus={cur.RUS_NAME}
                                                                                         value={cur.value}
                                                                                         onValueChanged={onValueChanged}/>)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}