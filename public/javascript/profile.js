
let section=1

function DisplayButtonAccordion(num) {
  
  document.querySelector(".sub-btn1").classList.remove("active")
  document.querySelector(".sub-btn2").classList.remove("active")
  document.querySelector(".sub-btn3").classList.remove("active")
  document.querySelector(".sub-btn4").classList.remove("active")
  document.querySelector(".sub-btn5").classList.remove("active")

  document.querySelector(".sub-info1").classList.remove("active")
  document.querySelector(".sub-info2").classList.remove("active")
  document.querySelector(".sub-info3").classList.remove("active")
  document.querySelector(".sub-info4").classList.remove("active")
  document.querySelector(".sub-info5").classList.remove("active")

  let btn=`.sub-btn${num}`
  let cont =`.sub-info1`
   section=num
   console.log(section);
  Position()
  document.querySelector(btn).classList.add("active")    
  document.querySelector(cont).classList.add("active")  
      
}
function HighestQualification() {
  const query = window.location.search;
	const url = new URLSearchParams(query);
	const ID = url.get("User");
  let Institution =document.getElementById("Institution").value;
  let Qualification =document.getElementById("Qualification").value;
  let Level =document.getElementById("level").value;

  axios.post('/highestqualification',{
    Institution:Institution,
    Qualification:Qualification,
    Level:Level,
    ID:ID
  
})
.then(async function (response) {
 console.log(response.data);


})
.catch(function (error) {
  console.log(error);
});

}
function uploadQualification() {

  const file = document.getElementById("formFile").files[0];
  const input1 = document.getElementById("showInput1").checked;
  const input2 =document.getElementById("showInput2").checked;
  let checkedValue ='';
  const query = window.location.search;
	const url = new URLSearchParams(query);
	const ID = url.get("User");
  var entry = document.getElementsByClassName("checks");
	const ref = firebase.storage().ref("Qualifications/");

		if (input1 === true || input2==true) {
	 input1 === true ? checkedValue=document.getElementById("showInput1").value :checkedValue= document.getElementById("showInput2").value
   console.log(checkedValue);
			if (file.name == "") {
        alert("Please Select ID before you can Upload!");
        return;
      }
      
      const name = +new Date() + "-" + file.name;
      const metadata = {
        contentType: file.type,
      };
	const task = ref.child(name).put(file, metadata);
	task.on("state_changed", function progress(snapshot) {
		var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

    document.querySelector(".uploader").classList.add("active")
		document.querySelector(".UpProgress").classList.add("active")
		document.getElementById("uploader").value = percentage;
		document.getElementById("UpProgress").innerHTML =
			"Upload " + percentage.toFixed(0) + "%";
	});

	task.then((snapshot) => snapshot.ref.getDownloadURL())
		.then((url) => {
      document.querySelector(".uploader").classList.remove("active")
      document.querySelector(".UpProgress").classList.remove("active")
      document.getElementById("quaData1").innerHTML=`<a href="${url}" target="_blank" rel="noopener noreferrer">Uploaded qualififcation</a>`
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Qualification saved",
        showConfirmButton: false,
        timer: 1500
      });
			console.log(url);
     
        axios.post('/uploadqualification',{
          url:url,
          ID:ID,
          Type:checkedValue,
        
      })
      .then( function (response) {
      console.log(response.data);
      

      })
      .catch(function (error) {
        console.log(error);
      });
		})
		.catch(console.error);
      
		} else {
			
            Swal.fire({ icon: "error", title: "Error!", text: "Please select if Formal or Informal!"});
		}

}
let docid=''
function uploadQualification2() {

  const file = document.getElementById("formFile2").files[0];
  const input1 = document.getElementById("showInput11").checked;
  const input2 =document.getElementById("showInput22").checked;
  let checkedValue ='';
  const query = window.location.search;
	const url = new URLSearchParams(query);
	const ID = url.get("User");
  var entry = document.getElementsByClassName("checks");
	const ref = firebase.storage().ref("Qualifications2/");

		if (input1 === true || input2==true) {
	 input1 === true ? checkedValue=document.getElementById("showInput11").value :checkedValue= document.getElementById("showInput22").value
   console.log(checkedValue);
			if (file.name == "") {
        alert("Please Select ID before you can Upload!");
        return;
      }
      
      const name = +new Date() + "-" + file.name;
      const metadata = {
        contentType: file.type,
      };
	const task = ref.child(name).put(file, metadata);
	task.on("state_changed", function progress(snapshot) {
		var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

    document.querySelector(".uploader2").classList.add("active")
		document.querySelector(".UpProgress2").classList.add("active")
		document.getElementById("uploader2").value = percentage;
		document.getElementById("UpProgress2").innerHTML =
			"Upload " + percentage.toFixed(0) + "%";
	});

	task.then((snapshot) => snapshot.ref.getDownloadURL())
		.then((url) => {
      document.querySelector(".uploader2").classList.remove("active")
      document.querySelector(".UpProgress2").classList.remove("active")
      document.getElementById("quaData12").innerHTML=`<a href="${url}" target="_blank" rel="noopener noreferrer">Uploaded qualififcation</a>`
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Qualification saved",
        showConfirmButton: false,
        timer: 1500
      });
			console.log(url);
     
        axios.post('/uploadqualification2',{
          url:url,
          ID:ID,
          Type:checkedValue,
        
      })
      .then( function (response) {
      console.log(response.data);
      
docid=response.data.docid
      })
      .catch(function (error) {
        console.log(error);
      });
		})
		.catch(console.error);
      
		} else {
			
            Swal.fire({ icon: "error", title: "Error!", text: "Please select if Formal or Informal!"});
		}

}

function HighestQualification2() {
  const query = window.location.search;
	const url = new URLSearchParams(query);
	const ID = url.get("User");
  let Institution =document.getElementById("Institution2").value;
  let Qualification =document.getElementById("Qualification2").value;
  let Level =document.getElementById("level2").value;

  axios.post('/highestqualification2',{
    Institution:Institution,
    Qualification:Qualification,
    Level:Level,
    ID:ID,
    docid:docid
  
})
.then(async function (response) {
 console.log(response.data);
alert("New Qualification added")
getOtherQualification()
})
.catch(function (error) {
  console.log(error);
});

}
function getOtherQualification() {
  const query = window.location.search;
	const url = new URLSearchParams(query);
	const ID = url.get("User");
  axios.post('/getotherqualification',{
      ID:ID,
    
  })
  .then(async function (response) {
   console.log(response.data);

   let list = document.querySelector(".othercertificate")
  let html=""
  let button=""
let count =1
   response.data.forEach(btn => {
    count++
    button=` <button type="button"  onclick="DisplayQuali('${btn.id}');DisplayButtonQualification(3)" class="btn sub-btn   btn-dark">Qualification ${count}</button>`;
       html +=button;
       list.innerHTML=html;
      
       
   });
 
  })
  .catch(function (error) {
    console.log(error);
  });
}
function DisplayQuali(id) {
  console.log(id);
  const query = window.location.search;
	const url = new URLSearchParams(query);
	const ID = url.get("User");

  axios.post('/displayqualification',{
      ID:ID,
      id:id
    
  })
  .then(async function (response) {
   console.log(response.data);
   document.getElementById("Qualification3").value=response.data.QualificationName
   document.getElementById("Institution3").value=response.data.Institution
   document.getElementById("qualificationTitle").innerHTML=response.data.QualificationName
    if ( response.data.TypeOfQualification=== "Formal") {
     document.getElementById("showInput111").checked =true
     document.querySelector(".select5").classList.add("active") 
     document.getElementById("level3").value=response.data.Level
    } else {
     document.getElementById("showInput222").checked=true
     document.querySelector(".select6").classList.add("active")
     document.getElementById("level3").value=response.data.Level
    }
    

      document.getElementById("quaData13").innerHTML=`<a href="${response.data.Qualification}" target="_blank" rel="noopener noreferrer">Uploaded qualififcation</a>`
      document.getElementById("save-delete23").innerHTML=`
      <button type="button" class="btn  btn-dark" onclick="UpdateQualification3('${id}')">Save</button>
      <button type="button" class="btn  btn-danger" onclick="DeleteQuali('${id}')" >Delete</button>
      `
   

  })
  .catch(function (error) {
    console.log(error);
  });
}


function DeleteQuali(id) {
  const query = window.location.search;
	const url = new URLSearchParams(query);
	const ID = url.get("User");
  axios.post('/deletequalification',{
  
    ID:ID,
    docid:id
  
})
.then(async function (response) {
 console.log(response.data);
alert("Deleted successfully")
getOtherQualification()
})
.catch(function (error) {
  console.log(error);
});

}
function UpdateQualification3(id) {
 
  const query = window.location.search;
	const url = new URLSearchParams(query);
	const ID = url.get("User");
  let Institution =document.getElementById("Institution3").value;
  let Qualification =document.getElementById("Qualification3").value;
  let Level =document.getElementById("level3").value;

  axios.post('/updatequalification',{
    Institution:Institution,
    Qualification:Qualification,
    Level:Level,
    ID:ID,
    docid:id
  
})
.then(async function (response) {
 console.log(response.data);
alert("Updated successfully")
getOtherQualification()
})
.catch(function (error) {
  console.log(error);
});

}

function uploadQualification3() {

  const file = document.getElementById("formFile3").files[0];
  const input1 = document.getElementById("showInput111").checked;
  const input2 =document.getElementById("showInput222").checked;
  let checkedValue ='';
  const query = window.location.search;
	const url = new URLSearchParams(query);
	const ID = url.get("User");
  var entry = document.getElementsByClassName("checks");
	const ref = firebase.storage().ref("Qualifications2/");

		if (input1 === true || input2==true) {
	 input1 === true ? checkedValue=document.getElementById("showInput111").value :checkedValue= document.getElementById("showInput222").value
   console.log(checkedValue);
			if (file.name == "") {
        alert("Please Select ID before you can Upload!");
        return;
      }
      
      const name = +new Date() + "-" + file.name;
      const metadata = {
        contentType: file.type,
      };
	const task = ref.child(name).put(file, metadata);
	task.on("state_changed", function progress(snapshot) {
		var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

    document.querySelector(".uploader3").classList.add("active")
		document.querySelector(".UpProgress3").classList.add("active")
		document.getElementById("uploader3").value = percentage;
		document.getElementById("UpProgress3").innerHTML =
			"Upload " + percentage.toFixed(0) + "%";
	});

	task.then((snapshot) => snapshot.ref.getDownloadURL())
		.then((url) => {
      document.querySelector(".uploader3").classList.remove("active")
      document.querySelector(".UpProgress3").classList.remove("active")
      document.getElementById("quaData13").innerHTML=`<a href="${url}" target="_blank" rel="noopener noreferrer">Uploaded qualififcation</a>`
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Qualification saved",
        showConfirmButton: false,
        timer: 1500
      });
			console.log(url);
     
        axios.post('/uploadqualification2',{
          url:url,
          ID:ID,
          Type:checkedValue,
        
      })
      .then( function (response) {
      console.log(response.data);
      
docid=response.data.docid
      })
      .catch(function (error) {
        console.log(error);
      });
		})
		.catch(console.error);
      
		} else {
			
            Swal.fire({ icon: "error", title: "Error!", text: "Please select if Formal or Informal!"});
		}

}
 function GetCompetencies() {
    let position = document.getElementById("position1").value
    axios.post('/corecompetencies',{
        position:position,
      
    })
    .then(async function (response) {
     console.log(response.data);
     const result = response.data.filter((d) => d.areas="Written Communication ");
     console.log(result);
     let option =""
     let html =""
     let list = document.getElementById("listdata")
    
     result.forEach(department => {
         option=` <li>${department.details}</li>`;
         html +=option;
         list.innerHTML=html;
         console.log(list);
         
     });
   
    })
    .catch(function (error) {
      console.log(error);
    });
}

function calculateRate(database, data) {
  const query = window.location.search;
	const url = new URLSearchParams(query);
	const ID = url.get("User");
 let array=database.filter((d)=> d.areas==data.areas)
  console.log(database);
  let count=0;
  let total=0
  array.forEach(e => {
    count++
    total=total+Number(e.rate)
  });
let scoreDivision=5*count;
console.log(total);
let answer=(total/scoreDivision)*100;
let rate = (answer/100)*5
let num = rate.toFixed(0);
console.log(rate.toFixed(0));
axios.post('/updatearea',{
  data:data,
  num:num,
  ID:ID
   
})
.then(function (response) {
 console.log(response.data);

})
}
function getRate(data) {
  console.log("running");
  const query = window.location.search;
	const url = new URLSearchParams(query);
	const ID = url.get("User");
  axios.post('/getRate',{
    data:data,
    ID:ID
     
  })
  .then(function (response) {
   console.log(response.data);
  calculateRate(response.data, data)
  })
}
function AddCompetency(data) {
  console.log("running");
  const query = window.location.search;
	const url = new URLSearchParams(query);
	const ID = url.get("User");
  console.log(ID);
 axios.post('/addcompetency',{
      data:data,
      ID:ID
       
    })
    .then(function (response) {
     console.log(response.data);
     getRate(data)
    })
}
function Audit(data){ 
  console.log(data);
  let array=data.split(",")
  let id =array[0]
  let areas =array[1]
  let levels=array[2]
  let details=array[3]
  let code =array[4]
  let competencyDivision=array[5]
  let division=array[6]
  let title=array[7]
  let docid=array[8]
  console.log(id);
  var checkBox = document.getElementById(id);

  if (checkBox.checked == true){
    console.log(checkBox.value);
    let data ={
      areas:areas,
      levels:levels,
      details:details,
      code:code,
      competencyDivision:competencyDivision,
      division:division,
      title:title,
      rate:checkBox.value,
      idcomp:docid,

    }
    AddCompetency(data)
   } else {
    
   }

 
  // If the checkbox is checked, display the output text
 
}
function ListLevels1(result) {

  console.log(result);
  let option =""
  let html =""
  let list = document.querySelector(".listdata121")
 
  result.forEach((department,i )=> {
    console.log(department.info.details);
  
      option=`
               
      <tr>
      <td scope="col-10" class="details">
      ${department.info.details}
      </td>
      <td class="rating form-group">
        <span>1</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
      </td>
      <td class="rating form-group">
        <span>2</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
      </td>
      <td class="rating form-group">
        <span>3</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
      </td>
      <td class="rating form-group">
        <span>4</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
      </td>
      <td class="rating form-group">
        <span>5</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
      </td>
    </tr>

      
      `;
      html +=option;
      list.innerHTML=html;
     
      
  });
}
function ListLevels2(result) {
  let option =""
  let html =""
  let list = document.querySelector(".listdata122")
 
  result.forEach(department => {
      option=` 
      <tr>
      <td scope="col-10" class="details">
      ${department.info.details}
      </td>
      <td class="rating form-group">
        <span>1</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
      </td>
      <td class="rating form-group">
        <span>2</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
      </td>
      <td class="rating form-group">
        <span>3</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
      </td>
      <td class="rating form-group">
        <span>4</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
      </td>
      <td class="rating form-group">
        <span>5</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
      </td>
    </tr>

      
      `;
      html +=option;
      list.innerHTML=html;
     
      
  });
}
function ListLevels3(result) {
  let option =""
  let html =""
  let list = document.querySelector(".listdata123")
 
  result.forEach(department => {
      option=` 
      <tr>
      <td scope="col-10" class="details">
      ${department.info.details}
      </td>
      <td class="rating form-group">
        <span>1</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
      </td>
      <td class="rating form-group">
        <span>2</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
      </td>
      <td class="rating form-group">
        <span>3</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
      </td>
      <td class="rating form-group">
        <span>4</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
      </td>
      <td class="rating form-group">
        <span>5</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
      </td>
    </tr>

      `;
      html +=option;
      list.innerHTML=html;
     
      
  });
}
function ListLevels4(result) {
  let option =""
  let html =""
  let list = document.querySelector(".listdata124")
 
  result.forEach(department => {
      option=`
      <tr>
      <td scope="col-10" class="details">
      ${department.info.details}
      </td>
      <td class="rating form-group">
        <span>1</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
      </td>
      <td class="rating form-group">
        <span>2</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
      </td>
      <td class="rating form-group">
        <span>3</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
      </td>
      <td class="rating form-group">
        <span>4</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
      </td>
      <td class="rating form-group">
        <span>5</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
      </td>
    </tr>

      `;
      html +=option;
      list.innerHTML=html;
     
      
  });
}

function oListLevels1(result) {
 
  console.log(result);
  let option =""
  let html =""
  let list = document.querySelector(".olistdata121")
 
  result.forEach(department => {
    console.log(department.details);
      option=`
      <tr>
      <td scope="col-10" class="details">
      ${department.info.details}
      </td>
      <td class="rating form-group">
        <span>1</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
      </td>
      <td class="rating form-group">
        <span>2</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
      </td>
      <td class="rating form-group">
        <span>3</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
      </td>
      <td class="rating form-group">
        <span>4</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
      </td>
      <td class="rating form-group">
        <span>5</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
      </td>
    </tr>

      `;
      html +=option;
      list.innerHTML=html;
     
      
  });
}
function oListLevels2(result) {
  let option =""
  let html =""
  let list = document.querySelector(".olistdata122e")
 
  result.forEach(department => {
      option=`
      <tr>
      <td scope="col-10" class="details">
      ${department.info.details}
      </td>
      <td class="rating form-group">
        <span>1</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
      </td>
      <td class="rating form-group">
        <span>2</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
      </td>
      <td class="rating form-group">
        <span>3</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
      </td>
      <td class="rating form-group">
        <span>4</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
      </td>
      <td class="rating form-group">
        <span>5</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
      </td>
    </tr>

      
      `;
      html +=option;
      list.innerHTML=html;
    console.log(option);
      
  });
}

function oListLevels3(result) {
  let option =""
  let html =""
  let list = document.querySelector(".olistdata123")
 
  result.forEach(department => {
      option=`
      <tr>
      <td scope="col-10" class="details">
      ${department.info.details}
      </td>
      <td class="rating form-group">
        <span>1</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
      </td>
      <td class="rating form-group">
        <span>2</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
      </td>
      <td class="rating form-group">
        <span>3</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
      </td>
      <td class="rating form-group">
        <span>4</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
      </td>
      <td class="rating form-group">
        <span>5</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
      </td>
    </tr>

      `;
      html +=option;
      list.innerHTML=html;
     
      
  });
}
function oListLevels4(result) {
  let option =""
  let html =""
  let list = document.querySelector(".olistdata124")
 
  result.forEach(department => {
      option=`  
      <tr>
      <td scope="col-10" class="details">
      ${department.info.details}
      </td>
      <td class="rating form-group">
        <span>1</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
      </td>
      <td class="rating form-group">
        <span>2</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
      </td>
      <td class="rating form-group">
        <span>3</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
      </td>
      <td class="rating form-group">
        <span>4</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
      </td>
      <td class="rating form-group">
        <span>5</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
      </td>
    </tr>
`;
      html +=option;
      list.innerHTML=html;
     
      
  });
}

function pListLevels1(result) {

  console.log(result);
  let option =""
  let html =""
  let list = document.querySelector(".plistdata121")
 
  result.forEach(department => {
    console.log(department.details);
      option=` 
      <tr>
      <td scope="col-10" class="details">
      ${department.info.details}
      </td>
      <td class="rating form-group">
        <span>1</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
      </td>
      <td class="rating form-group">
        <span>2</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
      </td>
      <td class="rating form-group">
        <span>3</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
      </td>
      <td class="rating form-group">
        <span>4</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
      </td>
      <td class="rating form-group">
        <span>5</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
      </td>
    </tr>
`;
      html +=option;
      list.innerHTML=html;
     
      
  });
}
function pListLevels2(result) {
  let option =""
  let html =""
  let list = document.querySelector(".plistdata122e")
 
  result.forEach(department => {
      option=`
      <tr>
      <td scope="col-10" class="details">
      ${department.info.details}
      </td>
      <td class="rating form-group">
        <span>1</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
      </td>
      <td class="rating form-group">
        <span>2</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
      </td>
      <td class="rating form-group">
        <span>3</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
      </td>
      <td class="rating form-group">
        <span>4</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
      </td>
      <td class="rating form-group">
        <span>5</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
      </td>
    </tr>`;
      html +=option;
      list.innerHTML=html;
    console.log(option);
      
  });
}

function pListLevels3(result) {
  let option =""
  let html =""
  let list = document.querySelector(".plistdata123")
 
  result.forEach(department => {
      option=` <tr>
      <td scope="col-10" class="details">
      ${department.info.details}
      </td>
      <td class="rating form-group">
        <span>1</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
      </td>
      <td class="rating form-group">
        <span>2</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
      </td>
      <td class="rating form-group">
        <span>3</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
      </td>
      <td class="rating form-group">
        <span>4</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
      </td>
      <td class="rating form-group">
        <span>5</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
      </td>
    </tr>`;
      html +=option;
      list.innerHTML=html;
     
      
  });
}
function pListLevels4(result) {
  let option =""
  let html =""
  let list = document.querySelector(".plistdata124")
 
  result.forEach(department => {
      option=` <tr>
      <td scope="col-10" class="details">
      ${department.info.details}
      </td>
      <td class="rating form-group">
        <span>1</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
      </td>
      <td class="rating form-group">
        <span>2</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
      </td>
      <td class="rating form-group">
        <span>3</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
      </td>
      <td class="rating form-group">
        <span>4</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
      </td>
      <td class="rating form-group">
        <span>5</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
      </td>
    </tr>`;
      html +=option;
      list.innerHTML=html;
     
      
  });
}


function mListLevels1(result) {

  console.log(result);
  let option =""
  let html =""
  let list = document.querySelector(".mlistdata121")
 
  result.forEach(department => {
    console.log(department.details);
      option=` <tr>
      <td scope="col-10" class="details">
      ${department.info.details}
      </td>
      <td class="rating form-group">
        <span>1</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
      </td>
      <td class="rating form-group">
        <span>2</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
      </td>
      <td class="rating form-group">
        <span>3</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
      </td>
      <td class="rating form-group">
        <span>4</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
      </td>
      <td class="rating form-group">
        <span>5</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
      </td>
    </tr>`;
      html +=option;
      list.innerHTML=html;
     
      
  });
}
function mListLevels2(result) {
  let option =""
  let html =""
  let list = document.querySelector(".mlistdata122e")
 
  result.forEach(department => {
      option=`<tr>
      <td scope="col-10" class="details">
      ${department.info.details}
      </td>
      <td class="rating form-group">
        <span>1</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
      </td>
      <td class="rating form-group">
        <span>2</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
      </td>
      <td class="rating form-group">
        <span>3</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
      </td>
      <td class="rating form-group">
        <span>4</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
      </td>
      <td class="rating form-group">
        <span>5</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
      </td>
    </tr>`;
      html +=option;
      list.innerHTML=html;
    console.log(option);
      
  });
}

function mListLevels3(result) {
  let option =""
  let html =""
  let list = document.querySelector(".mlistdata123")
 
  result.forEach(department => {
      option=` <tr>
      <td scope="col-10" class="details">
      ${department.info.details}
      </td>
      <td class="rating form-group">
        <span>1</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
      </td>
      <td class="rating form-group">
        <span>2</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
      </td>
      <td class="rating form-group">
        <span>3</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
      </td>
      <td class="rating form-group">
        <span>4</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
      </td>
      <td class="rating form-group">
        <span>5</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
      </td>
    </tr>`;
      html +=option;
      list.innerHTML=html;
     
      
  });
}
function mListLevels4(result) {
  let option =""
  let html =""
  let list = document.querySelector(".mlistdata124")
 
  result.forEach(department => {
      option=` <tr>
      <td scope="col-10" class="details">
      ${department.info.details}
      </td>
      <td class="rating form-group">
        <span>1</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
      </td>
      <td class="rating form-group">
        <span>2</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
      </td>
      <td class="rating form-group">
        <span>3</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
      </td>
      <td class="rating form-group">
        <span>4</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
      </td>
      <td class="rating form-group">
        <span>5</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
      </td>
    </tr>`;
      html +=option;
      list.innerHTML=html;
     
      
  });
}


function cListLevels1(result) {

  console.log(result);
  let option =""
  let html =""
  let list = document.querySelector(".clistdata121")
 
  result.forEach(department => {
    console.log(department.details);
      option=` <tr>
      <td scope="col-10" class="details">
      ${department.info.details}
      </td>
      <td class="rating form-group">
        <span>1</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
      </td>
      <td class="rating form-group">
        <span>2</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
      </td>
      <td class="rating form-group">
        <span>3</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
      </td>
      <td class="rating form-group">
        <span>4</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
      </td>
      <td class="rating form-group">
        <span>5</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
      </td>
    </tr>`;
      html +=option;
      list.innerHTML=html;
     
      
  });
}
function cListLevels2(result) {
  let option =""
  let html =""
  let list = document.querySelector(".clistdata122e")
 
  result.forEach(department => {
      option=`<tr>
      <td scope="col-10" class="details">
      ${department.info.details}
      </td>
      <td class="rating form-group">
        <span>1</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
      </td>
      <td class="rating form-group">
        <span>2</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
      </td>
      <td class="rating form-group">
        <span>3</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
      </td>
      <td class="rating form-group">
        <span>4</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
      </td>
      <td class="rating form-group">
        <span>5</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
      </td>
    </tr>`;
      html +=option;
      list.innerHTML=html;
    console.log(option);
      
  });
}

function cListLevels3(result) {
  let option =""
  let html =""
  let list = document.querySelector(".clistdata123")
 
  result.forEach(department => {
      option=` <tr>
      <td scope="col-10" class="details">
      ${department.info.details}
      </td>
      <td class="rating form-group">
        <span>1</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
      </td>
      <td class="rating form-group">
        <span>2</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
      </td>
      <td class="rating form-group">
        <span>3</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
      </td>
      <td class="rating form-group">
        <span>4</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
      </td>
      <td class="rating form-group">
        <span>5</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
      </td>
    </tr>`;
      html +=option;
      list.innerHTML=html;
     
      
  });
}
function cListLevels4(result) {
  let option =""
  let html =""
  let list = document.querySelector(".clistdata124")
 
  result.forEach(department => {
      option=` 
      <tr>
      <td scope="col-10" class="details">
      ${department.info.details}
      </td>
      <td class="rating form-group">
        <span>1</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
      </td>
      <td class="rating form-group">
        <span>2</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
      </td>
      <td class="rating form-group">
        <span>3</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
      </td>
      <td class="rating form-group">
        <span>4</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
      </td>
      <td class="rating form-group">
        <span>5</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
      </td>
    </tr>`;
      html +=option;
      list.innerHTML=html;
     
      
  });
}

function nListLevels1(result) {

  console.log(result);
  let option =""
  let html =""
  let list = document.querySelector(".nlistdata121")
 
  result.forEach(department => {
    console.log(department.details);
      option=` 
      <tr>
      <td scope="col-10" class="details">
      ${department.info.details}
      </td>
      <td class="rating form-group">
        <span>1</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
      </td>
      <td class="rating form-group">
        <span>2</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
      </td>
      <td class="rating form-group">
        <span>3</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
      </td>
      <td class="rating form-group">
        <span>4</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
      </td>
      <td class="rating form-group">
        <span>5</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
      </td>
    </tr>`;
      html +=option;
      list.innerHTML=html;
     
      
  });
}
function nListLevels2(result) {
  let option =""
  let html =""
  let list = document.querySelector(".nlistdata122e")
 
  result.forEach(department => {
      option=`
      <tr>
      <td scope="col-10" class="details">
      ${department.info.details}
      </td>
      <td class="rating form-group">
        <span>1</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
      </td>
      <td class="rating form-group">
        <span>2</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
      </td>
      <td class="rating form-group">
        <span>3</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
      </td>
      <td class="rating form-group">
        <span>4</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
      </td>
      <td class="rating form-group">
        <span>5</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
      </td>
    </tr>`;
      html +=option;
      list.innerHTML=html;
    console.log(option);
      
  });
}

function nListLevels3(result) {
  let option =""
  let html =""
  let list = document.querySelector(".nlistdata123")
 
  result.forEach(department => {
      option=`
      <tr>
      <td scope="col-10" class="details">
      ${department.info.details}
      </td>
      <td class="rating form-group">
        <span>1</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
      </td>
      <td class="rating form-group">
        <span>2</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
      </td>
      <td class="rating form-group">
        <span>3</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
      </td>
      <td class="rating form-group">
        <span>4</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
      </td>
      <td class="rating form-group">
        <span>5</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
      </td>
    </tr>`;
      html +=option;
      list.innerHTML=html;
     
      
  });
}
function nListLevels4(result) {
  let option =""
  let html =""
  let list = document.querySelector(".nlistdata124")
 
  result.forEach(department => {
       option=`  <tr>
      <td scope="col-10" class="details">
      ${department.info.details}
      </td>
      <td class="rating form-group">
        <span>1</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
      </td>
      <td class="rating form-group">
        <span>2</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
      </td>
      <td class="rating form-group">
        <span>3</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
      </td>
      <td class="rating form-group">
        <span>4</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
      </td>
      <td class="rating form-group">
        <span>5</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
      </td>
    </tr>`;
      html +=option;
      list.innerHTML=html;
     
      
  });
}

function orListLevels1(result) {

  console.log(result);
  let option =""
  let html =""
  let list = document.querySelector(".orlistdata121")
 
  result.forEach(department => {
    console.log(department.details);
      option=` 
      <tr>
      <td scope="col-10" class="details">
      ${department.info.details}
      </td>
      <td class="rating form-group">
        <span>1</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
      </td>
      <td class="rating form-group">
        <span>2</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
      </td>
      <td class="rating form-group">
        <span>3</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
      </td>
      <td class="rating form-group">
        <span>4</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
      </td>
      <td class="rating form-group">
        <span>5</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
      </td>
    </tr>`;
      html +=option;
      list.innerHTML=html;
     
      
  });
}
function orListLevels2(result) {
  let option =""
  let html =""
  let list = document.querySelector(".orlistdata122e")
 
  result.forEach(department => {
      option=`
      <tr>
      <td scope="col-10" class="details">
      ${department.info.details}
      </td>
      <td class="rating form-group">
        <span>1</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
      </td>
      <td class="rating form-group">
        <span>2</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
      </td>
      <td class="rating form-group">
        <span>3</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
      </td>
      <td class="rating form-group">
        <span>4</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
      </td>
      <td class="rating form-group">
        <span>5</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
      </td>
    </tr>`;
      html +=option;
      list.innerHTML=html;
    console.log(option);
      
  });
}

function orListLevels3(result) {
  let option =""
  let html =""
  let list = document.querySelector(".orlistdata123")
 
  result.forEach(department => {
      option=` 
      <tr>
      <td scope="col-10" class="details">
      ${department.info.details}
      </td>
      <td class="rating form-group">
        <span>1</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
      </td>
      <td class="rating form-group">
        <span>2</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
      </td>
      <td class="rating form-group">
        <span>3</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
      </td>
      <td class="rating form-group">
        <span>4</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
      </td>
      <td class="rating form-group">
        <span>5</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
      </td>
    </tr>`;
      html +=option;
      list.innerHTML=html;
     
      
  });
}
function orListLevels4(result) {
  let option =""
  let html =""
  let list = document.querySelector(".orlistdata124")
 
  result.forEach(department => {
      option=` 
      <tr>
      <td scope="col-10" class="details">
      ${department.info.details}
      </td>
      <td class="rating form-group">
        <span>1</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
      </td>
      <td class="rating form-group">
        <span>2</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
      </td>
      <td class="rating form-group">
        <span>3</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
      </td>
      <td class="rating form-group">
        <span>4</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
      </td>
      <td class="rating form-group">
        <span>5</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
      </td>
    </tr>`;
      html +=option;
      list.innerHTML=html;
     
      
  });
}

function ldListLevels1(result) {

  console.log(result);
  let option =""
  let html =""
  let list = document.querySelector(".ldlistdata121")
 
  result.forEach(department => {
    console.log(department.details);
      option=` 
      <tr>
      <td scope="col-10" class="details">
      ${department.info.details}
      </td>
      <td class="rating form-group">
        <span>1</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
      </td>
      <td class="rating form-group">
        <span>2</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
      </td>
      <td class="rating form-group">
        <span>3</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
      </td>
      <td class="rating form-group">
        <span>4</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
      </td>
      <td class="rating form-group">
        <span>5</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
      </td>
    </tr>`;
      html +=option;
      list.innerHTML=html;
     console.log(option);
      
  });
}
function ldListLevels2(result) {
  let option =""
  let html =""
  let list = document.querySelector(".ldlistdata122e")
 
  result.forEach(department => {
      option=`
      <tr>
      <td scope="col-10" class="details">
      ${department.info.details}
      </td>
      <td class="rating form-group">
        <span>1</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
      </td>
      <td class="rating form-group">
        <span>2</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
      </td>
      <td class="rating form-group">
        <span>3</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
      </td>
      <td class="rating form-group">
        <span>4</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
      </td>
      <td class="rating form-group">
        <span>5</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
      </td>
    </tr>`;
      html +=option;
      list.innerHTML=html;
    console.log(option);
      
  });
}

function ldListLevels3(result) {
  let option =""
  let html =""
  let list = document.querySelector(".ldlistdata123")
 
  result.forEach(department => {
      option=` 
      <tr>
      <td scope="col-10" class="details">
      ${department.info.details}
      </td>
      <td class="rating form-group">
        <span>1</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
      </td>
      <td class="rating form-group">
        <span>2</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
      </td>
      <td class="rating form-group">
        <span>3</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
      </td>
      <td class="rating form-group">
        <span>4</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
      </td>
      <td class="rating form-group">
        <span>5</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
      </td>
    </tr>`;
      html +=option;
      list.innerHTML=html;
     
      
  });
}
function ldListLevels4(result) {
  let option =""
  let html =""
  let list = document.querySelector(".ldlistdata124")
 
  result.forEach(department => {
      option=` 
      <tr>
      <td scope="col-10" class="details">
      ${department.info.details}
      </td>
      <td class="rating form-group">
        <span>1</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
      </td>
      <td class="rating form-group">
        <span>2</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
      </td>
      <td class="rating form-group">
        <span>3</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
      </td>
      <td class="rating form-group">
        <span>4</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
      </td>
      <td class="rating form-group">
        <span>5</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
      </td>
    </tr>`;
      html +=option;
      list.innerHTML=html;
     
      
  });
}

function aListLevels1(result) {

  console.log(result);
  let option =""
  let html =""
  let list = document.querySelector(".alistdata121")
 
  result.forEach(department => {
    console.log(department.details);
      option=` 
      <tr>
      <td scope="col-10" class="details">
      ${department.info.details}
      </td>
      <td class="rating form-group">
        <span>1</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
      </td>
      <td class="rating form-group">
        <span>2</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
      </td>
      <td class="rating form-group">
        <span>3</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
      </td>
      <td class="rating form-group">
        <span>4</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
      </td>
      <td class="rating form-group">
        <span>5</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
      </td>
    </tr>`;
      html +=option;
      list.innerHTML=html;
     console.log(option);
      
  });
}
function aListLevels2(result) {
  let option =""
  let html =""
  let list = document.querySelector(".alistdata122e")
 
  result.forEach(department => {
      option=`
      <tr>
      <td scope="col-10" class="details">
      ${department.info.details}
      </td>
      <td class="rating form-group">
        <span>1</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
      </td>
      <td class="rating form-group">
        <span>2</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
      </td>
      <td class="rating form-group">
        <span>3</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
      </td>
      <td class="rating form-group">
        <span>4</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
      </td>
      <td class="rating form-group">
        <span>5</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
      </td>
    </tr>`;
      html +=option;
      list.innerHTML=html;
    console.log(option);
      
  });
}

function aListLevels3(result) {
  let option =""
  let html =""
  let list = document.querySelector(".alistdata123")
 
  result.forEach(department => {
      option=` 
      <tr>
      <td scope="col-10" class="details">
      ${department.info.details}
      </td>
      <td class="rating form-group">
        <span>1</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
      </td>
      <td class="rating form-group">
        <span>2</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
      </td>
      <td class="rating form-group">
        <span>3</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
      </td>
      <td class="rating form-group">
        <span>4</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
      </td>
      <td class="rating form-group">
        <span>5</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
      </td>
    </tr>`;
      html +=option;
      list.innerHTML=html;
     
      
  });
}
function aListLevels4(result) {
  let option =""
  let html =""
  let list = document.querySelector(".alistdata124")
 
  result.forEach(department => {
      option=` 
      <tr>
      <td scope="col-10" class="details">
      ${department.info.details}
      </td>
      <td class="rating form-group">
        <span>1</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
      </td>
      <td class="rating form-group">
        <span>2</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
      </td>
      <td class="rating form-group">
        <span>3</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
      </td>
      <td class="rating form-group">
        <span>4</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
      </td>
      <td class="rating form-group">
        <span>5</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
      </td>
    </tr>`;
      html +=option;
      list.innerHTML=html;
     
      
  });
}

function cmListLevels1(result) {

  console.log(result);
  let option =""
  let html =""
  let list = document.querySelector(".cmlistdata121")
 
  result.forEach(department => {
    console.log(department.details);
      option=`  <tr>
      <td scope="col-10" class="details">
      ${department.info.details}
      </td>
      <td class="rating form-group">
        <span>1</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
      </td>
      <td class="rating form-group">
        <span>2</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
      </td>
      <td class="rating form-group">
        <span>3</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
      </td>
      <td class="rating form-group">
        <span>4</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
      </td>
      <td class="rating form-group">
        <span>5</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
      </td>
    </tr>`;
      html +=option;
      list.innerHTML=html;
     console.log(option);
      
  });
}
function cmListLevels2(result) {
  let option =""
  let html =""
  let list = document.querySelector(".cmlistdata122e")
 
  result.forEach(department => {
      option=`  <tr>
      <td scope="col-10" class="details">
      ${department.info.details}
      </td>
      <td class="rating form-group">
        <span>1</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
      </td>
      <td class="rating form-group">
        <span>2</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
      </td>
      <td class="rating form-group">
        <span>3</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
      </td>
      <td class="rating form-group">
        <span>4</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
      </td>
      <td class="rating form-group">
        <span>5</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
      </td>
    </tr>`;
      html +=option;
      list.innerHTML=html;
    console.log(option);
      
  });
}

function cmListLevels3(result) {
  let option =""
  let html =""
  let list = document.querySelector(".cmlistdata123")
 
  result.forEach(department => {
      option=`  <tr>
      <td scope="col-10" class="details">
      ${department.info.details}
      </td>
      <td class="rating form-group">
        <span>1</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
      </td>
      <td class="rating form-group">
        <span>2</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
      </td>
      <td class="rating form-group">
        <span>3</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
      </td>
      <td class="rating form-group">
        <span>4</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
      </td>
      <td class="rating form-group">
        <span>5</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
      </td>
    </tr>`;
      html +=option;
      list.innerHTML=html;
     
      
  });
}
function cmListLevels4(result) {
  let option =""
  let html =""
  let list = document.querySelector(".cmlistdata124")
 
  result.forEach(department => {
      option=` <li>${department.details}</li>  <tr>
      <td scope="col-10" class="details">
      ${department.info.details}
      </td>
      <td class="rating form-group">
        <span>1</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
      </td>
      <td class="rating form-group">
        <span>2</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
      </td>
      <td class="rating form-group">
        <span>3</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
      </td>
      <td class="rating form-group">
        <span>4</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
      </td>
      <td class="rating form-group">
        <span>5</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
      </td>
    </tr>`;
      html +=option;
      list.innerHTML=html;
     
      
  });
}

function tListLevels1(result) {

  console.log(result);
  let option =""
  let html =""
  let list = document.querySelector(".tlistdata121")
 
  result.forEach(department => {
    console.log(department.details);
      option=`  <tr>
      <td scope="col-10" class="details">
      ${department.info.details}
      </td>
      <td class="rating form-group">
        <span>1</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
      </td>
      <td class="rating form-group">
        <span>2</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
      </td>
      <td class="rating form-group">
        <span>3</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
      </td>
      <td class="rating form-group">
        <span>4</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
      </td>
      <td class="rating form-group">
        <span>5</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
      </td>
    </tr>`;
      html +=option;
      list.innerHTML=html;
     console.log(option);
      
  });
}
function tListLevels2(result) {
  let option =""
  let html =""
  let list = document.querySelector(".tlistdata122e")
 
  result.forEach(department => {
      option=`  <tr>
      <td scope="col-10" class="details">
      ${department.info.details}
      </td>
      <td class="rating form-group">
        <span>1</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
      </td>
      <td class="rating form-group">
        <span>2</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
      </td>
      <td class="rating form-group">
        <span>3</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
      </td>
      <td class="rating form-group">
        <span>4</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
      </td>
      <td class="rating form-group">
        <span>5</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
      </td>
    </tr>`;
      html +=option;
      list.innerHTML=html;
    console.log(option);
      
  });
}

function tListLevels3(result) {
  let option =""
  let html =""
  let list = document.querySelector(".tlistdata123")
 
  result.forEach(department => {
      option=`  <tr>
      <td scope="col-10" class="details">
      ${department.info.details}
      </td>
      <td class="rating form-group">
        <span>1</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
      </td>
      <td class="rating form-group">
        <span>2</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
      </td>
      <td class="rating form-group">
        <span>3</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
      </td>
      <td class="rating form-group">
        <span>4</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
      </td>
      <td class="rating form-group">
        <span>5</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
      </td>
    </tr>`;
      html +=option;
      list.innerHTML=html;
     
      
  });
}
function tListLevels4(result) {
  let option =""
  let html =""
  let list = document.querySelector(".tlistdata124")
 
  result.forEach(department => {
      option=`  <tr>
      <td scope="col-10" class="details">
      ${department.info.details}
      </td>
      <td class="rating form-group">
        <span>1</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
      </td>
      <td class="rating form-group">
        <span>2</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
      </td>
      <td class="rating form-group">
        <span>3</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
      </td>
      <td class="rating form-group">
        <span>4</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
      </td>
      <td class="rating form-group">
        <span>5</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
      </td>
    </tr>`;
      html +=option;
      list.innerHTML=html;
     
      
  });
}


function sListLevels1(result) {

  console.log(result);
  let option =""
  let html =""
  let list = document.querySelector(".slistdata121")
 
  result.forEach(department => {
    console.log(department.details);
      option=`  <tr>
      <td scope="col-10" class="details">
      ${department.info.details}
      </td>
      <td class="rating form-group">
        <span>1</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
      </td>
      <td class="rating form-group">
        <span>2</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
      </td>
      <td class="rating form-group">
        <span>3</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
      </td>
      <td class="rating form-group">
        <span>4</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
      </td>
      <td class="rating form-group">
        <span>5</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
      </td>
    </tr>`;
      html +=option;
      list.innerHTML=html;
     console.log(option);
      
  });
}
function sListLevels2(result) {
  let option =""
  let html =""
  let list = document.querySelector(".slistdata122e")
 
  result.forEach(department => {
      option=`  <tr>
      <td scope="col-10" class="details">
      ${department.info.details}
      </td>
      <td class="rating form-group">
        <span>1</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
      </td>
      <td class="rating form-group">
        <span>2</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
      </td>
      <td class="rating form-group">
        <span>3</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
      </td>
      <td class="rating form-group">
        <span>4</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
      </td>
      <td class="rating form-group">
        <span>5</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
      </td>
    </tr>`;
      html +=option;
      list.innerHTML=html;
    console.log(option);
      
  });
}

function sListLevels3(result) {
  let option =""
  let html =""
  let list = document.querySelector(".slistdata123")
 
  result.forEach(department => {
      option=`  <tr>
      <td scope="col-10" class="details">
      ${department.info.details}
      </td>
      <td class="rating form-group">
        <span>1</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
      </td>
      <td class="rating form-group">
        <span>2</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
      </td>
      <td class="rating form-group">
        <span>3</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
      </td>
      <td class="rating form-group">
        <span>4</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
      </td>
      <td class="rating form-group">
        <span>5</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
      </td>
    </tr>`;
      html +=option;
      list.innerHTML=html;
     
      
  });
}
function sListLevels4(result) {
  let option =""
  let html =""
  let list = document.querySelector(".slistdata124")
 
  result.forEach(department => {
      option=`  <tr>
      <td scope="col-10" class="details">
      ${department.info.details}
      </td>
      <td class="rating form-group">
        <span>1</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
      </td>
      <td class="rating form-group">
        <span>2</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
      </td>
      <td class="rating form-group">
        <span>3</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
      </td>
      <td class="rating form-group">
        <span>4</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
      </td>
      <td class="rating form-group">
        <span>5</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
      </td>
    </tr>`;
      html +=option;
      list.innerHTML=html;
     
      
  });
}

function tmListLevels1(result) {

  console.log(result);
  let option =""
  let html =""
  let list = document.querySelector(".tmlistdata121")
 
  result.forEach(department => {
    console.log(department.details);
      option=`  <tr>
      <td scope="col-10" class="details">
      ${department.info.details}
      </td>
      <td class="rating form-group">
        <span>1</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
      </td>
      <td class="rating form-group">
        <span>2</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
      </td>
      <td class="rating form-group">
        <span>3</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
      </td>
      <td class="rating form-group">
        <span>4</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
      </td>
      <td class="rating form-group">
        <span>5</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
      </td>
    </tr>`;
      html +=option;
      list.innerHTML=html;
     console.log(option);
      
  });
}
function tmListLevels2(result) {
  let option =""
  let html =""
  let list = document.querySelector(".tmlistdata122e")
 
  result.forEach(department => {
      option=`
      <tr>
      <td scope="col-10" class="details">
      ${department.info.details}
      </td>
      <td class="rating form-group">
        <span>1</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
      </td>
      <td class="rating form-group">
        <span>2</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
      </td>
      <td class="rating form-group">
        <span>3</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
      </td>
      <td class="rating form-group">
        <span>4</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
      </td>
      <td class="rating form-group">
        <span>5</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
      </td>
    </tr>
      `;
      html +=option;
      list.innerHTML=html;
    console.log(option);
      
  });
}

function tmListLevels3(result) {
  let option =""
  let html =""
  let list = document.querySelector(".tmlistdata123")
 
  result.forEach(department => {
      option=`
      <tr>
      <td scope="col-10" class="details">
      ${department.info.details}
      </td>
      <td class="rating form-group">
        <span>1</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
      </td>
      <td class="rating form-group">
        <span>2</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
      </td>
      <td class="rating form-group">
        <span>3</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
      </td>
      <td class="rating form-group">
        <span>4</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
      </td>
      <td class="rating form-group">
        <span>5</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
      </td>
    </tr>
      `;
      html +=option;
      list.innerHTML=html;
     
      
  });
}
function tmListLevels4(result) {
  let option =""
  let html =""
  let list = document.querySelector(".tmlistdata124")
 
  result.forEach(department => {
      option=`
      <tr>
      <td scope="col-10" class="details">
      ${department.info.details}
      </td>
      <td class="rating form-group">
        <span>1</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
      </td>
      <td class="rating form-group">
        <span>2</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
      </td>
      <td class="rating form-group">
        <span>3</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
      </td>
      <td class="rating form-group">
        <span>4</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
      </td>
      <td class="rating form-group">
        <span>5</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
      </td>
    </tr>
      `;
      html +=option;
      list.innerHTML=html;
     
      
  });
}

function wListLevels1(result) {

  console.log(result);
  let option =""
  let html =""
  let list = document.querySelector(".wlistdata121")
 
  result.forEach(department => {
    console.log(department.details);
      option=`
      <tr>
      <td scope="col-10" class="details">
      ${department.info.details}
      </td>
      <td class="rating form-group">
        <span>1</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
      </td>
      <td class="rating form-group">
        <span>2</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
      </td>
      <td class="rating form-group">
        <span>3</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
      </td>
      <td class="rating form-group">
        <span>4</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
      </td>
      <td class="rating form-group">
        <span>5</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
      </td>
    </tr>
      `;
      html +=option;
      list.innerHTML=html;
     console.log(option);
      
  });
}
function wListLevels2(result) {
  let option =""
  let html =""
  let list = document.querySelector(".wlistdata122e")
 
  result.forEach(department => {
      option=`  <tr>
      <td scope="col-10" class="details">
      ${department.info.details}
      </td>
      <td class="rating form-group">
        <span>1</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
      </td>
      <td class="rating form-group">
        <span>2</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
      </td>
      <td class="rating form-group">
        <span>3</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
      </td>
      <td class="rating form-group">
        <span>4</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
      </td>
      <td class="rating form-group">
        <span>5</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
      </td>
    </tr>`;
      html +=option;
      list.innerHTML=html;
    console.log(option);
      
  });
}

function wListLevels3(result) {
  let option =""
  let html =""
  let list = document.querySelector("wlistdata123")
 
  result.forEach(department => {
      option=`  <tr>
      <td scope="col-10" class="details">
      ${department.info.details}
      </td>
      <td class="rating form-group">
        <span>1</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
      </td>
      <td class="rating form-group">
        <span>2</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
      </td>
      <td class="rating form-group">
        <span>3</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
      </td>
      <td class="rating form-group">
        <span>4</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
      </td>
      <td class="rating form-group">
        <span>5</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
      </td>
    </tr>`;
      html +=option;
      list.innerHTML=html;
     
      
  });
}
function wListLevels4(result) {
  let option =""
  let html =""
  let list = document.querySelector(".wlistdata124")
 
  result.forEach(department => {
      option=`  <tr>
      <td scope="col-10" class="details">
      ${department.info.details}
      </td>
      <td class="rating form-group">
        <span>1</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
      </td>
      <td class="rating form-group">
        <span>2</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
      </td>
      <td class="rating form-group">
        <span>3</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
      </td>
      <td class="rating form-group">
        <span>4</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
      </td>
      <td class="rating form-group">
        <span>5</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
      </td>
    </tr>`;
      html +=option;
      list.innerHTML=html;
     
      
  });
}



function dlListLevels1(result) {

  console.log(result);
  let option =""
  let html =""
  let list = document.querySelector(".dllistdata121")
 
  result.forEach(department => {
    console.log(department.details);
      option=`  <tr>
      <td scope="col-10" class="details">
      ${department.info.details}
      </td>
      <td class="rating form-group">
        <span>1</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
      </td>
      <td class="rating form-group">
        <span>2</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
      </td>
      <td class="rating form-group">
        <span>3</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
      </td>
      <td class="rating form-group">
        <span>4</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
      </td>
      <td class="rating form-group">
        <span>5</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
      </td>
    </tr>`;
      html +=option;
      list.innerHTML=html;
     console.log(option);
      
  });
}
function dlListLevels2(result) {
  let option =""
  let html =""
  let list = document.querySelector(".dllistdata122e")
 
  result.forEach(department => {
      option=`  <tr>
      <td scope="col-10" class="details">
      ${department.info.details}
      </td>
      <td class="rating form-group">
        <span>1</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
      </td>
      <td class="rating form-group">
        <span>2</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
      </td>
      <td class="rating form-group">
        <span>3</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
      </td>
      <td class="rating form-group">
        <span>4</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
      </td>
      <td class="rating form-group">
        <span>5</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
      </td>
    </tr>`;
      html +=option;
      list.innerHTML=html;
    console.log(option);
      
  });
}

function dlListLevels3(result) {
  let option =""
  let html =""
  let list = document.querySelector("dllistdata123")
 
  result.forEach(department => {
      option=`  <tr>
      <td scope="col-10" class="details">
      ${department.info.details}
      </td>
      <td class="rating form-group">
        <span>1</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
      </td>
      <td class="rating form-group">
        <span>2</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
      </td>
      <td class="rating form-group">
        <span>3</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
      </td>
      <td class="rating form-group">
        <span>4</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
      </td>
      <td class="rating form-group">
        <span>5</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
      </td>
    </tr>`;
      html +=option;
      list.innerHTML=html;
     
      
  });
}
function dlListLevels4(result) {
  let option =""
  let html =""
  let list = document.querySelector(".dllistdata124")
 
  result.forEach(department => {
    option=`  <tr>
    <td scope="col-10" class="details">
    ${department.info.details}
    </td>
    <td class="rating form-group">
      <span>1</span>
      <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
    </td>
    <td class="rating form-group">
      <span>2</span>
      <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
    </td>
    <td class="rating form-group">
      <span>3</span>
      <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
    </td>
    <td class="rating form-group">
      <span>4</span>
      <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
    </td>
    <td class="rating form-group">
      <span>5</span>
      <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
    </td>
  </tr>`;
      html +=option;
      list.innerHTML=html;
     
      
  });
}

function ohListLevels1(result) {

  console.log(result);
  let option =""
  let html =""
  let list = document.querySelector(".ohlistdata121")
 
  result.forEach(department => {
    console.log(department.details);
    option=`  <tr>
    <td scope="col-10" class="details">
    ${department.info.details}
    </td>
    <td class="rating form-group">
      <span>1</span>
      <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
    </td>
    <td class="rating form-group">
      <span>2</span>
      <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
    </td>
    <td class="rating form-group">
      <span>3</span>
      <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
    </td>
    <td class="rating form-group">
      <span>4</span>
      <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
    </td>
    <td class="rating form-group">
      <span>5</span>
      <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
    </td>
  </tr>`;
      html +=option;
      list.innerHTML=html;
     console.log(option);
      
  });
}
function ohListLevels2(result) {
  let option =""
  let html =""
  let list = document.querySelector(".ohlistdata122e")
 
  result.forEach(department => {
    option=`  <tr>
    <td scope="col-10" class="details">
    ${department.info.details}
    </td>
    <td class="rating form-group">
      <span>1</span>
      <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
    </td>
    <td class="rating form-group">
      <span>2</span>
      <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
    </td>
    <td class="rating form-group">
      <span>3</span>
      <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
    </td>
    <td class="rating form-group">
      <span>4</span>
      <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
    </td>
    <td class="rating form-group">
      <span>5</span>
      <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
    </td>
  </tr>`;
      html +=option;
      list.innerHTML=html;
    console.log(option);
      
  });
}

function ohListLevels3(result) {
  let option =""
  let html =""
  let list = document.querySelector(".ohlistdata123")
 
  result.forEach(department => {
    option=`  <tr>
    <td scope="col-10" class="details">
    ${department.info.details}
    </td>
    <td class="rating form-group">
      <span>1</span>
      <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
    </td>
    <td class="rating form-group">
      <span>2</span>
      <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
    </td>
    <td class="rating form-group">
      <span>3</span>
      <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
    </td>
    <td class="rating form-group">
      <span>4</span>
      <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
    </td>
    <td class="rating form-group">
      <span>5</span>
      <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
    </td>
  </tr>`;
      html +=option;
      list.innerHTML=html;
     
      
  });
}
function ohListLevels4(result) {
  let option =""
  let html =""
  let list = document.querySelector(".ohlistdata124")
 
  result.forEach(department => {
    option=`  <tr>
    <td scope="col-10" class="details">
    ${department.info.details}
    </td>
    <td class="rating form-group">
      <span>1</span>
      <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
    </td>
    <td class="rating form-group">
      <span>2</span>
      <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
    </td>
    <td class="rating form-group">
      <span>3</span>
      <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
    </td>
    <td class="rating form-group">
      <span>4</span>
      <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
    </td>
    <td class="rating form-group">
      <span>5</span>
      <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
    </td>
  </tr>`;
      html +=option;
      list.innerHTML=html;
     
      
  });
}

function intListLevels1(result) {

  console.log(result);
  let option =""
  let html =""
  let list = document.querySelector(".intlistdata121")
 
  result.forEach(department => {
    console.log(department.details);
    option=`  <tr>
    <td scope="col-10" class="details">
    ${department.info.details}
    </td>
    <td class="rating form-group">
      <span>1</span>
      <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
    </td>
    <td class="rating form-group">
      <span>2</span>
      <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
    </td>
    <td class="rating form-group">
      <span>3</span>
      <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
    </td>
    <td class="rating form-group">
      <span>4</span>
      <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
    </td>
    <td class="rating form-group">
      <span>5</span>
      <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
    </td>
  </tr>`;
      html +=option;
      list.innerHTML=html;
     console.log(option);
      
  });
}
function intListLevels2(result) {
  let option =""
  let html =""
  let list = document.querySelector(".intlistdata122e")
 
  result.forEach(department => {
    option=`  <tr>
    <td scope="col-10" class="details">
    ${department.info.details}
    </td>
    <td class="rating form-group">
      <span>1</span>
      <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
    </td>
    <td class="rating form-group">
      <span>2</span>
      <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
    </td>
    <td class="rating form-group">
      <span>3</span>
      <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
    </td>
    <td class="rating form-group">
      <span>4</span>
      <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
    </td>
    <td class="rating form-group">
      <span>5</span>
      <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
    </td>
  </tr>`;
      html +=option;
      list.innerHTML=html;
    console.log(option);
      
  });
}

function intListLevels3(result) {
  let option =""
  let html =""
  let list = document.querySelector(".intlistdata123")
 
  result.forEach(department => {
    option=`  <tr>
    <td scope="col-10" class="details">
    ${department.info.details}
    </td>
    <td class="rating form-group">
      <span>1</span>
      <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
    </td>
    <td class="rating form-group">
      <span>2</span>
      <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
    </td>
    <td class="rating form-group">
      <span>3</span>
      <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
    </td>
    <td class="rating form-group">
      <span>4</span>
      <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
    </td>
    <td class="rating form-group">
      <span>5</span>
      <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
    </td>
  </tr>`;
      html +=option;
      list.innerHTML=html;
     
      
  });
}
function intListLevels4(result) {
  let option =""
  let html =""
  let list = document.querySelector(".intlistdata124")
 
  result.forEach(department => {
    option=`  <tr>
    <td scope="col-10" class="details">
    ${department.info.details}
    </td>
    <td class="rating form-group">
      <span>1</span>
      <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
    </td>
    <td class="rating form-group">
      <span>2</span>
      <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
    </td>
    <td class="rating form-group">
      <span>3</span>
      <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
    </td>
    <td class="rating form-group">
      <span>4</span>
      <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
    </td>
    <td class="rating form-group">
      <span>5</span>
      <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
    </td>
  </tr>`;
      html +=option;
      list.innerHTML=html;
     
      
  });
}


function inListLevels1(result) {

  console.log(result);
  let option =""
  let html =""
  let list = document.querySelector(".inlistdata121")
 
  result.forEach(department => {
    console.log(department.details);
    option=`  <tr>
    <td scope="col-10" class="details">
    ${department.info.details}
    </td>
    <td class="rating form-group">
      <span>1</span>
      <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
    </td>
    <td class="rating form-group">
      <span>2</span>
      <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
    </td>
    <td class="rating form-group">
      <span>3</span>
      <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
    </td>
    <td class="rating form-group">
      <span>4</span>
      <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
    </td>
    <td class="rating form-group">
      <span>5</span>
      <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
    </td>
  </tr>`;
      html +=option;
      list.innerHTML=html;
     console.log(option);
      
  });
}
function inListLevels2(result) {
  let option =""
  let html =""
  let list = document.querySelector(".inlistdata122e")
 
  result.forEach(department => {
    option=`  <tr>
    <td scope="col-10" class="details">
    ${department.info.details}
    </td>
    <td class="rating form-group">
      <span>1</span>
      <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
    </td>
    <td class="rating form-group">
      <span>2</span>
      <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
    </td>
    <td class="rating form-group">
      <span>3</span>
      <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
    </td>
    <td class="rating form-group">
      <span>4</span>
      <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
    </td>
    <td class="rating form-group">
      <span>5</span>
      <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
    </td>
  </tr>`;
      html +=option;
      list.innerHTML=html;
    console.log(option);
      
  });
}

function inListLevels3(result) {
  let option =""
  let html =""
  let list = document.querySelector(".inlistdata123")
 
  result.forEach(department => {
    option=`  <tr>
    <td scope="col-10" class="details">
    ${department.info.details}
    </td>
    <td class="rating form-group">
      <span>1</span>
      <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
    </td>
    <td class="rating form-group">
      <span>2</span>
      <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
    </td>
    <td class="rating form-group">
      <span>3</span>
      <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
    </td>
    <td class="rating form-group">
      <span>4</span>
      <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
    </td>
    <td class="rating form-group">
      <span>5</span>
      <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
    </td>
  </tr>`;
      html +=option;
      list.innerHTML=html;
     
      
  });
}
function inListLevels4(result) {
  let option =""
  let html =""
  let list = document.querySelector(".inlistdata124")
 
  result.forEach(department => {
    option=`  <tr>
      <td scope="col-10" class="details">
      ${department.info.details}
      </td>
      <td class="rating form-group">
        <span>1</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
      </td>
      <td class="rating form-group">
        <span>2</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
      </td>
      <td class="rating form-group">
        <span>3</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
      </td>
      <td class="rating form-group">
        <span>4</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
      </td>
      <td class="rating form-group">
        <span>5</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
      </td>
    </tr>`;
      html +=option;
      list.innerHTML=html;
     
      
  });
}

function peListLevels1(result) {

  console.log(result);
  let option =""
  let html =""
  let list = document.querySelector(".pelistdata121")
 
  result.forEach(department => {
    console.log(department.details);
       option=`  <tr>
      <td scope="col-10" class="details">
      ${department.info.details}
      </td>
      <td class="rating form-group">
        <span>1</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
      </td>
      <td class="rating form-group">
        <span>2</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
      </td>
      <td class="rating form-group">
        <span>3</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
      </td>
      <td class="rating form-group">
        <span>4</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
      </td>
      <td class="rating form-group">
        <span>5</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
      </td>
    </tr>`;
      html +=option;
      list.innerHTML=html;
     console.log(option);
      
  });
}
function peListLevels2(result) {
  let option =""
  let html =""
  let list = document.querySelector(".pelistdata122e")
 
  result.forEach(department => {
       option=`  <tr>
      <td scope="col-10" class="details">
      ${department.info.details}
      </td>
      <td class="rating form-group">
        <span>1</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
      </td>
      <td class="rating form-group">
        <span>2</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
      </td>
      <td class="rating form-group">
        <span>3</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
      </td>
      <td class="rating form-group">
        <span>4</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
      </td>
      <td class="rating form-group">
        <span>5</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
      </td>
    </tr>`;
      html +=option;
      list.innerHTML=html;
    console.log(option);
      
  });
}

function peListLevels3(result) {
  let option =""
  let html =""
  let list = document.querySelector(".pelistdata123")
 
  result.forEach(department => {
       option=`  <tr>
      <td scope="col-10" class="details">
      ${department.info.details}
      </td>
      <td class="rating form-group">
        <span>1</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
      </td>
      <td class="rating form-group">
        <span>2</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
      </td>
      <td class="rating form-group">
        <span>3</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
      </td>
      <td class="rating form-group">
        <span>4</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
      </td>
      <td class="rating form-group">
        <span>5</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
      </td>
    </tr>`;
      html +=option;
      list.innerHTML=html;
     
      
  });
}
function peListLevels4(result) {
  let option =""
  let html =""
  let list = document.querySelector(".pelistdata124")
 
  result.forEach(department => {
       option=`  <tr>
      <td scope="col-10" class="details">
      ${department.info.details}
      </td>
      <td class="rating form-group">
        <span>1</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
      </td>
      <td class="rating form-group">
        <span>2</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
      </td>
      <td class="rating form-group">
        <span>3</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
      </td>
      <td class="rating form-group">
        <span>4</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
      </td>
      <td class="rating form-group">
        <span>5</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
      </td>
    </tr>`;
      html +=option;
      list.innerHTML=html;
     
      
  });
}

function comListLevels1(result) {

  console.log(result);
  let option =""
  let html =""
  let list = document.querySelector(".comlistdata121")
 
  result.forEach(department => {
    console.log(department.details);
       option=`  <tr>
      <td scope="col-10" class="details">
      ${department.info.details}
      </td>
      <td class="rating form-group">
        <span>1</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
      </td>
      <td class="rating form-group">
        <span>2</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
      </td>
      <td class="rating form-group">
        <span>3</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
      </td>
      <td class="rating form-group">
        <span>4</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
      </td>
      <td class="rating form-group">
        <span>5</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
      </td>
    </tr>`;
      html +=option;
      list.innerHTML=html;
     console.log(option);
      
  });
}
function comListLevels2(result) {
  let option =""
  let html =""
  let list = document.querySelector(".comlistdata122e")
 
  result.forEach(department => {
       option=`  <tr>
      <td scope="col-10" class="details">
      ${department.info.details}
      </td>
      <td class="rating form-group">
        <span>1</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
      </td>
      <td class="rating form-group">
        <span>2</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
      </td>
      <td class="rating form-group">
        <span>3</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
      </td>
      <td class="rating form-group">
        <span>4</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
      </td>
      <td class="rating form-group">
        <span>5</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
      </td>
    </tr>`;
      html +=option;
      list.innerHTML=html;
    console.log(option);
      
  });
}

function comListLevels3(result) {
  let option =""
  let html =""
  let list = document.querySelector(".comlistdata123")
 
  result.forEach(department => {
       option=`  <tr>
      <td scope="col-10" class="details">
      ${department.info.details}
      </td>
      <td class="rating form-group">
        <span>1</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
      </td>
      <td class="rating form-group">
        <span>2</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
      </td>
      <td class="rating form-group">
        <span>3</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
      </td>
      <td class="rating form-group">
        <span>4</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
      </td>
      <td class="rating form-group">
        <span>5</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
      </td>
    </tr>`;
      html +=option;
      list.innerHTML=html;
     
      
  });
}
function comListLevels4(result) {
  let option =""
  let html =""
  let list = document.querySelector(".comlistdata124")
 
  result.forEach(department => {
       option=`  <tr>
      <td scope="col-10" class="details">
      ${department.info.details}
      </td>
      <td class="rating form-group">
        <span>1</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
      </td>
      <td class="rating form-group">
        <span>2</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
      </td>
      <td class="rating form-group">
        <span>3</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
      </td>
      <td class="rating form-group">
        <span>4</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
      </td>
      <td class="rating form-group">
        <span>5</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
      </td>
    </tr>`;
      html +=option;
      list.innerHTML=html;
     
      
  });
}

function sdoListLevels1(result) {

  console.log(result);
  let option =""
  let html =""
  let list = document.querySelector(".sdolistdata121")
 
  result.forEach(department => {
    console.log(department.details);
       option=`  <tr>
      <td scope="col-10" class="details">
      ${department.info.details}
      </td>
      <td class="rating form-group">
        <span>1</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
      </td>
      <td class="rating form-group">
        <span>2</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
      </td>
      <td class="rating form-group">
        <span>3</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
      </td>
      <td class="rating form-group">
        <span>4</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
      </td>
      <td class="rating form-group">
        <span>5</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
      </td>
    </tr>`;
      html +=option;
      list.innerHTML=html;
     console.log(option);
      
  });
}
function sdoListLevels2(result) {
  let option =""
  let html =""
  let list = document.querySelector(".sdolistdata122e")
 
  result.forEach(department => {
       option=`  <tr>
      <td scope="col-10" class="details">
      ${department.info.details}
      </td>
      <td class="rating form-group">
        <span>1</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
      </td>
      <td class="rating form-group">
        <span>2</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
      </td>
      <td class="rating form-group">
        <span>3</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
      </td>
      <td class="rating form-group">
        <span>4</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
      </td>
      <td class="rating form-group">
        <span>5</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
      </td>
    </tr>`;
      html +=option;
      list.innerHTML=html;
    console.log(option);
      
  });
}

function sdoListLevels3(result) {
  let option =""
  let html =""
  let list = document.querySelector(".sdolistdata123")
 
  result.forEach(department => {
       option=`  <tr>
      <td scope="col-10" class="details">
      ${department.info.details}
      </td>
      <td class="rating form-group">
        <span>1</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
      </td>
      <td class="rating form-group">
        <span>2</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
      </td>
      <td class="rating form-group">
        <span>3</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
      </td>
      <td class="rating form-group">
        <span>4</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
      </td>
      <td class="rating form-group">
        <span>5</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
      </td>
    </tr>`;
      html +=option;
      list.innerHTML=html;
     
      
  });
}
function sdoListLevels4(result) {
  let option =""
  let html =""
  let list = document.querySelector(".sdolistdata124")
 
  result.forEach(department => {
       option=`  <tr>
      <td scope="col-10" class="details">
      ${department.info.details}
      </td>
      <td class="rating form-group">
        <span>1</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
      </td>
      <td class="rating form-group">
        <span>2</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
      </td>
      <td class="rating form-group">
        <span>3</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
      </td>
      <td class="rating form-group">
        <span>4</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
      </td>
      <td class="rating form-group">
        <span>5</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
      </td>
    </tr>`;
      html +=option;
      list.innerHTML=html;
     
      
  });
}

function actListLevels1(result) {

  console.log(result);
  let option =""
  let html =""
  let list = document.querySelector(".actlistdata121")
 
  result.forEach(department => {
    console.log(department.details);
       option=`  <tr>
      <td scope="col-10" class="details">
      ${department.info.details}
      </td>
      <td class="rating form-group">
        <span>1</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
      </td>
      <td class="rating form-group">
        <span>2</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
      </td>
      <td class="rating form-group">
        <span>3</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
      </td>
      <td class="rating form-group">
        <span>4</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
      </td>
      <td class="rating form-group">
        <span>5</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
      </td>
    </tr>`;
      html +=option;
      list.innerHTML=html;
     console.log(option);
      
  });
}
function actListLevels2(result) {
  let option =""
  let html =""
  let list = document.querySelector(".actlistdata122e")
 
  result.forEach(department => {
       option=`  <tr>
      <td scope="col-10" class="details">
      ${department.info.details}
      </td>
      <td class="rating form-group">
        <span>1</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
      </td>
      <td class="rating form-group">
        <span>2</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
      </td>
      <td class="rating form-group">
        <span>3</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
      </td>
      <td class="rating form-group">
        <span>4</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
      </td>
      <td class="rating form-group">
        <span>5</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
      </td>
    </tr>`;
      html +=option;
      list.innerHTML=html;
    console.log(option);
      
  });
}

function actListLevels3(result) {
  let option =""
  let html =""
  let list = document.querySelector(".actlistdata123")
 
  result.forEach(department => {
       option=`  <tr>
      <td scope="col-10" class="details">
      ${department.info.details}
      </td>
      <td class="rating form-group">
        <span>1</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
      </td>
      <td class="rating form-group">
        <span>2</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
      </td>
      <td class="rating form-group">
        <span>3</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
      </td>
      <td class="rating form-group">
        <span>4</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
      </td>
      <td class="rating form-group">
        <span>5</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
      </td>
    </tr>`;
      html +=option;
      list.innerHTML=html;
     
      
  });
}
function actListLevels4(result) {
  let option =""
  let html =""
  let list = document.querySelector(".actlistdata124")
 
  result.forEach(department => {
       option=`  <tr>
      <td scope="col-10" class="details">
      ${department.info.details}
      </td>
      <td class="rating form-group">
        <span>1</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
      </td>
      <td class="rating form-group">
        <span>2</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
      </td>
      <td class="rating form-group">
        <span>3</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
      </td>
      <td class="rating form-group">
        <span>4</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
      </td>
      <td class="rating form-group">
        <span>5</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
      </td>
    </tr>`;
      html +=option;
      list.innerHTML=html;
     
      
  });
}

function conListLevels1(result) {

  console.log(result);
  let option =""
  let html =""
  let list = document.querySelector(".conlistdata121")
 
  result.forEach(department => {
    console.log(department.details);
       option=`  <tr>
      <td scope="col-10" class="details">
      ${department.info.details}
      </td>
      <td class="rating form-group">
        <span>1</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
      </td>
      <td class="rating form-group">
        <span>2</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
      </td>
      <td class="rating form-group">
        <span>3</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
      </td>
      <td class="rating form-group">
        <span>4</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
      </td>
      <td class="rating form-group">
        <span>5</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
      </td>
    </tr>`;
      html +=option;
      list.innerHTML=html;
     console.log(option);
      
  });
}
function conListLevels2(result) {
  let option =""
  let html =""
  let list = document.querySelector(".conlistdata122e")
 
  result.forEach(department => {
       option=`  <tr>
      <td scope="col-10" class="details">
      ${department.info.details}
      </td>
      <td class="rating form-group">
        <span>1</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
      </td>
      <td class="rating form-group">
        <span>2</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
      </td>
      <td class="rating form-group">
        <span>3</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
      </td>
      <td class="rating form-group">
        <span>4</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
      </td>
      <td class="rating form-group">
        <span>5</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
      </td>
    </tr>`;
      html +=option;
      list.innerHTML=html;
    console.log(option);
      
  });
}

function conListLevels3(result) {
  let option =""
  let html =""
  let list = document.querySelector(".conlistdata123")
 
  result.forEach(department => {
       option=`  <tr>
      <td scope="col-10" class="details">
      ${department.info.details}
      </td>
      <td class="rating form-group">
        <span>1</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
      </td>
      <td class="rating form-group">
        <span>2</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
      </td>
      <td class="rating form-group">
        <span>3</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
      </td>
      <td class="rating form-group">
        <span>4</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
      </td>
      <td class="rating form-group">
        <span>5</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
      </td>
    </tr>`;
      html +=option;
      list.innerHTML=html;
     
      
  });
}
function conListLevels4(result) {
  let option =""
  let html =""
  let list = document.querySelector(".conlistdata124")
 
  result.forEach(department => {
       option=`  <tr>
      <td scope="col-10" class="details">
      ${department.info.details}
      </td>
      <td class="rating form-group">
        <span>1</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
      </td>
      <td class="rating form-group">
        <span>2</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
      </td>
      <td class="rating form-group">
        <span>3</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
      </td>
      <td class="rating form-group">
        <span>4</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
      </td>
      <td class="rating form-group">
        <span>5</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
      </td>
    </tr>`;
      html +=option;
      list.innerHTML=html;
     
      
  });
}

function loListLevels1(result) {

  console.log(result);
  let option =""
  let html =""
  let list = document.querySelector(".lolistdata121")
 
  result.forEach(department => {
    console.log(department.details);
       option=`  <tr>
      <td scope="col-10" class="details">
      ${department.info.details}
      </td>
      <td class="rating form-group">
        <span>1</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
      </td>
      <td class="rating form-group">
        <span>2</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
      </td>
      <td class="rating form-group">
        <span>3</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
      </td>
      <td class="rating form-group">
        <span>4</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
      </td>
      <td class="rating form-group">
        <span>5</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
      </td>
    </tr>`;
      html +=option;
      list.innerHTML=html;
     console.log(option);
      
  });
}
function loListLevels2(result) {
  let option =""
  let html =""
  let list = document.querySelector(".lolistdata122e")
 
  result.forEach(department => {
       option=`  <tr>
      <td scope="col-10" class="details">
      ${department.info.details}
      </td>
      <td class="rating form-group">
        <span>1</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
      </td>
      <td class="rating form-group">
        <span>2</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
      </td>
      <td class="rating form-group">
        <span>3</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
      </td>
      <td class="rating form-group">
        <span>4</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
      </td>
      <td class="rating form-group">
        <span>5</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
      </td>
    </tr>`;
      html +=option;
      list.innerHTML=html;
    console.log(option);
      
  });
}

function loListLevels3(result) {
  let option =""
  let html =""
  let list = document.querySelector(".lolistdata123")
 
  result.forEach(department => {
       option=`  <tr>
      <td scope="col-10" class="details">
      ${department.info.details}
      </td>
      <td class="rating form-group">
        <span>1</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
      </td>
      <td class="rating form-group">
        <span>2</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
      </td>
      <td class="rating form-group">
        <span>3</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
      </td>
      <td class="rating form-group">
        <span>4</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
      </td>
      <td class="rating form-group">
        <span>5</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
      </td>
    </tr>`;
      html +=option;
      list.innerHTML=html;
     
      
  });
}
function loListLevels4(result) {
  let option =""
  let html =""
  let list = document.querySelector(".lolistdata124")
 
  result.forEach(department => {
       option=`  <tr>
      <td scope="col-10" class="details">
      ${department.info.details}
      </td>
      <td class="rating form-group">
        <span>1</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
      </td>
      <td class="rating form-group">
        <span>2</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
      </td>
      <td class="rating form-group">
        <span>3</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
      </td>
      <td class="rating form-group">
        <span>4</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
      </td>
      <td class="rating form-group">
        <span>5</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
      </td>
    </tr>`;
      html +=option;
      list.innerHTML=html;
     
      
  });
}

function aeListLevels1(result) {

  console.log(result);
  let option =""
  let html =""
  let list = document.querySelector(".aelistdata121")
 
  result.forEach(department => {
    console.log(department.details);
       option=`  <tr>
      <td scope="col-10" class="details">
      ${department.info.details}
      </td>
      <td class="rating form-group">
        <span>1</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
      </td>
      <td class="rating form-group">
        <span>2</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
      </td>
      <td class="rating form-group">
        <span>3</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
      </td>
      <td class="rating form-group">
        <span>4</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
      </td>
      <td class="rating form-group">
        <span>5</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
      </td>
    </tr>`;
      html +=option;
      list.innerHTML=html;
     console.log(option);
      
  });
}
function aeListLevels2(result) {
  let option =""
  let html =""
  let list = document.querySelector(".aelistdata122e")
 
  result.forEach(department => {
       option=`  <tr>
      <td scope="col-10" class="details">
      ${department.info.details}
      </td>
      <td class="rating form-group">
        <span>1</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
      </td>
      <td class="rating form-group">
        <span>2</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
      </td>
      <td class="rating form-group">
        <span>3</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
      </td>
      <td class="rating form-group">
        <span>4</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
      </td>
      <td class="rating form-group">
        <span>5</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
      </td>
    </tr>`;
      html +=option;
      list.innerHTML=html;
    console.log(option);
      
  });
}

function aeListLevels3(result) {
  let option =""
  let html =""
  let list = document.querySelector(".aelistdata123")
 
  result.forEach(department => {
       option=`  <tr>
      <td scope="col-10" class="details">
      ${department.info.details}
      </td>
      <td class="rating form-group">
        <span>1</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
      </td>
      <td class="rating form-group">
        <span>2</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
      </td>
      <td class="rating form-group">
        <span>3</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
      </td>
      <td class="rating form-group">
        <span>4</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
      </td>
      <td class="rating form-group">
        <span>5</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
      </td>
    </tr>`;
      html +=option;
      list.innerHTML=html;
     
      
  });
}
function aeListLevels4(result) {
  let option =""
  let html =""
  let list = document.querySelector(".aelistdata124")
 
  result.forEach(department => {
       option=`  <tr>
      <td scope="col-10" class="details">
      ${department.info.details}
      </td>
      <td class="rating form-group">
        <span>1</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
      </td>
      <td class="rating form-group">
        <span>2</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
      </td>
      <td class="rating form-group">
        <span>3</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
      </td>
      <td class="rating form-group">
        <span>4</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
      </td>
      <td class="rating form-group">
        <span>5</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
      </td>
    </tr>`;
      html +=option;
      list.innerHTML=html;
     
      
  });
}


function psListLevels1(result) {

  console.log(result);
  let option =""
  let html =""
  let list = document.querySelector(".pslistdata121")
 
  result.forEach(department => {
    console.log(department.details);
       option=`  <tr>
      <td scope="col-10" class="details">
      ${department.info.details}
      </td>
      <td class="rating form-group">
        <span>1</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
      </td>
      <td class="rating form-group">
        <span>2</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
      </td>
      <td class="rating form-group">
        <span>3</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
      </td>
      <td class="rating form-group">
        <span>4</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
      </td>
      <td class="rating form-group">
        <span>5</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
      </td>
    </tr>`;
      html +=option;
      list.innerHTML=html;
     console.log(option);
      
  });
}
function psListLevels2(result) {
  let option =""
  let html =""
  let list = document.querySelector(".pslistdata122e")
 
  result.forEach(department => {
       option=`  <tr>
      <td scope="col-10" class="details">
      ${department.info.details}
      </td>
      <td class="rating form-group">
        <span>1</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
      </td>
      <td class="rating form-group">
        <span>2</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
      </td>
      <td class="rating form-group">
        <span>3</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
      </td>
      <td class="rating form-group">
        <span>4</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
      </td>
      <td class="rating form-group">
        <span>5</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
      </td>
    </tr>`;
      html +=option;
      list.innerHTML=html;
    console.log(option);
      
  });
}

function psListLevels3(result) {
  let option =""
  let html =""
  let list = document.querySelector(".pslistdata123")
 
  result.forEach(department => {
       option=`  <tr>
      <td scope="col-10" class="details">
      ${department.info.details}
      </td>
      <td class="rating form-group">
        <span>1</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
      </td>
      <td class="rating form-group">
        <span>2</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
      </td>
      <td class="rating form-group">
        <span>3</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
      </td>
      <td class="rating form-group">
        <span>4</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
      </td>
      <td class="rating form-group">
        <span>5</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
      </td>
    </tr>`;
      html +=option;
      list.innerHTML=html;
     
      
  });
}
function psListLevels4(result) {
  let option =""
  let html =""
  let list = document.querySelector(".pslistdata124")
 
  result.forEach(department => {
       option=`  <tr>
      <td scope="col-10" class="details">
      ${department.info.details}
      </td>
      <td class="rating form-group">
        <span>1</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
      </td>
      <td class="rating form-group">
        <span>2</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
      </td>
      <td class="rating form-group">
        <span>3</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
      </td>
      <td class="rating form-group">
        <span>4</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
      </td>
      <td class="rating form-group">
        <span>5</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
      </td>
    </tr>`;
      html +=option;
      list.innerHTML=html;
     
      
  });
}



function cbListLevels1(result) {

  console.log(result);
  let option =""
  let html =""
  let list = document.querySelector(".cblistdata121")
 
  result.forEach(department => {
    console.log(department.details);
       option=`  <tr>
      <td scope="col-10" class="details">
      ${department.info.details}
      </td>
      <td class="rating form-group">
        <span>1</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
      </td>
      <td class="rating form-group">
        <span>2</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
      </td>
      <td class="rating form-group">
        <span>3</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
      </td>
      <td class="rating form-group">
        <span>4</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
      </td>
      <td class="rating form-group">
        <span>5</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
      </td>
    </tr>`;
      html +=option;
      list.innerHTML=html;
     console.log(option);
      
  });
}
function cbListLevels2(result) {
  let option =""
  let html =""
  let list = document.querySelector(".cblistdata122e")
 
  result.forEach(department => {
       option=`  <tr>
      <td scope="col-10" class="details">
      ${department.info.details}
      </td>
      <td class="rating form-group">
        <span>1</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
      </td>
      <td class="rating form-group">
        <span>2</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
      </td>
      <td class="rating form-group">
        <span>3</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
      </td>
      <td class="rating form-group">
        <span>4</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
      </td>
      <td class="rating form-group">
        <span>5</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
      </td>
    </tr>`;
      html +=option;
      list.innerHTML=html;
    console.log(option);
      
  });
}

function cbListLevels3(result) {
  let option =""
  let html =""
  let list = document.querySelector(".cblistdata123")
 
  result.forEach(department => {
       option=`  <tr>
      <td scope="col-10" class="details">
      ${department.info.details}
      </td>
      <td class="rating form-group">
        <span>1</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
      </td>
      <td class="rating form-group">
        <span>2</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
      </td>
      <td class="rating form-group">
        <span>3</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
      </td>
      <td class="rating form-group">
        <span>4</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
      </td>
      <td class="rating form-group">
        <span>5</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
      </td>
    </tr>`;
      html +=option;
      list.innerHTML=html;
     
      
  });
}
function cbListLevels4(result) {
  let option =""
  let html =""
  let list = document.querySelector(".cblistdata124")
 
  result.forEach(department => {
       option=`  <tr>
      <td scope="col-10" class="details">
      ${department.info.details}
      </td>
      <td class="rating form-group">
        <span>1</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
      </td>
      <td class="rating form-group">
        <span>2</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
      </td>
      <td class="rating form-group">
        <span>3</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
      </td>
      <td class="rating form-group">
        <span>4</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
      </td>
      <td class="rating form-group">
        <span>5</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
      </td>
    </tr>`;
      html +=option;
      list.innerHTML=html;
     
      
  });
}

function ewListLevels1(result) {

  console.log(result);
  let option =""
  let html =""
  let list = document.querySelector(".ewlistdata121")
 
  result.forEach(department => {
    console.log(department.details);
       option=`  <tr>
      <td scope="col-10" class="details">
      ${department.info.details}
      </td>
      <td class="rating form-group">
        <span>1</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
      </td>
      <td class="rating form-group">
        <span>2</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
      </td>
      <td class="rating form-group">
        <span>3</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
      </td>
      <td class="rating form-group">
        <span>4</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
      </td>
      <td class="rating form-group">
        <span>5</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
      </td>
    </tr>`;
      html +=option;
      list.innerHTML=html;
     console.log(option);
      
  });
}
function ewListLevels2(result) {
  let option =""
  let html =""
  let list = document.querySelector(".ewlistdata122e")
 
  result.forEach(department => {
       option=`  <tr>
      <td scope="col-10" class="details">
      ${department.info.details}
      </td>
      <td class="rating form-group">
        <span>1</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
      </td>
      <td class="rating form-group">
        <span>2</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
      </td>
      <td class="rating form-group">
        <span>3</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
      </td>
      <td class="rating form-group">
        <span>4</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
      </td>
      <td class="rating form-group">
        <span>5</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
      </td>
    </tr>`;
      html +=option;
      list.innerHTML=html;
    console.log(option);
      
  });
}

function ewListLevels3(result) {
  let option =""
  let html =""
  let list = document.querySelector(".ewlistdata123")
 
  result.forEach(department => {
       option=`  <tr>
      <td scope="col-10" class="details">
      ${department.info.details}
      </td>
      <td class="rating form-group">
        <span>1</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
      </td>
      <td class="rating form-group">
        <span>2</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
      </td>
      <td class="rating form-group">
        <span>3</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
      </td>
      <td class="rating form-group">
        <span>4</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
      </td>
      <td class="rating form-group">
        <span>5</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
      </td>
    </tr>`;
      html +=option;
      list.innerHTML=html;
     
      
  });
}
function ewListLevels4(result) {
  let option =""
  let html =""
  let list = document.querySelector(".ewlistdata124")
 
  result.forEach(department => {
       option=`  <tr>
      <td scope="col-10" class="details">
      ${department.info.details}
      </td>
      <td class="rating form-group">
        <span>1</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
      </td>
      <td class="rating form-group">
        <span>2</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
      </td>
      <td class="rating form-group">
        <span>3</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
      </td>
      <td class="rating form-group">
        <span>4</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
      </td>
      <td class="rating form-group">
        <span>5</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
      </td>
    </tr>`;
      html +=option;
      list.innerHTML=html;
     
      
  });
}

function rsListLevels1(result) {

  console.log(result);
  let option =""
  let html =""
  let list = document.querySelector(".rslistdata121")
 
  result.forEach(department => {
    console.log(department.details);
       option=`  <tr>
      <td scope="col-10" class="details">
      ${department.info.details}
      </td>
      <td class="rating form-group">
        <span>1</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
      </td>
      <td class="rating form-group">
        <span>2</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
      </td>
      <td class="rating form-group">
        <span>3</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
      </td>
      <td class="rating form-group">
        <span>4</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
      </td>
      <td class="rating form-group">
        <span>5</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
      </td>
    </tr>`;
      html +=option;
      list.innerHTML=html;
     console.log(option);
      
  });
}
function rsListLevels2(result) {
  let option =""
  let html =""
  let list = document.querySelector(".rslistdata122e")
 
  result.forEach(department => {
       option=`  <tr>
      <td scope="col-10" class="details">
      ${department.info.details}
      </td>
      <td class="rating form-group">
        <span>1</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
      </td>
      <td class="rating form-group">
        <span>2</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
      </td>
      <td class="rating form-group">
        <span>3</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
      </td>
      <td class="rating form-group">
        <span>4</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
      </td>
      <td class="rating form-group">
        <span>5</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
      </td>
    </tr>`;
      html +=option;
      list.innerHTML=html;
    console.log(option);
      
  });
}

function rsListLevels3(result) {
  let option =""
  let html =""
  let list = document.querySelector(".rslistdata123")
 
  result.forEach(department => {
       option=`  <tr>
      <td scope="col-10" class="details">
      ${department.info.details}
      </td>
      <td class="rating form-group">
        <span>1</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
      </td>
      <td class="rating form-group">
        <span>2</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
      </td>
      <td class="rating form-group">
        <span>3</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
      </td>
      <td class="rating form-group">
        <span>4</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
      </td>
      <td class="rating form-group">
        <span>5</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
      </td>
    </tr>`;
      html +=option;
      list.innerHTML=html;
     
      
  });
}
function rsListLevels4(result) {
  let option =""
  let html =""
  let list = document.querySelector(".rslistdata124")
 
  result.forEach(department => {
       option=`  <tr>
      <td scope="col-10" class="details">
      ${department.info.details}
      </td>
      <td class="rating form-group">
        <span>1</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
      </td>
      <td class="rating form-group">
        <span>2</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
      </td>
      <td class="rating form-group">
        <span>3</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
      </td>
      <td class="rating form-group">
        <span>4</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
      </td>
      <td class="rating form-group">
        <span>5</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
      </td>
    </tr>`;
      html +=option;
      list.innerHTML=html;
     
      
  });
}

function drListLevels1(result) {

  console.log(result);
  let option =""
  let html =""
  let list = document.querySelector(".drlistdata121")
 
  result.forEach(department => {
    console.log(department.details);
       option=`  <tr>
      <td scope="col-10" class="details">
      ${department.info.details}
      </td>
      <td class="rating form-group">
        <span>1</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
      </td>
      <td class="rating form-group">
        <span>2</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
      </td>
      <td class="rating form-group">
        <span>3</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
      </td>
      <td class="rating form-group">
        <span>4</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
      </td>
      <td class="rating form-group">
        <span>5</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
      </td>
    </tr>`;
      html +=option;
      list.innerHTML=html;
     console.log(option);
      
  });
}
function drListLevels2(result) {
  let option =""
  let html =""
  let list = document.querySelector(".drlistdata122e")
 
  result.forEach(department => {
       option=`  <tr>
      <td scope="col-10" class="details">
      ${department.info.details}
      </td>
      <td class="rating form-group">
        <span>1</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
      </td>
      <td class="rating form-group">
        <span>2</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
      </td>
      <td class="rating form-group">
        <span>3</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
      </td>
      <td class="rating form-group">
        <span>4</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
      </td>
      <td class="rating form-group">
        <span>5</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
      </td>
    </tr>`;
      html +=option;
      list.innerHTML=html;
    console.log(option);
      
  });
}

function drListLevels3(result) {
  let option =""
  let html =""
  let list = document.querySelector(".drlistdata123")
 
  result.forEach(department => {
       option=`  <tr>
      <td scope="col-10" class="details">
      ${department.info.details}
      </td>
      <td class="rating form-group">
        <span>1</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
      </td>
      <td class="rating form-group">
        <span>2</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
      </td>
      <td class="rating form-group">
        <span>3</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
      </td>
      <td class="rating form-group">
        <span>4</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
      </td>
      <td class="rating form-group">
        <span>5</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
      </td>
    </tr>`;
      html +=option;
      list.innerHTML=html;
     
      
  });
}
function drListLevels4(result) {
  let option =""
  let html =""
  let list = document.querySelector(".drlistdata124")
 
  result.forEach(department => {
       option=`  <tr>
      <td scope="col-10" class="details">
      ${department.info.details}
      </td>
      <td class="rating form-group">
        <span>1</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
      </td>
      <td class="rating form-group">
        <span>2</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
      </td>
      <td class="rating form-group">
        <span>3</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
      </td>
      <td class="rating form-group">
        <span>4</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
      </td>
      <td class="rating form-group">
        <span>5</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
      </td>
    </tr>`;
      html +=option;
      list.innerHTML=html;
     
      
  });
}


function iiListLevels1(result) {

  console.log(result);
  let option =""
  let html =""
  let list = document.querySelector(".iilistdata121")
 
  result.forEach(department => {
    console.log(department.details);
       option=`  <tr>
      <td scope="col-10" class="details">
      ${department.info.details}
      </td>
      <td class="rating form-group">
        <span>1</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
      </td>
      <td class="rating form-group">
        <span>2</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
      </td>
      <td class="rating form-group">
        <span>3</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
      </td>
      <td class="rating form-group">
        <span>4</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
      </td>
      <td class="rating form-group">
        <span>5</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
      </td>
    </tr>`;
      html +=option;
      list.innerHTML=html;
     console.log(option);
      
  });
}
function iiListLevels2(result) {
  let option =""
  let html =""
  let list = document.querySelector(".iilistdata122e")
 
  result.forEach(department => {
       option=`  <tr>
      <td scope="col-10" class="details">
      ${department.info.details}
      </td>
      <td class="rating form-group">
        <span>1</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
      </td>
      <td class="rating form-group">
        <span>2</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
      </td>
      <td class="rating form-group">
        <span>3</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
      </td>
      <td class="rating form-group">
        <span>4</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
      </td>
      <td class="rating form-group">
        <span>5</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
      </td>
    </tr>`;
      html +=option;
      list.innerHTML=html;
    console.log(option);
      
  });
}

function iiListLevels3(result) {
  let option =""
  let html =""
  let list = document.querySelector(".iilistdata123")
 
  result.forEach(department => {
       option=`  <tr>
      <td scope="col-10" class="details">
      ${department.info.details}
      </td>
      <td class="rating form-group">
        <span>1</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
      </td>
      <td class="rating form-group">
        <span>2</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
      </td>
      <td class="rating form-group">
        <span>3</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
      </td>
      <td class="rating form-group">
        <span>4</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
      </td>
      <td class="rating form-group">
        <span>5</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
      </td>
    </tr>`;
      html +=option;
      list.innerHTML=html;
     
      
  });
}
function iiListLevels4(result) {
  let option =""
  let html =""
  let list = document.querySelector(".iilistdata124")
 
  result.forEach(department => {
       option=`  <tr>
      <td scope="col-10" class="details">
      ${department.info.details}
      </td>
      <td class="rating form-group">
        <span>1</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
      </td>
      <td class="rating form-group">
        <span>2</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
      </td>
      <td class="rating form-group">
        <span>3</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
      </td>
      <td class="rating form-group">
        <span>4</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
      </td>
      <td class="rating form-group">
        <span>5</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
      </td>
    </tr>`;
      html +=option;
      list.innerHTML=html;
     
      
  });
}


function menListLevels1(result) {

  console.log(result);
  let option =""
  let html =""
  let list = document.querySelector(".menlistdata121")
 
  result.forEach(department => {
    console.log(department.details);
       option=`  <tr>
      <td scope="col-10" class="details">
      ${department.info.details}
      </td>
      <td class="rating form-group">
        <span>1</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
      </td>
      <td class="rating form-group">
        <span>2</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
      </td>
      <td class="rating form-group">
        <span>3</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
      </td>
      <td class="rating form-group">
        <span>4</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
      </td>
      <td class="rating form-group">
        <span>5</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
      </td>
    </tr>`;
      html +=option;
      list.innerHTML=html;
     console.log(option);
      
  });
}
function menListLevels2(result) {
  let option =""
  let html =""
  let list = document.querySelector(".menlistdata122e")
 
  result.forEach(department => {
       option=`  <tr>
      <td scope="col-10" class="details">
      ${department.info.details}
      </td>
      <td class="rating form-group">
        <span>1</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
      </td>
      <td class="rating form-group">
        <span>2</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
      </td>
      <td class="rating form-group">
        <span>3</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
      </td>
      <td class="rating form-group">
        <span>4</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
      </td>
      <td class="rating form-group">
        <span>5</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
      </td>
    </tr>`;
      html +=option;
      list.innerHTML=html;
    console.log(option);
      
  });
}

function menListLevels3(result) {
  let option =""
  let html =""
  let list = document.querySelector(".menlistdata123")
 
  result.forEach(department => {
       option=`  <tr>
      <td scope="col-10" class="details">
      ${department.info.details}
      </td>
      <td class="rating form-group">
        <span>1</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
      </td>
      <td class="rating form-group">
        <span>2</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
      </td>
      <td class="rating form-group">
        <span>3</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
      </td>
      <td class="rating form-group">
        <span>4</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
      </td>
      <td class="rating form-group">
        <span>5</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
      </td>
    </tr>`;
      html +=option;
      list.innerHTML=html;
     
      
  });
}
function menListLevels4(result) {
  let option =""
  let html =""
  let list = document.querySelector(".menlistdata124")
 
  result.forEach(department => {
       option=`  <tr>
      <td scope="col-10" class="details">
      ${department.info.details}
      </td>
      <td class="rating form-group">
        <span>1</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
      </td>
      <td class="rating form-group">
        <span>2</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
      </td>
      <td class="rating form-group">
        <span>3</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
      </td>
      <td class="rating form-group">
        <span>4</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
      </td>
      <td class="rating form-group">
        <span>5</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
      </td>
    </tr>`;
      html +=option;
      list.innerHTML=html;
     
      
  });
}

function toListLevels1(result) {

  console.log(result);
  let option =""
  let html =""
  let list = document.querySelector(".tolistdata121")
 
  result.forEach(department => {
    console.log(department.details);
       option=`  <tr>
      <td scope="col-10" class="details">
      ${department.info.details}
      </td>
      <td class="rating form-group">
        <span>1</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
      </td>
      <td class="rating form-group">
        <span>2</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
      </td>
      <td class="rating form-group">
        <span>3</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
      </td>
      <td class="rating form-group">
        <span>4</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
      </td>
      <td class="rating form-group">
        <span>5</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
      </td>
    </tr>`;
      html +=option;
      list.innerHTML=html;
     console.log(option);
      
  });
}
function toListLevels2(result) {
  let option =""
  let html =""
  let list = document.querySelector(".tolistdata122e")
 
  result.forEach(department => {
       option=`  <tr>
      <td scope="col-10" class="details">
      ${department.info.details}
      </td>
      <td class="rating form-group">
        <span>1</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
      </td>
      <td class="rating form-group">
        <span>2</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
      </td>
      <td class="rating form-group">
        <span>3</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
      </td>
      <td class="rating form-group">
        <span>4</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
      </td>
      <td class="rating form-group">
        <span>5</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
      </td>
    </tr>`;
      html +=option;
      list.innerHTML=html;
    console.log(option);
      
  });
}

function toListLevels3(result) {
  let option =""
  let html =""
  let list = document.querySelector(".tolistdata123")
 
  result.forEach(department => {
       option=`  <tr>
      <td scope="col-10" class="details">
      ${department.info.details}
      </td>
      <td class="rating form-group">
        <span>1</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
      </td>
      <td class="rating form-group">
        <span>2</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
      </td>
      <td class="rating form-group">
        <span>3</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
      </td>
      <td class="rating form-group">
        <span>4</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
      </td>
      <td class="rating form-group">
        <span>5</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
      </td>
    </tr>`;
      html +=option;
      list.innerHTML=html;
     
      
  });
}
function toListLevels4(result) {
  let option =""
  let html =""
  let list = document.querySelector(".tolistdata124")
 
  result.forEach(department => {
       option=`  <tr>
      <td scope="col-10" class="details">
      ${department.info.details}
      </td>
      <td class="rating form-group">
        <span>1</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
      </td>
      <td class="rating form-group">
        <span>2</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
      </td>
      <td class="rating form-group">
        <span>3</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
      </td>
      <td class="rating form-group">
        <span>4</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
      </td>
      <td class="rating form-group">
        <span>5</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
      </td>
    </tr>`;
      html +=option;
      list.innerHTML=html;
     
      
  });
}

function emListLevels1(result) {

  console.log(result);
  let option =""
  let html =""
  let list = document.querySelector(".emlistdata121")
 
  result.forEach(department => {
    console.log(department.details);
       option=`  <tr>
      <td scope="col-10" class="details">
      ${department.info.details}
      </td>
      <td class="rating form-group">
        <span>1</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
      </td>
      <td class="rating form-group">
        <span>2</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
      </td>
      <td class="rating form-group">
        <span>3</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
      </td>
      <td class="rating form-group">
        <span>4</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
      </td>
      <td class="rating form-group">
        <span>5</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
      </td>
    </tr>`;
      html +=option;
      list.innerHTML=html;
     console.log(option);
      
  });
}
function emListLevels2(result) {
  let option =""
  let html =""
  let list = document.querySelector(".emlistdata122e")
 
  result.forEach(department => {
       option=`  <tr>
      <td scope="col-10" class="details">
      ${department.info.details}
      </td>
      <td class="rating form-group">
        <span>1</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
      </td>
      <td class="rating form-group">
        <span>2</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
      </td>
      <td class="rating form-group">
        <span>3</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
      </td>
      <td class="rating form-group">
        <span>4</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
      </td>
      <td class="rating form-group">
        <span>5</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
      </td>
    </tr>`;
      html +=option;
      list.innerHTML=html;
    console.log(option);
      
  });
}

function emListLevels3(result) {
  let option =""
  let html =""
  let list = document.querySelector(".emlistdata123")
 
  result.forEach(department => {
       option=`  <tr>
      <td scope="col-10" class="details">
      ${department.info.details}
      </td>
      <td class="rating form-group">
        <span>1</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
      </td>
      <td class="rating form-group">
        <span>2</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
      </td>
      <td class="rating form-group">
        <span>3</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
      </td>
      <td class="rating form-group">
        <span>4</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
      </td>
      <td class="rating form-group">
        <span>5</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
      </td>
    </tr>`;
      html +=option;
      list.innerHTML=html;
     
      
  });
}
function emListLevels4(result) {
  let option =""
  let html =""
  let list = document.querySelector(".emlistdata124")
 
  result.forEach(department => {
       option=`  <tr>
      <td scope="col-10" class="details">
      ${department.info.details}
      </td>
      <td class="rating form-group">
        <span>1</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
      </td>
      <td class="rating form-group">
        <span>2</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
      </td>
      <td class="rating form-group">
        <span>3</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
      </td>
      <td class="rating form-group">
        <span>4</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
      </td>
      <td class="rating form-group">
        <span>5</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
      </td>
    </tr>`;
      html +=option;
      list.innerHTML=html;
     
      
  });
}


function ioListLevels1(result) {

  console.log(result);
  let option =""
  let html =""
  let list = document.querySelector(".iolistdata121")
 
  result.forEach(department => {
    console.log(department.details);
       option=`  <tr>
      <td scope="col-10" class="details">
      ${department.info.details}
      </td>
      <td class="rating form-group">
        <span>1</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
      </td>
      <td class="rating form-group">
        <span>2</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
      </td>
      <td class="rating form-group">
        <span>3</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
      </td>
      <td class="rating form-group">
        <span>4</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
      </td>
      <td class="rating form-group">
        <span>5</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
      </td>
    </tr>`;
      html +=option;
      list.innerHTML=html;
     console.log(option);
      
  });
}
function ioListLevels2(result) {
  let option =""
  let html =""
  let list = document.querySelector(".iolistdata122e")
 
  result.forEach(department => {
       option=`  <tr>
      <td scope="col-10" class="details">
      ${department.info.details}
      </td>
      <td class="rating form-group">
        <span>1</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
      </td>
      <td class="rating form-group">
        <span>2</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
      </td>
      <td class="rating form-group">
        <span>3</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
      </td>
      <td class="rating form-group">
        <span>4</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
      </td>
      <td class="rating form-group">
        <span>5</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
      </td>
    </tr>`;
      html +=option;
      list.innerHTML=html;
    console.log(option);
      
  });
}

function ioListLevels3(result) {
  let option =""
  let html =""
  let list = document.querySelector(".iolistdata123")
 
  result.forEach(department => {
       option=`  <tr>
      <td scope="col-10" class="details">
      ${department.info.details}
      </td>
      <td class="rating form-group">
        <span>1</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
      </td>
      <td class="rating form-group">
        <span>2</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
      </td>
      <td class="rating form-group">
        <span>3</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
      </td>
      <td class="rating form-group">
        <span>4</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
      </td>
      <td class="rating form-group">
        <span>5</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
      </td>
    </tr>`;
      html +=option;
      list.innerHTML=html;
     
      
  });
}
function ioListLevels4(result) {
  let option =""
  let html =""
  let list = document.querySelector(".iolistdata124")
 
  result.forEach(department => {
       option=`  <tr>
      <td scope="col-10" class="details">
      ${department.info.details}
      </td>
      <td class="rating form-group">
        <span>1</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
      </td>
      <td class="rating form-group">
        <span>2</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
      </td>
      <td class="rating form-group">
        <span>3</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
      </td>
      <td class="rating form-group">
        <span>4</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
      </td>
      <td class="rating form-group">
        <span>5</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
      </td>
    </tr>`;
      html +=option;
      list.innerHTML=html;
     
      
  });
}

function imListLevels1(result) {

  console.log(result);
  let option =""
  let html =""
  let list = document.querySelector(".imlistdata121")
 
  result.forEach(department => {
    console.log(department.details);
       option=`  <tr>
      <td scope="col-10" class="details">
      ${department.info.details}
      </td>
      <td class="rating form-group">
        <span>1</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
      </td>
      <td class="rating form-group">
        <span>2</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
      </td>
      <td class="rating form-group">
        <span>3</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
      </td>
      <td class="rating form-group">
        <span>4</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
      </td>
      <td class="rating form-group">
        <span>5</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
      </td>
    </tr>`;
      html +=option;
      list.innerHTML=html;
     console.log(option);
      
  });
}
function imListLevels2(result) {
  let option =""
  let html =""
  let list = document.querySelector(".imlistdata122e")
 
  result.forEach(department => {
       option=`  <tr>
      <td scope="col-10" class="details">
      ${department.info.details}
      </td>
      <td class="rating form-group">
        <span>1</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
      </td>
      <td class="rating form-group">
        <span>2</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
      </td>
      <td class="rating form-group">
        <span>3</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
      </td>
      <td class="rating form-group">
        <span>4</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
      </td>
      <td class="rating form-group">
        <span>5</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
      </td>
    </tr>`;
      html +=option;
      list.innerHTML=html;
    console.log(option);
      
  });
}

function imListLevels3(result) {
  let option =""
  let html =""
  let list = document.querySelector(".imlistdata123")
 
  result.forEach(department => {
       option=`  <tr>
      <td scope="col-10" class="details">
      ${department.info.details}
      </td>
      <td class="rating form-group">
        <span>1</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
      </td>
      <td class="rating form-group">
        <span>2</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
      </td>
      <td class="rating form-group">
        <span>3</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
      </td>
      <td class="rating form-group">
        <span>4</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
      </td>
      <td class="rating form-group">
        <span>5</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
      </td>
    </tr>`;
      html +=option;
      list.innerHTML=html;
     
      
  });
}
function imListLevels4(result) {
  let option =""
  let html =""
  let list = document.querySelector(".imlistdata124")
 
  result.forEach(department => {
       option=`  <tr>
      <td scope="col-10" class="details">
      ${department.info.details}
      </td>
      <td class="rating form-group">
        <span>1</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
      </td>
      <td class="rating form-group">
        <span>2</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
      </td>
      <td class="rating form-group">
        <span>3</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
      </td>
      <td class="rating form-group">
        <span>4</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
      </td>
      <td class="rating form-group">
        <span>5</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
      </td>
    </tr>`;
      html +=option;
      list.innerHTML=html;
     
      
  });
}

function raListLevels1(result) {

  console.log(result);
  let option =""
  let html =""
  let list = document.querySelector(".ralistdata121")
 
  result.forEach(department => {
    console.log(department.details);
       option=`  <tr>
      <td scope="col-10" class="details">
      ${department.info.details}
      </td>
      <td class="rating form-group">
        <span>1</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
      </td>
      <td class="rating form-group">
        <span>2</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
      </td>
      <td class="rating form-group">
        <span>3</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
      </td>
      <td class="rating form-group">
        <span>4</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
      </td>
      <td class="rating form-group">
        <span>5</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
      </td>
    </tr>`;
      html +=option;
      list.innerHTML=html;
     console.log(option);
      
  });
}
function raListLevels2(result) {
  let option =""
  let html =""
  let list = document.querySelector(".ralistdata122e")
 
  result.forEach(department => {
       option=`  <tr>
      <td scope="col-10" class="details">
      ${department.info.details}
      </td>
      <td class="rating form-group">
        <span>1</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
      </td>
      <td class="rating form-group">
        <span>2</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
      </td>
      <td class="rating form-group">
        <span>3</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
      </td>
      <td class="rating form-group">
        <span>4</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
      </td>
      <td class="rating form-group">
        <span>5</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
      </td>
    </tr>`;
      html +=option;
      list.innerHTML=html;
    console.log(option);
      
  });
}

function raListLevels3(result) {
  let option =""
  let html =""
  let list = document.querySelector(".ralistdata123")
 
  result.forEach(department => {
       option=`  <tr>
      <td scope="col-10" class="details">
      ${department.info.details}
      </td>
      <td class="rating form-group">
        <span>1</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
      </td>
      <td class="rating form-group">
        <span>2</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
      </td>
      <td class="rating form-group">
        <span>3</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
      </td>
      <td class="rating form-group">
        <span>4</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
      </td>
      <td class="rating form-group">
        <span>5</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
      </td>
    </tr>`;
      html +=option;
      list.innerHTML=html;
     
      
  });
}
function raListLevels4(result) {
  let option =""
  let html =""
  let list = document.querySelector(".ralistdata124")
 
  result.forEach(department => {
       option=`  <tr>
      <td scope="col-10" class="details">
      ${department.info.details}
      </td>
      <td class="rating form-group">
        <span>1</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
      </td>
      <td class="rating form-group">
        <span>2</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
      </td>
      <td class="rating form-group">
        <span>3</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
      </td>
      <td class="rating form-group">
        <span>4</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
      </td>
      <td class="rating form-group">
        <span>5</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
      </td>
    </tr>`;
      html +=option;
      list.innerHTML=html;
     
      
  });
}

function anListLevels1(result) {

  console.log(result);
  let option =""
  let html =""
  let list = document.querySelector(".anlistdata121")
 
  result.forEach(department => {
    console.log(department.details);
       option=`  <tr>
      <td scope="col-10" class="details">
      ${department.info.details}
      </td>
      <td class="rating form-group">
        <span>1</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
      </td>
      <td class="rating form-group">
        <span>2</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
      </td>
      <td class="rating form-group">
        <span>3</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
      </td>
      <td class="rating form-group">
        <span>4</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
      </td>
      <td class="rating form-group">
        <span>5</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
      </td>
    </tr>`;
      html +=option;
      list.innerHTML=html;
     console.log(option);
      
  });
}
function anListLevels2(result) {
  let option =""
  let html =""
  let list = document.querySelector(".anlistdata122e")
 
  result.forEach(department => {
       option=`  <tr>
      <td scope="col-10" class="details">
      ${department.info.details}
      </td>
      <td class="rating form-group">
        <span>1</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
      </td>
      <td class="rating form-group">
        <span>2</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
      </td>
      <td class="rating form-group">
        <span>3</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
      </td>
      <td class="rating form-group">
        <span>4</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
      </td>
      <td class="rating form-group">
        <span>5</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
      </td>
    </tr>`;
      html +=option;
      list.innerHTML=html;
    console.log(option);
      
  });
}

function anListLevels3(result) {
  let option =""
  let html =""
  let list = document.querySelector(".anlistdata123")
 
  result.forEach(department => {
       option=`  <tr>
      <td scope="col-10" class="details">
      ${department.info.details}
      </td>
      <td class="rating form-group">
        <span>1</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
      </td>
      <td class="rating form-group">
        <span>2</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
      </td>
      <td class="rating form-group">
        <span>3</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
      </td>
      <td class="rating form-group">
        <span>4</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
      </td>
      <td class="rating form-group">
        <span>5</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
      </td>
    </tr>`;
      html +=option;
      list.innerHTML=html;
     
      
  });
}
function anListLevels4(result) {
  let option =""
  let html =""
  let list = document.querySelector(".anlistdata124")
 
  result.forEach(department => {
       option=`  <tr>
      <td scope="col-10" class="details">
      ${department.info.details}
      </td>
      <td class="rating form-group">
        <span>1</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
      </td>
      <td class="rating form-group">
        <span>2</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
      </td>
      <td class="rating form-group">
        <span>3</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
      </td>
      <td class="rating form-group">
        <span>4</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
      </td>
      <td class="rating form-group">
        <span>5</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
      </td>
    </tr>`;
      html +=option;
      list.innerHTML=html;
     
      
  });
}


function epListLevels1(result) {

  console.log(result);
  let option =""
  let html =""
  let list = document.querySelector(".eplistdata121")
 
  result.forEach(department => {
    console.log(department.details);
       option=`  <tr>
      <td scope="col-10" class="details">
      ${department.info.details}
      </td>
      <td class="rating form-group">
        <span>1</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
      </td>
      <td class="rating form-group">
        <span>2</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
      </td>
      <td class="rating form-group">
        <span>3</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
      </td>
      <td class="rating form-group">
        <span>4</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
      </td>
      <td class="rating form-group">
        <span>5</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
      </td>
    </tr>`;
      html +=option;
      list.innerHTML=html;
     console.log(option);
      
  });
}
function epListLevels2(result) {
  let option =""
  let html =""
  let list = document.querySelector(".eplistdata122e")
 
  result.forEach(department => {
       option=`  <tr>
      <td scope="col-10" class="details">
      ${department.info.details}
      </td>
      <td class="rating form-group">
        <span>1</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
      </td>
      <td class="rating form-group">
        <span>2</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
      </td>
      <td class="rating form-group">
        <span>3</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
      </td>
      <td class="rating form-group">
        <span>4</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
      </td>
      <td class="rating form-group">
        <span>5</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
      </td>
    </tr>`;
      html +=option;
      list.innerHTML=html;
    console.log(option);
      
  });
}

function epListLevels3(result) {
  let option =""
  let html =""
  let list = document.querySelector(".eplistdata123")
 
  result.forEach(department => {
       option=`  <tr>
      <td scope="col-10" class="details">
      ${department.info.details}
      </td>
      <td class="rating form-group">
        <span>1</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
      </td>
      <td class="rating form-group">
        <span>2</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
      </td>
      <td class="rating form-group">
        <span>3</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
      </td>
      <td class="rating form-group">
        <span>4</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
      </td>
      <td class="rating form-group">
        <span>5</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
      </td>
    </tr>`;
      html +=option;
      list.innerHTML=html;
     
      
  });
}
function epListLevels4(result) {
  let option =""
  let html =""
  let list = document.querySelector(".eplistdata124")
 
  result.forEach(department => {
       option=`  <tr>
      <td scope="col-10" class="details">
      ${department.info.details}
      </td>
      <td class="rating form-group">
        <span>1</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
      </td>
      <td class="rating form-group">
        <span>2</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
      </td>
      <td class="rating form-group">
        <span>3</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
      </td>
      <td class="rating form-group">
        <span>4</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
      </td>
      <td class="rating form-group">
        <span>5</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
      </td>
    </tr>`;
      html +=option;
      list.innerHTML=html;
     
      
  });
}

function scListLevels1(result) {

  console.log(result);
  let option =""
  let html =""
  let list = document.querySelector(".sclistdata121")
 
  result.forEach(department => {
    console.log(department.details);
       option=`  <tr>
      <td scope="col-10" class="details">
      ${department.info.details}
      </td>
      <td class="rating form-group">
        <span>1</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
      </td>
      <td class="rating form-group">
        <span>2</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
      </td>
      <td class="rating form-group">
        <span>3</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
      </td>
      <td class="rating form-group">
        <span>4</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
      </td>
      <td class="rating form-group">
        <span>5</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
      </td>
    </tr>`;
      html +=option;
      list.innerHTML=html;
     console.log(option);
      
  });
}
function scListLevels2(result) {
  let option =""
  let html =""
  let list = document.querySelector(".sclistdata122e")
 
  result.forEach(department => {
       option=`  <tr>
      <td scope="col-10" class="details">
      ${department.info.details}
      </td>
      <td class="rating form-group">
        <span>1</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
      </td>
      <td class="rating form-group">
        <span>2</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
      </td>
      <td class="rating form-group">
        <span>3</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
      </td>
      <td class="rating form-group">
        <span>4</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
      </td>
      <td class="rating form-group">
        <span>5</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
      </td>
    </tr>`;
      html +=option;
      list.innerHTML=html;
    console.log(option);
      
  });
}

function scListLevels3(result) {
  let option =""
  let html =""
  let list = document.querySelector(".sclistdata123")
 
  result.forEach(department => {
       option=`  <tr>
      <td scope="col-10" class="details">
      ${department.info.details}
      </td>
      <td class="rating form-group">
        <span>1</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
      </td>
      <td class="rating form-group">
        <span>2</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
      </td>
      <td class="rating form-group">
        <span>3</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
      </td>
      <td class="rating form-group">
        <span>4</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
      </td>
      <td class="rating form-group">
        <span>5</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
      </td>
    </tr>`;
      html +=option;
      list.innerHTML=html;
     
      
  });
}
function scListLevels4(result) {
  let option =""
  let html =""
  let list = document.querySelector(".sclistdata124")
 
  result.forEach(department => {
       option=`  <tr>
      <td scope="col-10" class="details">
      ${department.info.details}
      </td>
      <td class="rating form-group">
        <span>1</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
      </td>
      <td class="rating form-group">
        <span>2</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
      </td>
      <td class="rating form-group">
        <span>3</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
      </td>
      <td class="rating form-group">
        <span>4</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
      </td>
      <td class="rating form-group">
        <span>5</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
      </td>
    </tr>`;
      html +=option;
      list.innerHTML=html;
     
      
  });
}

function crListLevels1(result) {

  console.log(result);
  let option =""
  let html =""
  let list = document.querySelector(".crlistdata121")
 
  result.forEach(department => {
    console.log(department.details);
       option=`  <tr>
      <td scope="col-10" class="details">
      ${department.info.details}
      </td>
      <td class="rating form-group">
        <span>1</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
      </td>
      <td class="rating form-group">
        <span>2</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
      </td>
      <td class="rating form-group">
        <span>3</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
      </td>
      <td class="rating form-group">
        <span>4</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
      </td>
      <td class="rating form-group">
        <span>5</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
      </td>
    </tr>`;
      html +=option;
      list.innerHTML=html;
     console.log(option);
      
  });
}
function crListLevels2(result) {
  let option =""
  let html =""
  let list = document.querySelector(".crlistdata122e")
 
  result.forEach(department => {
       option=`  <tr>
      <td scope="col-10" class="details">
      ${department.info.details}
      </td>
      <td class="rating form-group">
        <span>1</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
      </td>
      <td class="rating form-group">
        <span>2</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
      </td>
      <td class="rating form-group">
        <span>3</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
      </td>
      <td class="rating form-group">
        <span>4</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
      </td>
      <td class="rating form-group">
        <span>5</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
      </td>
    </tr>`;
      html +=option;
      list.innerHTML=html;
    console.log(option);
      
  });
}

function crListLevels3(result) {
  let option =""
  let html =""
  let list = document.querySelector(".crlistdata123")
 
  result.forEach(department => {
       option=`  <tr>
      <td scope="col-10" class="details">
      ${department.info.details}
      </td>
      <td class="rating form-group">
        <span>1</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
      </td>
      <td class="rating form-group">
        <span>2</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
      </td>
      <td class="rating form-group">
        <span>3</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
      </td>
      <td class="rating form-group">
        <span>4</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
      </td>
      <td class="rating form-group">
        <span>5</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
      </td>
    </tr>`;
      html +=option;
      list.innerHTML=html;
     
      
  });
}
function crListLevels4(result) {
  let option =""
  let html =""
  let list = document.querySelector(".crlistdata124")
 
  result.forEach(department => {
       option=`  <tr>
      <td scope="col-10" class="details">
      ${department.info.details}
      </td>
      <td class="rating form-group">
        <span>1</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
      </td>
      <td class="rating form-group">
        <span>2</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
      </td>
      <td class="rating form-group">
        <span>3</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
      </td>
      <td class="rating form-group">
        <span>4</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
      </td>
      <td class="rating form-group">
        <span>5</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
      </td>
    </tr>`;
      html +=option;
      list.innerHTML=html;
     
      
  });
}

function caListLevels1(result) {

  console.log(result);
  let option =""
  let html =""
  let list = document.querySelector(".calistdata121")
 
  result.forEach(department => {
    console.log(department.details);
       option=`  <tr>
      <td scope="col-10" class="details">
      ${department.info.details}
      </td>
      <td class="rating form-group">
        <span>1</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
      </td>
      <td class="rating form-group">
        <span>2</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
      </td>
      <td class="rating form-group">
        <span>3</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
      </td>
      <td class="rating form-group">
        <span>4</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
      </td>
      <td class="rating form-group">
        <span>5</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
      </td>
    </tr>`;
      html +=option;
      list.innerHTML=html;
     console.log(option);
      
  });
}
function caListLevels2(result) {
  let option =""
  let html =""
  let list = document.querySelector(".calistdata122e")
 
  result.forEach(department => {
       option=`  <tr>
      <td scope="col-10" class="details">
      ${department.info.details}
      </td>
      <td class="rating form-group">
        <span>1</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
      </td>
      <td class="rating form-group">
        <span>2</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
      </td>
      <td class="rating form-group">
        <span>3</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
      </td>
      <td class="rating form-group">
        <span>4</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
      </td>
      <td class="rating form-group">
        <span>5</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
      </td>
    </tr>`;
      html +=option;
      list.innerHTML=html;
    console.log(option);
      
  });
}

function caListLevels3(result) {
  let option =""
  let html =""
  let list = document.querySelector(".calistdata123")
 
  result.forEach(department => {
       option=`  <tr>
      <td scope="col-10" class="details">
      ${department.info.details}
      </td>
      <td class="rating form-group">
        <span>1</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
      </td>
      <td class="rating form-group">
        <span>2</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
      </td>
      <td class="rating form-group">
        <span>3</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
      </td>
      <td class="rating form-group">
        <span>4</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
      </td>
      <td class="rating form-group">
        <span>5</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
      </td>
    </tr>`;
      html +=option;
      list.innerHTML=html;
     
      
  });
}
function caListLevels4(result) {
  let option =""
  let html =""
  let list = document.querySelector(".calistdata124")
 
  result.forEach(department => {
       option=`  <tr>
      <td scope="col-10" class="details">
      ${department.info.details}
      </td>
      <td class="rating form-group">
        <span>1</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
      </td>
      <td class="rating form-group">
        <span>2</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
      </td>
      <td class="rating form-group">
        <span>3</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
      </td>
      <td class="rating form-group">
        <span>4</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
      </td>
      <td class="rating form-group">
        <span>5</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
      </td>
    </tr>`;
      html +=option;
      list.innerHTML=html;
     
      
  });
}


function ccListLevels1(result) {

  console.log(result);
  let option =""
  let html =""
  let list = document.querySelector(".cclistdata121")
 
  result.forEach(department => {
    console.log(department.details);
       option=`  <tr>
      <td scope="col-10" class="details">
      ${department.info.details}
      </td>
      <td class="rating form-group">
        <span>1</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
      </td>
      <td class="rating form-group">
        <span>2</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
      </td>
      <td class="rating form-group">
        <span>3</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
      </td>
      <td class="rating form-group">
        <span>4</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
      </td>
      <td class="rating form-group">
        <span>5</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
      </td>
    </tr>`;
      html +=option;
      list.innerHTML=html;
     console.log(option);
      
  });
}
function ccListLevels2(result) {
  let option =""
  let html =""
  let list = document.querySelector(".cclistdata122e")
 
  result.forEach(department => {
       option=`  <tr>
      <td scope="col-10" class="details">
      ${department.info.details}
      </td>
      <td class="rating form-group">
        <span>1</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
      </td>
      <td class="rating form-group">
        <span>2</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
      </td>
      <td class="rating form-group">
        <span>3</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
      </td>
      <td class="rating form-group">
        <span>4</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
      </td>
      <td class="rating form-group">
        <span>5</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
      </td>
    </tr>`;
      html +=option;
      list.innerHTML=html;
    console.log(option);
      
  });
}

function ccListLevels3(result) {
  let option =""
  let html =""
  let list = document.querySelector(".cclistdata123")
 
  result.forEach(department => {
       option=`  <tr>
      <td scope="col-10" class="details">
      ${department.info.details}
      </td>
      <td class="rating form-group">
        <span>1</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
      </td>
      <td class="rating form-group">
        <span>2</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
      </td>
      <td class="rating form-group">
        <span>3</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
      </td>
      <td class="rating form-group">
        <span>4</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
      </td>
      <td class="rating form-group">
        <span>5</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
      </td>
    </tr>`;
      html +=option;
      list.innerHTML=html;
     
      
  });
}
function ccListLevels4(result) {
  let option =""
  let html =""
  let list = document.querySelector(".cclistdata124")
 
  result.forEach(department => {
       option=`  <tr>
      <td scope="col-10" class="details">
      ${department.info.details}
      </td>
      <td class="rating form-group">
        <span>1</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}1,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="1" name="" id="${department.id}1">
      </td>
      <td class="rating form-group">
        <span>2</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}2,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="2" id="${department.id}2">
      </td>
      <td class="rating form-group">
        <span>3</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}3,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="3" id="${department.id}3">
      </td>
      <td class="rating form-group">
        <span>4</span>
        <input type="radio"   name="${department.id}" onclick="Audit('${department.id}4,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="4" id="${department.id}4">
      </td>
      <td class="rating form-group">
        <span>5</span>
        <input type="radio"  name="${department.id}" onclick="Audit('${department.id}5,${department.info.areas},${department.info.levels},${department.info.details},${department.info.code},${department.info.competencyDivision},${department.info.division},${department.info.title},${department.id}')" value="5" id="${department.id}5">
      </td>
    </tr>`;
      html +=option;
      list.innerHTML=html;
     
      
  });
}


function Professional(response) {
  console.log(response);
 
  const  written = response.filter((d) => d.info.areas=="Written Communication");
  if (written.length>0) {
   document.querySelector(".flush-heading0").style.display="block"
   const level1 = written.filter((d)=>d.info.levels=="Level 1")
       
   if(level1.length >0){
     console.log(level1);
     ListLevels1(level1)
   
     document.querySelector(".listBull1").style.display='block'
   }else{
     document.querySelector(".listBull1").style.display='none'
   }
  const level2 = written.filter((d)=>d.info.levels=="Level 2")
  if(level2.length!==0){
   document.querySelector(".listBull2").style.display='block'
   ListLevels2(level2)
  
  }else{
   document.querySelector(".listBull2").style.display='none'
  }
  const level3 = written.filter((d)=>d.info.levels=="Level 3")
  if(level3.length!==0){
   document.querySelector(".listBull3").style.display='block'
   ListLevels3(level3)
  
  }else{
   document.querySelector(".listBull3").style.display='none'
  }
  const level4 = written.filter((d)=>d.info.levels=="Level 4")
  if(level4.length!==0){
   document.querySelector(".listBull4").style.display='block'
  
   ListLevels4(level4)
  
  }else{
   document.querySelector(".listBull4").style.display='none'
  }
  }
 
  const Organisational = response.filter((d) => d.info.areas=="Organisational Awareness");
  if (Organisational.length>0) {
   document.querySelector(".flush-heading1").style.display="block"
   const level1 = Organisational.filter((d)=>d.info.levels=="Level 1")
      
             if(level1.length >0){
               console.log(level1);
               oListLevels1(level1)
               document.querySelector(".olistBull1").style.display='block'
             }else{
               document.querySelector(".olistBull1").style.display='none'
             }
           const level2 = Organisational.filter((d)=>d.info.levels=="Level 2")
           if(level2.length>0){
             document.querySelector(".olistBull2").style.display='block'
             console.log(level2);
             oListLevels2(level2)
           
           }else{
             document.querySelector(".olistBull2").style.display='none'
           }
           const level3 = Organisational.filter((d)=>d.info.levels=="Level 3")
           if(level3.length!==0){
             document.querySelector(".olistBull3").style.display='block'
             oListLevels3(level3)
         
           }else{
             document.querySelector(".olistBull3").style.display='none'
           }
           const level4 = Organisational.filter((d)=>d.info.levels=="Level 4")
           if(level4.length!==0){
             console.log(level4);
             document.querySelector(".olistBull4").style.display='block'
       
             oListLevels4(level4)
           
           }else{
             document.querySelector(".olistBull4").style.display='none'
           }
   
  }
  
  const  Plannning = response.filter((d) => d.info.areas=="Planning and Organising");
  if (Plannning.length>0) {
   document.querySelector(".flush-heading2").style.display="block"
 
     const level1 = Plannning.filter((d)=>d.info.levels=="Level 1")
        
               if(level1.length >0){
                 console.log(level1);
                 pListLevels1(level1)
                 document.querySelector(".plistBull1").style.display='block'
               }else{
                 document.querySelector(".plistBull1").style.display='none'
               }
             const level2 = Plannning.filter((d)=>d.info.levels=="Level 2")
             if(level2.length>0){
               document.querySelector(".plistBull2").style.display='block'
               console.log(level2);
               pListLevels2(level2)
             
             }else{
               document.querySelector(".plistBull2").style.display='none'
             }
             const level3 = Plannning.filter((d)=>d.info.levels=="Level 3")
             if(level3.length!==0){
               document.querySelector(".plistBull3").style.display='block'
               pListLevels3(level3)
           
             }else{
               document.querySelector(".plistBull3").style.display='none'
             }
             const level4 = Plannning.filter((d)=>d.info.levels=="Level 4")
             if(level4.length!==0){
               console.log(level4);
               document.querySelector(".plistBull4").style.display='block'
         
               pListLevels4(level4)
             
             }else{
               document.querySelector(".plistBull4").style.display='none'
             }
     
    
  }
  const  Monitoring = response.filter((d) => d.info.areas=="Monitoring and Control");
  if (Monitoring.length>0) {
   document.querySelector(".flush-heading3").style.display="block"
   const level1 = Monitoring.filter((d)=>d.info.levels=="Level 1")
        
               if(level1.length >0){
                 console.log(level1);
                 mListLevels1(level1)
                 document.querySelector(".mlistBull1").style.display='block'
               }else{
                 document.querySelector(".mlistBull1").style.display='none'
               }
             const level2 = Monitoring.filter((d)=>d.info.levels=="Level 2")
             if(level2.length>0){
               document.querySelector(".mlistBull2").style.display='block'
               console.log(level2);
               mListLevels2(level2)
             
             }else{
               document.querySelector(".mlistBull2").style.display='none'
             }
             const level3 = Monitoring.filter((d)=>d.info.levels=="Level 3")
             if(level3.length!==0){
               document.querySelector(".mlistBull3").style.display='block'
               mListLevels3(level3)
           
             }else{
               document.querySelector(".mlistBull3").style.display='none'
             }
             const level4 = Monitoring.filter((d)=>d.info.levels=="Level 4")
             if(level4.length!==0){
               console.log(level4);
               document.querySelector(".mlistBull4").style.display='block'
         
               mListLevels4(level4)
             
             }else{
               document.querySelector(".mlistBull4").style.display='none'
             }
     
  }
 
  const  Consulting = response.filter((d) => d.info.areas=="Consulting");
  if (Consulting.length>0) {
   document.querySelector(".flush-heading4").style.display="block"
   const level1 = Consulting.filter((d)=>d.info.levels=="Level 1")
        
               if(level1.length >0){
                 console.log(level1);
                 cListLevels1(level1)
                 document.querySelector(".clistBull1").style.display='block'
               }else{
                 document.querySelector(".clistBull1").style.display='none'
               }
             const level2 = Consulting.filter((d)=>d.info.levels=="Level 2")
             if(level2.length>0){
               document.querySelector(".clistBull2").style.display='block'
               console.log(level2);
               cListLevels2(level2)
             
             }else{
               document.querySelector(".clistBull2").style.display='none'
             }
             const level3 = Consulting.filter((d)=>d.info.levels=="Level 3")
             if(level3.length!==0){
               document.querySelector(".clistBull3").style.display='block'
               cListLevels3(level3)
           
             }else{
               document.querySelector(".clistBull3").style.display='none'
             }
             const level4 = Consulting.filter((d)=>d.info.levels=="Level 4")
             if(level4.length!==0){
               console.log(level4);
               document.querySelector(".clistBull4").style.display='block'
         
               cListLevels4(level4)
             
             }else{
               document.querySelector(".clistBull4").style.display='none'
             }
     
  }
  const  Negotiation = response.filter((d) => d.info.areas=="Negotiation");
  if (Negotiation.length>0) {
   document.querySelector(".flush-heading5").style.display="block"
   const level1 = Negotiation.filter((d)=>d.info.levels=="Level 1")
        
               if(level1.length >0){
                 console.log(level1);
                 nListLevels1(level1)
                 document.querySelector(".nlistBull1").style.display='block'
               }else{
                 document.querySelector(".nlistBull1").style.display='none'
               }
             const level2 = Consulting.filter((d)=>d.info.levels=="Level 2")
             if(level2.length>0){
               document.querySelector(".nlistBull2").style.display='block'
               console.log(level2);
               nListLevels2(level2)
             
             }else{
               document.querySelector(".nlistBull2").style.display='none'
             }
             const level3 = Consulting.filter((d)=>d.info.levels=="Level 3")
             if(level3.length!==0){
               document.querySelector(".nlistBull3").style.display='block'
               nListLevels3(level3)
           
             }else{
               document.querySelector(".nlistBull3").style.display='none'
             }
             const level4 = Consulting.filter((d)=>d.info.levels=="Level 4")
             if(level4.length!==0){
               console.log(level4);
               document.querySelector(".nlistBull4").style.display='block'
         
               nListLevels4(level4)
             
             }else{
               document.querySelector(".nlistBull4").style.display='none'
             }
     
  }
  const  Oral = response.filter((d) => d.info.areas=="Oral Communication");
  if (Oral.length>0) {
   document.querySelector(".flush-heading6").style.display="block"
   const level1 = Negotiation.filter((d)=>d.info.levels=="Level 1")
        
               if(level1.length >0){
                 console.log(level1);
                 orListLevels1(level1)
                 document.querySelector(".orlistBull1").style.display='block'
               }else{
                 document.querySelector(".orlistBull1").style.display='none'
               }
             const level2 = Consulting.filter((d)=>d.info.levels=="Level 2")
             if(level2.length>0){
               document.querySelector(".orlistBull2").style.display='block'
               console.log(level2);
               orListLevels2(level2)
             
             }else{
               document.querySelector(".orlistBull2").style.display='none'
             }
             const level3 = Consulting.filter((d)=>d.info.levels=="Level 3")
             if(level3.length!==0){
               document.querySelector(".orlistBull3").style.display='block'
               orListLevels3(level3)
           
             }else{
               document.querySelector(".orlistBull3").style.display='none'
             }
             const level4 = Consulting.filter((d)=>d.info.levels=="Level 4")
             if(level4.length!==0){
               console.log(level4);
               document.querySelector(".orlistBull4").style.display='block'
         
               orListLevels4(level4)
             
             }else{
               document.querySelector(".orlistBull4").style.display='none'
             }
 
              
  const Learning = response.filter((d) => d.info.areas=="Learning and Development ");
  if (Learning.length>0) {
   document.querySelector(".flush-heading7").style.display="block"
   const level1 = Learning.filter((d)=>d.info.levels=="Level 1")
      
             if(level1.length >0){
               console.log(level1);
               ldListLevels1(level1)
               document.querySelector(".ldlistBull1").style.display='block'
             }else{
               document.querySelector(".ldlistBull1").style.display='none'
             }
           const level2 = Learning.filter((d)=>d.info.levels=="Level 2")
           if(level2.length>0){
             document.querySelector(".ldlistBull2").style.display='block'
             console.log(level2);
             ldListLevels2(level2)
           
           }else{
             document.querySelector(".ldlistBull2").style.display='none'
           }
           const level3 = Learning.filter((d)=>d.info.levels=="Level 3")
           if(level3.length!==0){
             document.querySelector(".ldlistBull3").style.display='block'
             ldListLevels3(level3)
         
           }else{
             document.querySelector(".ldlistBull3").style.display='none'
           }
           const level4 = Learning.filter((d)=>d.info.levels=="Level 4")
           if(level4.length!==0){
             console.log(level4);
             document.querySelector(".ldlistBull4").style.display='block'
       
             ldListLevels4(level4)
           
           }else{
             document.querySelector(".ldlistBull4").style.display='none'
           }
   
  }
     
  }
 
  const Learning = response.filter((d) => d.info.areas=="Learning and Development");
  if (Learning.length>0) {
   document.querySelector(".flush-heading7").style.display="block"
   const level1 = Learning.filter((d)=>d.info.levels=="Level 1")
      
             if(level1.length >0){
               console.log(level1);
               ldListLevels1(level1)
               document.querySelector(".ldlistBull1").style.display='block'
             }else{
               document.querySelector(".ldlistBull1").style.display='none'
             }
           const level2 = Learning.filter((d)=>d.info.levels=="Level 2")
           if(level2.length>0){
             document.querySelector(".ldlistBull2").style.display='block'
             console.log(level2);
             ldListLevels2(level2)
           
           }else{
             document.querySelector(".ldlistBull2").style.display='none'
           }
           const level3 = Learning.filter((d)=>d.info.levels=="Level 3")
           if(level3.length!==0){
             document.querySelector(".ldlistBull3").style.display='block'
             ldListLevels3(level3)
         
           }else{
             document.querySelector(".ldlistBull3").style.display='none'
           }
           const level4 = Learning.filter((d)=>d.info.levels=="Level 4")
           if(level4.length!==0){
             console.log(level4);
             document.querySelector(".ldlistBull4").style.display='block'
       
             ldListLevels4(level4)
           
           }else{
             document.querySelector(".ldlistBull4").style.display='none'
           }
   
  }
  
 // const Awareness = response.filter((d) => d.areas=="Organisational Awareness");
 
 // if (Awareness.length>0) {
 //   document.querySelector(".flush-heading8").style.display="block"
 //   const level1 = Awareness.filter((d)=>d.levels=="Level 1")
      
 //             if(level1.length >0){
 //               console.log(level1);
 //               aListLevels1(level1)
 //               document.querySelector(".alistBull1").style.display='block'
 //             }else{
 //               document.querySelector(".alistBull1").style.display='none'
 //             }
 //           const level2 = Awareness.filter((d)=>d.levels=="Level 2")
 //           if(level2.length>0){
 //             document.querySelector(".alistBull2").style.display='block'
 //             console.log(level2);
 //             aListLevels2(level2)
           
 //           }else{
 //             document.querySelector(".alistBull2").style.display='none'
 //           }
 //           const level3 = Awareness.filter((d)=>d.levels=="Level 3")
 //           if(level3.length!==0){
 //             document.querySelector(".alistBull3").style.display='block'
 //             aListLevels3(level3)
         
 //           }else{
 //             document.querySelector(".alistBull3").style.display='none'
 //           }
 //           const level4 = Awareness.filter((d)=>d.levels=="Level 4")
 //           if(level4.length!==0){
 //             console.log(level4);
 //             document.querySelector(".alistBull4").style.display='block'
       
 //             aListLevels4(level4)
           
 //           }else{
 //             document.querySelector(".alistBull4").style.display='none'
 //           }
   
 //  }
 
 const  Change = response.filter((d) => d.info.areas=="Change Movement");
 
 if (Change.length>0) {
   document.querySelector(".flush-heading9").style.display="block"
   const level1 = Change.filter((d)=>d.info.levels=="Level 1")
      
             if(level1.length >0){
               console.log(level1);
               cmListLevels1(level1)
               document.querySelector(".cmlistBull1").style.display='block'
             }else{
               document.querySelector(".cmlistBull1").style.display='none'
             }
           const level2 = Change.filter((d)=>d.info.levels=="Level 2")
           if(level2.length>0){
             document.querySelector(".cmlistBull2").style.display='block'
             console.log(level2);
             cmListLevels2(level2)
           
           }else{
             document.querySelector(".cmlistBull2").style.display='none'
           }
           const level3 = Change.filter((d)=>d.info.levels=="Level 3")
           if(level3.length!==0){
             document.querySelector(".cmlistBull3").style.display='block'
             cmListLevels3(level3)
         
           }else{
             document.querySelector(".cmlistBull3").style.display='none'
           }
           const level4 = Change.filter((d)=>d.info.levels=="Level 4")
           if(level4.length!==0){
             console.log(level4);
             document.querySelector(".cmlistBull4").style.display='block'
       
             cmListLevels4(level4)
           
           }else{
             document.querySelector(".cmlistBull4").style.display='none'
           }
   
  }
 
 
 const  Technology = response.filter((d) => d.info.areas=="HR Technology information Management");
 
 
 if (Technology.length>0) {
   document.querySelector(".flush-heading10").style.display="block"
   const level1 = Technology.filter((d)=>d.info.levels=="Level 1")
      
             if(level1.length >0){
               console.log(level1);
               tListLevels1(level1)
               document.querySelector(".tlistBull1").style.display='block'
             }else{
               document.querySelector(".tlistBull1").style.display='none'
             }
           const level2 = Technology.filter((d)=>d.info.levels=="Level 2")
           if(level2.length>0){
             document.querySelector(".tlistBull2").style.display='block'
             console.log(level2);
             tListLevels2(level2)
           
           }else{
             document.querySelector(".tlistBull2").style.display='none'
           }
           const level3 = Technology.filter((d)=>d.info.levels=="Level 3")
           if(level3.length!==0){
             document.querySelector(".tlistBull3").style.display='block'
             tListLevels3(level3)
         
           }else{
             document.querySelector(".tlistBull3").style.display='none'
           }
           const level4 = Technology.filter((d)=>d.info.levels=="Level 4")
           if(level4.length!==0){
             console.log(level4);
             document.querySelector(".tlistBull4").style.display='block'
       
             tListLevels4(level4)
           
           }else{
             document.querySelector(".tlistBull4").style.display='none'
           }
   
  }
 
 const  Service = response.filter((d) => d.info.areas=="HR Service Delivery");
 if (Service.length>0) {
   document.querySelector(".flush-heading11").style.display="block"
   const level1 = Service.filter((d)=>d.info.levels=="Level 1")
      
             if(level1.length >0){
               console.log(level1);
               sListLevels1(level1)
               document.querySelector(".slistBull1").style.display='block'
             }else{
               document.querySelector(".slistBull1").style.display='none'
             }
           const level2 = Service.filter((d)=>d.info.levels=="Level 2")
           if(level2.length>0){
             document.querySelector(".slistBull2").style.display='block'
             console.log(level2);
             sListLevels2(level2)
           
           }else{
             document.querySelector(".slistBull2").style.display='none'
           }
           const level3 = Service.filter((d)=>d.info.levels=="Level 3")
           if(level3.length!==0){
             document.querySelector(".slistBull3").style.display='block'
             sListLevels3(level3)
         
           }else{
             document.querySelector(".slistBull3").style.display='none'
           }
           const level4 = Service.filter((d)=>d.info.levels=="Level 4")
           if(level4.length!==0){
             console.log(level4);
             document.querySelector(".slistBull4").style.display='block'
       
             sListLevels4(level4)
           
           }else{
             document.querySelector(".slistBull4").style.display='none'
           }
   
  }
 const  Talent = response.filter((d) => d.info.areas=="Talent Management");
 if (Talent.length>0) {
   document.querySelector(".flush-heading12").style.display="block"
   const level1 = Talent.filter((d)=>d.info.levels=="Level 1")
      
             if(level1.length >0){
               console.log(level1);
               tmListLevels1(level1)
               document.querySelector(".tmlistBull1").style.display='block'
             }else{
               document.querySelector(".tmlistBull1").style.display='none'
             }
           const level2 = Talent.filter((d)=>d.info.levels=="Level 2")
           if(level2.length>0){
             document.querySelector(".tmlistBull2").style.display='block'
             console.log(level2);
             tmListLevels2(level2)
           
           }else{
             document.querySelector(".tmlistBull2").style.display='none'
           }
           const level3 = Talent.filter((d)=>d.info.levels=="Level 3")
           if(level3.length!==0){
             document.querySelector(".tmlistBull3").style.display='block'
             tmListLevels3(level3)
         
           }else{
             document.querySelector(".tmlistBull3").style.display='none'
           }
           const level4 = Talent.filter((d)=>d.info.levels=="Level 4")
           if(level4.length!==0){
             console.log(level4);
             document.querySelector(".tmlistBull4").style.display='block'
       
             tmListLevels4(level4)
           
           }else{
             document.querySelector(".tmlistBull4").style.display='none'
           }
   
  }
 const  Workforce = response.filter((d) => d.info.areas=="Workforce Planning");
 
 if (Workforce.length>0) {
   document.querySelector(".flush-heading13").style.display="block"
   const level1 = Workforce.filter((d)=>d.info.levels=="Level 1")
      
             if(level1.length >0){
               console.log(level1);
               wListLevels1(level1)
               document.querySelector(".wlistBull1").style.display='block'
             }else{
               document.querySelector(".wlistBull1").style.display='none'
             }
           const level2 = Workforce.filter((d)=>d.info.levels=="Level 2")
           if(level2.length>0){
             document.querySelector(".wlistBull2").style.display='block'
             console.log(level2);
             wListLevels2(level2)
           
           }else{
             document.querySelector(".wlistBull2").style.display='none'
           }
           const level3 = Workforce.filter((d)=>d.info.levels=="Level 3")
           if(level3.length!==0){
             document.querySelector(".wlistBull3").style.display='block'
             wListLevels3(level3)
         
           }else{
             document.querySelector(".wlistBull3").style.display='none'
           }
           const level4 = Workforce.filter((d)=>d.info.levels=="Level 4")
           if(level4.length!==0){
             console.log(level4);
             document.querySelector(".wlistBull4").style.display='block'
       
             wListLevels4(level4)
           
           }else{
             document.querySelector(".wlistBull4").style.display='none'
           }
   
  }
  const  Learningdevelopment = response.filter((d) => d.info.areas=="Learning and Develepment");
  if (Learningdevelopment.length>0) {
   document.querySelector(".flush-heading14").style.display="block"
   const level1 = Learningdevelopment.filter((d)=>d.info.levels=="Level 1")
      
             if(level1.length >0){
               console.log(level1);
               dlListLevels1(level1)
               document.querySelector(".dllistBull1").style.display='block'
             }else{
               document.querySelector(".dllistBull1").style.display='none'
             }
           const level2 = Learningdevelopment.filter((d)=>d.info.levels=="Level 2")
           if(level2.length>0){
             document.querySelector(".dllistBull2").style.display='block'
             console.log(level2);
             dlListLevels2(level2)
           
           }else{
             document.querySelector(".dllistBull2").style.display='none'
           }
           const level3 = Learningdevelopment.filter((d)=>d.info.levels=="Level 3")
           if(level3.length!==0){
             document.querySelector(".dllistBull3").style.display='block'
             dlListLevels3(level3)
         
           }else{
             document.querySelector(".dllistBull3").style.display='none'
           }
           const level4 = Learningdevelopment.filter((d)=>d.info.levels=="Level 4")
           if(level4.length!==0){
             console.log(level4);
             document.querySelector(".dllistBull4").style.display='block'
       
             dlListLevels4(level4)
           
           }else{
             document.querySelector(".dllistBull4").style.display='none'
           }
   
  }
  
  const  Occupational = response.filter((d) => d.info.areas=="Occupational Health and Safety");
  
  if (Occupational.length>0) {
   document.querySelector(".flush-heading15").style.display="block"
   const level1 = Occupational.filter((d)=>d.info.levels=="Level 1")
      
             if(level1.length >0){
               console.log(level1);
               ohListLevels1(level1)
               document.querySelector(".ohlistBull1").style.display='block'
             }else{
               document.querySelector(".ohlistBull1").style.display='none'
             }
           const level2 = Occupational.filter((d)=>d.info.levels=="Level 2")
           if(level2.length>0){
             document.querySelector(".ohlistBull2").style.display='block'
             console.log(level2);
             ohListLevels2(level2)
           
           }else{
             document.querySelector(".ohlistBull2").style.display='none'
           }
           const level3 = Occupational.filter((d)=>d.info.levels=="Level 3")
           if(level3.length!==0){
             document.querySelector(".ohlistBull3").style.display='block'
             ohListLevels3(level3)
         
           }else{
             document.querySelector(".ohlistBull3").style.display='none'
           }
           const level4 = Occupational.filter((d)=>d.info.levels=="Level 4")
           if(level4.length!==0){
             console.log(level4);
             document.querySelector(".ohlistBull4").style.display='block'
       
             ohListLevels4(level4)
           
           }else{
             document.querySelector(".ohlistBull4").style.display='none'
           }
   
  }
   const Perfomance = response.filter((d) => d.info.areas=="Performance Management");
 
 if (Perfomance.length>0) {
     document.querySelector(".flush-heading16").style.display="block"
     const level1 = Perfomance.filter((d)=>d.info.levels=="Level 1")
        
               if(level1.length >0){
                 console.log(level1);
                 peListLevels1(level1)
                 document.querySelector(".pelistBull1").style.display='block'
               }else{
                 document.querySelector(".pelistBull1").style.display='none'
               }
             const level2 = Perfomance.filter((d)=>d.info.levels=="Level 2")
             if(level2.length>0){
               document.querySelector(".pelistBull2").style.display='block'
               console.log(level2);
               peListLevels2(level2)
             
             }else{
               document.querySelector(".pelistBull2").style.display='none'
             }
             const level3 = Perfomance.filter((d)=>d.info.levels=="Level 3")
             if(level3.length!==0){
               document.querySelector(".pelistBull3").style.display='block'
               peListLevels3(level3)
           
             }else{
               document.querySelector(".pelistBull3").style.display='none'
             }
             const level4 = Perfomance.filter((d)=>d.info.levels=="Level 4")
             if(level4.length!==0){
               console.log(level4);
               document.querySelector(".pelistBull4").style.display='block'
         
               peListLevels4(level4)
             
             }else{
               document.querySelector(".pelistBull4").style.display='none'
             }
     
    }
 const  Industrial = response.filter((d) => d.info.areas=="Industrial and Labour Relations");
 
   if (Industrial.length>0) {
     document.querySelector(".flush-heading17").style.display="block"
     const level1 = Industrial.filter((d)=>d.info.levels=="Level 1")
        
               if(level1.length >0){
                 console.log(level1);
                 inListLevels1(level1)
                 document.querySelector(".inlistBull1").style.display='block'
               }else{
                 document.querySelector(".inlistBull1").style.display='none'
               }
             const level2 = Industrial.filter((d)=>d.info.levels=="Level 2")
             if(level2.length>0){
               document.querySelector(".inlistBull2").style.display='block'
               console.log(level2);
               inListLevels2(level2)
             
             }else{
               document.querySelector(".inlistBull2").style.display='none'
             }
             const level3 = Industrial.filter((d)=>d.info.levels=="Level 3")
             if(level3.length!==0){
               document.querySelector(".inlistBull3").style.display='block'
               inListLevels3(level3)
           
             }else{
               document.querySelector(".inlistBull3").style.display='none'
             }
             const level4 = Industrial.filter((d)=>d.info.levels=="Level 4")
             if(level4.length!==0){
               console.log(level4);
               document.querySelector(".inlistBull4").style.display='block'
         
               inListLevels4(level4)
             
             }else{
               document.querySelector(".inlistBull4").style.display='none'
             }
     
    }
 const  Interpersonal = response.filter((d) => d.info.areas=="Interpersonal Relationships");
 
 if (Interpersonal.length>0) {
     document.querySelector(".flush-heading18").style.display="block"
     const level1 = Interpersonal.filter((d)=>d.info.levels=="Level 1")
        
               if(level1.length >0){
                 console.log(level1);
                 intListLevels1(level1)
                 document.querySelector(".intlistBull1").style.display='block'
               }else{
                 document.querySelector(".intlistBull1").style.display='none'
               }
             const level2 = Interpersonal.filter((d)=>d.info.levels=="Level 2")
             if(level2.length>0){
               document.querySelector(".intlistBull2").style.display='block'
               console.log(level2);
               intListLevels2(level2)
             
             }else{
               document.querySelector(".intlistBull2").style.display='none'
             }
             const level3 = Interpersonal.filter((d)=>d.info.levels=="Level 3")
             if(level3.length!==0){
               document.querySelector(".intlistBull3").style.display='block'
               intListLevels3(level3)
           
             }else{
               document.querySelector(".intlistBull3").style.display='none'
             }
             const level4 = Interpersonal.filter((d)=>d.info.levels=="Level 4")
             if(level4.length!==0){
               console.log(level4);
               document.querySelector(".intlistBull4").style.display='block'
         
               intListLevels4(level4)
             
             }else{
               document.querySelector(".intlistBull4").style.display='none'
             }
     
    }
 
 const  Communication = response.filter((d) => d.info.areas=="Communication");
 if (Communication.length>0) {
   document.querySelector(".flush-heading19").style.display="block"
   const level1 = Communication.filter((d)=>d.info.levels=="Level 1")
      
             if(level1.length >0){
               console.log(level1);
               comListLevels1(level1)
               document.querySelector(".comlistBull1").style.display='block'
             }else{
               document.querySelector(".comlistBull1").style.display='none'
             }
           const level2 = Communication.filter((d)=>d.info.levels=="Level 2")
           if(level2.length>0){
             document.querySelector(".comlistBull2").style.display='block'
             console.log(level2);
             comListLevels2(level2)
           
           }else{
             document.querySelector(".comlistBull2").style.display='none'
           }
           const level3 = Communication.filter((d)=>d.info.levels=="Level 3")
           if(level3.length!==0){
             document.querySelector(".comlistBull3").style.display='block'
             comListLevels3(level3)
         
           }else{
             document.querySelector(".comlistBull3").style.display='none'
           }
           const level4 = Communication.filter((d)=>d.info.levels=="Level 4")
           if(level4.length!==0){
             console.log(level4);
             document.querySelector(".comlistBull4").style.display='block'
       
             comListLevels4(level4)
           
           }else{
             document.querySelector(".comlistBull4").style.display='none'
           }
   
  }
   const Delivery = response.filter((d) => d.info.areas=="Service Delivery orientation");
   if (Delivery.length>0) {
     document.querySelector(".flush-heading20").style.display="block"
     const level1 = Delivery.filter((d)=>d.info.levels=="Level 1")
        
               if(level1.length >0){
                 console.log(level1);
                 sdoListLevels1(level1)
                 document.querySelector(".sdolistBull1").style.display='block'
               }else{
                 document.querySelector(".sdolistBull1").style.display='none'
               }
             const level2 = Delivery.filter((d)=>d.info.levels=="Level 2")
             if(level2.length>0){
               document.querySelector(".sdolistBull2").style.display='block'
               console.log(level2);
               sdoListLevels2(level2)
             
             }else{
               document.querySelector(".sdolistBull2").style.display='none'
             }
             const level3 = Delivery.filter((d)=>d.info.levels=="Level 3")
             if(level3.length!==0){
               document.querySelector(".sdolistBull3").style.display='block'
               sdoListLevels3(level3)
           
             }else{
               document.querySelector(".sdolistBull3").style.display='none'
             }
             const level4 = Delivery.filter((d)=>d.info.levels=="Level 4")
             if(level4.length!==0){
               console.log(level4);
               document.querySelector(".sdolistBull4").style.display='block'
         
               sdoListLevels4(level4)
             
             }else{
               document.querySelector(".sdolistBull4").style.display='none'
             }
     
    }
   const  Action = response.filter((d) => d.info.areas=="Action and Outcome Orientation");
   if (Action.length>0) {
     document.querySelector(".flush-heading21").style.display="block"
     const level1 = Action.filter((d)=>d.info.levels=="Level 1")
        
               if(level1.length >0){
                 console.log(level1);
                 actListLevels1(level1)
                 document.querySelector(".actlistBull1").style.display='block'
               }else{
                 document.querySelector(".actlistBull1").style.display='none'
               }
             const level2 = Action.filter((d)=>d.info.levels=="Level 2")
             if(level2.length>0){
               document.querySelector(".actlistBull2").style.display='block'
               console.log(level2);
               actListLevels2(level2)
             
             }else{
               document.querySelector(".actlistBull2").style.display='none'
             }
             const level3 = Action.filter((d)=>d.info.levels=="Level 3")
             if(level3.length!==0){
               document.querySelector(".actlistBull3").style.display='block'
               actListLevels3(level3)
           
             }else{
               document.querySelector(".actlistBull3").style.display='none'
             }
             const level4 = Action.filter((d)=>d.info.levels=="Level 4")
             if(level4.length!==0){
               console.log(level4);
               document.querySelector(".actlistBull4").style.display='block'
         
               actListLevels4(level4)
             
             }else{
               document.querySelector(".actlistBull4").style.display='none'
             }
     
    }
 const  Conflict = response.filter((d) => d.info.areas=="Conflict Management");
 if (Conflict.length>0) {
   document.querySelector(".flush-heading22").style.display="block"
   const level1 = Conflict.filter((d)=>d.info.levels=="Level 1")
      
             if(level1.length >0){
               console.log(level1);
               conListLevels1(level1)
               document.querySelector(".conlistBull1").style.display='block'
             }else{
               document.querySelector(".conlistBull1").style.display='none'
             }
           const level2 = Conflict.filter((d)=>d.info.levels=="Level 2")
           if(level2.length>0){
             document.querySelector(".conlistBull2").style.display='block'
             console.log(level2);
             conListLevels2(level2)
           
           }else{
             document.querySelector(".conlistBull2").style.display='none'
           }
           const level3 = Conflict.filter((d)=>d.info.levels=="Level 3")
           if(level3.length!==0){
             document.querySelector(".conlistBull3").style.display='block'
             conListLevels3(level3)
         
           }else{
             document.querySelector(".conlistBull3").style.display='none'
           }
           const level4 = Conflict.filter((d)=>d.info.levels=="Level 4")
           if(level4.length!==0){
             console.log(level4);
             document.querySelector(".conlistBull4").style.display='block'
       
             conListLevels4(level4)
           
           }else{
             document.querySelector(".conlistBull4").style.display='none'
           }
   
  }
  const  Orientation = response.filter((d) => d.info.areas=="Learning Orientation");
  if (Orientation.length>0) {
   document.querySelector(".flush-heading23").style.display="block"
   const level1 = Orientation.filter((d)=>d.info.levels=="Level 1")
      
             if(level1.length >0){
               console.log(level1);
               loListLevels1(level1)
               document.querySelector(".lolistBull1").style.display='block'
             }else{
               document.querySelector(".lolistBull1").style.display='none'
             }
           const level2 = Orientation.filter((d)=>d.info.levels=="Level 2")
           if(level2.length>0){
             document.querySelector(".lolistBull2").style.display='block'
             console.log(level2);
             loListLevels2(level2)
           
           }else{
             document.querySelector(".lolistBull2").style.display='none'
           }
           const level3 = Orientation.filter((d)=>d.info.levels=="Level 3")
           if(level3.length!==0){
             document.querySelector(".lolistBull3").style.display='block'
             loListLevels3(level3)
         
           }else{
             document.querySelector(".lolistBull3").style.display='none'
           }
           const level4 = Orientation.filter((d)=>d.info.levels=="Level 4")
           if(level4.length!==0){
             console.log(level4);
             document.querySelector(".lolistBull4").style.display='block'
       
             loListLevels4(level4)
           
           }else{
             document.querySelector(".lolistBull4").style.display='none'
           }
   
  }
 const  Accountability = response.filter((d) => d.info.areas=="Accountability and Ethical Conduct");
 if (Accountability.length>0) {
   document.querySelector(".flush-heading24").style.display="block"
   const level1 = Accountability.filter((d)=>d.info.levels=="Level 1")
      
             if(level1.length >0){
               console.log(level1);
               aeListLevels1(level1)
               document.querySelector(".aelistBull1").style.display='block'
             }else{
               document.querySelector(".aelistBull1").style.display='none'
             }
           const level2 = Accountability.filter((d)=>d.info.levels=="Level 2")
           if(level2.length>0){
             document.querySelector(".aelistBull2").style.display='block'
             console.log(level2);
             aeListLevels2(level2)
           
           }else{
             document.querySelector(".aelistBull2").style.display='none'
           }
           const level3 = Accountability.filter((d)=>d.info.levels=="Level 3")
           if(level3.length!==0){
             document.querySelector(".aelistBull3").style.display='block'
             aeListLevels3(level3)
         
           }else{
             document.querySelector(".aelistBull3").style.display='none'
           }
           const level4 = Accountability.filter((d)=>d.info.levels=="Level 4")
           if(level4.length!==0){
             console.log(level4);
             document.querySelector(".aelistBull4").style.display='block'
       
             aeListLevels4(level4)
           
           }else{
             document.querySelector(".aelistBull4").style.display='none'
           }
   
  }
  const   Problem = response.filter((d) => d.info.areas=="Problem Solving and Analysis");
  if (Problem.length>0) {
   document.querySelector(".flush-heading25").style.display="block"
   const level1 = Problem.filter((d)=>d.info.levels=="Level 1")
      
             if(level1.length >0){
               console.log(level1);
               psListLevels1(level1)
               document.querySelector(".pslistBull1").style.display='block'
             }else{
               document.querySelector(".pslistBull1").style.display='none'
             }
           const level2 = Problem.filter((d)=>d.info.levels=="Level 2")
           if(level2.length>0){
             document.querySelector(".pslistBull2").style.display='block'
             console.log(level2);
             psListLevels2(level2)
           
           }else{
             document.querySelector(".pslistBull2").style.display='none'
           }
           const level3 = Problem.filter((d)=>d.info.levels=="Level 3")
           if(level3.length!==0){
             document.querySelector(".pslistBull3").style.display='block'
             psListLevels3(level3)
         
           }else{
             document.querySelector(".pslistBull3").style.display='none'
           }
           const level4 = Problem.filter((d)=>d.info.levels=="Level 4")
           if(level4.length!==0){
             console.log(level4);
             document.querySelector(".pslistBull4").style.display='block'
       
             psListLevels4(level4)
           
           }else{
             document.querySelector(".pslistBull4").style.display='none'
           }
   
  }
 
  const   Compensation = response.filter((d) => d.info.areas=="Compensation and Benefits Management");
  if (Compensation.length>0) {
   document.querySelector(".flush-heading26").style.display="block"
   const level1 = Compensation.filter((d)=>d.info.levels=="Level 1")
      
             if(level1.length >0){
               console.log(level1);
               cbListLevels1(level1)
               document.querySelector(".cblistBull1").style.display='block'
             }else{
               document.querySelector(".cblistBull1").style.display='none'
             }
           const level2 = Compensation.filter((d)=>d.info.levels=="Level 2")
           if(level2.length>0){
             document.querySelector(".cblistBull2").style.display='block'
             console.log(level2);
             cbListLevels2(level2)
           
           }else{
             document.querySelector(".cblistBull2").style.display='none'
           }
           const level3 = Compensation.filter((d)=>d.info.levels=="Level 3")
           if(level3.length!==0){
             document.querySelector(".cblistBull3").style.display='block'
             cbListLevels3(level3)
         
           }else{
             document.querySelector(".cblistBull3").style.display='none'
           }
           const level4 = Compensation.filter((d)=>d.info.levels=="Level 4")
           if(level4.length!==0){
             console.log(level4);
             document.querySelector(".cblistBull4").style.display='block'
       
             cbListLevels4(level4)
           
           }else{
             document.querySelector(".cblistBull4").style.display='none'
           }
   
  }
 
  const   EmployeeWellness = response.filter((d) => d.info.areas=="Employee Wellness");
  if (EmployeeWellness.length>0) {
   document.querySelector(".flush-heading27").style.display="block"
   const level1 = EmployeeWellness.filter((d)=>d.info.levels=="Level 1")
      
             if(level1.length >0){
               console.log(level1);
               ewListLevels1(level1)
               document.querySelector(".ewlistBull1").style.display='block'
             }else{
               document.querySelector(".ewlistBull1").style.display='none'
             }
           const level2 = EmployeeWellness.filter((d)=>d.info.levels=="Level 2")
           if(level2.length>0){
             document.querySelector(".ewlistBull2").style.display='block'
             console.log(level2);
             ewListLevels2(level2)
           
           }else{
             document.querySelector(".ewlistBull2").style.display='none'
           }
           const level3 = EmployeeWellness.filter((d)=>d.info.levels=="Level 3")
           if(level3.length!==0){
             document.querySelector(".ewlistBull3").style.display='block'
             ewListLevels3(level3)
         
           }else{
             document.querySelector(".ewlistBull3").style.display='none'
           }
           const level4 = EmployeeWellness.filter((d)=>d.info.levels=="Level 4")
           if(level4.length!==0){
             console.log(level4);
             document.querySelector(".ewlistBull4").style.display='block'
       
             ewListLevels4(level4)
           
           }else{
             document.querySelector(".ewlistBull4").style.display='none'
           }
   
  }
 
  const   Resilience = response.filter((d) => d.info.areas=="Resilience");
  if (Resilience.length>0) {
   document.querySelector(".flush-heading28").style.display="block"
   const level1 = Resilience.filter((d)=>d.info.levels=="Level 1")
      
             if(level1.length >0){
               console.log(level1);
               rsListLevels1(level1)
               document.querySelector(".rslistBull1").style.display='block'
             }else{
               document.querySelector(".rslistBull1").style.display='none'
             }
           const level2 = Resilience.filter((d)=>d.info.levels=="Level 2")
           if(level2.length>0){
             document.querySelector(".rslistBull2").style.display='block'
             console.log(level2);
             rsListLevels2(level2)
           
           }else{
             document.querySelector(".rslistBull2").style.display='none'
           }
           const level3 = Resilience.filter((d)=>d.info.levels=="Level 3")
           if(level3.length!==0){
             document.querySelector(".rslistBull3").style.display='block'
             rsListLevels3(level3)
         
           }else{
             document.querySelector(".rslistBull3").style.display='none'
           }
           const level4 = Resilience.filter((d)=>d.info.levels=="Level 4")
           if(level4.length!==0){
             console.log(level4);
             document.querySelector(".rslistBull4").style.display='block'
       
             rsListLevels4(level4)
           
           }else{
             document.querySelector(".rslistBull4").style.display='none'
           }
   
  }
 
  const   DirectionSetting = response.filter((d) => d.info.areas=="Direction Setting");
  if (DirectionSetting.length>0) {
   document.querySelector(".flush-heading29").style.display="block"
   const level1 = DirectionSetting.filter((d)=>d.info.levels=="Level 1")
      
             if(level1.length >0){
               console.log(level1);
               drListLevels1(level1)
               document.querySelector(".drlistBull1").style.display='block'
             }else{
               document.querySelector(".drlistBull1").style.display='none'
             }
           const level2 = DirectionSetting.filter((d)=>d.info.levels=="Level 2")
           if(level2.length>0){
             document.querySelector(".drlistBull2").style.display='block'
             console.log(level2);
             drListLevels2(level2)
           
           }else{
             document.querySelector(".drlistBull2").style.display='none'
           }
           const level3 = DirectionSetting.filter((d)=>d.info.levels=="Level 3")
           if(level3.length!==0){
             document.querySelector(".drlistBull3").style.display='block'
             drListLevels3(level3)
         
           }else{
             document.querySelector(".drlistBull3").style.display='none'
           }
           const level4 = DirectionSetting.filter((d)=>d.info.levels=="Level 4")
           if(level4.length!==0){
             console.log(level4);
             document.querySelector(".drlistBull4").style.display='block'
       
             drListLevels4(level4)
           
           }else{
             document.querySelector(".drlistBull4").style.display='none'
           }
   
  }
 
  const   ImpactandInfluence = response.filter((d) => d.info.areas=="Impact and Influence");
  if (ImpactandInfluence.length>0) {
   document.querySelector(".flush-heading30").style.display="block"
   const level1 = ImpactandInfluence.filter((d)=>d.info.levels=="Level 1")
      
             if(level1.length >0){
               console.log(level1);
               iiListLevels1(level1)
               document.querySelector(".iilistBull1").style.display='block'
             }else{
               document.querySelector(".iilistBull1").style.display='none'
             }
           const level2 = ImpactandInfluence.filter((d)=>d.info.levels=="Level 2")
           if(level2.length>0){
             document.querySelector(".iilistBull2").style.display='block'
             console.log(level2);
             iiListLevels2(level2)
           
           }else{
             document.querySelector(".iilistBull2").style.display='none'
           }
           const level3 = ImpactandInfluence.filter((d)=>d.info.levels=="Level 3")
           if(level3.length!==0){
             document.querySelector(".iilistBull3").style.display='block'
             iiListLevels3(level3)
         
           }else{
             document.querySelector(".iilistBull3").style.display='none'
           }
           const level4 = ImpactandInfluence.filter((d)=>d.info.levels=="Level 4")
           if(level4.length!==0){
             console.log(level4);
             document.querySelector(".iilistBull4").style.display='block'
       
             iiListLevels4(level4)
           
           }else{
             document.querySelector(".iilistBull4").style.display='none'
           }
   
  }
 
  const   CoachingandMentoring = response.filter((d) => d.info.areas=="Coaching and Mentoring");
  if (CoachingandMentoring.length>0) {
   document.querySelector(".flush-heading31").style.display="block"
   const level1 = CoachingandMentoring.filter((d)=>d.info.levels=="Level 1")
      
             if(level1.length >0){
               console.log(level1);
               menListLevels1(level1)
               document.querySelector(".menlistBull1").style.display='block'
             }else{
               document.querySelector(".menlistBull1").style.display='none'
             }
           const level2 = CoachingandMentoring.filter((d)=>d.info.levels=="Level 2")
           if(level2.length>0){
             document.querySelector(".menlistBull2").style.display='block'
             console.log(level2);
             menListLevels2(level2)
           
           }else{
             document.querySelector(".menlistBull2").style.display='none'
           }
           const level3 = CoachingandMentoring.filter((d)=>d.info.levels=="Level 3")
           if(level3.length!==0){
             document.querySelector(".menlistBull3").style.display='block'
             menListLevels3(level3)
         
           }else{
             document.querySelector(".menlistBull3").style.display='none'
           }
           const level4 = CoachingandMentoring.filter((d)=>d.info.levels=="Level 4")
           if(level4.length!==0){
             console.log(level4);
             document.querySelector(".menlistBull4").style.display='block'
       
             menListLevels4(level4)
           
           }else{
             document.querySelector(".menlistBull4").style.display='none'
           }
   
  }
 
  const   TeamOrientation= response.filter((d) => d.info.areas=="Team Orientation");
  if (TeamOrientation.length>0) {
   document.querySelector(".flush-heading32").style.display="block"
   const level1 = TeamOrientation.filter((d)=>d.info.levels=="Level 1")
      
             if(level1.length >0){
               console.log(level1);
               toListLevels1(level1)
               document.querySelector(".tolistBull1").style.display='block'
             }else{
               document.querySelector(".tolistBull1").style.display='none'
             }
           const level2 = TeamOrientation.filter((d)=>d.info.levels=="Level 2")
           if(level2.length>0){
             document.querySelector(".tolistBull2").style.display='block'
             console.log(level2);
             toListLevels2(level2)
           
           }else{
             document.querySelector(".tolistBull2").style.display='none'
           }
           const level3 = TeamOrientation.filter((d)=>d.info.levels=="Level 3")
           if(level3.length!==0){
             document.querySelector(".tolistBull3").style.display='block'
             toListLevels3(level3)
         
           }else{
             document.querySelector(".tolistBull3").style.display='none'
           }
           const level4 = TeamOrientation.filter((d)=>d.info.levels=="Level 4")
           if(level4.length!==0){
             console.log(level4);
             document.querySelector(".tolistBull4").style.display='block'
       
             toListLevels4(level4)
           
           }else{
             document.querySelector(".tolistBull4").style.display='none'
           }
   
  }

  const   InternalAuditing  = response.filter((d) => d.info.areas=="Internal Auditing");
  if (InternalAuditing.length>0) {
   document.querySelector(".flush-heading33").style.display="block"
   const level1 = InternalAuditing.filter((d)=>d.info.levels=="Level 1")
      
             if(level1.length >0){
               console.log(level1);
               ioListLevels1(level1)
               document.querySelector(".iolistBull1").style.display='block'
             }else{
               document.querySelector(".iolistBull1").style.display='none'
             }
           const level2 = InternalAuditing.filter((d)=>d.info.levels=="Level 2")
           if(level2.length>0){
             document.querySelector(".iolistBull2").style.display='block'
             console.log(level2);
             ioListLevels2(level2)
           
           }else{
             document.querySelector(".iolistBull2").style.display='none'
           }
           const level3 = InternalAuditing.filter((d)=>d.info.levels=="Level 3")
           if(level3.length!==0){
             document.querySelector(".iolistBull3").style.display='block'
             ioListLevels3(level3)
         
           }else{
             document.querySelector(".iolistBull3").style.display='none'
           }
           const level4 = InternalAuditing.filter((d)=>d.info.levels=="Level 4")
           if(level4.length!==0){
             console.log(level4);
             document.querySelector(".iolistBull4").style.display='block'
       
             ioListLevels4(level4)
           
           }else{
             document.querySelector(".iolistBull4").style.display='none'
           }
   
  }

  const   EngagementManagement  = response.filter((d) => d.info.areas=="Engagement Management");
  if (EngagementManagement.length>0) {
   document.querySelector(".flush-heading34").style.display="block"
   const level1 = EngagementManagement.filter((d)=>d.info.levels=="Level 1")
      
             if(level1.length >0){
               console.log(level1);
               emListLevels1(level1)
               document.querySelector(".emlistBull1").style.display='block'
             }else{
               document.querySelector(".emlistBull1").style.display='none'
             }
           const level2 = EngagementManagement.filter((d)=>d.info.levels=="Level 2")
           if(level2.length>0){
             document.querySelector(".emlistBull2").style.display='block'
             console.log(level2);
             emListLevels2(level2)
           
           }else{
             document.querySelector(".emlistBull2").style.display='none'
           }
           const level3 = EngagementManagement.filter((d)=>d.info.levels=="Level 3")
           if(level3.length!==0){
             document.querySelector(".emlistBull3").style.display='block'
             emListLevels3(level3)
         
           }else{
             document.querySelector(".emlistBull3").style.display='none'
           }
           const level4 = EngagementManagement.filter((d)=>d.info.levels=="Level 4")
           if(level4.length!==0){
             console.log(level4);
             document.querySelector(".emlistBull4").style.display='block'
       
             emListLevels4(level4)
           
           }else{
             document.querySelector(".emlistBull4").style.display='none'
           }
   
  }
  
  const   InformationManagement  = response.filter((d) => d.info.areas=="Information Management");
  if (InformationManagement.length>0) {
   document.querySelector(".flush-heading35").style.display="block"
   const level1 = InformationManagement.filter((d)=>d.info.levels=="Level 1")
      
             if(level1.length >0){
               console.log(level1);
               imListLevels1(level1)
               document.querySelector(".imlistBull1").style.display='block'
             }else{
               document.querySelector(".imlistBull1").style.display='none'
             }
           const level2 = InformationManagement.filter((d)=>d.info.levels=="Level 2")
           if(level2.length>0){
             document.querySelector(".imlistBull2").style.display='block'
             console.log(level2);
             imListLevels2(level2)
           
           }else{
             document.querySelector(".imlistBull2").style.display='none'
           }
           const level3 = InformationManagement.filter((d)=>d.info.levels=="Level 3")
           if(level3.length!==0){
             document.querySelector(".imlistBull3").style.display='block'
             imListLevels3(level3)
         
           }else{
             document.querySelector(".imlistBull3").style.display='none'
           }
           const level4 = InformationManagement.filter((d)=>d.info.levels=="Level 4")
           if(level4.length!==0){
             console.log(level4);
             document.querySelector(".imlistBull4").style.display='block'
       
             imListLevels4(level4)
           
           }else{
             document.querySelector(".imlistBull4").style.display='none'
           }
   
  }
  const   ResearchandAnalysis  = response.filter((d) => d.info.areas=="Research and Analysis");
  if (ResearchandAnalysis.length>0) {
   document.querySelector(".flush-heading36").style.display="block"
   const level1 = ResearchandAnalysis.filter((d)=>d.info.levels=="Level 1")
      
             if(level1.length >0){
               console.log(level1);
               raListLevels1(level1)
               document.querySelector(".ralistBull1").style.display='block'
             }else{
               document.querySelector(".ralistBull1").style.display='none'
             }
           const level2 = ResearchandAnalysis.filter((d)=>d.info.levels=="Level 2")
           if(level2.length>0){
             document.querySelector(".ralistBull2").style.display='block'
             console.log(level2);
             raListLevels2(level2)
           
           }else{
             document.querySelector(".ralistBull2").style.display='none'
           }
           const level3 = ResearchandAnalysis.filter((d)=>d.info.levels=="Level 3")
           if(level3.length!==0){
             document.querySelector(".ralistBull3").style.display='block'
             raListLevels3(level3)
         
           }else{
             document.querySelector(".ralistBull3").style.display='none'
           }
           const level4 = ResearchandAnalysis.filter((d)=>d.info.levels=="Level 4")
           if(level4.length!==0){
             console.log(level4);
             document.querySelector(".ralistBull4").style.display='block'
       
             raListLevels4(level4)
           
           }else{
             document.querySelector(".ralistBull4").style.display='none'
           }
   
  }

  const   AdvocacyNegotiation  = response.filter((d) => d.info.areas=="Advocacy / Negotiation");
  if (AdvocacyNegotiation.length>0) {
   document.querySelector(".flush-heading37").style.display="block"
   const level1 = AdvocacyNegotiation.filter((d)=>d.info.levels=="Level 1")
      
             if(level1.length >0){
               console.log(level1);
               anListLevels1(level1)
               document.querySelector(".anlistBull1").style.display='block'
             }else{
               document.querySelector(".anlistBull1").style.display='none'
             }
           const level2 = AdvocacyNegotiation.filter((d)=>d.info.levels=="Level 2")
           if(level2.length>0){
             document.querySelector(".anlistBull2").style.display='block'
             console.log(level2);
             anListLevels2(level2)
           
           }else{
             document.querySelector(".anlistBull2").style.display='none'
           }
           const level3 = AdvocacyNegotiation.filter((d)=>d.info.levels=="Level 3")
           if(level3.length!==0){
             document.querySelector(".anlistBull3").style.display='block'
             anListLevels3(level3)
         
           }else{
             document.querySelector(".anlistBull3").style.display='none'
           }
           const level4 = AdvocacyNegotiation.filter((d)=>d.info.levels=="Level 4")
           if(level4.length!==0){
             console.log(level4);
             document.querySelector(".anlistBull4").style.display='block'
       
             anListLevels4(level4)
           
           }else{
             document.querySelector(".anlistBull4").style.display='none'
           }
   
  }

  const   EthicsandProfessionalism  = response.filter((d) => d.info.areas=="Ethics and Professionalism");
  if (EthicsandProfessionalism.length>0) {
   document.querySelector(".flush-heading38").style.display="block"
   const level1 = EthicsandProfessionalism.filter((d)=>d.info.levels=="Level 1")
      
             if(level1.length >0){
               console.log(level1);
               epListLevels1(level1)
               document.querySelector(".eplistBull1").style.display='block'
             }else{
               document.querySelector(".eplistBull1").style.display='none'
             }
           const level2 = EthicsandProfessionalism.filter((d)=>d.info.levels=="Level 2")
           if(level2.length>0){
             document.querySelector(".eplistBull2").style.display='block'
             console.log(level2);
             epListLevels2(level2)
           
           }else{
             document.querySelector(".eplistBull2").style.display='none'
           }
           const level3 = EthicsandProfessionalism.filter((d)=>d.info.levels=="Level 3")
           if(level3.length!==0){
             document.querySelector(".eplistBull3").style.display='block'
             epListLevels3(level3)
         
           }else{
             document.querySelector(".eplistBull3").style.display='none'
           }
           const level4 = EthicsandProfessionalism.filter((d)=>d.info.levels=="Level 4")
           if(level4.length!==0){
             console.log(level4);
             document.querySelector(".eplistBull4").style.display='block'
       
             epListLevels4(level4)
           
           }else{
             document.querySelector(".eplistBull4").style.display='none'
           }
   
  }
  const   StrategicCapability  = response.filter((d) => d.info.areas=="Strategic Capability / Leadership or Direction Setting");
  if (StrategicCapability.length>0) {
   document.querySelector(".flush-heading39").style.display="block"
   const level1 = StrategicCapability.filter((d)=>d.info.levels=="Level 1")
      
             if(level1.length >0){
               console.log(level1);
               scListLevels1(level1)
               document.querySelector(".sclistBull1").style.display='block'
             }else{
               document.querySelector(".sclistBull1").style.display='none'
             }
           const level2 = StrategicCapability.filter((d)=>d.info.levels=="Level 2")
           if(level2.length>0){
             document.querySelector(".sclistBull2").style.display='block'
             console.log(level2);
             scListLevels2(level2)
           
           }else{
             document.querySelector(".sclistBull2").style.display='none'
           }
           const level3 = StrategicCapability.filter((d)=>d.info.levels=="Level 3")
           if(level3.length!==0){
             document.querySelector(".sclistBull3").style.display='block'
             scListLevels3(level3)
         
           }else{
             document.querySelector(".sclistBull3").style.display='none'
           }
           const level4 = StrategicCapability.filter((d)=>d.info.levels=="Level 4")
           if(level4.length!==0){
             console.log(level4);
             document.querySelector(".sclistBull4").style.display='block'
       
             scListLevels4(level4)
           
           }else{
             document.querySelector(".sclistBull4").style.display='none'
           }
   
  }

  const   ChangeReadiness  = response.filter((d) => d.info.areas=="Change Readiness");
  if (ChangeReadiness.length>0) {
   document.querySelector(".flush-heading40").style.display="block"
   const level1 = ChangeReadiness.filter((d)=>d.info.levels=="Level 1")
      
             if(level1.length >0){
               console.log(level1);
               crListLevels1(level1)
               document.querySelector(".crlistBull1").style.display='block'
             }else{
               document.querySelector(".crlistBull1").style.display='none'
             }
           const level2 = ChangeReadiness.filter((d)=>d.info.levels=="Level 2")
           if(level2.length>0){
             document.querySelector(".crlistBull2").style.display='block'
             console.log(level2);
             crListLevels2(level2)
           
           }else{
             document.querySelector(".crlistBull2").style.display='none'
           }
           const level3 = ChangeReadiness.filter((d)=>d.info.levels=="Level 3")
           if(level3.length!==0){
             document.querySelector(".crlistBull3").style.display='block'
             crListLevels3(level3)
         
           }else{
             document.querySelector(".crlistBull3").style.display='none'
           }
           const level4 = ChangeReadiness.filter((d)=>d.info.levels=="Level 4")
           if(level4.length!==0){
             console.log(level4);
             document.querySelector(".crlistBull4").style.display='block'
       
             crListLevels4(level4)
           
           }else{
             document.querySelector(".crlistBull4").style.display='none'
           }
   
  }

  const   CognitiveAbility  = response.filter((d) => d.info.areas=="Cognitive Ability");
  if (CognitiveAbility.length>0) {
   document.querySelector(".flush-heading41").style.display="block"
   const level1 = CognitiveAbility.filter((d)=>d.info.levels=="Level 1")
      
             if(level1.length >0){
               console.log(level1);
               caListLevels1(level1)
               document.querySelector(".calistBull1").style.display='block'
             }else{
               document.querySelector(".calistBull1").style.display='none'
             }
           const level2 = CognitiveAbility.filter((d)=>d.info.levels=="Level 2")
           if(level2.length>0){
             document.querySelector(".calistBull2").style.display='block'
             console.log(level2);
             caListLevels2(level2)
           
           }else{
             document.querySelector(".calistBull2").style.display='none'
           }
           const level3 = CognitiveAbility.filter((d)=>d.info.levels=="Level 3")
           if(level3.length!==0){
             document.querySelector(".calistBull3").style.display='block'
             caListLevels3(level3)
         
           }else{
             document.querySelector(".calistBull3").style.display='none'
           }
           const level4 = CognitiveAbility.filter((d)=>d.info.levels=="Level 4")
           if(level4.length!==0){
             console.log(level4);
             document.querySelector(".calistBull4").style.display='block'
       
             caListLevels4(level4)
           
           }else{
             document.querySelector(".calistBull4").style.display='none'
           }
   
  }

  const   CustomerOrientation  = response.filter((d) => d.info.areas=="Customer Orientation and Customer Focus");
  if (CustomerOrientation.length>0) {
   document.querySelector(".flush-heading42").style.display="block"
   const level1 = CustomerOrientation.filter((d)=>d.info.levels=="Level 1")
      
             if(level1.length >0){
               console.log(level1);
               ccListLevels1(level1)
               document.querySelector(".cclistBull1").style.display='block'
             }else{
               document.querySelector(".cclistBull1").style.display='none'
             }
           const level2 = CustomerOrientation.filter((d)=>d.info.levels=="Level 2")
           if(level2.length>0){
             document.querySelector(".cclistBull2").style.display='block'
             console.log(level2);
             ccListLevels2(level2)
           
           }else{
             document.querySelector(".cclistBull2").style.display='none'
           }
           const level3 = CustomerOrientation.filter((d)=>d.info.levels=="Level 3")
           if(level3.length!==0){
             document.querySelector(".cclistBull3").style.display='block'
             ccListLevels3(level3)
         
           }else{
             document.querySelector(".cclistBull3").style.display='none'
           }
           const level4 = CustomerOrientation.filter((d)=>d.info.levels=="Level 4")
           if(level4.length!==0){
             console.log(level4);
             document.querySelector(".cclistBull4").style.display='block'
       
             ccListLevels4(level4)
           
           }else{
             document.querySelector(".cclistBull4").style.display='none'
           }
   
  }
//   // let option =""
//   // let html =""
//   // let list = document.querySelector(".listdata124")
 
//   // result.forEach(department => {
//   //     option=` <li>${department.details}</li>`;
//   //     html +=option;
//   //     list.innerHTML=html;
     
      
//   // });

}
function Functional(response) {
  
  console.log(response);
 
  const  written = response.filter((d) => d.info.areas=="Written Communication");
  if (written.length>0) {
   document.querySelector(".flush-heading0").style.display="block"
   const level1 = written.filter((d)=>d.info.levels=="Level 1")
       
   if(level1.length >0){
     console.log(level1);
     ListLevels1(level1)
   
     document.querySelector(".listBull1").style.display='block'
   }else{
     document.querySelector(".listBull1").style.display='none'
   }
  const level2 = written.filter((d)=>d.info.levels=="Level 2")
  if(level2.length!==0){
   document.querySelector(".listBull2").style.display='block'
   ListLevels2(level2)
  
  }else{
   document.querySelector(".listBull2").style.display='none'
  }
  const level3 = written.filter((d)=>d.levels=="Level 3")
  if(level3.length!==0){
   document.querySelector(".listBull3").style.display='block'
   ListLevels3(level3)
  
  }else{
   document.querySelector(".listBull3").style.display='none'
  }
  const level4 = written.filter((d)=>d.levels=="Level 4")
  if(level4.length!==0){
   document.querySelector(".listBull4").style.display='block'
  
   ListLevels4(level4)
  
  }else{
   document.querySelector(".listBull4").style.display='none'
  }
  }
 
  const Organisational = response.filter((d) => d.info.areas=="Organisational Awareness");
  if (Organisational.length>0) {
   document.querySelector(".flush-heading1").style.display="block"
   const level1 = Organisational.filter((d)=>d.info.levels=="Level 1")
      
             if(level1.length >0){
               console.log(level1);
               oListLevels1(level1)
               document.querySelector(".olistBull1").style.display='block'
             }else{
               document.querySelector(".olistBull1").style.display='none'
             }
           const level2 = Organisational.filter((d)=>d.info.levels=="Level 2")
           if(level2.length>0){
             document.querySelector(".olistBull2").style.display='block'
             console.log(level2);
             oListLevels2(level2)
           
           }else{
             document.querySelector(".olistBull2").style.display='none'
           }
           const level3 = Organisational.filter((d)=>d.info.levels=="Level 3")
           if(level3.length!==0){
             document.querySelector(".olistBull3").style.display='block'
             oListLevels3(level3)
         
           }else{
             document.querySelector(".olistBull3").style.display='none'
           }
           const level4 = Organisational.filter((d)=>d.info.levels=="Level 4")
           if(level4.length!==0){
             console.log(level4);
             document.querySelector(".olistBull4").style.display='block'
       
             oListLevels4(level4)
           
           }else{
             document.querySelector(".olistBull4").style.display='none'
           }
   
  }
  
  const  Plannning = response.filter((d) => d.info.areas=="Planning and Organising");
  if (Plannning.length>0) {
   document.querySelector(".flush-heading2").style.display="block"
 
     const level1 = Plannning.filter((d)=>d.info.levels=="Level 1")
        
               if(level1.length >0){
                 console.log(level1);
                 pListLevels1(level1)
                 document.querySelector(".plistBull1").style.display='block'
               }else{
                 document.querySelector(".plistBull1").style.display='none'
               }
             const level2 = Plannning.filter((d)=>d.info.levels=="Level 2")
             if(level2.length>0){
               document.querySelector(".plistBull2").style.display='block'
               console.log(level2);
               pListLevels2(level2)
             
             }else{
               document.querySelector(".plistBull2").style.display='none'
             }
             const level3 = Plannning.filter((d)=>d.info.levels=="Level 3")
             if(level3.length!==0){
               document.querySelector(".plistBull3").style.display='block'
               pListLevels3(level3)
           
             }else{
               document.querySelector(".plistBull3").style.display='none'
             }
             const level4 = Plannning.filter((d)=>d.info.levels=="Level 4")
             if(level4.length!==0){
               console.log(level4);
               document.querySelector(".plistBull4").style.display='block'
         
               pListLevels4(level4)
             
             }else{
               document.querySelector(".plistBull4").style.display='none'
             }
     
    
  }
  const  Monitoring = response.filter((d) => d.info.areas=="Monitoring and Control");
  if (Monitoring.length>0) {
   document.querySelector(".flush-heading3").style.display="block"
   const level1 = Monitoring.filter((d)=>d.info.levels=="Level 1")
        
               if(level1.length >0){
                 console.log(level1);
                 mListLevels1(level1)
                 document.querySelector(".mlistBull1").style.display='block'
               }else{
                 document.querySelector(".mlistBull1").style.display='none'
               }
             const level2 = Monitoring.filter((d)=>d.info.levels=="Level 2")
             if(level2.length>0){
               document.querySelector(".mlistBull2").style.display='block'
               console.log(level2);
               mListLevels2(level2)
             
             }else{
               document.querySelector(".mlistBull2").style.display='none'
             }
             const level3 = Monitoring.filter((d)=>d.info.levels=="Level 3")
             if(level3.length!==0){
               document.querySelector(".mlistBull3").style.display='block'
               mListLevels3(level3)
           
             }else{
               document.querySelector(".mlistBull3").style.display='none'
             }
             const level4 = Monitoring.filter((d)=>d.info.levels=="Level 4")
             if(level4.length!==0){
               console.log(level4);
               document.querySelector(".mlistBull4").style.display='block'
         
               mListLevels4(level4)
             
             }else{
               document.querySelector(".mlistBull4").style.display='none'
             }
     
  }
 
  const  Consulting = response.filter((d) => d.info.areas=="Consulting");
  if (Consulting.length>0) {
   document.querySelector(".flush-heading4").style.display="block"
   const level1 = Consulting.filter((d)=>d.info.levels=="Level 1")
        
               if(level1.length >0){
                 console.log(level1);
                 cListLevels1(level1)
                 document.querySelector(".clistBull1").style.display='block'
               }else{
                 document.querySelector(".clistBull1").style.display='none'
               }
             const level2 = Consulting.filter((d)=>d.info.levels=="Level 2")
             if(level2.length>0){
               document.querySelector(".clistBull2").style.display='block'
               console.log(level2);
               cListLevels2(level2)
             
             }else{
               document.querySelector(".clistBull2").style.display='none'
             }
             const level3 = Consulting.filter((d)=>d.info.levels=="Level 3")
             if(level3.length!==0){
               document.querySelector(".clistBull3").style.display='block'
               cListLevels3(level3)
           
             }else{
               document.querySelector(".clistBull3").style.display='none'
             }
             const level4 = Consulting.filter((d)=>d.info.levels=="Level 4")
             if(level4.length!==0){
               console.log(level4);
               document.querySelector(".clistBull4").style.display='block'
         
               cListLevels4(level4)
             
             }else{
               document.querySelector(".clistBull4").style.display='none'
             }
     
  }
  const  Negotiation = response.filter((d) => d.info.areas=="Negotiation");
  if (Negotiation.length>0) {
   document.querySelector(".flush-heading5").style.display="block"
   const level1 = Negotiation.filter((d)=>d.info.levels=="Level 1")
        
               if(level1.length >0){
                 console.log(level1);
                 nListLevels1(level1)
                 document.querySelector(".nlistBull1").style.display='block'
               }else{
                 document.querySelector(".nlistBull1").style.display='none'
               }
             const level2 = Consulting.filter((d)=>d.info.levels=="Level 2")
             if(level2.length>0){
               document.querySelector(".nlistBull2").style.display='block'
               console.log(level2);
               nListLevels2(level2)
             
             }else{
               document.querySelector(".nlistBull2").style.display='none'
             }
             const level3 = Consulting.filter((d)=>d.info.levels=="Level 3")
             if(level3.length!==0){
               document.querySelector(".nlistBull3").style.display='block'
               nListLevels3(level3)
           
             }else{
               document.querySelector(".nlistBull3").style.display='none'
             }
             const level4 = Consulting.filter((d)=>d.info.levels=="Level 4")
             if(level4.length!==0){
               console.log(level4);
               document.querySelector(".nlistBull4").style.display='block'
         
               nListLevels4(level4)
             
             }else{
               document.querySelector(".nlistBull4").style.display='none'
             }
     
  }
  const  Oral = response.filter((d) => d.info.areas=="Oral Communication");
  if (Oral.length>0) {
   document.querySelector(".flush-heading6").style.display="block"
   const level1 = Negotiation.filter((d)=>d.info.levels=="Level 1")
        
               if(level1.length >0){
                 console.log(level1);
                 orListLevels1(level1)
                 document.querySelector(".orlistBull1").style.display='block'
               }else{
                 document.querySelector(".orlistBull1").style.display='none'
               }
             const level2 = Consulting.filter((d)=>d.info.levels=="Level 2")
             if(level2.length>0){
               document.querySelector(".orlistBull2").style.display='block'
               console.log(level2);
               orListLevels2(level2)
             
             }else{
               document.querySelector(".orlistBull2").style.display='none'
             }
             const level3 = Consulting.filter((d)=>d.info.levels=="Level 3")
             if(level3.length!==0){
               document.querySelector(".orlistBull3").style.display='block'
               orListLevels3(level3)
           
             }else{
               document.querySelector(".orlistBull3").style.display='none'
             }
             const level4 = Consulting.filter((d)=>d.info.levels=="Level 4")
             if(level4.length!==0){
               console.log(level4);
               document.querySelector(".orlistBull4").style.display='block'
         
               orListLevels4(level4)
             
             }else{
               document.querySelector(".orlistBull4").style.display='none'
             }
 
              
  const Learning = response.filter((d) => d.info.areas=="Learning and Development ");
  if (Learning.length>0) {
   document.querySelector(".flush-heading7").style.display="block"
   const level1 = Learning.filter((d)=>d.info.levels=="Level 1")
      
             if(level1.length >0){
               console.log(level1);
               ldListLevels1(level1)
               document.querySelector(".ldlistBull1").style.display='block'
             }else{
               document.querySelector(".ldlistBull1").style.display='none'
             }
           const level2 = Learning.filter((d)=>d.info.levels=="Level 2")
           if(level2.length>0){
             document.querySelector(".ldlistBull2").style.display='block'
             console.log(level2);
             ldListLevels2(level2)
           
           }else{
             document.querySelector(".ldlistBull2").style.display='none'
           }
           const level3 = Learning.filter((d)=>d.info.levels=="Level 3")
           if(level3.length!==0){
             document.querySelector(".ldlistBull3").style.display='block'
             ldListLevels3(level3)
         
           }else{
             document.querySelector(".ldlistBull3").style.display='none'
           }
           const level4 = Learning.filter((d)=>d.info.levels=="Level 4")
           if(level4.length!==0){
             console.log(level4);
             document.querySelector(".ldlistBull4").style.display='block'
       
             ldListLevels4(level4)
           
           }else{
             document.querySelector(".ldlistBull4").style.display='none'
           }
   
  }
     
  }
 
  const Learning = response.filter((d) => d.info.areas=="Learning and Development");
  if (Learning.length>0) {
   document.querySelector(".flush-heading7").style.display="block"
   const level1 = Learning.filter((d)=>d.info.levels=="Level 1")
      
             if(level1.length >0){
               console.log(level1);
               ldListLevels1(level1)
               document.querySelector(".ldlistBull1").style.display='block'
             }else{
               document.querySelector(".ldlistBull1").style.display='none'
             }
           const level2 = Learning.filter((d)=>d.info.levels=="Level 2")
           if(level2.length>0){
             document.querySelector(".ldlistBull2").style.display='block'
             console.log(level2);
             ldListLevels2(level2)
           
           }else{
             document.querySelector(".ldlistBull2").style.display='none'
           }
           const level3 = Learning.filter((d)=>d.info.levels=="Level 3")
           if(level3.length!==0){
             document.querySelector(".ldlistBull3").style.display='block'
             ldListLevels3(level3)
         
           }else{
             document.querySelector(".ldlistBull3").style.display='none'
           }
           const level4 = Learning.filter((d)=>d.info.levels=="Level 4")
           if(level4.length!==0){
             console.log(level4);
             document.querySelector(".ldlistBull4").style.display='block'
       
             ldListLevels4(level4)
           
           }else{
             document.querySelector(".ldlistBull4").style.display='none'
           }
   
  }
  
 // const Awareness = response.filter((d) => d.areas=="Organisational Awareness");
 
 // if (Awareness.length>0) {
 //   document.querySelector(".flush-heading8").style.display="block"
 //   const level1 = Awareness.filter((d)=>d.levels=="Level 1")
      
 //             if(level1.length >0){
 //               console.log(level1);
 //               aListLevels1(level1)
 //               document.querySelector(".alistBull1").style.display='block'
 //             }else{
 //               document.querySelector(".alistBull1").style.display='none'
 //             }
 //           const level2 = Awareness.filter((d)=>d.levels=="Level 2")
 //           if(level2.length>0){
 //             document.querySelector(".alistBull2").style.display='block'
 //             console.log(level2);
 //             aListLevels2(level2)
           
 //           }else{
 //             document.querySelector(".alistBull2").style.display='none'
 //           }
 //           const level3 = Awareness.filter((d)=>d.levels=="Level 3")
 //           if(level3.length!==0){
 //             document.querySelector(".alistBull3").style.display='block'
 //             aListLevels3(level3)
         
 //           }else{
 //             document.querySelector(".alistBull3").style.display='none'
 //           }
 //           const level4 = Awareness.filter((d)=>d.levels=="Level 4")
 //           if(level4.length!==0){
 //             console.log(level4);
 //             document.querySelector(".alistBull4").style.display='block'
       
 //             aListLevels4(level4)
           
 //           }else{
 //             document.querySelector(".alistBull4").style.display='none'
 //           }
   
 //  }
 
 const  Change = response.filter((d) => d.info.areas=="Change Movement");
 
 if (Change.length>0) {
   document.querySelector(".flush-heading9").style.display="block"
   const level1 = Change.filter((d)=>d.info.levels=="Level 1")
      
             if(level1.length >0){
               console.log(level1);
               cmListLevels1(level1)
               document.querySelector(".cmlistBull1").style.display='block'
             }else{
               document.querySelector(".cmlistBull1").style.display='none'
             }
           const level2 = Change.filter((d)=>d.info.levels=="Level 2")
           if(level2.length>0){
             document.querySelector(".cmlistBull2").style.display='block'
             console.log(level2);
             cmListLevels2(level2)
           
           }else{
             document.querySelector(".cmlistBull2").style.display='none'
           }
           const level3 = Change.filter((d)=>d.info.levels=="Level 3")
           if(level3.length!==0){
             document.querySelector(".cmlistBull3").style.display='block'
             cmListLevels3(level3)
         
           }else{
             document.querySelector(".cmlistBull3").style.display='none'
           }
           const level4 = Change.filter((d)=>d.info.levels=="Level 4")
           if(level4.length!==0){
             console.log(level4);
             document.querySelector(".cmlistBull4").style.display='block'
       
             cmListLevels4(level4)
           
           }else{
             document.querySelector(".cmlistBull4").style.display='none'
           }
   
  }
 
 
 const  Technology = response.filter((d) => d.info.areas=="HR Technology information Management");
 
 
 if (Technology.length>0) {
   document.querySelector(".flush-heading10").style.display="block"
   const level1 = Technology.filter((d)=>d.info.levels=="Level 1")
      
             if(level1.length >0){
               console.log(level1);
               tListLevels1(level1)
               document.querySelector(".tlistBull1").style.display='block'
             }else{
               document.querySelector(".tlistBull1").style.display='none'
             }
           const level2 = Technology.filter((d)=>d.info.levels=="Level 2")
           if(level2.length>0){
             document.querySelector(".tlistBull2").style.display='block'
             console.log(level2);
             tListLevels2(level2)
           
           }else{
             document.querySelector(".tlistBull2").style.display='none'
           }
           const level3 = Technology.filter((d)=>d.info.levels=="Level 3")
           if(level3.length!==0){
             document.querySelector(".tlistBull3").style.display='block'
             tListLevels3(level3)
         
           }else{
             document.querySelector(".tlistBull3").style.display='none'
           }
           const level4 = Technology.filter((d)=>d.info.levels=="Level 4")
           if(level4.length!==0){
             console.log(level4);
             document.querySelector(".tlistBull4").style.display='block'
       
             tListLevels4(level4)
           
           }else{
             document.querySelector(".tlistBull4").style.display='none'
           }
   
  }
 
 const  Service = response.filter((d) => d.info.areas=="HR Service Delivery");
 if (Service.length>0) {
   document.querySelector(".flush-heading11").style.display="block"
   const level1 = Service.filter((d)=>d.info.levels=="Level 1")
      
             if(level1.length >0){
               console.log(level1);
               sListLevels1(level1)
               document.querySelector(".slistBull1").style.display='block'
             }else{
               document.querySelector(".slistBull1").style.display='none'
             }
           const level2 = Service.filter((d)=>d.info.levels=="Level 2")
           if(level2.length>0){
             document.querySelector(".slistBull2").style.display='block'
             console.log(level2);
             sListLevels2(level2)
           
           }else{
             document.querySelector(".slistBull2").style.display='none'
           }
           const level3 = Service.filter((d)=>d.info.levels=="Level 3")
           if(level3.length!==0){
             document.querySelector(".slistBull3").style.display='block'
             sListLevels3(level3)
         
           }else{
             document.querySelector(".slistBull3").style.display='none'
           }
           const level4 = Service.filter((d)=>d.info.levels=="Level 4")
           if(level4.length!==0){
             console.log(level4);
             document.querySelector(".slistBull4").style.display='block'
       
             sListLevels4(level4)
           
           }else{
             document.querySelector(".slistBull4").style.display='none'
           }
   
  }
 const  Talent = response.filter((d) => d.info.areas=="Talent Management");
 if (Talent.length>0) {
   document.querySelector(".flush-heading12").style.display="block"
   const level1 = Talent.filter((d)=>d.info.levels=="Level 1")
      
             if(level1.length >0){
               console.log(level1);
               tmListLevels1(level1)
               document.querySelector(".tmlistBull1").style.display='block'
             }else{
               document.querySelector(".tmlistBull1").style.display='none'
             }
           const level2 = Talent.filter((d)=>d.info.levels=="Level 2")
           if(level2.length>0){
             document.querySelector(".tmlistBull2").style.display='block'
             console.log(level2);
             tmListLevels2(level2)
           
           }else{
             document.querySelector(".tmlistBull2").style.display='none'
           }
           const level3 = Talent.filter((d)=>d.info.levels=="Level 3")
           if(level3.length!==0){
             document.querySelector(".tmlistBull3").style.display='block'
             tmListLevels3(level3)
         
           }else{
             document.querySelector(".tmlistBull3").style.display='none'
           }
           const level4 = Talent.filter((d)=>d.info.levels=="Level 4")
           if(level4.length!==0){
             console.log(level4);
             document.querySelector(".tmlistBull4").style.display='block'
       
             tmListLevels4(level4)
           
           }else{
             document.querySelector(".tmlistBull4").style.display='none'
           }
   
  }
 const  Workforce = response.filter((d) => d.info.areas=="Workforce Planning");
 
 if (Workforce.length>0) {
   document.querySelector(".flush-heading13").style.display="block"
   const level1 = Workforce.filter((d)=>d.info.levels=="Level 1")
      
             if(level1.length >0){
               console.log(level1);
               wListLevels1(level1)
               document.querySelector(".wlistBull1").style.display='block'
             }else{
               document.querySelector(".wlistBull1").style.display='none'
             }
           const level2 = Workforce.filter((d)=>d.info.levels=="Level 2")
           if(level2.length>0){
             document.querySelector(".wlistBull2").style.display='block'
             console.log(level2);
             wListLevels2(level2)
           
           }else{
             document.querySelector(".wlistBull2").style.display='none'
           }
           const level3 = Workforce.filter((d)=>d.info.levels=="Level 3")
           if(level3.length!==0){
             document.querySelector(".wlistBull3").style.display='block'
             wListLevels3(level3)
         
           }else{
             document.querySelector(".wlistBull3").style.display='none'
           }
           const level4 = Workforce.filter((d)=>d.info.levels=="Level 4")
           if(level4.length!==0){
             console.log(level4);
             document.querySelector(".wlistBull4").style.display='block'
       
             wListLevels4(level4)
           
           }else{
             document.querySelector(".wlistBull4").style.display='none'
           }
   
  }
  const  Learningdevelopment = response.filter((d) => d.info.areas=="Learning and Develepment");
  if (Learningdevelopment.length>0) {
   document.querySelector(".flush-heading14").style.display="block"
   const level1 = Learningdevelopment.filter((d)=>d.info.levels=="Level 1")
      
             if(level1.length >0){
               console.log(level1);
               dlListLevels1(level1)
               document.querySelector(".dllistBull1").style.display='block'
             }else{
               document.querySelector(".dllistBull1").style.display='none'
             }
           const level2 = Learningdevelopment.filter((d)=>d.info.levels=="Level 2")
           if(level2.length>0){
             document.querySelector(".dllistBull2").style.display='block'
             console.log(level2);
             dlListLevels2(level2)
           
           }else{
             document.querySelector(".dllistBull2").style.display='none'
           }
           const level3 = Learningdevelopment.filter((d)=>d.info.levels=="Level 3")
           if(level3.length!==0){
             document.querySelector(".dllistBull3").style.display='block'
             dlListLevels3(level3)
         
           }else{
             document.querySelector(".dllistBull3").style.display='none'
           }
           const level4 = Learningdevelopment.filter((d)=>d.info.levels=="Level 4")
           if(level4.length!==0){
             console.log(level4);
             document.querySelector(".dllistBull4").style.display='block'
       
             dlListLevels4(level4)
           
           }else{
             document.querySelector(".dllistBull4").style.display='none'
           }
   
  }
  
  const  Occupational = response.filter((d) => d.info.areas=="Occupational Health and Safety");
  
  if (Occupational.length>0) {
   document.querySelector(".flush-heading15").style.display="block"
   const level1 = Occupational.filter((d)=>d.info.levels=="Level 1")
      
             if(level1.length >0){
               console.log(level1);
               ohListLevels1(level1)
               document.querySelector(".ohlistBull1").style.display='block'
             }else{
               document.querySelector(".ohlistBull1").style.display='none'
             }
           const level2 = Occupational.filter((d)=>d.info.levels=="Level 2")
           if(level2.length>0){
             document.querySelector(".ohlistBull2").style.display='block'
             console.log(level2);
             ohListLevels2(level2)
           
           }else{
             document.querySelector(".ohlistBull2").style.display='none'
           }
           const level3 = Occupational.filter((d)=>d.info.levels=="Level 3")
           if(level3.length!==0){
             document.querySelector(".ohlistBull3").style.display='block'
             ohListLevels3(level3)
         
           }else{
             document.querySelector(".ohlistBull3").style.display='none'
           }
           const level4 = Occupational.filter((d)=>d.info.levels=="Level 4")
           if(level4.length!==0){
             console.log(level4);
             document.querySelector(".ohlistBull4").style.display='block'
       
             ohListLevels4(level4)
           
           }else{
             document.querySelector(".ohlistBull4").style.display='none'
           }
   
  }
   const Perfomance = response.filter((d) => d.info.areas=="Performance Management");
 
 if (Perfomance.length>0) {
     document.querySelector(".flush-heading16").style.display="block"
     const level1 = Perfomance.filter((d)=>d.info.levels=="Level 1")
        
               if(level1.length >0){
                 console.log(level1);
                 peListLevels1(level1)
                 document.querySelector(".pelistBull1").style.display='block'
               }else{
                 document.querySelector(".pelistBull1").style.display='none'
               }
             const level2 = Perfomance.filter((d)=>d.info.levels=="Level 2")
             if(level2.length>0){
               document.querySelector(".pelistBull2").style.display='block'
               console.log(level2);
               peListLevels2(level2)
             
             }else{
               document.querySelector(".pelistBull2").style.display='none'
             }
             const level3 = Perfomance.filter((d)=>d.info.levels=="Level 3")
             if(level3.length!==0){
               document.querySelector(".pelistBull3").style.display='block'
               peListLevels3(level3)
           
             }else{
               document.querySelector(".pelistBull3").style.display='none'
             }
             const level4 = Perfomance.filter((d)=>d.info.levels=="Level 4")
             if(level4.length!==0){
               console.log(level4);
               document.querySelector(".pelistBull4").style.display='block'
         
               peListLevels4(level4)
             
             }else{
               document.querySelector(".pelistBull4").style.display='none'
             }
     
    }
 const  Industrial = response.filter((d) => d.info.areas=="Industrial and Labour Relations");
 
   if (Industrial.length>0) {
     document.querySelector(".flush-heading17").style.display="block"
     const level1 = Industrial.filter((d)=>d.info.levels=="Level 1")
        
               if(level1.length >0){
                 console.log(level1);
                 inListLevels1(level1)
                 document.querySelector(".inlistBull1").style.display='block'
               }else{
                 document.querySelector(".inlistBull1").style.display='none'
               }
             const level2 = Industrial.filter((d)=>d.info.levels=="Level 2")
             if(level2.length>0){
               document.querySelector(".inlistBull2").style.display='block'
               console.log(level2);
               inListLevels2(level2)
             
             }else{
               document.querySelector(".inlistBull2").style.display='none'
             }
             const level3 = Industrial.filter((d)=>d.info.levels=="Level 3")
             if(level3.length!==0){
               document.querySelector(".inlistBull3").style.display='block'
               inListLevels3(level3)
           
             }else{
               document.querySelector(".inlistBull3").style.display='none'
             }
             const level4 = Industrial.filter((d)=>d.info.levels=="Level 4")
             if(level4.length!==0){
               console.log(level4);
               document.querySelector(".inlistBull4").style.display='block'
         
               inListLevels4(level4)
             
             }else{
               document.querySelector(".inlistBull4").style.display='none'
             }
     
    }
 const  Interpersonal = response.filter((d) => d.info.areas=="Interpersonal Relationships");
 
 if (Interpersonal.length>0) {
     document.querySelector(".flush-heading18").style.display="block"
     const level1 = Interpersonal.filter((d)=>d.info.levels=="Level 1")
        
               if(level1.length >0){
                 console.log(level1);
                 intListLevels1(level1)
                 document.querySelector(".intlistBull1").style.display='block'
               }else{
                 document.querySelector(".intlistBull1").style.display='none'
               }
             const level2 = Interpersonal.filter((d)=>d.info.levels=="Level 2")
             if(level2.length>0){
               document.querySelector(".intlistBull2").style.display='block'
               console.log(level2);
               intListLevels2(level2)
             
             }else{
               document.querySelector(".intlistBull2").style.display='none'
             }
             const level3 = Interpersonal.filter((d)=>d.info.levels=="Level 3")
             if(level3.length!==0){
               document.querySelector(".intlistBull3").style.display='block'
               intListLevels3(level3)
           
             }else{
               document.querySelector(".intlistBull3").style.display='none'
             }
             const level4 = Interpersonal.filter((d)=>d.info.levels=="Level 4")
             if(level4.length!==0){
               console.log(level4);
               document.querySelector(".intlistBull4").style.display='block'
         
               intListLevels4(level4)
             
             }else{
               document.querySelector(".intlistBull4").style.display='none'
             }
     
    }
 
 const  Communication = response.filter((d) => d.info.areas=="Communication");
 if (Communication.length>0) {
   document.querySelector(".flush-heading19").style.display="block"
   const level1 = Communication.filter((d)=>d.info.levels=="Level 1")
      
             if(level1.length >0){
               console.log(level1);
               comListLevels1(level1)
               document.querySelector(".comlistBull1").style.display='block'
             }else{
               document.querySelector(".comlistBull1").style.display='none'
             }
           const level2 = Communication.filter((d)=>d.info.levels=="Level 2")
           if(level2.length>0){
             document.querySelector(".comlistBull2").style.display='block'
             console.log(level2);
             comListLevels2(level2)
           
           }else{
             document.querySelector(".comlistBull2").style.display='none'
           }
           const level3 = Communication.filter((d)=>d.info.levels=="Level 3")
           if(level3.length!==0){
             document.querySelector(".comlistBull3").style.display='block'
             comListLevels3(level3)
         
           }else{
             document.querySelector(".comlistBull3").style.display='none'
           }
           const level4 = Communication.filter((d)=>d.info.levels=="Level 4")
           if(level4.length!==0){
             console.log(level4);
             document.querySelector(".comlistBull4").style.display='block'
       
             comListLevels4(level4)
           
           }else{
             document.querySelector(".comlistBull4").style.display='none'
           }
   
  }
   const Delivery = response.filter((d) => d.info.areas=="Service Delivery orientation");
   if (Delivery.length>0) {
     document.querySelector(".flush-heading20").style.display="block"
     const level1 = Delivery.filter((d)=>d.info.levels=="Level 1")
        
               if(level1.length >0){
                 console.log(level1);
                 sdoListLevels1(level1)
                 document.querySelector(".sdolistBull1").style.display='block'
               }else{
                 document.querySelector(".sdolistBull1").style.display='none'
               }
             const level2 = Delivery.filter((d)=>d.info.levels=="Level 2")
             if(level2.length>0){
               document.querySelector(".sdolistBull2").style.display='block'
               console.log(level2);
               sdoListLevels2(level2)
             
             }else{
               document.querySelector(".sdolistBull2").style.display='none'
             }
             const level3 = Delivery.filter((d)=>d.info.levels=="Level 3")
             if(level3.length!==0){
               document.querySelector(".sdolistBull3").style.display='block'
               sdoListLevels3(level3)
           
             }else{
               document.querySelector(".sdolistBull3").style.display='none'
             }
             const level4 = Delivery.filter((d)=>d.info.levels=="Level 4")
             if(level4.length!==0){
               console.log(level4);
               document.querySelector(".sdolistBull4").style.display='block'
         
               sdoListLevels4(level4)
             
             }else{
               document.querySelector(".sdolistBull4").style.display='none'
             }
     
    }
   const  Action = response.filter((d) => d.info.areas=="Action and Outcome Orientation");
   if (Action.length>0) {
     document.querySelector(".flush-heading21").style.display="block"
     const level1 = Action.filter((d)=>d.info.levels=="Level 1")
        
               if(level1.length >0){
                 console.log(level1);
                 actListLevels1(level1)
                 document.querySelector(".actlistBull1").style.display='block'
               }else{
                 document.querySelector(".actlistBull1").style.display='none'
               }
             const level2 = Action.filter((d)=>d.info.levels=="Level 2")
             if(level2.length>0){
               document.querySelector(".actlistBull2").style.display='block'
               console.log(level2);
               actListLevels2(level2)
             
             }else{
               document.querySelector(".actlistBull2").style.display='none'
             }
             const level3 = Action.filter((d)=>d.info.levels=="Level 3")
             if(level3.length!==0){
               document.querySelector(".actlistBull3").style.display='block'
               actListLevels3(level3)
           
             }else{
               document.querySelector(".actlistBull3").style.display='none'
             }
             const level4 = Action.filter((d)=>d.info.levels=="Level 4")
             if(level4.length!==0){
               console.log(level4);
               document.querySelector(".actlistBull4").style.display='block'
         
               actListLevels4(level4)
             
             }else{
               document.querySelector(".actlistBull4").style.display='none'
             }
     
    }
 const  Conflict = response.filter((d) => d.info.areas=="Conflict Management");
 if (Conflict.length>0) {
   document.querySelector(".flush-heading22").style.display="block"
   const level1 = Conflict.filter((d)=>d.info.levels=="Level 1")
      
             if(level1.length >0){
               console.log(level1);
               conListLevels1(level1)
               document.querySelector(".conlistBull1").style.display='block'
             }else{
               document.querySelector(".conlistBull1").style.display='none'
             }
           const level2 = Conflict.filter((d)=>d.info.levels=="Level 2")
           if(level2.length>0){
             document.querySelector(".conlistBull2").style.display='block'
             console.log(level2);
             conListLevels2(level2)
           
           }else{
             document.querySelector(".conlistBull2").style.display='none'
           }
           const level3 = Conflict.filter((d)=>d.info.levels=="Level 3")
           if(level3.length!==0){
             document.querySelector(".conlistBull3").style.display='block'
             conListLevels3(level3)
         
           }else{
             document.querySelector(".conlistBull3").style.display='none'
           }
           const level4 = Conflict.filter((d)=>d.info.levels=="Level 4")
           if(level4.length!==0){
             console.log(level4);
             document.querySelector(".conlistBull4").style.display='block'
       
             conListLevels4(level4)
           
           }else{
             document.querySelector(".conlistBull4").style.display='none'
           }
   
  }
  const  Orientation = response.filter((d) => d.info.areas=="Learning Orientation");
  if (Orientation.length>0) {
   document.querySelector(".flush-heading23").style.display="block"
   const level1 = Orientation.filter((d)=>d.info.levels=="Level 1")
      
             if(level1.length >0){
               console.log(level1);
               loListLevels1(level1)
               document.querySelector(".lolistBull1").style.display='block'
             }else{
               document.querySelector(".lolistBull1").style.display='none'
             }
           const level2 = Orientation.filter((d)=>d.info.levels=="Level 2")
           if(level2.length>0){
             document.querySelector(".lolistBull2").style.display='block'
             console.log(level2);
             loListLevels2(level2)
           
           }else{
             document.querySelector(".lolistBull2").style.display='none'
           }
           const level3 = Orientation.filter((d)=>d.info.levels=="Level 3")
           if(level3.length!==0){
             document.querySelector(".lolistBull3").style.display='block'
             loListLevels3(level3)
         
           }else{
             document.querySelector(".lolistBull3").style.display='none'
           }
           const level4 = Orientation.filter((d)=>d.info.levels=="Level 4")
           if(level4.length!==0){
             console.log(level4);
             document.querySelector(".lolistBull4").style.display='block'
       
             loListLevels4(level4)
           
           }else{
             document.querySelector(".lolistBull4").style.display='none'
           }
   
  }
 const  Accountability = response.filter((d) => d.info.areas=="Accountability and Ethical Conduct");
 if (Accountability.length>0) {
   document.querySelector(".flush-heading24").style.display="block"
   const level1 = Accountability.filter((d)=>d.info.levels=="Level 1")
      
             if(level1.length >0){
               console.log(level1);
               aeListLevels1(level1)
               document.querySelector(".aelistBull1").style.display='block'
             }else{
               document.querySelector(".aelistBull1").style.display='none'
             }
           const level2 = Accountability.filter((d)=>d.info.levels=="Level 2")
           if(level2.length>0){
             document.querySelector(".aelistBull2").style.display='block'
             console.log(level2);
             aeListLevels2(level2)
           
           }else{
             document.querySelector(".aelistBull2").style.display='none'
           }
           const level3 = Accountability.filter((d)=>d.info.levels=="Level 3")
           if(level3.length!==0){
             document.querySelector(".aelistBull3").style.display='block'
             aeListLevels3(level3)
         
           }else{
             document.querySelector(".aelistBull3").style.display='none'
           }
           const level4 = Accountability.filter((d)=>d.info.levels=="Level 4")
           if(level4.length!==0){
             console.log(level4);
             document.querySelector(".aelistBull4").style.display='block'
       
             aeListLevels4(level4)
           
           }else{
             document.querySelector(".aelistBull4").style.display='none'
           }
   
  }
  const   Problem = response.filter((d) => d.info.areas=="Problem Solving and Analysis");
  if (Problem.length>0) {
   document.querySelector(".flush-heading25").style.display="block"
   const level1 = Problem.filter((d)=>d.info.levels=="Level 1")
      
             if(level1.length >0){
               console.log(level1);
               psListLevels1(level1)
               document.querySelector(".pslistBull1").style.display='block'
             }else{
               document.querySelector(".pslistBull1").style.display='none'
             }
           const level2 = Problem.filter((d)=>d.info.levels=="Level 2")
           if(level2.length>0){
             document.querySelector(".pslistBull2").style.display='block'
             console.log(level2);
             psListLevels2(level2)
           
           }else{
             document.querySelector(".pslistBull2").style.display='none'
           }
           const level3 = Problem.filter((d)=>d.info.levels=="Level 3")
           if(level3.length!==0){
             document.querySelector(".pslistBull3").style.display='block'
             psListLevels3(level3)
         
           }else{
             document.querySelector(".pslistBull3").style.display='none'
           }
           const level4 = Problem.filter((d)=>d.info.levels=="Level 4")
           if(level4.length!==0){
             console.log(level4);
             document.querySelector(".pslistBull4").style.display='block'
       
             psListLevels4(level4)
           
           }else{
             document.querySelector(".pslistBull4").style.display='none'
           }
   
  }
 
  const   Compensation = response.filter((d) => d.info.areas=="Compensation and Benefits Management");
  if (Compensation.length>0) {
   document.querySelector(".flush-heading26").style.display="block"
   const level1 = Compensation.filter((d)=>d.info.levels=="Level 1")
      
             if(level1.length >0){
               console.log(level1);
               cbListLevels1(level1)
               document.querySelector(".cblistBull1").style.display='block'
             }else{
               document.querySelector(".cblistBull1").style.display='none'
             }
           const level2 = Compensation.filter((d)=>d.info.levels=="Level 2")
           if(level2.length>0){
             document.querySelector(".cblistBull2").style.display='block'
             console.log(level2);
             cbListLevels2(level2)
           
           }else{
             document.querySelector(".cblistBull2").style.display='none'
           }
           const level3 = Compensation.filter((d)=>d.info.levels=="Level 3")
           if(level3.length!==0){
             document.querySelector(".cblistBull3").style.display='block'
             cbListLevels3(level3)
         
           }else{
             document.querySelector(".cblistBull3").style.display='none'
           }
           const level4 = Compensation.filter((d)=>d.info.levels=="Level 4")
           if(level4.length!==0){
             console.log(level4);
             document.querySelector(".cblistBull4").style.display='block'
       
             cbListLevels4(level4)
           
           }else{
             document.querySelector(".cblistBull4").style.display='none'
           }
   
  }
 
  const   EmployeeWellness = response.filter((d) => d.info.areas=="Employee Wellness");
  if (EmployeeWellness.length>0) {
   document.querySelector(".flush-heading27").style.display="block"
   const level1 = EmployeeWellness.filter((d)=>d.info.levels=="Level 1")
      
             if(level1.length >0){
               console.log(level1);
               ewListLevels1(level1)
               document.querySelector(".ewlistBull1").style.display='block'
             }else{
               document.querySelector(".ewlistBull1").style.display='none'
             }
           const level2 = EmployeeWellness.filter((d)=>d.info.levels=="Level 2")
           if(level2.length>0){
             document.querySelector(".ewlistBull2").style.display='block'
             console.log(level2);
             ewListLevels2(level2)
           
           }else{
             document.querySelector(".ewlistBull2").style.display='none'
           }
           const level3 = EmployeeWellness.filter((d)=>d.info.levels=="Level 3")
           if(level3.length!==0){
             document.querySelector(".ewlistBull3").style.display='block'
             ewListLevels3(level3)
         
           }else{
             document.querySelector(".ewlistBull3").style.display='none'
           }
           const level4 = EmployeeWellness.filter((d)=>d.info.levels=="Level 4")
           if(level4.length!==0){
             console.log(level4);
             document.querySelector(".ewlistBull4").style.display='block'
       
             ewListLevels4(level4)
           
           }else{
             document.querySelector(".ewlistBull4").style.display='none'
           }
   
  }
 
  const   Resilience = response.filter((d) => d.info.areas=="Resilience");
  if (Resilience.length>0) {
   document.querySelector(".flush-heading28").style.display="block"
   const level1 = Resilience.filter((d)=>d.info.levels=="Level 1")
      
             if(level1.length >0){
               console.log(level1);
               rsListLevels1(level1)
               document.querySelector(".rslistBull1").style.display='block'
             }else{
               document.querySelector(".rslistBull1").style.display='none'
             }
           const level2 = Resilience.filter((d)=>d.info.levels=="Level 2")
           if(level2.length>0){
             document.querySelector(".rslistBull2").style.display='block'
             console.log(level2);
             rsListLevels2(level2)
           
           }else{
             document.querySelector(".rslistBull2").style.display='none'
           }
           const level3 = Resilience.filter((d)=>d.info.levels=="Level 3")
           if(level3.length!==0){
             document.querySelector(".rslistBull3").style.display='block'
             rsListLevels3(level3)
         
           }else{
             document.querySelector(".rslistBull3").style.display='none'
           }
           const level4 = Resilience.filter((d)=>d.info.levels=="Level 4")
           if(level4.length!==0){
             console.log(level4);
             document.querySelector(".rslistBull4").style.display='block'
       
             rsListLevels4(level4)
           
           }else{
             document.querySelector(".rslistBull4").style.display='none'
           }
   
  }
 
  const   DirectionSetting = response.filter((d) => d.info.areas=="Direction Setting");
  if (DirectionSetting.length>0) {
   document.querySelector(".flush-heading29").style.display="block"
   const level1 = DirectionSetting.filter((d)=>d.info.levels=="Level 1")
      
             if(level1.length >0){
               console.log(level1);
               drListLevels1(level1)
               document.querySelector(".drlistBull1").style.display='block'
             }else{
               document.querySelector(".drlistBull1").style.display='none'
             }
           const level2 = DirectionSetting.filter((d)=>d.info.levels=="Level 2")
           if(level2.length>0){
             document.querySelector(".drlistBull2").style.display='block'
             console.log(level2);
             drListLevels2(level2)
           
           }else{
             document.querySelector(".drlistBull2").style.display='none'
           }
           const level3 = DirectionSetting.filter((d)=>d.info.levels=="Level 3")
           if(level3.length!==0){
             document.querySelector(".drlistBull3").style.display='block'
             drListLevels3(level3)
         
           }else{
             document.querySelector(".drlistBull3").style.display='none'
           }
           const level4 = DirectionSetting.filter((d)=>d.info.levels=="Level 4")
           if(level4.length!==0){
             console.log(level4);
             document.querySelector(".drlistBull4").style.display='block'
       
             drListLevels4(level4)
           
           }else{
             document.querySelector(".drlistBull4").style.display='none'
           }
   
  }
 
  const   ImpactandInfluence = response.filter((d) => d.info.areas=="Impact and Influence");
  if (ImpactandInfluence.length>0) {
   document.querySelector(".flush-heading30").style.display="block"
   const level1 = ImpactandInfluence.filter((d)=>d.info.levels=="Level 1")
      
             if(level1.length >0){
               console.log(level1);
               iiListLevels1(level1)
               document.querySelector(".iilistBull1").style.display='block'
             }else{
               document.querySelector(".iilistBull1").style.display='none'
             }
           const level2 = ImpactandInfluence.filter((d)=>d.info.levels=="Level 2")
           if(level2.length>0){
             document.querySelector(".iilistBull2").style.display='block'
             console.log(level2);
             iiListLevels2(level2)
           
           }else{
             document.querySelector(".iilistBull2").style.display='none'
           }
           const level3 = ImpactandInfluence.filter((d)=>d.info.levels=="Level 3")
           if(level3.length!==0){
             document.querySelector(".iilistBull3").style.display='block'
             iiListLevels3(level3)
         
           }else{
             document.querySelector(".iilistBull3").style.display='none'
           }
           const level4 = ImpactandInfluence.filter((d)=>d.info.levels=="Level 4")
           if(level4.length!==0){
             console.log(level4);
             document.querySelector(".iilistBull4").style.display='block'
       
             iiListLevels4(level4)
           
           }else{
             document.querySelector(".iilistBull4").style.display='none'
           }
   
  }
 
  const   CoachingandMentoring = response.filter((d) => d.info.areas=="Coaching and Mentoring");
  if (CoachingandMentoring.length>0) {
   document.querySelector(".flush-heading31").style.display="block"
   const level1 = CoachingandMentoring.filter((d)=>d.info.levels=="Level 1")
      
             if(level1.length >0){
               console.log(level1);
               menListLevels1(level1)
               document.querySelector(".menlistBull1").style.display='block'
             }else{
               document.querySelector(".menlistBull1").style.display='none'
             }
           const level2 = CoachingandMentoring.filter((d)=>d.info.levels=="Level 2")
           if(level2.length>0){
             document.querySelector(".menlistBull2").style.display='block'
             console.log(level2);
             menListLevels2(level2)
           
           }else{
             document.querySelector(".menlistBull2").style.display='none'
           }
           const level3 = CoachingandMentoring.filter((d)=>d.info.levels=="Level 3")
           if(level3.length!==0){
             document.querySelector(".menlistBull3").style.display='block'
             menListLevels3(level3)
         
           }else{
             document.querySelector(".menlistBull3").style.display='none'
           }
           const level4 = CoachingandMentoring.filter((d)=>d.info.levels=="Level 4")
           if(level4.length!==0){
             console.log(level4);
             document.querySelector(".menlistBull4").style.display='block'
       
             menListLevels4(level4)
           
           }else{
             document.querySelector(".menlistBull4").style.display='none'
           }
   
  }
 
  const   TeamOrientation= response.filter((d) => d.info.areas=="Team Orientation");
  if (TeamOrientation.length>0) {
   document.querySelector(".flush-heading32").style.display="block"
   const level1 = TeamOrientation.filter((d)=>d.info.levels=="Level 1")
      
             if(level1.length >0){
               console.log(level1);
               toListLevels1(level1)
               document.querySelector(".tolistBull1").style.display='block'
             }else{
               document.querySelector(".tolistBull1").style.display='none'
             }
           const level2 = TeamOrientation.filter((d)=>d.info.levels=="Level 2")
           if(level2.length>0){
             document.querySelector(".tolistBull2").style.display='block'
             console.log(level2);
             toListLevels2(level2)
           
           }else{
             document.querySelector(".tolistBull2").style.display='none'
           }
           const level3 = TeamOrientation.filter((d)=>d.info.levels=="Level 3")
           if(level3.length!==0){
             document.querySelector(".tolistBull3").style.display='block'
             toListLevels3(level3)
         
           }else{
             document.querySelector(".tolistBull3").style.display='none'
           }
           const level4 = TeamOrientation.filter((d)=>d.info.levels=="Level 4")
           if(level4.length!==0){
             console.log(level4);
             document.querySelector(".tolistBull4").style.display='block'
       
             toListLevels4(level4)
           
           }else{
             document.querySelector(".tolistBull4").style.display='none'
           }
   
  }

  const   InternalAuditing  = response.filter((d) => d.info.areas=="Internal Auditing");
  if (InternalAuditing.length>0) {
   document.querySelector(".flush-heading33").style.display="block"
   const level1 = InternalAuditing.filter((d)=>d.info.levels=="Level 1")
      
             if(level1.length >0){
               console.log(level1);
               ioListLevels1(level1)
               document.querySelector(".iolistBull1").style.display='block'
             }else{
               document.querySelector(".iolistBull1").style.display='none'
             }
           const level2 = InternalAuditing.filter((d)=>d.info.levels=="Level 2")
           if(level2.length>0){
             document.querySelector(".iolistBull2").style.display='block'
             console.log(level2);
             ioListLevels2(level2)
           
           }else{
             document.querySelector(".iolistBull2").style.display='none'
           }
           const level3 = InternalAuditing.filter((d)=>d.info.levels=="Level 3")
           if(level3.length!==0){
             document.querySelector(".iolistBull3").style.display='block'
             ioListLevels3(level3)
         
           }else{
             document.querySelector(".iolistBull3").style.display='none'
           }
           const level4 = InternalAuditing.filter((d)=>d.info.levels=="Level 4")
           if(level4.length!==0){
             console.log(level4);
             document.querySelector(".iolistBull4").style.display='block'
       
             ioListLevels4(level4)
           
           }else{
             document.querySelector(".iolistBull4").style.display='none'
           }
   
  }

  const   EngagementManagement  = response.filter((d) => d.info.areas=="Engagement Management");
  if (EngagementManagement.length>0) {
   document.querySelector(".flush-heading34").style.display="block"
   const level1 = EngagementManagement.filter((d)=>d.info.levels=="Level 1")
      
             if(level1.length >0){
               console.log(level1);
               emListLevels1(level1)
               document.querySelector(".emlistBull1").style.display='block'
             }else{
               document.querySelector(".emlistBull1").style.display='none'
             }
           const level2 = EngagementManagement.filter((d)=>d.info.levels=="Level 2")
           if(level2.length>0){
             document.querySelector(".emlistBull2").style.display='block'
             console.log(level2);
             emListLevels2(level2)
           
           }else{
             document.querySelector(".emlistBull2").style.display='none'
           }
           const level3 = EngagementManagement.filter((d)=>d.info.levels=="Level 3")
           if(level3.length!==0){
             document.querySelector(".emlistBull3").style.display='block'
             emListLevels3(level3)
         
           }else{
             document.querySelector(".emlistBull3").style.display='none'
           }
           const level4 = EngagementManagement.filter((d)=>d.info.levels=="Level 4")
           if(level4.length!==0){
             console.log(level4);
             document.querySelector(".emlistBull4").style.display='block'
       
             emListLevels4(level4)
           
           }else{
             document.querySelector(".emlistBull4").style.display='none'
           }
   
  }
  
  const   InformationManagement  = response.filter((d) => d.info.areas=="Information Management");
  if (InformationManagement.length>0) {
   document.querySelector(".flush-heading35").style.display="block"
   const level1 = InformationManagement.filter((d)=>d.info.levels=="Level 1")
      
             if(level1.length >0){
               console.log(level1);
               imListLevels1(level1)
               document.querySelector(".imlistBull1").style.display='block'
             }else{
               document.querySelector(".imlistBull1").style.display='none'
             }
           const level2 = InformationManagement.filter((d)=>d.info.levels=="Level 2")
           if(level2.length>0){
             document.querySelector(".imlistBull2").style.display='block'
             console.log(level2);
             imListLevels2(level2)
           
           }else{
             document.querySelector(".imlistBull2").style.display='none'
           }
           const level3 = InformationManagement.filter((d)=>d.info.levels=="Level 3")
           if(level3.length!==0){
             document.querySelector(".imlistBull3").style.display='block'
             imListLevels3(level3)
         
           }else{
             document.querySelector(".imlistBull3").style.display='none'
           }
           const level4 = InformationManagement.filter((d)=>d.info.levels=="Level 4")
           if(level4.length!==0){
             console.log(level4);
             document.querySelector(".imlistBull4").style.display='block'
       
             imListLevels4(level4)
           
           }else{
             document.querySelector(".imlistBull4").style.display='none'
           }
   
  }
  const   ResearchandAnalysis  = response.filter((d) => d.info.areas=="Research and Analysis");
  if (ResearchandAnalysis.length>0) {
   document.querySelector(".flush-heading36").style.display="block"
   const level1 = ResearchandAnalysis.filter((d)=>d.info.levels=="Level 1")
      
             if(level1.length >0){
               console.log(level1);
               raListLevels1(level1)
               document.querySelector(".ralistBull1").style.display='block'
             }else{
               document.querySelector(".ralistBull1").style.display='none'
             }
           const level2 = ResearchandAnalysis.filter((d)=>d.info.levels=="Level 2")
           if(level2.length>0){
             document.querySelector(".ralistBull2").style.display='block'
             console.log(level2);
             raListLevels2(level2)
           
           }else{
             document.querySelector(".ralistBull2").style.display='none'
           }
           const level3 = ResearchandAnalysis.filter((d)=>d.info.levels=="Level 3")
           if(level3.length!==0){
             document.querySelector(".ralistBull3").style.display='block'
             raListLevels3(level3)
         
           }else{
             document.querySelector(".ralistBull3").style.display='none'
           }
           const level4 = ResearchandAnalysis.filter((d)=>d.info.levels=="Level 4")
           if(level4.length!==0){
             console.log(level4);
             document.querySelector(".ralistBull4").style.display='block'
       
             raListLevels4(level4)
           
           }else{
             document.querySelector(".ralistBull4").style.display='none'
           }
   
  }

  const   AdvocacyNegotiation  = response.filter((d) => d.info.areas=="Advocacy / Negotiation");
  if (AdvocacyNegotiation.length>0) {
   document.querySelector(".flush-heading37").style.display="block"
   const level1 = AdvocacyNegotiation.filter((d)=>d.info.levels=="Level 1")
      
             if(level1.length >0){
               console.log(level1);
               anListLevels1(level1)
               document.querySelector(".anlistBull1").style.display='block'
             }else{
               document.querySelector(".anlistBull1").style.display='none'
             }
           const level2 = AdvocacyNegotiation.filter((d)=>d.info.levels=="Level 2")
           if(level2.length>0){
             document.querySelector(".anlistBull2").style.display='block'
             console.log(level2);
             anListLevels2(level2)
           
           }else{
             document.querySelector(".anlistBull2").style.display='none'
           }
           const level3 = AdvocacyNegotiation.filter((d)=>d.info.levels=="Level 3")
           if(level3.length!==0){
             document.querySelector(".anlistBull3").style.display='block'
             anListLevels3(level3)
         
           }else{
             document.querySelector(".anlistBull3").style.display='none'
           }
           const level4 = AdvocacyNegotiation.filter((d)=>d.info.levels=="Level 4")
           if(level4.length!==0){
             console.log(level4);
             document.querySelector(".anlistBull4").style.display='block'
       
             anListLevels4(level4)
           
           }else{
             document.querySelector(".anlistBull4").style.display='none'
           }
   
  }

  const   EthicsandProfessionalism  = response.filter((d) => d.info.areas=="Ethics and Professionalism");
  if (EthicsandProfessionalism.length>0) {
   document.querySelector(".flush-heading38").style.display="block"
   const level1 = EthicsandProfessionalism.filter((d)=>d.info.levels=="Level 1")
      
             if(level1.length >0){
               console.log(level1);
               epListLevels1(level1)
               document.querySelector(".eplistBull1").style.display='block'
             }else{
               document.querySelector(".eplistBull1").style.display='none'
             }
           const level2 = EthicsandProfessionalism.filter((d)=>d.info.levels=="Level 2")
           if(level2.length>0){
             document.querySelector(".eplistBull2").style.display='block'
             console.log(level2);
             epListLevels2(level2)
           
           }else{
             document.querySelector(".eplistBull2").style.display='none'
           }
           const level3 = EthicsandProfessionalism.filter((d)=>d.info.levels=="Level 3")
           if(level3.length!==0){
             document.querySelector(".eplistBull3").style.display='block'
             epListLevels3(level3)
         
           }else{
             document.querySelector(".eplistBull3").style.display='none'
           }
           const level4 = EthicsandProfessionalism.filter((d)=>d.info.levels=="Level 4")
           if(level4.length!==0){
             console.log(level4);
             document.querySelector(".eplistBull4").style.display='block'
       
             epListLevels4(level4)
           
           }else{
             document.querySelector(".eplistBull4").style.display='none'
           }
   
  }
  const   StrategicCapability  = response.filter((d) => d.info.areas=="Strategic Capability / Leadership or Direction Setting");
  if (StrategicCapability.length>0) {
   document.querySelector(".flush-heading39").style.display="block"
   const level1 = StrategicCapability.filter((d)=>d.info.levels=="Level 1")
      
             if(level1.length >0){
               console.log(level1);
               scListLevels1(level1)
               document.querySelector(".sclistBull1").style.display='block'
             }else{
               document.querySelector(".sclistBull1").style.display='none'
             }
           const level2 = StrategicCapability.filter((d)=>d.info.levels=="Level 2")
           if(level2.length>0){
             document.querySelector(".sclistBull2").style.display='block'
             console.log(level2);
             scListLevels2(level2)
           
           }else{
             document.querySelector(".sclistBull2").style.display='none'
           }
           const level3 = StrategicCapability.filter((d)=>d.info.levels=="Level 3")
           if(level3.length!==0){
             document.querySelector(".sclistBull3").style.display='block'
             scListLevels3(level3)
         
           }else{
             document.querySelector(".sclistBull3").style.display='none'
           }
           const level4 = StrategicCapability.filter((d)=>d.info.levels=="Level 4")
           if(level4.length!==0){
             console.log(level4);
             document.querySelector(".sclistBull4").style.display='block'
       
             scListLevels4(level4)
           
           }else{
             document.querySelector(".sclistBull4").style.display='none'
           }
   
  }

  const   ChangeReadiness  = response.filter((d) => d.info.areas=="Change Readiness");
  if (ChangeReadiness.length>0) {
   document.querySelector(".flush-heading40").style.display="block"
   const level1 = ChangeReadiness.filter((d)=>d.info.levels=="Level 1")
      
             if(level1.length >0){
               console.log(level1);
               crListLevels1(level1)
               document.querySelector(".crlistBull1").style.display='block'
             }else{
               document.querySelector(".crlistBull1").style.display='none'
             }
           const level2 = ChangeReadiness.filter((d)=>d.info.levels=="Level 2")
           if(level2.length>0){
             document.querySelector(".crlistBull2").style.display='block'
             console.log(level2);
             crListLevels2(level2)
           
           }else{
             document.querySelector(".crlistBull2").style.display='none'
           }
           const level3 = ChangeReadiness.filter((d)=>d.info.levels=="Level 3")
           if(level3.length!==0){
             document.querySelector(".crlistBull3").style.display='block'
             crListLevels3(level3)
         
           }else{
             document.querySelector(".crlistBull3").style.display='none'
           }
           const level4 = ChangeReadiness.filter((d)=>d.info.levels=="Level 4")
           if(level4.length!==0){
             console.log(level4);
             document.querySelector(".crlistBull4").style.display='block'
       
             crListLevels4(level4)
           
           }else{
             document.querySelector(".crlistBull4").style.display='none'
           }
   
  }

  const   CognitiveAbility  = response.filter((d) => d.info.areas=="Cognitive Ability");
  if (CognitiveAbility.length>0) {
   document.querySelector(".flush-heading41").style.display="block"
   const level1 = CognitiveAbility.filter((d)=>d.info.levels=="Level 1")
      
             if(level1.length >0){
               console.log(level1);
               caListLevels1(level1)
               document.querySelector(".calistBull1").style.display='block'
             }else{
               document.querySelector(".calistBull1").style.display='none'
             }
           const level2 = CognitiveAbility.filter((d)=>d.info.levels=="Level 2")
           if(level2.length>0){
             document.querySelector(".calistBull2").style.display='block'
             console.log(level2);
             caListLevels2(level2)
           
           }else{
             document.querySelector(".calistBull2").style.display='none'
           }
           const level3 = CognitiveAbility.filter((d)=>d.info.levels=="Level 3")
           if(level3.length!==0){
             document.querySelector(".calistBull3").style.display='block'
             caListLevels3(level3)
         
           }else{
             document.querySelector(".calistBull3").style.display='none'
           }
           const level4 = CognitiveAbility.filter((d)=>d.info.levels=="Level 4")
           if(level4.length!==0){
             console.log(level4);
             document.querySelector(".calistBull4").style.display='block'
       
             caListLevels4(level4)
           
           }else{
             document.querySelector(".calistBull4").style.display='none'
           }
   
  }

  const   CustomerOrientation  = response.filter((d) => d.info.areas=="Customer Orientation and Customer Focus");
  if (CustomerOrientation.length>0) {
   document.querySelector(".flush-heading42").style.display="block"
   const level1 = CustomerOrientation.filter((d)=>d.info.levels=="Level 1")
      
             if(level1.length >0){
               console.log(level1);
               ccListLevels1(level1)
               document.querySelector(".cclistBull1").style.display='block'
             }else{
               document.querySelector(".cclistBull1").style.display='none'
             }
           const level2 = CustomerOrientation.filter((d)=>d.info.levels=="Level 2")
           if(level2.length>0){
             document.querySelector(".cclistBull2").style.display='block'
             console.log(level2);
             ccListLevels2(level2)
           
           }else{
             document.querySelector(".cclistBull2").style.display='none'
           }
           const level3 = CustomerOrientation.filter((d)=>d.info.levels=="Level 3")
           if(level3.length!==0){
             document.querySelector(".cclistBull3").style.display='block'
             ccListLevels3(level3)
         
           }else{
             document.querySelector(".cclistBull3").style.display='none'
           }
           const level4 = CustomerOrientation.filter((d)=>d.info.levels=="Level 4")
           if(level4.length!==0){
             console.log(level4);
             document.querySelector(".cclistBull4").style.display='block'
       
             ccListLevels4(level4)
           
           }else{
             document.querySelector(".cclistBull4").style.display='none'
           }
   
  }
//   // let option =""
//   // let html =""
//   // let list = document.querySelector(".listdata124")
 
//   // result.forEach(department => {
//   //     option=` <li>${department.details}</li>`;
//   //     html +=option;
//   //     list.innerHTML=html;
     
      
//   // });


}

function PublicManagement(response) {
  
  console.log(response);
 
  const  written = response.filter((d) => d.info.areas=="Written Communication");
  if (written.length>0) {
   document.querySelector(".flush-heading0").style.display="block"
   const level1 = written.filter((d)=>d.info.levels=="Level 1")
       
   if(level1.length >0){
     console.log(level1);
     ListLevels1(level1)
   
     document.querySelector(".listBull1").style.display='block'
   }else{
     document.querySelector(".listBull1").style.display='none'
   }
  const level2 = written.filter((d)=>d.info.levels=="Level 2")
  if(level2.length!==0){
   document.querySelector(".listBull2").style.display='block'
   ListLevels2(level2)
  
  }else{
   document.querySelector(".listBull2").style.display='none'
  }
  const level3 = written.filter((d)=>d.levels=="Level 3")
  if(level3.length!==0){
   document.querySelector(".listBull3").style.display='block'
   ListLevels3(level3)
  
  }else{
   document.querySelector(".listBull3").style.display='none'
  }
  const level4 = written.filter((d)=>d.levels=="Level 4")
  if(level4.length!==0){
   document.querySelector(".listBull4").style.display='block'
  
   ListLevels4(level4)
  
  }else{
   document.querySelector(".listBull4").style.display='none'
  }
  }
 
  const Organisational = response.filter((d) => d.info.areas=="Organisational Awareness");
  if (Organisational.length>0) {
   document.querySelector(".flush-heading1").style.display="block"
   const level1 = Organisational.filter((d)=>d.info.levels=="Level 1")
      
             if(level1.length >0){
               console.log(level1);
               oListLevels1(level1)
               document.querySelector(".olistBull1").style.display='block'
             }else{
               document.querySelector(".olistBull1").style.display='none'
             }
           const level2 = Organisational.filter((d)=>d.info.levels=="Level 2")
           if(level2.length>0){
             document.querySelector(".olistBull2").style.display='block'
             console.log(level2);
             oListLevels2(level2)
           
           }else{
             document.querySelector(".olistBull2").style.display='none'
           }
           const level3 = Organisational.filter((d)=>d.info.levels=="Level 3")
           if(level3.length!==0){
             document.querySelector(".olistBull3").style.display='block'
             oListLevels3(level3)
         
           }else{
             document.querySelector(".olistBull3").style.display='none'
           }
           const level4 = Organisational.filter((d)=>d.info.levels=="Level 4")
           if(level4.length!==0){
             console.log(level4);
             document.querySelector(".olistBull4").style.display='block'
       
             oListLevels4(level4)
           
           }else{
             document.querySelector(".olistBull4").style.display='none'
           }
   
  }
  
  const  Plannning = response.filter((d) => d.info.areas=="Planning and Organising");
  if (Plannning.length>0) {
   document.querySelector(".flush-heading2").style.display="block"
 
     const level1 = Plannning.filter((d)=>d.info.levels=="Level 1")
        
               if(level1.length >0){
                 console.log(level1);
                 pListLevels1(level1)
                 document.querySelector(".plistBull1").style.display='block'
               }else{
                 document.querySelector(".plistBull1").style.display='none'
               }
             const level2 = Plannning.filter((d)=>d.info.levels=="Level 2")
             if(level2.length>0){
               document.querySelector(".plistBull2").style.display='block'
               console.log(level2);
               pListLevels2(level2)
             
             }else{
               document.querySelector(".plistBull2").style.display='none'
             }
             const level3 = Plannning.filter((d)=>d.info.levels=="Level 3")
             if(level3.length!==0){
               document.querySelector(".plistBull3").style.display='block'
               pListLevels3(level3)
           
             }else{
               document.querySelector(".plistBull3").style.display='none'
             }
             const level4 = Plannning.filter((d)=>d.info.levels=="Level 4")
             if(level4.length!==0){
               console.log(level4);
               document.querySelector(".plistBull4").style.display='block'
         
               pListLevels4(level4)
             
             }else{
               document.querySelector(".plistBull4").style.display='none'
             }
     
    
  }
  const  Monitoring = response.filter((d) => d.info.areas=="Monitoring and Control");
  if (Monitoring.length>0) {
   document.querySelector(".flush-heading3").style.display="block"
   const level1 = Monitoring.filter((d)=>d.info.levels=="Level 1")
        
               if(level1.length >0){
                 console.log(level1);
                 mListLevels1(level1)
                 document.querySelector(".mlistBull1").style.display='block'
               }else{
                 document.querySelector(".mlistBull1").style.display='none'
               }
             const level2 = Monitoring.filter((d)=>d.info.levels=="Level 2")
             if(level2.length>0){
               document.querySelector(".mlistBull2").style.display='block'
               console.log(level2);
               mListLevels2(level2)
             
             }else{
               document.querySelector(".mlistBull2").style.display='none'
             }
             const level3 = Monitoring.filter((d)=>d.info.levels=="Level 3")
             if(level3.length!==0){
               document.querySelector(".mlistBull3").style.display='block'
               mListLevels3(level3)
           
             }else{
               document.querySelector(".mlistBull3").style.display='none'
             }
             const level4 = Monitoring.filter((d)=>d.info.levels=="Level 4")
             if(level4.length!==0){
               console.log(level4);
               document.querySelector(".mlistBull4").style.display='block'
         
               mListLevels4(level4)
             
             }else{
               document.querySelector(".mlistBull4").style.display='none'
             }
     
  }
 
  const  Consulting = response.filter((d) => d.info.areas=="Consulting");
  if (Consulting.length>0) {
   document.querySelector(".flush-heading4").style.display="block"
   const level1 = Consulting.filter((d)=>d.info.levels=="Level 1")
        
               if(level1.length >0){
                 console.log(level1);
                 cListLevels1(level1)
                 document.querySelector(".clistBull1").style.display='block'
               }else{
                 document.querySelector(".clistBull1").style.display='none'
               }
             const level2 = Consulting.filter((d)=>d.info.levels=="Level 2")
             if(level2.length>0){
               document.querySelector(".clistBull2").style.display='block'
               console.log(level2);
               cListLevels2(level2)
             
             }else{
               document.querySelector(".clistBull2").style.display='none'
             }
             const level3 = Consulting.filter((d)=>d.info.levels=="Level 3")
             if(level3.length!==0){
               document.querySelector(".clistBull3").style.display='block'
               cListLevels3(level3)
           
             }else{
               document.querySelector(".clistBull3").style.display='none'
             }
             const level4 = Consulting.filter((d)=>d.info.levels=="Level 4")
             if(level4.length!==0){
               console.log(level4);
               document.querySelector(".clistBull4").style.display='block'
         
               cListLevels4(level4)
             
             }else{
               document.querySelector(".clistBull4").style.display='none'
             }
     
  }
  const  Negotiation = response.filter((d) => d.info.areas=="Negotiation");
  if (Negotiation.length>0) {
   document.querySelector(".flush-heading5").style.display="block"
   const level1 = Negotiation.filter((d)=>d.info.levels=="Level 1")
        
               if(level1.length >0){
                 console.log(level1);
                 nListLevels1(level1)
                 document.querySelector(".nlistBull1").style.display='block'
               }else{
                 document.querySelector(".nlistBull1").style.display='none'
               }
             const level2 = Consulting.filter((d)=>d.info.levels=="Level 2")
             if(level2.length>0){
               document.querySelector(".nlistBull2").style.display='block'
               console.log(level2);
               nListLevels2(level2)
             
             }else{
               document.querySelector(".nlistBull2").style.display='none'
             }
             const level3 = Consulting.filter((d)=>d.info.levels=="Level 3")
             if(level3.length!==0){
               document.querySelector(".nlistBull3").style.display='block'
               nListLevels3(level3)
           
             }else{
               document.querySelector(".nlistBull3").style.display='none'
             }
             const level4 = Consulting.filter((d)=>d.info.levels=="Level 4")
             if(level4.length!==0){
               console.log(level4);
               document.querySelector(".nlistBull4").style.display='block'
         
               nListLevels4(level4)
             
             }else{
               document.querySelector(".nlistBull4").style.display='none'
             }
     
  }
  const  Oral = response.filter((d) => d.info.areas=="Oral Communication");
  if (Oral.length>0) {
   document.querySelector(".flush-heading6").style.display="block"
   const level1 = Negotiation.filter((d)=>d.info.levels=="Level 1")
        
               if(level1.length >0){
                 console.log(level1);
                 orListLevels1(level1)
                 document.querySelector(".orlistBull1").style.display='block'
               }else{
                 document.querySelector(".orlistBull1").style.display='none'
               }
             const level2 = Consulting.filter((d)=>d.info.levels=="Level 2")
             if(level2.length>0){
               document.querySelector(".orlistBull2").style.display='block'
               console.log(level2);
               orListLevels2(level2)
             
             }else{
               document.querySelector(".orlistBull2").style.display='none'
             }
             const level3 = Consulting.filter((d)=>d.info.levels=="Level 3")
             if(level3.length!==0){
               document.querySelector(".orlistBull3").style.display='block'
               orListLevels3(level3)
           
             }else{
               document.querySelector(".orlistBull3").style.display='none'
             }
             const level4 = Consulting.filter((d)=>d.info.levels=="Level 4")
             if(level4.length!==0){
               console.log(level4);
               document.querySelector(".orlistBull4").style.display='block'
         
               orListLevels4(level4)
             
             }else{
               document.querySelector(".orlistBull4").style.display='none'
             }
 
              
  const Learning = response.filter((d) => d.info.areas=="Learning and Development ");
  if (Learning.length>0) {
   document.querySelector(".flush-heading7").style.display="block"
   const level1 = Learning.filter((d)=>d.info.levels=="Level 1")
      
             if(level1.length >0){
               console.log(level1);
               ldListLevels1(level1)
               document.querySelector(".ldlistBull1").style.display='block'
             }else{
               document.querySelector(".ldlistBull1").style.display='none'
             }
           const level2 = Learning.filter((d)=>d.info.levels=="Level 2")
           if(level2.length>0){
             document.querySelector(".ldlistBull2").style.display='block'
             console.log(level2);
             ldListLevels2(level2)
           
           }else{
             document.querySelector(".ldlistBull2").style.display='none'
           }
           const level3 = Learning.filter((d)=>d.info.levels=="Level 3")
           if(level3.length!==0){
             document.querySelector(".ldlistBull3").style.display='block'
             ldListLevels3(level3)
         
           }else{
             document.querySelector(".ldlistBull3").style.display='none'
           }
           const level4 = Learning.filter((d)=>d.info.levels=="Level 4")
           if(level4.length!==0){
             console.log(level4);
             document.querySelector(".ldlistBull4").style.display='block'
       
             ldListLevels4(level4)
           
           }else{
             document.querySelector(".ldlistBull4").style.display='none'
           }
   
  }
     
  }
 
  const Learning = response.filter((d) => d.info.areas=="Learning and Development");
  if (Learning.length>0) {
   document.querySelector(".flush-heading7").style.display="block"
   const level1 = Learning.filter((d)=>d.info.levels=="Level 1")
      
             if(level1.length >0){
               console.log(level1);
               ldListLevels1(level1)
               document.querySelector(".ldlistBull1").style.display='block'
             }else{
               document.querySelector(".ldlistBull1").style.display='none'
             }
           const level2 = Learning.filter((d)=>d.info.levels=="Level 2")
           if(level2.length>0){
             document.querySelector(".ldlistBull2").style.display='block'
             console.log(level2);
             ldListLevels2(level2)
           
           }else{
             document.querySelector(".ldlistBull2").style.display='none'
           }
           const level3 = Learning.filter((d)=>d.info.levels=="Level 3")
           if(level3.length!==0){
             document.querySelector(".ldlistBull3").style.display='block'
             ldListLevels3(level3)
         
           }else{
             document.querySelector(".ldlistBull3").style.display='none'
           }
           const level4 = Learning.filter((d)=>d.info.levels=="Level 4")
           if(level4.length!==0){
             console.log(level4);
             document.querySelector(".ldlistBull4").style.display='block'
       
             ldListLevels4(level4)
           
           }else{
             document.querySelector(".ldlistBull4").style.display='none'
           }
   
  }
  
 // const Awareness = response.filter((d) => d.areas=="Organisational Awareness");
 
 // if (Awareness.length>0) {
 //   document.querySelector(".flush-heading8").style.display="block"
 //   const level1 = Awareness.filter((d)=>d.levels=="Level 1")
      
 //             if(level1.length >0){
 //               console.log(level1);
 //               aListLevels1(level1)
 //               document.querySelector(".alistBull1").style.display='block'
 //             }else{
 //               document.querySelector(".alistBull1").style.display='none'
 //             }
 //           const level2 = Awareness.filter((d)=>d.levels=="Level 2")
 //           if(level2.length>0){
 //             document.querySelector(".alistBull2").style.display='block'
 //             console.log(level2);
 //             aListLevels2(level2)
           
 //           }else{
 //             document.querySelector(".alistBull2").style.display='none'
 //           }
 //           const level3 = Awareness.filter((d)=>d.levels=="Level 3")
 //           if(level3.length!==0){
 //             document.querySelector(".alistBull3").style.display='block'
 //             aListLevels3(level3)
         
 //           }else{
 //             document.querySelector(".alistBull3").style.display='none'
 //           }
 //           const level4 = Awareness.filter((d)=>d.levels=="Level 4")
 //           if(level4.length!==0){
 //             console.log(level4);
 //             document.querySelector(".alistBull4").style.display='block'
       
 //             aListLevels4(level4)
           
 //           }else{
 //             document.querySelector(".alistBull4").style.display='none'
 //           }
   
 //  }
 
 const  Change = response.filter((d) => d.info.areas=="Change Movement");
 
 if (Change.length>0) {
   document.querySelector(".flush-heading9").style.display="block"
   const level1 = Change.filter((d)=>d.info.levels=="Level 1")
      
             if(level1.length >0){
               console.log(level1);
               cmListLevels1(level1)
               document.querySelector(".cmlistBull1").style.display='block'
             }else{
               document.querySelector(".cmlistBull1").style.display='none'
             }
           const level2 = Change.filter((d)=>d.info.levels=="Level 2")
           if(level2.length>0){
             document.querySelector(".cmlistBull2").style.display='block'
             console.log(level2);
             cmListLevels2(level2)
           
           }else{
             document.querySelector(".cmlistBull2").style.display='none'
           }
           const level3 = Change.filter((d)=>d.info.levels=="Level 3")
           if(level3.length!==0){
             document.querySelector(".cmlistBull3").style.display='block'
             cmListLevels3(level3)
         
           }else{
             document.querySelector(".cmlistBull3").style.display='none'
           }
           const level4 = Change.filter((d)=>d.info.levels=="Level 4")
           if(level4.length!==0){
             console.log(level4);
             document.querySelector(".cmlistBull4").style.display='block'
       
             cmListLevels4(level4)
           
           }else{
             document.querySelector(".cmlistBull4").style.display='none'
           }
   
  }
 
 
 const  Technology = response.filter((d) => d.info.areas=="HR Technology information Management");
 
 
 if (Technology.length>0) {
   document.querySelector(".flush-heading10").style.display="block"
   const level1 = Technology.filter((d)=>d.info.levels=="Level 1")
      
             if(level1.length >0){
               console.log(level1);
               tListLevels1(level1)
               document.querySelector(".tlistBull1").style.display='block'
             }else{
               document.querySelector(".tlistBull1").style.display='none'
             }
           const level2 = Technology.filter((d)=>d.info.levels=="Level 2")
           if(level2.length>0){
             document.querySelector(".tlistBull2").style.display='block'
             console.log(level2);
             tListLevels2(level2)
           
           }else{
             document.querySelector(".tlistBull2").style.display='none'
           }
           const level3 = Technology.filter((d)=>d.info.levels=="Level 3")
           if(level3.length!==0){
             document.querySelector(".tlistBull3").style.display='block'
             tListLevels3(level3)
         
           }else{
             document.querySelector(".tlistBull3").style.display='none'
           }
           const level4 = Technology.filter((d)=>d.info.levels=="Level 4")
           if(level4.length!==0){
             console.log(level4);
             document.querySelector(".tlistBull4").style.display='block'
       
             tListLevels4(level4)
           
           }else{
             document.querySelector(".tlistBull4").style.display='none'
           }
   
  }
 
 const  Service = response.filter((d) => d.info.areas=="HR Service Delivery");
 if (Service.length>0) {
   document.querySelector(".flush-heading11").style.display="block"
   const level1 = Service.filter((d)=>d.info.levels=="Level 1")
      
             if(level1.length >0){
               console.log(level1);
               sListLevels1(level1)
               document.querySelector(".slistBull1").style.display='block'
             }else{
               document.querySelector(".slistBull1").style.display='none'
             }
           const level2 = Service.filter((d)=>d.info.levels=="Level 2")
           if(level2.length>0){
             document.querySelector(".slistBull2").style.display='block'
             console.log(level2);
             sListLevels2(level2)
           
           }else{
             document.querySelector(".slistBull2").style.display='none'
           }
           const level3 = Service.filter((d)=>d.info.levels=="Level 3")
           if(level3.length!==0){
             document.querySelector(".slistBull3").style.display='block'
             sListLevels3(level3)
         
           }else{
             document.querySelector(".slistBull3").style.display='none'
           }
           const level4 = Service.filter((d)=>d.info.levels=="Level 4")
           if(level4.length!==0){
             console.log(level4);
             document.querySelector(".slistBull4").style.display='block'
       
             sListLevels4(level4)
           
           }else{
             document.querySelector(".slistBull4").style.display='none'
           }
   
  }
 const  Talent = response.filter((d) => d.info.areas=="Talent Management");
 if (Talent.length>0) {
   document.querySelector(".flush-heading12").style.display="block"
   const level1 = Talent.filter((d)=>d.info.levels=="Level 1")
      
             if(level1.length >0){
               console.log(level1);
               tmListLevels1(level1)
               document.querySelector(".tmlistBull1").style.display='block'
             }else{
               document.querySelector(".tmlistBull1").style.display='none'
             }
           const level2 = Talent.filter((d)=>d.info.levels=="Level 2")
           if(level2.length>0){
             document.querySelector(".tmlistBull2").style.display='block'
             console.log(level2);
             tmListLevels2(level2)
           
           }else{
             document.querySelector(".tmlistBull2").style.display='none'
           }
           const level3 = Talent.filter((d)=>d.info.levels=="Level 3")
           if(level3.length!==0){
             document.querySelector(".tmlistBull3").style.display='block'
             tmListLevels3(level3)
         
           }else{
             document.querySelector(".tmlistBull3").style.display='none'
           }
           const level4 = Talent.filter((d)=>d.info.levels=="Level 4")
           if(level4.length!==0){
             console.log(level4);
             document.querySelector(".tmlistBull4").style.display='block'
       
             tmListLevels4(level4)
           
           }else{
             document.querySelector(".tmlistBull4").style.display='none'
           }
   
  }
 const  Workforce = response.filter((d) => d.info.areas=="Workforce Planning");
 
 if (Workforce.length>0) {
   document.querySelector(".flush-heading13").style.display="block"
   const level1 = Workforce.filter((d)=>d.info.levels=="Level 1")
      
             if(level1.length >0){
               console.log(level1);
               wListLevels1(level1)
               document.querySelector(".wlistBull1").style.display='block'
             }else{
               document.querySelector(".wlistBull1").style.display='none'
             }
           const level2 = Workforce.filter((d)=>d.info.levels=="Level 2")
           if(level2.length>0){
             document.querySelector(".wlistBull2").style.display='block'
             console.log(level2);
             wListLevels2(level2)
           
           }else{
             document.querySelector(".wlistBull2").style.display='none'
           }
           const level3 = Workforce.filter((d)=>d.info.levels=="Level 3")
           if(level3.length!==0){
             document.querySelector(".wlistBull3").style.display='block'
             wListLevels3(level3)
         
           }else{
             document.querySelector(".wlistBull3").style.display='none'
           }
           const level4 = Workforce.filter((d)=>d.info.levels=="Level 4")
           if(level4.length!==0){
             console.log(level4);
             document.querySelector(".wlistBull4").style.display='block'
       
             wListLevels4(level4)
           
           }else{
             document.querySelector(".wlistBull4").style.display='none'
           }
   
  }
  const  Learningdevelopment = response.filter((d) => d.info.areas=="Learning and Develepment");
  if (Learningdevelopment.length>0) {
   document.querySelector(".flush-heading14").style.display="block"
   const level1 = Learningdevelopment.filter((d)=>d.info.levels=="Level 1")
      
             if(level1.length >0){
               console.log(level1);
               dlListLevels1(level1)
               document.querySelector(".dllistBull1").style.display='block'
             }else{
               document.querySelector(".dllistBull1").style.display='none'
             }
           const level2 = Learningdevelopment.filter((d)=>d.info.levels=="Level 2")
           if(level2.length>0){
             document.querySelector(".dllistBull2").style.display='block'
             console.log(level2);
             dlListLevels2(level2)
           
           }else{
             document.querySelector(".dllistBull2").style.display='none'
           }
           const level3 = Learningdevelopment.filter((d)=>d.info.levels=="Level 3")
           if(level3.length!==0){
             document.querySelector(".dllistBull3").style.display='block'
             dlListLevels3(level3)
         
           }else{
             document.querySelector(".dllistBull3").style.display='none'
           }
           const level4 = Learningdevelopment.filter((d)=>d.info.levels=="Level 4")
           if(level4.length!==0){
             console.log(level4);
             document.querySelector(".dllistBull4").style.display='block'
       
             dlListLevels4(level4)
           
           }else{
             document.querySelector(".dllistBull4").style.display='none'
           }
   
  }
  
  const  Occupational = response.filter((d) => d.info.areas=="Occupational Health and Safety");
  
  if (Occupational.length>0) {
   document.querySelector(".flush-heading15").style.display="block"
   const level1 = Occupational.filter((d)=>d.info.levels=="Level 1")
      
             if(level1.length >0){
               console.log(level1);
               ohListLevels1(level1)
               document.querySelector(".ohlistBull1").style.display='block'
             }else{
               document.querySelector(".ohlistBull1").style.display='none'
             }
           const level2 = Occupational.filter((d)=>d.info.levels=="Level 2")
           if(level2.length>0){
             document.querySelector(".ohlistBull2").style.display='block'
             console.log(level2);
             ohListLevels2(level2)
           
           }else{
             document.querySelector(".ohlistBull2").style.display='none'
           }
           const level3 = Occupational.filter((d)=>d.info.levels=="Level 3")
           if(level3.length!==0){
             document.querySelector(".ohlistBull3").style.display='block'
             ohListLevels3(level3)
         
           }else{
             document.querySelector(".ohlistBull3").style.display='none'
           }
           const level4 = Occupational.filter((d)=>d.info.levels=="Level 4")
           if(level4.length!==0){
             console.log(level4);
             document.querySelector(".ohlistBull4").style.display='block'
       
             ohListLevels4(level4)
           
           }else{
             document.querySelector(".ohlistBull4").style.display='none'
           }
   
  }
   const Perfomance = response.filter((d) => d.info.areas=="Performance Management");
 
 if (Perfomance.length>0) {
     document.querySelector(".flush-heading16").style.display="block"
     const level1 = Perfomance.filter((d)=>d.info.levels=="Level 1")
        
               if(level1.length >0){
                 console.log(level1);
                 peListLevels1(level1)
                 document.querySelector(".pelistBull1").style.display='block'
               }else{
                 document.querySelector(".pelistBull1").style.display='none'
               }
             const level2 = Perfomance.filter((d)=>d.info.levels=="Level 2")
             if(level2.length>0){
               document.querySelector(".pelistBull2").style.display='block'
               console.log(level2);
               peListLevels2(level2)
             
             }else{
               document.querySelector(".pelistBull2").style.display='none'
             }
             const level3 = Perfomance.filter((d)=>d.info.levels=="Level 3")
             if(level3.length!==0){
               document.querySelector(".pelistBull3").style.display='block'
               peListLevels3(level3)
           
             }else{
               document.querySelector(".pelistBull3").style.display='none'
             }
             const level4 = Perfomance.filter((d)=>d.info.levels=="Level 4")
             if(level4.length!==0){
               console.log(level4);
               document.querySelector(".pelistBull4").style.display='block'
         
               peListLevels4(level4)
             
             }else{
               document.querySelector(".pelistBull4").style.display='none'
             }
     
    }
 const  Industrial = response.filter((d) => d.info.areas=="Industrial and Labour Relations");
 
   if (Industrial.length>0) {
     document.querySelector(".flush-heading17").style.display="block"
     const level1 = Industrial.filter((d)=>d.info.levels=="Level 1")
        
               if(level1.length >0){
                 console.log(level1);
                 inListLevels1(level1)
                 document.querySelector(".inlistBull1").style.display='block'
               }else{
                 document.querySelector(".inlistBull1").style.display='none'
               }
             const level2 = Industrial.filter((d)=>d.info.levels=="Level 2")
             if(level2.length>0){
               document.querySelector(".inlistBull2").style.display='block'
               console.log(level2);
               inListLevels2(level2)
             
             }else{
               document.querySelector(".inlistBull2").style.display='none'
             }
             const level3 = Industrial.filter((d)=>d.info.levels=="Level 3")
             if(level3.length!==0){
               document.querySelector(".inlistBull3").style.display='block'
               inListLevels3(level3)
           
             }else{
               document.querySelector(".inlistBull3").style.display='none'
             }
             const level4 = Industrial.filter((d)=>d.info.levels=="Level 4")
             if(level4.length!==0){
               console.log(level4);
               document.querySelector(".inlistBull4").style.display='block'
         
               inListLevels4(level4)
             
             }else{
               document.querySelector(".inlistBull4").style.display='none'
             }
     
    }
 const  Interpersonal = response.filter((d) => d.info.areas=="Interpersonal Relationships");
 
 if (Interpersonal.length>0) {
     document.querySelector(".flush-heading18").style.display="block"
     const level1 = Interpersonal.filter((d)=>d.info.levels=="Level 1")
        
               if(level1.length >0){
                 console.log(level1);
                 intListLevels1(level1)
                 document.querySelector(".intlistBull1").style.display='block'
               }else{
                 document.querySelector(".intlistBull1").style.display='none'
               }
             const level2 = Interpersonal.filter((d)=>d.info.levels=="Level 2")
             if(level2.length>0){
               document.querySelector(".intlistBull2").style.display='block'
               console.log(level2);
               intListLevels2(level2)
             
             }else{
               document.querySelector(".intlistBull2").style.display='none'
             }
             const level3 = Interpersonal.filter((d)=>d.info.levels=="Level 3")
             if(level3.length!==0){
               document.querySelector(".intlistBull3").style.display='block'
               intListLevels3(level3)
           
             }else{
               document.querySelector(".intlistBull3").style.display='none'
             }
             const level4 = Interpersonal.filter((d)=>d.info.levels=="Level 4")
             if(level4.length!==0){
               console.log(level4);
               document.querySelector(".intlistBull4").style.display='block'
         
               intListLevels4(level4)
             
             }else{
               document.querySelector(".intlistBull4").style.display='none'
             }
     
    }
 
 const  Communication = response.filter((d) => d.info.areas=="Communication");
 if (Communication.length>0) {
   document.querySelector(".flush-heading19").style.display="block"
   const level1 = Communication.filter((d)=>d.info.levels=="Level 1")
      
             if(level1.length >0){
               console.log(level1);
               comListLevels1(level1)
               document.querySelector(".comlistBull1").style.display='block'
             }else{
               document.querySelector(".comlistBull1").style.display='none'
             }
           const level2 = Communication.filter((d)=>d.info.levels=="Level 2")
           if(level2.length>0){
             document.querySelector(".comlistBull2").style.display='block'
             console.log(level2);
             comListLevels2(level2)
           
           }else{
             document.querySelector(".comlistBull2").style.display='none'
           }
           const level3 = Communication.filter((d)=>d.info.levels=="Level 3")
           if(level3.length!==0){
             document.querySelector(".comlistBull3").style.display='block'
             comListLevels3(level3)
         
           }else{
             document.querySelector(".comlistBull3").style.display='none'
           }
           const level4 = Communication.filter((d)=>d.info.levels=="Level 4")
           if(level4.length!==0){
             console.log(level4);
             document.querySelector(".comlistBull4").style.display='block'
       
             comListLevels4(level4)
           
           }else{
             document.querySelector(".comlistBull4").style.display='none'
           }
   
  }
   const Delivery = response.filter((d) => d.info.areas=="Service Delivery orientation");
   if (Delivery.length>0) {
     document.querySelector(".flush-heading20").style.display="block"
     const level1 = Delivery.filter((d)=>d.info.levels=="Level 1")
        
               if(level1.length >0){
                 console.log(level1);
                 sdoListLevels1(level1)
                 document.querySelector(".sdolistBull1").style.display='block'
               }else{
                 document.querySelector(".sdolistBull1").style.display='none'
               }
             const level2 = Delivery.filter((d)=>d.info.levels=="Level 2")
             if(level2.length>0){
               document.querySelector(".sdolistBull2").style.display='block'
               console.log(level2);
               sdoListLevels2(level2)
             
             }else{
               document.querySelector(".sdolistBull2").style.display='none'
             }
             const level3 = Delivery.filter((d)=>d.info.levels=="Level 3")
             if(level3.length!==0){
               document.querySelector(".sdolistBull3").style.display='block'
               sdoListLevels3(level3)
           
             }else{
               document.querySelector(".sdolistBull3").style.display='none'
             }
             const level4 = Delivery.filter((d)=>d.info.levels=="Level 4")
             if(level4.length!==0){
               console.log(level4);
               document.querySelector(".sdolistBull4").style.display='block'
         
               sdoListLevels4(level4)
             
             }else{
               document.querySelector(".sdolistBull4").style.display='none'
             }
     
    }
   const  Action = response.filter((d) => d.info.areas=="Action and Outcome Orientation");
   if (Action.length>0) {
     document.querySelector(".flush-heading21").style.display="block"
     const level1 = Action.filter((d)=>d.info.levels=="Level 1")
        
               if(level1.length >0){
                 console.log(level1);
                 actListLevels1(level1)
                 document.querySelector(".actlistBull1").style.display='block'
               }else{
                 document.querySelector(".actlistBull1").style.display='none'
               }
             const level2 = Action.filter((d)=>d.info.levels=="Level 2")
             if(level2.length>0){
               document.querySelector(".actlistBull2").style.display='block'
               console.log(level2);
               actListLevels2(level2)
             
             }else{
               document.querySelector(".actlistBull2").style.display='none'
             }
             const level3 = Action.filter((d)=>d.info.levels=="Level 3")
             if(level3.length!==0){
               document.querySelector(".actlistBull3").style.display='block'
               actListLevels3(level3)
           
             }else{
               document.querySelector(".actlistBull3").style.display='none'
             }
             const level4 = Action.filter((d)=>d.info.levels=="Level 4")
             if(level4.length!==0){
               console.log(level4);
               document.querySelector(".actlistBull4").style.display='block'
         
               actListLevels4(level4)
             
             }else{
               document.querySelector(".actlistBull4").style.display='none'
             }
     
    }
 const  Conflict = response.filter((d) => d.info.areas=="Conflict Management");
 if (Conflict.length>0) {
   document.querySelector(".flush-heading22").style.display="block"
   const level1 = Conflict.filter((d)=>d.info.levels=="Level 1")
      
             if(level1.length >0){
               console.log(level1);
               conListLevels1(level1)
               document.querySelector(".conlistBull1").style.display='block'
             }else{
               document.querySelector(".conlistBull1").style.display='none'
             }
           const level2 = Conflict.filter((d)=>d.info.levels=="Level 2")
           if(level2.length>0){
             document.querySelector(".conlistBull2").style.display='block'
             console.log(level2);
             conListLevels2(level2)
           
           }else{
             document.querySelector(".conlistBull2").style.display='none'
           }
           const level3 = Conflict.filter((d)=>d.info.levels=="Level 3")
           if(level3.length!==0){
             document.querySelector(".conlistBull3").style.display='block'
             conListLevels3(level3)
         
           }else{
             document.querySelector(".conlistBull3").style.display='none'
           }
           const level4 = Conflict.filter((d)=>d.info.levels=="Level 4")
           if(level4.length!==0){
             console.log(level4);
             document.querySelector(".conlistBull4").style.display='block'
       
             conListLevels4(level4)
           
           }else{
             document.querySelector(".conlistBull4").style.display='none'
           }
   
  }
  const  Orientation = response.filter((d) => d.info.areas=="Learning Orientation");
  if (Orientation.length>0) {
   document.querySelector(".flush-heading23").style.display="block"
   const level1 = Orientation.filter((d)=>d.info.levels=="Level 1")
      
             if(level1.length >0){
               console.log(level1);
               loListLevels1(level1)
               document.querySelector(".lolistBull1").style.display='block'
             }else{
               document.querySelector(".lolistBull1").style.display='none'
             }
           const level2 = Orientation.filter((d)=>d.info.levels=="Level 2")
           if(level2.length>0){
             document.querySelector(".lolistBull2").style.display='block'
             console.log(level2);
             loListLevels2(level2)
           
           }else{
             document.querySelector(".lolistBull2").style.display='none'
           }
           const level3 = Orientation.filter((d)=>d.info.levels=="Level 3")
           if(level3.length!==0){
             document.querySelector(".lolistBull3").style.display='block'
             loListLevels3(level3)
         
           }else{
             document.querySelector(".lolistBull3").style.display='none'
           }
           const level4 = Orientation.filter((d)=>d.info.levels=="Level 4")
           if(level4.length!==0){
             console.log(level4);
             document.querySelector(".lolistBull4").style.display='block'
       
             loListLevels4(level4)
           
           }else{
             document.querySelector(".lolistBull4").style.display='none'
           }
   
  }
 const  Accountability = response.filter((d) => d.info.areas=="Accountability and Ethical Conduct");
 if (Accountability.length>0) {
   document.querySelector(".flush-heading24").style.display="block"
   const level1 = Accountability.filter((d)=>d.info.levels=="Level 1")
      
             if(level1.length >0){
               console.log(level1);
               aeListLevels1(level1)
               document.querySelector(".aelistBull1").style.display='block'
             }else{
               document.querySelector(".aelistBull1").style.display='none'
             }
           const level2 = Accountability.filter((d)=>d.info.levels=="Level 2")
           if(level2.length>0){
             document.querySelector(".aelistBull2").style.display='block'
             console.log(level2);
             aeListLevels2(level2)
           
           }else{
             document.querySelector(".aelistBull2").style.display='none'
           }
           const level3 = Accountability.filter((d)=>d.info.levels=="Level 3")
           if(level3.length!==0){
             document.querySelector(".aelistBull3").style.display='block'
             aeListLevels3(level3)
         
           }else{
             document.querySelector(".aelistBull3").style.display='none'
           }
           const level4 = Accountability.filter((d)=>d.info.levels=="Level 4")
           if(level4.length!==0){
             console.log(level4);
             document.querySelector(".aelistBull4").style.display='block'
       
             aeListLevels4(level4)
           
           }else{
             document.querySelector(".aelistBull4").style.display='none'
           }
   
  }
  const   Problem = response.filter((d) => d.info.areas=="Problem Solving and Analysis");
  if (Problem.length>0) {
   document.querySelector(".flush-heading25").style.display="block"
   const level1 = Problem.filter((d)=>d.info.levels=="Level 1")
      
             if(level1.length >0){
               console.log(level1);
               psListLevels1(level1)
               document.querySelector(".pslistBull1").style.display='block'
             }else{
               document.querySelector(".pslistBull1").style.display='none'
             }
           const level2 = Problem.filter((d)=>d.info.levels=="Level 2")
           if(level2.length>0){
             document.querySelector(".pslistBull2").style.display='block'
             console.log(level2);
             psListLevels2(level2)
           
           }else{
             document.querySelector(".pslistBull2").style.display='none'
           }
           const level3 = Problem.filter((d)=>d.info.levels=="Level 3")
           if(level3.length!==0){
             document.querySelector(".pslistBull3").style.display='block'
             psListLevels3(level3)
         
           }else{
             document.querySelector(".pslistBull3").style.display='none'
           }
           const level4 = Problem.filter((d)=>d.info.levels=="Level 4")
           if(level4.length!==0){
             console.log(level4);
             document.querySelector(".pslistBull4").style.display='block'
       
             psListLevels4(level4)
           
           }else{
             document.querySelector(".pslistBull4").style.display='none'
           }
   
  }
 
  const   Compensation = response.filter((d) => d.info.areas=="Compensation and Benefits Management");
  if (Compensation.length>0) {
   document.querySelector(".flush-heading26").style.display="block"
   const level1 = Compensation.filter((d)=>d.info.levels=="Level 1")
      
             if(level1.length >0){
               console.log(level1);
               cbListLevels1(level1)
               document.querySelector(".cblistBull1").style.display='block'
             }else{
               document.querySelector(".cblistBull1").style.display='none'
             }
           const level2 = Compensation.filter((d)=>d.info.levels=="Level 2")
           if(level2.length>0){
             document.querySelector(".cblistBull2").style.display='block'
             console.log(level2);
             cbListLevels2(level2)
           
           }else{
             document.querySelector(".cblistBull2").style.display='none'
           }
           const level3 = Compensation.filter((d)=>d.info.levels=="Level 3")
           if(level3.length!==0){
             document.querySelector(".cblistBull3").style.display='block'
             cbListLevels3(level3)
         
           }else{
             document.querySelector(".cblistBull3").style.display='none'
           }
           const level4 = Compensation.filter((d)=>d.info.levels=="Level 4")
           if(level4.length!==0){
             console.log(level4);
             document.querySelector(".cblistBull4").style.display='block'
       
             cbListLevels4(level4)
           
           }else{
             document.querySelector(".cblistBull4").style.display='none'
           }
   
  }
 
  const   EmployeeWellness = response.filter((d) => d.info.areas=="Employee Wellness");
  if (EmployeeWellness.length>0) {
   document.querySelector(".flush-heading27").style.display="block"
   const level1 = EmployeeWellness.filter((d)=>d.info.levels=="Level 1")
      
             if(level1.length >0){
               console.log(level1);
               ewListLevels1(level1)
               document.querySelector(".ewlistBull1").style.display='block'
             }else{
               document.querySelector(".ewlistBull1").style.display='none'
             }
           const level2 = EmployeeWellness.filter((d)=>d.info.levels=="Level 2")
           if(level2.length>0){
             document.querySelector(".ewlistBull2").style.display='block'
             console.log(level2);
             ewListLevels2(level2)
           
           }else{
             document.querySelector(".ewlistBull2").style.display='none'
           }
           const level3 = EmployeeWellness.filter((d)=>d.info.levels=="Level 3")
           if(level3.length!==0){
             document.querySelector(".ewlistBull3").style.display='block'
             ewListLevels3(level3)
         
           }else{
             document.querySelector(".ewlistBull3").style.display='none'
           }
           const level4 = EmployeeWellness.filter((d)=>d.info.levels=="Level 4")
           if(level4.length!==0){
             console.log(level4);
             document.querySelector(".ewlistBull4").style.display='block'
       
             ewListLevels4(level4)
           
           }else{
             document.querySelector(".ewlistBull4").style.display='none'
           }
   
  }
 
  const   Resilience = response.filter((d) => d.info.areas=="Resilience");
  if (Resilience.length>0) {
   document.querySelector(".flush-heading28").style.display="block"
   const level1 = Resilience.filter((d)=>d.info.levels=="Level 1")
      
             if(level1.length >0){
               console.log(level1);
               rsListLevels1(level1)
               document.querySelector(".rslistBull1").style.display='block'
             }else{
               document.querySelector(".rslistBull1").style.display='none'
             }
           const level2 = Resilience.filter((d)=>d.info.levels=="Level 2")
           if(level2.length>0){
             document.querySelector(".rslistBull2").style.display='block'
             console.log(level2);
             rsListLevels2(level2)
           
           }else{
             document.querySelector(".rslistBull2").style.display='none'
           }
           const level3 = Resilience.filter((d)=>d.info.levels=="Level 3")
           if(level3.length!==0){
             document.querySelector(".rslistBull3").style.display='block'
             rsListLevels3(level3)
         
           }else{
             document.querySelector(".rslistBull3").style.display='none'
           }
           const level4 = Resilience.filter((d)=>d.info.levels=="Level 4")
           if(level4.length!==0){
             console.log(level4);
             document.querySelector(".rslistBull4").style.display='block'
       
             rsListLevels4(level4)
           
           }else{
             document.querySelector(".rslistBull4").style.display='none'
           }
   
  }
 
  const   DirectionSetting = response.filter((d) => d.info.areas=="Direction Setting");
  if (DirectionSetting.length>0) {
   document.querySelector(".flush-heading29").style.display="block"
   const level1 = DirectionSetting.filter((d)=>d.info.levels=="Level 1")
      
             if(level1.length >0){
               console.log(level1);
               drListLevels1(level1)
               document.querySelector(".drlistBull1").style.display='block'
             }else{
               document.querySelector(".drlistBull1").style.display='none'
             }
           const level2 = DirectionSetting.filter((d)=>d.info.levels=="Level 2")
           if(level2.length>0){
             document.querySelector(".drlistBull2").style.display='block'
             console.log(level2);
             drListLevels2(level2)
           
           }else{
             document.querySelector(".drlistBull2").style.display='none'
           }
           const level3 = DirectionSetting.filter((d)=>d.info.levels=="Level 3")
           if(level3.length!==0){
             document.querySelector(".drlistBull3").style.display='block'
             drListLevels3(level3)
         
           }else{
             document.querySelector(".drlistBull3").style.display='none'
           }
           const level4 = DirectionSetting.filter((d)=>d.info.levels=="Level 4")
           if(level4.length!==0){
             console.log(level4);
             document.querySelector(".drlistBull4").style.display='block'
       
             drListLevels4(level4)
           
           }else{
             document.querySelector(".drlistBull4").style.display='none'
           }
   
  }
 
  const   ImpactandInfluence = response.filter((d) => d.info.areas=="Impact and Influence");
  if (ImpactandInfluence.length>0) {
   document.querySelector(".flush-heading30").style.display="block"
   const level1 = ImpactandInfluence.filter((d)=>d.info.levels=="Level 1")
      
             if(level1.length >0){
               console.log(level1);
               iiListLevels1(level1)
               document.querySelector(".iilistBull1").style.display='block'
             }else{
               document.querySelector(".iilistBull1").style.display='none'
             }
           const level2 = ImpactandInfluence.filter((d)=>d.info.levels=="Level 2")
           if(level2.length>0){
             document.querySelector(".iilistBull2").style.display='block'
             console.log(level2);
             iiListLevels2(level2)
           
           }else{
             document.querySelector(".iilistBull2").style.display='none'
           }
           const level3 = ImpactandInfluence.filter((d)=>d.info.levels=="Level 3")
           if(level3.length!==0){
             document.querySelector(".iilistBull3").style.display='block'
             iiListLevels3(level3)
         
           }else{
             document.querySelector(".iilistBull3").style.display='none'
           }
           const level4 = ImpactandInfluence.filter((d)=>d.info.levels=="Level 4")
           if(level4.length!==0){
             console.log(level4);
             document.querySelector(".iilistBull4").style.display='block'
       
             iiListLevels4(level4)
           
           }else{
             document.querySelector(".iilistBull4").style.display='none'
           }
   
  }
 
  const   CoachingandMentoring = response.filter((d) => d.info.areas=="Coaching and Mentoring");
  if (CoachingandMentoring.length>0) {
   document.querySelector(".flush-heading31").style.display="block"
   const level1 = CoachingandMentoring.filter((d)=>d.info.levels=="Level 1")
      
             if(level1.length >0){
               console.log(level1);
               menListLevels1(level1)
               document.querySelector(".menlistBull1").style.display='block'
             }else{
               document.querySelector(".menlistBull1").style.display='none'
             }
           const level2 = CoachingandMentoring.filter((d)=>d.info.levels=="Level 2")
           if(level2.length>0){
             document.querySelector(".menlistBull2").style.display='block'
             console.log(level2);
             menListLevels2(level2)
           
           }else{
             document.querySelector(".menlistBull2").style.display='none'
           }
           const level3 = CoachingandMentoring.filter((d)=>d.info.levels=="Level 3")
           if(level3.length!==0){
             document.querySelector(".menlistBull3").style.display='block'
             menListLevels3(level3)
         
           }else{
             document.querySelector(".menlistBull3").style.display='none'
           }
           const level4 = CoachingandMentoring.filter((d)=>d.info.levels=="Level 4")
           if(level4.length!==0){
             console.log(level4);
             document.querySelector(".menlistBull4").style.display='block'
       
             menListLevels4(level4)
           
           }else{
             document.querySelector(".menlistBull4").style.display='none'
           }
   
  }
 
  const   TeamOrientation= response.filter((d) => d.info.areas=="Team Orientation");
  if (TeamOrientation.length>0) {
   document.querySelector(".flush-heading32").style.display="block"
   const level1 = TeamOrientation.filter((d)=>d.info.levels=="Level 1")
      
             if(level1.length >0){
               console.log(level1);
               toListLevels1(level1)
               document.querySelector(".tolistBull1").style.display='block'
             }else{
               document.querySelector(".tolistBull1").style.display='none'
             }
           const level2 = TeamOrientation.filter((d)=>d.info.levels=="Level 2")
           if(level2.length>0){
             document.querySelector(".tolistBull2").style.display='block'
             console.log(level2);
             toListLevels2(level2)
           
           }else{
             document.querySelector(".tolistBull2").style.display='none'
           }
           const level3 = TeamOrientation.filter((d)=>d.info.levels=="Level 3")
           if(level3.length!==0){
             document.querySelector(".tolistBull3").style.display='block'
             toListLevels3(level3)
         
           }else{
             document.querySelector(".tolistBull3").style.display='none'
           }
           const level4 = TeamOrientation.filter((d)=>d.info.levels=="Level 4")
           if(level4.length!==0){
             console.log(level4);
             document.querySelector(".tolistBull4").style.display='block'
       
             toListLevels4(level4)
           
           }else{
             document.querySelector(".tolistBull4").style.display='none'
           }
   
  }

  const   InternalAuditing  = response.filter((d) => d.info.areas=="Internal Auditing");
  if (InternalAuditing.length>0) {
   document.querySelector(".flush-heading33").style.display="block"
   const level1 = InternalAuditing.filter((d)=>d.info.levels=="Level 1")
      
             if(level1.length >0){
               console.log(level1);
               ioListLevels1(level1)
               document.querySelector(".iolistBull1").style.display='block'
             }else{
               document.querySelector(".iolistBull1").style.display='none'
             }
           const level2 = InternalAuditing.filter((d)=>d.info.levels=="Level 2")
           if(level2.length>0){
             document.querySelector(".iolistBull2").style.display='block'
             console.log(level2);
             ioListLevels2(level2)
           
           }else{
             document.querySelector(".iolistBull2").style.display='none'
           }
           const level3 = InternalAuditing.filter((d)=>d.info.levels=="Level 3")
           if(level3.length!==0){
             document.querySelector(".iolistBull3").style.display='block'
             ioListLevels3(level3)
         
           }else{
             document.querySelector(".iolistBull3").style.display='none'
           }
           const level4 = InternalAuditing.filter((d)=>d.info.levels=="Level 4")
           if(level4.length!==0){
             console.log(level4);
             document.querySelector(".iolistBull4").style.display='block'
       
             ioListLevels4(level4)
           
           }else{
             document.querySelector(".iolistBull4").style.display='none'
           }
   
  }

  const   EngagementManagement  = response.filter((d) => d.info.areas=="Engagement Management");
  if (EngagementManagement.length>0) {
   document.querySelector(".flush-heading34").style.display="block"
   const level1 = EngagementManagement.filter((d)=>d.info.levels=="Level 1")
      
             if(level1.length >0){
               console.log(level1);
               emListLevels1(level1)
               document.querySelector(".emlistBull1").style.display='block'
             }else{
               document.querySelector(".emlistBull1").style.display='none'
             }
           const level2 = EngagementManagement.filter((d)=>d.info.levels=="Level 2")
           if(level2.length>0){
             document.querySelector(".emlistBull2").style.display='block'
             console.log(level2);
             emListLevels2(level2)
           
           }else{
             document.querySelector(".emlistBull2").style.display='none'
           }
           const level3 = EngagementManagement.filter((d)=>d.info.levels=="Level 3")
           if(level3.length!==0){
             document.querySelector(".emlistBull3").style.display='block'
             emListLevels3(level3)
         
           }else{
             document.querySelector(".emlistBull3").style.display='none'
           }
           const level4 = EngagementManagement.filter((d)=>d.info.levels=="Level 4")
           if(level4.length!==0){
             console.log(level4);
             document.querySelector(".emlistBull4").style.display='block'
       
             emListLevels4(level4)
           
           }else{
             document.querySelector(".emlistBull4").style.display='none'
           }
   
  }
  
  const   InformationManagement  = response.filter((d) => d.info.areas=="Information Management");
  if (InformationManagement.length>0) {
   document.querySelector(".flush-heading35").style.display="block"
   const level1 = InformationManagement.filter((d)=>d.info.levels=="Level 1")
      
             if(level1.length >0){
               console.log(level1);
               imListLevels1(level1)
               document.querySelector(".imlistBull1").style.display='block'
             }else{
               document.querySelector(".imlistBull1").style.display='none'
             }
           const level2 = InformationManagement.filter((d)=>d.info.levels=="Level 2")
           if(level2.length>0){
             document.querySelector(".imlistBull2").style.display='block'
             console.log(level2);
             imListLevels2(level2)
           
           }else{
             document.querySelector(".imlistBull2").style.display='none'
           }
           const level3 = InformationManagement.filter((d)=>d.info.levels=="Level 3")
           if(level3.length!==0){
             document.querySelector(".imlistBull3").style.display='block'
             imListLevels3(level3)
         
           }else{
             document.querySelector(".imlistBull3").style.display='none'
           }
           const level4 = InformationManagement.filter((d)=>d.info.levels=="Level 4")
           if(level4.length!==0){
             console.log(level4);
             document.querySelector(".imlistBull4").style.display='block'
       
             imListLevels4(level4)
           
           }else{
             document.querySelector(".imlistBull4").style.display='none'
           }
   
  }
  const   ResearchandAnalysis  = response.filter((d) => d.info.areas=="Research and Analysis");
  if (ResearchandAnalysis.length>0) {
   document.querySelector(".flush-heading36").style.display="block"
   const level1 = ResearchandAnalysis.filter((d)=>d.info.levels=="Level 1")
      
             if(level1.length >0){
               console.log(level1);
               raListLevels1(level1)
               document.querySelector(".ralistBull1").style.display='block'
             }else{
               document.querySelector(".ralistBull1").style.display='none'
             }
           const level2 = ResearchandAnalysis.filter((d)=>d.info.levels=="Level 2")
           if(level2.length>0){
             document.querySelector(".ralistBull2").style.display='block'
             console.log(level2);
             raListLevels2(level2)
           
           }else{
             document.querySelector(".ralistBull2").style.display='none'
           }
           const level3 = ResearchandAnalysis.filter((d)=>d.info.levels=="Level 3")
           if(level3.length!==0){
             document.querySelector(".ralistBull3").style.display='block'
             raListLevels3(level3)
         
           }else{
             document.querySelector(".ralistBull3").style.display='none'
           }
           const level4 = ResearchandAnalysis.filter((d)=>d.info.levels=="Level 4")
           if(level4.length!==0){
             console.log(level4);
             document.querySelector(".ralistBull4").style.display='block'
       
             raListLevels4(level4)
           
           }else{
             document.querySelector(".ralistBull4").style.display='none'
           }
   
  }

  const   AdvocacyNegotiation  = response.filter((d) => d.info.areas=="Advocacy / Negotiation");
  if (AdvocacyNegotiation.length>0) {
   document.querySelector(".flush-heading37").style.display="block"
   const level1 = AdvocacyNegotiation.filter((d)=>d.info.levels=="Level 1")
      
             if(level1.length >0){
               console.log(level1);
               anListLevels1(level1)
               document.querySelector(".anlistBull1").style.display='block'
             }else{
               document.querySelector(".anlistBull1").style.display='none'
             }
           const level2 = AdvocacyNegotiation.filter((d)=>d.info.levels=="Level 2")
           if(level2.length>0){
             document.querySelector(".anlistBull2").style.display='block'
             console.log(level2);
             anListLevels2(level2)
           
           }else{
             document.querySelector(".anlistBull2").style.display='none'
           }
           const level3 = AdvocacyNegotiation.filter((d)=>d.info.levels=="Level 3")
           if(level3.length!==0){
             document.querySelector(".anlistBull3").style.display='block'
             anListLevels3(level3)
         
           }else{
             document.querySelector(".anlistBull3").style.display='none'
           }
           const level4 = AdvocacyNegotiation.filter((d)=>d.info.levels=="Level 4")
           if(level4.length!==0){
             console.log(level4);
             document.querySelector(".anlistBull4").style.display='block'
       
             anListLevels4(level4)
           
           }else{
             document.querySelector(".anlistBull4").style.display='none'
           }
   
  }

  const   EthicsandProfessionalism  = response.filter((d) => d.info.areas=="Ethics and Professionalism");
  if (EthicsandProfessionalism.length>0) {
   document.querySelector(".flush-heading38").style.display="block"
   const level1 = EthicsandProfessionalism.filter((d)=>d.info.levels=="Level 1")
      
             if(level1.length >0){
               console.log(level1);
               epListLevels1(level1)
               document.querySelector(".eplistBull1").style.display='block'
             }else{
               document.querySelector(".eplistBull1").style.display='none'
             }
           const level2 = EthicsandProfessionalism.filter((d)=>d.info.levels=="Level 2")
           if(level2.length>0){
             document.querySelector(".eplistBull2").style.display='block'
             console.log(level2);
             epListLevels2(level2)
           
           }else{
             document.querySelector(".eplistBull2").style.display='none'
           }
           const level3 = EthicsandProfessionalism.filter((d)=>d.info.levels=="Level 3")
           if(level3.length!==0){
             document.querySelector(".eplistBull3").style.display='block'
             epListLevels3(level3)
         
           }else{
             document.querySelector(".eplistBull3").style.display='none'
           }
           const level4 = EthicsandProfessionalism.filter((d)=>d.info.levels=="Level 4")
           if(level4.length!==0){
             console.log(level4);
             document.querySelector(".eplistBull4").style.display='block'
       
             epListLevels4(level4)
           
           }else{
             document.querySelector(".eplistBull4").style.display='none'
           }
   
  }
  const   StrategicCapability  = response.filter((d) => d.info.areas=="Strategic Capability / Leadership or Direction Setting");
  if (StrategicCapability.length>0) {
   document.querySelector(".flush-heading39").style.display="block"
   const level1 = StrategicCapability.filter((d)=>d.info.levels=="Level 1")
      
             if(level1.length >0){
               console.log(level1);
               scListLevels1(level1)
               document.querySelector(".sclistBull1").style.display='block'
             }else{
               document.querySelector(".sclistBull1").style.display='none'
             }
           const level2 = StrategicCapability.filter((d)=>d.info.levels=="Level 2")
           if(level2.length>0){
             document.querySelector(".sclistBull2").style.display='block'
             console.log(level2);
             scListLevels2(level2)
           
           }else{
             document.querySelector(".sclistBull2").style.display='none'
           }
           const level3 = StrategicCapability.filter((d)=>d.info.levels=="Level 3")
           if(level3.length!==0){
             document.querySelector(".sclistBull3").style.display='block'
             scListLevels3(level3)
         
           }else{
             document.querySelector(".sclistBull3").style.display='none'
           }
           const level4 = StrategicCapability.filter((d)=>d.info.levels=="Level 4")
           if(level4.length!==0){
             console.log(level4);
             document.querySelector(".sclistBull4").style.display='block'
       
             scListLevels4(level4)
           
           }else{
             document.querySelector(".sclistBull4").style.display='none'
           }
   
  }

  const   ChangeReadiness  = response.filter((d) => d.info.areas=="Change Readiness");
  if (ChangeReadiness.length>0) {
   document.querySelector(".flush-heading40").style.display="block"
   const level1 = ChangeReadiness.filter((d)=>d.info.levels=="Level 1")
      
             if(level1.length >0){
               console.log(level1);
               crListLevels1(level1)
               document.querySelector(".crlistBull1").style.display='block'
             }else{
               document.querySelector(".crlistBull1").style.display='none'
             }
           const level2 = ChangeReadiness.filter((d)=>d.info.levels=="Level 2")
           if(level2.length>0){
             document.querySelector(".crlistBull2").style.display='block'
             console.log(level2);
             crListLevels2(level2)
           
           }else{
             document.querySelector(".crlistBull2").style.display='none'
           }
           const level3 = ChangeReadiness.filter((d)=>d.info.levels=="Level 3")
           if(level3.length!==0){
             document.querySelector(".crlistBull3").style.display='block'
             crListLevels3(level3)
         
           }else{
             document.querySelector(".crlistBull3").style.display='none'
           }
           const level4 = ChangeReadiness.filter((d)=>d.info.levels=="Level 4")
           if(level4.length!==0){
             console.log(level4);
             document.querySelector(".crlistBull4").style.display='block'
       
             crListLevels4(level4)
           
           }else{
             document.querySelector(".crlistBull4").style.display='none'
           }
   
  }

  const   CognitiveAbility  = response.filter((d) => d.info.areas=="Cognitive Ability");
  if (CognitiveAbility.length>0) {
   document.querySelector(".flush-heading41").style.display="block"
   const level1 = CognitiveAbility.filter((d)=>d.info.levels=="Level 1")
      
             if(level1.length >0){
               console.log(level1);
               caListLevels1(level1)
               document.querySelector(".calistBull1").style.display='block'
             }else{
               document.querySelector(".calistBull1").style.display='none'
             }
           const level2 = CognitiveAbility.filter((d)=>d.info.levels=="Level 2")
           if(level2.length>0){
             document.querySelector(".calistBull2").style.display='block'
             console.log(level2);
             caListLevels2(level2)
           
           }else{
             document.querySelector(".calistBull2").style.display='none'
           }
           const level3 = CognitiveAbility.filter((d)=>d.info.levels=="Level 3")
           if(level3.length!==0){
             document.querySelector(".calistBull3").style.display='block'
             caListLevels3(level3)
         
           }else{
             document.querySelector(".calistBull3").style.display='none'
           }
           const level4 = CognitiveAbility.filter((d)=>d.info.levels=="Level 4")
           if(level4.length!==0){
             console.log(level4);
             document.querySelector(".calistBull4").style.display='block'
       
             caListLevels4(level4)
           
           }else{
             document.querySelector(".calistBull4").style.display='none'
           }
   
  }

  const   CustomerOrientation  = response.filter((d) => d.info.areas=="Customer Orientation and Customer Focus");
  if (CustomerOrientation.length>0) {
   document.querySelector(".flush-heading42").style.display="block"
   const level1 = CustomerOrientation.filter((d)=>d.info.levels=="Level 1")
      
             if(level1.length >0){
               console.log(level1);
               ccListLevels1(level1)
               document.querySelector(".cclistBull1").style.display='block'
             }else{
               document.querySelector(".cclistBull1").style.display='none'
             }
           const level2 = CustomerOrientation.filter((d)=>d.info.levels=="Level 2")
           if(level2.length>0){
             document.querySelector(".cclistBull2").style.display='block'
             console.log(level2);
             ccListLevels2(level2)
           
           }else{
             document.querySelector(".cclistBull2").style.display='none'
           }
           const level3 = CustomerOrientation.filter((d)=>d.info.levels=="Level 3")
           if(level3.length!==0){
             document.querySelector(".cclistBull3").style.display='block'
             ccListLevels3(level3)
         
           }else{
             document.querySelector(".cclistBull3").style.display='none'
           }
           const level4 = CustomerOrientation.filter((d)=>d.info.levels=="Level 4")
           if(level4.length!==0){
             console.log(level4);
             document.querySelector(".cclistBull4").style.display='block'
       
             ccListLevels4(level4)
           
           }else{
             document.querySelector(".cclistBull4").style.display='none'
           }
   
  }
//   // let option =""
//   // let html =""
//   // let list = document.querySelector(".listdata124")
 
//   // result.forEach(department => {
//   //     option=` <li>${department.details}</li>`;
//   //     html +=option;
//   //     list.innerHTML=html;
     
      
//   // });


}
function Leadership(response) {
  
  console.log(response);
 
  const  written = response.filter((d) => d.info.areas=="Written Communication");
  if (written.length>0) {
   document.querySelector(".flush-heading0").style.display="block"
   const level1 = written.filter((d)=>d.info.levels=="Level 1")
       
   if(level1.length >0){
     console.log(level1);
     ListLevels1(level1)
   
     document.querySelector(".listBull1").style.display='block'
   }else{
     document.querySelector(".listBull1").style.display='none'
   }
  const level2 = written.filter((d)=>d.info.levels=="Level 2")
  if(level2.length!==0){
   document.querySelector(".listBull2").style.display='block'
   ListLevels2(level2)
  
  }else{
   document.querySelector(".listBull2").style.display='none'
  }
  const level3 = written.filter((d)=>d.levels=="Level 3")
  if(level3.length!==0){
   document.querySelector(".listBull3").style.display='block'
   ListLevels3(level3)
  
  }else{
   document.querySelector(".listBull3").style.display='none'
  }
  const level4 = written.filter((d)=>d.levels=="Level 4")
  if(level4.length!==0){
   document.querySelector(".listBull4").style.display='block'
  
   ListLevels4(level4)
  
  }else{
   document.querySelector(".listBull4").style.display='none'
  }
  }
 
  const Organisational = response.filter((d) => d.info.areas=="Organisational Awareness");
  if (Organisational.length>0) {
   document.querySelector(".flush-heading1").style.display="block"
   const level1 = Organisational.filter((d)=>d.info.levels=="Level 1")
      
             if(level1.length >0){
               console.log(level1);
               oListLevels1(level1)
               document.querySelector(".olistBull1").style.display='block'
             }else{
               document.querySelector(".olistBull1").style.display='none'
             }
           const level2 = Organisational.filter((d)=>d.info.levels=="Level 2")
           if(level2.length>0){
             document.querySelector(".olistBull2").style.display='block'
             console.log(level2);
             oListLevels2(level2)
           
           }else{
             document.querySelector(".olistBull2").style.display='none'
           }
           const level3 = Organisational.filter((d)=>d.info.levels=="Level 3")
           if(level3.length!==0){
             document.querySelector(".olistBull3").style.display='block'
             oListLevels3(level3)
         
           }else{
             document.querySelector(".olistBull3").style.display='none'
           }
           const level4 = Organisational.filter((d)=>d.info.levels=="Level 4")
           if(level4.length!==0){
             console.log(level4);
             document.querySelector(".olistBull4").style.display='block'
       
             oListLevels4(level4)
           
           }else{
             document.querySelector(".olistBull4").style.display='none'
           }
   
  }
  
  const  Plannning = response.filter((d) => d.info.areas=="Planning and Organising");
  if (Plannning.length>0) {
   document.querySelector(".flush-heading2").style.display="block"
 
     const level1 = Plannning.filter((d)=>d.info.levels=="Level 1")
        
               if(level1.length >0){
                 console.log(level1);
                 pListLevels1(level1)
                 document.querySelector(".plistBull1").style.display='block'
               }else{
                 document.querySelector(".plistBull1").style.display='none'
               }
             const level2 = Plannning.filter((d)=>d.info.levels=="Level 2")
             if(level2.length>0){
               document.querySelector(".plistBull2").style.display='block'
               console.log(level2);
               pListLevels2(level2)
             
             }else{
               document.querySelector(".plistBull2").style.display='none'
             }
             const level3 = Plannning.filter((d)=>d.info.levels=="Level 3")
             if(level3.length!==0){
               document.querySelector(".plistBull3").style.display='block'
               pListLevels3(level3)
           
             }else{
               document.querySelector(".plistBull3").style.display='none'
             }
             const level4 = Plannning.filter((d)=>d.info.levels=="Level 4")
             if(level4.length!==0){
               console.log(level4);
               document.querySelector(".plistBull4").style.display='block'
         
               pListLevels4(level4)
             
             }else{
               document.querySelector(".plistBull4").style.display='none'
             }
     
    
  }
  const  Monitoring = response.filter((d) => d.info.areas=="Monitoring and Control");
  if (Monitoring.length>0) {
   document.querySelector(".flush-heading3").style.display="block"
   const level1 = Monitoring.filter((d)=>d.info.levels=="Level 1")
        
               if(level1.length >0){
                 console.log(level1);
                 mListLevels1(level1)
                 document.querySelector(".mlistBull1").style.display='block'
               }else{
                 document.querySelector(".mlistBull1").style.display='none'
               }
             const level2 = Monitoring.filter((d)=>d.info.levels=="Level 2")
             if(level2.length>0){
               document.querySelector(".mlistBull2").style.display='block'
               console.log(level2);
               mListLevels2(level2)
             
             }else{
               document.querySelector(".mlistBull2").style.display='none'
             }
             const level3 = Monitoring.filter((d)=>d.info.levels=="Level 3")
             if(level3.length!==0){
               document.querySelector(".mlistBull3").style.display='block'
               mListLevels3(level3)
           
             }else{
               document.querySelector(".mlistBull3").style.display='none'
             }
             const level4 = Monitoring.filter((d)=>d.info.levels=="Level 4")
             if(level4.length!==0){
               console.log(level4);
               document.querySelector(".mlistBull4").style.display='block'
         
               mListLevels4(level4)
             
             }else{
               document.querySelector(".mlistBull4").style.display='none'
             }
     
  }
 
  const  Consulting = response.filter((d) => d.info.areas=="Consulting");
  if (Consulting.length>0) {
   document.querySelector(".flush-heading4").style.display="block"
   const level1 = Consulting.filter((d)=>d.info.levels=="Level 1")
        
               if(level1.length >0){
                 console.log(level1);
                 cListLevels1(level1)
                 document.querySelector(".clistBull1").style.display='block'
               }else{
                 document.querySelector(".clistBull1").style.display='none'
               }
             const level2 = Consulting.filter((d)=>d.info.levels=="Level 2")
             if(level2.length>0){
               document.querySelector(".clistBull2").style.display='block'
               console.log(level2);
               cListLevels2(level2)
             
             }else{
               document.querySelector(".clistBull2").style.display='none'
             }
             const level3 = Consulting.filter((d)=>d.info.levels=="Level 3")
             if(level3.length!==0){
               document.querySelector(".clistBull3").style.display='block'
               cListLevels3(level3)
           
             }else{
               document.querySelector(".clistBull3").style.display='none'
             }
             const level4 = Consulting.filter((d)=>d.info.levels=="Level 4")
             if(level4.length!==0){
               console.log(level4);
               document.querySelector(".clistBull4").style.display='block'
         
               cListLevels4(level4)
             
             }else{
               document.querySelector(".clistBull4").style.display='none'
             }
     
  }
  const  Negotiation = response.filter((d) => d.info.areas=="Negotiation");
  if (Negotiation.length>0) {
   document.querySelector(".flush-heading5").style.display="block"
   const level1 = Negotiation.filter((d)=>d.info.levels=="Level 1")
        
               if(level1.length >0){
                 console.log(level1);
                 nListLevels1(level1)
                 document.querySelector(".nlistBull1").style.display='block'
               }else{
                 document.querySelector(".nlistBull1").style.display='none'
               }
             const level2 = Consulting.filter((d)=>d.info.levels=="Level 2")
             if(level2.length>0){
               document.querySelector(".nlistBull2").style.display='block'
               console.log(level2);
               nListLevels2(level2)
             
             }else{
               document.querySelector(".nlistBull2").style.display='none'
             }
             const level3 = Consulting.filter((d)=>d.info.levels=="Level 3")
             if(level3.length!==0){
               document.querySelector(".nlistBull3").style.display='block'
               nListLevels3(level3)
           
             }else{
               document.querySelector(".nlistBull3").style.display='none'
             }
             const level4 = Consulting.filter((d)=>d.info.levels=="Level 4")
             if(level4.length!==0){
               console.log(level4);
               document.querySelector(".nlistBull4").style.display='block'
         
               nListLevels4(level4)
             
             }else{
               document.querySelector(".nlistBull4").style.display='none'
             }
     
  }
  const  Oral = response.filter((d) => d.info.areas=="Oral Communication");
  if (Oral.length>0) {
   document.querySelector(".flush-heading6").style.display="block"
   const level1 = Negotiation.filter((d)=>d.info.levels=="Level 1")
        
               if(level1.length >0){
                 console.log(level1);
                 orListLevels1(level1)
                 document.querySelector(".orlistBull1").style.display='block'
               }else{
                 document.querySelector(".orlistBull1").style.display='none'
               }
             const level2 = Consulting.filter((d)=>d.info.levels=="Level 2")
             if(level2.length>0){
               document.querySelector(".orlistBull2").style.display='block'
               console.log(level2);
               orListLevels2(level2)
             
             }else{
               document.querySelector(".orlistBull2").style.display='none'
             }
             const level3 = Consulting.filter((d)=>d.info.levels=="Level 3")
             if(level3.length!==0){
               document.querySelector(".orlistBull3").style.display='block'
               orListLevels3(level3)
           
             }else{
               document.querySelector(".orlistBull3").style.display='none'
             }
             const level4 = Consulting.filter((d)=>d.info.levels=="Level 4")
             if(level4.length!==0){
               console.log(level4);
               document.querySelector(".orlistBull4").style.display='block'
         
               orListLevels4(level4)
             
             }else{
               document.querySelector(".orlistBull4").style.display='none'
             }
 
              
  const Learning = response.filter((d) => d.info.areas=="Learning and Development ");
  if (Learning.length>0) {
   document.querySelector(".flush-heading7").style.display="block"
   const level1 = Learning.filter((d)=>d.info.levels=="Level 1")
      
             if(level1.length >0){
               console.log(level1);
               ldListLevels1(level1)
               document.querySelector(".ldlistBull1").style.display='block'
             }else{
               document.querySelector(".ldlistBull1").style.display='none'
             }
           const level2 = Learning.filter((d)=>d.info.levels=="Level 2")
           if(level2.length>0){
             document.querySelector(".ldlistBull2").style.display='block'
             console.log(level2);
             ldListLevels2(level2)
           
           }else{
             document.querySelector(".ldlistBull2").style.display='none'
           }
           const level3 = Learning.filter((d)=>d.info.levels=="Level 3")
           if(level3.length!==0){
             document.querySelector(".ldlistBull3").style.display='block'
             ldListLevels3(level3)
         
           }else{
             document.querySelector(".ldlistBull3").style.display='none'
           }
           const level4 = Learning.filter((d)=>d.info.levels=="Level 4")
           if(level4.length!==0){
             console.log(level4);
             document.querySelector(".ldlistBull4").style.display='block'
       
             ldListLevels4(level4)
           
           }else{
             document.querySelector(".ldlistBull4").style.display='none'
           }
   
  }
     
  }
 
  const Learning = response.filter((d) => d.info.areas=="Learning and Development");
  if (Learning.length>0) {
   document.querySelector(".flush-heading7").style.display="block"
   const level1 = Learning.filter((d)=>d.info.levels=="Level 1")
      
             if(level1.length >0){
               console.log(level1);
               ldListLevels1(level1)
               document.querySelector(".ldlistBull1").style.display='block'
             }else{
               document.querySelector(".ldlistBull1").style.display='none'
             }
           const level2 = Learning.filter((d)=>d.info.levels=="Level 2")
           if(level2.length>0){
             document.querySelector(".ldlistBull2").style.display='block'
             console.log(level2);
             ldListLevels2(level2)
           
           }else{
             document.querySelector(".ldlistBull2").style.display='none'
           }
           const level3 = Learning.filter((d)=>d.info.levels=="Level 3")
           if(level3.length!==0){
             document.querySelector(".ldlistBull3").style.display='block'
             ldListLevels3(level3)
         
           }else{
             document.querySelector(".ldlistBull3").style.display='none'
           }
           const level4 = Learning.filter((d)=>d.info.levels=="Level 4")
           if(level4.length!==0){
             console.log(level4);
             document.querySelector(".ldlistBull4").style.display='block'
       
             ldListLevels4(level4)
           
           }else{
             document.querySelector(".ldlistBull4").style.display='none'
           }
   
  }
  
 // const Awareness = response.filter((d) => d.areas=="Organisational Awareness");
 
 // if (Awareness.length>0) {
 //   document.querySelector(".flush-heading8").style.display="block"
 //   const level1 = Awareness.filter((d)=>d.levels=="Level 1")
      
 //             if(level1.length >0){
 //               console.log(level1);
 //               aListLevels1(level1)
 //               document.querySelector(".alistBull1").style.display='block'
 //             }else{
 //               document.querySelector(".alistBull1").style.display='none'
 //             }
 //           const level2 = Awareness.filter((d)=>d.levels=="Level 2")
 //           if(level2.length>0){
 //             document.querySelector(".alistBull2").style.display='block'
 //             console.log(level2);
 //             aListLevels2(level2)
           
 //           }else{
 //             document.querySelector(".alistBull2").style.display='none'
 //           }
 //           const level3 = Awareness.filter((d)=>d.levels=="Level 3")
 //           if(level3.length!==0){
 //             document.querySelector(".alistBull3").style.display='block'
 //             aListLevels3(level3)
         
 //           }else{
 //             document.querySelector(".alistBull3").style.display='none'
 //           }
 //           const level4 = Awareness.filter((d)=>d.levels=="Level 4")
 //           if(level4.length!==0){
 //             console.log(level4);
 //             document.querySelector(".alistBull4").style.display='block'
       
 //             aListLevels4(level4)
           
 //           }else{
 //             document.querySelector(".alistBull4").style.display='none'
 //           }
   
 //  }
 
 const  Change = response.filter((d) => d.info.areas=="Change Movement");
 
 if (Change.length>0) {
   document.querySelector(".flush-heading9").style.display="block"
   const level1 = Change.filter((d)=>d.info.levels=="Level 1")
      
             if(level1.length >0){
               console.log(level1);
               cmListLevels1(level1)
               document.querySelector(".cmlistBull1").style.display='block'
             }else{
               document.querySelector(".cmlistBull1").style.display='none'
             }
           const level2 = Change.filter((d)=>d.info.levels=="Level 2")
           if(level2.length>0){
             document.querySelector(".cmlistBull2").style.display='block'
             console.log(level2);
             cmListLevels2(level2)
           
           }else{
             document.querySelector(".cmlistBull2").style.display='none'
           }
           const level3 = Change.filter((d)=>d.info.levels=="Level 3")
           if(level3.length!==0){
             document.querySelector(".cmlistBull3").style.display='block'
             cmListLevels3(level3)
         
           }else{
             document.querySelector(".cmlistBull3").style.display='none'
           }
           const level4 = Change.filter((d)=>d.info.levels=="Level 4")
           if(level4.length!==0){
             console.log(level4);
             document.querySelector(".cmlistBull4").style.display='block'
       
             cmListLevels4(level4)
           
           }else{
             document.querySelector(".cmlistBull4").style.display='none'
           }
   
  }
 
 
 const  Technology = response.filter((d) => d.info.areas=="HR Technology information Management");
 
 
 if (Technology.length>0) {
   document.querySelector(".flush-heading10").style.display="block"
   const level1 = Technology.filter((d)=>d.info.levels=="Level 1")
      
             if(level1.length >0){
               console.log(level1);
               tListLevels1(level1)
               document.querySelector(".tlistBull1").style.display='block'
             }else{
               document.querySelector(".tlistBull1").style.display='none'
             }
           const level2 = Technology.filter((d)=>d.info.levels=="Level 2")
           if(level2.length>0){
             document.querySelector(".tlistBull2").style.display='block'
             console.log(level2);
             tListLevels2(level2)
           
           }else{
             document.querySelector(".tlistBull2").style.display='none'
           }
           const level3 = Technology.filter((d)=>d.info.levels=="Level 3")
           if(level3.length!==0){
             document.querySelector(".tlistBull3").style.display='block'
             tListLevels3(level3)
         
           }else{
             document.querySelector(".tlistBull3").style.display='none'
           }
           const level4 = Technology.filter((d)=>d.info.levels=="Level 4")
           if(level4.length!==0){
             console.log(level4);
             document.querySelector(".tlistBull4").style.display='block'
       
             tListLevels4(level4)
           
           }else{
             document.querySelector(".tlistBull4").style.display='none'
           }
   
  }
 
 const  Service = response.filter((d) => d.info.areas=="HR Service Delivery");
 if (Service.length>0) {
   document.querySelector(".flush-heading11").style.display="block"
   const level1 = Service.filter((d)=>d.info.levels=="Level 1")
      
             if(level1.length >0){
               console.log(level1);
               sListLevels1(level1)
               document.querySelector(".slistBull1").style.display='block'
             }else{
               document.querySelector(".slistBull1").style.display='none'
             }
           const level2 = Service.filter((d)=>d.info.levels=="Level 2")
           if(level2.length>0){
             document.querySelector(".slistBull2").style.display='block'
             console.log(level2);
             sListLevels2(level2)
           
           }else{
             document.querySelector(".slistBull2").style.display='none'
           }
           const level3 = Service.filter((d)=>d.info.levels=="Level 3")
           if(level3.length!==0){
             document.querySelector(".slistBull3").style.display='block'
             sListLevels3(level3)
         
           }else{
             document.querySelector(".slistBull3").style.display='none'
           }
           const level4 = Service.filter((d)=>d.info.levels=="Level 4")
           if(level4.length!==0){
             console.log(level4);
             document.querySelector(".slistBull4").style.display='block'
       
             sListLevels4(level4)
           
           }else{
             document.querySelector(".slistBull4").style.display='none'
           }
   
  }
 const  Talent = response.filter((d) => d.info.areas=="Talent Management");
 if (Talent.length>0) {
   document.querySelector(".flush-heading12").style.display="block"
   const level1 = Talent.filter((d)=>d.info.levels=="Level 1")
      
             if(level1.length >0){
               console.log(level1);
               tmListLevels1(level1)
               document.querySelector(".tmlistBull1").style.display='block'
             }else{
               document.querySelector(".tmlistBull1").style.display='none'
             }
           const level2 = Talent.filter((d)=>d.info.levels=="Level 2")
           if(level2.length>0){
             document.querySelector(".tmlistBull2").style.display='block'
             console.log(level2);
             tmListLevels2(level2)
           
           }else{
             document.querySelector(".tmlistBull2").style.display='none'
           }
           const level3 = Talent.filter((d)=>d.info.levels=="Level 3")
           if(level3.length!==0){
             document.querySelector(".tmlistBull3").style.display='block'
             tmListLevels3(level3)
         
           }else{
             document.querySelector(".tmlistBull3").style.display='none'
           }
           const level4 = Talent.filter((d)=>d.info.levels=="Level 4")
           if(level4.length!==0){
             console.log(level4);
             document.querySelector(".tmlistBull4").style.display='block'
       
             tmListLevels4(level4)
           
           }else{
             document.querySelector(".tmlistBull4").style.display='none'
           }
   
  }
 const  Workforce = response.filter((d) => d.info.areas=="Workforce Planning");
 
 if (Workforce.length>0) {
   document.querySelector(".flush-heading13").style.display="block"
   const level1 = Workforce.filter((d)=>d.info.levels=="Level 1")
      
             if(level1.length >0){
               console.log(level1);
               wListLevels1(level1)
               document.querySelector(".wlistBull1").style.display='block'
             }else{
               document.querySelector(".wlistBull1").style.display='none'
             }
           const level2 = Workforce.filter((d)=>d.info.levels=="Level 2")
           if(level2.length>0){
             document.querySelector(".wlistBull2").style.display='block'
             console.log(level2);
             wListLevels2(level2)
           
           }else{
             document.querySelector(".wlistBull2").style.display='none'
           }
           const level3 = Workforce.filter((d)=>d.info.levels=="Level 3")
           if(level3.length!==0){
             document.querySelector(".wlistBull3").style.display='block'
             wListLevels3(level3)
         
           }else{
             document.querySelector(".wlistBull3").style.display='none'
           }
           const level4 = Workforce.filter((d)=>d.info.levels=="Level 4")
           if(level4.length!==0){
             console.log(level4);
             document.querySelector(".wlistBull4").style.display='block'
       
             wListLevels4(level4)
           
           }else{
             document.querySelector(".wlistBull4").style.display='none'
           }
   
  }
  const  Learningdevelopment = response.filter((d) => d.info.areas=="Learning and Develepment");
  if (Learningdevelopment.length>0) {
   document.querySelector(".flush-heading14").style.display="block"
   const level1 = Learningdevelopment.filter((d)=>d.info.levels=="Level 1")
      
             if(level1.length >0){
               console.log(level1);
               dlListLevels1(level1)
               document.querySelector(".dllistBull1").style.display='block'
             }else{
               document.querySelector(".dllistBull1").style.display='none'
             }
           const level2 = Learningdevelopment.filter((d)=>d.info.levels=="Level 2")
           if(level2.length>0){
             document.querySelector(".dllistBull2").style.display='block'
             console.log(level2);
             dlListLevels2(level2)
           
           }else{
             document.querySelector(".dllistBull2").style.display='none'
           }
           const level3 = Learningdevelopment.filter((d)=>d.info.levels=="Level 3")
           if(level3.length!==0){
             document.querySelector(".dllistBull3").style.display='block'
             dlListLevels3(level3)
         
           }else{
             document.querySelector(".dllistBull3").style.display='none'
           }
           const level4 = Learningdevelopment.filter((d)=>d.info.levels=="Level 4")
           if(level4.length!==0){
             console.log(level4);
             document.querySelector(".dllistBull4").style.display='block'
       
             dlListLevels4(level4)
           
           }else{
             document.querySelector(".dllistBull4").style.display='none'
           }
   
  }
  
  const  Occupational = response.filter((d) => d.info.areas=="Occupational Health and Safety");
  
  if (Occupational.length>0) {
   document.querySelector(".flush-heading15").style.display="block"
   const level1 = Occupational.filter((d)=>d.info.levels=="Level 1")
      
             if(level1.length >0){
               console.log(level1);
               ohListLevels1(level1)
               document.querySelector(".ohlistBull1").style.display='block'
             }else{
               document.querySelector(".ohlistBull1").style.display='none'
             }
           const level2 = Occupational.filter((d)=>d.info.levels=="Level 2")
           if(level2.length>0){
             document.querySelector(".ohlistBull2").style.display='block'
             console.log(level2);
             ohListLevels2(level2)
           
           }else{
             document.querySelector(".ohlistBull2").style.display='none'
           }
           const level3 = Occupational.filter((d)=>d.info.levels=="Level 3")
           if(level3.length!==0){
             document.querySelector(".ohlistBull3").style.display='block'
             ohListLevels3(level3)
         
           }else{
             document.querySelector(".ohlistBull3").style.display='none'
           }
           const level4 = Occupational.filter((d)=>d.info.levels=="Level 4")
           if(level4.length!==0){
             console.log(level4);
             document.querySelector(".ohlistBull4").style.display='block'
       
             ohListLevels4(level4)
           
           }else{
             document.querySelector(".ohlistBull4").style.display='none'
           }
   
  }
   const Perfomance = response.filter((d) => d.info.areas=="Performance Management");
 
 if (Perfomance.length>0) {
     document.querySelector(".flush-heading16").style.display="block"
     const level1 = Perfomance.filter((d)=>d.info.levels=="Level 1")
        
               if(level1.length >0){
                 console.log(level1);
                 peListLevels1(level1)
                 document.querySelector(".pelistBull1").style.display='block'
               }else{
                 document.querySelector(".pelistBull1").style.display='none'
               }
             const level2 = Perfomance.filter((d)=>d.info.levels=="Level 2")
             if(level2.length>0){
               document.querySelector(".pelistBull2").style.display='block'
               console.log(level2);
               peListLevels2(level2)
             
             }else{
               document.querySelector(".pelistBull2").style.display='none'
             }
             const level3 = Perfomance.filter((d)=>d.info.levels=="Level 3")
             if(level3.length!==0){
               document.querySelector(".pelistBull3").style.display='block'
               peListLevels3(level3)
           
             }else{
               document.querySelector(".pelistBull3").style.display='none'
             }
             const level4 = Perfomance.filter((d)=>d.info.levels=="Level 4")
             if(level4.length!==0){
               console.log(level4);
               document.querySelector(".pelistBull4").style.display='block'
         
               peListLevels4(level4)
             
             }else{
               document.querySelector(".pelistBull4").style.display='none'
             }
     
    }
 const  Industrial = response.filter((d) => d.info.areas=="Industrial and Labour Relations");
 
   if (Industrial.length>0) {
     document.querySelector(".flush-heading17").style.display="block"
     const level1 = Industrial.filter((d)=>d.info.levels=="Level 1")
        
               if(level1.length >0){
                 console.log(level1);
                 inListLevels1(level1)
                 document.querySelector(".inlistBull1").style.display='block'
               }else{
                 document.querySelector(".inlistBull1").style.display='none'
               }
             const level2 = Industrial.filter((d)=>d.info.levels=="Level 2")
             if(level2.length>0){
               document.querySelector(".inlistBull2").style.display='block'
               console.log(level2);
               inListLevels2(level2)
             
             }else{
               document.querySelector(".inlistBull2").style.display='none'
             }
             const level3 = Industrial.filter((d)=>d.info.levels=="Level 3")
             if(level3.length!==0){
               document.querySelector(".inlistBull3").style.display='block'
               inListLevels3(level3)
           
             }else{
               document.querySelector(".inlistBull3").style.display='none'
             }
             const level4 = Industrial.filter((d)=>d.info.levels=="Level 4")
             if(level4.length!==0){
               console.log(level4);
               document.querySelector(".inlistBull4").style.display='block'
         
               inListLevels4(level4)
             
             }else{
               document.querySelector(".inlistBull4").style.display='none'
             }
     
    }
 const  Interpersonal = response.filter((d) => d.info.areas=="Interpersonal Relationships");
 
 if (Interpersonal.length>0) {
     document.querySelector(".flush-heading18").style.display="block"
     const level1 = Interpersonal.filter((d)=>d.info.levels=="Level 1")
        
               if(level1.length >0){
                 console.log(level1);
                 intListLevels1(level1)
                 document.querySelector(".intlistBull1").style.display='block'
               }else{
                 document.querySelector(".intlistBull1").style.display='none'
               }
             const level2 = Interpersonal.filter((d)=>d.info.levels=="Level 2")
             if(level2.length>0){
               document.querySelector(".intlistBull2").style.display='block'
               console.log(level2);
               intListLevels2(level2)
             
             }else{
               document.querySelector(".intlistBull2").style.display='none'
             }
             const level3 = Interpersonal.filter((d)=>d.info.levels=="Level 3")
             if(level3.length!==0){
               document.querySelector(".intlistBull3").style.display='block'
               intListLevels3(level3)
           
             }else{
               document.querySelector(".intlistBull3").style.display='none'
             }
             const level4 = Interpersonal.filter((d)=>d.info.levels=="Level 4")
             if(level4.length!==0){
               console.log(level4);
               document.querySelector(".intlistBull4").style.display='block'
         
               intListLevels4(level4)
             
             }else{
               document.querySelector(".intlistBull4").style.display='none'
             }
     
    }
 
 const  Communication = response.filter((d) => d.info.areas=="Communication");
 if (Communication.length>0) {
   document.querySelector(".flush-heading19").style.display="block"
   const level1 = Communication.filter((d)=>d.info.levels=="Level 1")
      
             if(level1.length >0){
               console.log(level1);
               comListLevels1(level1)
               document.querySelector(".comlistBull1").style.display='block'
             }else{
               document.querySelector(".comlistBull1").style.display='none'
             }
           const level2 = Communication.filter((d)=>d.info.levels=="Level 2")
           if(level2.length>0){
             document.querySelector(".comlistBull2").style.display='block'
             console.log(level2);
             comListLevels2(level2)
           
           }else{
             document.querySelector(".comlistBull2").style.display='none'
           }
           const level3 = Communication.filter((d)=>d.info.levels=="Level 3")
           if(level3.length!==0){
             document.querySelector(".comlistBull3").style.display='block'
             comListLevels3(level3)
         
           }else{
             document.querySelector(".comlistBull3").style.display='none'
           }
           const level4 = Communication.filter((d)=>d.info.levels=="Level 4")
           if(level4.length!==0){
             console.log(level4);
             document.querySelector(".comlistBull4").style.display='block'
       
             comListLevels4(level4)
           
           }else{
             document.querySelector(".comlistBull4").style.display='none'
           }
   
  }
   const Delivery = response.filter((d) => d.info.areas=="Service Delivery orientation");
   if (Delivery.length>0) {
     document.querySelector(".flush-heading20").style.display="block"
     const level1 = Delivery.filter((d)=>d.info.levels=="Level 1")
        
               if(level1.length >0){
                 console.log(level1);
                 sdoListLevels1(level1)
                 document.querySelector(".sdolistBull1").style.display='block'
               }else{
                 document.querySelector(".sdolistBull1").style.display='none'
               }
             const level2 = Delivery.filter((d)=>d.info.levels=="Level 2")
             if(level2.length>0){
               document.querySelector(".sdolistBull2").style.display='block'
               console.log(level2);
               sdoListLevels2(level2)
             
             }else{
               document.querySelector(".sdolistBull2").style.display='none'
             }
             const level3 = Delivery.filter((d)=>d.info.levels=="Level 3")
             if(level3.length!==0){
               document.querySelector(".sdolistBull3").style.display='block'
               sdoListLevels3(level3)
           
             }else{
               document.querySelector(".sdolistBull3").style.display='none'
             }
             const level4 = Delivery.filter((d)=>d.info.levels=="Level 4")
             if(level4.length!==0){
               console.log(level4);
               document.querySelector(".sdolistBull4").style.display='block'
         
               sdoListLevels4(level4)
             
             }else{
               document.querySelector(".sdolistBull4").style.display='none'
             }
     
    }
   const  Action = response.filter((d) => d.info.areas=="Action and Outcome Orientation");
   if (Action.length>0) {
     document.querySelector(".flush-heading21").style.display="block"
     const level1 = Action.filter((d)=>d.info.levels=="Level 1")
        
               if(level1.length >0){
                 console.log(level1);
                 actListLevels1(level1)
                 document.querySelector(".actlistBull1").style.display='block'
               }else{
                 document.querySelector(".actlistBull1").style.display='none'
               }
             const level2 = Action.filter((d)=>d.info.levels=="Level 2")
             if(level2.length>0){
               document.querySelector(".actlistBull2").style.display='block'
               console.log(level2);
               actListLevels2(level2)
             
             }else{
               document.querySelector(".actlistBull2").style.display='none'
             }
             const level3 = Action.filter((d)=>d.info.levels=="Level 3")
             if(level3.length!==0){
               document.querySelector(".actlistBull3").style.display='block'
               actListLevels3(level3)
           
             }else{
               document.querySelector(".actlistBull3").style.display='none'
             }
             const level4 = Action.filter((d)=>d.info.levels=="Level 4")
             if(level4.length!==0){
               console.log(level4);
               document.querySelector(".actlistBull4").style.display='block'
         
               actListLevels4(level4)
             
             }else{
               document.querySelector(".actlistBull4").style.display='none'
             }
     
    }
 const  Conflict = response.filter((d) => d.info.areas=="Conflict Management");
 if (Conflict.length>0) {
   document.querySelector(".flush-heading22").style.display="block"
   const level1 = Conflict.filter((d)=>d.info.levels=="Level 1")
      
             if(level1.length >0){
               console.log(level1);
               conListLevels1(level1)
               document.querySelector(".conlistBull1").style.display='block'
             }else{
               document.querySelector(".conlistBull1").style.display='none'
             }
           const level2 = Conflict.filter((d)=>d.info.levels=="Level 2")
           if(level2.length>0){
             document.querySelector(".conlistBull2").style.display='block'
             console.log(level2);
             conListLevels2(level2)
           
           }else{
             document.querySelector(".conlistBull2").style.display='none'
           }
           const level3 = Conflict.filter((d)=>d.info.levels=="Level 3")
           if(level3.length!==0){
             document.querySelector(".conlistBull3").style.display='block'
             conListLevels3(level3)
         
           }else{
             document.querySelector(".conlistBull3").style.display='none'
           }
           const level4 = Conflict.filter((d)=>d.info.levels=="Level 4")
           if(level4.length!==0){
             console.log(level4);
             document.querySelector(".conlistBull4").style.display='block'
       
             conListLevels4(level4)
           
           }else{
             document.querySelector(".conlistBull4").style.display='none'
           }
   
  }
  const  Orientation = response.filter((d) => d.info.areas=="Learning Orientation");
  if (Orientation.length>0) {
   document.querySelector(".flush-heading23").style.display="block"
   const level1 = Orientation.filter((d)=>d.info.levels=="Level 1")
      
             if(level1.length >0){
               console.log(level1);
               loListLevels1(level1)
               document.querySelector(".lolistBull1").style.display='block'
             }else{
               document.querySelector(".lolistBull1").style.display='none'
             }
           const level2 = Orientation.filter((d)=>d.info.levels=="Level 2")
           if(level2.length>0){
             document.querySelector(".lolistBull2").style.display='block'
             console.log(level2);
             loListLevels2(level2)
           
           }else{
             document.querySelector(".lolistBull2").style.display='none'
           }
           const level3 = Orientation.filter((d)=>d.info.levels=="Level 3")
           if(level3.length!==0){
             document.querySelector(".lolistBull3").style.display='block'
             loListLevels3(level3)
         
           }else{
             document.querySelector(".lolistBull3").style.display='none'
           }
           const level4 = Orientation.filter((d)=>d.info.levels=="Level 4")
           if(level4.length!==0){
             console.log(level4);
             document.querySelector(".lolistBull4").style.display='block'
       
             loListLevels4(level4)
           
           }else{
             document.querySelector(".lolistBull4").style.display='none'
           }
   
  }
 const  Accountability = response.filter((d) => d.info.areas=="Accountability and Ethical Conduct");
 if (Accountability.length>0) {
   document.querySelector(".flush-heading24").style.display="block"
   const level1 = Accountability.filter((d)=>d.info.levels=="Level 1")
      
             if(level1.length >0){
               console.log(level1);
               aeListLevels1(level1)
               document.querySelector(".aelistBull1").style.display='block'
             }else{
               document.querySelector(".aelistBull1").style.display='none'
             }
           const level2 = Accountability.filter((d)=>d.info.levels=="Level 2")
           if(level2.length>0){
             document.querySelector(".aelistBull2").style.display='block'
             console.log(level2);
             aeListLevels2(level2)
           
           }else{
             document.querySelector(".aelistBull2").style.display='none'
           }
           const level3 = Accountability.filter((d)=>d.info.levels=="Level 3")
           if(level3.length!==0){
             document.querySelector(".aelistBull3").style.display='block'
             aeListLevels3(level3)
         
           }else{
             document.querySelector(".aelistBull3").style.display='none'
           }
           const level4 = Accountability.filter((d)=>d.info.levels=="Level 4")
           if(level4.length!==0){
             console.log(level4);
             document.querySelector(".aelistBull4").style.display='block'
       
             aeListLevels4(level4)
           
           }else{
             document.querySelector(".aelistBull4").style.display='none'
           }
   
  }
  const   Problem = response.filter((d) => d.info.areas=="Problem Solving and Analysis");
  if (Problem.length>0) {
   document.querySelector(".flush-heading25").style.display="block"
   const level1 = Problem.filter((d)=>d.info.levels=="Level 1")
      
             if(level1.length >0){
               console.log(level1);
               psListLevels1(level1)
               document.querySelector(".pslistBull1").style.display='block'
             }else{
               document.querySelector(".pslistBull1").style.display='none'
             }
           const level2 = Problem.filter((d)=>d.info.levels=="Level 2")
           if(level2.length>0){
             document.querySelector(".pslistBull2").style.display='block'
             console.log(level2);
             psListLevels2(level2)
           
           }else{
             document.querySelector(".pslistBull2").style.display='none'
           }
           const level3 = Problem.filter((d)=>d.info.levels=="Level 3")
           if(level3.length!==0){
             document.querySelector(".pslistBull3").style.display='block'
             psListLevels3(level3)
         
           }else{
             document.querySelector(".pslistBull3").style.display='none'
           }
           const level4 = Problem.filter((d)=>d.info.levels=="Level 4")
           if(level4.length!==0){
             console.log(level4);
             document.querySelector(".pslistBull4").style.display='block'
       
             psListLevels4(level4)
           
           }else{
             document.querySelector(".pslistBull4").style.display='none'
           }
   
  }
 
  const   Compensation = response.filter((d) => d.info.areas=="Compensation and Benefits Management");
  if (Compensation.length>0) {
   document.querySelector(".flush-heading26").style.display="block"
   const level1 = Compensation.filter((d)=>d.info.levels=="Level 1")
      
             if(level1.length >0){
               console.log(level1);
               cbListLevels1(level1)
               document.querySelector(".cblistBull1").style.display='block'
             }else{
               document.querySelector(".cblistBull1").style.display='none'
             }
           const level2 = Compensation.filter((d)=>d.info.levels=="Level 2")
           if(level2.length>0){
             document.querySelector(".cblistBull2").style.display='block'
             console.log(level2);
             cbListLevels2(level2)
           
           }else{
             document.querySelector(".cblistBull2").style.display='none'
           }
           const level3 = Compensation.filter((d)=>d.info.levels=="Level 3")
           if(level3.length!==0){
             document.querySelector(".cblistBull3").style.display='block'
             cbListLevels3(level3)
         
           }else{
             document.querySelector(".cblistBull3").style.display='none'
           }
           const level4 = Compensation.filter((d)=>d.info.levels=="Level 4")
           if(level4.length!==0){
             console.log(level4);
             document.querySelector(".cblistBull4").style.display='block'
       
             cbListLevels4(level4)
           
           }else{
             document.querySelector(".cblistBull4").style.display='none'
           }
   
  }
 
  const   EmployeeWellness = response.filter((d) => d.info.areas=="Employee Wellness");
  if (EmployeeWellness.length>0) {
   document.querySelector(".flush-heading27").style.display="block"
   const level1 = EmployeeWellness.filter((d)=>d.info.levels=="Level 1")
      
             if(level1.length >0){
               console.log(level1);
               ewListLevels1(level1)
               document.querySelector(".ewlistBull1").style.display='block'
             }else{
               document.querySelector(".ewlistBull1").style.display='none'
             }
           const level2 = EmployeeWellness.filter((d)=>d.info.levels=="Level 2")
           if(level2.length>0){
             document.querySelector(".ewlistBull2").style.display='block'
             console.log(level2);
             ewListLevels2(level2)
           
           }else{
             document.querySelector(".ewlistBull2").style.display='none'
           }
           const level3 = EmployeeWellness.filter((d)=>d.info.levels=="Level 3")
           if(level3.length!==0){
             document.querySelector(".ewlistBull3").style.display='block'
             ewListLevels3(level3)
         
           }else{
             document.querySelector(".ewlistBull3").style.display='none'
           }
           const level4 = EmployeeWellness.filter((d)=>d.info.levels=="Level 4")
           if(level4.length!==0){
             console.log(level4);
             document.querySelector(".ewlistBull4").style.display='block'
       
             ewListLevels4(level4)
           
           }else{
             document.querySelector(".ewlistBull4").style.display='none'
           }
   
  }
 
  const   Resilience = response.filter((d) => d.info.areas=="Resilience");
  if (Resilience.length>0) {
   document.querySelector(".flush-heading28").style.display="block"
   const level1 = Resilience.filter((d)=>d.info.levels=="Level 1")
      
             if(level1.length >0){
               console.log(level1);
               rsListLevels1(level1)
               document.querySelector(".rslistBull1").style.display='block'
             }else{
               document.querySelector(".rslistBull1").style.display='none'
             }
           const level2 = Resilience.filter((d)=>d.info.levels=="Level 2")
           if(level2.length>0){
             document.querySelector(".rslistBull2").style.display='block'
             console.log(level2);
             rsListLevels2(level2)
           
           }else{
             document.querySelector(".rslistBull2").style.display='none'
           }
           const level3 = Resilience.filter((d)=>d.info.levels=="Level 3")
           if(level3.length!==0){
             document.querySelector(".rslistBull3").style.display='block'
             rsListLevels3(level3)
         
           }else{
             document.querySelector(".rslistBull3").style.display='none'
           }
           const level4 = Resilience.filter((d)=>d.info.levels=="Level 4")
           if(level4.length!==0){
             console.log(level4);
             document.querySelector(".rslistBull4").style.display='block'
       
             rsListLevels4(level4)
           
           }else{
             document.querySelector(".rslistBull4").style.display='none'
           }
   
  }
 
  const   DirectionSetting = response.filter((d) => d.info.areas=="Direction Setting");
  if (DirectionSetting.length>0) {
   document.querySelector(".flush-heading29").style.display="block"
   const level1 = DirectionSetting.filter((d)=>d.info.levels=="Level 1")
      
             if(level1.length >0){
               console.log(level1);
               drListLevels1(level1)
               document.querySelector(".drlistBull1").style.display='block'
             }else{
               document.querySelector(".drlistBull1").style.display='none'
             }
           const level2 = DirectionSetting.filter((d)=>d.info.levels=="Level 2")
           if(level2.length>0){
             document.querySelector(".drlistBull2").style.display='block'
             console.log(level2);
             drListLevels2(level2)
           
           }else{
             document.querySelector(".drlistBull2").style.display='none'
           }
           const level3 = DirectionSetting.filter((d)=>d.info.levels=="Level 3")
           if(level3.length!==0){
             document.querySelector(".drlistBull3").style.display='block'
             drListLevels3(level3)
         
           }else{
             document.querySelector(".drlistBull3").style.display='none'
           }
           const level4 = DirectionSetting.filter((d)=>d.info.levels=="Level 4")
           if(level4.length!==0){
             console.log(level4);
             document.querySelector(".drlistBull4").style.display='block'
       
             drListLevels4(level4)
           
           }else{
             document.querySelector(".drlistBull4").style.display='none'
           }
   
  }
 
  const   ImpactandInfluence = response.filter((d) => d.info.areas=="Impact and Influence");
  if (ImpactandInfluence.length>0) {
   document.querySelector(".flush-heading30").style.display="block"
   const level1 = ImpactandInfluence.filter((d)=>d.info.levels=="Level 1")
      
             if(level1.length >0){
               console.log(level1);
               iiListLevels1(level1)
               document.querySelector(".iilistBull1").style.display='block'
             }else{
               document.querySelector(".iilistBull1").style.display='none'
             }
           const level2 = ImpactandInfluence.filter((d)=>d.info.levels=="Level 2")
           if(level2.length>0){
             document.querySelector(".iilistBull2").style.display='block'
             console.log(level2);
             iiListLevels2(level2)
           
           }else{
             document.querySelector(".iilistBull2").style.display='none'
           }
           const level3 = ImpactandInfluence.filter((d)=>d.info.levels=="Level 3")
           if(level3.length!==0){
             document.querySelector(".iilistBull3").style.display='block'
             iiListLevels3(level3)
         
           }else{
             document.querySelector(".iilistBull3").style.display='none'
           }
           const level4 = ImpactandInfluence.filter((d)=>d.info.levels=="Level 4")
           if(level4.length!==0){
             console.log(level4);
             document.querySelector(".iilistBull4").style.display='block'
       
             iiListLevels4(level4)
           
           }else{
             document.querySelector(".iilistBull4").style.display='none'
           }
   
  }
 
  const   CoachingandMentoring = response.filter((d) => d.info.areas=="Coaching and Mentoring");
  if (CoachingandMentoring.length>0) {
   document.querySelector(".flush-heading31").style.display="block"
   const level1 = CoachingandMentoring.filter((d)=>d.info.levels=="Level 1")
      
             if(level1.length >0){
               console.log(level1);
               menListLevels1(level1)
               document.querySelector(".menlistBull1").style.display='block'
             }else{
               document.querySelector(".menlistBull1").style.display='none'
             }
           const level2 = CoachingandMentoring.filter((d)=>d.info.levels=="Level 2")
           if(level2.length>0){
             document.querySelector(".menlistBull2").style.display='block'
             console.log(level2);
             menListLevels2(level2)
           
           }else{
             document.querySelector(".menlistBull2").style.display='none'
           }
           const level3 = CoachingandMentoring.filter((d)=>d.info.levels=="Level 3")
           if(level3.length!==0){
             document.querySelector(".menlistBull3").style.display='block'
             menListLevels3(level3)
         
           }else{
             document.querySelector(".menlistBull3").style.display='none'
           }
           const level4 = CoachingandMentoring.filter((d)=>d.info.levels=="Level 4")
           if(level4.length!==0){
             console.log(level4);
             document.querySelector(".menlistBull4").style.display='block'
       
             menListLevels4(level4)
           
           }else{
             document.querySelector(".menlistBull4").style.display='none'
           }
   
  }
 
  const   TeamOrientation= response.filter((d) => d.info.areas=="Team Orientation");
  if (TeamOrientation.length>0) {
   document.querySelector(".flush-heading32").style.display="block"
   const level1 = TeamOrientation.filter((d)=>d.info.levels=="Level 1")
      
             if(level1.length >0){
               console.log(level1);
               toListLevels1(level1)
               document.querySelector(".tolistBull1").style.display='block'
             }else{
               document.querySelector(".tolistBull1").style.display='none'
             }
           const level2 = TeamOrientation.filter((d)=>d.info.levels=="Level 2")
           if(level2.length>0){
             document.querySelector(".tolistBull2").style.display='block'
             console.log(level2);
             toListLevels2(level2)
           
           }else{
             document.querySelector(".tolistBull2").style.display='none'
           }
           const level3 = TeamOrientation.filter((d)=>d.info.levels=="Level 3")
           if(level3.length!==0){
             document.querySelector(".tolistBull3").style.display='block'
             toListLevels3(level3)
         
           }else{
             document.querySelector(".tolistBull3").style.display='none'
           }
           const level4 = TeamOrientation.filter((d)=>d.info.levels=="Level 4")
           if(level4.length!==0){
             console.log(level4);
             document.querySelector(".tolistBull4").style.display='block'
       
             toListLevels4(level4)
           
           }else{
             document.querySelector(".tolistBull4").style.display='none'
           }
   
  }

  const   InternalAuditing  = response.filter((d) => d.info.areas=="Internal Auditing");
  if (InternalAuditing.length>0) {
   document.querySelector(".flush-heading33").style.display="block"
   const level1 = InternalAuditing.filter((d)=>d.info.levels=="Level 1")
      
             if(level1.length >0){
               console.log(level1);
               ioListLevels1(level1)
               document.querySelector(".iolistBull1").style.display='block'
             }else{
               document.querySelector(".iolistBull1").style.display='none'
             }
           const level2 = InternalAuditing.filter((d)=>d.info.levels=="Level 2")
           if(level2.length>0){
             document.querySelector(".iolistBull2").style.display='block'
             console.log(level2);
             ioListLevels2(level2)
           
           }else{
             document.querySelector(".iolistBull2").style.display='none'
           }
           const level3 = InternalAuditing.filter((d)=>d.info.levels=="Level 3")
           if(level3.length!==0){
             document.querySelector(".iolistBull3").style.display='block'
             ioListLevels3(level3)
         
           }else{
             document.querySelector(".iolistBull3").style.display='none'
           }
           const level4 = InternalAuditing.filter((d)=>d.info.levels=="Level 4")
           if(level4.length!==0){
             console.log(level4);
             document.querySelector(".iolistBull4").style.display='block'
       
             ioListLevels4(level4)
           
           }else{
             document.querySelector(".iolistBull4").style.display='none'
           }
   
  }

  const   EngagementManagement  = response.filter((d) => d.info.areas=="Engagement Management");
  if (EngagementManagement.length>0) {
   document.querySelector(".flush-heading34").style.display="block"
   const level1 = EngagementManagement.filter((d)=>d.info.levels=="Level 1")
      
             if(level1.length >0){
               console.log(level1);
               emListLevels1(level1)
               document.querySelector(".emlistBull1").style.display='block'
             }else{
               document.querySelector(".emlistBull1").style.display='none'
             }
           const level2 = EngagementManagement.filter((d)=>d.info.levels=="Level 2")
           if(level2.length>0){
             document.querySelector(".emlistBull2").style.display='block'
             console.log(level2);
             emListLevels2(level2)
           
           }else{
             document.querySelector(".emlistBull2").style.display='none'
           }
           const level3 = EngagementManagement.filter((d)=>d.info.levels=="Level 3")
           if(level3.length!==0){
             document.querySelector(".emlistBull3").style.display='block'
             emListLevels3(level3)
         
           }else{
             document.querySelector(".emlistBull3").style.display='none'
           }
           const level4 = EngagementManagement.filter((d)=>d.info.levels=="Level 4")
           if(level4.length!==0){
             console.log(level4);
             document.querySelector(".emlistBull4").style.display='block'
       
             emListLevels4(level4)
           
           }else{
             document.querySelector(".emlistBull4").style.display='none'
           }
   
  }
  
  const   InformationManagement  = response.filter((d) => d.info.areas=="Information Management");
  if (InformationManagement.length>0) {
   document.querySelector(".flush-heading35").style.display="block"
   const level1 = InformationManagement.filter((d)=>d.info.levels=="Level 1")
      
             if(level1.length >0){
               console.log(level1);
               imListLevels1(level1)
               document.querySelector(".imlistBull1").style.display='block'
             }else{
               document.querySelector(".imlistBull1").style.display='none'
             }
           const level2 = InformationManagement.filter((d)=>d.info.levels=="Level 2")
           if(level2.length>0){
             document.querySelector(".imlistBull2").style.display='block'
             console.log(level2);
             imListLevels2(level2)
           
           }else{
             document.querySelector(".imlistBull2").style.display='none'
           }
           const level3 = InformationManagement.filter((d)=>d.info.levels=="Level 3")
           if(level3.length!==0){
             document.querySelector(".imlistBull3").style.display='block'
             imListLevels3(level3)
         
           }else{
             document.querySelector(".imlistBull3").style.display='none'
           }
           const level4 = InformationManagement.filter((d)=>d.info.levels=="Level 4")
           if(level4.length!==0){
             console.log(level4);
             document.querySelector(".imlistBull4").style.display='block'
       
             imListLevels4(level4)
           
           }else{
             document.querySelector(".imlistBull4").style.display='none'
           }
   
  }
  const   ResearchandAnalysis  = response.filter((d) => d.info.areas=="Research and Analysis");
  if (ResearchandAnalysis.length>0) {
   document.querySelector(".flush-heading36").style.display="block"
   const level1 = ResearchandAnalysis.filter((d)=>d.info.levels=="Level 1")
      
             if(level1.length >0){
               console.log(level1);
               raListLevels1(level1)
               document.querySelector(".ralistBull1").style.display='block'
             }else{
               document.querySelector(".ralistBull1").style.display='none'
             }
           const level2 = ResearchandAnalysis.filter((d)=>d.info.levels=="Level 2")
           if(level2.length>0){
             document.querySelector(".ralistBull2").style.display='block'
             console.log(level2);
             raListLevels2(level2)
           
           }else{
             document.querySelector(".ralistBull2").style.display='none'
           }
           const level3 = ResearchandAnalysis.filter((d)=>d.info.levels=="Level 3")
           if(level3.length!==0){
             document.querySelector(".ralistBull3").style.display='block'
             raListLevels3(level3)
         
           }else{
             document.querySelector(".ralistBull3").style.display='none'
           }
           const level4 = ResearchandAnalysis.filter((d)=>d.info.levels=="Level 4")
           if(level4.length!==0){
             console.log(level4);
             document.querySelector(".ralistBull4").style.display='block'
       
             raListLevels4(level4)
           
           }else{
             document.querySelector(".ralistBull4").style.display='none'
           }
   
  }

  const   AdvocacyNegotiation  = response.filter((d) => d.info.areas=="Advocacy / Negotiation");
  if (AdvocacyNegotiation.length>0) {
   document.querySelector(".flush-heading37").style.display="block"
   const level1 = AdvocacyNegotiation.filter((d)=>d.info.levels=="Level 1")
      
             if(level1.length >0){
               console.log(level1);
               anListLevels1(level1)
               document.querySelector(".anlistBull1").style.display='block'
             }else{
               document.querySelector(".anlistBull1").style.display='none'
             }
           const level2 = AdvocacyNegotiation.filter((d)=>d.info.levels=="Level 2")
           if(level2.length>0){
             document.querySelector(".anlistBull2").style.display='block'
             console.log(level2);
             anListLevels2(level2)
           
           }else{
             document.querySelector(".anlistBull2").style.display='none'
           }
           const level3 = AdvocacyNegotiation.filter((d)=>d.info.levels=="Level 3")
           if(level3.length!==0){
             document.querySelector(".anlistBull3").style.display='block'
             anListLevels3(level3)
         
           }else{
             document.querySelector(".anlistBull3").style.display='none'
           }
           const level4 = AdvocacyNegotiation.filter((d)=>d.info.levels=="Level 4")
           if(level4.length!==0){
             console.log(level4);
             document.querySelector(".anlistBull4").style.display='block'
       
             anListLevels4(level4)
           
           }else{
             document.querySelector(".anlistBull4").style.display='none'
           }
   
  }

  const   EthicsandProfessionalism  = response.filter((d) => d.info.areas=="Ethics and Professionalism");
  if (EthicsandProfessionalism.length>0) {
   document.querySelector(".flush-heading38").style.display="block"
   const level1 = EthicsandProfessionalism.filter((d)=>d.info.levels=="Level 1")
      
             if(level1.length >0){
               console.log(level1);
               epListLevels1(level1)
               document.querySelector(".eplistBull1").style.display='block'
             }else{
               document.querySelector(".eplistBull1").style.display='none'
             }
           const level2 = EthicsandProfessionalism.filter((d)=>d.info.levels=="Level 2")
           if(level2.length>0){
             document.querySelector(".eplistBull2").style.display='block'
             console.log(level2);
             epListLevels2(level2)
           
           }else{
             document.querySelector(".eplistBull2").style.display='none'
           }
           const level3 = EthicsandProfessionalism.filter((d)=>d.info.levels=="Level 3")
           if(level3.length!==0){
             document.querySelector(".eplistBull3").style.display='block'
             epListLevels3(level3)
         
           }else{
             document.querySelector(".eplistBull3").style.display='none'
           }
           const level4 = EthicsandProfessionalism.filter((d)=>d.info.levels=="Level 4")
           if(level4.length!==0){
             console.log(level4);
             document.querySelector(".eplistBull4").style.display='block'
       
             epListLevels4(level4)
           
           }else{
             document.querySelector(".eplistBull4").style.display='none'
           }
   
  }
  const   StrategicCapability  = response.filter((d) => d.info.areas=="Strategic Capability / Leadership or Direction Setting");
  if (StrategicCapability.length>0) {
   document.querySelector(".flush-heading39").style.display="block"
   const level1 = StrategicCapability.filter((d)=>d.info.levels=="Level 1")
      
             if(level1.length >0){
               console.log(level1);
               scListLevels1(level1)
               document.querySelector(".sclistBull1").style.display='block'
             }else{
               document.querySelector(".sclistBull1").style.display='none'
             }
           const level2 = StrategicCapability.filter((d)=>d.info.levels=="Level 2")
           if(level2.length>0){
             document.querySelector(".sclistBull2").style.display='block'
             console.log(level2);
             scListLevels2(level2)
           
           }else{
             document.querySelector(".sclistBull2").style.display='none'
           }
           const level3 = StrategicCapability.filter((d)=>d.info.levels=="Level 3")
           if(level3.length!==0){
             document.querySelector(".sclistBull3").style.display='block'
             scListLevels3(level3)
         
           }else{
             document.querySelector(".sclistBull3").style.display='none'
           }
           const level4 = StrategicCapability.filter((d)=>d.info.levels=="Level 4")
           if(level4.length!==0){
             console.log(level4);
             document.querySelector(".sclistBull4").style.display='block'
       
             scListLevels4(level4)
           
           }else{
             document.querySelector(".sclistBull4").style.display='none'
           }
   
  }

  const   ChangeReadiness  = response.filter((d) => d.info.areas=="Change Readiness");
  if (ChangeReadiness.length>0) {
   document.querySelector(".flush-heading40").style.display="block"
   const level1 = ChangeReadiness.filter((d)=>d.info.levels=="Level 1")
      
             if(level1.length >0){
               console.log(level1);
               crListLevels1(level1)
               document.querySelector(".crlistBull1").style.display='block'
             }else{
               document.querySelector(".crlistBull1").style.display='none'
             }
           const level2 = ChangeReadiness.filter((d)=>d.info.levels=="Level 2")
           if(level2.length>0){
             document.querySelector(".crlistBull2").style.display='block'
             console.log(level2);
             crListLevels2(level2)
           
           }else{
             document.querySelector(".crlistBull2").style.display='none'
           }
           const level3 = ChangeReadiness.filter((d)=>d.info.levels=="Level 3")
           if(level3.length!==0){
             document.querySelector(".crlistBull3").style.display='block'
             crListLevels3(level3)
         
           }else{
             document.querySelector(".crlistBull3").style.display='none'
           }
           const level4 = ChangeReadiness.filter((d)=>d.info.levels=="Level 4")
           if(level4.length!==0){
             console.log(level4);
             document.querySelector(".crlistBull4").style.display='block'
       
             crListLevels4(level4)
           
           }else{
             document.querySelector(".crlistBull4").style.display='none'
           }
   
  }

  const   CognitiveAbility  = response.filter((d) => d.info.areas=="Cognitive Ability");
  if (CognitiveAbility.length>0) {
   document.querySelector(".flush-heading41").style.display="block"
   const level1 = CognitiveAbility.filter((d)=>d.info.levels=="Level 1")
      
             if(level1.length >0){
               console.log(level1);
               caListLevels1(level1)
               document.querySelector(".calistBull1").style.display='block'
             }else{
               document.querySelector(".calistBull1").style.display='none'
             }
           const level2 = CognitiveAbility.filter((d)=>d.info.levels=="Level 2")
           if(level2.length>0){
             document.querySelector(".calistBull2").style.display='block'
             console.log(level2);
             caListLevels2(level2)
           
           }else{
             document.querySelector(".calistBull2").style.display='none'
           }
           const level3 = CognitiveAbility.filter((d)=>d.info.levels=="Level 3")
           if(level3.length!==0){
             document.querySelector(".calistBull3").style.display='block'
             caListLevels3(level3)
         
           }else{
             document.querySelector(".calistBull3").style.display='none'
           }
           const level4 = CognitiveAbility.filter((d)=>d.info.levels=="Level 4")
           if(level4.length!==0){
             console.log(level4);
             document.querySelector(".calistBull4").style.display='block'
       
             caListLevels4(level4)
           
           }else{
             document.querySelector(".calistBull4").style.display='none'
           }
   
  }

  const   CustomerOrientation  = response.filter((d) => d.info.areas=="Customer Orientation and Customer Focus");
  if (CustomerOrientation.length>0) {
   document.querySelector(".flush-heading42").style.display="block"
   const level1 = CustomerOrientation.filter((d)=>d.info.levels=="Level 1")
      
             if(level1.length >0){
               console.log(level1);
               ccListLevels1(level1)
               document.querySelector(".cclistBull1").style.display='block'
             }else{
               document.querySelector(".cclistBull1").style.display='none'
             }
           const level2 = CustomerOrientation.filter((d)=>d.info.levels=="Level 2")
           if(level2.length>0){
             document.querySelector(".cclistBull2").style.display='block'
             console.log(level2);
             ccListLevels2(level2)
           
           }else{
             document.querySelector(".cclistBull2").style.display='none'
           }
           const level3 = CustomerOrientation.filter((d)=>d.info.levels=="Level 3")
           if(level3.length!==0){
             document.querySelector(".cclistBull3").style.display='block'
             ccListLevels3(level3)
         
           }else{
             document.querySelector(".cclistBull3").style.display='none'
           }
           const level4 = CustomerOrientation.filter((d)=>d.info.levels=="Level 4")
           if(level4.length!==0){
             console.log(level4);
             document.querySelector(".cclistBull4").style.display='block'
       
             ccListLevels4(level4)
           
           }else{
             document.querySelector(".cclistBull4").style.display='none'
           }
   
  }
//   // let option =""
//   // let html =""
//   // let list = document.querySelector(".listdata124")
 
//   // result.forEach(department => {
//   //     option=` <li>${department.details}</li>`;
//   //     html +=option;
//   //     list.innerHTML=html;
     
      
//   // });


}
function Personal(response) {
  
  console.log(response);
 
  const  written = response.filter((d) => d.info.areas=="Written Communication");
  if (written.length>0) {
   document.querySelector(".flush-heading0").style.display="block"
   const level1 = written.filter((d)=>d.info.levels=="Level 1")
       
   if(level1.length >0){
     console.log(level1);
     ListLevels1(level1)
   
     document.querySelector(".listBull1").style.display='block'
   }else{
     document.querySelector(".listBull1").style.display='none'
   }
  const level2 = written.filter((d)=>d.info.levels=="Level 2")
  if(level2.length!==0){
   document.querySelector(".listBull2").style.display='block'
   ListLevels2(level2)
  
  }else{
   document.querySelector(".listBull2").style.display='none'
  }
  const level3 = written.filter((d)=>d.levels=="Level 3")
  if(level3.length!==0){
   document.querySelector(".listBull3").style.display='block'
   ListLevels3(level3)
  
  }else{
   document.querySelector(".listBull3").style.display='none'
  }
  const level4 = written.filter((d)=>d.levels=="Level 4")
  if(level4.length!==0){
   document.querySelector(".listBull4").style.display='block'
  
   ListLevels4(level4)
  
  }else{
   document.querySelector(".listBull4").style.display='none'
  }
  }
 
  const Organisational = response.filter((d) => d.info.areas=="Organisational Awareness");
  if (Organisational.length>0) {
   document.querySelector(".flush-heading1").style.display="block"
   const level1 = Organisational.filter((d)=>d.info.levels=="Level 1")
      
             if(level1.length >0){
               console.log(level1);
               oListLevels1(level1)
               document.querySelector(".olistBull1").style.display='block'
             }else{
               document.querySelector(".olistBull1").style.display='none'
             }
           const level2 = Organisational.filter((d)=>d.info.levels=="Level 2")
           if(level2.length>0){
             document.querySelector(".olistBull2").style.display='block'
             console.log(level2);
             oListLevels2(level2)
           
           }else{
             document.querySelector(".olistBull2").style.display='none'
           }
           const level3 = Organisational.filter((d)=>d.info.levels=="Level 3")
           if(level3.length!==0){
             document.querySelector(".olistBull3").style.display='block'
             oListLevels3(level3)
         
           }else{
             document.querySelector(".olistBull3").style.display='none'
           }
           const level4 = Organisational.filter((d)=>d.info.levels=="Level 4")
           if(level4.length!==0){
             console.log(level4);
             document.querySelector(".olistBull4").style.display='block'
       
             oListLevels4(level4)
           
           }else{
             document.querySelector(".olistBull4").style.display='none'
           }
   
  }
  
  const  Plannning = response.filter((d) => d.info.areas=="Planning and Organising");
  if (Plannning.length>0) {
   document.querySelector(".flush-heading2").style.display="block"
 
     const level1 = Plannning.filter((d)=>d.info.levels=="Level 1")
        
               if(level1.length >0){
                 console.log(level1);
                 pListLevels1(level1)
                 document.querySelector(".plistBull1").style.display='block'
               }else{
                 document.querySelector(".plistBull1").style.display='none'
               }
             const level2 = Plannning.filter((d)=>d.info.levels=="Level 2")
             if(level2.length>0){
               document.querySelector(".plistBull2").style.display='block'
               console.log(level2);
               pListLevels2(level2)
             
             }else{
               document.querySelector(".plistBull2").style.display='none'
             }
             const level3 = Plannning.filter((d)=>d.info.levels=="Level 3")
             if(level3.length!==0){
               document.querySelector(".plistBull3").style.display='block'
               pListLevels3(level3)
           
             }else{
               document.querySelector(".plistBull3").style.display='none'
             }
             const level4 = Plannning.filter((d)=>d.info.levels=="Level 4")
             if(level4.length!==0){
               console.log(level4);
               document.querySelector(".plistBull4").style.display='block'
         
               pListLevels4(level4)
             
             }else{
               document.querySelector(".plistBull4").style.display='none'
             }
     
    
  }
  const  Monitoring = response.filter((d) => d.info.areas=="Monitoring and Control");
  if (Monitoring.length>0) {
   document.querySelector(".flush-heading3").style.display="block"
   const level1 = Monitoring.filter((d)=>d.info.levels=="Level 1")
        
               if(level1.length >0){
                 console.log(level1);
                 mListLevels1(level1)
                 document.querySelector(".mlistBull1").style.display='block'
               }else{
                 document.querySelector(".mlistBull1").style.display='none'
               }
             const level2 = Monitoring.filter((d)=>d.info.levels=="Level 2")
             if(level2.length>0){
               document.querySelector(".mlistBull2").style.display='block'
               console.log(level2);
               mListLevels2(level2)
             
             }else{
               document.querySelector(".mlistBull2").style.display='none'
             }
             const level3 = Monitoring.filter((d)=>d.info.levels=="Level 3")
             if(level3.length!==0){
               document.querySelector(".mlistBull3").style.display='block'
               mListLevels3(level3)
           
             }else{
               document.querySelector(".mlistBull3").style.display='none'
             }
             const level4 = Monitoring.filter((d)=>d.info.levels=="Level 4")
             if(level4.length!==0){
               console.log(level4);
               document.querySelector(".mlistBull4").style.display='block'
         
               mListLevels4(level4)
             
             }else{
               document.querySelector(".mlistBull4").style.display='none'
             }
     
  }
 
  const  Consulting = response.filter((d) => d.info.areas=="Consulting");
  if (Consulting.length>0) {
   document.querySelector(".flush-heading4").style.display="block"
   const level1 = Consulting.filter((d)=>d.info.levels=="Level 1")
        
               if(level1.length >0){
                 console.log(level1);
                 cListLevels1(level1)
                 document.querySelector(".clistBull1").style.display='block'
               }else{
                 document.querySelector(".clistBull1").style.display='none'
               }
             const level2 = Consulting.filter((d)=>d.info.levels=="Level 2")
             if(level2.length>0){
               document.querySelector(".clistBull2").style.display='block'
               console.log(level2);
               cListLevels2(level2)
             
             }else{
               document.querySelector(".clistBull2").style.display='none'
             }
             const level3 = Consulting.filter((d)=>d.info.levels=="Level 3")
             if(level3.length!==0){
               document.querySelector(".clistBull3").style.display='block'
               cListLevels3(level3)
           
             }else{
               document.querySelector(".clistBull3").style.display='none'
             }
             const level4 = Consulting.filter((d)=>d.info.levels=="Level 4")
             if(level4.length!==0){
               console.log(level4);
               document.querySelector(".clistBull4").style.display='block'
         
               cListLevels4(level4)
             
             }else{
               document.querySelector(".clistBull4").style.display='none'
             }
     
  }
  const  Negotiation = response.filter((d) => d.info.areas=="Negotiation");
  if (Negotiation.length>0) {
   document.querySelector(".flush-heading5").style.display="block"
   const level1 = Negotiation.filter((d)=>d.info.levels=="Level 1")
        
               if(level1.length >0){
                 console.log(level1);
                 nListLevels1(level1)
                 document.querySelector(".nlistBull1").style.display='block'
               }else{
                 document.querySelector(".nlistBull1").style.display='none'
               }
             const level2 = Consulting.filter((d)=>d.info.levels=="Level 2")
             if(level2.length>0){
               document.querySelector(".nlistBull2").style.display='block'
               console.log(level2);
               nListLevels2(level2)
             
             }else{
               document.querySelector(".nlistBull2").style.display='none'
             }
             const level3 = Consulting.filter((d)=>d.info.levels=="Level 3")
             if(level3.length!==0){
               document.querySelector(".nlistBull3").style.display='block'
               nListLevels3(level3)
           
             }else{
               document.querySelector(".nlistBull3").style.display='none'
             }
             const level4 = Consulting.filter((d)=>d.info.levels=="Level 4")
             if(level4.length!==0){
               console.log(level4);
               document.querySelector(".nlistBull4").style.display='block'
         
               nListLevels4(level4)
             
             }else{
               document.querySelector(".nlistBull4").style.display='none'
             }
     
  }
  const  Oral = response.filter((d) => d.info.areas=="Oral Communication");
  if (Oral.length>0) {
   document.querySelector(".flush-heading6").style.display="block"
   const level1 = Negotiation.filter((d)=>d.info.levels=="Level 1")
        
               if(level1.length >0){
                 console.log(level1);
                 orListLevels1(level1)
                 document.querySelector(".orlistBull1").style.display='block'
               }else{
                 document.querySelector(".orlistBull1").style.display='none'
               }
             const level2 = Consulting.filter((d)=>d.info.levels=="Level 2")
             if(level2.length>0){
               document.querySelector(".orlistBull2").style.display='block'
               console.log(level2);
               orListLevels2(level2)
             
             }else{
               document.querySelector(".orlistBull2").style.display='none'
             }
             const level3 = Consulting.filter((d)=>d.info.levels=="Level 3")
             if(level3.length!==0){
               document.querySelector(".orlistBull3").style.display='block'
               orListLevels3(level3)
           
             }else{
               document.querySelector(".orlistBull3").style.display='none'
             }
             const level4 = Consulting.filter((d)=>d.info.levels=="Level 4")
             if(level4.length!==0){
               console.log(level4);
               document.querySelector(".orlistBull4").style.display='block'
         
               orListLevels4(level4)
             
             }else{
               document.querySelector(".orlistBull4").style.display='none'
             }
 
              
  const Learning = response.filter((d) => d.info.areas=="Learning and Development ");
  if (Learning.length>0) {
   document.querySelector(".flush-heading7").style.display="block"
   const level1 = Learning.filter((d)=>d.info.levels=="Level 1")
      
             if(level1.length >0){
               console.log(level1);
               ldListLevels1(level1)
               document.querySelector(".ldlistBull1").style.display='block'
             }else{
               document.querySelector(".ldlistBull1").style.display='none'
             }
           const level2 = Learning.filter((d)=>d.info.levels=="Level 2")
           if(level2.length>0){
             document.querySelector(".ldlistBull2").style.display='block'
             console.log(level2);
             ldListLevels2(level2)
           
           }else{
             document.querySelector(".ldlistBull2").style.display='none'
           }
           const level3 = Learning.filter((d)=>d.info.levels=="Level 3")
           if(level3.length!==0){
             document.querySelector(".ldlistBull3").style.display='block'
             ldListLevels3(level3)
         
           }else{
             document.querySelector(".ldlistBull3").style.display='none'
           }
           const level4 = Learning.filter((d)=>d.info.levels=="Level 4")
           if(level4.length!==0){
             console.log(level4);
             document.querySelector(".ldlistBull4").style.display='block'
       
             ldListLevels4(level4)
           
           }else{
             document.querySelector(".ldlistBull4").style.display='none'
           }
   
  }
     
  }
 
  const Learning = response.filter((d) => d.info.areas=="Learning and Development");
  if (Learning.length>0) {
   document.querySelector(".flush-heading7").style.display="block"
   const level1 = Learning.filter((d)=>d.info.levels=="Level 1")
      
             if(level1.length >0){
               console.log(level1);
               ldListLevels1(level1)
               document.querySelector(".ldlistBull1").style.display='block'
             }else{
               document.querySelector(".ldlistBull1").style.display='none'
             }
           const level2 = Learning.filter((d)=>d.info.levels=="Level 2")
           if(level2.length>0){
             document.querySelector(".ldlistBull2").style.display='block'
             console.log(level2);
             ldListLevels2(level2)
           
           }else{
             document.querySelector(".ldlistBull2").style.display='none'
           }
           const level3 = Learning.filter((d)=>d.info.levels=="Level 3")
           if(level3.length!==0){
             document.querySelector(".ldlistBull3").style.display='block'
             ldListLevels3(level3)
         
           }else{
             document.querySelector(".ldlistBull3").style.display='none'
           }
           const level4 = Learning.filter((d)=>d.info.levels=="Level 4")
           if(level4.length!==0){
             console.log(level4);
             document.querySelector(".ldlistBull4").style.display='block'
       
             ldListLevels4(level4)
           
           }else{
             document.querySelector(".ldlistBull4").style.display='none'
           }
   
  }
  
 // const Awareness = response.filter((d) => d.areas=="Organisational Awareness");
 
 // if (Awareness.length>0) {
 //   document.querySelector(".flush-heading8").style.display="block"
 //   const level1 = Awareness.filter((d)=>d.levels=="Level 1")
      
 //             if(level1.length >0){
 //               console.log(level1);
 //               aListLevels1(level1)
 //               document.querySelector(".alistBull1").style.display='block'
 //             }else{
 //               document.querySelector(".alistBull1").style.display='none'
 //             }
 //           const level2 = Awareness.filter((d)=>d.levels=="Level 2")
 //           if(level2.length>0){
 //             document.querySelector(".alistBull2").style.display='block'
 //             console.log(level2);
 //             aListLevels2(level2)
           
 //           }else{
 //             document.querySelector(".alistBull2").style.display='none'
 //           }
 //           const level3 = Awareness.filter((d)=>d.levels=="Level 3")
 //           if(level3.length!==0){
 //             document.querySelector(".alistBull3").style.display='block'
 //             aListLevels3(level3)
         
 //           }else{
 //             document.querySelector(".alistBull3").style.display='none'
 //           }
 //           const level4 = Awareness.filter((d)=>d.levels=="Level 4")
 //           if(level4.length!==0){
 //             console.log(level4);
 //             document.querySelector(".alistBull4").style.display='block'
       
 //             aListLevels4(level4)
           
 //           }else{
 //             document.querySelector(".alistBull4").style.display='none'
 //           }
   
 //  }
 
 const  Change = response.filter((d) => d.info.areas=="Change Movement");
 
 if (Change.length>0) {
   document.querySelector(".flush-heading9").style.display="block"
   const level1 = Change.filter((d)=>d.info.levels=="Level 1")
      
             if(level1.length >0){
               console.log(level1);
               cmListLevels1(level1)
               document.querySelector(".cmlistBull1").style.display='block'
             }else{
               document.querySelector(".cmlistBull1").style.display='none'
             }
           const level2 = Change.filter((d)=>d.info.levels=="Level 2")
           if(level2.length>0){
             document.querySelector(".cmlistBull2").style.display='block'
             console.log(level2);
             cmListLevels2(level2)
           
           }else{
             document.querySelector(".cmlistBull2").style.display='none'
           }
           const level3 = Change.filter((d)=>d.info.levels=="Level 3")
           if(level3.length!==0){
             document.querySelector(".cmlistBull3").style.display='block'
             cmListLevels3(level3)
         
           }else{
             document.querySelector(".cmlistBull3").style.display='none'
           }
           const level4 = Change.filter((d)=>d.info.levels=="Level 4")
           if(level4.length!==0){
             console.log(level4);
             document.querySelector(".cmlistBull4").style.display='block'
       
             cmListLevels4(level4)
           
           }else{
             document.querySelector(".cmlistBull4").style.display='none'
           }
   
  }
 
 
 const  Technology = response.filter((d) => d.info.areas=="HR Technology information Management");
 
 
 if (Technology.length>0) {
   document.querySelector(".flush-heading10").style.display="block"
   const level1 = Technology.filter((d)=>d.info.levels=="Level 1")
      
             if(level1.length >0){
               console.log(level1);
               tListLevels1(level1)
               document.querySelector(".tlistBull1").style.display='block'
             }else{
               document.querySelector(".tlistBull1").style.display='none'
             }
           const level2 = Technology.filter((d)=>d.info.levels=="Level 2")
           if(level2.length>0){
             document.querySelector(".tlistBull2").style.display='block'
             console.log(level2);
             tListLevels2(level2)
           
           }else{
             document.querySelector(".tlistBull2").style.display='none'
           }
           const level3 = Technology.filter((d)=>d.info.levels=="Level 3")
           if(level3.length!==0){
             document.querySelector(".tlistBull3").style.display='block'
             tListLevels3(level3)
         
           }else{
             document.querySelector(".tlistBull3").style.display='none'
           }
           const level4 = Technology.filter((d)=>d.info.levels=="Level 4")
           if(level4.length!==0){
             console.log(level4);
             document.querySelector(".tlistBull4").style.display='block'
       
             tListLevels4(level4)
           
           }else{
             document.querySelector(".tlistBull4").style.display='none'
           }
   
  }
 
 const  Service = response.filter((d) => d.info.areas=="HR Service Delivery");
 if (Service.length>0) {
   document.querySelector(".flush-heading11").style.display="block"
   const level1 = Service.filter((d)=>d.info.levels=="Level 1")
      
             if(level1.length >0){
               console.log(level1);
               sListLevels1(level1)
               document.querySelector(".slistBull1").style.display='block'
             }else{
               document.querySelector(".slistBull1").style.display='none'
             }
           const level2 = Service.filter((d)=>d.info.levels=="Level 2")
           if(level2.length>0){
             document.querySelector(".slistBull2").style.display='block'
             console.log(level2);
             sListLevels2(level2)
           
           }else{
             document.querySelector(".slistBull2").style.display='none'
           }
           const level3 = Service.filter((d)=>d.info.levels=="Level 3")
           if(level3.length!==0){
             document.querySelector(".slistBull3").style.display='block'
             sListLevels3(level3)
         
           }else{
             document.querySelector(".slistBull3").style.display='none'
           }
           const level4 = Service.filter((d)=>d.info.levels=="Level 4")
           if(level4.length!==0){
             console.log(level4);
             document.querySelector(".slistBull4").style.display='block'
       
             sListLevels4(level4)
           
           }else{
             document.querySelector(".slistBull4").style.display='none'
           }
   
  }
 const  Talent = response.filter((d) => d.info.areas=="Talent Management");
 if (Talent.length>0) {
   document.querySelector(".flush-heading12").style.display="block"
   const level1 = Talent.filter((d)=>d.info.levels=="Level 1")
      
             if(level1.length >0){
               console.log(level1);
               tmListLevels1(level1)
               document.querySelector(".tmlistBull1").style.display='block'
             }else{
               document.querySelector(".tmlistBull1").style.display='none'
             }
           const level2 = Talent.filter((d)=>d.info.levels=="Level 2")
           if(level2.length>0){
             document.querySelector(".tmlistBull2").style.display='block'
             console.log(level2);
             tmListLevels2(level2)
           
           }else{
             document.querySelector(".tmlistBull2").style.display='none'
           }
           const level3 = Talent.filter((d)=>d.info.levels=="Level 3")
           if(level3.length!==0){
             document.querySelector(".tmlistBull3").style.display='block'
             tmListLevels3(level3)
         
           }else{
             document.querySelector(".tmlistBull3").style.display='none'
           }
           const level4 = Talent.filter((d)=>d.info.levels=="Level 4")
           if(level4.length!==0){
             console.log(level4);
             document.querySelector(".tmlistBull4").style.display='block'
       
             tmListLevels4(level4)
           
           }else{
             document.querySelector(".tmlistBull4").style.display='none'
           }
   
  }
 const  Workforce = response.filter((d) => d.info.areas=="Workforce Planning");
 
 if (Workforce.length>0) {
   document.querySelector(".flush-heading13").style.display="block"
   const level1 = Workforce.filter((d)=>d.info.levels=="Level 1")
      
             if(level1.length >0){
               console.log(level1);
               wListLevels1(level1)
               document.querySelector(".wlistBull1").style.display='block'
             }else{
               document.querySelector(".wlistBull1").style.display='none'
             }
           const level2 = Workforce.filter((d)=>d.info.levels=="Level 2")
           if(level2.length>0){
             document.querySelector(".wlistBull2").style.display='block'
             console.log(level2);
             wListLevels2(level2)
           
           }else{
             document.querySelector(".wlistBull2").style.display='none'
           }
           const level3 = Workforce.filter((d)=>d.info.levels=="Level 3")
           if(level3.length!==0){
             document.querySelector(".wlistBull3").style.display='block'
             wListLevels3(level3)
         
           }else{
             document.querySelector(".wlistBull3").style.display='none'
           }
           const level4 = Workforce.filter((d)=>d.info.levels=="Level 4")
           if(level4.length!==0){
             console.log(level4);
             document.querySelector(".wlistBull4").style.display='block'
       
             wListLevels4(level4)
           
           }else{
             document.querySelector(".wlistBull4").style.display='none'
           }
   
  }
  const  Learningdevelopment = response.filter((d) => d.info.areas=="Learning and Develepment");
  if (Learningdevelopment.length>0) {
   document.querySelector(".flush-heading14").style.display="block"
   const level1 = Learningdevelopment.filter((d)=>d.info.levels=="Level 1")
      
             if(level1.length >0){
               console.log(level1);
               dlListLevels1(level1)
               document.querySelector(".dllistBull1").style.display='block'
             }else{
               document.querySelector(".dllistBull1").style.display='none'
             }
           const level2 = Learningdevelopment.filter((d)=>d.info.levels=="Level 2")
           if(level2.length>0){
             document.querySelector(".dllistBull2").style.display='block'
             console.log(level2);
             dlListLevels2(level2)
           
           }else{
             document.querySelector(".dllistBull2").style.display='none'
           }
           const level3 = Learningdevelopment.filter((d)=>d.info.levels=="Level 3")
           if(level3.length!==0){
             document.querySelector(".dllistBull3").style.display='block'
             dlListLevels3(level3)
         
           }else{
             document.querySelector(".dllistBull3").style.display='none'
           }
           const level4 = Learningdevelopment.filter((d)=>d.info.levels=="Level 4")
           if(level4.length!==0){
             console.log(level4);
             document.querySelector(".dllistBull4").style.display='block'
       
             dlListLevels4(level4)
           
           }else{
             document.querySelector(".dllistBull4").style.display='none'
           }
   
  }
  
  const  Occupational = response.filter((d) => d.info.areas=="Occupational Health and Safety");
  
  if (Occupational.length>0) {
   document.querySelector(".flush-heading15").style.display="block"
   const level1 = Occupational.filter((d)=>d.info.levels=="Level 1")
      
             if(level1.length >0){
               console.log(level1);
               ohListLevels1(level1)
               document.querySelector(".ohlistBull1").style.display='block'
             }else{
               document.querySelector(".ohlistBull1").style.display='none'
             }
           const level2 = Occupational.filter((d)=>d.info.levels=="Level 2")
           if(level2.length>0){
             document.querySelector(".ohlistBull2").style.display='block'
             console.log(level2);
             ohListLevels2(level2)
           
           }else{
             document.querySelector(".ohlistBull2").style.display='none'
           }
           const level3 = Occupational.filter((d)=>d.info.levels=="Level 3")
           if(level3.length!==0){
             document.querySelector(".ohlistBull3").style.display='block'
             ohListLevels3(level3)
         
           }else{
             document.querySelector(".ohlistBull3").style.display='none'
           }
           const level4 = Occupational.filter((d)=>d.info.levels=="Level 4")
           if(level4.length!==0){
             console.log(level4);
             document.querySelector(".ohlistBull4").style.display='block'
       
             ohListLevels4(level4)
           
           }else{
             document.querySelector(".ohlistBull4").style.display='none'
           }
   
  }
   const Perfomance = response.filter((d) => d.info.areas=="Performance Management");
 
 if (Perfomance.length>0) {
     document.querySelector(".flush-heading16").style.display="block"
     const level1 = Perfomance.filter((d)=>d.info.levels=="Level 1")
        
               if(level1.length >0){
                 console.log(level1);
                 peListLevels1(level1)
                 document.querySelector(".pelistBull1").style.display='block'
               }else{
                 document.querySelector(".pelistBull1").style.display='none'
               }
             const level2 = Perfomance.filter((d)=>d.info.levels=="Level 2")
             if(level2.length>0){
               document.querySelector(".pelistBull2").style.display='block'
               console.log(level2);
               peListLevels2(level2)
             
             }else{
               document.querySelector(".pelistBull2").style.display='none'
             }
             const level3 = Perfomance.filter((d)=>d.info.levels=="Level 3")
             if(level3.length!==0){
               document.querySelector(".pelistBull3").style.display='block'
               peListLevels3(level3)
           
             }else{
               document.querySelector(".pelistBull3").style.display='none'
             }
             const level4 = Perfomance.filter((d)=>d.info.levels=="Level 4")
             if(level4.length!==0){
               console.log(level4);
               document.querySelector(".pelistBull4").style.display='block'
         
               peListLevels4(level4)
             
             }else{
               document.querySelector(".pelistBull4").style.display='none'
             }
     
    }
 const  Industrial = response.filter((d) => d.info.areas=="Industrial and Labour Relations");
 
   if (Industrial.length>0) {
     document.querySelector(".flush-heading17").style.display="block"
     const level1 = Industrial.filter((d)=>d.info.levels=="Level 1")
        
               if(level1.length >0){
                 console.log(level1);
                 inListLevels1(level1)
                 document.querySelector(".inlistBull1").style.display='block'
               }else{
                 document.querySelector(".inlistBull1").style.display='none'
               }
             const level2 = Industrial.filter((d)=>d.info.levels=="Level 2")
             if(level2.length>0){
               document.querySelector(".inlistBull2").style.display='block'
               console.log(level2);
               inListLevels2(level2)
             
             }else{
               document.querySelector(".inlistBull2").style.display='none'
             }
             const level3 = Industrial.filter((d)=>d.info.levels=="Level 3")
             if(level3.length!==0){
               document.querySelector(".inlistBull3").style.display='block'
               inListLevels3(level3)
           
             }else{
               document.querySelector(".inlistBull3").style.display='none'
             }
             const level4 = Industrial.filter((d)=>d.info.levels=="Level 4")
             if(level4.length!==0){
               console.log(level4);
               document.querySelector(".inlistBull4").style.display='block'
         
               inListLevels4(level4)
             
             }else{
               document.querySelector(".inlistBull4").style.display='none'
             }
     
    }
 const  Interpersonal = response.filter((d) => d.info.areas=="Interpersonal Relationships");
 
 if (Interpersonal.length>0) {
     document.querySelector(".flush-heading18").style.display="block"
     const level1 = Interpersonal.filter((d)=>d.info.levels=="Level 1")
        
               if(level1.length >0){
                 console.log(level1);
                 intListLevels1(level1)
                 document.querySelector(".intlistBull1").style.display='block'
               }else{
                 document.querySelector(".intlistBull1").style.display='none'
               }
             const level2 = Interpersonal.filter((d)=>d.info.levels=="Level 2")
             if(level2.length>0){
               document.querySelector(".intlistBull2").style.display='block'
               console.log(level2);
               intListLevels2(level2)
             
             }else{
               document.querySelector(".intlistBull2").style.display='none'
             }
             const level3 = Interpersonal.filter((d)=>d.info.levels=="Level 3")
             if(level3.length!==0){
               document.querySelector(".intlistBull3").style.display='block'
               intListLevels3(level3)
           
             }else{
               document.querySelector(".intlistBull3").style.display='none'
             }
             const level4 = Interpersonal.filter((d)=>d.info.levels=="Level 4")
             if(level4.length!==0){
               console.log(level4);
               document.querySelector(".intlistBull4").style.display='block'
         
               intListLevels4(level4)
             
             }else{
               document.querySelector(".intlistBull4").style.display='none'
             }
     
    }
 
 const  Communication = response.filter((d) => d.info.areas=="Communication");
 if (Communication.length>0) {
   document.querySelector(".flush-heading19").style.display="block"
   const level1 = Communication.filter((d)=>d.info.levels=="Level 1")
      
             if(level1.length >0){
               console.log(level1);
               comListLevels1(level1)
               document.querySelector(".comlistBull1").style.display='block'
             }else{
               document.querySelector(".comlistBull1").style.display='none'
             }
           const level2 = Communication.filter((d)=>d.info.levels=="Level 2")
           if(level2.length>0){
             document.querySelector(".comlistBull2").style.display='block'
             console.log(level2);
             comListLevels2(level2)
           
           }else{
             document.querySelector(".comlistBull2").style.display='none'
           }
           const level3 = Communication.filter((d)=>d.info.levels=="Level 3")
           if(level3.length!==0){
             document.querySelector(".comlistBull3").style.display='block'
             comListLevels3(level3)
         
           }else{
             document.querySelector(".comlistBull3").style.display='none'
           }
           const level4 = Communication.filter((d)=>d.info.levels=="Level 4")
           if(level4.length!==0){
             console.log(level4);
             document.querySelector(".comlistBull4").style.display='block'
       
             comListLevels4(level4)
           
           }else{
             document.querySelector(".comlistBull4").style.display='none'
           }
   
  }
   const Delivery = response.filter((d) => d.info.areas=="Service Delivery orientation");
   if (Delivery.length>0) {
     document.querySelector(".flush-heading20").style.display="block"
     const level1 = Delivery.filter((d)=>d.info.levels=="Level 1")
        
               if(level1.length >0){
                 console.log(level1);
                 sdoListLevels1(level1)
                 document.querySelector(".sdolistBull1").style.display='block'
               }else{
                 document.querySelector(".sdolistBull1").style.display='none'
               }
             const level2 = Delivery.filter((d)=>d.info.levels=="Level 2")
             if(level2.length>0){
               document.querySelector(".sdolistBull2").style.display='block'
               console.log(level2);
               sdoListLevels2(level2)
             
             }else{
               document.querySelector(".sdolistBull2").style.display='none'
             }
             const level3 = Delivery.filter((d)=>d.info.levels=="Level 3")
             if(level3.length!==0){
               document.querySelector(".sdolistBull3").style.display='block'
               sdoListLevels3(level3)
           
             }else{
               document.querySelector(".sdolistBull3").style.display='none'
             }
             const level4 = Delivery.filter((d)=>d.info.levels=="Level 4")
             if(level4.length!==0){
               console.log(level4);
               document.querySelector(".sdolistBull4").style.display='block'
         
               sdoListLevels4(level4)
             
             }else{
               document.querySelector(".sdolistBull4").style.display='none'
             }
     
    }
   const  Action = response.filter((d) => d.info.areas=="Action and Outcome Orientation");
   if (Action.length>0) {
     document.querySelector(".flush-heading21").style.display="block"
     const level1 = Action.filter((d)=>d.info.levels=="Level 1")
        
               if(level1.length >0){
                 console.log(level1);
                 actListLevels1(level1)
                 document.querySelector(".actlistBull1").style.display='block'
               }else{
                 document.querySelector(".actlistBull1").style.display='none'
               }
             const level2 = Action.filter((d)=>d.info.levels=="Level 2")
             if(level2.length>0){
               document.querySelector(".actlistBull2").style.display='block'
               console.log(level2);
               actListLevels2(level2)
             
             }else{
               document.querySelector(".actlistBull2").style.display='none'
             }
             const level3 = Action.filter((d)=>d.info.levels=="Level 3")
             if(level3.length!==0){
               document.querySelector(".actlistBull3").style.display='block'
               actListLevels3(level3)
           
             }else{
               document.querySelector(".actlistBull3").style.display='none'
             }
             const level4 = Action.filter((d)=>d.info.levels=="Level 4")
             if(level4.length!==0){
               console.log(level4);
               document.querySelector(".actlistBull4").style.display='block'
         
               actListLevels4(level4)
             
             }else{
               document.querySelector(".actlistBull4").style.display='none'
             }
     
    }
 const  Conflict = response.filter((d) => d.info.areas=="Conflict Management");
 if (Conflict.length>0) {
   document.querySelector(".flush-heading22").style.display="block"
   const level1 = Conflict.filter((d)=>d.info.levels=="Level 1")
      
             if(level1.length >0){
               console.log(level1);
               conListLevels1(level1)
               document.querySelector(".conlistBull1").style.display='block'
             }else{
               document.querySelector(".conlistBull1").style.display='none'
             }
           const level2 = Conflict.filter((d)=>d.info.levels=="Level 2")
           if(level2.length>0){
             document.querySelector(".conlistBull2").style.display='block'
             console.log(level2);
             conListLevels2(level2)
           
           }else{
             document.querySelector(".conlistBull2").style.display='none'
           }
           const level3 = Conflict.filter((d)=>d.info.levels=="Level 3")
           if(level3.length!==0){
             document.querySelector(".conlistBull3").style.display='block'
             conListLevels3(level3)
         
           }else{
             document.querySelector(".conlistBull3").style.display='none'
           }
           const level4 = Conflict.filter((d)=>d.info.levels=="Level 4")
           if(level4.length!==0){
             console.log(level4);
             document.querySelector(".conlistBull4").style.display='block'
       
             conListLevels4(level4)
           
           }else{
             document.querySelector(".conlistBull4").style.display='none'
           }
   
  }
  const  Orientation = response.filter((d) => d.info.areas=="Learning Orientation");
  if (Orientation.length>0) {
   document.querySelector(".flush-heading23").style.display="block"
   const level1 = Orientation.filter((d)=>d.info.levels=="Level 1")
      
             if(level1.length >0){
               console.log(level1);
               loListLevels1(level1)
               document.querySelector(".lolistBull1").style.display='block'
             }else{
               document.querySelector(".lolistBull1").style.display='none'
             }
           const level2 = Orientation.filter((d)=>d.info.levels=="Level 2")
           if(level2.length>0){
             document.querySelector(".lolistBull2").style.display='block'
             console.log(level2);
             loListLevels2(level2)
           
           }else{
             document.querySelector(".lolistBull2").style.display='none'
           }
           const level3 = Orientation.filter((d)=>d.info.levels=="Level 3")
           if(level3.length!==0){
             document.querySelector(".lolistBull3").style.display='block'
             loListLevels3(level3)
         
           }else{
             document.querySelector(".lolistBull3").style.display='none'
           }
           const level4 = Orientation.filter((d)=>d.info.levels=="Level 4")
           if(level4.length!==0){
             console.log(level4);
             document.querySelector(".lolistBull4").style.display='block'
       
             loListLevels4(level4)
           
           }else{
             document.querySelector(".lolistBull4").style.display='none'
           }
   
  }
 const  Accountability = response.filter((d) => d.info.areas=="Accountability and Ethical Conduct");
 if (Accountability.length>0) {
   document.querySelector(".flush-heading24").style.display="block"
   const level1 = Accountability.filter((d)=>d.info.levels=="Level 1")
      
             if(level1.length >0){
               console.log(level1);
               aeListLevels1(level1)
               document.querySelector(".aelistBull1").style.display='block'
             }else{
               document.querySelector(".aelistBull1").style.display='none'
             }
           const level2 = Accountability.filter((d)=>d.info.levels=="Level 2")
           if(level2.length>0){
             document.querySelector(".aelistBull2").style.display='block'
             console.log(level2);
             aeListLevels2(level2)
           
           }else{
             document.querySelector(".aelistBull2").style.display='none'
           }
           const level3 = Accountability.filter((d)=>d.info.levels=="Level 3")
           if(level3.length!==0){
             document.querySelector(".aelistBull3").style.display='block'
             aeListLevels3(level3)
         
           }else{
             document.querySelector(".aelistBull3").style.display='none'
           }
           const level4 = Accountability.filter((d)=>d.info.levels=="Level 4")
           if(level4.length!==0){
             console.log(level4);
             document.querySelector(".aelistBull4").style.display='block'
       
             aeListLevels4(level4)
           
           }else{
             document.querySelector(".aelistBull4").style.display='none'
           }
   
  }
  const   Problem = response.filter((d) => d.info.areas=="Problem Solving and Analysis");
  if (Problem.length>0) {
   document.querySelector(".flush-heading25").style.display="block"
   const level1 = Problem.filter((d)=>d.info.levels=="Level 1")
      
             if(level1.length >0){
               console.log(level1);
               psListLevels1(level1)
               document.querySelector(".pslistBull1").style.display='block'
             }else{
               document.querySelector(".pslistBull1").style.display='none'
             }
           const level2 = Problem.filter((d)=>d.info.levels=="Level 2")
           if(level2.length>0){
             document.querySelector(".pslistBull2").style.display='block'
             console.log(level2);
             psListLevels2(level2)
           
           }else{
             document.querySelector(".pslistBull2").style.display='none'
           }
           const level3 = Problem.filter((d)=>d.info.levels=="Level 3")
           if(level3.length!==0){
             document.querySelector(".pslistBull3").style.display='block'
             psListLevels3(level3)
         
           }else{
             document.querySelector(".pslistBull3").style.display='none'
           }
           const level4 = Problem.filter((d)=>d.info.levels=="Level 4")
           if(level4.length!==0){
             console.log(level4);
             document.querySelector(".pslistBull4").style.display='block'
       
             psListLevels4(level4)
           
           }else{
             document.querySelector(".pslistBull4").style.display='none'
           }
   
  }
 
  const   Compensation = response.filter((d) => d.info.areas=="Compensation and Benefits Management");
  if (Compensation.length>0) {
   document.querySelector(".flush-heading26").style.display="block"
   const level1 = Compensation.filter((d)=>d.info.levels=="Level 1")
      
             if(level1.length >0){
               console.log(level1);
               cbListLevels1(level1)
               document.querySelector(".cblistBull1").style.display='block'
             }else{
               document.querySelector(".cblistBull1").style.display='none'
             }
           const level2 = Compensation.filter((d)=>d.info.levels=="Level 2")
           if(level2.length>0){
             document.querySelector(".cblistBull2").style.display='block'
             console.log(level2);
             cbListLevels2(level2)
           
           }else{
             document.querySelector(".cblistBull2").style.display='none'
           }
           const level3 = Compensation.filter((d)=>d.info.levels=="Level 3")
           if(level3.length!==0){
             document.querySelector(".cblistBull3").style.display='block'
             cbListLevels3(level3)
         
           }else{
             document.querySelector(".cblistBull3").style.display='none'
           }
           const level4 = Compensation.filter((d)=>d.info.levels=="Level 4")
           if(level4.length!==0){
             console.log(level4);
             document.querySelector(".cblistBull4").style.display='block'
       
             cbListLevels4(level4)
           
           }else{
             document.querySelector(".cblistBull4").style.display='none'
           }
   
  }
 
  const   EmployeeWellness = response.filter((d) => d.info.areas=="Employee Wellness");
  if (EmployeeWellness.length>0) {
   document.querySelector(".flush-heading27").style.display="block"
   const level1 = EmployeeWellness.filter((d)=>d.info.levels=="Level 1")
      
             if(level1.length >0){
               console.log(level1);
               ewListLevels1(level1)
               document.querySelector(".ewlistBull1").style.display='block'
             }else{
               document.querySelector(".ewlistBull1").style.display='none'
             }
           const level2 = EmployeeWellness.filter((d)=>d.info.levels=="Level 2")
           if(level2.length>0){
             document.querySelector(".ewlistBull2").style.display='block'
             console.log(level2);
             ewListLevels2(level2)
           
           }else{
             document.querySelector(".ewlistBull2").style.display='none'
           }
           const level3 = EmployeeWellness.filter((d)=>d.info.levels=="Level 3")
           if(level3.length!==0){
             document.querySelector(".ewlistBull3").style.display='block'
             ewListLevels3(level3)
         
           }else{
             document.querySelector(".ewlistBull3").style.display='none'
           }
           const level4 = EmployeeWellness.filter((d)=>d.info.levels=="Level 4")
           if(level4.length!==0){
             console.log(level4);
             document.querySelector(".ewlistBull4").style.display='block'
       
             ewListLevels4(level4)
           
           }else{
             document.querySelector(".ewlistBull4").style.display='none'
           }
   
  }
 
  const   Resilience = response.filter((d) => d.info.areas=="Resilience");
  if (Resilience.length>0) {
   document.querySelector(".flush-heading28").style.display="block"
   const level1 = Resilience.filter((d)=>d.info.levels=="Level 1")
      
             if(level1.length >0){
               console.log(level1);
               rsListLevels1(level1)
               document.querySelector(".rslistBull1").style.display='block'
             }else{
               document.querySelector(".rslistBull1").style.display='none'
             }
           const level2 = Resilience.filter((d)=>d.info.levels=="Level 2")
           if(level2.length>0){
             document.querySelector(".rslistBull2").style.display='block'
             console.log(level2);
             rsListLevels2(level2)
           
           }else{
             document.querySelector(".rslistBull2").style.display='none'
           }
           const level3 = Resilience.filter((d)=>d.info.levels=="Level 3")
           if(level3.length!==0){
             document.querySelector(".rslistBull3").style.display='block'
             rsListLevels3(level3)
         
           }else{
             document.querySelector(".rslistBull3").style.display='none'
           }
           const level4 = Resilience.filter((d)=>d.info.levels=="Level 4")
           if(level4.length!==0){
             console.log(level4);
             document.querySelector(".rslistBull4").style.display='block'
       
             rsListLevels4(level4)
           
           }else{
             document.querySelector(".rslistBull4").style.display='none'
           }
   
  }
 
  const   DirectionSetting = response.filter((d) => d.info.areas=="Direction Setting");
  if (DirectionSetting.length>0) {
   document.querySelector(".flush-heading29").style.display="block"
   const level1 = DirectionSetting.filter((d)=>d.info.levels=="Level 1")
      
             if(level1.length >0){
               console.log(level1);
               drListLevels1(level1)
               document.querySelector(".drlistBull1").style.display='block'
             }else{
               document.querySelector(".drlistBull1").style.display='none'
             }
           const level2 = DirectionSetting.filter((d)=>d.info.levels=="Level 2")
           if(level2.length>0){
             document.querySelector(".drlistBull2").style.display='block'
             console.log(level2);
             drListLevels2(level2)
           
           }else{
             document.querySelector(".drlistBull2").style.display='none'
           }
           const level3 = DirectionSetting.filter((d)=>d.info.levels=="Level 3")
           if(level3.length!==0){
             document.querySelector(".drlistBull3").style.display='block'
             drListLevels3(level3)
         
           }else{
             document.querySelector(".drlistBull3").style.display='none'
           }
           const level4 = DirectionSetting.filter((d)=>d.info.levels=="Level 4")
           if(level4.length!==0){
             console.log(level4);
             document.querySelector(".drlistBull4").style.display='block'
       
             drListLevels4(level4)
           
           }else{
             document.querySelector(".drlistBull4").style.display='none'
           }
   
  }
 
  const   ImpactandInfluence = response.filter((d) => d.info.areas=="Impact and Influence");
  if (ImpactandInfluence.length>0) {
   document.querySelector(".flush-heading30").style.display="block"
   const level1 = ImpactandInfluence.filter((d)=>d.info.levels=="Level 1")
      
             if(level1.length >0){
               console.log(level1);
               iiListLevels1(level1)
               document.querySelector(".iilistBull1").style.display='block'
             }else{
               document.querySelector(".iilistBull1").style.display='none'
             }
           const level2 = ImpactandInfluence.filter((d)=>d.info.levels=="Level 2")
           if(level2.length>0){
             document.querySelector(".iilistBull2").style.display='block'
             console.log(level2);
             iiListLevels2(level2)
           
           }else{
             document.querySelector(".iilistBull2").style.display='none'
           }
           const level3 = ImpactandInfluence.filter((d)=>d.info.levels=="Level 3")
           if(level3.length!==0){
             document.querySelector(".iilistBull3").style.display='block'
             iiListLevels3(level3)
         
           }else{
             document.querySelector(".iilistBull3").style.display='none'
           }
           const level4 = ImpactandInfluence.filter((d)=>d.info.levels=="Level 4")
           if(level4.length!==0){
             console.log(level4);
             document.querySelector(".iilistBull4").style.display='block'
       
             iiListLevels4(level4)
           
           }else{
             document.querySelector(".iilistBull4").style.display='none'
           }
   
  }
 
  const   CoachingandMentoring = response.filter((d) => d.info.areas=="Coaching and Mentoring");
  if (CoachingandMentoring.length>0) {
   document.querySelector(".flush-heading31").style.display="block"
   const level1 = CoachingandMentoring.filter((d)=>d.info.levels=="Level 1")
      
             if(level1.length >0){
               console.log(level1);
               menListLevels1(level1)
               document.querySelector(".menlistBull1").style.display='block'
             }else{
               document.querySelector(".menlistBull1").style.display='none'
             }
           const level2 = CoachingandMentoring.filter((d)=>d.info.levels=="Level 2")
           if(level2.length>0){
             document.querySelector(".menlistBull2").style.display='block'
             console.log(level2);
             menListLevels2(level2)
           
           }else{
             document.querySelector(".menlistBull2").style.display='none'
           }
           const level3 = CoachingandMentoring.filter((d)=>d.info.levels=="Level 3")
           if(level3.length!==0){
             document.querySelector(".menlistBull3").style.display='block'
             menListLevels3(level3)
         
           }else{
             document.querySelector(".menlistBull3").style.display='none'
           }
           const level4 = CoachingandMentoring.filter((d)=>d.info.levels=="Level 4")
           if(level4.length!==0){
             console.log(level4);
             document.querySelector(".menlistBull4").style.display='block'
       
             menListLevels4(level4)
           
           }else{
             document.querySelector(".menlistBull4").style.display='none'
           }
   
  }
 
  const   TeamOrientation= response.filter((d) => d.info.areas=="Team Orientation");
  if (TeamOrientation.length>0) {
   document.querySelector(".flush-heading32").style.display="block"
   const level1 = TeamOrientation.filter((d)=>d.info.levels=="Level 1")
      
             if(level1.length >0){
               console.log(level1);
               toListLevels1(level1)
               document.querySelector(".tolistBull1").style.display='block'
             }else{
               document.querySelector(".tolistBull1").style.display='none'
             }
           const level2 = TeamOrientation.filter((d)=>d.info.levels=="Level 2")
           if(level2.length>0){
             document.querySelector(".tolistBull2").style.display='block'
             console.log(level2);
             toListLevels2(level2)
           
           }else{
             document.querySelector(".tolistBull2").style.display='none'
           }
           const level3 = TeamOrientation.filter((d)=>d.info.levels=="Level 3")
           if(level3.length!==0){
             document.querySelector(".tolistBull3").style.display='block'
             toListLevels3(level3)
         
           }else{
             document.querySelector(".tolistBull3").style.display='none'
           }
           const level4 = TeamOrientation.filter((d)=>d.info.levels=="Level 4")
           if(level4.length!==0){
             console.log(level4);
             document.querySelector(".tolistBull4").style.display='block'
       
             toListLevels4(level4)
           
           }else{
             document.querySelector(".tolistBull4").style.display='none'
           }
   
  }

  const   InternalAuditing  = response.filter((d) => d.info.areas=="Internal Auditing");
  if (InternalAuditing.length>0) {
   document.querySelector(".flush-heading33").style.display="block"
   const level1 = InternalAuditing.filter((d)=>d.info.levels=="Level 1")
      
             if(level1.length >0){
               console.log(level1);
               ioListLevels1(level1)
               document.querySelector(".iolistBull1").style.display='block'
             }else{
               document.querySelector(".iolistBull1").style.display='none'
             }
           const level2 = InternalAuditing.filter((d)=>d.info.levels=="Level 2")
           if(level2.length>0){
             document.querySelector(".iolistBull2").style.display='block'
             console.log(level2);
             ioListLevels2(level2)
           
           }else{
             document.querySelector(".iolistBull2").style.display='none'
           }
           const level3 = InternalAuditing.filter((d)=>d.info.levels=="Level 3")
           if(level3.length!==0){
             document.querySelector(".iolistBull3").style.display='block'
             ioListLevels3(level3)
         
           }else{
             document.querySelector(".iolistBull3").style.display='none'
           }
           const level4 = InternalAuditing.filter((d)=>d.info.levels=="Level 4")
           if(level4.length!==0){
             console.log(level4);
             document.querySelector(".iolistBull4").style.display='block'
       
             ioListLevels4(level4)
           
           }else{
             document.querySelector(".iolistBull4").style.display='none'
           }
   
  }

  const   EngagementManagement  = response.filter((d) => d.info.areas=="Engagement Management");
  if (EngagementManagement.length>0) {
   document.querySelector(".flush-heading34").style.display="block"
   const level1 = EngagementManagement.filter((d)=>d.info.levels=="Level 1")
      
             if(level1.length >0){
               console.log(level1);
               emListLevels1(level1)
               document.querySelector(".emlistBull1").style.display='block'
             }else{
               document.querySelector(".emlistBull1").style.display='none'
             }
           const level2 = EngagementManagement.filter((d)=>d.info.levels=="Level 2")
           if(level2.length>0){
             document.querySelector(".emlistBull2").style.display='block'
             console.log(level2);
             emListLevels2(level2)
           
           }else{
             document.querySelector(".emlistBull2").style.display='none'
           }
           const level3 = EngagementManagement.filter((d)=>d.info.levels=="Level 3")
           if(level3.length!==0){
             document.querySelector(".emlistBull3").style.display='block'
             emListLevels3(level3)
         
           }else{
             document.querySelector(".emlistBull3").style.display='none'
           }
           const level4 = EngagementManagement.filter((d)=>d.info.levels=="Level 4")
           if(level4.length!==0){
             console.log(level4);
             document.querySelector(".emlistBull4").style.display='block'
       
             emListLevels4(level4)
           
           }else{
             document.querySelector(".emlistBull4").style.display='none'
           }
   
  }
  
  const   InformationManagement  = response.filter((d) => d.info.areas=="Information Management");
  if (InformationManagement.length>0) {
   document.querySelector(".flush-heading35").style.display="block"
   const level1 = InformationManagement.filter((d)=>d.info.levels=="Level 1")
      
             if(level1.length >0){
               console.log(level1);
               imListLevels1(level1)
               document.querySelector(".imlistBull1").style.display='block'
             }else{
               document.querySelector(".imlistBull1").style.display='none'
             }
           const level2 = InformationManagement.filter((d)=>d.info.levels=="Level 2")
           if(level2.length>0){
             document.querySelector(".imlistBull2").style.display='block'
             console.log(level2);
             imListLevels2(level2)
           
           }else{
             document.querySelector(".imlistBull2").style.display='none'
           }
           const level3 = InformationManagement.filter((d)=>d.info.levels=="Level 3")
           if(level3.length!==0){
             document.querySelector(".imlistBull3").style.display='block'
             imListLevels3(level3)
         
           }else{
             document.querySelector(".imlistBull3").style.display='none'
           }
           const level4 = InformationManagement.filter((d)=>d.info.levels=="Level 4")
           if(level4.length!==0){
             console.log(level4);
             document.querySelector(".imlistBull4").style.display='block'
       
             imListLevels4(level4)
           
           }else{
             document.querySelector(".imlistBull4").style.display='none'
           }
   
  }
  const   ResearchandAnalysis  = response.filter((d) => d.info.areas=="Research and Analysis");
  if (ResearchandAnalysis.length>0) {
   document.querySelector(".flush-heading36").style.display="block"
   const level1 = ResearchandAnalysis.filter((d)=>d.info.levels=="Level 1")
      
             if(level1.length >0){
               console.log(level1);
               raListLevels1(level1)
               document.querySelector(".ralistBull1").style.display='block'
             }else{
               document.querySelector(".ralistBull1").style.display='none'
             }
           const level2 = ResearchandAnalysis.filter((d)=>d.info.levels=="Level 2")
           if(level2.length>0){
             document.querySelector(".ralistBull2").style.display='block'
             console.log(level2);
             raListLevels2(level2)
           
           }else{
             document.querySelector(".ralistBull2").style.display='none'
           }
           const level3 = ResearchandAnalysis.filter((d)=>d.info.levels=="Level 3")
           if(level3.length!==0){
             document.querySelector(".ralistBull3").style.display='block'
             raListLevels3(level3)
         
           }else{
             document.querySelector(".ralistBull3").style.display='none'
           }
           const level4 = ResearchandAnalysis.filter((d)=>d.info.levels=="Level 4")
           if(level4.length!==0){
             console.log(level4);
             document.querySelector(".ralistBull4").style.display='block'
       
             raListLevels4(level4)
           
           }else{
             document.querySelector(".ralistBull4").style.display='none'
           }
   
  }

  const   AdvocacyNegotiation  = response.filter((d) => d.info.areas=="Advocacy / Negotiation");
  if (AdvocacyNegotiation.length>0) {
   document.querySelector(".flush-heading37").style.display="block"
   const level1 = AdvocacyNegotiation.filter((d)=>d.info.levels=="Level 1")
      
             if(level1.length >0){
               console.log(level1);
               anListLevels1(level1)
               document.querySelector(".anlistBull1").style.display='block'
             }else{
               document.querySelector(".anlistBull1").style.display='none'
             }
           const level2 = AdvocacyNegotiation.filter((d)=>d.info.levels=="Level 2")
           if(level2.length>0){
             document.querySelector(".anlistBull2").style.display='block'
             console.log(level2);
             anListLevels2(level2)
           
           }else{
             document.querySelector(".anlistBull2").style.display='none'
           }
           const level3 = AdvocacyNegotiation.filter((d)=>d.info.levels=="Level 3")
           if(level3.length!==0){
             document.querySelector(".anlistBull3").style.display='block'
             anListLevels3(level3)
         
           }else{
             document.querySelector(".anlistBull3").style.display='none'
           }
           const level4 = AdvocacyNegotiation.filter((d)=>d.info.levels=="Level 4")
           if(level4.length!==0){
             console.log(level4);
             document.querySelector(".anlistBull4").style.display='block'
       
             anListLevels4(level4)
           
           }else{
             document.querySelector(".anlistBull4").style.display='none'
           }
   
  }

  const   EthicsandProfessionalism  = response.filter((d) => d.info.areas=="Ethics and Professionalism");
  if (EthicsandProfessionalism.length>0) {
   document.querySelector(".flush-heading38").style.display="block"
   const level1 = EthicsandProfessionalism.filter((d)=>d.info.levels=="Level 1")
      
             if(level1.length >0){
               console.log(level1);
               epListLevels1(level1)
               document.querySelector(".eplistBull1").style.display='block'
             }else{
               document.querySelector(".eplistBull1").style.display='none'
             }
           const level2 = EthicsandProfessionalism.filter((d)=>d.info.levels=="Level 2")
           if(level2.length>0){
             document.querySelector(".eplistBull2").style.display='block'
             console.log(level2);
             epListLevels2(level2)
           
           }else{
             document.querySelector(".eplistBull2").style.display='none'
           }
           const level3 = EthicsandProfessionalism.filter((d)=>d.info.levels=="Level 3")
           if(level3.length!==0){
             document.querySelector(".eplistBull3").style.display='block'
             epListLevels3(level3)
         
           }else{
             document.querySelector(".eplistBull3").style.display='none'
           }
           const level4 = EthicsandProfessionalism.filter((d)=>d.info.levels=="Level 4")
           if(level4.length!==0){
             console.log(level4);
             document.querySelector(".eplistBull4").style.display='block'
       
             epListLevels4(level4)
           
           }else{
             document.querySelector(".eplistBull4").style.display='none'
           }
   
  }
  const   StrategicCapability  = response.filter((d) => d.info.areas=="Strategic Capability / Leadership or Direction Setting");
  if (StrategicCapability.length>0) {
   document.querySelector(".flush-heading39").style.display="block"
   const level1 = StrategicCapability.filter((d)=>d.info.levels=="Level 1")
      
             if(level1.length >0){
               console.log(level1);
               scListLevels1(level1)
               document.querySelector(".sclistBull1").style.display='block'
             }else{
               document.querySelector(".sclistBull1").style.display='none'
             }
           const level2 = StrategicCapability.filter((d)=>d.info.levels=="Level 2")
           if(level2.length>0){
             document.querySelector(".sclistBull2").style.display='block'
             console.log(level2);
             scListLevels2(level2)
           
           }else{
             document.querySelector(".sclistBull2").style.display='none'
           }
           const level3 = StrategicCapability.filter((d)=>d.info.levels=="Level 3")
           if(level3.length!==0){
             document.querySelector(".sclistBull3").style.display='block'
             scListLevels3(level3)
         
           }else{
             document.querySelector(".sclistBull3").style.display='none'
           }
           const level4 = StrategicCapability.filter((d)=>d.info.levels=="Level 4")
           if(level4.length!==0){
             console.log(level4);
             document.querySelector(".sclistBull4").style.display='block'
       
             scListLevels4(level4)
           
           }else{
             document.querySelector(".sclistBull4").style.display='none'
           }
   
  }

  const   ChangeReadiness  = response.filter((d) => d.info.areas=="Change Readiness");
  if (ChangeReadiness.length>0) {
   document.querySelector(".flush-heading40").style.display="block"
   const level1 = ChangeReadiness.filter((d)=>d.info.levels=="Level 1")
      
             if(level1.length >0){
               console.log(level1);
               crListLevels1(level1)
               document.querySelector(".crlistBull1").style.display='block'
             }else{
               document.querySelector(".crlistBull1").style.display='none'
             }
           const level2 = ChangeReadiness.filter((d)=>d.info.levels=="Level 2")
           if(level2.length>0){
             document.querySelector(".crlistBull2").style.display='block'
             console.log(level2);
             crListLevels2(level2)
           
           }else{
             document.querySelector(".crlistBull2").style.display='none'
           }
           const level3 = ChangeReadiness.filter((d)=>d.info.levels=="Level 3")
           if(level3.length!==0){
             document.querySelector(".crlistBull3").style.display='block'
             crListLevels3(level3)
         
           }else{
             document.querySelector(".crlistBull3").style.display='none'
           }
           const level4 = ChangeReadiness.filter((d)=>d.info.levels=="Level 4")
           if(level4.length!==0){
             console.log(level4);
             document.querySelector(".crlistBull4").style.display='block'
       
             crListLevels4(level4)
           
           }else{
             document.querySelector(".crlistBull4").style.display='none'
           }
   
  }

  const   CognitiveAbility  = response.filter((d) => d.info.areas=="Cognitive Ability");
  if (CognitiveAbility.length>0) {
   document.querySelector(".flush-heading41").style.display="block"
   const level1 = CognitiveAbility.filter((d)=>d.info.levels=="Level 1")
      
             if(level1.length >0){
               console.log(level1);
               caListLevels1(level1)
               document.querySelector(".calistBull1").style.display='block'
             }else{
               document.querySelector(".calistBull1").style.display='none'
             }
           const level2 = CognitiveAbility.filter((d)=>d.info.levels=="Level 2")
           if(level2.length>0){
             document.querySelector(".calistBull2").style.display='block'
             console.log(level2);
             caListLevels2(level2)
           
           }else{
             document.querySelector(".calistBull2").style.display='none'
           }
           const level3 = CognitiveAbility.filter((d)=>d.info.levels=="Level 3")
           if(level3.length!==0){
             document.querySelector(".calistBull3").style.display='block'
             caListLevels3(level3)
         
           }else{
             document.querySelector(".calistBull3").style.display='none'
           }
           const level4 = CognitiveAbility.filter((d)=>d.info.levels=="Level 4")
           if(level4.length!==0){
             console.log(level4);
             document.querySelector(".calistBull4").style.display='block'
       
             caListLevels4(level4)
           
           }else{
             document.querySelector(".calistBull4").style.display='none'
           }
   
  }

  const   CustomerOrientation  = response.filter((d) => d.info.areas=="Customer Orientation and Customer Focus");
  if (CustomerOrientation.length>0) {
   document.querySelector(".flush-heading42").style.display="block"
   const level1 = CustomerOrientation.filter((d)=>d.info.levels=="Level 1")
      
             if(level1.length >0){
               console.log(level1);
               ccListLevels1(level1)
               document.querySelector(".cclistBull1").style.display='block'
             }else{
               document.querySelector(".cclistBull1").style.display='none'
             }
           const level2 = CustomerOrientation.filter((d)=>d.info.levels=="Level 2")
           if(level2.length>0){
             document.querySelector(".cclistBull2").style.display='block'
             console.log(level2);
             ccListLevels2(level2)
           
           }else{
             document.querySelector(".cclistBull2").style.display='none'
           }
           const level3 = CustomerOrientation.filter((d)=>d.info.levels=="Level 3")
           if(level3.length!==0){
             document.querySelector(".cclistBull3").style.display='block'
             ccListLevels3(level3)
         
           }else{
             document.querySelector(".cclistBull3").style.display='none'
           }
           const level4 = CustomerOrientation.filter((d)=>d.info.levels=="Level 4")
           if(level4.length!==0){
             console.log(level4);
             document.querySelector(".cclistBull4").style.display='block'
       
             ccListLevels4(level4)
           
           }else{
             document.querySelector(".cclistBull4").style.display='none'
           }
   
  }
//   // let option =""
//   // let html =""
//   // let list = document.querySelector(".listdata124")
 
//   // result.forEach(department => {
//   //     option=` <li>${department.details}</li>`;
//   //     html +=option;
//   //     list.innerHTML=html;
     
      
//   // });


}


// function ListLevels4(result) {
//   let option =""
//   let html =""
//   let list = document.querySelector(".listdata124")
 
//   result.forEach(department => {
//       option=` <li>${department.details}</li>`;
//       html +=option;
//       list.innerHTML=html;
     
      
//   });
// }

function Position() {
    document.querySelector(".listBull1").classList.remove("active")
    document.querySelector(".listBull2").classList.remove("active")
    document.querySelector(".listBull3").classList.remove("active")
    document.querySelector(".listBull4").classList.remove("active")
   
    let html =`<option value="" selected>Position / designation</option>`
  
    let code = document.getElementById("department").value
   
  console.log(code);
    
    // let municipality = document.getElementById("municipality").value
    // console.log(municipality);  
    axios.post('/position',{
      position:code,
       
    })
    .then(function (response) {
      document.querySelector(".flush-heading0").style.display="none"
      document.querySelector(".flush-heading1").style.display="none"
      document.querySelector(".flush-heading2").style.display="none"
      document.querySelector(".flush-heading3").style.display="none"
      document.querySelector(".flush-heading4").style.display="none"
      document.querySelector(".flush-heading5").style.display="none"
      document.querySelector(".flush-heading6").style.display="none"
      document.querySelector(".flush-heading7").style.display="none"
      // document.querySelector(".flush-heading8").style.display="none"
      document.querySelector(".flush-heading9").style.display="none"
      document.querySelector(".flush-heading10").style.display="none"
      document.querySelector(".flush-heading11").style.display="none"
      document.querySelector(".flush-heading12").style.display="none"
      document.querySelector(".flush-heading13").style.display="none"
      document.querySelector(".flush-heading14").style.display="none"
      document.querySelector(".flush-heading15").style.display="none"
      document.querySelector(".flush-heading16").style.display="none"
      document.querySelector(".flush-heading17").style.display="none"
      document.querySelector(".flush-heading18").style.display="none"
      document.querySelector(".flush-heading19").style.display="none"
      document.querySelector(".flush-heading20").style.display="none"
      document.querySelector(".flush-heading21").style.display="none"
      document.querySelector(".flush-heading22").style.display="none"
      document.querySelector(".flush-heading23").style.display="none"
      document.querySelector(".flush-heading24").style.display="none"
      document.querySelector(".flush-heading25").style.display="none"
      document.querySelector(".flush-heading26").style.display="none"
      document.querySelector(".flush-heading27").style.display="none"
      document.querySelector(".flush-heading28").style.display="none"
      document.querySelector(".flush-heading29").style.display="none"
      document.querySelector(".flush-heading30").style.display="none"
      document.querySelector(".flush-heading31").style.display="none"
      document.querySelector(".flush-heading32").style.display="none"
     

      console.log(response.data);
     
    

     const professionalcompetencies= response.data.filter((d) => d.info.competencyDivision =="CORE PROFESSIONAL COMPETENCIES")
     console.log(professionalcompetencies);
     if (professionalcompetencies.length>0) {
      console.log("professionalcompetencies is here");
      document.querySelector(".sub-btn1").style.display="block"
      if (section==1) {
        Professional(professionalcompetencies)
      }
      
       
     }
     const functionalcompetencies=response.data.filter((d) => d.info.competencyDivision=="FUNCTIONAL COMPETENCIES")
     if (functionalcompetencies.length>0) {
      console.log(functionalcompetencies);
      console.log("functionalcompetencies is here");
      document.querySelector(".sub-btn2").style.display="block"
      if (section==2) {
        console.log(section);
        Functional(functionalcompetencies)
      }
     
     }
     const public=response.data.filter((d) => d.info.competencyDivision=="PUBLIC SERVICE ORIENTATION COMPETENCIES")
     if (public.length>0) {
      console.log("public is here");
      document.querySelector(".sub-btn3").style.display="block"
      if (section==3) {
        console.log(section);
        PublicManagement(public)
      }
     
     }
     

     const management=response.data.filter((d) => d.info.competencyDivision=="MANAGEMENT / LEADERSHIP COMPETENCIES")
     if (management.length>0) {
      console.log("management is here");
      document.querySelector(".sub-btn4").style.display="block"
      if (section==4) {
        console.log(section);
         Leadership(management)
      }
     
     }

     const personal =response.data.filter((d) => d.info.competencyDivision=="PERSONAL COMPETENCIES")
     if (personal.length>0) {
      console.log("personal is here");
      document.querySelector(".sub-btn5").style.display="block"
      if (section==5) {
        console.log(section);
        Personal(personal)      
      }
     
     }

    
          
          })
          .catch(function (error) {
            console.log(error);
          });
}
function fetchCompetencyOnload(userData) {
  axios.post('/fetchcomp',{compcode:userData.competencies})
  .then(function (response) {
   
   Muncipality(response.data, userData)
  
  })
  .catch(function (error) {
    console.log(error);
  });
}
function Department(userdata) {
  
    let division = document.getElementById("division").value
    console.log(division); 
    axios.post('/department',{division:division})
    .then(function (response) {
     console.log(response.data);
      let option =""
      let html =`<option value="" selected>Position</option>`
      let list = document.getElementById("department")
      response.data.forEach(department => {
          option=`<option  value="${department.code}">${department.title}</option>`;
          html +=option;
          list.innerHTML=html;
         
          
      });
     
        if (typeof userdata.competencies !=="undefinded") {
          console.log(userdata.competencies);
          document.getElementById("department").value=userdata.competencies
          Position()
        }
    

 
    })
    .catch(function (error) {
      console.log(error);
    });
}
function  Muncipality(userData, UserData2) {
   
    document.getElementById("department").value=""
    axios.post('/division')
      .then(async function  (response) {
        const data =  removeDuplicates(response.data)
       console.log(data);
        let option =""
        let html =`<option id="muni1" selected>Division</option>`
        let list = document.getElementById("division")
        let count=0
        data.forEach(division => {
            option=`<option  value="${division.division}">${division.division}</option>`;
            html +=option;
            list.innerHTML=html;
           console.log(list);
            count++
        })
        console.log(count);
        console.log(userData);
       document.getElementById("division").value=userData[0].division
       if (userData[0].division!=="") {
        Department(UserData2)
       }
  //  document.getElementById("department").value=response.data[0].title
      })
      .catch(function (error) {
        console.log(error);
      });
}

function removeDuplicates(data) {
  const uniqueIds = [];

  const unique = data.filter(element => {
    const isDuplicate = uniqueIds.includes(element.division);
  
    if (!isDuplicate) {
      uniqueIds.push(element.division);
  
      return true;
    }
  
    return false;
  });
  
  // 👇️ [{id: 1, name: 'Tom'}, {id: 2, name: 'Nick'}]
  return unique
}

function UpdateUser() {
    const query = window.location.search;
    const url = new URLSearchParams(query);
    const ID = url.get("User");
    let Name = document.getElementById("Name").value;
    let MiddleName =document.getElementById("MiddleName").value
    let Surname =document.getElementById("Surname").value
    let Birth =document.getElementById("Birth").value
    let Age =document.getElementById("age").value
    let EmployeeNumber =document.getElementById("EmployeeNumber").value
    axios.post('/updateprofile', {
        Name:Name,
        surname:Surname,
        employeeNumber: EmployeeNumber,
        middlename:MiddleName,
        birth:Birth,
        age:Age,
        ID:ID
      })
      .then(function (response) {
        
        if (response.data.status =="success") {
          alert("Updated Successfully")
        }
      })
      .catch(function (error) {
        alert(error);
      });
    
}

function UpdateEmployee() {
  const query = window.location.search;
  const url = new URLSearchParams(query);
  const ID = url.get("User");
        let CurrentPotision =document.getElementById("CurrentPotision").value
        let Divison =document.getElementById("DivisonEmp").value
        let Department =document.getElementById("DepartmentEmp").value
        let Muncipality =document.getElementById("MuncipalityEmp").value
        // let Duration =document.getElementById("Duration").value

  axios.post('/experience', {
    jobTitle:CurrentPotision,
    division:Divison,
      employeeNumber: EmployeeNumber,
      department:Department,
      municipality:Muncipality,
    
      ID:ID
    })
    .then(function (response) {
      
      if (response.data.status =="success") {
        alert("Updated Successfully")
      }
    })
    .catch(function (error) {
      alert(error);
    });
  
}
function getOtherExperience() {
  const query = window.location.search;
	const url = new URLSearchParams(query);
	const ID = url.get("User");
  axios.post('/getotherexperience',{
      ID:ID,
    
  })
  .then(async function (response) {
   console.log(response.data);

  let list = document.querySelector(".otherexperience")
  let html=""
  let button=""
  let count =1
   response.data.forEach(btn => {
    count++
    button=` <button type="button"  onclick="DisplayExperience('${btn.id}');DisplayButtonExperience(3)" class="btn sub-btn   btn-dark">Position ${count}</button>`;
       html +=button;
       list.innerHTML=html; 
   });
 
  })
  .catch(function (error) {
    console.log(error);
  });
}

function DisplayExperience(id) {
  console.log(id);
  const query = window.location.search;
	const url = new URLSearchParams(query);
	const ID = url.get("User");

  axios.post('/displayexperience',{
      ID:ID,
      id:id
    
  })
  .then(async function (response) {
  console.log(response);
   document.getElementById("experienceTitle").innerHTML=response.data.jobTitle

   document.getElementById("CurrentPotision3").value=response.data.jobTitle
   document.getElementById("DivisonEmp3").value=response.data.division
   document.getElementById("DepartmentEmp3").value=response.data.department
   document.getElementById("MuncipalityEmp3").value=response.data.municipality
   document.getElementById("DurationEmp3").value=response.data.duration

 document.getElementById("save-delete55").innerHTML=`
      <button type="button" class="btn  btn-dark" onclick="Updateperience3('${id}')">Save</button>
      <button type="button" class="btn  btn-danger" onclick="DeleteExperience('${id}')" >Delete</button>
      `

  })
  .catch(function (error) {
    console.log(error);
  });
}


function DeleteExperience(id) {
  const query = window.location.search;
	const url = new URLSearchParams(query);
	const ID = url.get("User");
  axios.post('/deleteperience',{
  
    ID:ID,
    id:id
  
})
.then(async function (response) {
 console.log(response.data);
alert("Deleted successfully")
getOtherExperience()
})
.catch(function (error) {
  console.log(error);
});

}
function Updateperience3(id) {
 
  const query = window.location.search;
	const url = new URLSearchParams(query);
	const ID = url.get("User");
  let CurrentPotision =document.getElementById("CurrentPotision3").value
  let Divison =document.getElementById("DivisonEmp3").value
  let Department =document.getElementById("DepartmentEmp3").value
  let Muncipality =document.getElementById("MuncipalityEmp3").value
  let Duration =document.getElementById("DurationEmp3").value


  axios.post('/upadteaddexperience', {
    jobTitle:CurrentPotision,
    division:Divison,
      department:Department,
      municipality:Muncipality,
      duration:Duration,
      ID:ID,
      id:id
    })
    .then(function (response) {
      
      if (response.data.status =="success") {
        alert("Updated Successfully")
      }
    })
    .catch(function (error) {
      alert(error);
    });

}
function AddEmployee() {
  const query = window.location.search;
  const url = new URLSearchParams(query);
  const ID = url.get("User");
        let CurrentPotision =document.getElementById("CurrentPotision2").value
        let Divison =document.getElementById("DivisonEmp2").value
        let Department =document.getElementById("DepartmentEmp2").value
        let Muncipality =document.getElementById("MuncipalityEmp2").value
        let Duration =document.getElementById("DurationEmp2").value


        axios.post('/addexperience', {
          jobTitle:CurrentPotision,
          division:Divison,
            department:Department,
            municipality:Muncipality,
            duration:Duration,
            ID:ID
          })
          .then(function (response) {
            
            if (response.data.status =="success") {
              alert("Updated Successfully")
              getOtherExperience()
            }
          })
          .catch(function (error) {
            alert(error);
          });
  
}
function SaveLanguage() {

  const query = window.location.search;
	const url = new URLSearchParams(query);
	const ID = url.get("User");
    var entry = document.getElementsByClassName("checks1");
    console.log(entry);
	var str = "";
	for (i = 0; i < 1; i++) {
		if (entry[i].checked === true) {
			console.log(entry[i].value);
			str += entry[i].value;
			axios.post('/language', {
				language:entry[i].value,
				ID:ID
			  })
			  .then(function (response) {
				console.log(response);
				alert("Saved successfully")
			  })
			  .catch(function (error) {
				console.log(error);
			  });
      
		} 
	}
}
function UpdateProfessional() {
  const query = window.location.search;
  const url = new URLSearchParams(query);
  const ID = url.get("User");
  let pbody = document.getElementById("pbody").value
  let pmembership = document.getElementById("pmembership").value
  let idmembership = document.getElementById("idmembership").value
  let memberistitute = document.getElementById("memberistitute").value

  
  axios.post('/membership', {
        tyeofmemeber:pmembership,
        namebody:pbody,
        idmembership: idmembership,
        memberistitute:memberistitute,
          ID:ID
    })
    .then(function (response) {
      
      if (response.data.status =="success") {
        alert("Updated Successfully")
      }
    })
    .catch(function (error) {
      alert(error);
    });
  
}

function AddProfessional() {
  const query = window.location.search;
  const url = new URLSearchParams(query);
  const ID = url.get("User");
  let pbody = document.getElementById("pbody2").value
  let pmembership = document.getElementById("pmembership2").value
  let idmembership = document.getElementById("idmembership2").value
  let memberistitute = document.getElementById("memberistitute2").value
  
  axios.post('/addmembership', {
        tyeofmemeber:pmembership,
        namebody:pbody,
        idmembership: idmembership,
        memberistitute:memberistitute,
          ID:ID
    })
    .then(function (response) {
      
      if (response.data.status =="success") {
        alert("Added Successfully")
      }
    })
    .catch(function (error) {
      alert(error);
    });
  
}
function calculateAge() {
    // Get the birthdate input value
    var birthdate = document.getElementById('Birth').value;

    // Parse the input value to a Date object
    var birthDateObj = new Date(birthdate);

    // Get the current date
    var currentDate = new Date();

    // Calculate the difference in years
    var age = currentDate.getFullYear() - birthDateObj.getFullYear();

    // Check if the birthday has already occurred this year
    if (currentDate.getMonth() < birthDateObj.getMonth() || 
        (currentDate.getMonth() === birthDateObj.getMonth() && currentDate.getDate() < birthDateObj.getDate())) {
      age--;
    }

    // Display the result
    document.getElementById('age').value =  age ;
  }

function SignOut() {
    
        const query = window.location.search;
        const url = new URLSearchParams(query);
        const ID = url.get("User");

        axios.post('/signout', {
            ID:ID
          })
          .then(function (response) {
          
            if (response.data.status =="success") {
                location.href="/login"
            }
          })
          .catch(function (error) {
            console.log(error);
          });
}

 function StateChange() {
    const query = window.location.search;
	const url = new URLSearchParams(query);
	const ID = url.get("User");
    axios.post('/user', {
        ID:ID
      })
      .then(function (response) {
        console.log(response);
        if (response.data.status =="success") {
            getData(response.data.data)
            fetchCompetencyOnload(response.data.data)
        }
      })
      .catch(function (error) {
        console.log(error);
      });
 }

function getData(userData) {
 console.log(userData);
       
            console.log(userData.employeeNameS);
            if(typeof userData.Surname!=="undefined" && typeof userData.Name!=="undefined"){
              document.getElementById("username").innerHTML=userData.Name+" "+userData.Surname
            }
            if(typeof userData.employeeNameS!=="undefined"){
              document.getElementById("Name").value=userData.employeeNameS
            }
            if(typeof userData.employeeMiddleNameS!=="undefined"){
              document.getElementById("MiddleName").value=userData.employeeMiddleNameS
            }
            if(typeof userData.employeeSurname!=="undefined"){
              document.getElementById("Surname").value=userData.employeeSurname
              
            }
            if(typeof userData.dateOfBirth!=="undefined"){
              document.getElementById("Birth").value=userData.dateOfBirth
            }
            if(typeof userData.age!=="undefined"){
              document.getElementById("age").value=userData.age
            }
            if(typeof userData.QualificationName!=="undefined"){
              document.getElementById("Qualification").value=userData.QualificationName
            }
            if(typeof userData.Qualification!=="undefined"){
              document.getElementById("quaData1").innerHTML=`<a href="${userData.Qualification}" target="_blank" rel="noopener noreferrer">Uploaded qualififcation</a>`
         
            }
            if(typeof userData.empCode!=="undefined"){
              document.getElementById("EmployeeNumber").value=userData.empCode
            }
            if(typeof userData.Institution!=="undefined"){
              document.getElementById("Institution").value=userData.Institution
            }
            if(typeof userData.TypeOfQualification!=="undefined"){
             if ( userData.TypeOfQualification === "Formal") {
              document.getElementById("showInput1").checked =true
              document.querySelector(".select1").classList.add("active") 
              document.getElementById("level").value=userData.Level
             } else {
              document.getElementById("showInput2").checked=true
              document.querySelector(".select2").classList.add("active")
              document.getElementById("level").value=userData.Level
             }
             
          
            }
            if(typeof userData.jobTitle!=="undefined"){
              document.getElementById("CurrentPotision").value=userData.jobTitle
            }
         
            if(typeof userData.division!=="undefined"){
              document.getElementById("DivisonEmp").value=userData.division
            }
            if(typeof userData.department!=="undefined"){
              document.getElementById("DepartmentEmp").value=userData.department
            }
            if(typeof userData.municipality!=="undefined"){
              document.getElementById("MuncipalityEmp").value=userData.municipality
            }
          
            if(typeof userData.Duration!=="undefined"){
              document.getElementById("Duration").value=userData.Duration
            }
           
            if(typeof userData.tyeofmemeber!=="undefined"){
              document.getElementById("pbody").value=userData.tyeofmemeber
            }
            if(typeof userData.Duration!=="undefined"){
              document.getElementById("pmembership").value=userData.namebody
            }
            if(typeof userData.Duration!=="undefined"){
              document.getElementById("idmembership").value=userData.idmembership
            }
            if(typeof userData.Duration!=="undefined"){
              document.getElementById("memberistitute").value=userData.memberistitute
            }
         
        
          
          
                  
}
function Home() {
    location.href="login.html"
}
function toggleInput(num) {
    document.querySelector(".select1").classList.remove("active")
    document.querySelector(".select2").classList.remove("active")
    document.querySelector(".select3").classList.remove("active")
    document.querySelector(".select4").classList.remove("active")
   
    let cont =`.select${num}`
    document.querySelector(cont).classList.add("active") 
   
  }
function SideBar() {
    console.log("side");
    document.querySelector(".button-links").classList.toggle("active")
    document.querySelector(".fomD").classList.toggle("active")
  }
function DisplayButton(num) {
    document.querySelector(".btn0").classList.remove("active")
    document.querySelector(".btn1").classList.remove("active")
    document.querySelector(".btn2").classList.remove("active")
    document.querySelector(".btn3").classList.remove("active")
    document.querySelector(".btn4").classList.remove("active")
    document.querySelector(".btn5").classList.remove("active")

    document.querySelector(".data-container0").classList.remove("active")
    document.querySelector(".data-container1").classList.remove("active")
    document.querySelector(".data-container2").classList.remove("active")
    document.querySelector(".data-container3").classList.remove("active")
    document.querySelector(".data-container4").classList.remove("active")
    document.querySelector(".data-container5").classList.remove("active")
    let btn=`.btn${num}`
    let cont =`.data-container${num}`
  
    document.querySelector(btn).classList.add("active")    
    document.querySelector(cont).classList.add("active")  
          

}


function DisplayButtonQualification(num) {
    document.querySelector(".sub-btn-qua1").classList.remove("active")
    document.querySelector(".sub-btn-qua2").classList.remove("active")

   
    document.querySelector(".sub-qua1").classList.remove("active")
    document.querySelector(".sub-qua2").classList.remove("active")
    document.querySelector(".sub-qua3").classList.remove("active")
    let btn=`.sub-btn-qua${num}`
    let cont =`.sub-qua${num}`
  if(num==3){
    document.querySelector(cont).classList.add("active")  
  }else{
    document.querySelector(cont).classList.add("active")  
    document.querySelector(btn).classList.add("active")    
   
  }
   
        
}
function DisplayButtonExperience(num) {
    document.querySelector(".sub-btn-exp1").classList.remove("active")
    document.querySelector(".sub-btn-exp2").classList.remove("active")
  

    document.querySelector(".sub-exp1").classList.remove("active")
    document.querySelector(".sub-exp2").classList.remove("active")
    document.querySelector(".sub-exp3").classList.remove("active")
    let btn=`.sub-btn-exp${num}`
    let cont =`.sub-exp${num}`
    if(num==3){
      document.querySelector(cont).classList.add("active") 
    }else{
      document.querySelector(btn).classList.add("active")    
    document.querySelector(cont).classList.add("active")  
     
    }
    
        
}

function DisplayButtonReg(num) {
    document.querySelector(".sub-btn-reg1").classList.remove("active")
    document.querySelector(".sub-btn-reg2").classList.remove("active")
    

    document.querySelector(".sub-reg1").classList.remove("active")
    document.querySelector(".sub-reg2").classList.remove("active")
   
    let btn=`.sub-btn-reg${num}`
    let cont =`.sub-reg${num}`
  
    document.querySelector(btn).classList.add("active")    
    document.querySelector(cont).classList.add("active")  
        
}