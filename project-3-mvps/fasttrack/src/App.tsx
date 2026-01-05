import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import KioskLayout from './components/KioskLayout';
import AttractScreen from './components/AttractScreen';
import IDScanner from './components/IDScanner';
import SymptomTriage from './components/SymptomTriage';
import TriageQuestionnaire from './components/TriageQuestionnaire';
import TicketPrinter from './components/TicketPrinter';
import { Flowchart, MTSPriority } from './data/mts-protocols';

type KioskStep = 'attract' | 'scan' | 'select_flowchart' | 'questionnaire' | 'print';

interface KioskData {
  patient: any;
  flowchart: Flowchart | null;
  category: MTSPriority | null;
  discriminator: string | null;
}

function App() {
  const [step, setStep] = useState<KioskStep>('attract');
  const [data, setData] = useState<KioskData>({
    patient: null,
    flowchart: null,
    category: null,
    discriminator: null
  });

  const handleStart = () => setStep('scan');

  const handleScan = (patientData: any) => {
    setData(prev => ({ ...prev, patient: patientData }));
    setStep('select_flowchart');
  };

  const handleSelectFlowchart = (flowchart: Flowchart) => {
    setData(prev => ({ ...prev, flowchart }));
    setStep('questionnaire');
  };

  const handleTriageComplete = (category: MTSPriority, discriminator: string) => {
    setData(prev => ({ ...prev, category, discriminator }));
    setStep('print');
  };

  const handleBackToSelect = () => {
    setData(prev => ({ ...prev, flowchart: null }));
    setStep('select_flowchart');
  };

  const handleReset = () => {
    setData({ patient: null, flowchart: null, category: null, discriminator: null });
    setStep('attract');
  };

  return (
    <KioskLayout onReset={handleReset}>
      <AnimatePresence mode="wait">
        {step === 'attract' && (
          <AttractScreen key="attract" onStart={handleStart} />
        )}

        {step === 'scan' && (
          <motion.div
            key="scan"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="h-full"
          >
            <IDScanner onScan={handleScan} />
          </motion.div>
        )}

        {step === 'select_flowchart' && (
          <motion.div
            key="select"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="h-full"
          >
            <SymptomTriage onSelect={handleSelectFlowchart} />
          </motion.div>
        )}

        {step === 'questionnaire' && data.flowchart && (
          <motion.div
            key="questionnaire"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="h-full"
          >
            <TriageQuestionnaire
              flowchart={data.flowchart}
              onComplete={handleTriageComplete}
              onBack={handleBackToSelect}
            />
          </motion.div>
        )}

        {step === 'print' && data.patient && data.category && (
          <motion.div
            key="print"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="h-full"
          >
            <TicketPrinter
              data={{
                patient: data.patient,
                symptom: data.flowchart?.title || '',
                category: data.category,
                discriminator: data.discriminator || ''
              } as any}
              onFinish={handleReset}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </KioskLayout>
  );
}

export default App;
