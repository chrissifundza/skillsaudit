loadalllevels=[]
function loadSelect() {
    document.getElementById("department").value = ""
    axios.post('/division')
      .then(async function (response) {
        const data = removeDuplicates(response.data)
        console.log(data);
        let option = ""
        let html = `<option id="muni1" selected>Division</option>`
        let list = document.getElementById("division")
        let count = 0
        data.forEach(division => {
          option = `<option  value="${division.division}">${division.division}</option>`;
          html += option;
          list.innerHTML = html;
          console.log(list);
          count++
        
        })
        console.log(count);
        
      })
      .catch(function (error) {
        console.log(error);
      });
}
function Department(userdata) {

    let division = document.getElementById("division").value
    console.log(division);
    axios.post('/department', { division: division })
      .then(function (response) {
        console.log(response.data);
        let option = ""
        let html = `<option value="" selected>Position</option>`
        let list = document.getElementById("department")
        response.data.forEach(department => {
          option = `<option  value="${department.code}">${department.title}</option>`;
          html += option;
          list.innerHTML = html;
  
          loadalllevels.push(department.code)
        });
  
        Position()
  
  
  
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function Professional(response) {
//     const area000 = response.filter((d) => d.info.areas == "Written Communication");
//   if (area000.length > 0) {
//     document.querySelector(".flush-heading0").style.display = "table"
//   }

//   const area001 = response.filter((d) => d.info.areas == "Oral Communication");
//   if (area001.length > 0) {
//     document.querySelector(".flush-heading1").style.display = "table"
// }
  }

  async function Position() {
 
    
      let code = document.getElementById("department").value
      let trow="";
      let html="";
      let list =document.getElementById("listuser")
      let count=1;
      console.log(code);
    for (let c = 0; c < loadalllevels.length; c++) {
        const level = loadalllevels[c];
        
   
      axios.post('/loadalluser',{
        competencies:level
      })
      .then(function (response) {
        console.log(response);
        axios.post('/position', {
            position: level,
        
          }).then(function (response2) {
            

            const professionalcompetencies = response2.data.filter((d) => d.info.competencyDivision == "CORE PROFESSIONAL COMPETENCIES")
            console.log(professionalcompetencies);
           
                
            let finalsubmitted=response.data.filter((d)=>d.info.finalsubmi =="submitted" )
            console.log(finalsubmitted);
           
           
            console.log(level);
            let lv=level.split("-");
    
            for (let i = 0; i < finalsubmitted.length; i++) {
                const element = finalsubmitted[i].info;
                // Define the start date using the format "YYYY/MM/DD"
                    const startDate = new Date(element.dateEngaged);
    
                    // Get the current date
                    const currentDate = new Date();
    
                    // Calculate the difference in years
                    let yearsDifference = currentDate.getFullYear() - startDate.getFullYear();
    
                    // Adjust the years difference if the current date hasn't yet passed the month and day of the start date
                    if (currentDate.getMonth() < startDate.getMonth() ||
                        (currentDate.getMonth() === startDate.getMonth() && currentDate.getDate() < startDate.getDate())) {
                        yearsDifference--;
                    }
    
                trow=`
                <tr>
                <td>${count++}</td>
                <td>${element.municipality}</td>
                <td>${element.employeeNameS+" "+element.employeeSurname}</td>
                <td>${element.empCode}</td>
                <td>${element.jobTitle}</td>
                <td>${element.division}</td>
                <td>${element.department}</td>
                <td>${element.competencies}</td>
                <td>L ${lv[lv.length-1]}</td>
                <td>${yearsDifference}</td>
                <td>${element.QualificationName}</td>
                <td>${typeof element.WrittenCommunication=="undefined"?"Blank":element.WrittenCommunication}</td>
                <td>${typeof element.OralCommunication=="undefined"?"Blank":element.OralCommunication}</td>
                <td>${typeof element.ResearchandAnalysis=="undefined"?"Blank":element.ResearchandAnalysis}</td>
                <td>${typeof element["Advocacy/Negotiation"]=="undefined"?"Blank":element["Advocacy/Negotiation"]}</td>
                <td>${typeof element.EthicsandProfessionalism=="undefined"?"Blank":element.EthicsandProfessionalism}</td>
                <td>${typeof element.OrganisationalAwareness=="undefined"?"Blank":element.OrganisationalAwareness}</td>
                <td>${typeof element.BusinessCommunication=="undefined"?"Blank":element.BusinessCommunication}</td>
                <td>${typeof element.Consulting=="undefined"?"Blank":element.Consulting}</td>
                <td>${typeof element.PlanningandOrganising=="undefined"?"Blank":element.PlanningandOrganising}</td>
                <td>${typeof element.MonitoringandControl=="undefined"?"Blank":element.MonitoringandControl}</td>
                <td>${typeof element.Negotiation=="undefined"?"Blank":element.Negotiation}</td>
                <td>${typeof element.UseofTechnology=="undefined"?"Blank":element.UseofTechnology}</td>
                <td>${typeof element.Communication=="undefined"?"Blank":element.Communication}</td>
                <td>${typeof element.ConceptualThinking=="undefined"?"Blank":element.ConceptualThinking}</td>
                <td>${typeof element["WrittenCommunication/Drafting"]=="undefined"?"Blank":element["WrittenCommunication/Drafting"]}</td>
                <td>${typeof element.Planning=="undefined"?"Blank":element.Planning}</td>
                <td>${typeof element.AttentiontoDetail=="undefined"?"Blank":element.AttentiontoDetail}</td>
                <td>${typeof element.ProblemSolving=="undefined"?"Blank":element.ProblemSolving}</td>
                <td>${typeof element.ResearchandDevelopment=="undefined"?"Blank":element.ResearchandDevelopment}</td>
                <td>${typeof element.InformationManagement=="undefined"?"Blank":element.InformationManagement}</td>
                <td>${typeof element.Influencing=="undefined"?"Blank":element.Influencing}</td>
                <td>${typeof element.PublicConsultation=="undefined"?"Blank":element.PublicConsultation}</td>
                <td>${typeof element["Socio-Economic/Socio-PoliticalAwareness"]=="undefined"?"Blank":element["Socio-Economic/Socio-PoliticalAwareness"]}</td>
                <td>${typeof element.ManagingWork=="undefined"?"Blank":element.ManagingWork}</td>
                <td>${typeof element.QualityOrientation=="undefined"?"Blank":element.QualityOrientation}</td>
                <td>${typeof element.DisciplineSpecificSkills=="undefined"?"Blank":element.DisciplineSpecificSkills}</td>
                <td>${typeof element.PeopleManagement=="undefined"?"Blank":element.PeopleManagement}</td>
                <td>${typeof element.TaskManagement=="undefined"?"Blank":element.TaskManagement}</td>
                <td>${typeof element.WorkPlaceSafety=="undefined"?"Blank":element.WorkPlaceSafety}</td>
                <td>${typeof element.Budgeting=="undefined"?"Blank":element.Budgeting}</td>
                <td>${typeof element.InterpersonalRelationships=="undefined"?"Blank":element.InterpersonalRelationships}</td>
                <td>${typeof element.ServiceDeliveryOrientation=="undefined"?"Blank":element.ServiceDeliveryOrientation}</td>
                <td>${typeof element.ActionandOutcomeOrientation=="undefined"?"Blank":element.ActionandOutcomeOrientation}</td>
                <td>${typeof element.Resilience=="undefined"?"Blank":element.Resilience}</td>
                <td>${typeof element.EthicsandAccountability=="undefined"?"Blank":element.EthicsandAccountability}</td>
                <td>${typeof element.DirectionSetting=="undefined"?"Blank":element.DirectionSetting}</td>
                <td>${typeof element.ImpactandInfluence=="undefined"?"Blank":element.ImpactandInfluence}</td>
                <td>${typeof element.CoachingandMentoring=="undefined"?"Blank":element.CoachingandMentoring}</td>
                <td>${typeof element.TeamOrientation=="undefined"?"Blank":element.TeamOrientation}</td>
                <td>${typeof element.CommunityandCustomerFocus=="undefined"?"Blank":element.CommunityandCustomerFocus}</td>
                <td>${typeof element.NegotiationandInfluencing=="undefined"?"Blank":element.NegotiationandInfluencing}</td>
                <td>${typeof element.FireFighting=="undefined"?"Blank":element.FireFighting}</td>
                <td>${typeof element.EvaluationandResearch=="undefined"?"Blank":element.EvaluationandResearch}</td>
                <td>${typeof element["Professional/TechnicalProficiency"]=="undefined"?"Blank":element["Professional/TechnicalProficiency"]}</td>
                <td>${typeof element.TechnicalCommunication=="undefined"?"Blank":element.TechnicalCommunication}</td>
                <td>${typeof element.DecisionMaking=="undefined"?"Blank":element.DecisionMaking}</td>
                <td>${typeof element.AdviceandGuidance=="undefined"?"Blank":element.AdviceandGuidance}</td>
                <td>${typeof element.ComputerLiteracy=="undefined"?"Blank":element.ComputerLiteracy}</td>
                <td>${typeof element["OrganisationalAwareness/PoliticalImpact"]=="undefined"?"Blank":element["OrganisationalAwareness/PoliticalImpact"]}</td>
                <td>${typeof element.InformationMeasuringandMonitoring=="undefined"?"Blank":element.InformationMeasuringandMonitoring}</td>
                <td>${typeof element.MonitoringandReporting=="undefined"?"Blank":element.MonitoringandReporting}</td>
                <td>${typeof element.InternalAuditing=="undefined"?"Blank":element.InternalAuditing}</td>
            <td>${typeof element.EngagementManagement=="undefined"?"Blank":element.EngagementManagement}</td>
            <td>${typeof element.InformationManagement=="undefined"?"Blank":element.InformationManagement}</td>
            <td>${typeof element.InformationStrategy=="undefined"?"Blank":element.InformationStrategy}</td>
            <td>${typeof element.AdviceandGuidance=="undefined"?"Blank":element.AdviceandGuidance}</td>
            <td>${typeof element["BusinessandIS&TPlanning"]=="undefined"?"Blank":element["BusinessandIS&TPlanning"]}</td>
            <td>${typeof element.TechnicalStrategyandPlanning=="undefined"?"Blank":element.TechnicalStrategyandPlanning}</td>
            <td>${typeof element.BusinessChangeManagement=="undefined"?"Blank":element.BusinessChangeManagement}</td>
            <td>${typeof element.DataConversion=="undefined"?"Blank":element.DataConversion}</td>
            <td>${typeof element.Operations=="undefined"?"Blank":element.Operations}</td>
            <td>${typeof element.InstallationandIntegration=="undefined"?"Blank":element.InstallationandIntegration}</td>
            <td>${typeof element.UserSupport=="undefined"?"Blank":element.UserSupport}</td>
            <td>${typeof element.PeopleManagement=="undefined"?"Blank":element.PeopleManagement}</td>
            <td>${typeof element.TaskManagement=="undefined"?"Blank":element.TaskManagement}</td>
            <td>${typeof element.ProjectManagement=="undefined"?"Blank":element.ProjectManagement}</td>
            <td>${typeof element.FinancialManagement=="undefined"?"Blank":element.FinancialManagement}</td>
            <td>${typeof element.InformationMeasuringandMonitoring=="undefined"?"Blank":element.InformationMeasuringandMonitoring}</td>
            <td>${typeof element.TechnologyUsage=="undefined"?"Blank":element.TechnologyUsage}</td>
            <td>${typeof element.ConceptualThinking=="undefined"?"Blank":element.ConceptualThinking}</td>
            <td>${typeof element.LitigationManagement=="undefined"?"Blank":element.LitigationManagement}</td>
            <td>${typeof element.ResearchandAnalysis=="undefined"?"Blank":element.ResearchandAnalysis}</td>
            <td>${typeof element.InterpersonalRelationships=="undefined"?"Blank":element.InterpersonalRelationships}</td>
            <td>${typeof element.Communication=="undefined"?"Blank":element.Communication}</td>
            <td>${typeof element.ServiceDeliveryOrientation=="undefined"?"Blank":element.ServiceDeliveryOrientation}</td>
            <td>${typeof element.ChangeMovement=="undefined"?"Blank":element.ChangeMovement}</td>
            <td>${typeof element.HRTechnologyInformationManagement=="undefined"?"Blank":element.HRTechnologyInformationManagement}</td>
            <td>${typeof element.HRServiceDelivery=="undefined"?"Blank":element.HRServiceDelivery}</td>
            <td>${typeof element.TalentManagement=="undefined"?"Blank":element.TalentManagement}</td>
            <td>${typeof element.WorkforcePlanning=="undefined"?"Blank":element.WorkforcePlanning}</td>
            <td>${typeof element.LearningandDevelopment=="undefined"?"Blank":element.LearningandDevelopment}</td>
            <td>${typeof element.OccupationalHealthandSafety=="undefined"?"Blank":element.OccupationalHealthandSafety}</td>
            <td>${typeof element.CompensationandBenefitsManagement=="undefined"?"Blank":element.CompensationandBenefitsManagement}</td>
            <td>${typeof element.PerformanceManagement=="undefined"?"Blank":element.PerformanceManagement}</td>
            <td>${typeof element.EmployeeWellness=="undefined"?"Blank":element.EmployeeWellness}</td>
            <td>${typeof element.IndustrialandLabourRelations=="undefined"?"Blank":element.IndustrialandLabourRelations}</td>
            <td>${typeof element.StrategicHRManagement=="undefined"?"Blank":element.StrategicHRManagement}</td>
            <td>${typeof element.Design=="undefined"?"Blank":element.Design}</td>
            <td>${typeof element.Construction=="undefined"?"Blank":element.Construction}</td>
            <td>${typeof element.OperationsandMaintenance=="undefined"?"Blank":element.OperationsandMaintenance}</td>
            <td>${typeof element.Accounting=="undefined"?"Blank":element.Accounting}</td>
            <td>${typeof element.Procurement=="undefined"?"Blank":element.Procurement}</td>
            <td>${typeof element.Budgeting=="undefined"?"Blank":element.Budgeting}</td>
            <td>${typeof element.Costing=="undefined"?"Blank":element.Costing}</td>
            <td>${typeof element.FinancialReporting=="undefined"?"Blank":element.FinancialReporting}</td>
            <td>${typeof element.FinancialProcessManagement=="undefined"?"Blank":element.FinancialProcessManagement}</td>
            <td>${typeof element.ProcurementandTenders=="undefined"?"Blank":element.ProcurementandTenders}</td>
            <td>${typeof element.SamplingAnalyses=="undefined"?"Blank":element.SamplingAnalyses}</td>
            <td>${typeof element.RawMaterialInventory=="undefined"?"Blank":element.RawMaterialInventory}</td>
            <td>${typeof element.StakeholderLiason=="undefined"?"Blank":element.StakeholderLiason}</td>
            <td>${typeof element.SpatialPlanning=="undefined"?"Blank":element.SpatialPlanning}</td>
            <td>${typeof element.UrbanDesign=="undefined"?"Blank":element.UrbanDesign}</td>
            <td>${typeof element.LandUseManagement=="undefined"?"Blank":element.LandUseManagement}</td>
            <td>${typeof element["Research,InformationAnalysisandPolicy"]=="undefined"?"Blank":element["Research,InformationAnalysisandPolicy"]}</td>
            <td>${typeof element.KnowledgeManagement=="undefined"?"Blank":element.KnowledgeManagement}</td>
            <td>${typeof element.PublicConsultation=="undefined"?"Blank":element.PublicConsultation}</td>
            <td>${typeof element["Socio-Economic/Socio-PoliticalAwareness"]=="undefined"?"Blank":element["Socio-Economic/Socio-PoliticalAwareness"]}</td>
            <td>${typeof element.PolicyConceptualisation=="undefined"?"Blank":element.PolicyConceptualisation}</td>
            <td>${typeof element.BuildingDevelopmentControl=="undefined"?"Blank":element.BuildingDevelopmentControl}</td>
            <td>${typeof element.BuildingInspectorateCustomerCentricity=="undefined"?"Blank":element.BuildingInspectorateCustomerCentricity}</td>
            <td>${typeof element.LegalAdministration=="undefined"?"Blank":element.LegalAdministration}</td>
            <td>${typeof element.NegotiationandInfluencing=="undefined"?"Blank":element.NegotiationandInfluencing}</td>
            <td>${typeof element.EthicsandProfessionalism=="undefined"?"Blank":element.EthicsandProfessionalism}</td>
            <td>${typeof element["Professional/TechnicalProficiency"]=="undefined"?"Blank":element["Professional/TechnicalProficiency"]}</td>
            <td>${typeof element["ManagingWork-OperationWork"]=="undefined"?"Blank":element["ManagingWork-OperationWork"]}</td>
            <td>${typeof element.WorkPlaceSafety=="undefined"?"Blank":element.WorkPlaceSafety}</td>
            <td>${typeof element.TaskAccountability=="undefined"?"Blank":element.TaskAccountability}</td>
            <td>${typeof element.QualityOrientation=="undefined"?"Blank":element.QualityOrientation}</td>
            <td>${typeof element.OralCommunication=="undefined"?"Blank":element.OralCommunication}</td>
            <td>${typeof element["OperationMonitoring-SmallPlant"]=="undefined"?"Blank":element["OperationMonitoring-SmallPlant"]}</td>
            <td>${typeof element.QualityControlAnalysis=="undefined"?"Blank":element.QualityControlAnalysis}</td>
            <td>${typeof element.OperationandControl=="undefined"?"Blank":element.OperationandControl}</td>
            <td>${typeof element.Troubleshooting=="undefined"?"Blank":element.Troubleshooting}</td>
            <td>${typeof element.PlanningandOrganising=="undefined"?"Blank":element.PlanningandOrganising}</td>
            <td>${typeof element["VehicleSafety-DriverGrade1"]=="undefined"?"Blank":element["VehicleSafety-DriverGrade1"]}</td>
            <td>${typeof element["VehicleSafety-DriverGrade2"]=="undefined"?"Blank":element["VehicleSafety-DriverGrade2"]}</td>
            <td>${typeof element["VehicleSafety-DriverGrade3"]=="undefined"?"Blank":element["VehicleSafety-DriverGrade3"]}</td>
            <td>${typeof element["VehicleSafety-DriverGrade4"]=="undefined"?"Blank":element["VehicleSafety-DriverGrade4"]}</td>
            <td>${typeof element["VehicleSafety-DriverGrade5"]=="undefined"?"Blank":element["VehicleSafety-DriverGrade5"]}</td>
            <td>${typeof element.DrivingBehaviour=="undefined"?"Blank":element.DrivingBehaviour}</td>
            <td>${typeof element.LearningOrientation=="undefined"?"Blank":element.LearningOrientation}</td>
            <td>${typeof element["OperationMonitoring-LightEquipment"]=="undefined"?"Blank":element["OperationMonitoring-LightEquipment"]}</td>
            <td>${typeof element["VehicleSafety-DriverGrade6"]=="undefined"?"Blank":element["VehicleSafety-DriverGrade6"]}</td>
            <td>${typeof element["OperationMonitoring-MechanicalPlant"]=="undefined"?"Blank":element["OperationMonitoring-MechanicalPlant"]}</td>
            <td>${typeof element["VehicleSafety-DriverGrade3/SpecialCategory"]=="undefined"?"Blank":element["VehicleSafety-DriverGrade3/SpecialCategory"]}</td>
            <td>${typeof element["VehicleSafety-Chauffeur"]=="undefined"?"Blank":element["VehicleSafety-Chauffeur"]}</td>
            <td>${typeof element.DisciplineSpecificSkills=="undefined"?"Blank":element.DisciplineSpecificSkills}</td>
            <td>${typeof element.MonitoringandControl=="undefined"?"Blank":element.MonitoringandControl}</td>
            <td>${typeof element.OrganisationalAwareness=="undefined"?"Blank":element.OrganisationalAwareness}</td>
            <td>${typeof element.AttentiontoDetail=="undefined"?"Blank":element.AttentiontoDetail}</td>
            <td>${typeof element.DirectionSetting=="undefined"?"Blank":element.DirectionSetting}</td>
            <td>${typeof element.DisputeResolution=="undefined"?"Blank":element.DisputeResolution}</td>
            <td>${typeof element.ProblemSolving=="undefined"?"Blank":element.ProblemSolving}</td>
            <td>${typeof element.Negotiation=="undefined"?"Blank":element.Negotiation}</td>
            <td>${typeof element["DataProcessing&Analysis"]=="undefined"?"Blank":element["DataProcessing&Analysis"]}</td>
            <td>${typeof element.StrategicPlanningandStrategyFormulation=="undefined"?"Blank":element.StrategicPlanningandStrategyFormulation}</td>
            <td>${typeof element.ProgrammeandProjectManagement=="undefined"?"Blank":element.ProgrammeandProjectManagement}</td>
            <td>${typeof element.InformationProductsandReporting=="undefined"?"Blank":element.InformationProductsandReporting}</td>
            <td>${typeof element.Resilience=="undefined"?"Blank":element.Resilience}</td>
            <td>${typeof element["Patrol,EnforcementandEmergencyResponse"]=="undefined"?"Blank":element["Patrol,EnforcementandEmergencyResponse"]}</td>
            <td>${typeof element.FireFighting=="undefined"?"Blank":element.FireFighting}</td>
            <td>${typeof element.RescueOperations=="undefined"?"Blank":element.RescueOperations}</td>
            <td>${typeof element["SpecialOperations(Hazmat,UrbanSearchandRescue)"]=="undefined"?"Blank":element["SpecialOperations(Hazmat,UrbanSearchandRescue)"]}</td>
            <td>${typeof element.FireSafetyandPrevention=="undefined"?"Blank":element.FireSafetyandPrevention}</td>
            <td>${typeof element.SafetyandWelfare=="undefined"?"Blank":element.SafetyandWelfare}</td>
            <td>${typeof element.EmergencyMedicalCare=="undefined"?"Blank":element.EmergencyMedicalCare}</td>
            <td>${typeof element.CallTakingandDispatch=="undefined"?"Blank":element.CallTakingandDispatch}</td>
            <td>${typeof element.AnalyticalSkills=="undefined"?"Blank":element.AnalyticalSkills}</td>
            <td>${typeof element["Advocacy/Negotiation"]=="undefined"?"Blank":element["Advocacy/Negotiation"]}</td>
            <td>${typeof element.WaterMonitoring=="undefined"?"Blank":element.WaterMonitoring}</td>
            <td>${typeof element.FoodControl=="undefined"?"Blank":element.FoodControl}</td>
            <td>${typeof element.WasteManagement=="undefined"?"Blank":element.WasteManagement}</td>
            <td>${typeof element.HealthSurveillanceofPremises=="undefined"?"Blank":element.HealthSurveillanceofPremises}</td>
            <td>${typeof element["CommunicableDiseasesManagement(exceptimmunizations)"]=="undefined"?"Blank":element["CommunicableDiseasesManagement(exceptimmunizations)"]}</td>
            <td>${typeof element.EnvironmentalPollutionControl=="undefined"?"Blank":element.EnvironmentalPollutionControl}</td>
            <td>${typeof element.DisposaloftheDead=="undefined"?"Blank":element.DisposaloftheDead}</td>
            <td>${typeof element.HealthPromotion=="undefined"?"Blank":element.HealthPromotion}</td>
            <td>${typeof element.VectorControl=="undefined"?"Blank":element.VectorControl}</td>
            <td>${typeof element.FacilitySpecificSkills=="undefined"?"Blank":element.FacilitySpecificSkills}</td>
            <td>${typeof element.IllegalLandInvasion=="undefined"?"Blank":element.IllegalLandInvasion}</td>
            <td>${typeof element.LegalProcessAdministration=="undefined"?"Blank":element.LegalProcessAdministration}</td>
            <td>${typeof element.RelocationProcesses=="undefined"?"Blank":element.RelocationProcesses}</td>
            <td>${typeof element.SurveyingDataManagement=="undefined"?"Blank":element.SurveyingDataManagement}</td>
            <td>${typeof element.DisasterOperations=="undefined"?"Blank":element.DisasterOperations}</td>
            <td>${typeof element.DataCapture=="undefined"?"Blank":element.DataCapture}</td>
            <td>${typeof element.DataExchange=="undefined"?"Blank":element.DataExchange}</td>
            <td>${typeof element["DatabaseDesign&Management"]=="undefined"?"Blank":element["DatabaseDesign&Management"]}</td>
            <td>${typeof element.ProfessionalConduct=="undefined"?"Blank":element.ProfessionalConduct}</td>
            <td>${typeof element.GISSystemsandSoftware=="undefined"?"Blank":element.GISSystemsandSoftware}</td>
            <td>${typeof element.ImageAnalysis=="undefined"?"Blank":element.ImageAnalysis}</td> 
            <td>${typeof element.SpatialAwareness=="undefined"?"Blank":element.SpatialAwareness}</td>
            <td>${typeof element.SpatialAnalysis=="undefined"?"Blank":element.SpatialAnalysis}</td>
            <td>${typeof element.InformationTechnology=="undefined"?"Blank":element.InformationTechnology}</td>
            <td>${typeof element.Consulting=="undefined"?"Blank":element.Consulting}</td>
            <td>${typeof element["UseofProcessSpecificTechnology/Equipment"]=="undefined"?"Blank":element["UseofProcessSpecificTechnology/Equipment"]}</td>
            <td>${typeof element.BusinessProcess=="undefined"?"Blank":element.BusinessProcess}</td>
            <td>${typeof element.UseofTechnology=="undefined"?"Blank":element.UseofTechnology}</td>

            <td>${typeof element.ImpactandInfluence=="undefined"?"Blank":element.ImpactandInfluence}</td>
            <td>${typeof element.TeamOrientation=="undefined"?"Blank":element.TeamOrientation}</td>
            <td>${typeof element.CoachingandMentoring=="undefined"?"Blank":element.CoachingandMentoring}</td>
            <td>${typeof element["StrategicCapability/LeadershiporDirectionSetting"]=="undefined"?"Blank":element["StrategicCapability/LeadershiporDirectionSetting"]}</td>
            <td>${typeof element.DirectionSetting=="undefined"?"Blank":element.DirectionSetting}</td>
            <td>${typeof element.Leadership=="undefined"?"Blank":element.Leadership}</td>
            <td>${typeof element.StrategicCapabilityandLeadership=="undefined"?"Blank":element.StrategicCapabilityandLeadership}</td>
                    
            <td>${typeof element.InterpersonalRelationships=="undefined"?"Blank":element.InterpersonalRelationships}</td>
            <td>${typeof element.Communication=="undefined"?"Blank":element.Communication}</td>
            <td>${typeof element.ServiceDeliveryOrientation=="undefined"?"Blank":element.ServiceDeliveryOrientation}</td>
            <td>${typeof element.CustomerOrientationandCustomerFocus=="undefined"?"Blank":element.CustomerOrientationandCustomerFocus}</td>
            <td>${typeof element.ActionandOutcomeOrientation=="undefined"?"Blank":element.ActionandOutcomeOrientation}</td>
            <td>${typeof element.Resilience=="undefined"?"Blank":element.Resilience}</td>
            <td>${typeof element.CognitiveAbility=="undefined"?"Blank":element.CognitiveAbility}</td>
            <td>${typeof element.LearningOrientation=="undefined"?"Blank":element.LearningOrientation}</td>
            <td>${typeof element.TechnologyUsage=="undefined"?"Blank":element.TechnologyUsage}</td>
            <td>${typeof element.AccountabilityandEthicalConduct=="undefined"?"Blank":element.AccountabilityandEthicalConduct}</td>
            <td>${typeof element.DirectionSetting=="undefined"?"Blank":element.DirectionSetting}</td>
            <td>${typeof element.ImpactandInfluence=="undefined"?"Blank":element.ImpactandInfluence}</td>
            <td>${typeof element.CoachingandMentoring=="undefined"?"Blank":element.CoachingandMentoring}</td>
            <td>${typeof element.TeamOrientation=="undefined"?"Blank":element.TeamOrientation}</td>
            <td>${typeof element.ClientOrientationandCustomerFocus=="undefined"?"Blank":element.ClientOrientationandCustomerFocus}</td>
            <td>${typeof element.EthicsandAccountability=="undefined"?"Blank":element.EthicsandAccountability}</td>
            <td>${typeof element.ClientOrientationandCustomerService=="undefined"?"Blank":element.ClientOrientationandCustomerService}</td>
                          
            <td>${typeof element.ActionandOutcomeOrientation=="undefined"?"Blank":element.ActionandOutcomeOrientation}</td>
            <td>${typeof element.Resilience=="undefined"?"Blank":element.Resilience}</td>
            <td>${typeof element.ChangeReadiness=="undefined"?"Blank":element.ChangeReadiness}</td>
            <td>${typeof element.CognitiveAbility=="undefined"?"Blank":element.CognitiveAbility}</td>
            <td>${typeof element.LearningOrientation=="undefined"?"Blank":element.LearningOrientation}</td>
            <td>${typeof element.ProblemSolving=="undefined"?"Blank":element.ProblemSolving}</td>
            <td>${typeof element.AccountabilityandEthicalConduct=="undefined"?"Blank":element.AccountabilityandEthicalConduct}</td>
            <td>${typeof element.ServiceDeliveryOrientation=="undefined"?"Blank":element.ServiceDeliveryOrientation}</td>
            <td>${typeof element.ConflictManagement=="undefined"?"Blank":element.ConflictManagement}</td>
            <td>${typeof element.ProblemSolvingandAnalysis=="undefined"?"Blank":element.ProblemSolvingandAnalysis}</td>
            <td>${typeof element.ImpactandInfluence=="undefined"?"Blank":element.ImpactandInfluence}</td>
            <td>${typeof element.TeamOrientation=="undefined"?"Blank":element.TeamOrientation}</td>
            <td>${typeof element.DirectionSetting=="undefined"?"Blank":element.DirectionSetting}</td>
            <td>${typeof element.CoachingandMentoring=="undefined"?"Blank":element.CoachingandMentoring}</td>
            <td>${typeof element.OralCommunication=="undefined"?"Blank":element.OralCommunication}</td>
            <td>${typeof element.WrittenCommunication=="undefined"?"Blank":element.WrittenCommunication}</td>
            <td>${typeof element.OrganisationalAwareness=="undefined"?"Blank":element.OrganisationalAwareness}</td>
            <td>${typeof element.PlanningandOrganising=="undefined"?"Blank":element.PlanningandOrganising}</td>
            <td>${typeof element.EthicsandAccountability=="undefined"?"Blank":element.EthicsandAccountability}</td>
            <td>${typeof element.InformationManagement=="undefined"?"Blank":element.InformationManagement}</td>
            <td>${typeof element.AttentiontoDetail=="undefined"?"Blank":element.AttentiontoDetail}</td>
            <td>${typeof element.Flexibility=="undefined"?"Blank":element.Flexibility}</td>
            <td>${typeof element.Integrity=="undefined"?"Blank":element.Integrity}</td>
            <td>${typeof element["ManagementofLearning(LearningOrientation)"]=="undefined"?"Blank":element["ManagementofLearning(LearningOrientation)"]}</td>
            <td>${typeof element.ActionOrientation=="undefined"?"Blank":element.ActionOrientation}</td>

            <td>${typeof element.MoralCompetence=="undefined"?"Blank":element.MoralCompetence}</td>
            <td>${typeof element.PlanningandOrganising=="undefined"?"Blank":element.PlanningandOrganising}</td>
            <td>${typeof element.AnalysisandInnovation=="undefined"?"Blank":element.AnalysisandInnovation}</td>
            <td>${typeof element.KnowledgeandInformationManagement=="undefined"?"Blank":element.KnowledgeandInformationManagement}</td>
            <td>${typeof element.Communication=="undefined"?"Blank":element.Communication}</td>
            <td>${typeof element.ResultsandQualityFocused=="undefined"?"Blank":element.ResultsandQualityFocused}</td>

            <td>${typeof element.StrategicDirectionandLeadership=="undefined"?"Blank":element.StrategicDirectionandLeadership}</td>
            <td>${typeof element.PeopleManagement=="undefined"?"Blank":element.PeopleManagement}</td>
            <td>${typeof element.ProgramandProjectManagement=="undefined"?"Blank":element.ProgramandProjectManagement}</td>
            <td>${typeof element.FinancialManagement=="undefined"?"Blank":element.FinancialManagement}</td>
            <td>${typeof element.ChangeLeadership=="undefined"?"Blank":element.ChangeLeadership}</td>
            <td>${typeof element.GovernanceLeadership=="undefined"?"Blank":element.GovernanceLeadership}</td>
            </tr>
                `;
                html +=trow;
                list.innerHTML=html;
            }
            
             
            //   console.log("professionalcompetencies is here");
            //   let core=document.querySelectorAll(".coreprofessional")
            //   for (let i = 0; i < core.length; i++) {
            //     const element = core[i];
            //     element.style.display="table"
              
             
            
            //     Professional(professionalcompetencies)
         
      
      
            // }




          })
        

      })
    }
       
    }
function loadUser() {
    
}