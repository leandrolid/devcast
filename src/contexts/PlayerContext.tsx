import { createContext, ReactNode, useContext, useState } from 'react';

type PlayerProviderProps = {
  children: ReactNode
}

type Episode = {
  id: string,      
  title: string,
  thumbnail: string,
  members:string,
  publishedAt: string,
  duration: number
  durationAsString: string,
  url: string,
}

type PlayserContextData = {
  episodes: Episode[],
  currentEpisodeIndex: number,
  isPlaying: boolean,
  isShuffling: boolean,
  playerPosition: string,
  play: (episodeList: Episode[], index: number) => void,
  handlePlayNext: () => void,
  handPlayPrevious: () => void,
  togglePlayButton: () => void,
  togglePlayingState: (value: boolean) => void,
  toggleShuffleState: () => void,
  togglePlayerPosition: () => void,
  togglePlayerPositionDefault: () => void,
}

export const PlayerContext = createContext({} as PlayserContextData);

export function PlayerContextProvider({ children }: PlayerProviderProps) {
  const [ episodes, setEpisodes ] = useState([]);
  const [ currentEpisodeIndex, setCurrentEpisodeIndex ] = useState(-1);
  const [ isPlaying, setIsPlaying ] = useState(false);
  const [ isShuffling, setIsShuffling ] = useState(false);
  const [ playerPosition, setPlayerPosition ] = useState('100vw');

  function play(episodeList, index) {
    setEpisodes(episodeList);
    setCurrentEpisodeIndex(index);
    setIsPlaying(true);
  }

  function togglePlayerPosition() {
    setPlayerPosition('100vw');
  }
  
  function togglePlayerPositionDefault() {
    setPlayerPosition('0');
    
  }

  function togglePlayButton() {
    setIsPlaying(!isPlaying);
  }
  
  function handlePlayNext() {
    if (isShuffling) {
      const index = Math.floor(Math.random() * ( episodes.length - 1 ));
      setCurrentEpisodeIndex(index);
    } else if (currentEpisodeIndex < (episodes.length -1) ) {
      setCurrentEpisodeIndex(currentEpisodeIndex + 1);
    };
  }

  function handPlayPrevious() {
    if (isShuffling) {
      const index = Math.floor(Math.random() * ( episodes.length - 1 ));
      setCurrentEpisodeIndex(index);
    } else if (currentEpisodeIndex > 0) {
      setCurrentEpisodeIndex(currentEpisodeIndex - 1);
    }
  }

  function togglePlayingState(value:boolean) {
    setIsPlaying(value);
  }


  function toggleShuffleState() {
    setIsShuffling(!isShuffling);
  }

  return <PlayerContext.Provider value={{
    episodes,
    currentEpisodeIndex,
    isPlaying,
    isShuffling,
    playerPosition,
    play,
    handlePlayNext,
    handPlayPrevious,
    togglePlayButton,
    togglePlayingState,
    toggleShuffleState,
    togglePlayerPosition,
    togglePlayerPositionDefault
  }}
  >
    {children}
  </PlayerContext.Provider>;

}

export const usePlayerContext = () => useContext(PlayerContext);