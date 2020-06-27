import styled from "styled-components"

const Container = styled.div`
  margin: 0 auto;
  padding: 0 15%;
  max-width: 960px;

  @media screen and (max-width: 959px) {
    padding: 0 5%;
  }

  @media screen and (max-width: 767px) {
    padding: 0 1rem;
  }
`

export default Container
