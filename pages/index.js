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
      <title>Ali Cy</title>
    </Head>
    {control.StartBackground()}
    <div id="left">
      <h1>ali cy</h1>
    </div>

    <div id="right">
      <p>math + coding <i>with flair</i></p>

      <p><Link href="../about" shallow={true}>
        <a style={{paddingLeft: "50px"}}>about</a>
      </Link></p>

      <p><Link href="../uploads/resume.pdf" shallow={true}>
        <a style={{paddingLeft: "100px"}}>resume</a>
      </Link></p>

      <p><Link href="https://github.com/califynic" shallow={true}>
        <a style={{paddingLeft: "150px"}}>github</a>
      </Link></p>

      <p><Link href="https://alicy.substack.com/" shallow={true}>
        <a style={{paddingLeft: "200px"}}>substack</a>
      </Link></p>
    </div>

    <p class="bottomfloat"><i>try reloading this page</i></p>

    {control.DrawBackground()}
  </>
);


/*
<Title>Hello World</Title>
<p className="link-to-about">
  <Link href="about">
    <a>Go to about!</a>
  </Link>
</p>
*/
export default Index;
