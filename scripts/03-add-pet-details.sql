-- Add medical_alerts to pets table
ALTER TABLE pets
ADD COLUMN medical_alerts TEXT;

-- Add weight to pet_history table
ALTER TABLE pet_history
ADD COLUMN weight NUMERIC;
