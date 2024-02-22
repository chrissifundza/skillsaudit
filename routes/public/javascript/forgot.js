function Forgot() {
    console.log("runnn");
    const email = document.getElementById("email").value
    if (email=="") {
      alert("Email is empty")
      return false
    }
    axios.post('/forgot', {

        email: email,

      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  //     
}