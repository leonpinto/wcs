import React from 'react';
import { useForm } from 'react-hook-form';
import '../assets/styles/pages/_addAccount.scss'; // Ensure you have this SCSS file created based on the earlier provided styles

export default function AddAccount() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = data => {
    console.log(data);
    // Implement the logic to add the account here, possibly sending data to a backend
  };

  return (
    <div className="add-account">
      <div className="container">
        <h1>Add New Account</h1>
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <input 
            {...register('name', { required: true })}
            placeholder="Name"
          />
          {errors.name && <span>Name is required</span>}

          <input 
            {...register('email', { required: true })}
            placeholder="Email"
          />
          {errors.email && <span>Email is required</span>}

          <input 
            {...register('phone', { required: true })}
            placeholder="Phone"
          />
          {errors.phone && <span>Phone is required</span>}

          <button type="submit">Add Account</button>
        </form>
      </div>
    </div>
  );
}
