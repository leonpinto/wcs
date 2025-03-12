// const { getConnection } = require('./DB2Connection');

// // **Deposit Function**
// const deposit = async (userId, amount) => {
//     const insertTransactionSQL = "INSERT INTO TRANSACTIONS (USER_ID, TRANSACTION_TYPE, AMOUNT) VALUES (?, ?, ?)";
//     const updateBalanceSQL = "UPDATE USERS SET BALANCE = BALANCE + ? WHERE USER_ID = ?";

//     try {
//         const conn = await getConnection();
//         await conn.beginTransaction();

//         // Insert transaction record
//         await conn.query(insertTransactionSQL, [userId, 'deposit', amount]);

//         // Update user balance
//         const result = await conn.query(updateBalanceSQL, [amount, userId]);
//         const rowsUpdated = result.length && result[0]['affectedRows'];

//         if (rowsUpdated > 0) {
//             await conn.commitTransaction();
//             conn.closeSync();
//             return { success: true, message: "Deposit successful" };
//         } else {
//             await conn.rollbackTransaction();
//             conn.closeSync();
//             return { success: false, message: "Failed to update balance" };
//         }
//     } catch (error) {
//         console.error("Error during deposit:", error);
//         return { success: false, message: "Deposit failed", error: error.message };
//     }
// };

// module.exports = { deposit };
const { getConnection } = require('./DB2Connection');

// **Deposit Function**
const deposit = async (userId, amount) => {
    const insertTransactionSQL = "INSERT INTO TRANSACTIONS (USER_ID, TRANSACTION_TYPE, AMOUNT) VALUES (?, ?, ?)";
    const updateBalanceSQL = "UPDATE USERS SET BALANCE = BALANCE + ? WHERE USER_ID = ?";

    try {
        const conn = await getConnection();
        await conn.beginTransaction();

        // Debug: Check if the user exists
        const userCheck = await conn.query("SELECT * FROM USERS WHERE USER_ID = ?", [userId]);
        console.log("🔍 User Check Result:", userCheck);

        if (userCheck.length === 0) {
            console.error("❌ User ID does not exist:", userId);
            await conn.rollbackTransaction();
            conn.closeSync();
            return { success: false, message: "User ID does not exist" };
        }

        // Insert transaction record
        await conn.query(insertTransactionSQL, [userId, 'deposit', amount]);
        console.log("✅ Transaction Inserted");

        // Update user balance
        const result = await conn.query(updateBalanceSQL, [amount, userId]);
        console.log("✅ Update Balance Result:", result);

        // Check affected rows
        if (result && result.length > 0) {
            await conn.commitTransaction();
            conn.closeSync();
            console.log("✅ Deposit Successful");
            return { success: true, message: "Deposit successful" };
        } else {
            console.error("❌ No rows updated, rolling back transaction");
            await conn.rollbackTransaction();
            conn.closeSync();
            return { success: false, message: "Failed to update balance" };
        }
    } catch (error) {
        console.error("❌ Error during deposit:", error);
        return { success: false, message: "Deposit failed", error: error.message };
    }
};

module.exports = { deposit };
