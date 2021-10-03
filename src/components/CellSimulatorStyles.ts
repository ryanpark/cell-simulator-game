import styled from 'styled-components';

const primaryColor = 'rgb(65, 182, 230)';
const secondaryColor = 'rgb(235, 236, 237)';

const Simulator = styled.div`
    background: #fff;
    display: flex;
    flex-direction: column;
`;

const Wrapper = styled.div`
   margin-top: 50px;
`;

const GameBoard = styled.div<{col: number, row: number}>`
    display: grid;
    ${props =>`
        grid-template-columns: repeat(${props.col}, 25px);
        grid-template-rows: repeat(${props.row}, 25px);
        justify-content: center;
    `}
`;

const Buttons = styled.div`
    margin-top: 20px;
    display: flex;
    justify-content: center;
`
const Button = styled.button`
    border: 0;
    border-radius: 0.25rem;
    background: ${primaryColor};
    color: black;
    font-family: -system-ui, sans-serif;
    font-size: 1rem;
    line-height: 1.2;
    white-space: nowrap;
    text-decoration: none;
    padding: 0.25rem 0.5rem;
    margin: 0.25rem 1rem 0.25rem;
    cursor: pointer;
`
const Cell = styled.div<{cellState: string}>`
    border: 1px solid white;
    cursor: pointer;
    ${props => props.cellState === 'dead' ? `
        background: ${secondaryColor};
    `:`background: ${primaryColor}`};
`
export { 
    Simulator,
    GameBoard,
    Buttons,
    Button,
    Wrapper,
    Cell,
}
