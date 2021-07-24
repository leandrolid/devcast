import Head from 'next/head';
import { parseISO, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { ReactNode } from 'react';
import { GetStaticProps } from 'next';

import { api } from '../services/api';
import { convertDurationToTimeString } from '../utils/convertDurationToTimeString';
import { LatestEpisodes } from '../components/LatestEpisodes';

import styles from "./home.module.scss";
import { AllEpisodes } from '../components/AllEpisodes';

type EpisodeAPI = {
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

type HomeProps = {
  allEpisodes: Episode[],
  lastestEpisodes: Episode[]
}; 

export default function Home({allEpisodes, lastestEpisodes}: HomeProps) {
  return (
    <>
      <Head>
        <title>Devcast</title>
        <meta name="description" content="Hear your favorite podcasts" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <div className={styles.content}>
        <LatestEpisodes data={lastestEpisodes} />
        <AllEpisodes data={allEpisodes} />
      </div>

    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } =  await api.get('/episodes', {
    params: {
      _limit: 12,
      _sort: 'published_at',
      _order: 'desc'
    }
  });

  const episodes = data.map(({ id, title, thumbnail, members, published_at, description, file: {duration, url}}: EpisodeAPI )=> ({
    id,
    title,
    thumbnail,
    members,
    publishedAt: format(parseISO(published_at), 'd MMM yy', { locale: ptBR}),
    description,
    duration: Number(duration),
    durationAsString: convertDurationToTimeString(Number(duration)),
    url,
  }));

  const lastestEpisodes = episodes.slice(0, 2);

  return {
    props: {
      allEpisodes: episodes,
      lastestEpisodes
    },
    revalidate: 60 * 60 * 8, // 8 hours
  };
};
