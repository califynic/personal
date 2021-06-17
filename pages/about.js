import React from 'react'
import Head from 'next/head'
import styled from 'styled-components'
import Link from 'next/link'
import ReactDOM from 'react-dom'
import * as control from '../myfuncs.js'


/*<p>I'm Ali, a 16-year-old high-school student who loves computers.  One thing I really like is applying
mathematical thinking to messy human problems.  Some of my other interests include
biology, social engineering, podcasts, and writing.  I try to nuture my natural curiosity
about everything, but there are only so </p>

<p>Next year, I am finishing up my final year of high school at Phillips Academy in
Andover, MA.  Over the summer I am interning at the Research Science Institute, working on my MIT-PRIMES
project, and reading a fat textbook entitled <i>Molecular Biology of the Cell.</i></p>

<p>I hail from the wonderful, weird world of high-school math contests.
Once upon a time, I placed 20th internationally amongst girls at the
European Girls' Math Olympiad.  I was also invited to take part in the
Math Olympiad Summer Program three times.  Nowadays, I run a bite-sized
nonprofit called Athemath, where we try to make the highest tiers of math
contests more accessible.</p>*/

var seed = -1;
export default function About() {
  return (
    <>
      <Head>
        <title>Ali Cy</title>
      </Head>
      {control.StartBackground()}

      <table>
        <tr>
          <td class="left leftwidth">
            <h1>about</h1>
          </td>
          <td>

            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ac sollicitudin magna. In porttitor sem justo. Suspendisse sit amet commodo urna, vel hendrerit nibh. Nunc ac ante sit amet risus tristique porta a a nulla. Mauris cursus pharetra odio, quis sollicitudin felis bibendum vel. Phasellus vel semper nisi, et aliquet felis. Sed eu lacinia urna, volutpat ullamcorper ante. Duis ac dolor ligula. Donec aliquam nisi at accumsan hendrerit. Pellentesque eget quam eu quam feugiat posuere a quis ex. Nulla facilisi. Mauris rutrum, odio nec efficitur ullamcorper, mauris erat condimentum sem, in aliquam metus risus semper turpis. Etiam quis congue leo. Aenean placerat consectetur vestibulum. Ut velit purus, consequat laoreet ante ut, fringilla rhoncus lacus. Nullam semper eu quam id cursus.</p>

            <p>Curabitur eleifend sapien et malesuada pretium. Vestibulum magna nibh, lacinia vel varius vel, maximus et velit. Duis nec tincidunt tellus. Donec condimentum accumsan sem a cursus. Phasellus et imperdiet turpis, a rhoncus odio. Suspendisse mauris nulla, consectetur quis blandit vel, consectetur vitae diam. Nam eu felis vel augue cursus semper. Fusce volutpat nisi egestas, consequat urna a, dignissim arcu. Suspendisse bibendum diam magna, vel venenatis leo viverra non. Suspendisse sodales mi sit amet nunc suscipit, sit amet sollicitudin nisi mattis. Duis et sapien sem.</p>

            <p>Nullam sit amet lectus id nulla interdum semper. Duis venenatis lorem non porta condimentum. Aenean laoreet, metus pellentesque pellentesque porta, massa orci malesuada dui, sit amet viverra diam neque mollis arcu. Ut in laoreet mauris. Quisque efficitur augue id quam pellentesque, ac tempus augue feugiat. Morbi ac eleifend diam, at pretium massa. Donec ac mauris eu nisl faucibus tristique. Quisque vulputate sagittis dolor, eget tempor dolor hendrerit eu. Curabitur quis ligula vitae nulla bibendum interdum non at arcu. Duis odio ipsum, vehicula eget elit at, semper sodales purus. Nulla egestas eros nec nisl hendrerit ullamcorper. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Integer aliquam nisi ac turpis pulvinar cursus. Fusce ut est sit amet tellus efficitur tristique eget eu risus. Pellentesque euismod risus vel ligula varius mattis.</p>

            <p>Maecenas ut fermentum nisi, id elementum nisl. Aliquam quis ultricies dui. Sed porttitor sagittis nunc. Curabitur ultricies odio id mauris hendrerit tincidunt. Donec nec enim vel arcu tristique volutpat. Praesent eget ante laoreet elit bibendum fringilla ut ut est. Sed enim risus, facilisis a gravida sit amet, tincidunt non nulla.</p>

            <p>Integer ligula erat, vehicula ut vulputate sed, congue laoreet risus. Praesent placerat sem odio. Nunc ex eros, tempus eget luctus ut, condimentum quis nulla. Aenean sit amet leo nec quam dignissim efficitur. Proin egestas odio nisi, ac semper ipsum hendrerit sed. Suspendisse ornare, orci non scelerisque laoreet, magna tellus elementum mauris, sed venenatis libero lacus id ante. Nam imperdiet, nibh sed ultricies auctor, urna turpis suscipit lacus, vitae blandit diam ipsum quis lectus. Etiam nec arcu lorem. Sed sollicitudin nibh non ipsum ultricies, pretium sodales turpis hendrerit. Sed vel leo turpis. Pellentesque suscipit pellentesque turpis et tempus. Nunc venenatis condimentum ipsum vitae consectetur. Nullam iaculis mauris ut eros cursus, quis vulputate nisi consectetur.</p>

            <p>Aenean auctor metus ut pretium interdum. Maecenas felis erat, facilisis ut cursus ac, molestie quis ante. Aenean egestas, neque non efficitur tincidunt, magna ante semper massa, vitae accumsan erat metus ac leo. Nullam ut dignissim odio, eu fermentum nibh. Proin et suscipit purus. Suspendisse accumsan felis a quam pellentesque, eu sodales odio aliquet. In imperdiet blandit maximus.</p>

            <p>Quisque viverra posuere rutrum. Nam cursus sodales imperdiet. Nam vel leo sed massa hendrerit pharetra sit amet blandit mauris. Integer gravida ligula quis congue consectetur. In aliquam nunc tellus, quis porta lectus fringilla eu. Nam tortor quam, volutpat vel porta eget, tempus quis eros. Integer fringilla turpis at ultricies lacinia. Proin luctus nisl at gravida faucibus. In nec lectus et odio ultricies egestas. Mauris tincidunt ipsum quis interdum elementum. Duis ipsum elit, vulputate id risus non, facilisis aliquam elit. Suspendisse potenti. Curabitur eu tincidunt mi. Fusce tempor lacus ut odio luctus posuere in non mauris. Etiam a nisi a eros commodo egestas ut vitae sapien.</p>

            <p>Nulla in aliquam urna. Vestibulum nulla ex, aliquet vel lorem non, dignissim hendrerit purus. Morbi commodo, enim et bibendum sodales, nibh augue vulputate mauris, vel vulputate mauris lacus eget mi. Vivamus vulputate vel felis vitae fringilla. Proin ac sapien ex. Cras in pulvinar neque. Praesent sed varius ex, eu faucibus nunc. Proin ut justo turpis. Vestibulum maximus eget metus eu tincidunt. Donec id risus id ligula rhoncus auctor eu sed velit. Phasellus nec pellentesque elit. Phasellus accumsan tempor ipsum, ac sagittis arcu venenatis ut. Praesent convallis odio tortor, a maximus dui laoreet vitae. Vivamus eget lacinia dolor.</p>

            <p>Proin non rutrum quam, eget posuere lacus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus eget tortor faucibus, tincidunt quam quis, varius odio. Donec posuere interdum consequat. Ut tincidunt ut libero at vehicula. Suspendisse tempor quam sit amet purus posuere, eu tristique massa ornare. Nunc vel dolor et dolor laoreet molestie. Sed eleifend vitae justo et consequat. Mauris in volutpat risus. Suspendisse vulputate dapibus tellus, a porttitor nunc vulputate eget. Fusce eu pharetra mauris. Fusce blandit velit vitae ex mollis, eget feugiat justo aliquet. Praesent in cursus tortor, nec congue nibh.</p>

            <p>Vestibulum sit amet elit sed urna ornare gravida et quis leo. Donec tristique erat a commodo sollicitudin. Maecenas egestas placerat tellus aliquet facilisis. In gravida maximus condimentum. Mauris sollicitudin dui nec nulla pharetra scelerisque. Praesent vel elit aliquet, vehicula nisi vitae, pulvinar neque. Suspendisse sed tellus egestas, euismod ex nec, mollis felis. Curabitur molestie bibendum gravida.</p>

            <p>Maecenas viverra erat ut feugiat rhoncus. Integer mollis pharetra quam, at iaculis diam malesuada sed. Phasellus dignissim odio tellus, sit amet condimentum urna maximus sed. Aenean fringilla a ligula eget tincidunt. Proin eget efficitur leo. Nulla facilisi. Etiam laoreet hendrerit elementum. Donec turpis augue, consequat quis mi at, sagittis aliquet elit.</p>

            <p>Aenean cursus risus ut dui imperdiet ornare. Nullam ac consequat risus. Suspendisse semper arcu nibh, at vulputate velit sollicitudin non. Aliquam luctus libero lacus, nec egestas ipsum molestie in. Aenean sed risus ac eros vehicula maximus. Aenean efficitur eget augue a posuere. Pellentesque iaculis quam quis leo elementum dictum. Praesent commodo dolor ut felis posuere fermentum. Duis sed dapibus urna, nec blandit tortor. Suspendisse semper dui nec erat tempor, tempor consectetur leo condimentum. Mauris sit amet efficitur dui. Sed at mi feugiat massa finibus eleifend ut pretium est. Sed venenatis eu lectus id placerat. Maecenas a dictum ligula, id pharetra nunc. Donec nibh lacus, egestas nec suscipit at, ullamcorper vitae neque. Donec tempor libero ut nisl faucibus, in vestibulum sem tincidunt.</p>

            <p>Phasellus ullamcorper interdum nibh, vitae consectetur libero. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec et leo massa. Interdum et malesuada fames ac ante ipsum primis in faucibus. Suspendisse potenti. Suspendisse eget efficitur justo. Vestibulum nisl ligula, venenatis non sem a, luctus elementum purus. Nullam vel ipsum placerat, rhoncus justo et, scelerisque arcu. Sed elementum accumsan condimentum. Donec fringilla odio velit, sit amet facilisis nunc commodo eu. Vivamus ullamcorper orci ac mollis cursus. Nunc euismod nunc mauris, tristique eleifend augue finibus ac. Nam nec dui ac dui varius venenatis sit amet in erat. Ut non neque laoreet urna volutpat tristique sit amet vitae nisi. Fusce sit amet pharetra purus, ac accumsan magna. Curabitur non finibus justo.</p>

            <p>Nam ultrices sed purus in finibus. Aenean vel lectus libero. Vivamus in dictum justo, vel venenatis ipsum. Aliquam purus ante, ornare ut lorem ac, fermentum tincidunt velit. Pellentesque non nisi quis urna malesuada convallis. Morbi maximus, nisi sit amet egestas tristique, est nunc porta arcu, et vestibulum leo purus eget nisl. Ut vel tempus nibh. Integer auctor, libero pulvinar iaculis molestie, tortor lectus posuere orci, quis dapibus tortor metus vitae nibh. Interdum et malesuada fames ac ante ipsum primis in faucibus. Ut eget urna nulla. Suspendisse volutpat sit amet odio et varius. Pellentesque posuere diam eget erat commodo, sed dapibus augue lacinia. Nunc sagittis rhoncus eros et interdum. Fusce et ante ac mauris efficitur mattis.</p>

            <p>Mauris dictum, enim sed porttitor bibendum, turpis sem sagittis eros, at pharetra nisl lacus eu ligula. In sed semper tellus. Mauris molestie fringilla metus eget gravida. Cras varius justo lacinia gravida pellentesque. Donec eu tellus lorem. Aliquam vehicula ac velit vel egestas. Pellentesque iaculis, arcu laoreet commodo malesuada, mauris lorem suscipit arcu, et convallis turpis risus quis nibh. Praesent sed diam ut risus sodales molestie at at odio. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nulla semper quam in purus luctus pretium. Nullam auctor sagittis massa, ut lacinia odio. Quisque et iaculis velit, id commodo libero. Aliquam egestas felis vehicula turpis lobortis efficitur. Phasellus varius accumsan sollicitudin. Sed ac venenatis purus.</p>
          </td>
        </tr>
        <tr>
          <td>
            <p class="right" style={{marginBottom:"0"}}><strong>discord</strong></p>
          </td>
          <td>
            <p class="code" style={{marginBottom:"0"}}>alifenix-#6188</p>
          </td>
        </tr>
        <tr>
          <td>
            <p class="right" style={{margin:"0"}}><strong>twitter</strong></p>
          </td>
          <td>
            <p class="code" style={{margin:"0"}}>califynic</p>
          </td>
        </tr><tr>
          <td>
            <p class="right" style={{marginTop:"0"}}><strong>email</strong></p>
          </td>
          <td>
            <div>
              <div style={{float: "left"}}>
                <p class="code" style={{margin:"0"}}>califynic@gmail.com</p>
              </div>
              <div style={{float: "right"}}>
                <p class="code" style={{margin:"0"}}>ali.cy@athemath.org</p>
                <p style={{margin:"0"}}><i>for Athemath-related inquiries</i></p>
              </div>
            </div>
          </td>
        </tr>
      </table>
      <Link href=".." shallow={true}>
        <a>Go back</a>
      </Link>

      <p class="bottomfloat"><i>try reloading this page</i></p>

      {control.DrawBackground()}
    </>
  )
}
