import { useAuth } from '../context/AuthContext';
import { LogOut, User, Mail, Calendar, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const { user, profile, signOut } = useAuth();
    const navigate = useNavigate();

    const handleSignOut = async () => {
        await signOut();
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100">
            <nav className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                Dashboard
                            </h1>
                        </div>
                        <div className="flex items-center">
                            <button
                                onClick={handleSignOut}
                                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
                            >
                                <LogOut className="w-4 h-4" />
                                Sign Out
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white rounded-2xl shadow-lg p-8 col-span-full">
                        <h2 className="text-3xl font-bold text-gray-800 mb-2">
                            Welcome back, {profile?.full_name || user?.email?.split('@')[0]}! 👋
                        </h2>
                        <p className="text-gray-600">
                            You're successfully logged in to your account.
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 bg-indigo-100 rounded-full">
                                <User className="w-6 h-6 text-indigo-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800">Profile Information</h3>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <User className="w-5 h-5 text-gray-400 mt-1" />
                                <div>
                                    <p className="text-sm text-gray-500">Full Name</p>
                                    <p className="text-gray-800 font-medium">
                                        {profile?.full_name || 'Not set'}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <User className="w-5 h-5 text-gray-400 mt-1" />
                                <div>
                                    <p className="text-sm text-gray-500">Username</p>
                                    <p className="text-gray-800 font-medium">
                                        {profile?.username || 'Not set'}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <Mail className="w-5 h-5 text-gray-400 mt-1" />
                                <div>
                                    <p className="text-sm text-gray-500">Email</p>
                                    <p className="text-gray-800 font-medium">{user?.email}</p>
                                </div>
                            </div>

                            {profile?.phone_number && (
                                <div className="flex items-start gap-3">
                                    <Phone className="w-5 h-5 text-gray-400 mt-1" />
                                    <div>
                                        <p className="text-sm text-gray-500">Phone</p>
                                        <p className="text-gray-800 font-medium">{profile.phone_number}</p>
                                    </div>
                                </div>
                            )}

                            {profile?.date_of_birth && (
                                <div className="flex items-start gap-3">
                                    <Calendar className="w-5 h-5 text-gray-400 mt-1" />
                                    <div>
                                        <p className="text-sm text-gray-500">Date of Birth</p>
                                        <p className="text-gray-800 font-medium">
                                            {new Date(profile.date_of_birth).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 bg-purple-100 rounded-full">
                                <Mail className="w-6 h-6 text-purple-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800">Account Details</h3>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <p className="text-sm text-gray-500">User ID</p>
                                <p className="text-gray-800 font-mono text-sm break-all">{user?.id}</p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-500">Account Created</p>
                                <p className="text-gray-800 font-medium">
                                    {profile?.created_at
                                        ? new Date(profile.created_at).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })
                                        : 'N/A'
                                    }
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-500">Last Updated</p>
                                <p className="text-gray-800 font-medium">
                                    {profile?.updated_at
                                        ? new Date(profile.updated_at).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })
                                        : 'N/A'
                                    }
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-500">Email Verified</p>
                                <p className="text-gray-800 font-medium">
                                    {user?.email_confirmed_at ? (
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                            Verified
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                            Pending
                                        </span>
                                    )}
                                </p>
                            </div>
                        </div>
                    </div>

                    {profile?.bio && (
                        <div className="bg-white rounded-2xl shadow-lg p-8 col-span-full">
                            <h3 className="text-xl font-semibold text-gray-800 mb-4">About Me</h3>
                            <p className="text-gray-600">{profile.bio}</p>
                        </div>
                    )}

                    <div className="bg-white rounded-2xl shadow-lg p-8 col-span-full">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200">
                                Edit Profile
                            </button>
                            <button className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200">
                                Change Password
                            </button>
                            <button className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200">
                                Settings
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
