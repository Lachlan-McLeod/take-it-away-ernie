import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate()

  const handleNavigate = (path: string) => {
    navigate(path)
  }
  return (
    <div className="home-container">
      <link
        href="https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@700&display=swap"
        rel="stylesheet"
      ></link>
      <button
        className="home-button"
        onClick={() => {
          handleNavigate('/map')
        }}
      >
        I solemnly swear that
        <br />I am up to no good
      </button>
    </div>
  )
}

export default Home
