import React,{useEffect, useState} from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { Movie, Search, Tv, Whatshot } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import { useNavigate} from 'react-router-dom';




const useStyle:any = makeStyles({
    root:{
     width:'100%',
     position:'fixed',
     bottom:0,
     zIndex:100,
    },

})


const SimpleBottomNavigation= () => {
    const classes = useStyle();
  const [value, setValue] = useState(0);
  const navigate = useNavigate();

  
useEffect(() => {
    if (value===0) navigate('/')
    if (value===1) navigate('/movies') 
    if (value===2) navigate('/series')
    if (value===3) navigate('/search') 
}, [value,navigate])


  return (
      <BottomNavigation
        showLabels
        style={{backgroundColor:'black'}}
        className={classes.root}
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction label="Trending" icon={<Whatshot/>}  style={{color:'red'}}/>
        <BottomNavigationAction label="Movies" icon={<Movie />} style={{color:'red'}} />
        <BottomNavigationAction label="TV Series" icon={<Tv />} style={{color:'red'}} />
        <BottomNavigationAction label="Search" icon={<Search />}  style={{color:'red'}} />
      </BottomNavigation>
  );
} 
export default SimpleBottomNavigation;