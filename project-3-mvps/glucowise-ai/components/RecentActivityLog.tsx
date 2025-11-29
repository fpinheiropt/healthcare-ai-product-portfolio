import React from 'react';
import { CheckCircle, Clock, Activity, FileText, Calendar } from 'lucide-react';

interface ActivityItem {
    id: string;
    type: 'check-in' | 'medication' | 'alert' | 'note';
    title: string;
    description: string;
    timestamp: string;
    status: 'completed' | 'pending' | 'alert';
}

const MOCK_ACTIVITY: ActivityItem[] = [
    {
        id: '1',
        type: 'check-in',
        title: 'Daily Health Check',
        description: 'Weight: 152 lbs, BP: 120/80',
        timestamp: 'Today, 9:00 AM',
        status: 'completed'
    },
    {
        id: '2',
        type: 'medication',
        title: 'Morning Meds Taken',
        description: 'Lisinopril (10mg)',
        timestamp: 'Today, 8:30 AM',
        status: 'completed'
    },
    {
        id: '3',
        type: 'alert',
        title: 'Elevated Heart Rate',
        description: 'Resting HR > 100bpm detected',
        timestamp: 'Yesterday, 2:15 PM',
        status: 'alert'
    },
    {
        id: '4',
        type: 'note',
        title: 'Dr. Smith Appointment',
        description: 'Scheduled for follow-up',
        timestamp: 'Yesterday, 10:00 AM',
        status: 'pending'
    }
];

const RecentActivityLog: React.FC = () => {
    const getIcon = (type: string) => {
        switch (type) {
            case 'check-in': return <Activity size={18} />;
            case 'medication': return <CheckCircle size={18} />;
            case 'alert': return <Activity size={18} />;
            case 'note': return <FileText size={18} />;
            default: return <Activity size={18} />;
        }
    };

    const getColor = (type: string, status: string) => {
        if (status === 'alert') return 'bg-red-100 text-red-600';
        switch (type) {
            case 'check-in': return 'bg-teal-100 text-teal-600';
            case 'medication': return 'bg-blue-100 text-blue-600';
            case 'note': return 'bg-purple-100 text-purple-600';
            default: return 'bg-slate-100 text-slate-600';
        }
    };

    return (
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex justify-between items-center">
                <h3 className="font-bold text-slate-800">Recent Activity</h3>
                <button className="text-teal-600 text-xs font-bold uppercase tracking-wider hover:text-teal-700">View All</button>
            </div>
            <div className="divide-y divide-slate-50">
                {MOCK_ACTIVITY.map((item) => (
                    <div key={item.id} className="p-4 hover:bg-slate-50 transition-colors flex gap-4 items-start">
                        <div className={`p-2.5 rounded-xl shrink-0 ${getColor(item.type, item.status)}`}>
                            {getIcon(item.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start">
                                <h4 className="font-semibold text-slate-900 text-sm truncate">{item.title}</h4>
                                <span className="text-[10px] text-slate-400 whitespace-nowrap flex items-center gap-1">
                                    <Clock size={10} />
                                    {item.timestamp}
                                </span>
                            </div>
                            <p className="text-xs text-slate-500 mt-0.5 truncate">{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecentActivityLog;
