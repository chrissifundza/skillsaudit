import {UpdateUser, User, accept, department, forgot, getcompetencies, highestqualification, login, division, position, register, signout, uploadqualifications, addCompetency, getRate, updateArea, language, experience, member, fetchcomp, uploadqualifications2, highestqualification2, getotherqualification, displayqualification, updatequalification, deletequalification, fetchUser, updatexperience, getotherexperience, displayexperience, upadteaddexperience, deleteperience, addmembership, otherlanguage, getratedcompetency, finalsubmit, removesubmit, validate, getcmpetencydivision, findmyemployees, addCompetencysup, getRatesup, getratedcompetencysup} from "./controller/register.js";
import  Express  from 'express';
const app = Express();
app.use(Express.static("public"));
app.use(Express.json());
app.listen(process.env.PORT||5000,()=>{
console.log("app is running");
});
app.set("view engine", 'ejs')
//home page
app.get('/', (req, res)=>{
 
    res.render('login')
})

app.get('/register', (req, res)=>{
 
    res.render('register')
})
app.get('/login', (req, res)=>{
 
    res.render('login')
})
app.get('/profile', (req, res)=>{
    
    res.render('profile') 
})
app.get('/supervisor', (req, res)=>{
    
    res.render('supervisor') 
})
app.get('/forgot', (req, res)=>{
 
    res.render('forgot') 
})
app.get('/accept', (req, res)=>{
    
    res.render('accept')
})
app.get('/sidebar', (req, res)=>{
    
    res.render('sidebar')
})
app.get('/accept/:id', (req, res)=>{
    console.log(req.params.id);
    res.render('accept')
})
 

app.post("/register",register)
app.post("/login",login)
app.post("/forgot",forgot)
app.post("/accept",accept)
app.post("/user",User)
app.post("/signout",signout)
app.post("/updateprofile",UpdateUser)
app.post("/division",division)
app.post("/department",department)
app.post("/position",position)
app.post("/corecompetencies",getcompetencies)
app.post("/uploadqualification",uploadqualifications)
app.post("/uploadqualification2",uploadqualifications2)
app.post("/highestqualification",highestqualification)
app.post("/highestqualification2",highestqualification2)
app.post("/getotherqualification",getotherqualification)
app.post("/displayqualification",displayqualification)
app.post("/displayexperience",displayexperience)
app.post("/updatequalification",updatequalification) 
app.post("/deletequalification",deletequalification)
app.post("/deleteperience",deleteperience)
app.post("/upadteaddexperience",upadteaddexperience)
app.post("/addmembership",addmembership)
app.post("/addcompetency",addCompetency)
app.post("/addcompetencysup",addCompetencysup)
app.post("/getRate",getRate)   
app.post("/getRatesup",getRatesup)  
app.post("/updatearea",updateArea)
app.post("/language",language)
app.post("/otherlanguage",otherlanguage)
app.post("/experience",experience)
app.post("/addexperience",updatexperience)
app.post("/getotherexperience",getotherexperience)
app.post("/membership",member)
app.post("/fetchcomp",fetchcomp) 
app.post("/fetchuser",fetchUser)
app.post("/getratedcompetency",getratedcompetency)
app.post("/getratedcompetencysup",getratedcompetencysup)
app.post("/finalsubmit",finalsubmit)
app.post("/removesubmit",removesubmit)
app.post("/validate",validate)
app.post("/getcmpetencydivision",getcmpetencydivision)
app.post("/findmyemployees",findmyemployees)