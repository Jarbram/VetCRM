-- Add completed column to reminders table
ALTER TABLE public.reminders
ADD COLUMN completed BOOLEAN DEFAULT FALSE;

-- Add update policy for reminders
CREATE POLICY "Vets can update their own reminders"
  ON public.reminders FOR UPDATE
  USING (
    pet_id IN (
      SELECT id
      FROM public.pets
      WHERE owner_id IN (
        SELECT id
        FROM public.owners
        WHERE vet_id IN (
          SELECT id
          FROM public.vets
          WHERE user_id = auth.uid()
        )
      )
    )
  )
  WITH CHECK (
    pet_id IN (
      SELECT id
      FROM public.pets
      WHERE owner_id IN (
        SELECT id
        FROM public.owners
        WHERE vet_id IN (
          SELECT id
          FROM public.vets
          WHERE user_id = auth.uid()
        )
      )
    )
  );
