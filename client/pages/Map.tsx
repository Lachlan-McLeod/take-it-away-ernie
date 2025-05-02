import JourneyPlanner from '../components/JourneyPlanner'

function Map() {
  return (
    <>
      <div className="map-layout">
        <div className="journey">
          <JourneyPlanner />
        </div>
        <div className="map-container">
          <img src="/images/map/marauders-map.png" alt="Marauder's Map" />
        </div>
      </div>
    </>
  )
}

export default Map
