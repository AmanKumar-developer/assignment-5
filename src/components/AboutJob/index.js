import {Component} from 'react' 
import './index.css' 
import Cookies from  'js-cookie'
import {AiFillStar} from 'react-icons/ai' 
import {MdLocationOn} from 'react-icons/md' 
import {BiLinkExternal} from 'react-icons/bi' 
import SimilarJobs from '../SimilarJobs' 
import Loader from 'react-loader-spinner' 
import Header from '../Header'


const apiStatusConstants = {   
   initial:'INITIAL', 
     success:'SUCCESS', 
      failure:'FAILURE',
    inProgress:'IN_PROGRESS', 
}   


class AboutJob extends Component{  
    state = {apiStatus:apiStatusConstants.initial,jobDataDetails:[],similarJobsData:[]} 

    componentDidMount(){
        this.getJobsData()
    } 

    getJobsData = async () => {
        const {match} = this.props 
        const {params} = match 
        const {id} = params   
        this.setState({
            apiStatus:apiStatusConstants.inProgress
        })
        const jwtToken = Cookies.get("jwt_token")
        const jobDetailsApiUrl = `https://apis.ccbp.in/jobs/${id}` 
        const optionsJobDetails = {
            headers:{
                Authorization:`Bearer ${jwtToken}`
            }, 
            method:"GET",
        } 
      const responseJobData = await  fetch(jobDetailsApiUrl,optionsJobDetails)  
      if(responseJobData.ok=== true){
      const fetchedJobData = await  responseJobData.json() 
      const updatedJobDetailsData = [fetchedJobData.job_details].map(eachItem=>({
          id:eachItem.id,
           companyLogoUrl:eachItem.company_logo_url, 
          companyWebsiteUrl:eachItem.company_website_url,
          employmentType:eachItem.employment_type,
           jobDescription: eachItem.job_description, 
           lifeAtCompany:{
               description:eachItem.life_at_company.description,
               imageUrl:eachItem.life_at_company.image_url,
           },
           location:eachItem.location,
            packagePerAnnum:eachItem.package_per_annum, 
            rating:eachItem.rating, 
            skills:eachItem.skills.map(eachSkill=>({
                imageUrl:eachSkill.image_url,
                name:eachSkill.name,
            })),
            title:eachItem.title,
      }),
      )  

      const updatedSimilarJobDetails = fetchedJobData.similar_jobs.map(eachItem=>({
          id: eachItem.id,
        companyLogoUrl: eachItem.company_logo_url,
        employmentType: eachItem.employment_type,
        jobDescription: eachItem.job_description,
        location: eachItem.location,
        rating: eachItem.rating,
        title: eachItem.title,
      }), 
      )
      this.setState({
          jobDataDetails:updatedJobDetailsData,
          similarJobsData:updatedSimilarJobDetails,
          apiStatus:apiStatusConstants.success,
      })
     
     }else {
        this.setState({
            apiStatus:apiStatusConstants.failure,
        })
    } 
}   

    renderJobDetailsSuccessView = () =>{
        const {jobDataDetails,similarJobsData} = this.state 
        if(jobDataDetails.length >=1){
            const {
                  companyLogoUrl, companyWebsiteUrl, employmentType,   
                  jobDescription,
                 lifeAtCompany,  description, imageUrl,location, rating, skills, name, 
                  packagePerAnnum, title, id, 

            } = jobDataDetails[0] 
            return(   
                <> 
                <div className="job-item-container">
                    <div className="first-part-container">
                        <div className="image-title-container">
                            <img src={companyLogoUrl} 
                            alt="job details company logo" 
                            className="company-logo" 
                            /> 
                        <div className="title-rating-container">
                            <h1 className="title">{title}</h1> 
                            <div className="star-rating-container">
                                 <AiFillStar className="star-icon" />
                               <p className="rating">{rating}</p>
                            </div>
                        </div>
                        </div> 
                        <div className="location-package-container">
                            <div className="location-job-type-container">
                                <div className="location-icon-location-container">
                                    <MdLocationOn className="location-icon" />
                                <p className="location">{location}</p>
                                </div>  
                                 <div className="employment-type-icons-employment-type-container">
                                  <p className="job-type">{employmentType}</p>
                                  </div>
                            </div> 
                              <p className="package">{packagePerAnnum}</p>
                                 </div>
                        </div>
                    </div> 
                     <hr className="item-he-line" /> 
                     <div className="second-part-container">
                         <div className="description-visit-container">
                             <h1 className="description-job-heading">Description</h1> 
                             <a className="visit-anchor" href={companyWebsiteUrl}>
                                 Visit <BiLinkExternal />
                             </a>
                         </div> 
                         <p className="description-para">{jobDescription}</p>
                     </div> 
                     <h1>Skills</h1> 
                     <ul className="ul-job-details-container">
                         {skills.map(eachItem=>(
                             <li className="li-job-details-container" key={eachItem.name}>
                                 <img  
                                 className="skill-img" 
                                 src={eachItem.imageUrl} 
                                 alt={eachItem.name} 
                                 /> 
                                 <p>{eachItem.name}</p>
                             </li>
                         ))}
                     </ul> 
                     <div className="company-life-img-container">
                         <div className="life-heading-para-container">
                             <h1>Life at Company</h1> 
                             <p>{lifeAtCompany.description}</p>
                         </div> 
                         <img src={lifeAtCompany.imageUrl} alt="life at company" />
                     </div>
                <h1 className="similar-jobs-heading">Similar Jobs<h1/> 
                <ul className="similar-jobs-ul-container">
                    {similarJobsData.map(eachItem=>(
                        <SimilarJobs 
                        key={eachItem.id} 
                        similarJobsData={eachItem} 
                        employmentType={employmentType} 
                        />
                    ))}
                </ul>  
            )
        } 
        return null
    } 

    renderJobLoadingView = () =>(
        <div className="loader-container" data-testid="loader">
  <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
</div>
    )  


  onRetryJobDetailsAgain = () =>(
      this.getJobsData()
  )


     renderJobFailureView = () =>(
         <div className="job-details-failure-view">
             <img src="https://assets.ccbp.in/frontend/react-js/failure-img.png" 
             alt="failure view" 
           /> 
           <h1>Oops! Something Went Wrong</h1> 
           <p>we cannot seem to find the page you are looking for.</p> 
           <div className="button-container-failure">
               <button 
               type="button" 
               className="failure-job-details-btn" 
               onClick={this.onRetryJobDetailsAgain}>
                   retry
               </button>
           </div>
         </div>
     )    
        
    renderJobDetails = () =>{
        const  {apiStatus} = this.state 
         switch(apiStatus){   
             case  apiStatusConstants.success:
                return  this.renderJobDetailsSuccessView() 
             case apiStatusConstants.failure:
                return this.renderJobFailureView()   
             case apiStatusConstants.inProgress:
                return this.renderJobLoadingView() 
             default:
              return null  
             
         }
    }
    


    render(){
        return(  
       <>  
       <Header /> 
       <div className="job-details-view-container">
           {this. renderJobDetails()}
       </div>
       </>

        )
    }
} 


export default AboutJob 