'use client';

import styled from 'styled-components';

export const Container = styled.div`
display: flex;
white-space: nowrap;
padding: 5px;
width: 100%;

flex-direction: column;
justify-content: space-between;

background-color: #E2FBEF;
align-items: center;

> div {
width: 100%;

> p {
margin-bottom: 10px;
text-align: start;
font-size: 15px;
}

> p:last-child {
margin-bottom: 0px;
}
}`