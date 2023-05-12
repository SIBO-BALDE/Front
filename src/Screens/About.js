import React from 'react'
import Button from 'react-bootstrap/esm/Button'

export default function About() {
  return (
    <div   className='about-center'>
      <h1 style= {{textAlign:'center' ,marginTop:'100px'}}>Qui sommes nous </h1>
      <div style= {{textAlign:'center'}}>
        
         <p>ome text about who we are and what we do. Page is responsive by the way.</p>
         <p>Resize the browser window to see that this page is responsive by the way.</p>
     </div>

       <h2  style= {{textAlign:'center'}}>Our Team</h2>
    <div class="row justify-content-md-center flex-wrap">
 <div class="col-6">
    <div class="card ">
      <img src="/Images/normal.jpg" alt="sibo"  style= {{width:'20%'}} />
      <div class="container">
        <h2>SIBO BALDE</h2>
        <p class="title">CEO & Founder</p>
        <p>Some text that describes me lorem ipsum ipsum lorem.</p>
        <p>baldesibo@gmail.com</p>
        <p><Button class="button">Contact</Button></p>
      </div>
    </div>
  </div>
  </div>
  <div class="row justify-content-md-center flex-wrap">
  <div class="col-6">
    <div class="card">
      <img src="/Images/Maya.jpg" alt="Mareme" style= {{width:'20%'}} />
      <div class="container">
        <h2>Maréme DIA</h2>
        <p class="title">Directrice Commercial</p>
        <p>Some text that describes me lorem ipsum ipsum lorem.</p>
        <p>diamareme@gmail.com</p>
        <p><Button class="button">Contact</Button></p>
      </div>
    </div>
  </div>
  </div>
  <div class="row justify-content-md-center ">
  <div class="col-6 mb-10">
    <div class="card">
      <img src="/Images/group.JPG" alt="group" style= {{width:'20%'}} />
      <div class="container">
        <h2>Groupe</h2>
        <p class="title">Designers</p>
        <p>Some text that describes me lorem ipsum ipsum lorem.</p>
        <p>teamloincloth@gmail.com</p>
        <p><Button class="button">Contact</Button></p>
      </div>
    </div>
  </div>
</div>
    </div>
  )
}
