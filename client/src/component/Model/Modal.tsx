import React from 'react'
import Comments from '../Comment/Comment'
import Rate from '../Rate/rate'
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { useSpring, animated } from '@react-spring/web';
import { red } from '@mui/material/colors';

interface ModalContentType {
  id: string | number;
  show: boolean;
  name: string,
  onClose: any;
  open:boolean;
  handelOpen:any;
}

// const Modal = (props: ModalContentType) => {
//   if(!props.show){
//     return null
//   }
//   return (
//     <div className='modal'>
//         {/* <div className='modal-content'>
//             <h4 className='modal-title'>Mo</h4>
//         </div> */}
//         <div className='modal-body'>
//             <h2>{props.name}</h2>
//             <Comments id={props.id} />
//             <Rate  id={props.id}/>
//         </div>
//         <div className='modal-footer'>
//             {/* <button className='button'>Submit</button> */}
//             <button onClick={props.onClose}className='button'>close</button>
//         </div>
      
//     </div>
//   )
// }

// export default Modal


interface FadeProps {
  children: React.ReactElement;
  in?: boolean;
  onClick?: any;
  onEnter?: (node: HTMLElement, isAppearing: boolean) => void;
  onExited?: (node: HTMLElement, isAppearing: boolean) => void;
  ownerState?: any;
}

const Fade = React.forwardRef<HTMLDivElement, FadeProps>(function Fade(props, ref) {
  const {
    children,
    in: open,
    onClick,
    onEnter,
    onExited,
    ownerState,
    ...other
  } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter(null as any, true);
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited(null as any, true);
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {React.cloneElement(children, { onClick })}
    </animated.div>
  );
});

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const SpringModal=(props: ModalContentType)=> {


  return (
    <div>
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={props.open}
        onClose={props.onClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            TransitionComponent: Fade,
          },
        }}
      >
        <Fade in={props.open}>
          <Box sx={style}>
            <Typography id="spring-modal-title" variant="h6" component="h2">
            <h2>{props.name}</h2>
            <Comments id={props.id} />
            <Rate  id={props.id}/>
            </Typography>
            <Typography id="spring-modal-description" sx={{ mt: 2 }}>
            <button style={{backgroundColor:'red',padding:'10px'}} onClick={props.onClose}className='button'>close</button>
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
export default SpringModal
