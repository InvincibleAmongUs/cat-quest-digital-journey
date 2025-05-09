export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      badges: {
        Row: {
          category: string
          description: string
          id: string
          image_url: string | null
          name: string
        }
        Insert: {
          category?: string
          description: string
          id: string
          image_url?: string | null
          name: string
        }
        Update: {
          category?: string
          description?: string
          id?: string
          image_url?: string | null
          name?: string
        }
        Relationships: []
      }
      content_blocks: {
        Row: {
          content: Json
          id: number
          lesson_id: number
          order_index: number
          type: string
        }
        Insert: {
          content: Json
          id?: number
          lesson_id: number
          order_index: number
          type: string
        }
        Update: {
          content?: Json
          id?: number
          lesson_id?: number
          order_index?: number
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "content_blocks_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
        ]
      }
      games: {
        Row: {
          color: string | null
          content: Json
          description: string
          icon: string | null
          id: string
          title: string
        }
        Insert: {
          color?: string | null
          content: Json
          description: string
          icon?: string | null
          id: string
          title: string
        }
        Update: {
          color?: string | null
          content?: Json
          description?: string
          icon?: string | null
          id?: string
          title?: string
        }
        Relationships: []
      }
      lessons: {
        Row: {
          description: string
          duration: string | null
          id: number
          is_challenge: boolean
          module_id: number
          order_index: number
          title: string
        }
        Insert: {
          description: string
          duration?: string | null
          id?: number
          is_challenge?: boolean
          module_id: number
          order_index: number
          title: string
        }
        Update: {
          description?: string
          duration?: string | null
          id?: number
          is_challenge?: boolean
          module_id?: number
          order_index?: number
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "lessons_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "modules"
            referencedColumns: ["id"]
          },
        ]
      }
      modules: {
        Row: {
          description: string
          id: number
          image_url: string | null
          is_locked: boolean
          long_description: string | null
          order_index: number
          term: number
          title: string
        }
        Insert: {
          description: string
          id?: number
          image_url?: string | null
          is_locked?: boolean
          long_description?: string | null
          order_index: number
          term: number
          title: string
        }
        Update: {
          description?: string
          id?: number
          image_url?: string | null
          is_locked?: boolean
          long_description?: string | null
          order_index?: number
          term?: number
          title?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          email: string
          id: string
          points: number
          role: string | null
          username: string
        }
        Insert: {
          email: string
          id: string
          points?: number
          role?: string | null
          username: string
        }
        Update: {
          email?: string
          id?: string
          points?: number
          role?: string | null
          username?: string
        }
        Relationships: []
      }
      quiz_questions: {
        Row: {
          correct_answer: number
          id: number
          lesson_id: number
          options: string[]
          order_index: number
          question: string
        }
        Insert: {
          correct_answer: number
          id?: number
          lesson_id: number
          options: string[]
          order_index: number
          question: string
        }
        Update: {
          correct_answer?: number
          id?: number
          lesson_id?: number
          options?: string[]
          order_index?: number
          question?: string
        }
        Relationships: [
          {
            foreignKeyName: "quiz_questions_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
        ]
      }
      terms: {
        Row: {
          description: string
          icon: string | null
          id: number
          image_url: string | null
          order_index: number
          summary: string | null
          title: string
        }
        Insert: {
          description: string
          icon?: string | null
          id?: number
          image_url?: string | null
          order_index: number
          summary?: string | null
          title: string
        }
        Update: {
          description?: string
          icon?: string | null
          id?: number
          image_url?: string | null
          order_index?: number
          summary?: string | null
          title?: string
        }
        Relationships: []
      }
      user_progress: {
        Row: {
          badges: string[]
          completed_lessons: number[]
          completed_modules: number[]
          created_at: string
          id: string
          quiz_scores: Json
          updated_at: string
          user_id: string
        }
        Insert: {
          badges?: string[]
          completed_lessons?: number[]
          completed_modules?: number[]
          created_at?: string
          id?: string
          quiz_scores?: Json
          updated_at?: string
          user_id: string
        }
        Update: {
          badges?: string[]
          completed_lessons?: number[]
          completed_modules?: number[]
          created_at?: string
          id?: string
          quiz_scores?: Json
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_progress_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
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

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
