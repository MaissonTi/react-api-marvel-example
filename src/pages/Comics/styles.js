import styled, { keyframes, css } from 'styled-components';

export const Loading = styled.div`
  color: #fff;
  text-shadow: 2px 2px #000;
  font-size: 20px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  flex-direction: column;
  margin-top: 150px;
  background-color: #2f00009e;
  padding: 10px;
`;

export const Owner = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  a {
    color: #fff;
    font-size: 16px;
    text-decoration: none;
    align-self: end;

    svg {
      height: 2em;
      width: 2em;
    }
  }
  img {
    width: 120px;
    border-radius: 50%;
  }
  h1 {
    font-size: 24px;
    margin-top: 10px;
  }
  p {
    margin-top: 5px;
    font-size: 14px;
    color: #999;
    line-height: 1.4;
    text-align: center;
    max-width: 400px;
  }
`;

export const IssueList = styled.ul`
  padding-top: 15px;
  margin-top: 30px;
  border-top: 3px solid #eee;
  list-style: none;
  li {
    display: flex;
    padding: 15px 10px;
    border-bottom: 3px solid red;
    & + li {
      margin-top: 10px;
    }
    img {
      width: 150px;
      height: 220px;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.16), 0 2px 10px rgba(0, 0, 0, 0.12);
    }
    div {
      flex: 1;
      margin-left: 15px;
      strong {
        font-size: 16px;
        p {
          font-size: 16px;
          text-decoration: none;
          color: #fff;
          display: block;
          &:hover {
            color: #e62429;
          }
        }
        span {
          background: #eee;
          color: #333;
          border-radius: 2px;
          font-size: 12px;
          font-weight: 600;
          height: 20px;
          padding: 3px 4px;
          margin-left: 10px;
        }
      }
      p {
        margin: 0px 0px 10px;

        font-size: 12px;
        color: #999;
      }
    }
  }
`;

export const DuvButton = styled.div`
  display: flex;
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const Button = styled.a.attrs(props => ({
  disabled: props.loading,
}))`
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  cursor: pointer;
  display: inline-block;
  margin: 15px auto;
  position: relative;
  -webkit-letter-spacing: 0;
  -moz-letter-spacing: 0;
  -ms-letter-spacing: 0;
  letter-spacing: 0;

  &:hover div span {
    color: red;
  }

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.6;
  }

  &:before,
  &:after {
    border-color: #fff;
    -webkit-transition: none;
    height: 16px;
    position: relative;
    border-style: solid;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    content: '';
    display: block;
  }

  &:after {
    margin-right: 16px;
    border-width: 0 0 1px 1px;
  }

  &:before {
    border-width: 1px 1px 0 0;
    margin-left: 16px;
  }

  div {
    border-left: 1px solid #fff;
    border-right: 1px solid #fff;
    -webkit-transition: none;
    transition: none;
    line-height: 16px;
    padding: 0px 35px;

    span {
      ${props =>
        props.loading &&
        css`
          svg {
            animation: ${rotate} 2s linear infinite;
          }
        `}
    }

    &:before,
    &:after {
      border-style: solid;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      content: '';
      display: block;
      border-color: transparent;
      border-width: 0 0 16px 16px;
      position: absolute;
    }

    &:before {
      left: 0;
      top: 0;
      background-size: 16px 24px;
      background-image: repeating-linear-gradient(
        -45deg,
        #fff,
        #fff 1px,
        transparent 0,
        transparent 16px
      );
      -webkit-transition: none;
      transition: none;
    }

    &:after {
      bottom: 0;
      right: 0;
      background-size: 16px 24px;
      background-image: repeating-linear-gradient(
        -46deg,
        #fff,
        #fff 1px,
        transparent 0,
        transparent 16px
      );
      -webkit-transition: none;
      transition: none;
    }
  }
`;

export const Title = styled.h1`
  margin: 15px auto;
  max-width: 90px;
  letter-spacing: 4px;
`;
