
import { NotificationType } from '../../utils/types';
import { Card} from 'react-bootstrap';

const NotificationModal:React.FC<{data:NotificationType}>=({data})=> {
  
    return(
    
      <Card className='w-100 mx-2'>
        <Card.Body>
       
          <Card.Title className='border-0 border-bottom border-black' >{data.title} </Card.Title>
  
        <Card.Text >{data.message}</Card.Text>
        </Card.Body>
       
      </Card>
     
    )}

export default NotificationModal;