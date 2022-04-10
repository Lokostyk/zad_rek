const express = require("express")
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json())

let itemList = []

app.post("/save",(req,res)=>{
    itemList.push(req.body)
})
app.post("/delete",(req,res)=>{
    itemList = itemList.filter(item=>item.id !== req.body.id)
})
app.post("/edit",(req,res)=>{
    itemList = itemList.reduce((arr,item)=>{
        if(req.body.id === item.id){
            arr.push(req.body)
        }else {
            arr.push(item)
        }
        return arr
    },[])
})

app.listen(3000)