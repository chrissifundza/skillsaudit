import { response } from "express";
import { auth, db, storage} from "../firebase/config.js"
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail,signOut} from "firebase/auth";
import { SendEmail } from "./email.js";
import { doc, setDoc, getDoc, collection, getDocs,query ,where, addDoc, deleteDoc} from "firebase/firestore"; 


export const  getratedcompetency= async (req, res)=>{
         
  const querySnapshot = await getDocs(collection(db, "users2",req.body.ID, "competencies3"));
  
  let data=[]
  querySnapshot.forEach((doc) => {
     let newD={id:doc.id,
      info:doc.data()
    }
  
    data.push(newD)
   
  });
  
  res.status(200).json(data);  
  }

export const  deleteperience= async (req, res)=>{
  
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

export const  upadteaddexperience= async (req, res)=>{

  
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

export const  displayexperience= async (req, res)=>{
         
  const querySnapshot = await getDoc(doc(db, "users2",req.body.ID, "otherexperience",req.body.id));
  
  let data=querySnapshot.data()
 
  res.status(200).json(data);  
  }

export const  getotherexperience= async (req, res)=>{
         
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
export const  addmembership= async (req, res)=>{
 
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
  export const  updatexperience= async (req, res)=>{
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
  
export const  experience= async (req, res)=>{
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

export const  language= async (req, res)=>{
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

  export const  otherlanguage= async (req, res)=>{
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
  
  export const  member= async (req, res)=>{
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
  

export const  updateArea= async (req, res)=>{
  let info = req.body.data;
  
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
export const  getRate= async (req, res)=>{
  let info = req.body.data;
   console.log(req.body.ID);
const CompetenceRef = await getDocs(collection(db, "users2",req.body.ID,"competencies3"));


let data=[]
CompetenceRef.forEach((doc) => {
   
 
  data.push(doc.data())

});

res.status(200).json(data);

  }

export const  addCompetency= async (req, res)=>{
  let info = req.body.data;
console.log(info.idcomp);
// const collectionRef = collection(database, "users", uid, "invoices");
// addD
  setDoc(doc(db, "users2", req.body.ID,"competencies3",info.idcomp), {
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
export const  highestqualification= async (req, res)=>{
  
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

export const  uploadqualifications= async (req, res)=>{
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
  export const  uploadqualifications2= async (req, res)=>{
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

    export const  highestqualification2= async (req, res)=>{
  
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

      
    export const  updatequalification= async (req, res)=>{
  
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

      export const  deletequalification= async (req, res)=>{
  
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

export const  getotherqualification= async (req, res)=>{
         
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

export const  displayqualification= async (req, res)=>{
         
  const querySnapshot = await getDoc(doc(db, "users2",req.body.ID, "otherqualification",req.body.id));
  
  let data=querySnapshot.data()
 
  res.status(200).json(data);  
  }
  
export const  getcompetencies= async (req, res)=>{
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

export const  position= async (req, res)=>{
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
export const  fetchcomp= async (req, res)=>{
  let data=[]
  const q = query(collection(db, "competencies3"), where("code", "==",  req.body.compcode));

const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots

  data.push(doc.data())
});

  
  res.status(200).json(data);
  }
   
export const  department= async (req, res)=>{
  let data=[]
  const q = query(collection(db, "positions"), where("division", "==",  req.body.division));

const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots

  data.push(doc.data())
});

  
  res.status(200).json(data);
  }
   
  
export const  division= async (req, res)=>{
  
const querySnapshot = await getDocs(collection(db, "positions"));

let data=[]
querySnapshot.forEach((doc) => {
   
 
  data.push(doc.data())
 
});

res.status(200).json(data);
}
export const UpdateUser =(req, res)=>{
  setDoc(doc(db, "users2", req.body.ID), {
    MiddleName:req.body.middlename,
  Surname:req.body.surname,
  Name:req.body.Name,
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
export const User =(req, res)=>{


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
  export const fetchUser =async (req, res)=>{

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
  export const signout=(req, res)=>{
  
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

export const register =async (req, res)=>{
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
export const accept =(req, res)=>{
 
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
export const login =(req, res)=>{
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
  export const forgot =(req, res)=>{
  
   
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