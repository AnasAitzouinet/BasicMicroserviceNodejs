const mongoose = require('mongoose');
const { bankRepo } = require('../database/index');
class BankService {
    constructor() {
        // this.array = []
        this.bankRepo = new bankRepo();
    }
    // SaveUserId (userId){
    //     this.array.push(userId)
    //     // return array[0]
    // }

    async CreateBank({ name, accountNumber, balance, userId }) {
       const existingBank = await this.bankRepo.getBankUserByAccountNumber(accountNumber);
         if(existingBank){
            return null;
         }
        const newBank = await this.bankRepo.CreateBank({ name, accountNumber, balance, userId });
        return newBank;
    }

    async Authenticated({userId, accountNumber}) {
        const existingBank = await this.bankRepo.Authenticated({userId, accountNumber});
        if (!existingBank) {
            return null;
        }
        return existingBank;
    }

    async GetBankById(id) {
        const existingBank = await this.bankRepo.GetBankById(id);
        if (!existingBank) {
            return null;
        }
        return existingBank;
    }

    async GetBalanceById(id) {
        const existingBank = await this.bankRepo.GetBalanceById(id);
        if (!existingBank) {
            return null;
        }
        return existingBank;
    }

    async UpdateBalanceById(id, balance) {
        const existingBank = await this.bankRepo.UpdateBalanceById(id, balance);
        if (!existingBank) {
            return null;
        }
        return existingBank;
    }

    async getBankUserByAccountNumber(accountNumber) {
        const existingBank = await this.bankRepo.getBankUserByAccountNumber(accountNumber);
        if (!existingBank) {
            return null;
        }
        return existingBank;
    }


}

module.exports = BankService;
