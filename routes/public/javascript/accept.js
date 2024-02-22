
function Accept() {
    const query = window.location.search;
	const url = new URLSearchParams(query);
	const ID = url.get("User");
    var entry = document.getElementsByClassName("checks");
	var str = "";
	for (i = 0; i < 1; i++) {
		if (entry[i].checked === true) {
			
			str += entry[i].value;
			axios.post('/accept', {
				terms:"accepted",
				ID:ID
			  })
			  .then(function (response) {
				console.log(response);
				if (response.data.status =="success") {
					window.location.href = "/profile?User="+ID;
				}
			  })
			  .catch(function (error) {
				console.log(error);
			  });
      
		} else {
			
            Swal.fire({ icon: "error", title: "Error!", text: "Please accept Terms and Conditions!"});
		}
	}
}