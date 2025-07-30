# NeoRide Database Setup

This directory contains the database schema and setup instructions for the NeoRide application.

## Prerequisites

1. A Supabase project set up
2. Access to the Supabase SQL Editor
3. Environment variables configured in your `.env` file

## Setup Instructions

### 1. Run the Database Schema

1. Open your Supabase project dashboard
2. Navigate to the SQL Editor
3. Copy and paste the contents of `schema.sql`
4. Execute the SQL script

This will create the following tables:
- `customers` - Customer profile information
- `drivers` - Driver profile and vehicle information
- `rides` - Ride booking and tracking data
- `admins` - Admin user management
- `notifications` - User notifications

### 2. Configure Row Level Security (RLS)

The schema automatically sets up Row Level Security policies to ensure:
- Users can only access their own data
- Customers can view approved drivers
- Proper access control for rides and notifications

### 3. Environment Variables

Make sure your `.env` file contains:
```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Database Tables Overview

### Customers Table
- Stores customer profile information
- Links to Supabase Auth users
- Includes verification status

### Drivers Table
- Stores driver profile and vehicle information
- Includes license verification
- Driver status management (pending, approved, suspended, rejected)
- Rating and availability tracking

### Rides Table
- Complete ride lifecycle management
- Pickup and destination tracking
- Payment and rating system
- Status tracking from request to completion

### Admins Table
- Admin user management
- Role-based permissions
- System administration capabilities

### Notifications Table
- User notification system
- Read/unread status tracking
- Different notification types

## Data Flow

1. **User Registration**: 
   - Creates auth user in Supabase Auth
   - Inserts profile data into customers/drivers table

2. **User Login**:
   - Authenticates with Supabase Auth
   - Retrieves profile data from respective tables

3. **Ride Booking**:
   - Customer creates ride request
   - Driver accepts and updates ride status
   - Real-time updates through Supabase subscriptions

## Security Features

- Row Level Security (RLS) enabled on all tables
- Users can only access their own data
- Proper foreign key constraints
- Data validation through CHECK constraints

## Maintenance

- Automatic `updated_at` timestamp updates via triggers
- Indexes for optimal query performance
- Cascading deletes for data consistency