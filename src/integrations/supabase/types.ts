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
      blogs: {
        Row: {
          id: string
          title: string
          content: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          content: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          content?: string
          created_at?: string
          updated_at?: string
        }
      }
      brands: {
        Row: {
          id: string
          name: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          created_at?: string
          updated_at?: string
        }
      }
      laptops: {
        Row: {
          id: string
          brand_id: string
          model: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          brand_id: string
          model: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          brand_id?: string
          model?: string
          created_at?: string
          updated_at?: string
        }
      }
      mobile_products: {
        Row: {
          id: string
          brand_id: string
          model: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          brand_id: string
          model: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          brand_id?: string
          model?: string
          created_at?: string
          updated_at?: string
        }
      }
      ratings: {
        Row: {
          id: string
          product_id: string
          rating: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          product_id: string
          rating: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          product_id?: string
          rating?: number
          created_at?: string
          updated_at?: string
        }
      }
      secrets: {
        Row: {
          id: string
          name: string
          value: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          value: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          value?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
