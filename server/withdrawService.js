// const { getConnection } = require('./DB2Connection');

// // **Withdraw Function**
// const withdraw = async (userId, amount) => {
//     const checkBalanceSQL = "SELECT BALANCE FROM USERS WHERE USER_ID = ?";
//     const insertTransactionSQL = "INSERT INTO TRANSACTIONS (USER_ID, TRANSACTION_TYPE, AMOUNT) VALUES (?, ?, ?)";
//     const updateBalanceSQL = "UPDATE USERS SET BALANCE = BALANCE - ? WHERE USER_ID = ?";

//     try {
//         const conn = await getConnection();
//         await conn.beginTransaction();

//         // **1️⃣ Check if user exists and has sufficient balance**
//         const userResult = await conn.query(checkBalanceSQL, [userId]);
//         if (userResult.length === 0) {
//             console.error("❌ User not found:", userId);
//             await conn.rollbackTransaction();
//             conn.closeSync();
//             return { success: false, message: "User not found" };
//         }

//         const userBalance = userResult[0].BALANCE;
//         if (userBalance < amount) {
//             console.error("❌ Insufficient funds:", userBalance, "<", amount);
//             await conn.rollbackTransaction();
//             conn.closeSync();
//             return { success: false, message: "Insufficient funds" };
//         }

//         // **2️⃣ Insert withdrawal transaction**
//         await conn.query(insertTransactionSQL, [userId, 'withdraw', -amount]);

//         // **3️⃣ Update user's balance**
//         const result = await conn.query(updateBalanceSQL, [amount, userId]);

//         // **4️⃣ Commit if successful, rollback if not**
//         if (result.length > 0) {
//             await conn.commitTransaction();
//             conn.closeSync();
//             return { success: true, message: "Withdrawal successful" };
//         } else {
//             console.error("❌ Failed to update balance, rolling back");
//             await conn.rollbackTransaction();
//             conn.closeSync();
//             return { success: false, message: "Failed to update balance" };
//         }
//     } catch (error) {
//         console.error("❌ Error during withdrawal:", error);
//         return { success: false, message: "Withdrawal failed", error: error.message };
//     }
// };

// module.exports = { withdraw };
const { getConnection } = require('./DB2Connection');

// **Withdraw Function**
const withdraw = async (userId, amount) => {
    const checkBalanceSQL = "SELECT BALANCE FROM USERS WHERE USER_ID = ?";
    const insertTransactionSQL = "INSERT INTO TRANSACTIONS (USER_ID, TRANSACTION_TYPE, AMOUNT) VALUES (?, ?, ?)";
    const updateBalanceSQL = "UPDATE USERS SET BALANCE = BALANCE - ? WHERE USER_ID = ?";

    try {
        const conn = await getConnection();
        await conn.beginTransaction(); // Start a transaction

        // **1️⃣ Check if the user exists and has enough balance**
        const userResult = await conn.query(checkBalanceSQL, [userId]);
        if (userResult.length === 0) {
            console.error("❌ User not found:", userId);
            await conn.rollbackTransaction();
            conn.closeSync();
            return { success: false, message: "User not found" };
        }

        const userBalance = userResult[0].BALANCE;
        if (userBalance < amount) {
            console.error("❌ Insufficient funds:", userBalance, "<", amount);
            await conn.rollbackTransaction();
            conn.closeSync();
            return { success: false, message: "Insufficient funds" };
        }

        // **2️⃣ Insert withdrawal transaction**
        await conn.query(insertTransactionSQL, [userId, 'withdraw', -amount]);

        // **3️⃣ Update user's balance**
        const result = await conn.query(updateBalanceSQL, [amount, userId]);

        // **4️⃣ Commit if successful, rollback if not**
        if (result.length > 0) {
            await conn.commitTransaction();
            conn.closeSync();
            return { success: true, message: "Withdrawal successful" };
        } else {
            console.error("❌ Failed to update balance, rolling back transaction");
            await conn.rollbackTransaction();
            conn.closeSync();
            return { success: false, message: "Failed to update balance" };
        }
    } catch (error) {
        console.error("❌ Error during withdrawal:", error);
        return { success: false, message: "Withdrawal failed", error: error.message };
    }
};

module.exports = { withdraw };
