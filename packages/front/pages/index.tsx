import React from 'react';
import { Button, Spinner } from 'react-bootstrap';

const Index = () => {
  return (
    <Button variant="primary" disabled>
      <Spinner
        as="span"
        animation="grow"
        size="sm"
        role="status"
        aria-hidden="true"
      />
    Loading Pages...
    </Button>
  );
};

export default Index;
