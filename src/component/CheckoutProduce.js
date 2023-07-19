import React from 'react';
import './CheckoutProduce.css'
import { useStateValue } from './StateProvider';

function CheckoutProduce({id,title,image,price,rating,hideButton}) {
    const [{basket},dispatch] = useStateValue();

    const removeFromBasket = () =>{
        dispatch({
            type : "REMOVE_FROM_BASKET",
            id:id,
        })
    }

    return (
        <div className='CheckoutProduct'>
            <img className='CheckoutProduct_image' src={image} alt =''/>

            <div className='CheckoutProduct_info'>
                <p className='CheckoutProduct_title'>
                    {title}
                </p>

                <p className='CheckoutProduct_price'>
                    <small>₩</small>
                    <strong>{price}</strong>
                    <small>원</small>
                </p>

                <div className='heckoutProduct_rating'>
                    {
                        Array(rating)
                            .fill()
                            .map(()=>(
                                <p>★</p>
                            ))
                    }
                </div>
                
                {!hideButton && (<button onClick={removeFromBasket}>장바구니에서 제거하기</button>
                )}
            </div>
        </div>
    );
}

export default CheckoutProduce;