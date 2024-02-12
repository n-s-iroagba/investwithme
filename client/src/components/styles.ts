const radius = '0.5cm'
const buttonRadius='50px'
export const outerHorizontalPaddingStyles = {
  paddingLeft:'5vw',
  paddingRight:'5vw'
}
export const textStyles={
  textLight:{
    color:'white'
  },
  textDark:{
    color:'black'
  },
  heavyfont:{
  fontSize:'6vw',
  fontWeight:'700'
  },
  textAlignCenter: {
    textAlign: 'center',
  },
  midfont:{
    fontSize:'3vw',
    fontWeight:'900'
  }
}
const colors = {
  primary:'#1a6e41',
  secondary:'#79b294'
}
export const backgroundStyles = {
  primary:{
         backgroundColor:colors.primary
  }
}
export const deepestPadddingStyles = {
  top:{
    paddingTop:"2.5cm"
  }
}
export const shallowMarginStyles ={
  bottom:{
    marginBottom:'1cm'
  }
}
export const shallowPaddingStyles ={
  bottom:{
    paddingBottom:'1cm'
  }
}
export const flexStyle = {
  display:{
    display:'flex'
  },
  flexColumn:{
    flexDirection:'column'
  }
}
export const buttonStyles = {

    width:'6cm',
    height:'1.4cm',
    display:'flex',
    justifyContent:'space-evenly',
    alignItems:'center',
    paddingLeft: '0.5cm',
    paddingRight:'0',
    backgroundColor: colors.secondary,
    border:'0.05cm solid white',
    zIndex:'1000'
   
  
}
export const roundDiv={
  border: '1px solid white',
  borderRadius:'50%',
  height:'1.4cm',
  width:'1.4cm',
  display:'flex',
  alignItems:'center',
  justifyContent:'center'
}
export const roundborderStyles ={
  topLeft:{
    borderRadiusTopLeft:radius

  },
  topRight:{
    borderRadiusTopRight:radius

  },
  bottomLeft:{
    borderRadiusBottomLeft:radius

  },
  bottomRight:{
    borderRadiusBottomRight:radius

  },
 
}
export const border ={
  border:`0.2cm solid ${colors.secondary}`
}
export const roundButtonborderStyles ={
  borderTopLeftRadius: buttonRadius,
  borderTopRightRadius: buttonRadius,
  borderBottomLeftRadius: buttonRadius,
  borderBottomRightRadius: buttonRadius,
 
}