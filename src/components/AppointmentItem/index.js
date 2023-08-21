// Write your code here
import './index.css'

const AppointmentItem = props => {
  const {eachDetails, onStart} = props
  const {date, title, isStarted, id} = eachDetails

  const startBtn = () => {
    onStart(id)
  }

  return (
    <div className="list-item d-flex space-between">
      <div className="appointment-details">
        <p>{title}</p>
        <p>{`Date: ${date}`}</p>
      </div>
      <div>
        <button
          data-testid="star"
          type="button"
          className="button"
          onClick={startBtn}
        >
          <img
            src={
              isStarted
                ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
                : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
            }
            alt="star"
          />
        </button>
      </div>
    </div>
  )
}

export default AppointmentItem
