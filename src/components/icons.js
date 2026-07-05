import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faTwitter,
  faLinkedin,
  faGithub,
} from "@fortawesome/free-brands-svg-icons"

export const IconType = {
  Twitter: "twitter",
  LinkedIn: "linkedin",
  Github: "github",
}

export default function Icon({ type, style }) {
  switch (type) {
    case IconType.Twitter:
      return <FontAwesomeIcon icon={faTwitter} style={style} />
    case IconType.LinkedIn:
      return <FontAwesomeIcon icon={faLinkedin} style={style} />
    case IconType.Github:
      return <FontAwesomeIcon icon={faGithub} style={style} />
    default:
      return null
  }
}
