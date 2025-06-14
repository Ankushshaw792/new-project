/*
  # Complete RBAC System Setup

  1. Schema Updates
    - Add role column to users table
    - Create salon management tables
    - Set up proper relationships

  2. Security
    - Enable RLS on all tables
    - Create role-based access policies
    - Ensure data isolation

  3. Performance
    - Add necessary indexes
    - Optimize role-based queries
*/

-- Step 1: Add role column to users table if it doesn't exist
DO $$
BEGIN
  -- Check if role column exists, if not add it
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'users' 
    AND column_name = 'role'
  ) THEN
    ALTER TABLE public.users ADD COLUMN role text DEFAULT 'user';
    
    -- Add constraint after column is created
    ALTER TABLE public.users ADD CONSTRAINT users_role_check 
      CHECK (role IN ('user', 'salon_owner', 'admin'));
  END IF;
END $$;

-- Step 2: Create salons table
CREATE TABLE IF NOT EXISTS public.salons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  owner_id uuid REFERENCES public.users(id) ON DELETE CASCADE,
  email text NOT NULL,
  phone text NOT NULL,
  address text NOT NULL,
  city text NOT NULL,
  country text DEFAULT 'UAE',
  latitude decimal(10, 8),
  longitude decimal(11, 8),
  opening_hours jsonb DEFAULT '{}',
  images text[] DEFAULT '{}',
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'suspended', 'closed')),
  rating decimal(3, 2) DEFAULT 0.0,
  total_reviews integer DEFAULT 0,
  total_bookings integer DEFAULT 0,
  total_revenue decimal(10, 2) DEFAULT 0.0,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- Step 3: Create services table
CREATE TABLE IF NOT EXISTS public.services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  salon_id uuid REFERENCES public.salons(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text,
  duration_minutes integer NOT NULL,
  price decimal(8, 2) NOT NULL,
  category text NOT NULL,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- Step 4: Create bookings table
CREATE TABLE IF NOT EXISTS public.bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id uuid REFERENCES public.users(id) ON DELETE CASCADE,
  salon_id uuid REFERENCES public.salons(id) ON DELETE CASCADE,
  service_id uuid REFERENCES public.services(id) ON DELETE CASCADE,
  booking_date date NOT NULL,
  booking_time time NOT NULL,
  duration_minutes integer NOT NULL,
  total_amount decimal(8, 2) NOT NULL,
  status text DEFAULT 'confirmed' CHECK (status IN ('confirmed', 'completed', 'cancelled', 'no_show')),
  customer_name text NOT NULL,
  customer_phone text NOT NULL,
  customer_email text NOT NULL,
  notes text,
  payment_status text DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'refunded')),
  payment_method text,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- Step 5: Create reviews table
CREATE TABLE IF NOT EXISTS public.reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id uuid REFERENCES public.bookings(id) ON DELETE CASCADE,
  customer_id uuid REFERENCES public.users(id) ON DELETE CASCADE,
  salon_id uuid REFERENCES public.salons(id) ON DELETE CASCADE,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment text,
  is_verified boolean DEFAULT false,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- Step 6: Create salon_staff table
CREATE TABLE IF NOT EXISTS public.salon_staff (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  salon_id uuid REFERENCES public.salons(id) ON DELETE CASCADE,
  user_id uuid REFERENCES public.users(id) ON DELETE CASCADE,
  role text DEFAULT 'staff' CHECK (role IN ('manager', 'staff', 'stylist')),
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL,
  UNIQUE(salon_id, user_id)
);

-- Step 7: Enable RLS on all tables
ALTER TABLE public.salons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.salon_staff ENABLE ROW LEVEL SECURITY;

-- Step 8: Create policies (only after ensuring role column exists)
DO $$
BEGIN
  -- Verify role column exists before creating policies
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'users' 
    AND column_name = 'role'
  ) THEN
    
    -- Drop existing policies if they exist
    DROP POLICY IF EXISTS "Anyone can read active salons" ON public.salons;
    DROP POLICY IF EXISTS "Salon owners can manage their salons" ON public.salons;
    DROP POLICY IF EXISTS "Admins can manage all salons" ON public.salons;
    
    -- Salons policies
    CREATE POLICY "Anyone can read active salons" ON public.salons
      FOR SELECT USING (status = 'active');

    CREATE POLICY "Salon owners can manage their salons" ON public.salons
      FOR ALL USING (owner_id = auth.uid());

    CREATE POLICY "Admins can manage all salons" ON public.salons
      FOR ALL USING (
        EXISTS (
          SELECT 1 FROM public.users 
          WHERE id = auth.uid() AND role = 'admin'
        )
      );

    -- Services policies
    DROP POLICY IF EXISTS "Anyone can read active services" ON public.services;
    DROP POLICY IF EXISTS "Salon owners can manage their services" ON public.services;
    DROP POLICY IF EXISTS "Admins can manage all services" ON public.services;

    CREATE POLICY "Anyone can read active services" ON public.services
      FOR SELECT USING (
        is_active = true AND 
        EXISTS (
          SELECT 1 FROM public.salons 
          WHERE id = salon_id AND status = 'active'
        )
      );

    CREATE POLICY "Salon owners can manage their services" ON public.services
      FOR ALL USING (
        EXISTS (
          SELECT 1 FROM public.salons 
          WHERE id = salon_id AND owner_id = auth.uid()
        )
      );

    CREATE POLICY "Admins can manage all services" ON public.services
      FOR ALL USING (
        EXISTS (
          SELECT 1 FROM public.users 
          WHERE id = auth.uid() AND role = 'admin'
        )
      );

    -- Bookings policies
    DROP POLICY IF EXISTS "Users can read their own bookings" ON public.bookings;
    DROP POLICY IF EXISTS "Users can create bookings" ON public.bookings;
    DROP POLICY IF EXISTS "Users can update their own bookings" ON public.bookings;
    DROP POLICY IF EXISTS "Salon owners can read their salon bookings" ON public.bookings;
    DROP POLICY IF EXISTS "Salon owners can update their salon bookings" ON public.bookings;
    DROP POLICY IF EXISTS "Admins can manage all bookings" ON public.bookings;

    CREATE POLICY "Users can read their own bookings" ON public.bookings
      FOR SELECT USING (customer_id = auth.uid());

    CREATE POLICY "Users can create bookings" ON public.bookings
      FOR INSERT WITH CHECK (customer_id = auth.uid());

    CREATE POLICY "Users can update their own bookings" ON public.bookings
      FOR UPDATE USING (customer_id = auth.uid());

    CREATE POLICY "Salon owners can read their salon bookings" ON public.bookings
      FOR SELECT USING (
        EXISTS (
          SELECT 1 FROM public.salons 
          WHERE id = salon_id AND owner_id = auth.uid()
        )
      );

    CREATE POLICY "Salon owners can update their salon bookings" ON public.bookings
      FOR UPDATE USING (
        EXISTS (
          SELECT 1 FROM public.salons 
          WHERE id = salon_id AND owner_id = auth.uid()
        )
      );

    CREATE POLICY "Admins can manage all bookings" ON public.bookings
      FOR ALL USING (
        EXISTS (
          SELECT 1 FROM public.users 
          WHERE id = auth.uid() AND role = 'admin'
        )
      );

    -- Reviews policies
    DROP POLICY IF EXISTS "Anyone can read reviews" ON public.reviews;
    DROP POLICY IF EXISTS "Users can create reviews for their bookings" ON public.reviews;
    DROP POLICY IF EXISTS "Users can update their own reviews" ON public.reviews;
    DROP POLICY IF EXISTS "Admins can manage all reviews" ON public.reviews;

    CREATE POLICY "Anyone can read reviews" ON public.reviews
      FOR SELECT USING (true);

    CREATE POLICY "Users can create reviews for their bookings" ON public.reviews
      FOR INSERT WITH CHECK (
        customer_id = auth.uid() AND
        EXISTS (
          SELECT 1 FROM public.bookings 
          WHERE id = booking_id AND customer_id = auth.uid() AND status = 'completed'
        )
      );

    CREATE POLICY "Users can update their own reviews" ON public.reviews
      FOR UPDATE USING (customer_id = auth.uid());

    CREATE POLICY "Admins can manage all reviews" ON public.reviews
      FOR ALL USING (
        EXISTS (
          SELECT 1 FROM public.users 
          WHERE id = auth.uid() AND role = 'admin'
        )
      );

    -- Salon staff policies
    DROP POLICY IF EXISTS "Salon owners can manage their staff" ON public.salon_staff;
    DROP POLICY IF EXISTS "Staff can read their own records" ON public.salon_staff;
    DROP POLICY IF EXISTS "Admins can manage all staff" ON public.salon_staff;

    CREATE POLICY "Salon owners can manage their staff" ON public.salon_staff
      FOR ALL USING (
        EXISTS (
          SELECT 1 FROM public.salons 
          WHERE id = salon_id AND owner_id = auth.uid()
        )
      );

    CREATE POLICY "Staff can read their own records" ON public.salon_staff
      FOR SELECT USING (user_id = auth.uid());

    CREATE POLICY "Admins can manage all staff" ON public.salon_staff
      FOR ALL USING (
        EXISTS (
          SELECT 1 FROM public.users 
          WHERE id = auth.uid() AND role = 'admin'
        )
      );

  END IF;
END $$;

-- Step 9: Create updated_at triggers for all tables
DO $$
BEGIN
  -- Check if update_updated_at_column function exists
  IF EXISTS (
    SELECT 1 FROM information_schema.routines 
    WHERE routine_name = 'update_updated_at_column'
  ) THEN
    
    -- Create triggers only if they don't exist
    IF NOT EXISTS (
      SELECT 1 FROM information_schema.triggers 
      WHERE trigger_name = 'update_salons_updated_at'
    ) THEN
      CREATE TRIGGER update_salons_updated_at
        BEFORE UPDATE ON public.salons
        FOR EACH ROW
        EXECUTE FUNCTION public.update_updated_at_column();
    END IF;

    IF NOT EXISTS (
      SELECT 1 FROM information_schema.triggers 
      WHERE trigger_name = 'update_services_updated_at'
    ) THEN
      CREATE TRIGGER update_services_updated_at
        BEFORE UPDATE ON public.services
        FOR EACH ROW
        EXECUTE FUNCTION public.update_updated_at_column();
    END IF;

    IF NOT EXISTS (
      SELECT 1 FROM information_schema.triggers 
      WHERE trigger_name = 'update_bookings_updated_at'
    ) THEN
      CREATE TRIGGER update_bookings_updated_at
        BEFORE UPDATE ON public.bookings
        FOR EACH ROW
        EXECUTE FUNCTION public.update_updated_at_column();
    END IF;

    IF NOT EXISTS (
      SELECT 1 FROM information_schema.triggers 
      WHERE trigger_name = 'update_reviews_updated_at'
    ) THEN
      CREATE TRIGGER update_reviews_updated_at
        BEFORE UPDATE ON public.reviews
        FOR EACH ROW
        EXECUTE FUNCTION public.update_updated_at_column();
    END IF;

    IF NOT EXISTS (
      SELECT 1 FROM information_schema.triggers 
      WHERE trigger_name = 'update_salon_staff_updated_at'
    ) THEN
      CREATE TRIGGER update_salon_staff_updated_at
        BEFORE UPDATE ON public.salon_staff
        FOR EACH ROW
        EXECUTE FUNCTION public.update_updated_at_column();
    END IF;

  END IF;
END $$;

-- Step 10: Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_role ON public.users(role);
CREATE INDEX IF NOT EXISTS idx_salons_status ON public.salons(status);
CREATE INDEX IF NOT EXISTS idx_salons_owner ON public.salons(owner_id);
CREATE INDEX IF NOT EXISTS idx_services_salon ON public.services(salon_id);
CREATE INDEX IF NOT EXISTS idx_services_active ON public.services(is_active);
CREATE INDEX IF NOT EXISTS idx_bookings_customer ON public.bookings(customer_id);
CREATE INDEX IF NOT EXISTS idx_bookings_salon ON public.bookings(salon_id);
CREATE INDEX IF NOT EXISTS idx_bookings_date ON public.bookings(booking_date);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON public.bookings(status);
CREATE INDEX IF NOT EXISTS idx_reviews_salon ON public.reviews(salon_id);
CREATE INDEX IF NOT EXISTS idx_reviews_customer ON public.reviews(customer_id);
CREATE INDEX IF NOT EXISTS idx_salon_staff_salon ON public.salon_staff(salon_id);
CREATE INDEX IF NOT EXISTS idx_salon_staff_user ON public.salon_staff(user_id);