'use client';

import { useEffect, useRef, useState } from "react";
import MovieCard from "./(MovieCard)/index";
import * as S from './style';

export default function Home() {
  const [moviePage, setMoviePage] = useState(1);
  const [movies, setMovies] = useState();

  const ref = useRef(null);

  useEffect(() => {
    // ref 달린 요소가 뷰포트의 가장 하단에 등장했을 때 페이지 값을 1 증가시키는 옵저버 생성
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setMoviePage((prevPage) => prevPage+1);
      }
    }, {
      root: null,
      threshold: 1,
    });

    // 대상이 존재할 때만 옵저버로 관측
    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [movies]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.tmdbApiKey}&page=${moviePage}&language=ko-KR`);
        const json = await response.json();
        if (moviePage > 1) {
          setMovies([...movies, ...json.results]);
        } else {
          setMovies(json.results);
        }
        
      } catch (err) {
        console.error(err);
      }
    }
    fetchMovies();
    
  }, [moviePage]);

  return (
    <S.ListContainer>
      {movies ? movies.map((movie, idx) => (
        // Problem: 각각의 요소를 렌더링하되, 요소의 마지막 언저리 즈음이 스크롤에 관측됐을 때 추가 요소를 렌더링하고 싶음
        // Solution: 뒤에서부터 5번째 요소에 ref 연결하면 추가 렌더링이 될 때 ref 위치를 갱신할 수 있음
        idx === (movies.length - 5) ? <MovieCard key={movie.id} movie={movie} ref={ref} />
        : <MovieCard key={movie.id} movie={movie} />
      )) : <p>Loading...</p>}
    </S.ListContainer>
  )
}


