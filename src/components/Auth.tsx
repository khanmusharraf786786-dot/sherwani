import { useState } from 'react';
import { supabase } from '../lib/supabase';

export default function Auth() {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState<'user' | 'designer'>('user');

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: { role: role },
                emailRedirectTo: window.location.origin
            }
        });

        if (error) {
            alert(error.message);
        } else if (data.user && data.session === null) {
            alert('Please check your email to confirm your account before logging in.');
        } else if (data.user) {
            const { error: profileError } = await supabase.from('profiles').insert([{ id: data.user.id, role }]);

            if (profileError) {
                console.error("Error creating profile:", profileError);
                alert("Error creating profile: " + profileError.message);
            } else {
                alert('Signup successful!');
            }
        }
        setLoading(false);
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) alert(error.message);
        setLoading(false);
    };

    return (
        <div className="max-w-md mx-auto p-8 bg-white shadow-xl rounded-2xl my-20">
            <h2 className="text-2xl font-bold mb-6 text-center">Join Artisan Embroidery</h2>
            <div className="flex gap-4 mb-6">
                <button
                    onClick={() => setRole('user')}
                    className={`flex-1 py-2 rounded-lg ${role === 'user' ? 'bg-amber-600 text-white' : 'bg-gray-100'}`}
                >Customer</button>
                <button
                    onClick={() => setRole('designer')}
                    className={`flex-1 py-2 rounded-lg ${role === 'designer' ? 'bg-amber-600 text-white' : 'bg-gray-100'}`}
                >Designer</button>
            </div>
            <form className="space-y-4">
                <input type="email" placeholder="Email" className="w-full p-3 border rounded-lg" onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" className="w-full p-3 border rounded-lg" onChange={(e) => setPassword(e.target.value)} />
                <div className="flex gap-2">
                    <button onClick={handleLogin} disabled={loading} className="flex-1 bg-gray-800 text-white py-3 rounded-lg hover:bg-black">Login</button>
                    <button onClick={handleSignUp} disabled={loading} className="flex-1 bg-amber-600 text-white py-3 rounded-lg hover:bg-amber-700">Sign Up</button>
                </div>
            </form>
        </div>
    );
}
