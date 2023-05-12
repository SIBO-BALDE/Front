import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import fontawesome from '@fortawesome/fontawesome';
import {  faFacebook, faInstagram, faTwitter} from '@fortawesome/free-brands-svg-icons';


fontawesome.library.add( faFacebook);

export default function Footer() {






  return (
<div class="container-titre">
  <footer class="py-5">
    <div class="row">
      <div class="col-6 col-md-2 mb-3">
        <h5>About</h5>
        <ul class="nav flex-column">
          <li class="nav-item mb-2"><a href="/about" class="nav-link p-0 text-muted">Qui Sommes nous?</a></li>
          <li class="nav-item mb-2"><a href="/" class="nav-link p-0 text-muted">Nos réalisations</a></li>
          <li class="nav-item mb-2"><a href="/" class="nav-link p-0 text-muted">Nos Partenaires</a></li>
          
        </ul>
      </div>

      <div class="col-6 col-md-2 mb-3">
        <h5>Contacts</h5>
        <ul class="nav flex-column">
          <li class="nav-item mb-2"><a href="/contact" class="nav-link p-0 text-muted">loincloth@gmail.com</a></li>
          <li class="nav-item mb-2"><a href="/" class="nav-link p-0 text-muted">00221 33 854 78 99</a></li>
          <li class="nav-item mb-2"><a href="https://goo.gl/maps/PVZKby4HWLCub2a17" class="nav-link p-0 text-muted">Dakar,Sénégal</a></li>
         
        </ul>
      </div>

      <div class="col-md-5 offset-md-1 mb-3">
        <form>
          <h5>Abonnez à notre newsletter</h5>
          <p>Pour recevoire des informations complets sur nous.</p>
          <div class="d-flex flex-column flex-sm-row w-100 gap-2">
            <label for="newsletter1" class="visually-hidden">Email address</label>
            <input id="newsletter1" type="text" class="form-control" placeholder="Email address"/>
            <button class="btn btn-primary" type="button">Abonnez</button>
          </div>
        </form>
      </div>
    </div>

    <div class="d-flex flex-column flex-sm-row justify-content-between py-4 my-4 border-top">
      <p>© 2023 La loincloth, Inc. All rights reserved.</p>
        
    </div>
    <div className='sociau'>
      <div className='a1'>
        <a href='https://www.facebook.com/KoldingBussiness/' alt=''><FontAwesomeIcon icon={faFacebook}style={{color:'white'}} /></a>
        </div >
        <div className='a2'>
        <a href='/' alt=''><FontAwesomeIcon icon={faTwitter}style={{color:'white'}} /></a>
        </div>
        <div className='a3'>
        <a href='/' alt=''><FontAwesomeIcon icon={faInstagram} style={{color:'white'}} /></a>
        </div>
    </div>
  </footer>
</div>
  )
}
