import React from 'react';
import ReactDOM from "react-dom";
import './Slider.scss';

import slideImg1 from '../../assets/images/slide-1.jpg';
import slideImg2 from '../../assets/images/slide-2.jpg';
import slideImg3 from '../../assets/images/slide-3.jpg';
import slideImg4 from '../../assets/images/slide-4.jpg';
import slideImg5 from '../../assets/images/slide-5.jpg';

function Slide(props) {
    return (
        <li className="slide">
            <img className="slide__image" src={props.src} alt={props.alt} />
        </li>
    )
}

function delay(ms) {
    return new Promise((resolve, reject) => setTimeout(resolve, ms))
}

export default class Slider extends React.Component {

    btnSwitchState = () => {
        const buttons = ReactDOM.findDOMNode(this).getElementsByClassName('slider__button');
        [].forEach.call(buttons, (btn) => btn.disabled = !btn.disabled);
    }

    btnAction = async(direction) => {
        const isNext = direction === 'next' ? true : false;
        this.btnSwitchState();

        const slider = ReactDOM.findDOMNode(this).querySelector('.slider__body');
        [].forEach.call(slider.getElementsByClassName('slide'), (slide => 
            slide.classList.add(`slide${isNext ? '--move-left' : '--move-right'}`)
        ));
        
        await delay(1000);
        this.btnSwitchState();
        
        const slide = slider.removeChild(isNext ? slider.firstChild : slider.lastChild);
        isNext ? slider.appendChild(slide) : slider.insertBefore(slide, slider.firstChild);
        console.log(slide);
        [].forEach.call(slider.getElementsByClassName('slide'), (slide => 
            slide.classList.remove(`slide${isNext ? '--move-left' : '--move-right'}`)
        ));
    }

    btnNext = () => this.btnAction('next')

    btnPrev = () => this.btnAction('prev')

    render() {
        return <React.Fragment>
            <div className="slider ">
                <div className="slider__body">
                    <Slide className="slide-fwd-tr" src={slideImg1} alt="slideImg1"/>
                    <Slide src={slideImg2} alt="slideImg2"/>
                    <Slide src={slideImg3} alt="slideImg3"/>
                    <Slide src={slideImg4} alt="slideImg4"/>
                    <Slide src={slideImg5} alt="slideImg5"/>
                </div>
                <div className="slider__panel">
                    <button className="slider__button" onClick={this.btnPrev}>PREV</button>
                    <button className="slider__button" onClick={this.btnNext}>NEXT</button>
                </div>
            </div>
        </React.Fragment>
    }

}