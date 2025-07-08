# Fuel Station Management System

A comprehensive Next.js-based management system for fuel stations, providing tools for sales, credit management, inventory tracking, and financial reporting.

## 🚀 Features

### Sales Management
- **POS System**: Point of sale interface for fuel transactions
- **Shift Management**: Track employee shifts and work hours
- **Daily Reports**: Generate and view daily sales reports

### Credit Management
- **Customer Management**: Manage customer accounts and information
- **Invoice System**: Create and track customer invoices
- **Dues Tracking**: Monitor outstanding payments and credit limits

### Loan Management
- **Payable Loans**: Track loans owed to vendors/suppliers
- **Receivable Loans**: Manage loans given to customers
- **Repayment Schedule**: Automated repayment tracking and scheduling

### Inventory Management
- **Fuel Stock**: Real-time fuel inventory tracking
- **Expense Management**: Track operational expenses
- **Vendor Management**: Manage supplier relationships and orders

### Accounting
- **Profit & Loss**: Generate P&L statements
- **Balance Sheet**: Financial position reporting
- **Financial Reports**: Comprehensive financial analytics

### Admin Features
- **User Management**: Role-based access control
- **System Settings**: Configure application parameters
- **Audit Logs**: Track system activities and changes

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Frontend**: React 19
- **Styling**: Tailwind CSS 4
- **UI Components**: Radix UI, Shadcn UI
- **Icons**: Lucide React
- **Forms**: React Hook Form
- **HTTP Client**: Axios
- **Package Manager**: Bun

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd fuel-station-management/client
   ```

2. **Install dependencies**
   ```bash
   bun install
   ```

3. **Run the development server**
   ```bash
   bun dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
src/
├── app/
│   ├── (auth)/          # Authentication routes
│   │   ├── login/       # Login page
│   │   └── layout.jsx   # Auth layout
│   ├── (dashboard)/     # Dashboard routes
│   │   ├── sales/       # Sales management
│   │   │   └── pos/     # POS system
│   │   └── layout.jsx   # Dashboard layout
│   └── layout.jsx       # Root layout
├── components/
│   ├── ui/              # Reusable UI components
│   ├── app-sidebar.jsx  # Main navigation sidebar
│   └── login-form.jsx   # Login form component
├── lib/
│   ├── api.js           # API utilities
│   ├── ProtectedRoute.js # Route protection
│   └── utils.js         # Utility functions
└── provider/
    └── AuthProvider.jsx # Authentication context
```

## 🚀 Available Scripts

- `bun dev` - Start development server
- `bun build` - Build for production
- `bun start` - Start production server
- `bun lint` - Run ESLint

## 🔧 Development

This project uses:
- **ESLint** for code linting
- **Tailwind CSS** for styling
- **Radix UI** for accessible components
- **React Hook Form** for form handling

## 📝 License

This project is private and proprietary.

## 🤝 Contributing

This is a private project. Please contact the development team for contribution guidelines.
