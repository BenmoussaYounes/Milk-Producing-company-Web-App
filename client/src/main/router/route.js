
import TotalDailyMilkProduction from "../../presentation/pages/totalDailyMilkProduction";
import BirthRegistration from "../../presentation/pages/birthRegistration";
import Registering from "../../presentation/pages/registering";
import MedicalExaminationRegistration from "../../presentation/pages/medicalExaminationRegistration";
export default function Route() {
    let Component;
    switch(window.location.pathname){
      case "/": 
      Component = Registering
      break;
      case "/registering": 
      Component = Registering
      break;
      case "/medicalExaminationRegistration": 
      Component = MedicalExaminationRegistration
      break;
      case "/birthRegistration": 
      Component = BirthRegistration;
      break;
      case "/totalDailyMilkProduction": 
      Component = TotalDailyMilkProduction
      break;
      default :Component=Registering
      break
    }
    return <Component/>;
  }