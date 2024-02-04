import {Component} from 'react'

import Loader from 'react-loader-spinner'

import VaccinationCoverage from '../VaccinationCoverage'

import VaccinationByAge from '../VaccinationByAge'

import VaccinationByGender from '../VaccinationByGender'

import './index.css'

const apiStatusConstants = {
  initial: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class CowinDashboard extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    last7daysDetails: [],
    vaccineByAge: [],
    vaccineByGender: [],
  }

  componentDidMount() {
    this.getDetails()
  }

  getDetails = async () => {
    const {
      apiStatus,
      last7daysDetails,
      vaccineByAge,
      vaccineByGender,
    } = this.state
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const response = await fetch('https://apis.ccbp.in/covid-vaccination-data')
    if (response.ok === true) {
      const data = await response.json()
      const sevenDaysDetails = data.last_7_days_vaccination
      const vaccineAge = data.vaccination_by_age
      const vaccineGender = data.vaccination_by_gender
      const updatedSevenDaysDetails = sevenDaysDetails.map(eachDay => ({
        dose1: eachDay.dose_1,
        dose2: eachDay.dose_2,
        vaccineDate: eachDay.vaccine_date,
      }))

      this.setState({
        apiStatus: apiStatusConstants.success,
        last7daysDetails: updatedSevenDaysDetails,
        vaccineByAge: vaccineAge,
        vaccineByGender: vaccineGender,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderCowinDahsboard = () => {
    const {last7daysDetails, vaccineByAge, vaccineByGender} = this.state
    return (
      <>
        <VaccinationCoverage Item={last7daysDetails} />
        <VaccinationByGender genderItem={vaccineByGender} />
        <VaccinationByAge ageItem={vaccineByAge} />
      </>
    )
  }

  renderLoader = () => (
    <div data-testid="loader" className="loaderEl">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  renderFailureview = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-img"
      />
      <h1 className="failure-heading">Something went wrong</h1>
    </div>
  )

  renderAllDetails = () => {
    const {apiStatus} = this.state
    console.log(apiStatus)
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderCowinDahsboard()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      case apiStatusConstants.failure:
        return this.renderFailureview()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="bg-container">
        <div className="top-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
            alt="website logo"
            className="image"
          />
          <h1 className="main-heading">co-WIN</h1>
        </div>
        <p className="para">coWIN Vaccination in India</p>
        {this.renderAllDetails()}
      </div>
    )
  }
}

export default CowinDashboard
