-- Migration: Add ai_chat_history field to pages table
-- This field stores the AI chat conversation history for each page
-- including messages, model used, and extracted enhancements

ALTER TABLE pages 
ADD COLUMN IF NOT EXISTS ai_chat_history JSONB DEFAULT NULL;

-- Add comment for documentation
COMMENT ON COLUMN pages.ai_chat_history IS 'Stores AI chat history with messages, model info, and extracted page enhancements';

-- Create index for faster queries on chat history
CREATE INDEX IF NOT EXISTS idx_pages_ai_chat_history ON pages USING GIN (ai_chat_history);
