# NeoRide Backend API

This is the Node.js/Express backend API that handles MongoDB operations for the NeoRide application.

## 🚀 Quick Start

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Configure Environment
Update the `.env` file with your MongoDB connection string:
```env
MONGODB_URI=mongodb+srv://your-username:your-password@cluster.mongodb.net/NeoRide
PORT=3001
NODE_ENV=development
```

### 3. Start the Server
```bash
# Development mode with auto-restart
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:3001`

## 📋 API Endpoints

### Health Check
- **GET** `/api/health` - Check if the API is running

### Customer Endpoints
- **POST** `/api/customers` - Create a new customer
- **GET** `/api/customers/:supabaseId` - Get customer by Supabase ID
- **PUT** `/api/customers/:supabaseId` - Update customer
- **DELETE** `/api/customers/:supabaseId` - Delete customer

### Driver Endpoints
- **POST** `/api/drivers` - Create a new driver
- **GET** `/api/drivers/:supabaseId` - Get driver by Supabase ID
- **PUT** `/api/drivers/:supabaseId` - Update driver
- **DELETE** `/api/drivers/:supabaseId` - Delete driver

### Statistics
- **GET** `/api/stats` - Get database statistics

## 📊 Example Requests

### Create Customer
```bash
curl -X POST http://localhost:3001/api/customers \
  -H "Content-Type: application/json" \
  -d '{
    "supabaseId": "user-123",
    "email": "customer@example.com",
    "fullName": "John Doe",
    "phone": "+1234567890"
  }'
```

### Create Driver
```bash
curl -X POST http://localhost:3001/api/drivers \
  -H "Content-Type: application/json" \
  -d '{
    "supabaseId": "driver-123",
    "email": "driver@example.com",
    "fullName": "Jane Smith",
    "phone": "+1234567891",
    "licenseNumber": "DL123456",
    "vehicleModel": "Toyota Camry",
    "vehiclePlate": "ABC123"
  }'
```

## 🛠️ Development

### Project Structure
```
backend/
├── server.js          # Main server file
├── package.json       # Dependencies and scripts
├── .env              # Environment variables
└── README.md         # This file
```

### Dependencies
- **express**: Web framework
- **mongoose**: MongoDB ODM
- **cors**: Cross-origin resource sharing
- **dotenv**: Environment variable management
- **body-parser**: Request body parsing

### Dev Dependencies
- **nodemon**: Auto-restart during development

## 🔧 Features

- ✅ **MongoDB Integration**: Full CRUD operations
- ✅ **Data Validation**: Mongoose schema validation
- ✅ **Error Handling**: Comprehensive error responses
- ✅ **CORS Support**: Cross-origin requests enabled
- ✅ **Environment Config**: Flexible configuration
- ✅ **Logging**: Request and error logging
- ✅ **Health Checks**: API status monitoring

## 🚀 Deployment

### Local Development
1. Ensure MongoDB is running (Atlas or local)
2. Install dependencies: `npm install`
3. Start development server: `npm run dev`

### Production Deployment
1. Set production environment variables
2. Install production dependencies: `npm install --production`
3. Start server: `npm start`

## 📝 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/NeoRide` |
| `PORT` | Server port | `3001` |
| `NODE_ENV` | Environment mode | `development` |

## 🔍 Monitoring

### Health Check
Visit `http://localhost:3001/api/health` to verify the API is running.

### Database Stats
Visit `http://localhost:3001/api/stats` to see database statistics.

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Failed**
   - Check your MongoDB URI
   - Verify network access in MongoDB Atlas
   - Ensure correct username/password

2. **Port Already in Use**
   - Change the PORT in `.env` file
   - Kill existing processes on port 3001

3. **CORS Issues**
   - CORS is enabled for all origins in development
   - Configure specific origins for production

### Logs
The server logs all requests and errors to the console. Check the terminal for detailed error messages.

## 📞 Support

If you encounter issues:
1. Check the console logs
2. Verify environment variables
3. Test MongoDB connection
4. Check API endpoints with curl or Postman