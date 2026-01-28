import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const isSupabaseConfigured = supabaseUrl && supabaseAnonKey;

export const supabase = isSupabaseConfigured
    ? createClient(supabaseUrl, supabaseAnonKey)
    : createMockClient();

function createMockClient() {
    console.warn("Supabase is not configured. using Mock Client.");

    return {
        auth: {
            signUp: async ({ email, password, options }: any) => {
                console.log("Mock SignUp:", { email, password, options });
                return {
                    data: {
                        user: { id: 'mock-user-id', email },
                        session: null // Simulating email confirmation required
                    },
                    error: null
                };
            },
            signInWithPassword: async ({ email, password }: any) => {
                console.log("Mock Login:", { email, password });
                if (email === 'error@test.com') {
                    return { data: { user: null, session: null }, error: { message: "Mock Login Error" } };
                }
                return {
                    data: {
                        user: { id: 'mock-user-id', email },
                        session: { access_token: 'mock-token' }
                    },
                    error: null
                };
            },
            onAuthStateChange: () => {
                return { data: { subscription: { unsubscribe: () => { } } } };
            },
            getSession: async () => {
                return { data: { session: null } };
            }
        },
        from: (table: string) => ({
            insert: async (data: any) => {
                console.log(`Mock Insert into ${table}:`, data);
                return { data: null, error: null };
            },
            select: () => ({
                eq: () => ({
                    single: async () => ({ data: null, error: null })
                })
            })
        })
    } as any;
}
