-- Create colleges table
CREATE TABLE colleges (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT CHECK (type IN ('government', 'private')) NOT NULL,
  location TEXT NOT NULL,
  description TEXT NOT NULL,
  rating DECIMAL(2,1) DEFAULT 0 CHECK (rating >= 0 AND rating <= 5),
  fees INTEGER NOT NULL,
  courses TEXT[] NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create scholarships table
CREATE TABLE scholarships (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  amount INTEGER NOT NULL,
  eligibility TEXT NOT NULL,
  deadline DATE NOT NULL,
  provider TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create users table (extends Supabase auth.users)
CREATE TABLE users (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT NOT NULL,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert sample colleges
INSERT INTO colleges (name, type, location, description, rating, fees, courses) VALUES
('Indian Institute of Technology Delhi', 'government', 'New Delhi', 'Premier engineering institute with world-class facilities', 4.8, 200000, ARRAY['Computer Science', 'Mechanical Engineering', 'Electrical Engineering']),
('Indian Institute of Management Ahmedabad', 'government', 'Ahmedabad', 'Top business school in India', 4.9, 2300000, ARRAY['MBA', 'Executive MBA', 'PhD']),
('Manipal Institute of Technology', 'private', 'Manipal', 'Leading private engineering college', 4.2, 1500000, ARRAY['Computer Science', 'Information Technology', 'Biotechnology']),
('BITS Pilani', 'private', 'Pilani', 'Renowned private technical university', 4.5, 1800000, ARRAY['Computer Science', 'Electronics', 'Mechanical Engineering']),
('Delhi University', 'government', 'New Delhi', 'One of India''s largest universities', 4.3, 50000, ARRAY['Arts', 'Science', 'Commerce']),
('Amity University', 'private', 'Noida', 'Multi-disciplinary private university', 3.8, 800000, ARRAY['Engineering', 'Management', 'Law']);

-- Insert sample scholarships
INSERT INTO scholarships (title, description, amount, eligibility, deadline, provider) VALUES
('Merit Scholarship for Engineering', 'Scholarship for top engineering students', 100000, 'JEE Main rank under 10000', '2024-06-30', 'Government of India'),
('Women in STEM Scholarship', 'Supporting women pursuing STEM education', 75000, 'Female students in Science/Technology', '2024-07-15', 'Tech Foundation'),
('Rural Student Support', 'Financial aid for students from rural areas', 50000, 'Students from rural backgrounds', '2024-08-01', 'Education Ministry'),
('Excellence in Arts Scholarship', 'For outstanding performance in arts', 60000, 'Arts students with 85%+ marks', '2024-05-20', 'Cultural Department');

-- Enable Row Level Security
ALTER TABLE colleges ENABLE ROW LEVEL SECURITY;
ALTER TABLE scholarships ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access on colleges" ON colleges FOR SELECT USING (true);
CREATE POLICY "Allow public read access on scholarships" ON scholarships FOR SELECT USING (true);

-- Create policies for authenticated users
CREATE POLICY "Allow authenticated users to read users" ON users FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Allow users to update their own profile" ON users FOR UPDATE USING (auth.uid() = id);