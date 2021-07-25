/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import { parseISO, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import Link from 'next/link';

import { api } from '../../services/api';
import { convertDurationToTimeString } from '../../utils/convertDurationToTimeString';

import { GetStaticPaths, GetStaticProps } from 'next';
import { ReactNode } from 'react';

import styles from './episode.module.scss';

type Episode = {
  id: string,      
  title: string,
  thumbnail: string,
  members:string,
  publishedAt: string,
  description: string,
  duration: number
  durationAsString: string,
  url: string,
}

type EpisodeAPI = {
  data: {
    id: string,      
    title: string,
    members:string,
    published_at: string,
    thumbnail: string,
    description: ReactNode,
    file: {
      url: string,
      type: string,
      duration: number
    }
  }
}

type CurrentEpisodeProps = {
  episode: Episode;
}

export default function CurrentEpisode({episode}: CurrentEpisodeProps) {

  return(
    <section className={styles.main}>
      <div className={styles.container}>
        <div className={styles.thumbnail}>
          <Link href="/" passHref>
            <button type="button">
              <img src="/arrow-left.svg" alt="Voltar" />
            </button>
          </Link>

          <Image 
          width={700}
          height={160}
          src={episode.thumbnail}
          alt={episode.title}
          objectFit="cover" />

          <button type="button">
            <img src="/play.svg" alt="Tocar atual" />
          </button>
        </div>

        <header>
          <h1>{episode.title}</h1>
          <span className={styles.members}>{episode.members}</span>
          <span>{episode.publishedAt}</span>
          <span>{episode.durationAsString}</span>
        </header>

        <div className={styles.description} dangerouslySetInnerHTML={{
          __html: episode.description
        }}
        />
      </div>
    </section>

  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking'
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { episode: slug } = ctx.params;
  const { data: { id, title, thumbnail, members, published_at, description, file: {duration, url} } }: EpisodeAPI = await api.get(`/episodes/${slug}`);

  const episode = {
    id,
    title,
    thumbnail,
    members,
    publishedAt: format(parseISO(published_at), 'd MMM yy', { locale: ptBR}),
    description,
    duration: Number(duration),
    durationAsString: convertDurationToTimeString(Number(duration)),
    url,
  };

  return {
    props: {
      episode
    },
    revalidate: 60 * 60 * 24 // 24 hours
  };
};