import styled from "styled-components";

export const MovieCard = styled.div`
  width: 30vw;
  min-width: 200px;
  max-width: 400px;

  height: 40vh;
  min-height: 300px;
  max-height: 500px;

  display: flex;
`;

export const Poster = styled.div`
  width: 30%;
  height: 100%;
  
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    height: 90%;
  }
`;

export const MovieInfo = styled.div`
  width: 70%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  color: white;
  background: rgba(0, 0, 0, 0.7);

  h1 {
    font-size: 1.5rem;
    font-weight: bold;
  }

  p {
    font-size: 1rem;
  }
`;