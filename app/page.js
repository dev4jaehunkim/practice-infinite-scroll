'use client';

import { useEffect, useRef, useState } from "react";
import MovieCard from "./(MovieCard)/index";
import * as S from './style';

export default function Home() {
  const [moviePage, setMoviePage] = useState(1);
  const [movies, setMovies] = useState();
  const [intersecting, setIntersecting] = useState(false);

  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIntersecting(entry.intersecting);
    }, {
      threshold: [0.3],
    });

    console.log(intersecting);
    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [intersecting]);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.tmdbApiKey}&page=${moviePage}&language=ko-KR`)
      .then(response => response.json())
      .then(json => {
        console.log(json.results);
        setMovies(json.results)
      })
      .catch(err => console.log(err));
  }, [intersecting]);

  useEffect(() => {
    setMoviePage(currPage => currPage + 1);
  }, [movies]);

  console.log(process.env.tmdbApiKey);
  return (
    <S.ListContainer ref={ref}>
      {movies ? movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      )) : <p>Loading...</p>}
    </S.ListContainer>
  )
}


