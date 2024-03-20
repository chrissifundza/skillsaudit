
const { auth, db, storage } = require("../firebase/config.js");
const { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, signOut } = require("firebase/auth");
const { SendEmail } = require("./email.js");
const { doc, setDoc, getDoc, collection, getDocs, query, where, addDoc, deleteDoc } = require("firebase/firestore");




const getevryone =async (req, res)=>{

  const CompetenceRef = await getDocs(collection(db, "users2"));


  let data=[]
  CompetenceRef.forEach((doc) => {
     
   
    data.push(doc.data())
  
  });
  
  res.status(200).json(data);
 
  
  }

 const findmyemployees =async (req, res)=>{

  let data=[]
  let id =''
  const q = query(collection(db, "users2"), where("linemanager", "==",  req.body.empCode));
  
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  let newD={id:doc.id,
    info:doc.data()
  } 

  data.push(newD)
  
  });
  if (data.length>=0) {
    res.status(200).json(data);
  }
 

  }
 const removesubmit =(req, res)=>{ 
 
  const user = req.body.ID
    
    setDoc(doc(db, "users2", user), {
     finalsubmi:"withdrawn submission",
  
    },{ merge: true }).then(()=>{
  
      const status ="success"
      const response={
        status:status
      }
      res.status(200).json(response);
    }).catch((error) => {

      res.json( error.message);
    });
  
    }
 const finalsubmit =(req, res)=>{
 
  const user = req.body.ID
    
    setDoc(doc(db, "users2", user), {
     finalsubmi:"submitted",
  
    },{ merge: true }).then(()=>{
  
      const status ="success"
      const response={
        status:status
      }
      res.status(200).json(response);
    }).catch((error) => {

      res.json( error.message);
    });
  
    }
 const  getratedcompetency= async (req, res)=>{
         
  const querySnapshot = await getDocs(collection(db, "users2",req.body.ID, "competencies"));
  
  let data=[]
  querySnapshot.forEach((doc) => {
     let newD={id:doc.id,
      info:doc.data()
    }
  
    data.push(newD)
   
  });
  
  res.status(200).json(data);  
  }
   const  getratedcompetencysup= async (req, res)=>{
         
    const querySnapshot = await getDocs(collection(db, "users2",req.body.ID, "supervisor"));
    
    let data=[]
    querySnapshot.forEach((doc) => {
       let newD={id:doc.id,
        info:doc.data()
      }
    
      data.push(newD)
     
    });
    
    res.status(200).json(data);  
    }
 const  deleteperience= async (req, res)=>{
  
  deleteDoc(doc(db, "users2", req.body.ID,"otherexperience", req.body.id)).then(()=>{
  const status ="success"
    const response={
      status:status,
    }
    res.status(200).json(response);
}).catch((error) => { 
     
  res.json(error)
});


  }

 const  upadteaddexperience= async (req, res)=>{

  
  setDoc(doc(db, "users2", req.body.ID,"otherexperience", req.body.id), {
    jobTitle:req.body.jobTitle,
    division:req.body.division,
      department:req.body.department,
      municipality:req.body.municipality,
      duration:req.body.duration
    
},{ merge: true }).then(()=>{
  const status ="success"
    const response={
      status:status,
    }
    res.status(200).json(response);
}).catch((error) => {
     
  res.json(error)
});

  }

 const  displayexperience= async (req, res)=>{
         
  const querySnapshot = await getDoc(doc(db, "users2",req.body.ID, "otherexperience",req.body.id));
  
  let data=querySnapshot.data()
 
  res.status(200).json(data);  
  }

 const  getotherexperience= async (req, res)=>{
         
  const querySnapshot = await getDocs(collection(db, "users2",req.body.ID, "otherexperience"));
  
  let data=[]
  querySnapshot.forEach((doc) => {
     let newD={id:doc.id,
      info:doc.data()
    }
  
    data.push(newD)
   
  });
  
  res.status(200).json(data);  
  }
 const  addmembership= async (req, res)=>{
 
  addDoc(collection(db, "users2", req.body.ID,"othermember"), {
    tyeofmemeber:req.body.tyeofmemeber,
    namebody:req.body.namebody,
    idmembership: req.body.idmembership,
    memberistitute:req.body.memberistitute,
    
}).then(()=>{
  const status ="success"
    const response={
      status:status,
    }
    res.status(200).json(response);
}).catch((error) => {
     
  res.json(error)
});

  }
   const  updatexperience= async (req, res)=>{
    let info = req.body.data;
    
    addDoc(collection(db, "users2", req.body.ID,"otherexperience"), {
        jobTitle:req.body.jobTitle,
        division:req.body.division,
        department:req.body.department,
        municipality:req.body.municipality,
        duration:req.body.duration
      
  },{ merge: true }).then(()=>{
    const status ="success"
      const response={
        status:status,
      }
      res.status(200).json(response);
  }).catch((error) => {
       
    res.json(error)
  });
  
    }
  
 const  experience= async (req, res)=>{
  let info = req.body.data;
  
  setDoc(doc(db, "users2", req.body.ID), {
    jobTitle:req.body.jobTitle,
    division:req.body.division,
      employeeNumber: req.body.employeeNumber,
      department:req.body.department,
      municipality:req.body.municipality,
    

},{ merge: true }).then(()=>{
  const status ="success"
    const response={
      status:status,
    }
    res.status(200).json(response);
}).catch((error) => {
     
  res.json(error)
});

  }

 const  language= async (req, res)=>{
  let info = req.body.data;
  
  setDoc(doc(db, "users2", req.body.ID), {
    language:req.body.language
},{ merge: true }).then(()=>{
  const status ="success"
    const response={
      status:status,
    }
    res.status(200).json(response);
}).catch((error) => {
     
  res.json(error)
});

  }

   const  otherlanguage= async (req, res)=>{
    let info = req.body.data;
    
    setDoc(doc(db, "users2", req.body.ID), {
      otherlanguage:req.body.language
  },{ merge: true }).then(()=>{
    const status ="success"
      const response={
        status:status,
      }
      res.status(200).json(response);
  }).catch((error) => {
       
    res.json(error)
  });
  
    }
  
   const  member= async (req, res)=>{
    let info = req.body.data;
    
    setDoc(doc(db, "users2", req.body.ID), {
      tyeofmemeber:req.body.tyeofmemeber,
    namebody:req.body.namebody,
    idmembership: req.body.idmembership,
    memberistitute:req.body.memberistitute,
    
  },{ merge: true }).then(()=>{
    const status ="success"
      const response={
        status:status,
      }
      res.status(200).json(response);
  }).catch((error) => {
       
    res.json(error)
  });
  
    }
  

 const  updateArea= async (req, res)=>{
  let info = req.body.data;
  console.log("Running"+req.body.num);
  setDoc(doc(db, "users2", req.body.ID), {
   [info.areas.replace(/\s/g, '')]:req.body.num
},{ merge: true }).then(()=>{
  const status ="success"
    const response={
      status:status,
    }
    res.status(200).json(response);
}).catch((error) => {
     
  res.json(error)
});

  }

   const  validate= async (req, res)=>{
    let info = req.body.data;
    console.log("called");
    let competency =req.body.competencyDivision
    if(req.body.competencyDivision=="MANAGEMENT/LEADERSHIPCOMPETENCIES"){
      competency="MANAGEMENTLEADERSHIPCOMPETENCIES"
    }
    setDoc(doc(db, "users2", req.body.ID), {
     [competency]:req.body.status
  },{ merge: true }).then(()=>{
    const status ="success"
      const response={
        status:status,
      }
      res.status(200).json(response);
  }).catch((error) => {
       
    res.json(error)
  });
  
    }

     const  getcmpetencydivision= async (req, res)=>{
  
      const CompetenceRef = await getDoc(doc(db, "users2",req.body.ID));


  
      
      res.status(200).json(CompetenceRef.data());
      }
 const  getRate= async (req, res)=>{
  let info = req.body.data;
   console.log(req.body.ID);
const CompetenceRef = await getDocs(collection(db, "users2",req.body.ID,"competencies"));


let data=[]
CompetenceRef.forEach((doc) => {
   
 
  data.push(doc.data())

});
res.status(200).json(data);
}
 const  getRatesup= async (req, res)=>{
  let info = req.body.data;
   console.log(req.body.ID);
const CompetenceRef = await getDocs(collection(db, "users2",req.body.ID,"supervisor"));


let data=[]
CompetenceRef.forEach((doc) => {
   
 
  data.push(doc.data())

});

res.status(200).json(data);

  }

 const  addCompetency= async (req, res)=>{
  let info = req.body.data;
console.log(info.idcomp);
// const collectionRef = collection(database, "users", uid, "invoices");
// addD
console.log(info.idcomp);
  setDoc(doc(db, "users2", req.body.ID,"competencies",info.idcomp), {
    areas:info.areas,
    levels:info.levels,
    details:info.details,
    code:info.code,
    competencyDivision:info.competencyDivision,
    division:info.division,
    title:info.title,
    rate:info.rate,
    idcomp:info.idcomp
},{ merge: true }).then(()=>{
  const status ="success"
    const response={
      status:status,
    }
    res.status(200).json(response);
}).catch((error) => {
     
  res.json(error)
});

  }
   const  addCompetencysup= async (req, res)=>{
    let info = req.body.data;
  console.log(info.idcomp);
  // const collectionRef = collection(database, "users", uid, "invoices");
  // addD
  console.log(info.idcomp);
 let sup="Supervisor"
    setDoc(doc(db, "users2", req.body.ID), {
      [sup+info.areas.replace(/\s/g, '')]:info.rate,
      
  },{ merge: true }).then(()=>{
    const status ="success"
      const response={
        status:status,
      }
      setDoc(doc(db, "users2", req.body.ID,"supervisor",info.idcomp), {
        [sup+info.areas.replace(/\s/g, '')]:info.rate,
        levels:info.levels,
        details:info.details,
        code:info.code,
        competencyDivision:info.competencyDivision,
        division:info.division,
        title:info.title,
        rate:info.rate,
        idcomp:info.idcomp
        
    },{ merge: true }).then(()=>{
      const status ="success"
        const response={
          status:status,
        }
        res.status(200).json(response);
    }).catch((error) => {
         
      res.json(error)
    });
    
  }).catch((error) => {
       
    res.json(error)
  });
  
    }
 const  highestqualification= async (req, res)=>{
  
  setDoc(doc(db, "users2", req.body.ID), {
    QualificationName:req.body.Qualification,
    Institution:req.body.Institution,
    Level:req.body.Level
},{ merge: true }).then(()=>{
  const status ="success"
    const response={
      status:status,
    }
    res.status(200).json(response);
}).catch((error) => {
     
  res.json(error)
});

  }

 const  uploadqualifications= async (req, res)=>{
  const file = req.body.url
  setDoc(doc(db, "users2", req.body.ID), {
    Qualification:file,
    TypeOfQualification:req.body.Type
},{ merge: true }).then(()=>{
  const status ="success"
    const response={
      status:status,
    }
    res.status(200).json(response);
}).catch((error) => {
     
  res.json(error)
});

  }
   const  uploadqualifications2= async (req, res)=>{
    const file = req.body.url
    addDoc(collection(db, "users2", req.body.ID,"otherqualification"), {
      Qualification:file,
      TypeOfQualification:req.body.Type
  }).then((doc)=>{
    const status ="success"
      const response={
        status:status,
        docid:doc.id
      }
      res.status(200).json(response);
  }).catch((error) => {
       
    res.json(error) 
  });
  
    }

     const  highestqualification2= async (req, res)=>{
  
      addDoc(collection(db, "users2", req.body.ID, "otherqualification"), {
        QualificationName:req.body.Qualification,
        Institution:req.body.Institution,
        Level:req.body.Level
    },{ merge: true }).then(()=>{
      const status ="success"
        const response={
          status:status,
        }
        res.status(200).json(response);
    }).catch((error) => {
         
      res.json(error)
    });
    
    
      }

      
     const  updatequalification= async (req, res)=>{
  
      setDoc(doc(db, "users2", req.body.ID, "otherqualification",req.body.docid), {
        QualificationName:req.body.Qualification,
        Institution:req.body.Institution,
        Level:req.body.Level
    },{ merge: true }).then(()=>{
      const status ="success"
        const response={
          status:status,
        }
        res.status(200).json(response);
    }).catch((error) => {
         
      res.json(error)
    });
    
    
      }

       const  deletequalification= async (req, res)=>{
  
        deleteDoc(doc(db, "users2", req.body.ID,"otherqualification", req.body.docid)).then(()=>{
        const status ="success"
          const response={
            status:status,
          }
          res.status(200).json(response);
      }).catch((error) => { 
           
        res.json(error)
      });
      
      
        }

 const  getotherqualification= async (req, res)=>{
         
const querySnapshot = await getDocs(collection(db, "users2",req.body.ID, "otherqualification"));

let data=[]
querySnapshot.forEach((doc) => {
   let newD={id:doc.id,
    info:doc.data()
  }

  data.push(newD)
 
});

res.status(200).json(data);  
}

 const  displayqualification= async (req, res)=>{
         
  const querySnapshot = await getDoc(doc(db, "users2",req.body.ID, "otherqualification",req.body.id));
  
  let data=querySnapshot.data()
 
  res.status(200).json(data);  
  }
  
 const  getcompetencies= async (req, res)=>{
  let data=[]
  console.log(req.body.position);
  const CompetenceRef = collection(db, "competencies3");
  const q1 = query(CompetenceRef, where("competencyDivison", "==", "CORE PROFESSIONAL COMPETENCIES"), where("code", "==","EK-001-01"));
  const querySnapshot = await getDocs(q1);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
    data.push(doc.data())
  });
  res.status(200).json(data);
}

 const  position= async (req, res)=>{
  let data=[]
  console.log(req.body.position);
  const q = query(collection(db, "competencies3"), where("code", "==",  req.body.position));

const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  
  data.push({id:doc.id,info:doc.data()})
});

   
  res.status(200).json(data);
}
 const  fetchcomp= async (req, res)=>{
  let data=[]
  const q = query(collection(db, "competencies3"), where("code", "==",  req.body.compcode));

const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots

  data.push(doc.data())
});

  
  res.status(200).json(data);
  }
   
 const  department= async (req, res)=>{
  let data=[]
  const q = query(collection(db, "positions"), where("division", "==",  req.body.division));

const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots

  data.push(doc.data())
});

  
  res.status(200).json(data);
  }
   
  
 const  division= async (req, res)=>{
  
const querySnapshot = await getDocs(collection(db, "positions"));

let data=[]
querySnapshot.forEach((doc) => {
   
 
  data.push(doc.data())
 
});

res.status(200).json(data);
}
 const UpdateUser =(req, res)=>{
  setDoc(doc(db, "users2", req.body.ID), {
    employeeMiddleNameS:req.body.middlename,
    employeeSurname:req.body.surname,
    employeeNameS:req.body.Name,
    Birth:req.body.birth,
    EmployeeNumber:req.body.employeeNumber,
    Age:req.body.age
},{ merge: true }).then(()=>{
  const status ="success"
    const response={
      status:status,
    }
    res.status(200).json(response);
}).catch((error) => {
     
  res.json(error)
});
}
 const User =(req, res)=>{


  getDoc(doc(db, "users2", req.body.ID)).then((docSnap)=>{

    if (docSnap.exists()) {
  
      const status ="success"
    const response={
      status:status,
      data:docSnap.data()
    }
    res.status(200).json(response);
    } else {
    
      console.log("No such document!");
      res.status(200).json("No such document!");
    }
  })

  }
   const fetchUser =async (req, res)=>{

    let data=[]
    let id =''
    const q = query(collection(db, "users2"), where("uid", "==",  req.body.ID));
    
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    id=doc.id
    data.push(doc.data())
    });
    if (data.length>=0) {
      res.status(200).json(id);
    }
   
  
    }
   const signout=(req, res)=>{
  
    signOut(auth).then(() => {
      
      const status ="success"
      const response={
        status:status,
      }
      res.status(200).json(response);
    }).catch((error) => {
     
      res.json(error)
    });
  }

 const register =async (req, res)=>{
console.log(req.body.email);
let data=[]
let id =''
const q = query(collection(db, "users2"), where("empCode", "==",  req.body.empCode));
console.log(req.body.empCode);
const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc) => {
// doc.data() is never undefined for query doc snapshots
id=doc.id
data.push(doc.data())
});

console.log(data);

if ( data.length>0) {
  
createUserWithEmailAndPassword(auth, req.body.email, req.body.password)
.then((userCredential) => {
  
  
  const user = userCredential.user.uid;
  const status ="success"
  const response={
    status:status,
    user:id
  }

  setDoc(doc(db, "users2", id), {
    uid:userCredential.user.uid,
    email:req.body.email,
    terms:"not accepted"

  },{ merge: true });
  SendEmail( req.body.email)
  res.status(200).json(response);
  
})
.catch((error) => {
  const errorCode = error.code;
  const errorMessage = error.message;
  res.json( error.message);
  
});

}else{
  res.json("User Not Found");
}
}
 const accept =(req, res)=>{
 
const user = req.body.ID
  
  setDoc(doc(db, "users2", user), {
   terms:req.body.terms,

  },{ merge: true }).then(()=>{

    const status ="success"
    const response={
      status:status
    
    }
    res.status(200).json(response);
  }).catch((error) => {

    const errorCode = error.code;
    const errorMessage = error.message;
    res.json( error.message);
  
    
  });

 
  
  
  }
 const login =(req, res)=>{
  //chec existing user
  
  console.log(req.body.email);
  
  signInWithEmailAndPassword(auth, req.body.email, req.body.password)
    .then((userCredential) => {
      // Signed up 
      const user = userCredential.user;
      const status ="success"
      const response={
        status:status,
        user:user
      }
      res.status(200).json(response);
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      res.json( error.message);
      // ..
    });
  
  }
   const forgot =(req, res)=>{
  
   
    sendPasswordResetEmail(auth, req.body.email)
  .then(() => {

    const status ="success"
    const response={
      status:status
    }
    res.status(200).json(response);
    // ..
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    res.json( error.message);

  });
    console.log(req.body.email);
    
    }
    const  loadalluser= async (req, res)=>{
      let data=[]
      console.log(req.body.position);
      const q = query(collection(db, "users2"), where("competencies", "==",  req.body.competencies));
    
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      
      data.push({id:doc.id,info:doc.data()})
    });
    
       
      res.status(200).json(data);
    }
    module.exports = {
      UpdateUser,
      User,
      accept,
      department,
      forgot,
      getcompetencies,
      highestqualification,
      login,
      division,
      position,
      register,
      signout,
      uploadqualifications,
      addCompetency,
      getRate,
      updateArea,
      language,
      experience,
      member,
      fetchcomp,
      uploadqualifications2,
      highestqualification2,
      getotherqualification,
      displayqualification,
      updatequalification,
      deletequalification,
      fetchUser,
      updatexperience,
      getotherexperience,
      displayexperience,
      upadteaddexperience,
      deleteperience,
      addmembership,
      otherlanguage,
      getratedcompetency,
      finalsubmit,
      removesubmit,
      validate,
      getcmpetencydivision,
      findmyemployees,
      addCompetencysup,
      getRatesup,
      getratedcompetencysup,
      loadalluser,
      getevryone
    };