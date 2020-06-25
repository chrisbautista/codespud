import styled from "styled-components"

const Container = styled.div`
  margin: 0 auto;
  padding: 0 15%;
  max-width: 1100px;

  @media screen and (max-width: 1099px) {
    padding: 0 5%;
  }

  @media screen and (max-width: 767px) {
    padding: 0 2rem;
  }
`

export default Container
