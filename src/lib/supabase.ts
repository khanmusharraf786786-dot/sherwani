import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const isSupabaseConfigured = supabaseUrl && supabaseAnonKey;

export const supabase = isSupabaseConfigured
    ? createClient(supabaseUrl, supabaseAnonKey, {
        auth: {
            autoRefreshToken: true,
            persistSession: true,
            detectSessionInUrl: true,
            flowType: 'pkce',
        },
    })
    : createMockClient();

function createMockClient() {
    console.warn("Supabase is not configured. Using Mock Client.");

    // Mock user storage
    let mockUsers: any[] = [];
    let mockProfiles: any[] = [];
    let currentMockUser: any = null;

    return {
        auth: {
            signUp: async ({ email, password, options }: any) => {
                console.log("Mock SignUp:", { email, options });
                const userId = 'mock-user-' + Date.now();
                const user = { id: userId, email, email_confirmed_at: null };
                mockUsers.push({ email, password, user });

                // Create profile
                const profile = {
                    id: userId,
                    user_id: userId,
                    full_name: options?.data?.full_name || null,
                    username: options?.data?.username || null,
                    avatar_url: null,
                    phone_number: null,
                    date_of_birth: null,
                    bio: null,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString(),
                };
                mockProfiles.push(profile);

                return {
                    data: { user, session: null },
                    error: null
                };
            },
            signInWithPassword: async ({ email, password }: any) => {
                console.log("Mock Login:", { email });
                const mockUser = mockUsers.find(u => u.email === email && u.password === password);

                if (!mockUser) {
                    return {
                        data: { user: null, session: null },
                        error: { message: "Invalid login credentials" }
                    };
                }

                currentMockUser = mockUser.user;
                return {
                    data: {
                        user: mockUser.user,
                        session: { access_token: 'mock-token', user: mockUser.user }
                    },
                    error: null
                };
            },
            signInWithOAuth: async ({ provider }: any) => {
                console.log(`Mock OAuth SignIn with ${provider}`);
                return { data: null, error: { message: "OAuth not available in demo mode" } };
            },
            signOut: async () => {
                console.log("Mock SignOut");
                currentMockUser = null;
                return { error: null };
            },
            getUser: async () => {
                return { data: { user: currentMockUser }, error: null };
            },
            getSession: async () => {
                return {
                    data: {
                        session: currentMockUser ? { access_token: 'mock-token', user: currentMockUser } : null
                    },
                    error: null
                };
            },
            onAuthStateChange: (callback: any) => {
                return { data: { subscription: { unsubscribe: () => { } } } };
            },
            resetPasswordForEmail: async (email: string) => {
                console.log("Mock Password Reset:", email);
                return { data: null, error: null };
            },
            updateUser: async (updates: any) => {
                console.log("Mock Update User:", updates);
                return { data: { user: currentMockUser }, error: null };
            }
        },
        from: (table: string) => ({
            insert: async (data: any) => {
                console.log(`Mock Insert into ${table}:`, data);
                if (table === 'profiles' && Array.isArray(data)) {
                    mockProfiles.push(...data);
                }
                return { data: null, error: null };
            },
            select: (columns: string = '*') => ({
                eq: (column: string, value: any) => ({
                    single: async () => {
                        console.log(`Mock Select from ${table} where ${column} = ${value}`);
                        if (table === 'profiles') {
                            const profile = mockProfiles.find(p => p[column] === value);
                            return { data: profile || null, error: null };
                        }
                        return { data: null, error: null };
                    }
                })
            }),
            update: (updates: any) => ({
                eq: (column: string, value: any) => ({
                    select: () => ({
                        single: async () => {
                            console.log(`Mock Update ${table} where ${column} = ${value}:`, updates);
                            if (table === 'profiles') {
                                const profile = mockProfiles.find(p => p[column] === value);
                                if (profile) {
                                    Object.assign(profile, updates, { updated_at: new Date().toISOString() });
                                    return { data: profile, error: null };
                                }
                            }
                            return { data: null, error: null };
                        }
                    })
                })
            })
        })
    } as any;
}

// =====================================================
// AUTHENTICATION HELPER FUNCTIONS
// =====================================================

export const signUp = async (email: string, password: string, metadata?: {
    full_name?: string;
    username?: string;
}) => {
    try {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: metadata,
                emailRedirectTo: `${window.location.origin}/auth/callback`,
            },
        });

        if (error) throw error;
        return { data, error: null };
    } catch (error: any) {
        console.error('Sign up error:', error);
        return { data: null, error: error.message };
    }
};

export const signIn = async (email: string, password: string) => {
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) throw error;
        return { data, error: null };
    } catch (error: any) {
        console.error('Sign in error:', error);
        return { data: null, error: error.message };
    }
};

export const signOut = async () => {
    try {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
        return { error: null };
    } catch (error: any) {
        console.error('Sign out error:', error);
        return { error: error.message };
    }
};

export const getCurrentUser = async () => {
    try {
        const { data: { user }, error } = await supabase.auth.getUser();
        if (error) throw error;
        return { user, error: null };
    } catch (error: any) {
        console.error('Get user error:', error);
        return { user: null, error: error.message };
    }
};

export const signInWithGoogle = async () => {
    try {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${window.location.origin}/auth/callback`,
            },
        });

        if (error) throw error;
        return { data, error: null };
    } catch (error: any) {
        console.error('Google sign in error:', error);
        return { data: null, error: error.message };
    }
};

export const signInWithGithub = async () => {
    try {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'github',
            options: {
                redirectTo: `${window.location.origin}/auth/callback`,
            },
        });

        if (error) throw error;
        return { data, error: null };
    } catch (error: any) {
        console.error('GitHub sign in error:', error);
        return { data: null, error: error.message };
    }
};

export const resetPassword = async (email: string) => {
    try {
        const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/auth/reset-password`,
        });

        if (error) throw error;
        return { data, error: null };
    } catch (error: any) {
        console.error('Password reset error:', error);
        return { data: null, error: error.message };
    }
};

export const updatePassword = async (newPassword: string) => {
    try {
        const { data, error } = await supabase.auth.updateUser({
            password: newPassword,
        });

        if (error) throw error;
        return { data, error: null };
    } catch (error: any) {
        console.error('Update password error:', error);
        return { data: null, error: error.message };
    }
};

export const getUserProfile = async (userId: string) => {
    try {
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('user_id', userId)
            .single();

        if (error) throw error;
        return { data, error: null };
    } catch (error: any) {
        console.error('Get profile error:', error);
        return { data: null, error: error.message };
    }
};

export const updateUserProfile = async (userId: string, updates: {
    full_name?: string;
    username?: string;
    avatar_url?: string;
    phone_number?: string;
    date_of_birth?: string;
    bio?: string;
}) => {
    try {
        const { data, error } = await supabase
            .from('profiles')
            .update(updates)
            .eq('user_id', userId)
            .select()
            .single();

        if (error) throw error;
        return { data, error: null };
    } catch (error: any) {
        console.error('Update profile error:', error);
        return { data: null, error: error.message };
    }
};

export const onAuthStateChange = (callback: (event: string, session: any) => void) => {
    return supabase.auth.onAuthStateChange(callback);
};

// =====================================================
// TYPE DEFINITIONS
// =====================================================

export interface UserProfile {
    id: string;
    user_id: string;
    full_name: string | null;
    username: string | null;
    avatar_url: string | null;
    phone_number: string | null;
    date_of_birth: string | null;
    bio: string | null;
    created_at: string;
    updated_at: string;
}

export interface AuthError {
    message: string;
    status?: number;
}
