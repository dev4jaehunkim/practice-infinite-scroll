'use client';

import { useState, forwardRef } from 'react';
import * as S from './style';

const MovieCard = forwardRef(({ movie }, ref) => {
  const [poster, setPoster] = useState(`https://image.tmdb.org/t/p/w440_and_h660_face${movie.poster_path}`);
  return (
    <div ref={ref}>
      <S.MovieCard src={poster} alt={`영화 ${movie.title}의 포스터 사진`}>
        <S.Poster>
          <img src={poster} alt={`영화 ${movie.title}의 포스터 사진`} />
        </S.Poster>
        <S.MovieInfo>
          <h1>{movie.title}</h1>
          <p>{`평점 : ${movie.vote_average} / 10`}</p>
        </S.MovieInfo>
      </S.MovieCard>
    </div>
  )
}); 

MovieCard.displayName = 'MovieCard';
export default MovieCard;