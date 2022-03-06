import React from 'react';
import styled from 'styled-components';
import { useUser } from '@auth0/nextjs-auth0';

const StyledBtn = styled.button`
padding: 0.5em 1em;
background: black;
border: none;
border-radius: 1999px;
`;

const StyledAnchor = styled.a`
color: #e1dddd;
text-decoration: none;
&:hover {
  color: #ffffff;
}
`;

export const SessionBtn = () => {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <div>
      <StyledBtn>
        {user ? (
          <StyledAnchor href="/api/auth/logout">
              TANCA {user.name}
          </StyledAnchor>
            ) : (
              <StyledAnchor href="/api/auth/login">
                ACCÉS USUARI
              </StyledAnchor>
            )
        }
      </StyledBtn>
    </div>
  );
};
