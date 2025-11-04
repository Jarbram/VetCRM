-- Create vets table
CREATE TABLE vets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  clinic_name TEXT NOT NULL,
  doctor_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE vets ENABLE ROW LEVEL SECURITY;

-- Policies for vets table
CREATE POLICY "Vets can view their own data"
  ON vets FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Vets can update their own data"
  ON vets FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Vets can insert their own data"
  ON vets FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create owners table
CREATE TABLE owners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vet_id UUID NOT NULL REFERENCES vets(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT NOT NULL,
  address TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE owners ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Vets can view their own owners"
  ON owners FOR SELECT
  USING (
    vet_id IN (
      SELECT id FROM vets WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Vets can insert owners"
  ON owners FOR INSERT
  WITH CHECK (
    vet_id IN (
      SELECT id FROM vets WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Vets can update their owners"
  ON owners FOR UPDATE
  USING (
    vet_id IN (
      SELECT id FROM vets WHERE user_id = auth.uid()
    )
  );

-- Create pets table
CREATE TABLE pets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID NOT NULL REFERENCES owners(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  species TEXT NOT NULL,
  breed TEXT NOT NULL,
  age INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE pets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Vets can view pets of their owners"
  ON pets FOR SELECT
  USING (
    owner_id IN (
      SELECT id FROM owners WHERE vet_id IN (
        SELECT id FROM vets WHERE user_id = auth.uid()
      )
    )
  );

CREATE POLICY "Vets can insert pets"
  ON pets FOR INSERT
  WITH CHECK (
    owner_id IN (
      SELECT id FROM owners WHERE vet_id IN (
        SELECT id FROM vets WHERE user_id = auth.uid()
      )
    )
  );

CREATE POLICY "Vets can update pets"
  ON pets FOR UPDATE
  USING (
    owner_id IN (
      SELECT id FROM owners WHERE vet_id IN (
        SELECT id FROM vets WHERE user_id = auth.uid()
      )
    )
  );

-- Create pet history table
CREATE TABLE pet_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pet_id UUID NOT NULL REFERENCES pets(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  description TEXT NOT NULL,
  veterinarian TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  history_date DATE NOT NULL
);

ALTER TABLE pet_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Vets can view pet history"
  ON pet_history FOR SELECT
  USING (
    pet_id IN (
      SELECT id FROM pets WHERE owner_id IN (
        SELECT id FROM owners WHERE vet_id IN (
          SELECT id FROM vets WHERE user_id = auth.uid()
        )
      )
    )
  );

CREATE POLICY "Vets can insert pet history"
  ON pet_history FOR INSERT
  WITH CHECK (
    pet_id IN (
      SELECT id FROM pets WHERE owner_id IN (
        SELECT id FROM owners WHERE vet_id IN (
          SELECT id FROM vets WHERE user_id = auth.uid()
        )
      )
    )
  );

-- Create reminders table
CREATE TABLE reminders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pet_id UUID NOT NULL REFERENCES pets(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  description TEXT NOT NULL,
  reminder_date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE reminders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Vets can view reminders"
  ON reminders FOR SELECT
  USING (
    pet_id IN (
      SELECT id FROM pets WHERE owner_id IN (
        SELECT id FROM owners WHERE vet_id IN (
          SELECT id FROM vets WHERE user_id = auth.uid()
        )
      )
    )
  );

CREATE POLICY "Vets can insert reminders"
  ON reminders FOR INSERT
  WITH CHECK (
    pet_id IN (
      SELECT id FROM pets WHERE owner_id IN (
        SELECT id FROM owners WHERE vet_id IN (
          SELECT id FROM vets WHERE user_id = auth.uid()
        )
      )
    )
  );
