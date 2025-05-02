import Dialog from '@mui/material/Dialog'

interface Props {
  footsteps: boolean
}

function Footsteps(props: Props) {
  return (
    <>
      {props.footsteps && (
        <Dialog
          open={true}
          keepMounted
          aria-describedby="alert-dialog"
          hideBackdrop={true}
        >
          <img
            className="footsteps"
            src="./images/map/footsteps.gif"
            alt="footsteps"
          />
        </Dialog>
      )}
    </>
  )
}

export default Footsteps
