require('dotenv').config();
const express = require('express');
const app = express();
const fileUpload = require('express-fileupload');
app.use(
    fileUpload({
        extended:true
    })
)
app.use(express.static(__dirname));
app.use(express.json());
const path = require("path");
const ethers = require('ethers');

var port = 5000;

const API_URL = process.env.API_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

const {abi} = require('./artifacts/contracts/Voting.sol/Voting.json');
const provider = new ethers.providers.JsonRpcProvider(API_URL);

const signer = new ethers.Wallet(PRIVATE_KEY, provider);

const contractInstance = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
})

app.get("/index.html", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
})

app.post("/addCandidate", async (req, res) => {
    var vote = req.body.vote;
    console.log(vote)
    console.log(req.body)
    try {
        const tx = await contractInstance.addCandidate(vote);
        const receipt = await tx.wait();
        console.log("Transaction receipt:", receipt);
        console.log("✅ Candidate added successfully!");
    } catch (error) {
        console.error("Error while adding candidate:", error);
    }

});

app.listen(port, function () {
    console.log("App is listening on port 3000")
});