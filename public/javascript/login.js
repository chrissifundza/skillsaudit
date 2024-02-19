
function Home() {
  location.href="login.html"
}
function Login() {
const email = document.getElementById("email").value
  if (email=="") {
    alert("Email is empty")
    return false
  }
  const password = document.getElementById("password").value
  if (password=="") {
    alert("Password is empty")
    return false
  }
axios.post('/login', {
  email: email,
  password:password
})
.then(function (response) {
  console.log(response);
  axios.post('/fetchuser', {
    ID: response.data.user.uid,
  
  })
  .then(function (response) {
    console.log(response);
    location.href="/profile/?User="+response.data
  })
  // location.href="/profile/?User="+response.data.user.uid
})
 
}