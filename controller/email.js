import nodemailer from "nodemailer";
export const SendEmail = (email)=>{
   
        try {
    
            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: "cookitup2023@gmail.com",
                    pass: "qlxqjmceogwaqzkf"
                }
            });
    
            const mailOptions = {
                from: "cookitup2023@gmail.com",
                to: email,
                subject: "CookITUP Account Successfully Created",
                html: `     
                            <h3>Hi</h3>
                            <h3>Your Account Has Been Successfully created</h3>
                            <h3>Regards</h3> <h3> CookITUP</h3>`
            };
    
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log("Error" + error)
                } else {
                    console.log("Email sent");
                    res.status(201).json({status:201,info})
                }
            })
    
        } catch (error) {
            console.log("Error" + error);
            res.status(401).json({status:401,error})
        }
  
  
}