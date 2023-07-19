import React from 'react';
import './Header.css'
import SearchIcon from '@material-ui/icons/Search';
import ShoppingBasket from '@material-ui/icons/ShoppingBasket';
import { Link } from 'react-router-dom';
import { useStateValue } from './StateProvider';
import { auth } from '../utils/firebase';


function Header() {
    const [{basket,user}, dispatch] = useStateValue();
    
    const handleAuthentication = () =>{
        if(user) {
            auth.signOut();
        }
    }

    return (
        <div className="header">
            <Link to="/">
                <img className="header_logo" src ="https://pngimg.com/uploads/amazon/amazon_PNG11.png" alt =""/>
            </Link>
            <div className='header_search'>
                <input className='header_searchInput' type = 'text'/>
                <SearchIcon className="header_serchIcon"/>
            </div>
            <div className='header_nav'>
                <div className='header_option'>
                    <span className='header_optionOne'>{!user? "게스트" : user.email}</span>
                    <Link to={!user && "/login"} className='homelogin'>
                        <span onClick={handleAuthentication}className='header_optionTwo'>{user ? '로그아웃' : '로그인'}</span>
                    </Link>
                </div>

                <div className='header_option'>
                    <span className='header_optionOne'>돌아가기</span> 
                    <Link to="/orders" className='orderlist'>
                        <span className='header_optionTwo'>주문내역</span>
                    </Link>
                </div>

                <div className='header_option'>
                    <span className='header_optionOne'>Hello</span>
                    <span className='header_optionTwo'>World</span>
                </div>
                <Link to="/checkout">
                    <div className='header_optionBasket'>
                        <ShoppingBasket/>
                        <span className='header_optionLineTwoheader_basketCount'>
                            {basket?.length}
                        </span>
                    </div>
                </Link>

                

            </div>
        </div>
    );
}

export default Header;