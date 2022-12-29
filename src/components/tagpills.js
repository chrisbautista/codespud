import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"
import _  from "lodash"

export default function Tags({ tags }) {
    if (!tags || tags.length <= 0) {
        return null;
    }

    return <TagContainer>
        {tags.map(tag => {
            return <Link key={tag} to={`/tags/${_.kebabCase(tag)}`} className="tag-pill">{tag}</Link>;
        })}
    </TagContainer>;
}


const TagContainer = styled.span`
  display: flex;
  width: 100%;
  max-width: 1024px;
  justify-content: center;
  margin: 0 auto;
  flex-wrap: wrap;

  a {
    font-weight: bold;
    margin: 0 5px 10px;
    font-size: 1rem;
  }
`;
