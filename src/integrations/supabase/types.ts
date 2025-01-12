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
      blogs: {
        Row: {
          author: string
          average_rating: number | null
          category: string
          content: string
          created_at: string
          featured: boolean | null
          featured_in_category: boolean | null
          id: string
          image_url: string | null
          meta_description: string | null
          meta_keywords: string | null
          meta_title: string | null
          popular: boolean | null
          popular_in_entertainment: boolean | null
          popular_in_gadgets: boolean | null
          popular_in_games: boolean | null
          popular_in_stocks: boolean | null
          popular_in_tech: boolean | null
          share_count: number | null
          slug: string
          subcategory: string | null
          title: string
          updated_at: string
          view_count: number | null
        }
        Insert: {
          author: string
          average_rating?: number | null
          category: string
          content: string
          created_at?: string
          featured?: boolean | null
          featured_in_category?: boolean | null
          id?: string
          image_url?: string | null
          meta_description?: string | null
          meta_keywords?: string | null
          meta_title?: string | null
          popular?: boolean | null
          popular_in_entertainment?: boolean | null
          popular_in_gadgets?: boolean | null
          popular_in_games?: boolean | null
          popular_in_stocks?: boolean | null
          popular_in_tech?: boolean | null
          share_count?: number | null
          slug: string
          subcategory?: string | null
          title: string
          updated_at?: string
          view_count?: number | null
        }
        Update: {
          author?: string
          average_rating?: number | null
          category?: string
          content?: string
          created_at?: string
          featured?: boolean | null
          featured_in_category?: boolean | null
          id?: string
          image_url?: string | null
          meta_description?: string | null
          meta_keywords?: string | null
          meta_title?: string | null
          popular?: boolean | null
          popular_in_entertainment?: boolean | null
          popular_in_gadgets?: boolean | null
          popular_in_games?: boolean | null
          popular_in_stocks?: boolean | null
          popular_in_tech?: boolean | null
          share_count?: number | null
          slug?: string
          subcategory?: string | null
          title?: string
          updated_at?: string
          view_count?: number | null
        }
        Relationships: []
      }
      brands: {
        Row: {
          created_at: string
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      comments: {
        Row: {
          blog_id: string
          content: string
          created_at: string
          id: string
          parent_id: string | null
          updated_at: string
          upvotes: number | null
          user_name: string
        }
        Insert: {
          blog_id: string
          content: string
          created_at?: string
          id?: string
          parent_id?: string | null
          updated_at?: string
          upvotes?: number | null
          user_name: string
        }
        Update: {
          blog_id?: string
          content?: string
          created_at?: string
          id?: string
          parent_id?: string | null
          updated_at?: string
          upvotes?: number | null
          user_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "comments_blog_id_fkey"
            columns: ["blog_id"]
            isOneToOne: false
            referencedRelation: "blogs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "comments"
            referencedColumns: ["id"]
          },
        ]
      }
      expert_reviews: {
        Row: {
          author: string
          cons: string[] | null
          created_at: string | null
          date: string | null
          id: string
          product_id: string
          pros: string[] | null
          rating: number
          summary: string
          updated_at: string | null
          verdict: string
        }
        Insert: {
          author: string
          cons?: string[] | null
          created_at?: string | null
          date?: string | null
          id?: string
          product_id: string
          pros?: string[] | null
          rating: number
          summary: string
          updated_at?: string | null
          verdict: string
        }
        Update: {
          author?: string
          cons?: string[] | null
          created_at?: string | null
          date?: string | null
          id?: string
          product_id?: string
          pros?: string[] | null
          rating?: number
          summary?: string
          updated_at?: string | null
          verdict?: string
        }
        Relationships: []
      }
      laptops: {
        Row: {
          battery: string
          brand: string
          color: string | null
          created_at: string
          display_specs: string
          gallery_images: string[] | null
          graphics: string | null
          id: string
          image_url: string | null
          model_name: string | null
          name: string
          os: string | null
          ports: string | null
          price: number
          processor: string
          ram: string
          storage: string
          updated_at: string
        }
        Insert: {
          battery: string
          brand: string
          color?: string | null
          created_at?: string
          display_specs: string
          gallery_images?: string[] | null
          graphics?: string | null
          id?: string
          image_url?: string | null
          model_name?: string | null
          name: string
          os?: string | null
          ports?: string | null
          price: number
          processor: string
          ram: string
          storage: string
          updated_at?: string
        }
        Update: {
          battery?: string
          brand?: string
          color?: string | null
          created_at?: string
          display_specs?: string
          gallery_images?: string[] | null
          graphics?: string | null
          id?: string
          image_url?: string | null
          model_name?: string | null
          name?: string
          os?: string | null
          ports?: string | null
          price?: number
          processor?: string
          ram?: string
          storage?: string
          updated_at?: string
        }
        Relationships: []
      }
      mobile_products: {
        Row: {
          architecture: string | null
          aspect_ratio: string | null
          battery: string
          bezel_less: boolean | null
          bluetooth: string | null
          brand: string
          build_details: string | null
          build_material: string | null
          camera: string | null
          camera_autofocus: string | null
          camera_flash: string | null
          camera_modes: string | null
          camera_ois: string | null
          camera_setup: string | null
          charging_specs: string | null
          chipset: string | null
          color: string | null
          cpu: string | null
          created_at: string
          custom_ui: string | null
          dimensions: string | null
          display_features: string | null
          display_specs: string
          display_type: string | null
          fabrication: string | null
          front_camera_setup: string | null
          front_camera_video: string | null
          gallery_images: string[] | null
          hdr_support: string | null
          height: string | null
          id: string
          image_url: string | null
          launch_date: string | null
          main_camera_features: string | null
          model_name: string | null
          name: string
          network_2g_bands: string | null
          network_3g_bands: string | null
          network_4g_bands: string | null
          network_5g_bands: string | null
          network_speed: string | null
          network_technology: string | null
          os: string | null
          peak_brightness: string | null
          pixel_density: string | null
          price: number
          processor: string
          ram: string
          ram_type: string | null
          refresh_rate: string | null
          resolution: string | null
          ruggedness: string | null
          screen_protection: string | null
          screen_size: string | null
          selfie_camera_features: string | null
          software_support: string | null
          status: string | null
          storage: string
          thickness: string | null
          touch_screen: boolean | null
          updated_at: string
          video_recording: string | null
          waterproof: string | null
          weight: string | null
          width: string | null
          wlan: string | null
        }
        Insert: {
          architecture?: string | null
          aspect_ratio?: string | null
          battery: string
          bezel_less?: boolean | null
          bluetooth?: string | null
          brand: string
          build_details?: string | null
          build_material?: string | null
          camera?: string | null
          camera_autofocus?: string | null
          camera_flash?: string | null
          camera_modes?: string | null
          camera_ois?: string | null
          camera_setup?: string | null
          charging_specs?: string | null
          chipset?: string | null
          color?: string | null
          cpu?: string | null
          created_at?: string
          custom_ui?: string | null
          dimensions?: string | null
          display_features?: string | null
          display_specs: string
          display_type?: string | null
          fabrication?: string | null
          front_camera_setup?: string | null
          front_camera_video?: string | null
          gallery_images?: string[] | null
          hdr_support?: string | null
          height?: string | null
          id?: string
          image_url?: string | null
          launch_date?: string | null
          main_camera_features?: string | null
          model_name?: string | null
          name: string
          network_2g_bands?: string | null
          network_3g_bands?: string | null
          network_4g_bands?: string | null
          network_5g_bands?: string | null
          network_speed?: string | null
          network_technology?: string | null
          os?: string | null
          peak_brightness?: string | null
          pixel_density?: string | null
          price: number
          processor: string
          ram: string
          ram_type?: string | null
          refresh_rate?: string | null
          resolution?: string | null
          ruggedness?: string | null
          screen_protection?: string | null
          screen_size?: string | null
          selfie_camera_features?: string | null
          software_support?: string | null
          status?: string | null
          storage: string
          thickness?: string | null
          touch_screen?: boolean | null
          updated_at?: string
          video_recording?: string | null
          waterproof?: string | null
          weight?: string | null
          width?: string | null
          wlan?: string | null
        }
        Update: {
          architecture?: string | null
          aspect_ratio?: string | null
          battery?: string
          bezel_less?: boolean | null
          bluetooth?: string | null
          brand?: string
          build_details?: string | null
          build_material?: string | null
          camera?: string | null
          camera_autofocus?: string | null
          camera_flash?: string | null
          camera_modes?: string | null
          camera_ois?: string | null
          camera_setup?: string | null
          charging_specs?: string | null
          chipset?: string | null
          color?: string | null
          cpu?: string | null
          created_at?: string
          custom_ui?: string | null
          dimensions?: string | null
          display_features?: string | null
          display_specs?: string
          display_type?: string | null
          fabrication?: string | null
          front_camera_setup?: string | null
          front_camera_video?: string | null
          gallery_images?: string[] | null
          hdr_support?: string | null
          height?: string | null
          id?: string
          image_url?: string | null
          launch_date?: string | null
          main_camera_features?: string | null
          model_name?: string | null
          name?: string
          network_2g_bands?: string | null
          network_3g_bands?: string | null
          network_4g_bands?: string | null
          network_5g_bands?: string | null
          network_speed?: string | null
          network_technology?: string | null
          os?: string | null
          peak_brightness?: string | null
          pixel_density?: string | null
          price?: number
          processor?: string
          ram?: string
          ram_type?: string | null
          refresh_rate?: string | null
          resolution?: string | null
          ruggedness?: string | null
          screen_protection?: string | null
          screen_size?: string | null
          selfie_camera_features?: string | null
          software_support?: string | null
          status?: string | null
          storage?: string
          thickness?: string | null
          touch_screen?: boolean | null
          updated_at?: string
          video_recording?: string | null
          waterproof?: string | null
          weight?: string | null
          width?: string | null
          wlan?: string | null
        }
        Relationships: []
      }
      product_ratings: {
        Row: {
          created_at: string
          id: string
          product_id: string
          rating: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          product_id: string
          rating: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          product_id?: string
          rating?: number
          updated_at?: string
        }
        Relationships: []
      }
      product_reviews: {
        Row: {
          created_at: string
          id: string
          product_id: string
          rating: number
          review_text: string | null
          updated_at: string
          user_name: string
        }
        Insert: {
          created_at?: string
          id?: string
          product_id: string
          rating: number
          review_text?: string | null
          updated_at?: string
          user_name: string
        }
        Update: {
          created_at?: string
          id?: string
          product_id?: string
          rating?: number
          review_text?: string | null
          updated_at?: string
          user_name?: string
        }
        Relationships: []
      }
      ratings: {
        Row: {
          blog_id: string
          created_at: string
          id: string
          rating: number
          updated_at: string
        }
        Insert: {
          blog_id: string
          created_at?: string
          id?: string
          rating: number
          updated_at?: string
        }
        Update: {
          blog_id?: string
          created_at?: string
          id?: string
          rating?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "ratings_blog_id_fkey"
            columns: ["blog_id"]
            isOneToOne: false
            referencedRelation: "blogs"
            referencedColumns: ["id"]
          },
        ]
      }
      secrets: {
        Row: {
          created_at: string
          id: string
          name: string
          updated_at: string
          value: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          updated_at?: string
          value: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          updated_at?: string
          value?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      calculate_product_rating: {
        Args: {
          p_id: string
        }
        Returns: {
          average_rating: number
          total_ratings: number
          rating_distribution: number[]
        }[]
      }
      increment_share_count: {
        Args: {
          blog_id: string
        }
        Returns: undefined
      }
      increment_view_count: {
        Args: {
          blog_id: string
        }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
