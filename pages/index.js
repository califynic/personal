import React from 'react'
import Head from 'next/head'
import styled from 'styled-components'
import Link from 'next/link'
import ReactDOM from 'react-dom'
import * as control from '../myfuncs.js'

const Title = styled.h1`
  font-size: 3rem;
  color: ${props => props.theme.primary};
`;

const Index = () => (
  <>
    <Head>
      <title>Hello World</title>
    </Head>
    {control.StartBackground()}
    <Title>Hello World</Title>
    <p className="link-to-about">
      <Link href="about">
        <a>Go to about!</a>
      </Link>
    </p>
    {control.DrawBackground()}
  </>
);

export default Index;
