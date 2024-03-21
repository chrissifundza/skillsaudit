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
                    const startDate = new Date(element.SupervisordateEngaged);
    
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
                <td>(${element.competencies})</td>
                <td>(L ${lv[lv.length-1]})</td>
                <td>${element.yearsDifference}</td>
                <td>${element.QualificationName}</td>
                <td>${typeof element.SupervisorWrittenCommunication=="undefined"?"Blank":element.SupervisorWrittenCommunication}</td>
                <td>${typeof element.SupervisorOralCommunication=="undefined"?"Blank":element.SupervisorOralCommunication}</td>
                <td>${typeof element.SupervisorResearchandAnalysis=="undefined"?"Blank":element.SupervisorResearchandAnalysis}</td>
                <td>${typeof element["SupervisorAdvocacy/Negotiation"]=="undefined"?"Blank":element["SupervisorAdvocacy/Negotiation"]}</td>
                <td>${typeof element.SupervisorEthicsandProfessionalism=="undefined"?"Blank":element.SupervisorEthicsandProfessionalism}</td>
                <td>${typeof element.SupervisorOrganisationalAwareness=="undefined"?"Blank":element.SupervisorOrganisationalAwareness}</td>
                <td>${typeof element.SupervisorBusinessCommunication=="undefined"?"Blank":element.SupervisorBusinessCommunication}</td>
                <td>${typeof element.SupervisorConsulting=="undefined"?"Blank":element.SupervisorConsulting}</td>
                <td>${typeof element.SupervisorPlanningandOrganising=="undefined"?"Blank":element.SupervisorPlanningandOrganising}</td>
                <td>${typeof element.SupervisorMonitoringandControl=="undefined"?"Blank":element.SupervisorMonitoringandControl}</td>
                <td>${typeof element.SupervisorNegotiation=="undefined"?"Blank":element.SupervisorNegotiation}</td>
                <td>${typeof element.SupervisorUseofTechnology=="undefined"?"Blank":element.SupervisorUseofTechnology}</td>
                <td>${typeof element.SupervisorCommunication=="undefined"?"Blank":element.SupervisorCommunication}</td>
                <td>${typeof element.SupervisorConceptualThinking=="undefined"?"Blank":element.SupervisorConceptualThinking}</td>
                <td>${typeof element["SupervisorWrittenCommunication/Drafting"]=="undefined"?"Blank":element["SupervisorWrittenCommunication/Drafting"]}</td>
                <td>${typeof element.SupervisorPlanning=="undefined"?"Blank":element.SupervisorPlanning}</td>
                <td>${typeof element.SupervisorAttentiontoDetail=="undefined"?"Blank":element.SupervisorAttentiontoDetail}</td>
                <td>${typeof element.SupervisorProblemSolving=="undefined"?"Blank":element.SupervisorProblemSolving}</td>
                <td>${typeof element.SupervisorResearchandDevelopment=="undefined"?"Blank":element.SupervisorResearchandDevelopment}</td>
                <td>${typeof element.SupervisorInformationManagement=="undefined"?"Blank":element.SupervisorInformationManagement}</td>
                <td>${typeof element.SupervisorInfluencing=="undefined"?"Blank":element.SupervisorInfluencing}</td>
                <td>${typeof element.SupervisorPublicConsultation=="undefined"?"Blank":element.SupervisorPublicConsultation}</td>
                <td>${typeof element["SupervisorSocio-Economic/Socio-PoliticalAwareness"]=="undefined"?"Blank":element["SupervisorSocio-Economic/Socio-PoliticalAwareness"]}</td>
                <td>${typeof element.SupervisorManagingWork=="undefined"?"Blank":element.SupervisorManagingWork}</td>
                <td>${typeof element.SupervisorQualityOrientation=="undefined"?"Blank":element.SupervisorQualityOrientation}</td>
                <td>${typeof element.SupervisorDisciplineSpecificSkills=="undefined"?"Blank":element.SupervisorDisciplineSpecificSkills}</td>
                <td>${typeof element.SupervisorPeopleManagement=="undefined"?"Blank":element.SupervisorPeopleManagement}</td>
                <td>${typeof element.SupervisorTaskManagement=="undefined"?"Blank":element.SupervisorTaskManagement}</td>
                <td>${typeof element.SupervisorWorkPlaceSafety=="undefined"?"Blank":element.SupervisorWorkPlaceSafety}</td>
                <td>${typeof element.SupervisorBudgeting=="undefined"?"Blank":element.SupervisorBudgeting}</td>
                <td>${typeof element.SupervisorInterpersonalRelationships=="undefined"?"Blank":element.SupervisorInterpersonalRelationships}</td>
                <td>${typeof element.SupervisorServiceDeliveryOrientation=="undefined"?"Blank":element.SupervisorServiceDeliveryOrientation}</td>
                <td>${typeof element.SupervisorActionandOutcomeOrientation=="undefined"?"Blank":element.SupervisorActionandOutcomeOrientation}</td>
                <td>${typeof element.SupervisorResilience=="undefined"?"Blank":element.SupervisorResilience}</td>
                <td>${typeof element.SupervisorEthicsandAccountability=="undefined"?"Blank":element.SupervisorEthicsandAccountability}</td>
                <td>${typeof element.SupervisorDirectionSetting=="undefined"?"Blank":element.SupervisorDirectionSetting}</td>
                <td>${typeof element.SupervisorImpactandInfluence=="undefined"?"Blank":element.SupervisorImpactandInfluence}</td>
                <td>${typeof element.SupervisorCoachingandMentoring=="undefined"?"Blank":element.SupervisorCoachingandMentoring}</td>
                <td>${typeof element.SupervisorTeamOrientation=="undefined"?"Blank":element.SupervisorTeamOrientation}</td>
                <td>${typeof element.SupervisorCommunityandCustomerFocus=="undefined"?"Blank":element.SupervisorCommunityandCustomerFocus}</td>
                <td>${typeof element.SupervisorNegotiationandInfluencing=="undefined"?"Blank":element.SupervisorNegotiationandInfluencing}</td>
                <td>${typeof element.SupervisorFireFighting=="undefined"?"Blank":element.SupervisorFireFighting}</td>
                <td>${typeof element.SupervisorEvaluationandResearch=="undefined"?"Blank":element.SupervisorEvaluationandResearch}</td>
                <td>${typeof element["SupervisorProfessional/TechnicalProficiency"]=="undefined"?"Blank":element["SupervisorProfessional/TechnicalProficiency"]}</td>
                <td>${typeof element.SupervisorTechnicalCommunication=="undefined"?"Blank":element.SupervisorTechnicalCommunication}</td>
                <td>${typeof element.SupervisorDecisionMaking=="undefined"?"Blank":element.SupervisorDecisionMaking}</td>
                <td>${typeof element.SupervisorAdviceandGuidance=="undefined"?"Blank":element.SupervisorAdviceandGuidance}</td>
                <td>${typeof element.SupervisorComputerLiteracy=="undefined"?"Blank":element.SupervisorComputerLiteracy}</td>
                <td>${typeof element["SupervisorOrganisationalAwareness/PoliticalImpact"]=="undefined"?"Blank":element["SupervisorOrganisationalAwareness/PoliticalImpact"]}</td>
                <td>${typeof element.SupervisorInformationMeasuringandMonitoring=="undefined"?"Blank":element.SupervisorInformationMeasuringandMonitoring}</td>
                <td>${typeof element.SupervisorMonitoringandReporting=="undefined"?"Blank":element.SupervisorMonitoringandReporting}</td>
                <td>${typeof element.SupervisorInternalAuditing=="undefined"?"Blank":element.SupervisorInternalAuditing}</td>
            <td>${typeof element.SupervisorEngagementManagement=="undefined"?"Blank":element.SupervisorEngagementManagement}</td>
            <td>${typeof element.SupervisorInformationManagement=="undefined"?"Blank":element.SupervisorInformationManagement}</td>
            <td>${typeof element.SupervisorInformationStrategy=="undefined"?"Blank":element.SupervisorInformationStrategy}</td>
            <td>${typeof element.SupervisorAdviceandGuidance=="undefined"?"Blank":element.SupervisorAdviceandGuidance}</td>
            <td>${typeof element["SupervisorBusinessandIS&TPlanning"]=="undefined"?"Blank":element["SupervisorBusinessandIS&TPlanning"]}</td>
            <td>${typeof element.SupervisorTechnicalStrategyandPlanning=="undefined"?"Blank":element.SupervisorTechnicalStrategyandPlanning}</td>
            <td>${typeof element.SupervisorBusinessChangeManagement=="undefined"?"Blank":element.SupervisorBusinessChangeManagement}</td>
            <td>${typeof element.SupervisorDataConversion=="undefined"?"Blank":element.SupervisorDataConversion}</td>
            <td>${typeof element.SupervisorOperations=="undefined"?"Blank":element.SupervisorOperations}</td>
            <td>${typeof element.SupervisorInstallationandIntegration=="undefined"?"Blank":element.SupervisorInstallationandIntegration}</td>
            <td>${typeof element.SupervisorUserSupport=="undefined"?"Blank":element.SupervisorUserSupport}</td>
            <td>${typeof element.SupervisorPeopleManagement=="undefined"?"Blank":element.SupervisorPeopleManagement}</td>
            <td>${typeof element.SupervisorTaskManagement=="undefined"?"Blank":element.SupervisorTaskManagement}</td>
            <td>${typeof element.SupervisorProjectManagement=="undefined"?"Blank":element.SupervisorProjectManagement}</td>
            <td>${typeof element.SupervisorFinancialManagement=="undefined"?"Blank":element.SupervisorFinancialManagement}</td>
            <td>${typeof element.SupervisorInformationMeasuringandMonitoring=="undefined"?"Blank":element.SupervisorInformationMeasuringandMonitoring}</td>
            <td>${typeof element.SupervisorTechnologyUsage=="undefined"?"Blank":element.SupervisorTechnologyUsage}</td>
            <td>${typeof element.SupervisorConceptualThinking=="undefined"?"Blank":element.SupervisorConceptualThinking}</td>
            <td>${typeof element.SupervisorLitigationManagement=="undefined"?"Blank":element.SupervisorLitigationManagement}</td>
            <td>${typeof element.SupervisorResearchandAnalysis=="undefined"?"Blank":element.SupervisorResearchandAnalysis}</td>
            <td>${typeof element.SupervisorInterpersonalRelationships=="undefined"?"Blank":element.SupervisorInterpersonalRelationships}</td>
            <td>${typeof element.SupervisorCommunication=="undefined"?"Blank":element.SupervisorCommunication}</td>
            <td>${typeof element.SupervisorServiceDeliveryOrientation=="undefined"?"Blank":element.SupervisorServiceDeliveryOrientation}</td>
            <td>${typeof element.SupervisorChangeMovement=="undefined"?"Blank":element.SupervisorChangeMovement}</td>
            <td>${typeof element.SupervisorHRTechnologyInformationManagement=="undefined"?"Blank":element.SupervisorHRTechnologyInformationManagement}</td>
            <td>${typeof element.SupervisorHRServiceDelivery=="undefined"?"Blank":element.SupervisorHRServiceDelivery}</td>
            <td>${typeof element.SupervisorTalentManagement=="undefined"?"Blank":element.SupervisorTalentManagement}</td>
            <td>${typeof element.SupervisorWorkforcePlanning=="undefined"?"Blank":element.SupervisorWorkforcePlanning}</td>
            <td>${typeof element.SupervisorLearningandDevelopment=="undefined"?"Blank":element.SupervisorLearningandDevelopment}</td>
            <td>${typeof element.SupervisorOccupationalHealthandSafety=="undefined"?"Blank":element.SupervisorOccupationalHealthandSafety}</td>
            <td>${typeof element.SupervisorCompensationandBenefitsManagement=="undefined"?"Blank":element.SupervisorCompensationandBenefitsManagement}</td>
            <td>${typeof element.SupervisorPerformanceManagement=="undefined"?"Blank":element.SupervisorPerformanceManagement}</td>
            <td>${typeof element.SupervisorEmployeeWellness=="undefined"?"Blank":element.SupervisorEmployeeWellness}</td>
            <td>${typeof element.SupervisorIndustrialandLabourRelations=="undefined"?"Blank":element.SupervisorIndustrialandLabourRelations}</td>
            <td>${typeof element.SupervisorStrategicHRManagement=="undefined"?"Blank":element.SupervisorStrategicHRManagement}</td>
            <td>${typeof element.SupervisorDesign=="undefined"?"Blank":element.SupervisorDesign}</td>
            <td>${typeof element.SupervisorConstruction=="undefined"?"Blank":element.SupervisorConstruction}</td>
            <td>${typeof element.SupervisorOperationsandMaintenance=="undefined"?"Blank":element.SupervisorOperationsandMaintenance}</td>
            <td>${typeof element.SupervisorAccounting=="undefined"?"Blank":element.SupervisorAccounting}</td>
            <td>${typeof element.SupervisorProcurement=="undefined"?"Blank":element.SupervisorProcurement}</td>
            <td>${typeof element.SupervisorBudgeting=="undefined"?"Blank":element.SupervisorBudgeting}</td>
            <td>${typeof element.SupervisorCosting=="undefined"?"Blank":element.SupervisorCosting}</td>
            <td>${typeof element.SupervisorFinancialReporting=="undefined"?"Blank":element.SupervisorFinancialReporting}</td>
            <td>${typeof element.SupervisorFinancialProcessManagement=="undefined"?"Blank":element.SupervisorFinancialProcessManagement}</td>
            <td>${typeof element.SupervisorProcurementandTenders=="undefined"?"Blank":element.SupervisorProcurementandTenders}</td>
            <td>${typeof element.SupervisorSamplingAnalyses=="undefined"?"Blank":element.SupervisorSamplingAnalyses}</td>
            <td>${typeof element.SupervisorRawMaterialInventory=="undefined"?"Blank":element.SupervisorRawMaterialInventory}</td>
            <td>${typeof element.SupervisorStakeholderLiason=="undefined"?"Blank":element.SupervisorStakeholderLiason}</td>
            <td>${typeof element.SupervisorSpatialPlanning=="undefined"?"Blank":element.SupervisorSpatialPlanning}</td>
            <td>${typeof element.SupervisorUrbanDesign=="undefined"?"Blank":element.SupervisorUrbanDesign}</td>
            <td>${typeof element.SupervisorLandUseManagement=="undefined"?"Blank":element.SupervisorLandUseManagement}</td>
            <td>${typeof element["SupervisorResearch,InformationAnalysisandPolicy"]=="undefined"?"Blank":element["SupervisorResearch,InformationAnalysisandPolicy"]}</td>
            <td>${typeof element.SupervisorKnowledgeManagement=="undefined"?"Blank":element.SupervisorKnowledgeManagement}</td>
            <td>${typeof element.SupervisorPublicConsultation=="undefined"?"Blank":element.SupervisorPublicConsultation}</td>
            <td>${typeof element["SupervisorSocio-Economic/Socio-PoliticalAwareness"]=="undefined"?"Blank":element["SupervisorSocio-Economic/Socio-PoliticalAwareness"]}</td>
            <td>${typeof element.SupervisorPolicyConceptualisation=="undefined"?"Blank":element.SupervisorPolicyConceptualisation}</td>
            <td>${typeof element.SupervisorBuildingDevelopmentControl=="undefined"?"Blank":element.SupervisorBuildingDevelopmentControl}</td>
            <td>${typeof element.SupervisorBuildingInspectorateCustomerCentricity=="undefined"?"Blank":element.SupervisorBuildingInspectorateCustomerCentricity}</td>
            <td>${typeof element.SupervisorLegalAdministration=="undefined"?"Blank":element.SupervisorLegalAdministration}</td>
            <td>${typeof element.SupervisorNegotiationandInfluencing=="undefined"?"Blank":element.SupervisorNegotiationandInfluencing}</td>
            <td>${typeof element.SupervisorEthicsandProfessionalism=="undefined"?"Blank":element.SupervisorEthicsandProfessionalism}</td>
            <td>${typeof element["SupervisorProfessional/TechnicalProficiency"]=="undefined"?"Blank":element["SupervisorProfessional/TechnicalProficiency"]}</td>
            <td>${typeof element["SupervisorManagingWork-OperationWork"]=="undefined"?"Blank":element["SupervisorManagingWork-OperationWork"]}</td>
            <td>${typeof element.SupervisorWorkPlaceSafety=="undefined"?"Blank":element.SupervisorWorkPlaceSafety}</td>
            <td>${typeof element.SupervisorTaskAccountability=="undefined"?"Blank":element.SupervisorTaskAccountability}</td>
            <td>${typeof element.SupervisorQualityOrientation=="undefined"?"Blank":element.SupervisorQualityOrientation}</td>
            <td>${typeof element.SupervisorOralCommunication=="undefined"?"Blank":element.SupervisorOralCommunication}</td>
            <td>${typeof element["SupervisorOperationMonitoring-SmallPlant"]=="undefined"?"Blank":element["SupervisorOperationMonitoring-SmallPlant"]}</td>
            <td>${typeof element.SupervisorQualityControlAnalysis=="undefined"?"Blank":element.SupervisorQualityControlAnalysis}</td>
            <td>${typeof element.SupervisorOperationandControl=="undefined"?"Blank":element.SupervisorOperationandControl}</td>
            <td>${typeof element.SupervisorTroubleshooting=="undefined"?"Blank":element.SupervisorTroubleshooting}</td>
            <td>${typeof element.SupervisorPlanningandOrganising=="undefined"?"Blank":element.SupervisorPlanningandOrganising}</td>
            <td>${typeof element["SupervisorVehicleSafety-DriverGrade1"]=="undefined"?"Blank":element["SupervisorVehicleSafety-DriverGrade1"]}</td>
            <td>${typeof element["SupervisorVehicleSafety-DriverGrade2"]=="undefined"?"Blank":element["SupervisorVehicleSafety-DriverGrade2"]}</td>
            <td>${typeof element["SupervisorVehicleSafety-DriverGrade3"]=="undefined"?"Blank":element["SupervisorVehicleSafety-DriverGrade3"]}</td>
            <td>${typeof element["SupervisorVehicleSafety-DriverGrade4"]=="undefined"?"Blank":element["SupervisorVehicleSafety-DriverGrade4"]}</td>
            <td>${typeof element["SupervisorVehicleSafety-DriverGrade5"]=="undefined"?"Blank":element["SupervisorVehicleSafety-DriverGrade5"]}</td>
            <td>${typeof element.SupervisorDrivingBehaviour=="undefined"?"Blank":element.SupervisorDrivingBehaviour}</td>
            <td>${typeof element.SupervisorLearningOrientation=="undefined"?"Blank":element.SupervisorLearningOrientation}</td>
            <td>${typeof element["SupervisorOperationMonitoring-LightEquipment"]=="undefined"?"Blank":element["SupervisorOperationMonitoring-LightEquipment"]}</td>
            <td>${typeof element["SupervisorVehicleSafety-DriverGrade6"]=="undefined"?"Blank":element["SupervisorVehicleSafety-DriverGrade6"]}</td>
            <td>${typeof element["SupervisorOperationMonitoring-MechanicalPlant"]=="undefined"?"Blank":element["SupervisorOperationMonitoring-MechanicalPlant"]}</td>
            <td>${typeof element["SupervisorVehicleSafety-DriverGrade3/SpecialCategory"]=="undefined"?"Blank":element["SupervisorVehicleSafety-DriverGrade3/SpecialCategory"]}</td>
            <td>${typeof element["SupervisorVehicleSafety-Chauffeur"]=="undefined"?"Blank":element["SupervisorVehicleSafety-Chauffeur"]}</td>
            <td>${typeof element.SupervisorDisciplineSpecificSkills=="undefined"?"Blank":element.SupervisorDisciplineSpecificSkills}</td>
            <td>${typeof element.SupervisorMonitoringandControl=="undefined"?"Blank":element.SupervisorMonitoringandControl}</td>
            <td>${typeof element.SupervisorOrganisationalAwareness=="undefined"?"Blank":element.SupervisorOrganisationalAwareness}</td>
            <td>${typeof element.SupervisorAttentiontoDetail=="undefined"?"Blank":element.SupervisorAttentiontoDetail}</td>
            <td>${typeof element.SupervisorDirectionSetting=="undefined"?"Blank":element.SupervisorDirectionSetting}</td>
            <td>${typeof element.SupervisorDisputeResolution=="undefined"?"Blank":element.SupervisorDisputeResolution}</td>
            <td>${typeof element.SupervisorProblemSolving=="undefined"?"Blank":element.SupervisorProblemSolving}</td>
            <td>${typeof element.SupervisorNegotiation=="undefined"?"Blank":element.SupervisorNegotiation}</td>
            <td>${typeof element["SupervisorDataProcessing&Analysis"]=="undefined"?"Blank":element["SupervisorDataProcessing&Analysis"]}</td>
            <td>${typeof element.SupervisorStrategicPlanningandStrategyFormulation=="undefined"?"Blank":element.SupervisorStrategicPlanningandStrategyFormulation}</td>
            <td>${typeof element.SupervisorProgrammeandProjectManagement=="undefined"?"Blank":element.SupervisorProgrammeandProjectManagement}</td>
            <td>${typeof element.SupervisorInformationProductsandReporting=="undefined"?"Blank":element.SupervisorInformationProductsandReporting}</td>
            <td>${typeof element.SupervisorResilience=="undefined"?"Blank":element.SupervisorResilience}</td>
            <td>${typeof element["SupervisorPatrol,EnforcementandEmergencyResponse"]=="undefined"?"Blank":element["SupervisorPatrol,EnforcementandEmergencyResponse"]}</td>
            <td>${typeof element.SupervisorFireFighting=="undefined"?"Blank":element.SupervisorFireFighting}</td>
            <td>${typeof element.SupervisorRescueOperations=="undefined"?"Blank":element.SupervisorRescueOperations}</td>
            <td>${typeof element["SupervisorSpecialOperations(Hazmat,UrbanSearchandRescue)"]=="undefined"?"Blank":element["SupervisorSpecialOperations(Hazmat,UrbanSearchandRescue)"]}</td>
            <td>${typeof element.SupervisorFireSafetyandPrevention=="undefined"?"Blank":element.SupervisorFireSafetyandPrevention}</td>
            <td>${typeof element.SupervisorSafetyandWelfare=="undefined"?"Blank":element.SupervisorSafetyandWelfare}</td>
            <td>${typeof element.SupervisorEmergencyMedicalCare=="undefined"?"Blank":element.SupervisorEmergencyMedicalCare}</td>
            <td>${typeof element.SupervisorCallTakingandDispatch=="undefined"?"Blank":element.SupervisorCallTakingandDispatch}</td>
            <td>${typeof element.SupervisorAnalyticalSkills=="undefined"?"Blank":element.SupervisorAnalyticalSkills}</td>
            <td>${typeof element["SupervisorAdvocacy/Negotiation"]=="undefined"?"Blank":element["SupervisorAdvocacy/Negotiation"]}</td>
            <td>${typeof element.SupervisorWaterMonitoring=="undefined"?"Blank":element.SupervisorWaterMonitoring}</td>
            <td>${typeof element.SupervisorFoodControl=="undefined"?"Blank":element.SupervisorFoodControl}</td>
            <td>${typeof element.SupervisorWasteManagement=="undefined"?"Blank":element.SupervisorWasteManagement}</td>
            <td>${typeof element.SupervisorHealthSurveillanceofPremises=="undefined"?"Blank":element.SupervisorHealthSurveillanceofPremises}</td>
            <td>${typeof element["SupervisorCommunicableDiseasesManagement(exceptimmunizations)"]=="undefined"?"Blank":element["SupervisorCommunicableDiseasesManagement(exceptimmunizations)"]}</td>
            <td>${typeof element.SupervisorEnvironmentalPollutionControl=="undefined"?"Blank":element.SupervisorEnvironmentalPollutionControl}</td>
            <td>${typeof element.SupervisorDisposaloftheDead=="undefined"?"Blank":element.SupervisorDisposaloftheDead}</td>
            <td>${typeof element.SupervisorHealthPromotion=="undefined"?"Blank":element.SupervisorHealthPromotion}</td>
            <td>${typeof element.SupervisorVectorControl=="undefined"?"Blank":element.SupervisorVectorControl}</td>
            <td>${typeof element.SupervisorFacilitySpecificSkills=="undefined"?"Blank":element.SupervisorFacilitySpecificSkills}</td>
            <td>${typeof element.SupervisorIllegalLandInvasion=="undefined"?"Blank":element.SupervisorIllegalLandInvasion}</td>
            <td>${typeof element.SupervisorLegalProcessAdministration=="undefined"?"Blank":element.SupervisorLegalProcessAdministration}</td>
            <td>${typeof element.SupervisorRelocationProcesses=="undefined"?"Blank":element.SupervisorRelocationProcesses}</td>
            <td>${typeof element.SupervisorSurveyingDataManagement=="undefined"?"Blank":element.SupervisorSurveyingDataManagement}</td>
            <td>${typeof element.SupervisorDisasterOperations=="undefined"?"Blank":element.SupervisorDisasterOperations}</td>
            <td>${typeof element.SupervisorDataCapture=="undefined"?"Blank":element.SupervisorDataCapture}</td>
            <td>${typeof element.SupervisorDataExchange=="undefined"?"Blank":element.SupervisorDataExchange}</td>
            <td>${typeof element["SupervisorDatabaseDesign&Management"]=="undefined"?"Blank":element["SupervisorDatabaseDesign&Management"]}</td>
            <td>${typeof element.SupervisorProfessionalConduct=="undefined"?"Blank":element.SupervisorProfessionalConduct}</td>
            <td>${typeof element.SupervisorGISSystemsandSoftware=="undefined"?"Blank":element.SupervisorGISSystemsandSoftware}</td>
            <td>${typeof element.SupervisorImageAnalysis=="undefined"?"Blank":element.SupervisorImageAnalysis}</td> 
            <td>${typeof element.SupervisorSpatialAwareness=="undefined"?"Blank":element.SupervisorSpatialAwareness}</td>
            <td>${typeof element.SupervisorSpatialAnalysis=="undefined"?"Blank":element.SupervisorSpatialAnalysis}</td>
            <td>${typeof element.SupervisorInformationTechnology=="undefined"?"Blank":element.SupervisorInformationTechnology}</td>
            <td>${typeof element.SupervisorConsulting=="undefined"?"Blank":element.SupervisorConsulting}</td>
            <td>${typeof element["SupervisorUseofProcessSpecificTechnology/Equipment"]=="undefined"?"Blank":element["SupervisorUseofProcessSpecificTechnology/Equipment"]}</td>
            <td>${typeof element.SupervisorBusinessProcess=="undefined"?"Blank":element.SupervisorBusinessProcess}</td>
            <td>${typeof element.SupervisorUseofTechnology=="undefined"?"Blank":element.SupervisorUseofTechnology}</td>

            <td>${typeof element.SupervisorImpactandInfluence=="undefined"?"Blank":element.SupervisorImpactandInfluence}</td>
            <td>${typeof element.SupervisorTeamOrientation=="undefined"?"Blank":element.SupervisorTeamOrientation}</td>
            <td>${typeof element.SupervisorCoachingandMentoring=="undefined"?"Blank":element.SupervisorCoachingandMentoring}</td>
            <td>${typeof element["SupervisorStrategicCapability/LeadershiporDirectionSetting"]=="undefined"?"Blank":element["SupervisorStrategicCapability/LeadershiporDirectionSetting"]}</td>
            <td>${typeof element.SupervisorDirectionSetting=="undefined"?"Blank":element.SupervisorDirectionSetting}</td>
            <td>${typeof element.SupervisorLeadership=="undefined"?"Blank":element.SupervisorLeadership}</td>
            <td>${typeof element.SupervisorStrategicCapabilityandLeadership=="undefined"?"Blank":element.SupervisorStrategicCapabilityandLeadership}</td>
                    
            <td>${typeof element.SupervisorInterpersonalRelationships=="undefined"?"Blank":element.SupervisorInterpersonalRelationships}</td>
            <td>${typeof element.SupervisorCommunication=="undefined"?"Blank":element.SupervisorCommunication}</td>
            <td>${typeof element.SupervisorServiceDeliveryOrientation=="undefined"?"Blank":element.SupervisorServiceDeliveryOrientation}</td>
            <td>${typeof element.SupervisorCustomerOrientationandCustomerFocus=="undefined"?"Blank":element.SupervisorCustomerOrientationandCustomerFocus}</td>
            <td>${typeof element.SupervisorActionandOutcomeOrientation=="undefined"?"Blank":element.SupervisorActionandOutcomeOrientation}</td>
            <td>${typeof element.SupervisorResilience=="undefined"?"Blank":element.SupervisorResilience}</td>
            <td>${typeof element.SupervisorCognitiveAbility=="undefined"?"Blank":element.SupervisorCognitiveAbility}</td>
            <td>${typeof element.SupervisorLearningOrientation=="undefined"?"Blank":element.SupervisorLearningOrientation}</td>
            <td>${typeof element.SupervisorTechnologyUsage=="undefined"?"Blank":element.SupervisorTechnologyUsage}</td>
            <td>${typeof element.SupervisorAccountabilityandEthicalConduct=="undefined"?"Blank":element.SupervisorAccountabilityandEthicalConduct}</td>
            <td>${typeof element.SupervisorDirectionSetting=="undefined"?"Blank":element.SupervisorDirectionSetting}</td>
            <td>${typeof element.SupervisorImpactandInfluence=="undefined"?"Blank":element.SupervisorImpactandInfluence}</td>
            <td>${typeof element.SupervisorCoachingandMentoring=="undefined"?"Blank":element.SupervisorCoachingandMentoring}</td>
            <td>${typeof element.SupervisorTeamOrientation=="undefined"?"Blank":element.SupervisorTeamOrientation}</td>
            <td>${typeof element.SupervisorClientOrientationandCustomerFocus=="undefined"?"Blank":element.SupervisorClientOrientationandCustomerFocus}</td>
            <td>${typeof element.SupervisorEthicsandAccountability=="undefined"?"Blank":element.SupervisorEthicsandAccountability}</td>
            <td>${typeof element.SupervisorClientOrientationandCustomerService=="undefined"?"Blank":element.SupervisorClientOrientationandCustomerService}</td>
                          
            <td>${typeof element.SupervisorActionandOutcomeOrientation=="undefined"?"Blank":element.SupervisorActionandOutcomeOrientation}</td>
            <td>${typeof element.SupervisorResilience=="undefined"?"Blank":element.SupervisorResilience}</td>
            <td>${typeof element.SupervisorChangeReadiness=="undefined"?"Blank":element.SupervisorChangeReadiness}</td>
            <td>${typeof element.SupervisorCognitiveAbility=="undefined"?"Blank":element.SupervisorCognitiveAbility}</td>
            <td>${typeof element.SupervisorLearningOrientation=="undefined"?"Blank":element.SupervisorLearningOrientation}</td>
            <td>${typeof element.SupervisorProblemSolving=="undefined"?"Blank":element.SupervisorProblemSolving}</td>
            <td>${typeof element.SupervisorAccountabilityandEthicalConduct=="undefined"?"Blank":element.SupervisorAccountabilityandEthicalConduct}</td>
            <td>${typeof element.SupervisorServiceDeliveryOrientation=="undefined"?"Blank":element.SupervisorServiceDeliveryOrientation}</td>
            <td>${typeof element.SupervisorConflictManagement=="undefined"?"Blank":element.SupervisorConflictManagement}</td>
            <td>${typeof element.SupervisorProblemSolvingandAnalysis=="undefined"?"Blank":element.SupervisorProblemSolvingandAnalysis}</td>
            <td>${typeof element.SupervisorImpactandInfluence=="undefined"?"Blank":element.SupervisorImpactandInfluence}</td>
            <td>${typeof element.SupervisorTeamOrientation=="undefined"?"Blank":element.SupervisorTeamOrientation}</td>
            <td>${typeof element.SupervisorDirectionSetting=="undefined"?"Blank":element.SupervisorDirectionSetting}</td>
            <td>${typeof element.SupervisorCoachingandMentoring=="undefined"?"Blank":element.SupervisorCoachingandMentoring}</td>
            <td>${typeof element.SupervisorOralCommunication=="undefined"?"Blank":element.SupervisorOralCommunication}</td>
            <td>${typeof element.SupervisorWrittenCommunication=="undefined"?"Blank":element.SupervisorWrittenCommunication}</td>
            <td>${typeof element.SupervisorOrganisationalAwareness=="undefined"?"Blank":element.SupervisorOrganisationalAwareness}</td>
            <td>${typeof element.SupervisorPlanningandOrganising=="undefined"?"Blank":element.SupervisorPlanningandOrganising}</td>
            <td>${typeof element.SupervisorEthicsandAccountability=="undefined"?"Blank":element.SupervisorEthicsandAccountability}</td>
            <td>${typeof element.SupervisorInformationManagement=="undefined"?"Blank":element.SupervisorInformationManagement}</td>
            <td>${typeof element.SupervisorAttentiontoDetail=="undefined"?"Blank":element.SupervisorAttentiontoDetail}</td>
            <td>${typeof element.SupervisorFlexibility=="undefined"?"Blank":element.SupervisorFlexibility}</td>
            <td>${typeof element.SupervisorIntegrity=="undefined"?"Blank":element.SupervisorIntegrity}</td>
            <td>${typeof element["SupervisorManagementofLearning(LearningOrientation)"]=="undefined"?"Blank":element["SupervisorManagementofLearning(LearningOrientation)"]}</td>
            <td>${typeof element.SupervisorActionOrientation=="undefined"?"Blank":element.SupervisorActionOrientation}</td>

            <td>${typeof element.SupervisorMoralCompetence=="undefined"?"Blank":element.SupervisorMoralCompetence}</td>
            <td>${typeof element.SupervisorPlanningandOrganising=="undefined"?"Blank":element.SupervisorPlanningandOrganising}</td>
            <td>${typeof element.SupervisorAnalysisandInnovation=="undefined"?"Blank":element.SupervisorAnalysisandInnovation}</td>
            <td>${typeof element.SupervisorKnowledgeandInformationManagement=="undefined"?"Blank":element.SupervisorKnowledgeandInformationManagement}</td>
            <td>${typeof element.SupervisorCommunication=="undefined"?"Blank":element.SupervisorCommunication}</td>
            <td>${typeof element.SupervisorResultsandQualityFocused=="undefined"?"Blank":element.SupervisorResultsandQualityFocused}</td>

            <td>${typeof element.SupervisorStrategicDirectionandLeadership=="undefined"?"Blank":element.SupervisorStrategicDirectionandLeadership}</td>
            <td>${typeof element.SupervisorPeopleManagement=="undefined"?"Blank":element.SupervisorPeopleManagement}</td>
            <td>${typeof element.SupervisorProgramandProjectManagement=="undefined"?"Blank":element.SupervisorProgramandProjectManagement}</td>
            <td>${typeof element.SupervisorFinancialManagement=="undefined"?"Blank":element.SupervisorFinancialManagement}</td>
            <td>${typeof element.SupervisorChangeLeadership=="undefined"?"Blank":element.SupervisorChangeLeadership}</td>
            <td>${typeof element.SupervisorGovernanceLeadership=="undefined"?"Blank":element.SupervisorGovernanceLeadership}</td>
            </tr>
                `;
                html +=trow;
                list.innerHTML=html;
            }
            
             
            //   console.log("professionalcompetencies is here");
            //   let core=document.querySelectorAll(".coreprofessional")
            //   for (let i = 0; i < core.length; i++) {
            //     const element = core[i];
            //     element.Supervisorstyle.display="table"
              
             
            
            //     Professional(professionalcompetencies)
         
      
      
            // }




          })
        

      })
    }
       
    }
function loadUser() {
    
}
