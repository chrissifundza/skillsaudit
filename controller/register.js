
const { auth, db, storage } = require("../firebase/config.js");
const { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, signOut } = require("firebase/auth");
const { SendEmail } = require("./email.js");
const { doc, setDoc, getDoc, collection, getDocs, query, where, addDoc, deleteDoc,  } = require("firebase/firestore");
const ExcelJS = require("exceljs");
const path = require("path");
const fs = require("fs");

const downloadloadexcel =async (req, res)=>{
  //try {
  //   const data = req.body.data; // JSON data sent from frontend

  //   // 1️⃣ Create workbook and worksheet
  //   const workbook = new ExcelJS.Workbook();
  //   const worksheet = workbook.addWorksheet("Competency Scores");

  //   // 2️⃣ Define columns
  //   worksheet.columns = [ 
  //     { header: "Competency Code", key: "competency", width: 20 },
  //     { header: "Employee Code", key: "empCode", width: 15 },
  //     { header: "Property", key: "property", width: 25 },
  //     { header: "Mean", key: "mean", width: 10 },
  //     { header: "SD", key: "sd", width: 10 },
  //     { header: "Z-Score", key: "zscore", width: 10 },
  //     { header: "Adjusted (1–5)", key: "adjusted", width: 15 },
  //   ];

  //   // 3️⃣ Loop through your JSON data
  //   for (const [competencyCode, details] of Object.entries(data)) {
  //     const { means, sds, zScores, adjustedScores } = details;

  //     for (const [empCode, props] of Object.entries(adjustedScores)) {
  //       for (const [propName, adjustedVal] of Object.entries(props)) {
  //         worksheet.addRow({
  //           competency: competencyCode,
  //           empCode,
  //           property: propName,
  //           mean: means[propName] ?? "",
  //           sd: sds[propName] ?? "",
  //           zscore: zScores?.[empCode]?.[propName] ?? "",
  //           adjusted: adjustedVal,
  //         });
  //       }
  //     }
  //   }

  //   worksheet.getRow(1).font = { bold: true };

  //   // 4️⃣ Set headers for download
  //   res.setHeader(
  //     "Content-Type",
  //     "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  //   );
  //   res.setHeader(
  //     "Content-Disposition",
  //     "attachment; filename=Competency_Scores.xlsx"
  //   );

  //   // 5️⃣ Write and send file
  //   await workbook.xlsx.write(res);
  //   res.end();

  // } catch (err) {
  //   console.error(err);
  //   res.status(500).send("Error generating Excel file");
  // }
}
const getevryone =async (req, res)=>{

//  let data=[]
//   let id =''
//   const q = query(collection(db, "Metsimaholo"), where("finalsubmi", "==",  "submitted"));
  
//   const querySnapshot = await getDocs(q);
//   querySnapshot.forEach((doc) => {
//   // doc.data() is never undefined for query doc snapshots
//   let newD={id:doc.id,
//     info:doc.data()
//   } 

//   data.push(newD)
  
//   });
//   if (data.length>=0) {
//     res.status(200).json(data);
//   }
try {
    // 1️⃣ GET all submitted records
    const q = query(collection(db, "Metsimaholo"), where("finalsubmi", "==", "submitted"));
    const querySnapshot = await getDocs(q);

    let records = [];
    querySnapshot.forEach(docSnap => {
      records.push({
        id: docSnap.id,
        empCode: docSnap.data().empCode,
        competency: docSnap.data().competencies, // e.g EK-008-02
      });
    });

    // 2️⃣ Group by competency code
    const grouped = {};
    records.forEach(item => {
      if (!grouped[item.competency]) grouped[item.competency] = [];
      grouped[item.competency].push({ id: item.id, empCode: item.empCode });
    });

    let results = {};

    // 3️⃣ LOOP THROUGH COMPETENCIES
    for (const competencyCode in grouped) {
      const users = grouped[competencyCode];
      let competencyRatings = {}; // { propertyName: [values] }
      let userRatings = {}; // store user-level values for z-scores

      for (const { id, empCode } of users) {
        const ratingRef = collection(db, `Metsimaholo/${id}/individualrate`);
        const ratingSnap = await getDocs(ratingRef);

        userRatings[empCode] = {};

        ratingSnap.forEach(ratingDoc => {
          const data = ratingDoc.data();
          for (const prop in data) {
            const num = Number(data[prop]);
            if (!isNaN(num)) {
              if (!competencyRatings[prop]) competencyRatings[prop] = [];
              competencyRatings[prop].push(num);
              userRatings[empCode][prop] = num;
            }
          }
        });
      }

      // 4️⃣ CALCULATE MEAN & SD
      let means = {};
      let sds = {};

      for (const prop in competencyRatings) {
        const vals = competencyRatings[prop];
        const mean = vals.reduce((a, b) => a + b, 0) / vals.length;
        const variance = vals.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / vals.length;
        const sd = Math.sqrt(variance);
        means[prop] = parseFloat(mean.toFixed(2));
        sds[prop] = parseFloat(sd.toFixed(2));
      }

      // 5️⃣ CALCULATE Z-SCORES & ADJUSTED SCORES
      let zScores = {};
      let adjustedScores = {};

      for (const empCode in userRatings) {
        zScores[empCode] = {};
        adjustedScores[empCode] = {};

        for (const prop in userRatings[empCode]) {
          const X = userRatings[empCode][prop];
          const mean = means[prop] ?? 0;
          const sd = sds[prop] ?? 0;
          const z = sd === 0 ? 0 : (X - mean) / sd;
          const adjusted = Math.max(1, Math.min(5, mean + z * 1)); // Clamp 1–5

          zScores[empCode][prop] = parseFloat(z.toFixed(2));
          adjustedScores[empCode][prop] = parseFloat(adjusted.toFixed(2));
        }
      }

      // 6️⃣ SAVE BACK TO FIRESTORE
      const meanDocRef = doc(db, "MetsimaholoScores", "mean");
      await setDoc(meanDocRef, { updated: new Date() }, { merge: true });
      const scoreDocRef = doc(db, "MetsimaholoScores", "mean", "scores", competencyCode);
      await setDoc(scoreDocRef, { means, sds, zScores, adjustedScores }, { merge: true });

      results[competencyCode] = { means, sds, zScores, adjustedScores };
    }
// 7️⃣ CREATE EXCEL FILE
const workbook = new ExcelJS.Workbook();

for (const [competencyCode, data] of Object.entries(results)) {
  const { adjustedScores = {}, means = {}, sds = {}, zScores = {} } = data || {};
  const sheet = workbook.addWorksheet(competencyCode);

  // ✅ Collect all properties for columns
  const allProps = new Set();
  Object.values(adjustedScores).forEach(scores => {
    if (scores && typeof scores === "object") {
      Object.keys(scores).forEach(p => allProps.add(p));
    }
  });

  // ✅ Make property names readable
  const makeReadable = key =>
    key
      .replace(/_/g, " ")
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/\b\w/g, c => c.toUpperCase())
      .trim();

  const readableProps = Array.from(allProps).map(makeReadable);

  // ✅ Columns for employee + each property
  const columns = ["Employee Code", ...readableProps];
  sheet.addRow(columns);

  // ✅ Add employee adjusted scores
  for (const [empCode, scores] of Object.entries(adjustedScores || {})) {
    const row = [empCode];
    for (const prop of allProps) {
      row.push(scores?.[prop] ?? "");
    }
    sheet.addRow(row);
  }

  // Blank line
  sheet.addRow([]);

  // ✅ Add means
  sheet.addRow(["Means", ...Array.from(allProps).map(p => means?.[p] ?? "")]);

  // ✅ Add SDs
  sheet.addRow(["SDs", ...Array.from(allProps).map(p => sds?.[p] ?? "")]);

  // ✅ Add Z-Scores section
  // sheet.addRow([]);
  // sheet.addRow(["Z-Scores"]);
  // sheet.addRow(["Employee Code", ...readableProps]);

  // for (const [empCode, scores] of Object.entries(zScores || {})) {
  //   const row = [empCode];
  //   for (const prop of allProps) {
  //     row.push(scores?.[prop] ?? "");
  //   }
  //   sheet.addRow(row);
  // }
}
    // Save Excel file temporarily
    const filePath = path.join(__dirname, "Metsimaholo_Scores.xlsx");
    await workbook.xlsx.writeFile(filePath);

    // 8️⃣ Download to user automatically
    res.download(filePath, "Metsimaholo_Scores.xlsx", err => {
      if (err) console.error("Download error:", err);
      fs.unlink(filePath, () => {}); // delete after send
    });

  } catch (error) {
    console.error("❌ Error:", error);
    res.status(500).json({ success: false, error: error.message });
  }


  }

 const findmyemployees =async (req, res)=>{

  let data=[]
  let id =''
  const q = query(collection(db, "Metsimaholo"), where("linemanager", "==",  req.body.empCode));
  
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
    
    setDoc(doc(db, "Metsimaholo", user), {
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
    
    setDoc(doc(db, "Metsimaholo", user), {
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
         
  const querySnapshot = await getDocs(collection(db, "Metsimaholo",req.body.ID, "competencies"));
  
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
         
    const querySnapshot = await getDocs(collection(db, "Metsimaholo",req.body.ID, "supervisor"));
    
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
  
  deleteDoc(doc(db, "Metsimaholo", req.body.ID,"otherexperience", req.body.id)).then(()=>{
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

  
  setDoc(doc(db, "Metsimaholo", req.body.ID,"otherexperience", req.body.id), {
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
         
  const querySnapshot = await getDoc(doc(db, "Metsimaholo",req.body.ID, "otherexperience",req.body.id));
  
  let data=querySnapshot.data()
 
  res.status(200).json(data);  
  }

 const  getotherexperience= async (req, res)=>{
         
  const querySnapshot = await getDocs(collection(db, "Metsimaholo",req.body.ID, "otherexperience"));
  
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
 
  addDoc(collection(db, "Metsimaholo", req.body.ID,"othermember"), {
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
    
    addDoc(collection(db, "Metsimaholo", req.body.ID,"otherexperience"), {
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
  
  setDoc(doc(db, "Metsimaholo", req.body.ID), {
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
  
  setDoc(doc(db, "Metsimaholo", req.body.ID), {
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
    
    setDoc(doc(db, "Metsimaholo", req.body.ID), {
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
    
    setDoc(doc(db, "Metsimaholo", req.body.ID), {
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
  
 const  addindividualrate= async (req, res)=>{
  let info = req.body.data;
  let sup="Supervisor";
  let ave="Average";
  let total= Number(req.body.num) + Number(req.body.num)-1;
  let average=total/2;
  console.log("Running"+total);
  
 setDoc(doc(db, "Metsimaholo", req.body.ID,"individualrate",info.areas.replace(/\s/g, '')), {
   [info.areas.replace(/\s/g, '')]:req.body.num,
    // [sup+info.areas.replace(/\s/g, '')]:req.body.num-1,
    // [ave+info.areas.replace(/\s/g, '')]:average.toFixed(0),
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
  let sup="Supervisor";
  let ave="Average";
  let total= Number(req.body.num) + Number(req.body.num)-1;
  let average=total/2;
  console.log("Running"+total);
  
  setDoc(doc(db, "Metsimaholo", req.body.ID), {
   [info.areas.replace(/\s/g, '')]:req.body.num,
    // [sup+info.areas.replace(/\s/g, '')]:req.body.num-1,
    // [ave+info.areas.replace(/\s/g, '')]:average.toFixed(0),
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
    setDoc(doc(db, "Metsimaholo", req.body.ID), {
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
  
      const CompetenceRef = await getDoc(doc(db, "Metsimaholo",req.body.ID));


  
      
      res.status(200).json(CompetenceRef.data());
      }
 const  getRate= async (req, res)=>{
  let info = req.body.data;
   console.log(req.body.ID);
const CompetenceRef = await getDocs(collection(db, "Metsimaholo",req.body.ID,"competencies"));


let data=[]
CompetenceRef.forEach((doc) => {
   
 
  data.push(doc.data())

});
res.status(200).json(data);
}



 const  getRatesup= async (req, res)=>{
  let info = req.body.data;
   console.log(req.body.ID);
const CompetenceRef = await getDocs(collection(db, "Metsimaholo",req.body.ID,"supervisor"));


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
  setDoc(doc(db, "Metsimaholo", req.body.ID,"competencies",info.idcomp), {
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
    setDoc(doc(db, "Metsimaholo", req.body.ID), {
      [sup+info.areas.replace(/\s/g, '')]:info.rate,
      
  },{ merge: true }).then(()=>{
    const status ="success"
      const response={
        status:status,
      }
      setDoc(doc(db, "Metsimaholo", req.body.ID,"supervisor",info.idcomp), {
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
  
  setDoc(doc(db, "Metsimaholo", req.body.ID), {
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
  setDoc(doc(db, "Metsimaholo", req.body.ID), {
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
    addDoc(collection(db, "Metsimaholo", req.body.ID,"otherqualification"), {
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
  
      addDoc(collection(db, "Metsimaholo", req.body.ID, "otherqualification"), {
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
  
      setDoc(doc(db, "Metsimaholo", req.body.ID, "otherqualification",req.body.docid), {
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
  
        deleteDoc(doc(db, "Metsimaholo", req.body.ID,"otherqualification", req.body.docid)).then(()=>{
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
         
const querySnapshot = await getDocs(collection(db, "Metsimaholo",req.body.ID, "otherqualification"));

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
         
  const querySnapshot = await getDoc(doc(db, "Metsimaholo",req.body.ID, "otherqualification",req.body.id));
  
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
  setDoc(doc(db, "Metsimaholo", req.body.ID), {
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


  getDoc(doc(db, "Metsimaholo", req.body.ID)).then((docSnap)=>{

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
    const q = query(collection(db, "Metsimaholo"), where("uid", "==",  req.body.ID));
    
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

     const fetchAllCompetencyUser =async (req, res)=>{

    let data=[]
    let id =''
    const q = query(collection(db, "Metsimaholo"), where("competencies", "==",  req.body.ID));
    
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    //id=doc.id
    data.push(doc.data())
    });
    if (data.length>=0) {
      res.status(200).json(data);
    }
   
  
    }

    
     const getallusers =async (req, res)=>{

    let data=[]
    let id =''
    const q = query(collection(db, "Metsimaholo"));
    
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    //id=doc.id
    data.push(doc.data())
    });
    if (data.length>=0) {
      res.status(200).json(data);
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
const q = query(collection(db, "Metsimaholo"), where("empCode", "==",  req.body.empCode));
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

  setDoc(doc(db, "Metsimaholo", id), {
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
  
  setDoc(doc(db, "Metsimaholo", user), {
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
      const q = query(collection(db, "Metsimaholo"), where("competencies", "==",  req.body.competencies));
    
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
      getevryone,
      fetchAllCompetencyUser,
      addindividualrate,
      getallusers,
      downloadloadexcel
    };