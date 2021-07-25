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
  play: (episodeList: Episode[], index: number) => void,
  handlePlayNext: () => void,
  handPlayPrevious: () => void,
  togglePlayButton: () => void,
  togglePlayingState: (value: boolean) => void,
}

export const PlayerContext = createContext({} as PlayserContextData);

export function PlayerContextProvider({ children }: PlayerProviderProps) {
  const [ episodes, setEpisodes ] = useState([]);
  const [ currentEpisodeIndex, setCurrentEpisodeIndex ] = useState(0);
  const [ isPlaying, setIsPlaying ] = useState(false);

  function play(episodeList, index) {
    setEpisodes(episodeList);
    setCurrentEpisodeIndex(index);
    setIsPlaying(true);
  }

  function togglePlayButton() {
    setIsPlaying(!isPlaying);
  }
  
  function handlePlayNext() {
    if (currentEpisodeIndex < (episodes.length -1) ) setCurrentEpisodeIndex(currentEpisodeIndex + 1);
  }

  function handPlayPrevious() {
    if (currentEpisodeIndex > 0) setCurrentEpisodeIndex(currentEpisodeIndex - 1);
  }

  function togglePlayingState(value:boolean) {
    setIsPlaying(value);
  }

  return <PlayerContext.Provider value={{
    episodes,
    currentEpisodeIndex,
    isPlaying,
    play,
    handlePlayNext,
    handPlayPrevious,
    togglePlayButton,
    togglePlayingState
  }}
  >
    {children}
  </PlayerContext.Provider>;

}

export const usePlayerContext = () => useContext(PlayerContext);