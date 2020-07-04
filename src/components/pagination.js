import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"
import Icon, { IconType } from "./icons"

const PaginationNav = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  list-style: none;
  padding: 0;
  margin: 2rem 0 2rem;

  li {
    margin-left: 0;
  }

  li.page-numbers {
    width: 30px;
  }

  a {
    padding: 8px 2px 6px;
    text-decoration: none;
    :hover {
      border-bottom: 2px solid #999;
    }
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
          <Link to={prevPage} rel="prev">
            <Icon type={IconType.Back} /> {ctx.i18n.Back}
          </Link>
        ) : (
          <span>
            <Icon type={IconType.Back} /> {ctx.i18n.Back}
          </span>
        )}
      </li>
      {showPageNumbers &&
        Array.from({ length: numPages }, (_, i) => (
          <li
            className="page-numbers"
            key={`pagination-number${i + 1}`}
            style={{
              margin: 0,
            }}
          >
            <Link
              to={`/${i === 0 ? "" : i + 1}`}
              style={{
                textDecoration: "none",
                color: i + 1 === currentPage ? "#ffffff" : "",
                background: i + 1 === currentPage ? "#007acc" : "",
              }}
            >
              {i + 1}
            </Link>
          </li>
        ))}
      <li>
        {!isLast ? (
          <Link to={nextPage} rel="next">
            {ctx.i18n.Next} <Icon type={IconType.Next} />
          </Link>
        ) : (
          <span>
            {ctx.i18n.Next} <Icon type={IconType.Next} />
          </span>
        )}
      </li>
    </PaginationNav>
  )
}

export default Pagination
