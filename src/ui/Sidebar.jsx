import styled from "styled-components"

const StyledSidebar=styled.aside`
    background-color: var(--color-grey-0);
    padding: 1.2rem 4.8rem;
    border-right: 1px solid var(--color-grey-100);
   
    grid-row: 1 / 3;
   
`

export default function Sidebar() {
  return (
    <StyledSidebar>Sidebar</StyledSidebar>
  )
}
