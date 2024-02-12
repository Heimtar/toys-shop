import React from "react"
import ContentLoader from "react-content-loader"

const MyLoader = () => (
  <ContentLoader 
    speed={2}
    width={235}
    height={480}
    viewBox="0 0 235 480"
    backgroundColor="#f2f2f2"
    foregroundColor="#ecebeb"
    
  >
    <rect x="25" y="25" rx="10" ry="10" width="200" height="255" /> 
    <rect x="25" y="290" rx="5" ry="5" width="200" height="70" /> 
    <rect x="25" y="375" rx="5" ry="5" width="150" height="55" /> 
    <circle cx="283" cy="401" r="17" /> 
    <circle cx="199" cy="401" r="20" />
  </ContentLoader>
)

export default MyLoader