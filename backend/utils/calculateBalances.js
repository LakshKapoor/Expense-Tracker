const calculateBalances = (expenses) =>{
    const balances = {}

    for(const expense of expenses){
        const{paidBy, splits} = expense;

        if(!balances[paidBy]){
            balances[paidBy] = 0
        }

        for(const split of splits){
            const {userId, share, status} = split;
        

        if(status === "CONFIRMED") continue;

        if(!balances[userId]){
            balances[userId]=0;
        }

        balances[userId]-=share

        balances[paidBy]+=amount-share
    }
}

return balances;

};

module.exports = calculateBalances;
