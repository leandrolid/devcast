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
  play: (episodeList: Episode[], index: number) => void,
  handlePlayNext: () => void,
  handPlayPrevious: () => void,
  togglePlayButton: () => void,
  togglePlayingState: (value: boolean) => void,
  toggleShuffleState: () => void,
}

export const PlayerContext = createContext({} as PlayserContextData);

export function PlayerContextProvider({ children }: PlayerProviderProps) {
  const [ episodes, setEpisodes ] = useState([]);
  const [ currentEpisodeIndex, setCurrentEpisodeIndex ] = useState(0);
  const [ isPlaying, setIsPlaying ] = useState(false);
  const [ isShuffling, setIsShuffling ] = useState(false);

  function play(episodeList, index) {
    setEpisodes(episodeList);
    setCurrentEpisodeIndex(index);
    setIsPlaying(true);
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
    if (currentEpisodeIndex > 0) setCurrentEpisodeIndex(currentEpisodeIndex - 1);
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
    play,
    handlePlayNext,
    handPlayPrevious,
    togglePlayButton,
    togglePlayingState,
    toggleShuffleState
  }}
  >
    {children}
  </PlayerContext.Provider>;

}

export const usePlayerContext = () => useContext(PlayerContext);