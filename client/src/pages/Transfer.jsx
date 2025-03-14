// import React, { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { useNavigate } from 'react-router-dom';
// import '../assets/styles/pages/_transfer.scss'; // Ensure you have this SCSS file created based on the earlier provided styles

// const Transfer = () => {
//   const navigate = useNavigate();
//   const { register, handleSubmit, formState: { errors } } = useForm();
//   const [transactionType, setTransactionType] = useState('');

//   const handleTransactionChange = (event) => {
//     setTransactionType(event.target.value);
//   };

//   const onSubmit = data => {
//     console.log(data);
//     console.log(`Transaction type selected: ${transactionType}`);
//     // Here you could integrate API calls to process the transaction
//   };

//   return (
//     <div className="transfer">
//       <div className="container">
//         <h1>Electronic Transfer</h1>
//         <select 
//           className="dropdown"
//           onChange={handleTransactionChange}
//           value={transactionType}
//         >
//           <option value="">Select Transaction Type</option>
//           <option value="deposit">Deposit</option>
//           <option value="withdraw">Withdraw</option>
//           <option value="withdraw">Interac</option>
//         </select>
//         <form className="form" onSubmit={handleSubmit(onSubmit)}>
//           <input 
//             {...register('fromAccount', { required: true })}
//             placeholder="From Account"
//           />
//           {errors.fromAccount && <span>This field is required</span>}

//           <input 
//             {...register('toAccount', { required: true })}
//             placeholder="To Account"
//           />
//           {errors.toAccount && <span>This field is required</span>}

//           <input 
//             {...register('amount', { required: true })}
//             placeholder="Amount"
//           />
//           {errors.amount && <span>This field is required</span>}

//           <button type="submit">Transfer</button>
//         </form>
//         <div className="action-buttons">
//           <button type="button" onClick={() => navigate('/add-account')}>Add New Account</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Transfer;

// -----------------
// import React, { useState } from 'react'; 
// import { useForm } from 'react-hook-form';
// import { useNavigate } from 'react-router-dom';

// const API_URL = 'http://localhost:3000/api';

// const Transfer = () => {
//   const navigate = useNavigate();
//   const { register, handleSubmit, formState: { errors } } = useForm();
//   const [transactionType, setTransactionType] = useState('');

//   const handleTransactionChange = (event) => {
//     setTransactionType(event.target.value);
//   };

//   const onSubmit = async (data) => {
//     console.log(`🔵 Transaction Type: ${transactionType}`);
//     console.log("📩 Sending Transfer Data:", data);

//     let endpoint = "";
//     if (transactionType === "deposit") {
//       endpoint = "/deposit";
//     } else if (transactionType === "withdraw") {
//       endpoint = "/withdraw";
//     } else if (transactionType === "interac") {
//       endpoint = "/etransfer";
//     }

//     if (!endpoint) {
//       console.error("❌ No valid transaction type selected.");
//       return;
//     }

//     try {
//       const response = await fetch(`${API_URL}${endpoint}`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           fromAccount: data.fromAccount,
//           toAccount: data.toAccount,
//           amount: parseFloat(data.amount),
//         }),
//       });

//       const result = await response.json();
//       console.log("✅ Transaction Response:", result);

//       if (!result.success) {
//         alert(result.message);
//       } else {
//         alert(`✅ Transaction successful!`);
//         navigate('/transactions');
//       }
//     } catch (error) {
//       console.error("❌ Error processing transaction:", error);
//       alert("Something went wrong. Try again later.");
//     }
//   };

//   return (
//     <div className="transfer">
//       <div className="container">
//         <h1>Electronic Transfer</h1>
//         <select 
//           className="dropdown"
//           onChange={handleTransactionChange}
//           value={transactionType}
//         >
//           <option value="">Select Transaction Type</option>
//           <option value="deposit">Deposit</option>
//           <option value="withdraw">Withdraw</option>
//           <option value="interac">Interac</option>
//         </select>

//         <form className="form" onSubmit={handleSubmit(onSubmit)}>
//           <input 
//             {...register('fromAccount', { required: true })}
//             placeholder="From Account (Your Name)"
//           />
//           {errors.fromAccount && <span>This field is required</span>}

//           <input 
//             {...register('toAccount', { required: true })}
//             placeholder="To Account (Recipient Name)"
//           />
//           {errors.toAccount && <span>This field is required</span>}

//           <input 
//             {...register('amount', { required: true })}
//             placeholder="Amount"
//           />
//           {errors.amount && <span>This field is required</span>}

//           <button type="submit">Transfer</button>
//         </form>

//         <div className="action-buttons">
//           <button type="button" onClick={() => navigate('/add-account')}>Add New Account</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Transfer;


import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/pages/_transfer.scss'; // Ensure the SCSS file exists

const API_URL = 'http://localhost:3000/api';

const Transfer = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [transactionType, setTransactionType] = useState('');

  const handleTransactionChange = (event) => {
    setTransactionType(event.target.value);
  };

  const onSubmit = async (data) => {
    console.log(`🔵 Transaction Type: ${transactionType}`);
    console.log("📩 Sending Transfer Data:", data);

    let endpoint = "";
    if (transactionType === "deposit") {
      endpoint = "/deposit";
    } else if (transactionType === "withdraw") {
      endpoint = "/withdraw";
    } else if (transactionType === "interac") {
      endpoint = "/etransfer";
    }

    if (!endpoint) {
      console.error("❌ No valid transaction type selected.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fromAccount: data.fromAccount,
          toAccount: data.toAccount,
          amount: parseFloat(data.amount),
        }),
      });

      const result = await response.json();
      console.log("✅ Transaction Response:", result);

      if (!result.success) {
        alert(result.message);
      } else {
        alert(`✅ Transaction successful!`);
        navigate('/transactions'); // Redirect to transactions page
      }
    } catch (error) {
      console.error("❌ Error processing transaction:", error);
      alert("Something went wrong. Try again later.");
    }
  };

  return (
    <div className="transfer">
      <div className="container">
        <h1>Electronic Transfer</h1>
        
        {/* Transaction Type Dropdown */}
        <select 
          className="dropdown"
          onChange={handleTransactionChange}
          value={transactionType}
        >
          <option value="">Select Transaction Type</option>
          <option value="deposit">Deposit</option>
          <option value="withdraw">Withdraw</option>
          <option value="interac">Interac</option>
        </select>

        {/* Transaction Form */}
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

        {/* Action Buttons */}
        <div className="action-buttons">
          {/* <button type="button" onClick={() => navigate('/add-account')}>
            Add New Account
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default Transfer;
