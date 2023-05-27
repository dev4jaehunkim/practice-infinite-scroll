'use client';

import { useEffect, useState } from "react";
import { Suspense } from "react";

export default function Home() {
  const [moviePage, setMoviePage] = useState(1);
  const [movies, setMovies] = useState();

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.tmdbApiKey}&page=${moviePage}&language=ko-KR`)
      .then(response => response.json())
      .then(json => {
        console.log(json.results);
        setMovies(json.results)
      })
      .catch(err => console.log(err));
  }, [moviePage]);

  console.log(process.env.tmdbApiKey);
  return (
    <>
      {movies ? movies.map((movie) => (
      <div key={movie.key}>
        <h1>{movie.title}</h1>
        </div>
      )) : <p>Loading...</p>  }
    </>
  )
}
