import { useNavigate } from 'react-router-dom';

const Navigator = (e) => {
  let navigate = useNavigate();
  navigate(e)
}

export default Navigator;