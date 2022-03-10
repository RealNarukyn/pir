import React from 'react';
import styled from 'styled-components';

const ErrorMessageText = styled.p`
margin:0;
color:red
`;

export const Error:React.FC<{field:any; errors:any}> = ({ field, errors }) => {
  if (errors[field]) {
    return <ErrorMessageText>{errors[field].message}</ErrorMessageText>;
  }
  return <></>;
};
