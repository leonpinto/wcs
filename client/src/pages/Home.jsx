import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 36px;
  color: #333;
`;

const Subtitle = styled.h2`
  font-size: 24px;
  color: #555;
  margin-top: 0;
`;

const Text = styled.p`
  font-size: 16px;
  color: #666;
  max-width: 600px;
  text-align: center;
`;

const Highlight = styled.span`
  color: #025f99;
  font-weight: bold;
`;

export default function Home() {
  return (
    <Container>
      <Title>Welcome to Your Banking Partner</Title>
      <Subtitle>Reliable. Secure. Convenient.</Subtitle>
      <Text>
        Discover seamless <Highlight>banking experiences</Highlight> tailored to meet your personal and business needs. Manage your accounts, make transfers, apply for loans, and much more—all from the comfort of your home.
      </Text>
      <Text>
        Quick and easy access to all your <Highlight>transaction details</Highlight>, with state-of-the-art security to keep your financial information safe.
      </Text>
      <Text>
        Need assistance? Our dedicated customer service team is here to help you every step of the way.
      </Text>
    </Container>
  );
}
