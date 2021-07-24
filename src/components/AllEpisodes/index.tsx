/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import { ReactNode } from 'react';

import styles from './allEpisodes.module.scss';

type Episode = {
  id: string,      
  title: string,
  thumbnail: string,
  members:string,
  publishedAt: string,
  description: ReactNode,
  duration: number
  durationAsString: string,
  url: string,
}

type AllEpisodesProps = {
  data: Episode[],
}; 

export function AllEpisodes({data}: AllEpisodesProps) {

  return(
    <section className={styles.container}>
      <h2>Todos episódios</h2>

      <table cellSpacing={0}>
        <thead>
          <tr>
            <th></th>
            <th>Podcast</th>
            <th>Integrantes</th>
            <th>Data</th>
            <th>Duração</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
        {data.map((episode)=> {          
          return (
            <tr key={episode.id} className={styles.details}>

              <td>
                <Image
                width={120}
                height={120}
                src={episode.thumbnail}
                alt={episode.title}
                objectFit="cover"
                />
              </td>

              <td>
                <a href="">{episode.title}</a>
              </td>

              <td>
                <p>{episode.members}</p>
              </td>

              <td>
                <span>{episode.publishedAt}</span>
              </td>

              <td >
                <span>{episode.durationAsString}</span>
              </td>

              <td>
              <button>
                <img src="/play-green.svg" alt="Tocar episódio" />
              </button>
              </td>

            </tr>
          );})}

        </tbody>
        
      </table>
    </section>
  );
}