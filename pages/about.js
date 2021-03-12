import Link from 'next/link'
import * as control from '../myfuncs.js'

var seed = -1;
export default function About() {
  return (
    <div>
      <h1>about</h1>
      {control.StartBackground()}
      <Link href=".." shallow={true}>
        <a>Go back</a>
      </Link>
      {control.DrawBackground()}
    </div>
  )
}
