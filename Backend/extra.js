
app.get("/about",(req,res)=>{
    res.send("About API");
})
app.get("/cart",(req,res)=>{
    const token = req.headers.authorization;
    jwt.verify(token,"masai",(err,decoded)=>{
        if(err){
            res.send("Please login again");
            console.log(err);
        }else{
            res.send("CARD Page")
        }
    });
})
app.get("/product",(req,res)=>{
    const token = req.headers.authorization;
    jwt.verify(token,"masai",(err,decoded)=>{
        if(err){
            res.send("Please login again");
            console.log(err);
        }else{
            res.send("Products....")
        }
    });
})
app.get("/contact",(req,res)=>{
    res.send("contacts page");
})



// {
//     "title":"FrontEnd",
//     "note":"Today it is the FE PSC",
//     "category":"Live Session",
//     "author":"Chunnu"
//   }