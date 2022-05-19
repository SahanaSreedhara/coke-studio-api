import React from 'react'
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const Songs = () => {
    const [songs, setSongs] = useState([]);
    const [curr, setCurr] = useState({});
    const [showPlayer, setShowPlayer] = useState(false);
    const audioPlayer = React.useRef();
    const [gridView, setGridView] = useState(true);

    useEffect(() => {
        axios.get('https://s3-ap-southeast-1.amazonaws.com/he-public-data/studiod9c0baf.json').then((response) => {
            setSongs(response.data);
        })
    }, [])

    const handlePlay = (song) => {
        setCurr(song);
        console.log(audioPlayer.current)
        if (audioPlayer.current) {
            audioPlayer.current.pause();
            audioPlayer.current.load();
            audioPlayer.current.play();
        }
        setShowPlayer(true)
    }
    return (
        <>
            <div className='head'>
                <div>
                    <img className='coke-studio-logo' src="https://yt3.ggpht.com/ytc/AKedOLTNtHgVmX114S4cnjoyFaDDJE6N1zNBwKgRNnYNAg=s900-c-k-c0x00ffffff-no-rj" alt="Coke-studio-logo" />
                </div>
                <div className='view-select'>
                    <button className='view-btn' onClick={() => { setGridView(true) }}>
                        <i className="fa fa-th"></i>
                    </button>
                    <button className='view-btn' onClick={() => { setGridView(false) }}><i class="fa fa-list"></i></button>
                </div>
            </div>
            {gridView ? <h2 className='view-heading'>Grid View</h2> : <h2 className='view-heading' >List View</h2>}

            <div>
                {gridView ? <div className='grid'>
                    {songs.map((element) => {
                        return (<div className="inside-grid" onClick={() => handlePlay(element)}>
                            <img src={element.cover_image} alt={element.song} />
                            <div className="grid-details">
                                <h4 style={{ margin: '5px 0px' }}>{element.song}</h4>
                                <p style={{ margin: '0px' }}>{element.artists}</p>
                            </div>
                        </div>)
                    })}
                </div> : <div className='list'>
                    {songs.map((element) => {
                        return (<div className="inside-list" onClick={() => handlePlay(element)}>
                            <img src={element.cover_image} alt={element.song} />
                            <div className="list-details">
                                <h4 style={{ margin: '0px 0px 5px 0px' }}>{element.song}</h4>
                                <p style={{ margin: '0px' }}>{element.artists}</p>
                            </div>
                        </div>)
                    })}

                </div>
                }
            </div>

            {showPlayer ? <div className="music-player">
                <div> <img src={curr.cover_image} alt={curr.song} /> </div>
                <div>
                    <div> {curr.song} </div>
                    <div> {curr.artists} </div>
                </div>

                <audio ref={audioPlayer} autoPlay>
                    <source src={curr.url} ></source>
                </audio>
                <div>
                    <button className='audio-btn' onClick={() => audioPlayer.current.play()}>
                        <i class="fa fa-play"></i>
                    </button>
                    <button className='audio-btn' onClick={() => audioPlayer.current.pause()}>
                        <i class="fa fa-pause"></i>
                    </button>
                </div>

            </div> : null}
        </>
    )
}

export default Songs