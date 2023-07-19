import React from 'react';
import './Home.css';
import Product from '../component/Product';

function Home() {
    return (
        <div className='home'>
            <div className='home-container'>
                <img className='home_image' src="https://images.idgesg.net/images/article/2017/09/firetvad2-100736366-orig.jpg" alt=""/>

                <div className='home_row'>
                    <Product 
                        id="1" 
                        title="근성족보" 
                        price={3000} 
                        image="https://en.pimg.jp/024/292/158/1/24292158.jpg" 
                        rating={4}/>
                    <Product 
                        id="2" 
                        title="갤럭시북2pro" 
                        price={10000} 
                        image="https://images.samsung.com/kdp/goods/2022/03/17/2c27619a-2ce5-47cb-9b0f-a5290eeb0322.png?$PD_GALLERY_L_PNG$" 
                        rating={4}/>

                </div>

                <div className='home_row'>
                    <Product 
                        id="3" 
                        title="Lg그램" 
                        price={17000} 
                        image="https://img.danawa.com/prod_img/500000/074/578/img/16578074_1.jpg?shrink=330:330_v=20220314104151" 
                        rating={5}/>
                    <Product 
                        id="4" 
                        title="에이수스 비보북" 
                        price={8000} 
                        image="https://thumbnail8.coupangcdn.com/thumbnails/remote/492x492ex/image/rs_quotation_api/uroazcd9/727a4d5661b844199e604f0af3b0495c.jpg" 
                        rating={5}/>
                </div>

                <div className='home_row'>
                    <Product 
                        id="5" 
                        title="아이폰 미니14" 
                        price={5000} 
                        image="https://thumbnail6.coupangcdn.com/thumbnails/remote/492x492ex/image/retail/images/948510421240970-dec8146f-71db-43f9-aa5e-92697ed4f8f1.jpg" 
                        rating={3}/>
                </div>

            </div>
        </div>
    );
}

export default Home;