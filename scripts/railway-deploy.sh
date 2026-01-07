#!/bin/bash
# Railway Deployment Script

echo "--- Starting Deployment Tasks ---"

# 1. Database Migrations
echo "Checking for database migrations..."
npm run db:push

# 2. Start the Server
echo "Starting Andara Ionic CMS..."
npm run start
