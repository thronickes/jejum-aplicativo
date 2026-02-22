
import './App.css';
import { useAppStore } from './store/useAppStore';
import { WelcomeScreen } from './screens/WelcomeScreen';
import { DiagnosisGoalScreen } from './screens/DiagnosisGoalScreen';
import { DiagnosisWeightScreen } from './screens/DiagnosisWeightScreen';
import { DiagnosisKnowledgeScreen } from './screens/DiagnosisKnowledgeScreen';
import { DiagnosisAgeScreen } from './screens/DiagnosisAgeScreen';
import { DiagnosisRoutineScreen } from './screens/DiagnosisRoutineScreen';
import { DiagnosisSafetyScreen } from './screens/DiagnosisSafetyScreen';
import { ProtocolChoiceScreen } from './screens/ProtocolChoiceScreen';
import { MainApp } from './screens/MainApp';
import { NotificationEngine } from './components/NotificationEngine';
import { SupabaseSync } from './components/SupabaseSync';

function App() {
  const { currentStep } = useAppStore();

  const renderStep = () => {
    switch (currentStep) {
      case 1: return <WelcomeScreen key="step-1" />;
      case 2: return <DiagnosisGoalScreen key="step-2" />;
      case 3: return <DiagnosisWeightScreen key="step-3" />;
      case 4: return <DiagnosisAgeScreen key="step-4" />;
      case 5: return <DiagnosisKnowledgeScreen key="step-5" />;
      case 6: return <DiagnosisRoutineScreen key="step-6" />;
      case 7: return <DiagnosisSafetyScreen key="step-7" />;
      case 8: return <ProtocolChoiceScreen key="step-8" />;
      case 9: return <MainApp key="step-9" />;
      default: return <WelcomeScreen key="step-default" />;
    }
  };

  return (
    <div className="app-container">
      <SupabaseSync />
      <NotificationEngine />
      {renderStep()}
    </div>
  );
}

export default App;
