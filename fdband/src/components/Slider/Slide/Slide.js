import React from 'react';
import AudioPlayer from '../../AudioPlayer/AudioPlayer';

import './Slide.scss';

const Song = (props) => <li className="songs__item">{props.name}</li>

export default class Slide extends React.Component {
    constructor (props) {
        super(props)

        this.state = {
            isCentered: this.props.isCentered,
            isMoving: false,
            isNext: true
        }

        this.changeCenteredStatus = this.changeCenteredStatus.bind(this)
        this.handleMove = this.handleMove.bind(this)
    }

    changeCenteredStatus () {
        this.setState({
            isCentered: !this.state.isCentered
        })
    }

    handleMove (isNext) {
        this.setState({
            isMoving: !this.state.isMoving,
            isNext: isNext
        })
    }

    render () {
        const center = this.state.isCentered ? 'slide--centered' : '';
        const moving = this.state.isMoving ? `slide${(this.state.isNext ? '--move-left' : '--move-right')}` : '';
        return (
            <li className={`slide ${center} ${moving}`}>
                <div className="slide__front">
                    <img className='slide__image' src={this.props.src} alt={this.props.alt} />
                    <div className="slide__play-btn">
                        <span className="slide__play-btn--icon icon-media-pause"></span>
                    </div>
                    <div className="slide__date">{this.props.date}</div>
                    <h2 className='slide__title'>{this.props.name}</h2>
                    <div className="slide__show-songs">
                        <div className="slide__show-songs--title">Show more</div>
                    </div>
                </div>
                <div className="slide__back">
                    <ul className="slide__songs songs">
                        {this.props.songs.map(song => {
                            return(
                                <Song 
                                    key={song.id}
                                    name={song.name}
                                />
                            )
                        })}
                    </ul>
                    {this.state.isCentered === true ? 
                        (<div className='slide__player'>
                            <AudioPlayer songs={this.props.songs} />
                        </div>) : ''
                    }
                </div>
            </li>
        )
    }
}
