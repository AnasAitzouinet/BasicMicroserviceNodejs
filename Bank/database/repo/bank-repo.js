const mongoose = require('mongoose');
const BankModel = require('../model/bank');

class BankRepo {
    async CreateBank({ name, accountNumber, balance, userId }) {
        try {
            const newBank = new BankModel({
                name,
                accountNumber,
                balance,
                userId
            });
            const result = await newBank.save();
            return result;
        } catch (error) {
            console.log(error);
            return null; 
        }
    }

    async Authenticated({userId, accountNumber}) {
        const Authenticated = await BankModel.findOne({userId, accountNumber});
        return Authenticated ? Authenticated : null;
    }
    


    async GetBankById(id) {
        const existingBank = await BankModel.findById(id);
        return existingBank ? existingBank : null;
    }

    async GetBalanceById(id) {
        const existingBank = await BankModel.findById(id);
        return existingBank ? existingBank.balance : null;
    }

    async UpdateBalanceById(id, balance) {
        const existingBank = await BankModel.findById(id);
        if (existingBank) {
            existingBank.balance = balance;
            await existingBank.save();
            return true;
        }
        return false;
    }

    async  getBankUserByAccountNumber(accountNumber) {
        console.log(accountNumber);
        return await BankModel.findOne({ accountNumber }) || null;
      }
      

}

module.exports = BankRepo;