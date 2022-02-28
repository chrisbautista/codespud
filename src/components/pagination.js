import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"
import Icon, { IconType } from "./icons"

const PaginationNav = styled.ul`
  display: inline-flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  min-width: 50px;
  list-style: none;
  padding: 0;
  margin: 2rem 0 2rem;
  float: right;

  li {
    margin-left: 0;
    list-style: none;

    span {
      color: #aaa;
    }
  }

  .page-numbers {
    font-size: 1.2rem;
  }

  svg {
    transform: scale(2);
  }

  a, span {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    margin: 0 4px;
    width: 44px;
    height: 44px;
  }
  
  a {
    text-decoration: none;
  }
`

const Pagination = ({
  numPages,
  prevPage,
  currentPage,
  nextPage,
  isFirst,
  isLast,
  showPageNumbers = false,
  ctx,
}) => {
  return (
    <PaginationNav>
      <li>
        {!isFirst ? (
          <Link to={prevPage} rel="prev" aria-label={ctx.i18n.Back}>
            <Icon type={IconType.Back} />
          </Link>
        ) : <span>
          <Icon type={IconType.Back} />
        </span>}
      </li>
      {showPageNumbers &&
        Array.from({ length: numPages }, (_, i) => {
          if (currentPage !== i+1) {
            return null;
          }
          
          return <li
            className="page-numbers"
            key={`pagination-number${i + 1}`}
            style={{
              margin: 0,
            }}
          >
            <Link
              to={`/${i === 0 ? "" : i + 1}`}
              
            >
              {i + 1} / {numPages}
            </Link>
          </li>
        })}
      <li>
        {!isLast ? (
          <Link to={nextPage} rel="next" aria-label={ctx.i18n.Next}>
            <Icon type={IconType.Next} />
          </Link>
        ) : <span>
          <Icon type={IconType.Next} />
        </span>
        }
      </li>
    </PaginationNav>
  )
}

export default Pagination
