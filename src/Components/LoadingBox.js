import Spinner from 'react-bootstrap/Spinner'

 function LoadingBox() {
    return ( 
    
    <Spinner animation="border" role="status">
        <span className="visually-hidden">{LoadingBox}  </span>
    </Spinner>
     );
} 
export default LoadingBox;