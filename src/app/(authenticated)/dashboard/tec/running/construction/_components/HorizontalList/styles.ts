import styled from 'styled-components';

import { motion } from 'framer-motion';

export const HorizontalScrollList = styled(motion.div)`
  display: flex;
  overflow-x: scroll;
  white-space: nowrap;
  padding: 0 40% 0 1.7rem;
  margin: 2rem 0;
  cursor: grab;
  position: relative;

  &::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;

  mask-image: linear-gradient(
    90deg,
    rgba(0, 0, 0, 1) 60%,
    rgba(0, 0, 0, 0.1) 95%,
    rgba(0, 0, 0, 0) 100%
  );
  -webkit-mask-image: linear-gradient(
    90deg,
    rgba(0, 0, 0, 1) 60%,
    rgba(0, 0, 0, 0.1) 95%,
    rgba(0, 0, 0, 0) 100%
  );

  & > div {
    flex: 0 0 auto;
    margin-right: 1rem;
  }

  &.dragging {
    cursor: grabbing;
  }
`;

export const TableRow = styled.div<{ $isSelected: boolean }>`
  display: flex;
  flex-direction: column;
  margin: 1.5rem 0;
  background-color: rgba(var(--color-primary-01), 0.8);

  padding: 1rem 0;
  width: 20rem;
  border-radius: 1rem;

  > span:first-child {
    color: #ffffff;
    padding-bottom: 1rem;
  }

  > span:last-child {
    color: #ffffff;
    padding-top: 1rem;
  }

  > div {
    width: 100%;
    display: flex;
    flex-direction: row;
    background-color: #eeeeee;

    > div {
      display: flex;
      justify-content: space-between;
      padding-top: 0.5rem;

      width: 100%;
      text-align: center;

      padding: 0.5rem 1rem;

      > span {
        padding-top: 0.5rem;
        font-family: 'OpenSans-SemiBold';
        font-size: 1.4rem;
      }
    }
  }
`;

export const Dialog = styled.dialog`
  background-image: linear-gradient(
    45deg,
    rgb(var(--color-primary-02)) 65%,
    rgb(var(--color-secondary-02))
  );
  border-radius: 0.7rem;
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.1);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  > div {
    display: flex;
    flex-direction: column;
  }

  > button {
    background-color: #fff;
    align-items: center;
    flex-shrink: 0;
    border-radius: 0.5rem;
    width: 25rem;
    margin: 1rem;
    cursor: pointer;
    user-select: none;

    > p {
      text-align: center;
      font-size: 1.4rem;
      color: #000;
      width: 100%;
    }

    display: flex;
    height: 4.5rem;

    transition: all 0.05s ease;
    box-shadow: 0px 3px 0px rgb(var(--color-secondary-02));

    &:active {
      transform: translateY(2px);
      box-shadow: none;
    }
  }
`;

export const SearchBar = styled.input`
  font-size: 3rem;
  padding: 0 0.5rem;
  margin: 0 0.5rem;
  background-color: #fff;
  border-radius: 0.5rem;
  width: 8rem;
  outline: none;
  text-align: center;
  &::placeholder {
    color: #333;
  }
`;

export const IncrementButton = styled.button`
  font-size: 2rem;
  background-color: #333;
  color: #fff;
  border-radius: 0.5rem;
  cursor: pointer;
  text-align: center;

  > span {
    transform: rotate(-90deg);
  }

  font-weight: 900;

  padding-bottom: 0.3rem;

  margin: 0.5rem;

  width: auto;
  height: 3rem;
`;

export const DecrementButton = styled.button`
  font-size: 2rem;
  background-color: #333;
  color: #fff;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;

  text-align: center;

  font-weight: 900;

  > span {
    transform: rotate(-90deg);
  }

  padding-bottom: 0.3rem;

  margin: 0.5rem;

  width: auto;
  height: 3rem;
`;
