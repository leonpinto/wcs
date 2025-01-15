import React from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

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

const Input = styled.input`
  padding: 8px;
  font-size: 16px;
`;

const Button = styled.button`
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
`;

export default function AddAccount() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = data => {
    console.log(data);
    // Implement the logic to add the account here, possibly sending data to a backend
  };

  return (
    <Container>
      <h1>Add New Account</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input {...register('name', { required: true })} placeholder="Name"/>
        {errors.name && <span>Name is required</span>}
        <Input {...register('email', {required: true})} placeholder="Email"/>
        <Input {...register('phone', {required: true})} placeholder="Phone "/>
        <Button type="submit">Add Account</Button>
      </Form>
    </Container>
  );
}
