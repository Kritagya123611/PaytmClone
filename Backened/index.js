const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const z = require("zod");  
const dotenv = require('dotenv');
const app=express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://jhakritagya45:Kritagya123Jha@cluster0.ackty.mongodb.net/sample_mflix', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("✅ Connected to MongoDB successfully!"))
.catch(err => console.error("❌ MongoDB connection error:", err));

const database=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    phone:{type:Number,required:true},
    aadhaar:{type:Number,required:true},
    balance:{type:Number,default:5000}
})

const TransactionSchema=mongoose.Schema({
    senderEmail:{type:String,required:true},
    receiverEmail:{type:String,required:true},
    amount:{type:Number,required:true},
    date:{type:Date,default:Date.now},
    status:{type:String,enum:["pending","completed","failed"],default:"pending"}
})

const data=mongoose.model("data",database);
const Transaction=mongoose.model("Transaction",TransactionSchema);

const userSchema=z.object({
    name:z.string().min(1).max(20),
    email:z.string().email(),
    password:z.string().min(8).max(20),
    phone:z.number(),
    aadhaar:z.number()
});

const transactionSchema=z.object({
    senderEmail:z.string().email(),
    receiverEmail:z.string().email(),
    amount:z.number().positive()
})

const loginSchema=z.object({
    email:z.string().email(),
    password:z.string().min(8).max(20)
})

app.get("/",(req,res)=>{
    res.send("Hello from the backend!")
})

app.post("/register",async(req,res)=>{
    const {name,email,password,phone,aadhaar}=req.body;
    const validate=userSchema.safeParse(req.body);
    if (!validate.success) {
        return res.status(400).json({ error: validate.error.errors });
    }else{
        const existingUser=await data.findOne({email});
        if(existingUser){
            return res.status(400).json({alert:"User already exists Please login"});
        }else{
            const newUser=new data({
                name,
                email,
                password,
                phone,
                aadhaar
            })
            await newUser.save();
            res.status(201).json({message:"User registered successfully"});
            }
        }
    }
)

app.post("/Login",async(req,res)=>{
    const {email,password}=req.body;
    const validate=loginSchema.safeParse(req.body);
    if( !validate.success) {
        return res.status(400).json({ error: validate.error.errors });
    }
    const existingUser=await data.findOne({email});
    if(!existingUser){
        return res.status(400).json({alert:"User not found Please register"});
    }
    if(existingUser.password!==password){
        return res.status(400).json({alert:"Incorrect password"});
    }
    res.status(200).json({message:"Login successful",
        name:existingUser.name,
        email:existingUser.email
    });
})

app.post("/transaction",async(req,res)=>{
    const {senderEmail,receiverEmail,amount}=req.body;
    const validate=transactionSchema.safeParse(req.body);
    if(!validate.success){
        return res.status(400).json({ error: validate.error.errors });
    }else{
        const sender=await data.findOne({email:senderEmail});
        const receiver=await data.findOne({email:receiverEmail});
        if(!sender||!receiver){
            return res.status(400).json({alert:"User not found"});
        }
        else{
            if(sender.balance<amount){
                return res.status(400).json({alert:"Insufficient balance"});
            }else{
                sender.balance=sender.balance-amount;
                receiver.balance=receiver.balance+amount;
                await sender.save();
                await receiver.save();
                const newTransaction=new Transaction({
                    senderEmail,
                    receiverEmail,
                    amount,
                    status:"completed"
                })
                await newTransaction.save();
                res.status(200).json({message:"Transaction successful"});
            }
        }
    }
});

app.get("/transactionHistory/:email",async(req,res)=>{
    const transactions=await Transaction.find({
        $or:[
            {senderEmail:req.params.email},
            {receiverEmail:req.params.email}
        ]
    });
    res.status(200).json(transactions);
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});