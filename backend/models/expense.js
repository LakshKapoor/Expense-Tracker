const mongoose = require("mongoose");

const splitSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    share:{
        type: number,
        required: true
    },
    status:{
        type: String,
        ref: ["PAID","UNPAID","CONFIRMED"],
        required: true
    },
})

const expenseSchema = new mongoose.Schema({
    description:{
        type:String,
        required: true
    },

    amount:{
        type: Number,
        required:true
    },
    groupId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Group",
        required: true
    },
    paidBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    splits:{
        type: [splitSchema],
        required: true
    },

    createdAt:{
        type: Date,
        default: Date.now
    },
});

const Expense = mongoose.model("Expense", expenseSchema);

module.exports = Expense;