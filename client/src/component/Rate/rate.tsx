import React,{useState} from 'react'
import axios from "axios";
import { Margin } from '@mui/icons-material';

interface RateContentType {
  id: string | number;
}


const rate = (props: RateContentType) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [value, setValue] = useState(0);

    const handleChange =(event:any) => {
      let { value, min, max } = event.target;
      value = Math.max(Number(min), Math.min(Number(max), Number(value)));
      
      setValue(value);
    };

    const submitRate = () => {
      const variables = {
        rate: value,
        id: props.id
    }
      axios.post('http://localhost:3001/api/movie/rate', variables)
      .then(response => {
          if (response.data.success) {
              // props.refreshFunction(response.data.result)
          } else {
              alert('Failed to save Comment')
          }
      })
    }
  
    return (
      <form onSubmit={submitRate} >
        <label>Your Rate:</label>
      <input
        value={value}
        onChange={handleChange}
        type="number"
        min="1"
        max="10"
        style={{padding:'10px' , margin:'10px'}}
      />
      <button  style={{backgroundColor:'green',padding:'10px'}}onClick={submitRate}>submit</button>
      </form>
    );
  }


export default rate
