import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  padding: 0 0 1rem 1.7rem;

  span {
    border: 0.2rem solid #71c285;
    color: #ffffff;
    margin: 0.5rem;
    padding: 0.3rem 0.5rem;
    border-radius: 0.5rem;
    background: linear-gradient(90deg, rgb(var(--color-primary-03)), rgba(var(--color-primary-01)));
    white-space: nowrap; /* Impede a quebra dentro do span */
  }
`;
