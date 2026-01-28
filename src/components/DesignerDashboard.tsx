import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL || '',
    import.meta.env.VITE_SUPABASE_ANON_KEY || ''
);

export default function DesignerDashboard() {
    const [requests, setRequests] = useState<any[]>([]);

    useEffect(() => {
        fetchRequests();
    }, []);

    const fetchRequests = async () => {
        const { data, error } = await supabase
            .from('custom_requests')
            .select('*')
            .eq('status', 'pending');

        if (error) console.error('Error fetching requests:', error);
        else setRequests(data || []);
    };

    const acceptRequest = async (requestId: string) => {
        const { data: { user } } = await supabase.auth.getUser();

        const { error } = await supabase
            .from('custom_requests')
            .update({
                designer_id: user?.id,
                status: 'accepted'
            })
            .eq('id', requestId);

        if (!error) {
            alert('Request accepted! You can now start the chat.');
            fetchRequests(); // Refresh list
        } else {
            console.error("Error accepting request:", error);
            alert("Error accepting request");
        }
    };

    return (
        <section className="py-24 bg-gray-50 min-h-screen">
            <div className="max-w-4xl mx-auto px-4">
                <h2 className="text-3xl font-bold mb-8">Designer Dashboard</h2>
                <div className="bg-white rounded-xl shadow p-6">
                    <h3 className="text-xl font-semibold mb-4">Pending Requests</h3>
                    {requests.length === 0 ? (
                        <p className="text-gray-500">No pending requests.</p>
                    ) : (
                        <div className="space-y-4">
                            {requests.map((req) => (
                                <div key={req.id} className="border p-4 rounded-lg flex justify-between items-center">
                                    <div>
                                        <p className="font-medium">Request ID: {req.id}</p>
                                        <p className="text-sm text-gray-600">{req.description || 'No description'}</p>
                                        <p className="text-xs text-gray-400">Created: {new Date(req.created_at).toLocaleDateString()}</p>
                                    </div>
                                    <button
                                        onClick={() => acceptRequest(req.id)}
                                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                                    >
                                        Accept
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
