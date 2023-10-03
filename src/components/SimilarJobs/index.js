import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'

import './index.css'

const SimilarJobs = props => {
  const {SimilarJobItem} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = SimilarJobItem
  console.log(SimilarJobItem)
  return (
    <li className="similar-job-container">
      <div className="image-job-title-container">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
          className="similar-job-image"
        />
        <div className="title-job-rating-container">
          <h1 className="title-job-heading">{title}</h1>
          <div className="star-job-rating-container">
            <AiFillStar className="star-icons" />
            <p className="rating-job-text">{rating}</p>
          </div>
        </div>
      </div>
      <div className="second-part-job-container">
        <h1 className="description-job-heading">Description</h1>
        <p className="description-job-para">{jobDescription}</p>
      </div>
      <div className="location-job-details-type-container">
        <div className="location-job-icon-type-container">
          <MdLocationOn className="location-icon" />
          <p className="location-name">{location}</p>
        </div>
        <div className="location-job-icon-employment-type-container">
          <p className="job-type">{employmentType}</p>
        </div>
      </div>
    </li>
  )
}

export default SimilarJobs
