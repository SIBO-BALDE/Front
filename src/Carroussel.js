import React from 'react'
import Carousel from 'react-bootstrap/Carousel';

export default function Carroussel() {
  return (
<Carousel className='mt-100'>
      <Carousel.Item>
        <img
          className="d-block w-100  mt-100" height={570} style={{marginTop:"80px"}}
          src="/Images/photo7.jpg"
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 "height={570} style={{marginTop:"80px"}}
          src="/Images/photo5.jpg"
          alt="Second slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100" height={570} style={{marginTop:"80px"}}
          src="/Images/photo6.jpg"
          alt="Third slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100" height={570} style={{marginTop:"80px"}}
          src="/Images/photo8.jpg"
          alt="four slide"
        />
      </Carousel.Item>
    </Carousel>
  )
}






















































// import React from 'react'


// export default function Carroussel() {
//   return (
   
// <div id="carouselExampleIndicators" class="carousel slide   "    data-ride="carousel">
//   <ol class="carousel-indicators">
//     <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
//     <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
//     <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
//   </ol>
//   <div class="carousel-inner">
//     <div class="carousel-item active">
//       <img class="d-block w-100" height={'560'} src="Images/Exemple2.png" alt="First slide"/>
//     </div>
//     <div class="carousel-item">
//       <img class="d-block w-100" src="Images/Exemple2.png" alt="Second slide"/>
//     </div>
//     <div class="carousel-item">
//       <img class="d-block w-100" src="Images/Exemple2.png" alt="Third slide"/>
//     </div>
//   </div>
//   <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
//     <span class="carousel-control-prev-icon" aria-hidden="true"></span>
//     <span class="sr-only">Previous</span>
//   </a>
//   <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
//     <span class="carousel-control-next-icon" aria-hidden="true"></span>
//     <span class="sr-only">Next</span>
//   </a>
// </div>
        
 
//    ) }
    
