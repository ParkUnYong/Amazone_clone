import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './Payment.css';
import { useStateValue } from '../component/StateProvider';
import CheckoutProduce from '../component/CheckoutProduce';
import CurrencyFormat from 'react-currency-format';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { getBasketTotal } from '../reducer/Reducer';
import axios from '../utils/axios';
import { db } from '../utils/firebase';

function Payment() {
    const [{basket,user},dispatch] = useStateValue();
    const history = useHistory();
    const [error,setError] = useState(null);
    const [disable,setDisable] = useState(true);
    const [processing,setProcessing] =useState();
    const [succeeded,setSucceeded] = useState(false);

    const [clientSecret, SetClientSecret] = useState(true);

    const stripe = useStripe();
    const elements = useElements();



    useEffect(()=>{
        const getClientSecret = async()=>{
            const res = await axios ({
                method : 'post',
                url :  "/payments/create?total=" + getBasketTotal(basket) * 100
                /* "payments/create?total=" + getBasketTotal(basket) * 100 
                   "/payments/create?total=" + `${getBasketTotal(basket)*100}`
                */
            })
            SetClientSecret(res.data.clientSecret)
        }
        getClientSecret();
    }, [basket])

    console.log(clientSecret)


    const hendleSubmit = async(event) => {
        event.preventDefault();
        setProcessing(true);

        const payload = await stripe.confirmCardPayment(clientSecret,{
            payment_method : {
                card : elements.getElement(CardElement)
            }
        }).then(({paymentIntent})=>{

            db
                .collection('users')
                .doc(user?.uid)
                .collection('orders')
                .doc(paymentIntent.id)
                .set({
                    basket:basket,
                    amount:paymentIntent.amount,
                    created:paymentIntent.created,
                })


                setSucceeded(true);
                setError(null);
                setProcessing("");

                dispatch({
                    type:'EMPTY_BASKET'
                })

                

                history.replace('/orders')
            }
        )
    }

    const handleChange = event => {
        setDisable(event.empty);
        setError(event.error ? event.error.message:"");
    }



    return (
        <div className='payment'>
            <div className='pament_container'>
                <Link to="/checkout" className='checkoutlink'>
                    <h1>장바구니로 돌아가기 ({basket.length} 개의 상품목록이 존재합니다.)</h1>
                </Link>

                <div className='payment_section'>
                    <div className='payment_title'>
                        <h3>배달 받을 곳</h3>
                    </div>

                    <div className='payment_address'>
                        <p>{user?.email} 님의 주소 </p>
                        <p>중랑구</p>
                        <p>상봉</p>
                    </div>

                </div>

            </div>

            <div className='payment_section'>
                <div className='payment_title'>
                    <h3>상품 목록</h3>
                </div>

                <div className="payment_items">
                    {basket.map(item=>(
                        <CheckoutProduce id={item.id} title={item.title} image={item.image} 
                            price={item.price} rating={item.rating}/>
                    ))}
                </div>
            </div>

            <div className='payment_section'>
                <div className='payment_title'>
                        <h3> 결제 </h3>
                </div>

                <div className='payment_details'>
                    <form onSubmit={hendleSubmit}>
                        <CardElement onChange={handleChange}/>
                        <div className='payment_priceContainer'>
                
                            <CurrencyFormat renderText={(value) => (
                                <>
                                    <p>
                                        총액 ({basket.length} item) : <strong>{value} 원</strong>
                                    </p>
                                    <small className='subtotal_gift'>
                                        <input type="Checkbox" />체크박스입니다.
                                    </small>
                                </>
                            )}

                                decimalScale={2}
                                value={getBasketTotal(basket)}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={"₩"}
                            />
                            <button disabled = {processing || disable || succeeded}> <span>{processing ? <p>결제중입니다</p> : "결제하기"}</span> </button>
                        </div>
                        {error && <div>{error}</div>}
                    </form>
                </div>

                
            </div>

            


        </div>
    );
}

export default Payment;