import styled from 'styled-components'

const Modal = ({children}) => {
  
  return (
    <>
     <Overlay>
  
      <ModalContainer>
         {children}
      </ModalContainer>
     </Overlay>
    </>
  )
}

export default Modal;

const Overlay = styled.div`
width: 100%;
height: 100%;
top: 0;
left: 0;
display: flex;
justify-content: center;
align-items: center;
position: absolute;
background: rgba(0,0,0, 0.5);

`;

const ModalContainer = styled.div`
display: flex;
justify-content: space-between;
gap: 2em;
width: 60%;
height: 30em;
max-height: 35em;
background: #ffff;
bottom: 2em;
position: relative;
padding:5px;
border-radius: 5px;
box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
`
