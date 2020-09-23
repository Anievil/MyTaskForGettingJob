import React, { Component } from 'react'
import style from './ItemCardStyle.module.scss'
import axios from 'axios'

class ItemCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reviews: [],
            isFetching: false,
            comment: '',
            rate: '',
            src: null
        }
    }

    // определение ссылки для получения комментариев
    getApi() {
        const { id } = this.props;
        const http = axios.create({
            baseURL: `http://smktesting.herokuapp.com/api/reviews/${id}`,
            responseType: 'json',
        });
        this.getReview(http);
    }
    
    // Получение данных о комментариях 
    getReview = async (http) => {
        try {
            const { data } = await http.get();
            this.fetchReview(data)
        }
        catch (err) {
            console.log(err);
        }

    };

    // отправка комментария 
    submitComment = async () => {
        try {
            const { id, token } = this.props
            const { rate, comment } = this.state;
            const response = await
                axios.post(`http://smktesting.herokuapp.com/api/reviews/${id}`, {
                    rate: rate,
                    text: comment,
                },
                {
                    headers: {
                        Authorization: `Token ${token}`
                    }
                });
            console.log(response);
            this.getApi()
            this.setState({
                rate: '',
                comment: ''
            })
        } catch (e) {
            console.log(e);
        }
    }

    // заполнение массива reviews
    fetchReview = async (data) => {
        this.setState({
            isFetching: true,
        })
        console.log()
        const info = await data;
        console.log(info)
        this.setState({
            reviews: [...info],
            isFetching: false,
        })
    }

    //открытие и закрытие блока с комментариями 
    ToggleReviewCont = (e) => {
        e.preventDefault();
        const cont = e.target.parentNode.parentNode;
        const reviewBlock = cont.querySelector(`.${style.reviewCont}`)
        reviewBlock.classList.remove(style.displayNone)
        const close = reviewBlock.querySelector(`.${style.close}`)
        close.addEventListener('click', () => {
            reviewBlock.classList.add(style.displayNone)
        })
        this.getApi();
    }

    // шаблон для одного комментария и вывод всех комментов с помощью map
    allReviews() {
        return this.state.reviews.map((review) => {
            return (
                <li key={review.id}>
                    <p> >>{review.created_by.username}</p>
                    <p> Rate - <strong>{review.rate}</strong></p>
                    <p> Comment: {review.text}</p>
                </li>
            )
        })
    }

    // считывание комментария из input
    handleChangeComment = (e) => {
        this.setState({
            comment: e.target.value
        })
    }
    
    // считывание оценки из input
    handleChangeRate = (e) => {
        this.setState({
            rate: e.target.value
        })
    }

    // проверка перед отправкой коммента на случай если пользователь не авторизирован
    handleSubmit = (e) => {
        if (this.props.isLogin) {
            this.submitComment();
        }
        else {
            alert('WARNING! You need to log in');
        }
        e.preventDefault()
    }

    render() {
        const { reviews: { length }, comment, rate } = this.state;
        const { title, img, text } = this.props;
        return (
            <div>
                <div className={style.card}>
                    <img src={`http://smktesting.herokuapp.com/static/${img}`} alt='Video adaptor' className={style.itemPic} />
                    <h2 className={style.title}>{title}</h2>
                    <p className={style.desc}>{text}</p>
                    <p className={style.review} onClick={this.ToggleReviewCont}> Review </p>
                    <div className={`${style.reviewCont} ${style.displayNone}`}>
                        <img src='https://www.iconfinder.com/data/icons/ionicons/512/icon-close-512.png' alt='close' className={style.close} />
                        <h2>Review</h2>
                        <form className={style.commentForm} onSubmit={this.handleSubmit}>
                            <textarea type='text' name='CommentForSubmit' value={comment} className={style.newComment} onChange={this.handleChangeComment} maxLength="255" placeholder='Enter your comment(max length - 255)' required />
                            <input type='text' name='RateForSubmit' value={rate} className={style.rate} onChange={this.handleChangeRate} pattern='[1-5]' placeholder='Rate(from 1 to 5)' required />
                            <input type='submit' value='Submit comment' />
                        </form>
                        <ul>
                            {length > 0 && this.allReviews()}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default ItemCard;