# Facility Management Web Application

A comprehensive, modern web application for managing facility operations, work orders, assets, and maintenance activities across multiple departments and locations.

## 🌟 Features

### 🔐 Authentication & Security
- Secure login system with role-based access control
- User management with different permission levels (Admin, Supervisor, Technician, Viewer)
- Dark/Light theme support
- Responsive design for desktop and tablet

### 📊 Dashboard & Analytics
- Real-time KPI dashboard with key metrics
- Interactive charts and visualizations
- Work order completion trends
- Asset status distribution
- Recent activity feeds
- Low stock alerts

### 🛠️ Work Order Management
- Create and track work orders with detailed information
- Location, building, and department selection
- Priority levels (Critical, High, Medium, Low)
- Status tracking (Pending, In Progress, Done, Closed)
- File attachments (images, videos, documents)
- Assignment to technicians
- Time and cost tracking

### 🏢 Asset Management
- Comprehensive asset tracking system
- Asset details: name, serial number, category, supplier
- Warranty and maintenance date tracking
- Asset status monitoring (Active, Under Maintenance, Inactive, Retired)
- Purchase cost and current value tracking
- Asset history and specifications

### 📦 Spare Parts Inventory
- Real-time stock level monitoring
- Category-based filtering (HVAC, Electrical, Plumbing, Mechanical, General)
- Low stock alerts and notifications
- Supplier information and part numbers
- Cost tracking and restocking history

### 📅 Work Scheduler
- Calendar-based task scheduling
- Recurring and one-time task management
- Technician assignment and tracking
- Department and building-based scheduling
- Task status monitoring

### 👥 Manpower Management
- Employee profile management
- Department and shift tracking
- Contact information and role assignment
- Task assignment and performance tracking
- Day/Night shift management

### 📈 Reports & Analytics
- Auto-generated daily, weekly, and monthly reports
- Exportable reports in PDF/Excel formats
- Filterable by location, technician, and department
- Advanced analytics and insights
- Custom report generation

## 🚀 Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with dark mode support
- **State Management**: Zustand
- **Routing**: React Router DOM
- **Charts**: Recharts
- **Forms**: React Hook Form
- **Notifications**: React Hot Toast
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Authentication**: Firebase (ready for integration)

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd facility-management-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
```

### Firebase Setup
1. Create a Firebase project
2. Enable Authentication (Email/Password)
3. Enable Firestore Database
4. Add your Firebase configuration to the environment variables

## 🎯 Usage

### Demo Credentials
- **Email**: admin@facility.com
- **Password**: password123

### Key Features Walkthrough

1. **Dashboard**: View real-time KPIs and analytics
2. **Work Orders**: Create and manage maintenance requests
3. **Assets**: Track facility equipment and assets
4. **Spare Parts**: Monitor inventory levels
5. **Scheduler**: Plan and schedule maintenance tasks
6. **Manpower**: Manage technician profiles and assignments
7. **Reports**: Generate and export facility reports
8. **Analytics**: View detailed performance metrics

## 📁 Project Structure

```
src/
├── components/
│   ├── Auth/
│   │   └── LoginForm.tsx
│   ├── Dashboard/
│   │   ├── Dashboard.tsx
│   │   ├── StatCard.tsx
│   │   ├── WorkOrderChart.tsx
│   │   ├── AssetStatusChart.tsx
│   │   ├── RecentWorkOrders.tsx
│   │   └── LowStockAlert.tsx
│   ├── Layout/
│   │   ├── Layout.tsx
│   │   ├── Header.tsx
│   │   └── Sidebar.tsx
│   └── WorkOrders/
│       └── WorkOrderList.tsx
├── store/
│   └── index.ts
├── types/
│   └── index.ts
├── App.tsx
├── main.tsx
└── index.css
```

## 🎨 Design System

### Color Palette
- **Primary**: Blue (#3B82F6)
- **Success**: Green (#10B981)
- **Warning**: Yellow (#F59E0B)
- **Danger**: Red (#EF4444)
- **Neutral**: Gray scale

### Components
- Modern card-based layouts
- Responsive tables with sorting and filtering
- Interactive charts and graphs
- Form components with validation
- Modal dialogs and dropdowns
- Status badges and priority indicators

## 🔒 Security Features

- Role-based access control
- Protected routes
- Form validation
- Secure authentication flow
- Data encryption (when connected to backend)

## 📱 Responsive Design

- Desktop-first design
- Tablet and mobile responsive
- Touch-friendly interface
- Optimized for different screen sizes

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`

### Deploy to Netlify
1. Build the project: `npm run build`
2. Upload the `dist` folder to Netlify

## 🔧 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

### Code Style
- TypeScript for type safety
- ESLint for code quality
- Prettier for code formatting
- Tailwind CSS for styling

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

## 🔮 Roadmap

### Phase 2 Features
- [ ] Advanced reporting with custom filters
- [ ] Mobile app development
- [ ] Real-time notifications
- [ ] Advanced analytics dashboard
- [ ] Integration with IoT devices
- [ ] Predictive maintenance
- [ ] Multi-language support
- [ ] Advanced user permissions

### Phase 3 Features
- [ ] AI-powered maintenance recommendations
- [ ] Advanced asset lifecycle management
- [ ] Integration with external systems
- [ ] Advanced workflow automation
- [ ] Real-time collaboration features

---

**Built with ❤️ for modern facility management**