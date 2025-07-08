"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Switch } from "@/components/ui/switch"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Clock,
  Plus,
  Edit,
  Trash2,
  Search,
  Filter,
  Download,
  Calendar,
  DollarSign,
  Users,
  TrendingUp,
  AlertCircle,
  Eye,
  PlayCircle,
  StopCircle,
} from "lucide-react"

export default function ShiftManagement() {
  const [activeTab, setActiveTab] = useState("active-shifts")
  const [isAddShiftDialogOpen, setIsAddShiftDialogOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")

  // Mock data for shifts
  const shifts = [
    {
      id: 1,
      shift_type: "Morning",
      start_at: "2024-01-20T06:00:00",
      end_at: "2024-01-20T14:00:00",
      start_balance: 5000.0,
      end_balance: 12450.75,
      is_active: true,
      employee: "John Smith",
      duration: "8 hours",
      sales: 7450.75,
      transactions: 45,
    },
    {
      id: 2,
      shift_type: "Evening",
      start_at: "2024-01-20T14:00:00",
      end_at: "2024-01-20T22:00:00",
      start_balance: 12450.75,
      end_balance: 18920.5,
      is_active: false,
      employee: "Sarah Johnson",
      duration: "8 hours",
      sales: 6469.75,
      transactions: 38,
    },
    {
      id: 3,
      shift_type: "Night",
      start_at: "2024-01-20T22:00:00",
      end_at: "2024-01-21T06:00:00",
      start_balance: 18920.5,
      end_balance: 21340.25,
      is_active: false,
      employee: "Mike Davis",
      duration: "8 hours",
      sales: 2419.75,
      transactions: 15,
    },
    {
      id: 4,
      shift_type: "Morning",
      start_at: "2024-01-21T06:00:00",
      end_at: "2024-01-21T14:00:00",
      start_balance: 21340.25,
      end_balance: null,
      is_active: true,
      employee: "Emma Wilson",
      duration: "In Progress",
      sales: 3250.5,
      transactions: 22,
    },
  ]

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const formatCurrency = (amount) => {
    return amount ? `$${amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}` : "N/A"
  }

  const getShiftStatus = (shift) => {
    if (shift.is_active) {
      return (
        <Badge variant="default">
          <PlayCircle className="h-3 w-3 mr-1" />
          Active
        </Badge>
      )
    } else {
      return (
        <Badge variant="secondary">
          <StopCircle className="h-3 w-3 mr-1" />
          Completed
        </Badge>
      )
    }
  }

  const getShiftTypeColor = (type) => {
    switch (type.toLowerCase()) {
      case "morning":
        return "bg-yellow-100 text-yellow-800"
      case "evening":
        return "bg-blue-100 text-blue-800"
      case "night":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredShifts = shifts.filter((shift) => {
    const matchesSearch =
      shift.employee.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shift.shift_type.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter =
      filterType === "all" ||
      (filterType === "active" && shift.is_active) ||
      (filterType === "completed" && !shift.is_active) ||
      filterType === shift.shift_type.toLowerCase()
    return matchesSearch && matchesFilter
  })

  const activeShifts = shifts.filter((shift) => shift.is_active)
  const completedShifts = shifts.filter((shift) => !shift.is_active)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">Shift Management</h1>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export Shifts
            </Button>
            <Dialog open={isAddShiftDialogOpen} onOpenChange={setIsAddShiftDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Shift
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Add New Shift</DialogTitle>
                  <DialogDescription>Create a new work shift for the fuel station</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div>
                    <Label htmlFor="shift-type">Shift Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select shift type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="morning">Morning (6:00 AM - 2:00 PM)</SelectItem>
                        <SelectItem value="evening">Evening (2:00 PM - 10:00 PM)</SelectItem>
                        <SelectItem value="night">Night (10:00 PM - 6:00 AM)</SelectItem>
                        <SelectItem value="custom">Custom Hours</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="start-date">Start Date</Label>
                      <Input id="start-date" type="date" />
                    </div>
                    <div>
                      <Label htmlFor="start-time">Start Time</Label>
                      <Input id="start-time" type="time" defaultValue="06:00" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="end-date">End Date</Label>
                      <Input id="end-date" type="date" />
                    </div>
                    <div>
                      <Label htmlFor="end-time">End Time</Label>
                      <Input id="end-time" type="time" defaultValue="14:00" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="start-balance">Starting Balance</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input id="start-balance" placeholder="5000.00" className="pl-10" type="number" step="0.01" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="employee">Assigned Employee</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select employee" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="john-smith">John Smith</SelectItem>
                        <SelectItem value="sarah-johnson">Sarah Johnson</SelectItem>
                        <SelectItem value="mike-davis">Mike Davis</SelectItem>
                        <SelectItem value="emma-wilson">Emma Wilson</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="auto-start" />
                    <Label htmlFor="auto-start">Start shift immediately</Label>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" onClick={() => setIsAddShiftDialogOpen(false)}>
                    Create Shift
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      <div className="p-6">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Shifts</CardTitle>
              <PlayCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeShifts.length}</div>
              <p className="text-xs text-muted-foreground">Currently running</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$16,140</div>
              <p className="text-xs text-muted-foreground">+12.5% from yesterday</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">120</div>
              <p className="text-xs text-muted-foreground">Across all shifts</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Staff on Duty</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground">Emma Wilson, John Smith</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="active-shifts">Active Shifts</TabsTrigger>
            <TabsTrigger value="all-shifts">All Shifts</TabsTrigger>
            <TabsTrigger value="shift-reports">Reports</TabsTrigger>
          </TabsList>

          {/* Active Shifts Tab */}
          <TabsContent value="active-shifts" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Currently Active Shifts</CardTitle>
                <CardDescription>Monitor ongoing shifts and their performance</CardDescription>
              </CardHeader>
              <CardContent>
                {activeShifts.length > 0 ? (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {activeShifts.map((shift) => (
                      <Card key={shift.id} className="border-2 border-green-200">
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Badge className={getShiftTypeColor(shift.shift_type)}>{shift.shift_type}</Badge>
                              <Badge variant="default">
                                <PlayCircle className="h-3 w-3 mr-1" />
                                Active
                              </Badge>
                            </div>
                            <span className="text-sm text-muted-foreground">#{shift.id}</span>
                          </div>
                          <CardTitle className="text-lg">{shift.employee}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span className="text-sm text-muted-foreground">Started</span>
                              <span className="text-sm font-medium">{formatDateTime(shift.start_at)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-muted-foreground">Duration</span>
                              <span className="text-sm font-medium">{shift.duration}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-muted-foreground">Start Balance</span>
                              <span className="text-sm font-medium">{formatCurrency(shift.start_balance)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-muted-foreground">Current Sales</span>
                              <span className="text-sm font-medium text-green-600">{formatCurrency(shift.sales)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-muted-foreground">Transactions</span>
                              <span className="text-sm font-medium">{shift.transactions}</span>
                            </div>
                            <div className="flex space-x-2 pt-2">
                              <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                                <Eye className="h-4 w-4 mr-2" />
                                View Details
                              </Button>
                              <Button variant="destructive" size="sm" className="flex-1">
                                <StopCircle className="h-4 w-4 mr-2" />
                                End Shift
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <AlertCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">No Active Shifts</h3>
                    <p className="text-muted-foreground mb-4">There are currently no active shifts running.</p>
                    <Button onClick={() => setIsAddShiftDialogOpen(true)}>
                      <Plus className="h-4 w-4 mr-2" />
                      Start New Shift
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* All Shifts Tab */}
          <TabsContent value="all-shifts" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>All Shifts</CardTitle>
                    <CardDescription>Complete history of all shifts</CardDescription>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search shifts..."
                        className="pl-10 w-64"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <Select value={filterType} onValueChange={setFilterType}>
                      <SelectTrigger className="w-40">
                        <Filter className="h-4 w-4 mr-2" />
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Shifts</SelectItem>
                        <SelectItem value="active">Active Only</SelectItem>
                        <SelectItem value="completed">Completed Only</SelectItem>
                        <SelectItem value="morning">Morning Shifts</SelectItem>
                        <SelectItem value="evening">Evening Shifts</SelectItem>
                        <SelectItem value="night">Night Shifts</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Employee</TableHead>
                      <TableHead>Shift Type</TableHead>
                      <TableHead>Start Time</TableHead>
                      <TableHead>End Time</TableHead>
                      <TableHead>Start Balance</TableHead>
                      <TableHead>End Balance</TableHead>
                      <TableHead>Sales</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredShifts.map((shift) => (
                      <TableRow key={shift.id}>
                        <TableCell className="font-mono">#{shift.id}</TableCell>
                        <TableCell className="font-medium">{shift.employee}</TableCell>
                        <TableCell>
                          <Badge className={getShiftTypeColor(shift.shift_type)}>{shift.shift_type}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                            {formatDateTime(shift.start_at)}
                          </div>
                        </TableCell>
                        <TableCell>
                          {shift.end_at ? (
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                              {formatDateTime(shift.end_at)}
                            </div>
                          ) : (
                            <span className="text-muted-foreground">In Progress</span>
                          )}
                        </TableCell>
                        <TableCell>{formatCurrency(shift.start_balance)}</TableCell>
                        <TableCell>{formatCurrency(shift.end_balance)}</TableCell>
                        <TableCell className="text-green-600 font-medium">{formatCurrency(shift.sales)}</TableCell>
                        <TableCell>{getShiftStatus(shift)}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            {!shift.is_active && (
                              <Button variant="outline" size="sm">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="shift-reports" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Shift Performance Summary</CardTitle>
                  <CardDescription>Performance metrics by shift type</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-yellow-50 rounded">
                      <div>
                        <p className="font-medium">Morning Shifts</p>
                        <p className="text-sm text-muted-foreground">Average: 8 hours</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-green-600">$10,700</p>
                        <p className="text-sm text-muted-foreground">67 transactions</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
                      <div>
                        <p className="font-medium">Evening Shifts</p>
                        <p className="text-sm text-muted-foreground">Average: 8 hours</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-green-600">$6,470</p>
                        <p className="text-sm text-muted-foreground">38 transactions</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-purple-50 rounded">
                      <div>
                        <p className="font-medium">Night Shifts</p>
                        <p className="text-sm text-muted-foreground">Average: 8 hours</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-green-600">$2,420</p>
                        <p className="text-sm text-muted-foreground">15 transactions</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Generate Shift Report</CardTitle>
                  <CardDescription>Create detailed shift reports</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="report-start">Start Date</Label>
                        <Input id="report-start" type="date" />
                      </div>
                      <div>
                        <Label htmlFor="report-end">End Date</Label>
                        <Input id="report-end" type="date" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="report-type">Report Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select report type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="summary">Shift Summary</SelectItem>
                          <SelectItem value="detailed">Detailed Report</SelectItem>
                          <SelectItem value="employee">By Employee</SelectItem>
                          <SelectItem value="performance">Performance Analysis</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="shift-filter">Shift Type Filter</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="All shift types" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Shifts</SelectItem>
                          <SelectItem value="morning">Morning Only</SelectItem>
                          <SelectItem value="evening">Evening Only</SelectItem>
                          <SelectItem value="night">Night Only</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button className="w-full">
                      <Download className="h-4 w-4 mr-2" />
                      Generate Report
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
