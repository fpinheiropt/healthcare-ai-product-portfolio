
import { Plus, X } from 'lucide-react';
import { DRUG_DATABASE } from '../engine/PharmacistAgentEngine';

interface Props {
    activeDrugs: string[];
    onAdd: (id: string) => void;
    onRemove: (id: string) => void;
}

export const MedicationInput: React.FC<Props> = ({ activeDrugs, onAdd, onRemove }) => {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-full">
            <div className="p-4 border-b border-slate-100 bg-slate-50">
                <h2 className="font-bold text-slate-700">Patient Regimen</h2>
            </div>

            <div className="p-4 space-y-4 flex-1 overflow-y-auto">
                <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase">Available Formulary</label>
                    <div className="grid grid-cols-1 gap-2">
                        {DRUG_DATABASE.filter(d => !activeDrugs.includes(d.id)).map(drug => (
                            <button
                                key={drug.id}
                                onClick={() => onAdd(drug.id)}
                                className="flex items-center justify-between p-3 rounded-xl border border-dashed border-slate-300 hover:border-blue-500 hover:bg-blue-50 transition-all group text-left"
                            >
                                <div>
                                    <div className="font-bold text-slate-700 group-hover:text-blue-700">{drug.name}</div>
                                    <div className="text-xs text-slate-400">{drug.class}</div>
                                </div>
                                <Plus size={16} className="text-slate-300 group-hover:text-blue-500" />
                            </button>
                        ))}
                    </div>
                </div>

                <div className="space-y-2 mt-4">
                    <label className="text-xs font-bold text-slate-400 uppercase">Active Medications</label>
                    {activeDrugs.length === 0 && <div className="text-sm text-slate-400 italic">No medications added.</div>}
                    <div className="space-y-2">
                        {activeDrugs.map(id => {
                            const drug = DRUG_DATABASE.find(d => d.id === id);
                            if (!drug) return null;
                            return (
                                <div key={id} className="flex items-center justify-between p-3 bg-white rounded-xl border border-slate-200 shadow-sm">
                                    <div>
                                        <div className="font-bold text-slate-900">{drug.name}</div>
                                        <div className="text-xs text-slate-500">{drug.class}</div>
                                    </div>
                                    <button onClick={() => onRemove(id)} className="text-slate-400 hover:text-red-500 transition-colors">
                                        <X size={18} />
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};
