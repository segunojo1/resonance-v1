-- Safely rename typoed column if it still exists in the connected database.
DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'Generation'
      AND column_name = 'repititionPenalty'
  ) THEN
    ALTER TABLE "Generation" RENAME COLUMN "repititionPenalty" TO "repetitionPenalty";
  END IF;
END $$;
