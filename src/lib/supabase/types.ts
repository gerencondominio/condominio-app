export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Database {
    public: {
        Tables: {
            profiles: {
                Row: {
                    id: string
                    full_name: string | null
                    cpf: string | null
                    lot_number: string | null
                    condominium_id: string | null
                    birth_date: string | null
                    avatar_url: string | null
                    avatar_type: 'upload' | 'gradient' | 'initials' | null
                    avatar_gradient: string | null
                    created_at: string
                }
                Insert: {
                    id: string
                    full_name?: string | null
                    cpf?: string | null
                    lot_number?: string | null
                    condominium_id?: string | null
                    birth_date?: string | null
                    avatar_url?: string | null
                    avatar_type?: 'upload' | 'gradient' | 'initials' | null
                    avatar_gradient?: string | null
                    created_at?: string
                }
                Update: {
                    id?: string
                    full_name?: string | null
                    cpf?: string | null
                    lot_number?: string | null
                    condominium_id?: string | null
                    birth_date?: string | null
                    avatar_url?: string | null
                    avatar_type?: 'upload' | 'gradient' | 'initials' | null
                    avatar_gradient?: string | null
                    created_at?: string
                }
            }
            community_posts: {
                Row: {
                    id: string
                    user_id: string
                    content: string
                    type: 'suggestion' | 'maintenance' | 'notice' | 'general' | 'complaint'
                    created_at: string
                    is_admin_post: boolean
                }
                Insert: {
                    id?: string
                    user_id: string
                    content: string
                    type?: 'suggestion' | 'maintenance' | 'notice' | 'general' | 'complaint'
                    created_at?: string
                    is_admin_post?: boolean
                }
                Update: {
                    id?: string
                    user_id?: string
                    content?: string
                    type?: 'suggestion' | 'maintenance' | 'notice' | 'general' | 'complaint'
                    created_at?: string
                    is_admin_post?: boolean
                }
            }
            community_comments: {
                Row: {
                    id: string
                    post_id: string
                    user_id: string
                    content: string
                    created_at: string
                }
                Insert: {
                    id?: string
                    post_id: string
                    user_id: string
                    content: string
                    created_at?: string
                }
                Update: {
                    id?: string
                    post_id?: string
                    user_id?: string
                    content?: string
                    created_at?: string
                }
            }
            community_likes: {
                Row: {
                    id: string
                    post_id: string
                    user_id: string
                    created_at: string
                }
                Insert: {
                    id?: string
                    post_id: string
                    user_id: string
                    created_at?: string
                }
                Update: {
                    id?: string
                    post_id?: string
                    user_id?: string
                    created_at?: string
                }
            }
        }
    }
}