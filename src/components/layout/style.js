import styled from 'styled-components'
export const Container = styled.div`
    width:768px;
    max-width:100%;
    margin:0 auto;
    padding:10px;
    font-size:26px;
    font-weight:bold;
    ${(p) => p.isActive && `
    color:blue;
    `}
`
