import styled from 'styled-components';

const background = '#f9f2f2';
// const textColor = 'rgb(43, 39, 39)';
const checkboxBorder = '#3d9863';
const checkboxColor = '#6ec26eb5';
// const white = '#ffffff';
const todoBorder = '#c0bbbb8f';
const btnTextColor = '#2f2b2b';
const actionBtnHoveredColor = '#ece2e2';
// const actionBtnColor = '#c6b9b9';

export const FlexContainer = styled.div`
    display: flex;
    justify-content: center;
`;

export const Footer = styled.footer`
    bottom: 5px;
    left: 20%;
    right: 20%;
    text-align: center;
    padding-bottom: 5px;
`;

export const FooterText = styled.div`
    font-family: monospace;
    padding-bottom: 3%;
    padding-top: 5%;
    &a{
        text-decoration: none;
        color: #9a5a89;
    }
`;
export const ListTitle = styled.div`
    padding-top: 10vh;
    padding-bottom: 5vh;
`;
export const TitleInput = styled.input`
    font-size: 3rem;
    text-align: center;
    cursor: pointer;
    border: none;
    background: transparent;
    outline: none;
    width: 90%;
    font-family: inherit;
    height: fit-content;
`;

export const ListContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-bottom: 20px;
`;

export const ItemContainer = styled.div`
    display: flex;
    align-items: center;
    margin: 0.25rem 0;
    border: solid ${todoBorder};
    padding: 2px 10px;
    border-radius: 10px;
    min-width: 50%;
    width: 80%;
    position: relative;
`;

export const ItemIndex = styled.span`
    cursor: pointer;
`

export const ItemCheckbox = styled.div`
    margin: 0 10px;
    display: flex;
    width: 25px;
    height: 22px;
    border-radius: 50%;
    font-size: 13px;
    cursor: pointer;
    justify-content: center;
    align-items: center;
    transition: background-color .2s ease-in-out;
    border: 1px solid ${checkboxBorder};
    &:hover{
        background: ${checkboxColor};
        border: 1px solid rgba(255, 255, 255, 0);
    }
`

export const ItemTextContainer = styled.div`
    width: 100%;
    padding-right: 3%;
    display: inline-block;
`

export const ItemText = styled.textarea`
    border: none;
    background: transparent;
    font-size: 1.2rem;
    outline: none;
    width: 100%;
    font-family: inherit;
    /* text-wrap: pretty; */
    overflow: auto;
    resize: none;
    height: fit-content;
    /* necessary for line break in textarea works in mobile browser */
    overflow-wrap: break-word;
    word-wrap: break-word;
    white-space: pre-line;

    &::-webkit-scrollbar {
        width: 4px;
    }
    &::-webkit-scrollbar-track {background: ${background};}
    &::-webkit-scrollbar-thumb {
        background: ${todoBorder};
    }
`

export const Button = styled.button`
    border-color: transparent;
    color:  ${btnTextColor};
    cursor: pointer;
    &:hover{
        background:${actionBtnHoveredColor}
    }
`