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
      badges: {
        Row: {
          id: string
          name: string
          description: string
          image_url: string | null
          category: string
        }
        Insert: {
          id: string
          name: string
          description: string
          image_url?: string | null
          category?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string
          image_url?: string | null
          category?: string
        }
        Relationships: []
      }
      content_blocks: {
        Row: {
          id: number
          lesson_id: number
          type: string
          content: Json
          order_index: number
        }
        Insert: {
          id?: number
          lesson_id: number
          type: string
          content: Json
          order_index: number
        }
        Update: {
          id?: number
          lesson_id?: number
          type?: string
          content?: Json
          order_index?: number
        }
        Relationships: [
          {
            foreignKeyName: "content_blocks_lesson_id_fkey"
            columns: ["lesson_id"]
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          }
        ]
      }
      games: {
        Row: {
          id: string
          title: string
          description: string
          icon: string | null
          color: string | null
          content: Json
        }
        Insert: {
          id: string
          title: string
          description: string
          icon?: string | null
          color?: string | null
          content: Json
        }
        Update: {
          id?: string
          title?: string
          description?: string
          icon?: string | null
          color?: string | null
          content?: Json
        }
        Relationships: []
      }
      lessons: {
        Row: {
          id: number
          module_id: number
          title: string
          description: string
          duration: string | null
          order_index: number
          is_challenge: boolean
        }
        Insert: {
          id?: number
          module_id: number
          title: string
          description: string
          duration?: string | null
          order_index: number
          is_challenge?: boolean
        }
        Update: {
          id?: number
          module_id?: number
          title?: string
          description?: string
          duration?: string | null
          order_index?: number
          is_challenge?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "lessons_module_id_fkey"
            columns: ["module_id"]
            referencedRelation: "modules"
            referencedColumns: ["id"]
          }
        ]
      }
      modules: {
        Row: {
          id: number
          title: string
          description: string
          long_description: string | null
          image_url: string | null
          term: number
          order_index: number
          is_locked: boolean
        }
        Insert: {
          id?: number
          title: string
          description: string
          long_description?: string | null
          image_url?: string | null
          term: number
          order_index: number
          is_locked?: boolean
        }
        Update: {
          id?: number
          title?: string
          description?: string
          long_description?: string | null
          image_url?: string | null
          term?: number
          order_index?: number
          is_locked?: boolean
        }
        Relationships: []
      }
      profiles: {
        Row: {
          id: string
          username: string
          email: string
          points: number
          role: string
        }
        Insert: {
          id: string
          username: string
          email: string
          points?: number
          role?: string
        }
        Update: {
          id?: string
          username?: string
          email?: string
          points?: number
          role?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      quiz_questions: {
        Row: {
          id: number
          lesson_id: number
          question: string
          options: string[]
          correct_answer: number
          order_index: number
        }
        Insert: {
          id?: number
          lesson_id: number
          question: string
          options: string[]
          correct_answer: number
          order_index: number
        }
        Update: {
          id?: number
          lesson_id?: number
          question?: string
          options?: string[]
          correct_answer?: number
          order_index?: number
        }
        Relationships: [
          {
            foreignKeyName: "quiz_questions_lesson_id_fkey"
            columns: ["lesson_id"]
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          }
        ]
      }
      terms: {
        Row: {
          id: number
          title: string
          description: string
          summary: string | null
          image_url: string | null
          icon: string | null
          order_index: number
        }
        Insert: {
          id?: number
          title: string
          description: string
          summary?: string | null
          image_url?: string | null
          icon?: string | null
          order_index: number
        }
        Update: {
          id?: number
          title?: string
          description?: string
          summary?: string | null
          image_url?: string | null
          icon?: string | null
          order_index?: number
        }
        Relationships: []
      }
      user_progress: {
        Row: {
          id: string
          user_id: string
          completed_lessons: number[]
          completed_modules: number[]
          quiz_scores: Json
          badges: string[]
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          completed_lessons?: number[]
          completed_modules?: number[]
          quiz_scores?: Json
          badges?: string[]
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          completed_lessons?: number[]
          completed_modules?: number[]
          quiz_scores?: Json
          badges?: string[]
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_progress_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
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
    CompositeTypes: {
      [_ in never]: never
    }
  }
}