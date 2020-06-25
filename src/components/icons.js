import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons'

export const IconType = {
    Twitter: 'twitter',
    LinkedIn: 'linkedin',
}

export default function Icon ( {type} ) {
    switch (type) {
        case IconType.Twitter : 
            return <FontAwesomeIcon icon={faTwitter} />
        case IconType.LinkedIn :
            return <FontAwesomeIcon icon={faLinkedin} />
        default:
            return null;
    }
   
}