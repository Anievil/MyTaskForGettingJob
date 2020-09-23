import React, { useState } from 'react'
import style from './LoginStyle.module.scss'
import axios from 'axios'

export default function Login(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [action, setAction] = useState();
    const [value, setValue] = useState('Login')
    const [value2, setValue2] = useState('Create new account')

    //считывание значения username
    const handleChangeLogin = (e) => {
        setUsername(e.target.value);
    }

    //считывание значения password
    const handleChangePass = (e) => {
        setPassword(e.target.value)
    }

    // определение действия
    const discoverAction = (e) => {
        if(e.target.value === 'Login'){
            setAction('login'); 
        }
        else if(e.target.value === 'Register') {
            setAction('register');
        }
    } 

    // переход к регестрации или логину
    const changeValue = (e) =>{
        if(value2 === 'Create new account'){
            setValue2('I have account');
            setValue('Register');
        }
        else if (e.target.value === 'I have account'){
            setValue2('Create new account');
            setValue('Login');
            
        }
    }

    // отправка данных на сервер (логин или регестрация) и установка значений токена, IsLogin и username для других компонентов(при удачной авторизации окно закрывается)
    const handleSubmit = async (e) => {
        e.preventDefault()
        const cont = e.target.parentNode;

        try {
            const response = await 
            axios.post(`http://smktesting.herokuapp.com/api/${action}/`, { username: username, password: password });
            console.log(response);
            if(response.data.success){
                props.setUsername2(username)
                props.setIsLogin(true);
                props.setToken(response.data.token)
                cont.classList.add(style.displayNone)
                setPassword('')
                setUsername('')
            }
            else{ 
                alert('Login incorrect')
            }
        } catch (e) {
            console.log(e);
        }
    }

    // закрытие окна для авторизации
    const close = (e) => {
        const cont = e.target.parentNode.parentNode;
        cont.classList.add(style.displayNone)
    }

    return (
        <div className={`${style.loginCont} ${style.displayNone}`}>
            <form onSubmit={handleSubmit}>
                <img src='https://www.iconfinder.com/data/icons/ionicons/512/icon-close-512.png' alt='close' className={style.close} onClick={close}/>
                <h2>{value}</h2>
                <input type='text' placeholder='Enter username' value={username} name='Username' onChange={handleChangeLogin} maxLength="20" required />
                <input type='password' placeholder='Enter password' value={password} name='Password'  onChange={handleChangePass} required />
                <input type='submit' value={value} onClick={discoverAction}/>
            </form>
            <input type='submit' value={value2} onClick={changeValue}/>
        </div>
    )
}
