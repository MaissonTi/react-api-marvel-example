import styled, { keyframes, css } from 'styled-components';

export const Form = styled.form`
  margin-top: 30px;
  display: flex;
  flex-direction: row;
  input {
    flex: 1;
    border: 1px solid ${props => (props.error ? '#ff6b6b' : '#eee')};
    padding: 10px 15px;
    border-radius: 4px;
    font-size: 16px;
    transition: border 0.25s ease-out;
    color: black;
  }
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const SubmitButton = styled.button.attrs(props => ({
  type: 'submit',
  disabled: props.loading,
}))`
  background: #e62429;
  border: 0;
  padding: 0 15px;
  margin-left: 10px;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  &[disabled] {
    cursor: not-allowed;
    opacity: 0.6;
  }
  ${props =>
    props.loading &&
    css`
      svg {
        animation: ${rotate} 2s linear infinite;
      }
    `}
`;

export const List = styled.ul`
  list-style: none;
  li {
    padding: 15px 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    & + li {
      border-top: 1px solid #eee;
    }
    a {
      background-color: transparent;
      border-radius: 0;
      border: none;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      cursor: pointer;
      display: inline-block;
      font-weight: 700;
      overflow: hidden;
      padding: 0;
      position: relative;
      letter-spacing: 0;
      width: auto;
      z-index: 10;
      text-decoration: none;
      margin-left: 15px;

      &:before,
      &:after {
        background-color: #e62429;
        border-color: #e62429;
        -webkit-transition: none;
        transition: none;
        height: 16px;
        position: relative;
        border-style: solid;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        content: '';
        display: block;
      }

      &:after {
        border-width: 16px 16px 0 0;
        bottom: 0;
        margin-right: 16px;
      }

      &:before {
        border-width: 0 0 16px 16px;
        margin-left: 16px;
        top: 0;
      }

      div {
        color: #fff;
        background-color: #e62429;
        -webkit-transition: none;
        transition: none;
        text-align: center;
        line-height: 16px;
        font: 800 14px/1 Roboto Bold, Trebuchet MS, Helvetica, Arial, sans-serif;
        text-transform: uppercase;
        padding: 0px 35px;

        &:before,
        &:after {
          border-color: #e62429 transparent;
          -webkit-transition: none;
          transition: none;
          border-style: solid;
          -webkit-box-sizing: border-box;
          box-sizing: border-box;
          content: '';
          display: block;
          border-width: 0 0 16px 16px;
          position: absolute;
        }

        &:before {
          left: 0;
          top: 0;
        }

        &:after {
          bottom: 0;
          right: 0;
          -webkit-transform: rotate(180deg);
          transform: rotate(180deg);
        }
      }
    }
  }

  opacity: ${props => (props.loading ? '0.3' : 'unset')};
`;

export const DivInfo = styled.div`
  display: flex;
  align-items: center;

  img {
    width: 90px;
    height: 90px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.16), 0 2px 10px rgba(0, 0, 0, 0.12);
  }

  div {
    span {
      margin: 0px 10px;
      font-size: 18px;
      font-weight: bold;
      color: #fff;
    }
    p {
      margin-top: 5px;
      font-size: 12px;
      color: #999;
      max-width: 400px;
      margin-left: 10px;
    }
  }
`;

export const PageActions = styled.div`
  padding-top: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;

  button {
    background-color: black;
    transition: opacity 0.25s ease-out;
    border-radius: 4px;
    outline: 0;
    border: 0;
    padding: 8px;
    &:disabled {
      opacity: 0.35;
      cursor: not-allowed;
    }
  }
`;

export const Title = styled.h1`
  margin: 15px auto;
  max-width: 237px;
  letter-spacing: 4px;
  opacity: ${props => (props.loading ? '0.3' : 'unset')};
`;
