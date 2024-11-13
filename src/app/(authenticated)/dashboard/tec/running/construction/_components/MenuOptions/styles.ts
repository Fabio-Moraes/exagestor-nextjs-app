import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
  width: 100%;
  gap: 1.5rem;
`;

export const Button = styled.button`
  width: 100%;
  background-color: rgb(var(--color-secondary-04));
  padding: 1rem 1.5rem;
  margin-top: 2rem;
  border: 0.1rem solid #000000;
  border-radius: 0.4rem;
  font-size: 1.6rem;
  white-space: nowrap;
  color: #fff;
`;
