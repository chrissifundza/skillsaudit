
function  Register() {
  
  const employeeNumber = document.getElementById("employeenumber").value
  if (employeeNumber=="") {
   
    Swal.fire({ icon: "error", title: "Error", text: "Employee number empty"});
    return false
  }
  const email = document.getElementById("email").value
  
  if (email=="") {
    
    Swal.fire({ icon: "error", title: "Error", text: "Email is empty"});
    return false
  }
  const password = document.getElementById("password").value
  if (password=="") {
   
    Swal.fire({ icon: "error", title: "Error", text: "Password is empty"});
    return false
  }
  const reipeatpassword = document.getElementById("repeatpassword").value
  if (password!=reipeatpassword) {
    
    Swal.fire({ icon: "error", title: "Error", text: "Password does not match"});
    return false
  }
  
    axios.post('/register', {
    
      empCode: employeeNumber,
      email: email,
      password:password,
    })
    .then(function (response) {
      console.log(response);
      if (response.data.status =="success") {
        location.href="/accept/?User="+response.data.user
      }
      if (response.data=="User Not Found") {
        Swal.fire({ icon: "error", title: "Error", text: "User not authorised to register"});
      }
    })
    .catch(function (error) {
      console.log(error);
    });

}