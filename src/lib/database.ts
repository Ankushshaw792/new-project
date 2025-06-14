import { supabase } from './supabase';
import type { Database } from '@/types/supabase';

// Type definitions for our tables
export type Salon = Database['public']['Tables']['salons']['Row'];
export type SalonInsert = Database['public']['Tables']['salons']['Insert'];
export type SalonUpdate = Database['public']['Tables']['salons']['Update'];

export type Service = Database['public']['Tables']['services']['Row'];
export type ServiceInsert = Database['public']['Tables']['services']['Insert'];
export type ServiceUpdate = Database['public']['Tables']['services']['Update'];

export type Booking = Database['public']['Tables']['bookings']['Row'];
export type BookingInsert = Database['public']['Tables']['bookings']['Insert'];
export type BookingUpdate = Database['public']['Tables']['bookings']['Update'];

export type Review = Database['public']['Tables']['reviews']['Row'];
export type ReviewInsert = Database['public']['Tables']['reviews']['Insert'];
export type ReviewUpdate = Database['public']['Tables']['reviews']['Update'];

export type SalonStaff = Database['public']['Tables']['salon_staff']['Row'];
export type SalonStaffInsert = Database['public']['Tables']['salon_staff']['Insert'];
export type SalonStaffUpdate = Database['public']['Tables']['salon_staff']['Update'];

// Database service class
export class DatabaseService {
  // Salon operations
  static async getSalons(filters?: {
    status?: string;
    city?: string;
    search?: string;
  }) {
    let query = supabase
      .from('salons')
      .select(`
        *,
        services(count),
        reviews(count)
      `);

    if (filters?.status) {
      query = query.eq('status', filters.status);
    }

    if (filters?.city) {
      query = query.eq('city', filters.city);
    }

    if (filters?.search) {
      query = query.or(`name.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  static async getSalonById(id: string) {
    const { data, error } = await supabase
      .from('salons')
      .select(`
        *,
        services(*),
        reviews(*),
        salon_staff(
          *,
          users(full_name, avatar_url)
        )
      `)
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }

  static async createSalon(salon: SalonInsert) {
    const { data, error } = await supabase
      .from('salons')
      .insert(salon)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async updateSalon(id: string, updates: SalonUpdate) {
    const { data, error } = await supabase
      .from('salons')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async deleteSalon(id: string) {
    const { error } = await supabase
      .from('salons')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }

  // Service operations
  static async getServices(salonId?: string) {
    let query = supabase
      .from('services')
      .select(`
        *,
        salons(name, status)
      `);

    if (salonId) {
      query = query.eq('salon_id', salonId);
    }

    const { data, error } = await query
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  static async createService(service: ServiceInsert) {
    const { data, error } = await supabase
      .from('services')
      .insert(service)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async updateService(id: string, updates: ServiceUpdate) {
    const { data, error } = await supabase
      .from('services')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async deleteService(id: string) {
    const { error } = await supabase
      .from('services')
      .update({ is_active: false })
      .eq('id', id);

    if (error) throw error;
  }

  // Booking operations
  static async getBookings(filters?: {
    customerId?: string;
    salonId?: string;
    status?: string;
    dateFrom?: string;
    dateTo?: string;
  }) {
    let query = supabase
      .from('bookings')
      .select(`
        *,
        salons(name, address),
        services(name, duration_minutes),
        users(full_name, email, phone)
      `);

    if (filters?.customerId) {
      query = query.eq('customer_id', filters.customerId);
    }

    if (filters?.salonId) {
      query = query.eq('salon_id', filters.salonId);
    }

    if (filters?.status) {
      query = query.eq('status', filters.status);
    }

    if (filters?.dateFrom) {
      query = query.gte('booking_date', filters.dateFrom);
    }

    if (filters?.dateTo) {
      query = query.lte('booking_date', filters.dateTo);
    }

    const { data, error } = await query.order('booking_date', { ascending: false });

    if (error) throw error;
    return data;
  }

  static async createBooking(booking: BookingInsert) {
    const { data, error } = await supabase
      .from('bookings')
      .insert(booking)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async updateBooking(id: string, updates: BookingUpdate) {
    const { data, error } = await supabase
      .from('bookings')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async cancelBooking(id: string) {
    const { data, error } = await supabase
      .from('bookings')
      .update({ status: 'cancelled' })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Review operations
  static async getReviews(filters?: {
    salonId?: string;
    customerId?: string;
  }) {
    let query = supabase
      .from('reviews')
      .select(`
        *,
        users(full_name, avatar_url),
        salons(name),
        bookings(service_id, services(name))
      `);

    if (filters?.salonId) {
      query = query.eq('salon_id', filters.salonId);
    }

    if (filters?.customerId) {
      query = query.eq('customer_id', filters.customerId);
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  static async createReview(review: ReviewInsert) {
    const { data, error } = await supabase
      .from('reviews')
      .insert(review)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async updateReview(id: string, updates: ReviewUpdate) {
    const { data, error } = await supabase
      .from('reviews')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // User operations (admin only)
  static async getAllUsers(filters?: {
    role?: string;
    status?: string;
    search?: string;
  }) {
    let query = supabase
      .from('users')
      .select('*');

    if (filters?.role) {
      query = query.eq('role', filters.role);
    }

    if (filters?.search) {
      query = query.or(`full_name.ilike.%${filters.search}%,email.ilike.%${filters.search}%`);
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  static async updateUserRole(userId: string, role: string) {
    const { data, error } = await supabase
      .from('users')
      .update({ role })
      .eq('id', userId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Analytics operations
  static async getDashboardStats() {
    const [salonsResult, usersResult, bookingsResult] = await Promise.all([
      supabase.from('salons').select('id, status, total_revenue'),
      supabase.from('users').select('id, role, created_at'),
      supabase.from('bookings').select('id, status, total_amount, created_at'),
    ]);

    if (salonsResult.error) throw salonsResult.error;
    if (usersResult.error) throw usersResult.error;
    if (bookingsResult.error) throw bookingsResult.error;

    const salons = salonsResult.data || [];
    const users = usersResult.data || [];
    const bookings = bookingsResult.data || [];

    return {
      totalSalons: salons.length,
      activeSalons: salons.filter(s => s.status === 'active').length,
      totalUsers: users.length,
      totalBookings: bookings.length,
      totalRevenue: bookings.reduce((sum, b) => sum + (b.total_amount || 0), 0),
      confirmedBookings: bookings.filter(b => b.status === 'confirmed').length,
      completedBookings: bookings.filter(b => b.status === 'completed').length,
    };
  }

  // Salon staff operations
  static async getSalonStaff(salonId: string) {
    const { data, error } = await supabase
      .from('salon_staff')
      .select(`
        *,
        users(full_name, email, avatar_url)
      `)
      .eq('salon_id', salonId)
      .eq('is_active', true);

    if (error) throw error;
    return data;
  }

  static async addSalonStaff(staff: SalonStaffInsert) {
    const { data, error } = await supabase
      .from('salon_staff')
      .insert(staff)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async updateSalonStaff(id: string, updates: SalonStaffUpdate) {
    const { data, error } = await supabase
      .from('salon_staff')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async removeSalonStaff(id: string) {
    const { error } = await supabase
      .from('salon_staff')
      .update({ is_active: false })
      .eq('id', id);

    if (error) throw error;
  }
}