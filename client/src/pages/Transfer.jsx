import React, { useState } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const Form = styled.form`
  display: grid;
  gap: 10px;
  width: 300px;
`;

const Title = styled.h1`
  margin-bottom: 20px;
`;

const Input = styled.input`
  padding: 8px;
  font-size: 16px;
`;

const Button = styled.button`
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
`;

const ActionButtons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

const Dropdown = styled.select`
  padding: 8px;
  font-size: 16px;
  cursor: pointer;
  margin-bottom: 10px;
`;

export default function Transfer() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [transactionType, setTransactionType] = useState('');

  const handleTransactionChange = (event) => {
    setTransactionType(event.target.value);
  };

  const onSubmit = data => {
    console.log(data);
    console.log(`Transaction type selected: ${transactionType}`);
    // Here you could integrate API calls to process the transaction
  };

  return (
    <Container>
      <Title>Electronic Transfer</Title>
      <Dropdown onChange={handleTransactionChange} value={transactionType}>
        <option value="">Select Transaction Type</option>
        <option value="deposit">Deposit</option>
        <option value="withdraw">Withdraw</option>
      </Dropdown>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input {...register('fromAccount', { required: true })} placeholder="From Account"/>
        {errors.fromAccount && <span>This field is required</span>}
        <Input {...register('toAccount', { required: true })} placeholder="To Account"/>
        {errors.toAccount && <span>This field is required</span>}
        <Input {...register('amount', { required: true })} placeholder="Amount"/>
        {errors.amount && <span>This field is required</span>}
        <Button type="submit">Transfer</Button>
      </Form>
      <ActionButtons>
        <Button type="button" onClick={() => navigate('/add-account')}>Add New Account</Button>
      </ActionButtons>
    </Container>
  );
}
