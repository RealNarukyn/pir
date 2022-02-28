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
color: rgb(219,219,1);
text-decoration: none;
&:hover {
  color: rgb(255,255,1);
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
