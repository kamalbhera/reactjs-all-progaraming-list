import { useEffect, useState} from 'react'
import {RotatingLines} from 'react-loader-spinner'
import { useParams } from 'react-router'
import CourseDetailsItem from '../CourseDetailsItem'
import Header from '../Header'

import {
  CourseDetailsListContainer,
  ErrorContainer,
  ErrorImg,
  ErrorHeading,
  ErrorInfo,
  ErrorRetryButton,
  LoaderContainer,
} from './styledComponents'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const CourseDetails = () => {
  const { id } = useParams();
  const [CourseDetailsList, setCourseDetailsList] = useState([])
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)
 
  useEffect(() =>{
    getCourseDetails()
  },[])

  const onClickRetry = () => {
    getCourseDetails()
  }

  const renderFailureView = () => (
    <ErrorContainer>
      <ErrorImg
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
      />
      <ErrorHeading>Oops! Something Went Wrong</ErrorHeading>
      <ErrorInfo>
        We cannot seem to find the page you are looking for.
      </ErrorInfo>
      <ErrorRetryButton
        type="button"
        className="retry-button"
        onClick={onClickRetry}
      >
        Retry
      </ErrorRetryButton>
    </ErrorContainer>
  )

  const getCourseDetails = async () => {
    setApiStatus( apiStatusConstants.inProgress)
    const url = `https://apis.ccbp.in/te/courses/${id}`
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = [fetchedData.course_details].map(each => ({
        id: each.id,
        name: each.name,
        imageUrl: each.image_url,
        description: each.description,
      }))
      setCourseDetailsList(updatedData)
      setApiStatus(apiStatusConstants.success)
    } else {
      setApiStatus(apiStatusConstants.failure)
    }
  }

  const renderCourseDetailsView = () => {
    return (
      <CourseDetailsListContainer>
        {CourseDetailsList.map(each => (
          <CourseDetailsItem key={each.id} courseItemDetails={each} />
        ))}
      </CourseDetailsListContainer>
    )
  }

  const renderLoader = () => (
    <LoaderContainer data-testid="loader">
      <RotatingLines strokeColor="grey"
      strokeWidth="5"
      animationDuration="0.75"
      visible={true} />
    </LoaderContainer>
  )

  const renderCourseDetails = () => {
    switch (apiStatus) {
      case apiStatusConstants.success:
        return renderCourseDetailsView()
      case apiStatusConstants.failure:
        return renderFailureView()
      case apiStatusConstants.inProgress:
        return renderLoader()
      default:
        return null
    }
  }

    return (
      <>
        <Header />
        {renderCourseDetails()}
      </>
    )
}

export default CourseDetails