
-- Add package information to user_credits table
ALTER TABLE public.user_credits 
ADD COLUMN package_type TEXT NOT NULL DEFAULT 'free',
ADD COLUMN is_free_user BOOLEAN NOT NULL DEFAULT true;

-- Update the default remaining_restorations for free users to 1
ALTER TABLE public.user_credits 
ALTER COLUMN remaining_restorations SET DEFAULT 1;

-- Update existing users to be marked as premium if they have more than 1 restoration
UPDATE public.user_credits 
SET package_type = 'premium', 
    is_free_user = false 
WHERE remaining_restorations > 1 OR total_restorations_used > 0;

-- Create a function to automatically upgrade users when they purchase credits
CREATE OR REPLACE FUNCTION public.upgrade_user_to_premium()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- If user gets credits added and they're currently free, upgrade them
  IF NEW.remaining_restorations > OLD.remaining_restorations AND OLD.is_free_user = true THEN
    NEW.package_type = 'premium';
    NEW.is_free_user = false;
  END IF;
  
  RETURN NEW;
END;
$$;

-- Create trigger to automatically upgrade users
CREATE TRIGGER upgrade_to_premium_trigger
  BEFORE UPDATE ON public.user_credits
  FOR EACH ROW
  EXECUTE FUNCTION public.upgrade_user_to_premium();
