import React from 'react';
import './Subtotal.css'
import CurrencyFormat from 'react-currency-format';
import { useStateValue } from './StateProvider';
import { getBasketTotal } from '../reducer/Reducer';
import { useHistory } from 'react-router-dom';

function Subtotal() {
    const [{basket, dispatch}] =useStateValue();
    const history = useHistory();
    return (
        <div className='subtotal'>
            <CurrencyFormat renderText={(value)=>(
                <>
                <p>
                    총액 ({basket.length} item) : <strong>{value} 원</strong>
                </p>
                    <small className='subtotal_gift'>
                        <input type="Checkbox"/>체크박스입니다.
                    </small>
                </>
    )}

            decimalScale={2}
            value={getBasketTotal(basket)}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"₩"}
            />
            <button onClick={e=>history.push('/payment')}>결제하러 가기</button>
        </div>
    );
}

export default Subtotal;