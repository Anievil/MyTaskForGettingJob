import React, { useState } from 'react'
import style from './HeaderStyle.module.scss';
import Login from './Login/Login'
import style2 from './Login/LoginStyle.module.scss'
import style3 from '../Catalog/ItemCard/ItemCardStyle.module.scss'

const Header = (props) => {
    
    const [username, setUsername2] = useState('');

    // функция для открытия окна авторизации
    const handleClick = (e) =>{
        const cont = e.target.parentNode;
        const logCont = cont.querySelector(`.${style2.loginCont}`)
        logCont.classList.remove(style2.displayNone)
    }

    // Функция которая меняет тему
    const activeTheme = (e) => {
        const cont = e.target.parentNode;
        cont.classList.toggle(style.red);
        const cards = document.querySelectorAll(`.${style3.card}`)
        for(let i = 0; i < cards.length; i++){ 
            cards[i].classList.toggle(style3.darkGrey)
        }
        const comments = document.querySelectorAll(`.${style3.reviewCont}`)
        for(let i = 0; i < comments.length; i++){ 
            comments[i].classList.toggle(style3.grey)
        }
        const login = cont.querySelector(`.${style.login}`)
        login.classList.toggle(style.darkslateblue)
    }

    //выход из аккаунта
    const logout = () => {
        setToken(null)
        setIsLogin(false)
    }

    const {isLogin, setIsLogin, setToken } = props;
    return (
        
        <header className={style.header}>
            <img src={'https://placeitmarketing.s3.amazonaws.com/public/custompages/logo-maker/Esports-Logo-Maker.png'} onClick={activeTheme} className={style.logo} alt={'logo'} /> 
            { isLogin ? <div className={style.login} onClick={logout} >Welcome, {username}. <p>Click to exit</p> </div>  : <button onClick={handleClick} className={style.login}> Login/Reg </button>}
            <Login setIsLogin={setIsLogin} setUsername2={setUsername2} setToken={setToken}/>
        </header>
    )
}

export default Header;