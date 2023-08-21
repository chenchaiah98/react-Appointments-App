// Write your code here
import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import {format} from 'date-fns'
import './index.css'
import AppointmentItem from '../AppointmentItem/index'

class Appointments extends Component {
  state = {
    title: '',
    date: '',
    appointmentList: [],
    isFilter: false,
  }

  filterStared = () => {
    this.setState(prevState => ({isFilter: !prevState.isFilter}))
    this.stared()
  }

  stared = () => {
    const {appointmentList, isFilter} = this.state
    const filterStarList = appointmentList.filter(
      each => each.isStarted !== isFilter,
    )
    this.setState(() => ({
      appointmentList: filterStarList,
    }))
  }

  onStart = id => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(each => {
        if (id === each.id) {
          return {...each, isStarted: !each.isStarted}
        }
        return each
      }),
    }))
  }

  titleInput = titleEvent => {
    this.setState({title: titleEvent.target.value})
  }

  dateInput = dateEvent => {
    this.setState({
      date: dateEvent.target.value,
    })
  }

  addAppointment = () => {
    const {title, date} = this.state
    if (title !== '' && date !== '') {
      const newAppointment = {
        id: uuidv4(),
        title,
        date: format(new Date(date), 'dd MMMM yyyy, EEEE'),
        isStarted: false,
      }

      this.setState(prevState => ({
        appointmentList: [...prevState.appointmentList, newAppointment],

        title: '',
        date: '',
      }))
    }
  }

  render() {
    const {title, date, appointmentList, isFilter} = this.state

    return (
      <div className="main-app-container">
        <div className="appointment-container">
          <div className="appointment-details-container">
            <div className="appointment-details">
              <h1>Add Appointment</h1>
              <form>
                <label htmlFor="Title">Title</label>
                <br />
                <input
                  type="text"
                  id="Title"
                  value={title}
                  onChange={this.titleInput}
                  placeholder="Title"
                />
                <br />
                <label htmlFor="Date">Date</label>
                <br />
                <input
                  type="date"
                  id="Date"
                  name="Date"
                  value={date}
                  onChange={this.dateInput}
                />
                <br />
                <button type="button" onClick={this.addAppointment}>
                  Add
                </button>
              </form>
            </div>
            <div className="appointment-details-image">
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
              />
            </div>
          </div>
          <hr />
          <div>
            <div className="d-flex space-between">
              <h3>Appointments</h3>
              <button
                type="button"
                className={isFilter ? `star-button active` : `star-button`}
                onClick={this.filterStared}
              >
                Starred
              </button>
            </div>

            <ul className="list-appointments">
              {appointmentList.map(each => (
                <li key={each.id}>
                  <AppointmentItem eachDetails={each} onStart={this.onStart} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
export default Appointments
