import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"

const PaginationNav = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  list-style: none;
  padding: 0;
`

const Pagination = ({
  numPages,
  prevPage,
  currentPage,
  nextPage,
  isFirst,
  isLast,
  showPageNumbers = false,
}) => (
  <PaginationNav>
    <li>
      {!isFirst && (
        <Link to={prevPage} rel="prev">
          ← Previous Page
        </Link>
      )}{" "}
      &nbsp;
    </li>
    {showPageNumbers &&
      Array.from({ length: numPages }, (_, i) => (
        <li
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
      {!isLast && (
        <Link to={nextPage} rel="next">
          Next Page →
        </Link>
      )}
      &nbsp;
    </li>
  </PaginationNav>
)

export default Pagination
