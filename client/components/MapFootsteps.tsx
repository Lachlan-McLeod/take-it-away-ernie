interface Props {
  footsteps: boolean
  from: string
  to: string
}

function MapFootsteps(props: Props) {
  let style = {}

  //default
  style = {
    top: '350px',
    left: '650px',
    backgroundColor: '#2a374d',
    maxWidth: '600px',
  }

  //from King's Cross
  if (props.from === "King's Cross" && props.to === 'Hogwarts')
    style = {
      transform: 'scaleY(-1)',
      top: '200px',
      left: '700px',
    }

  //from Hogwarts
  if (props.from === 'Hogwarts' && props.to === "King's Cross")
    style = {
      transform: 'rotate(-120deg)',
      top: '200px',
      left: '700px',
    }

  if (props.from === 'Hogwarts' && props.to === 'Hogsmeade')
    style = {
      transform: 'scaleY(-1)',
      top: '400px',
      left: '1000px',
    }

  if (props.from === 'Hogwarts' && props.to === 'Azkaban')
    style = {
      transform: 'rotate(30deg)',
      top: '200px',
      left: '1000px',
    }

  if (props.from === 'Hogwarts' && props.to === 'Privet Drive')
    style = {
      transform: 'rotate(140deg)',
      top: '400px',
      left: '600px',
    }

  if (props.from === 'Hogwarts' && props.to === 'Forbidden Forest')
    style = {
      transform: 'rotate(130deg)',
      top: '400px',
      left: '800px',
    }

  //from Privet Drive
  if (props.from === 'Privet Drive' && props.to === 'Hogwarts')
    style = {
      transform: 'rotate(-30deg)',
      top: '400px',
      left: '650px',
    }

  if (props.from === 'Privet Drive' && props.to === 'Forbidden Forest')
    style = {
      transform: 'rotate(45deg)',
      top: '550px',
      left: '700px',
    }

  if (props.from === 'Privet Drive' && props.to === 'The Burrow')
    style = {
      transform: 'scaleY(-1)',
      top: '650px',
      left: '650px',
    }

  //from The Burrow
  if (props.from === 'The Burrow' && props.to === 'Privet Drive')
    style = {
      transform: 'rotate(-105deg)',
      top: '650px',
      left: '650px',
    }

  if (props.from === 'The Burrow' && props.to === 'Forbidden Forest')
    style = {
      transform: 'rotate(-65deg)',
      top: '650px',
      left: '750px',
    }

  if (props.from === 'The Burrow' && props.to === 'Shell Cottage')
    style = {
      transform: 'rotate(45deg)',
      top: '750px',
      left: '750px',
    }

  if (props.from === 'The Burrow' && props.to === 'Hogsmeade')
    style = {
      transform: 'rotate(-5deg)',
      top: '650px',
      left: '850px',
    }

  if (props.from === 'The Burrow' && props.to === "Godric's Hollow")
    style = {
      transform: 'rotate(-1deg)',
      top: '650px',
      left: '850px',
    }

  //from Forbidden Forest
  if (props.from === 'Forbidden Forest' && props.to === 'Privet Drive')
    style = {
      transform: 'rotate(-140deg)',
      top: '450px',
      left: '700px',
    }

  if (props.from === 'Forbidden Forest' && props.to === 'The Burrow')
    style = {
      transform: 'rotate(155deg)',
      top: '600px',
      left: '700px',
    }

  if (props.from === 'Forbidden Forest' && props.to === 'Shell Cottage')
    style = {
      transform: 'rotate(105deg)',
      top: '600px',
      left: '900px',
    }

  if (props.from === 'Forbidden Forest' && props.to === 'Hogwarts')
    style = {
      transform: 'rotate(-45deg)',
      top: '450px',
      left: '800px',
    }

  if (props.from === 'Forbidden Forest' && props.to === "Godric's Hollow")
    style = {
      transform: 'rotate(45deg)',
      top: '600px',
      left: '1000px',
    }

  if (props.from === 'Forbidden Forest' && props.to === 'Hogsmeade')
    style = {
      top: '500px',
      left: '700px',
    }

  //from Shell Cottage
  if (props.from === 'Shell Cottage' && props.to === 'The Burrow')
    style = {
      transform: 'rotate(-145deg)',
      top: '750px',
      left: '850px',
    }

  if (props.from === 'Shell Cottage' && props.to === 'Forbidden Forest')
    style = {
      transform: 'rotate(-85deg)',
      top: '650px',
      left: '850px',
    }

  if (props.from === 'Shell Cottage' && props.to === "Godric's Hollow")
    style = {
      transform: 'rotate(-145deg)',
      top: '750px',
      left: '1250px',
    }

  if (props.from === 'Shell Cottage' && props.to === 'Beauxbatons')
    style = {
      transform: 'rotate(45deg)',
      top: '750px',
      left: '1250px',
    }

  if (props.from === 'Shell Cottage' && props.to === 'Durmstrang')
    style = {
      transform: 'rotate(1deg)',
      top: '700px',
      left: '1150px',
    }

  //from Beauxbatons
  if (props.from === 'Beauxbatons' && props.to === 'Durmstrang')
    style = {
      transform: 'rotate(-45deg)',
      top: '650px',
      left: '1450px',
    }

  if (props.from === 'Beauxbatons' && props.to === "Godric's Hollow")
    style = {
      transform: 'rotate(-85deg)',
      top: '650px',
      left: '1250px',
    }

  if (props.from === 'Beauxbatons' && props.to === 'Shell Cottage')
    style = {
      transform: 'rotate(-145deg)',
      top: '750px',
      left: '1050px',
    }

  //from Durmstrang
  if (props.from === 'Durmstrang' && props.to === 'Beauxbatons')
    style = {
      transform: 'rotate(-225deg)',
      top: '650px',
      left: '1350px',
    }

  if (props.from === 'Durmstrang' && props.to === "Godric's Hollow")
    style = {
      transform: 'rotate(-155deg)',
      top: '500px',
      left: '1250px',
    }

  if (props.from === 'Durmstrang' && props.to === 'Hogsmeade')
    style = {
      transform: 'rotate(-90deg)',
      top: '500px',
      left: '1300px',
    }

  if (props.from === 'Durmstrang' && props.to === 'Azkaban')
    style = {
      transform: 'rotate(-45deg)',
      top: '400px',
      left: '1450px',
    }

  //from Azkaban
  if (props.from === 'Azkaban' && props.to === 'Durmstrang')
    style = {
      transform: 'rotate(-225deg)',
      top: '300px',
      left: '1400px',
    }

  if (props.from === 'Azkaban' && props.to === 'Hogsmeade')
    style = {
      transform: 'rotate(-160deg)',
      top: '300px',
      left: '1300px',
    }

  if (props.from === 'Azkaban' && props.to === 'Hogwarts')
    style = {
      transform: 'rotate(-140deg)',
      top: '200px',
      left: '1300px',
    }

  //from Hogsmeade
  if (props.from === 'Hogsmeade' && props.to === 'Azkaban')
    style = {
      top: '400px',
      left: '1100px',
    }

  if (props.from === 'Hogsmeade' && props.to === 'Durmstrang')
    style = {
      transform: 'rotate(50deg)',
      top: '500px',
      left: '1200px',
    }

  if (props.from === 'Hogsmeade' && props.to === "Godric's Hollow")
    style = {
      transform: 'rotate(125deg)',
      top: '500px',
      left: '1100px',
    }

  if (props.from === 'Hogsmeade' && props.to === 'Forbidden Forest')
    style = {
      transform: 'rotate(-155deg)',
      top: '500px',
      left: '900px',
    }

  if (props.from === 'Hogsmeade' && props.to === 'Hogwarts')
    style = {
      transform: 'rotate(-160deg) scaleY(-1)',
      top: '300px',
      left: '1000px',
    }

  if (props.from === 'Hogsmeade' && props.to === 'Shell Cottage')
    style = {
      transform: 'rotate(-195deg)',
      top: '600px',
      left: '950px',
    }

  if (props.from === 'Hogsmeade' && props.to === 'The Burrow')
    style = {
      transform: 'rotate(-185deg)',
      top: '700px',
      left: '800px',
    }

  //from Godric's Hollow
  if (props.from === "Godric's Hollow" && props.to === 'Durmstrang')
    style = {
      transform: 'rotate(45deg)',
      top: '550px',
      left: '1250px',
    }

  if (props.from === "Godric's Hollow" && props.to === 'Shell Cottage')
    style = {
      transform: 'rotate(-195deg)',
      top: '700px',
      left: '1000px',
    }

  if (props.from === "Godric's Hollow" && props.to === 'Beauxbatons')
    style = {
      transform: 'rotate(95deg)',
      top: '600px',
      left: '1200px',
    }

  if (props.from === "Godric's Hollow" && props.to === 'Forbidden Forest')
    style = {
      transform: 'rotate(-100deg)',
      top: '550px',
      left: '1000px',
    }

  if (props.from === "Godric's Hollow" && props.to === 'Hogwarts')
    style = {
      transform: 'rotate(-80deg)',
      top: '450px',
      left: '1000px',
    }

  if (props.from === "Godric's Hollow" && props.to === 'Hogsmeade')
    style = {
      top: '500px',
      left: '1000px',
    }

  return (
    <>
      {props.footsteps && (
        <img
          className="map-footsteps"
          src="./images/map/footsteps.gif"
          style={style}
          alt="footsteps"
        />
      )}
    </>
  )
}

export default MapFootsteps
