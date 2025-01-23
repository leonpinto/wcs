import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/pages/_transfer.scss'; // Ensure you have this SCSS file created based on the earlier provided styles

const Transfer = () => {
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
    <div className="transfer">
      <div className="container">
        <h1>Electronic Transfer</h1>
        <select 
          className="dropdown"
          onChange={handleTransactionChange}
          value={transactionType}
        >
          <option value="">Select Transaction Type</option>
          <option value="deposit">Deposit</option>
          <option value="withdraw">Withdraw</option>
        </select>
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <input 
            {...register('fromAccount', { required: true })}
            placeholder="From Account"
          />
          {errors.fromAccount && <span>This field is required</span>}

          <input 
            {...register('toAccount', { required: true })}
            placeholder="To Account"
          />
          {errors.toAccount && <span>This field is required</span>}

          <input 
            {...register('amount', { required: true })}
            placeholder="Amount"
          />
          {errors.amount && <span>This field is required</span>}

          <button type="submit">Transfer</button>
        </form>
        <div className="action-buttons">
          <button type="button" onClick={() => navigate('/add-account')}>Add New Account</button>
        </div>
      </div>
    </div>
  );
};

export default Transfer;
