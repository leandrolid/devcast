/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { useEffect, useRef, useState } from 'react';

import { usePlayerContext } from '../../contexts/PlayerContext';
import { convertDurationToTimeString } from '../../utils/convertDurationToTimeString';

import styles from './player.module.scss';

export function Player() {
  const { 
    episodes,
    currentEpisodeIndex,
    isPlaying,
    isShuffling,
    playerPosition,
    handlePlayNext,
    handPlayPrevious,
    togglePlayButton,
    togglePlayingState,
    toggleShuffleState,
    togglePlayerPosition
    // play
  } = usePlayerContext();

  const episode = episodes[currentEpisodeIndex];

  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if( !audioRef.current ) return ;
    
    if (isPlaying) {
      audioRef.current.play();
    } else if (!isPlaying) {
      audioRef.current.pause(); 
      
    }
    
  },[isPlaying]);
  
  const [ progress, setProgress ] = useState(0);
  const [ progressInTimeString, setProgressInTimeString ] = useState('00:00:00');

  function playNext() {
    handlePlayNext();
    setProgress(0);
    audioRef.current.currentTime = 0;
    audioRef.current.play();
  }
  
  function setProgressListener() {
    audioRef.current.currentTime = 0;
    
    audioRef.current.addEventListener('timeupdate', () => {
      const time = Math.floor(audioRef.current.currentTime);
      setProgress(time);
    });
  }

  useEffect(() => {
    const timeString = convertDurationToTimeString(progress);
    setProgressInTimeString(timeString);
  },[progress, progressInTimeString]);

  const [ isReplaying, setIsReplaying ] = useState(false);

  function toggleReplayState() {
    setIsReplaying(!isReplaying);
  }

  function handleSliderChange(amount: number) {
    audioRef.current.currentTime = amount;
    setProgress(amount);
  }

  const [ equalSize, setEqual ] = useState(false);
  const [ smallerSize, setSmallerSize ] = useState(false);
  
  useEffect(() => {
    if ( typeof currentEpisodeIndex === 'number' ){    
      const equal = currentEpisodeIndex === (episodes.length - 1);
      setEqual(equal);
  
      const smaller = (currentEpisodeIndex -1) < 0;
      setSmallerSize(smaller);
    }
  },[currentEpisodeIndex, episodes.length]);
  
  return (
    <div className={styles.container}
    // style={{ translate: `${playerPosition} 0` }}
    style={{ transform: typeof window != 'undefined' ? (
      window.screen.width <= 1024 ? `translateX(${playerPosition})` : '' 
    ) : '' }}
    >
      <button className={styles.hideButton} onClick={togglePlayerPosition}> {'Esconder >'} </button>
      <header>
        <img src="/playing.svg" alt="Tocando agora" />
        <strong>Tocando agora</strong>
      </header>

      { episode ? (
        <div className={styles.currentEpisode}>
          <Image
          width={592}
          height={592}
          src={episode.thumbnail}
          alt={episode.title}
          objectFit="cover"
          />
          <strong>{episode.title}</strong>
          <span>{episode.members}</span>
        </div>
      ) : (
        <div className={styles.emptyPlayer}>
          <strong>Selecione um podcast para ouvir</strong>
        </div>
      )}

      <footer className={ !episode ? styles.empty : ''}>
        <div className={styles.progress}>
          <span>{progressInTimeString}</span>
          <div className={styles.slider}>
            { episode ? (
              <>
                <Slider
                trackStyle={{ backgroundColor: 'var(--green-500)' }}
                railStyle={{ backgroundColor: 'var(--purple-300)' }}
                handleStyle={{ borderColor: 'var(--green-500)', borderWidth: 4 }}
                max={episode.duration}
                value={progress}
                onChange={handleSliderChange}
                />

                <audio
                ref={audioRef}
                src={episode.url}
                autoPlay
                onPlay={() => togglePlayingState(true)}
                onPause={() => togglePlayingState(false)}
                onLoadedMetadata={setProgressListener}
                loop={isReplaying}
                onEnded={playNext}
                />
              </>
            ) : (
              <div className={styles.emptySlider} />
            ) }
          </div>
          <span>{ episode ? episode.durationAsString : '00:00:00' }</span>
        </div>

        <div className={styles.controls}>
          <button
          type="button"
          disabled={ !episode }
          className={ isShuffling ? styles.active : '' }
          onClick={toggleShuffleState}
          >
            <img src="/shuffle.svg" alt="Embaralhar"/>
          </button>
          <button
          type="button"
          style={ smallerSize && !isShuffling ? { opacity: 0.5 } : {}}
          disabled={ (!episode || smallerSize) && !isShuffling }
          onClick={() => handPlayPrevious()}
          >
            <img src="/play-previous.svg" alt="Tocar anterior"/>
          </button>
          { isPlaying ? (
            <button
            type="button"
            className={styles.play}
            disabled={ !episode }
            onClick={() => togglePlayButton()}
            >
              <img src="/pause.svg" alt="Pausar"/>
            </button>
          ) : (
            <button
            type="button"
            className={styles.play}
            disabled={ !episode }
            onClick={() => togglePlayButton()}
            >
              <img src="/play.svg" alt="Tocar"/>
            </button>
          ) }
          <button
          type="button"
          style={ equalSize && !isShuffling ? { opacity: 0.5 } : {}}
          disabled={ (!episode || equalSize) && !isShuffling}
          onClick={() => handlePlayNext()}
          >
            <img src="/play-next.svg" alt="Tocar próxima"
            />
          </button>
          <button
          type="button"
          disabled={ !episode }
          className={ isReplaying ? styles.active : '' }
          onClick={toggleReplayState}
          >
            <img src="/repeat.svg" alt="Repetir"/>
          </button>
        </div>
      </footer>
    </div>
  );
}