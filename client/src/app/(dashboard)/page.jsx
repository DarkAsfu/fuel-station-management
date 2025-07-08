import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  Fuel,
  Users,
  CreditCard,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Plus,
  Search,
  Filter,
  Download,
  Settings,
} from "lucide-react"

export default function FuelStationDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-6">
        {/* Dashboard Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Daily Revenue</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$12,450</div>
              <p className="text-xs text-muted-foreground">+8.2% from yesterday</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Customers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,247</div>
              <p className="text-xs text-muted-foreground">+12 new today</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Fuel Dispensed</CardTitle>
              <Fuel className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8,542L</div>
              <p className="text-xs text-muted-foreground">+5.1% from yesterday</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Pumps</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8/10</div>
              <p className="text-xs text-muted-foreground">2 under maintenance</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="customers">Customers</TabsTrigger>
            <TabsTrigger value="inventory">Inventory</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="pumps">Pumps</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Pump Status */}
              <Card>
                <CardHeader>
                  <CardTitle>Pump Status</CardTitle>
                  <CardDescription>Real-time pump monitoring</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((pump) => (
                      <div key={pump} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                            <span className="text-sm font-medium">{pump}</span>
                          </div>
                          <span className="font-medium">Pump {pump}</span>
                        </div>
                        <Badge variant={pump <= 8 ? "default" : "secondary"}>
                          {pump <= 8 ? (
                            <>
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Active
                            </>
                          ) : (
                            <>
                              <XCircle className="h-3 w-3 mr-1" />
                              Maintenance
                            </>
                          )}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Fuel Levels */}
              <Card>
                <CardHeader>
                  <CardTitle>Fuel Inventory</CardTitle>
                  <CardDescription>Current fuel levels in tanks</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Regular (87)</span>
                        <span className="text-sm text-muted-foreground">75%</span>
                      </div>
                      <Progress value={75} className="h-2" />
                      <p className="text-xs text-muted-foreground mt-1">15,000L / 20,000L</p>
                    </div>

                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Premium (91)</span>
                        <span className="text-sm text-muted-foreground">45%</span>
                      </div>
                      <Progress value={45} className="h-2" />
                      <p className="text-xs text-muted-foreground mt-1">9,000L / 20,000L</p>
                    </div>

                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Super (95)</span>
                        <span className="text-sm text-muted-foreground">20%</span>
                      </div>
                      <Progress value={20} className="h-2" />
                      <p className="text-xs text-muted-foreground mt-1">4,000L / 20,000L</p>
                      <Badge variant="destructive" className="mt-1">
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        Low Stock
                      </Badge>
                    </div>

                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Diesel</span>
                        <span className="text-sm text-muted-foreground">85%</span>
                      </div>
                      <Progress value={85} className="h-2" />
                      <p className="text-xs text-muted-foreground mt-1">17,000L / 20,000L</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Customers Tab */}
          <TabsContent value="customers" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Customer Management</CardTitle>
                    <CardDescription>Manage customer accounts and loyalty programs</CardDescription>
                  </div>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Customer
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search customers..." className="pl-10" />
                  </div>
                  <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Customer</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Loyalty Points</TableHead>
                      <TableHead>Last Visit</TableHead>
                      <TableHead>Total Spent</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>JD</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">John Doe</p>
                            <p className="text-sm text-muted-foreground">john@example.com</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>+1 (555) 123-4567</TableCell>
                      <TableCell>1,250 pts</TableCell>
                      <TableCell>2 hours ago</TableCell>
                      <TableCell>$2,450</TableCell>
                      <TableCell>
                        <Badge variant="default">Active</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>JS</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">Jane Smith</p>
                            <p className="text-sm text-muted-foreground">jane@example.com</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>+1 (555) 987-6543</TableCell>
                      <TableCell>850 pts</TableCell>
                      <TableCell>1 day ago</TableCell>
                      <TableCell>$1,890</TableCell>
                      <TableCell>
                        <Badge variant="default">Active</Badge>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Inventory Tab */}
          <TabsContent value="inventory" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Fuel Inventory</CardTitle>
                  <CardDescription>Current stock levels and pricing</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-4 gap-4 text-sm font-medium text-muted-foreground">
                      <span>Fuel Type</span>
                      <span>Current Stock</span>
                      <span>Price/L</span>
                      <span>Status</span>
                    </div>

                    <div className="grid grid-cols-4 gap-4 items-center">
                      <span className="font-medium">Regular (87)</span>
                      <span>15,000L</span>
                      <span>$1.45</span>
                      <Badge variant="default">Good</Badge>
                    </div>

                    <div className="grid grid-cols-4 gap-4 items-center">
                      <span className="font-medium">Premium (91)</span>
                      <span>9,000L</span>
                      <span>$1.65</span>
                      <Badge variant="secondary">Medium</Badge>
                    </div>

                    <div className="grid grid-cols-4 gap-4 items-center">
                      <span className="font-medium">Super (95)</span>
                      <span>4,000L</span>
                      <span>$1.85</span>
                      <Badge variant="destructive">Low</Badge>
                    </div>

                    <div className="grid grid-cols-4 gap-4 items-center">
                      <span className="font-medium">Diesel</span>
                      <span>17,000L</span>
                      <span>$1.55</span>
                      <Badge variant="default">Good</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Reorder Management</CardTitle>
                  <CardDescription>Set reorder points and manage suppliers</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="fuel-type">Fuel Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select fuel type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="regular">Regular (87)</SelectItem>
                          <SelectItem value="premium">Premium (91)</SelectItem>
                          <SelectItem value="super">Super (95)</SelectItem>
                          <SelectItem value="diesel">Diesel</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="reorder-point">Reorder Point (Liters)</Label>
                      <Input id="reorder-point" placeholder="5000" />
                    </div>

                    <div>
                      <Label htmlFor="supplier">Supplier</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select supplier" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="supplier1">Fuel Corp Inc.</SelectItem>
                          <SelectItem value="supplier2">Energy Solutions Ltd.</SelectItem>
                          <SelectItem value="supplier3">Premium Fuel Co.</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button className="w-full">Update Reorder Settings</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Transactions Tab */}
          <TabsContent value="transactions" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Recent Transactions</CardTitle>
                    <CardDescription>View and manage fuel transactions</CardDescription>
                  </div>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Transaction ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Pump</TableHead>
                      <TableHead>Fuel Type</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Payment</TableHead>
                      <TableHead>Time</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-mono">#TXN001</TableCell>
                      <TableCell>John Doe</TableCell>
                      <TableCell>Pump 3</TableCell>
                      <TableCell>Regular</TableCell>
                      <TableCell>45.2L</TableCell>
                      <TableCell>$65.54</TableCell>
                      <TableCell>
                        <Badge variant="outline">Credit Card</Badge>
                      </TableCell>
                      <TableCell>2:30 PM</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-mono">#TXN002</TableCell>
                      <TableCell>Jane Smith</TableCell>
                      <TableCell>Pump 1</TableCell>
                      <TableCell>Premium</TableCell>
                      <TableCell>38.7L</TableCell>
                      <TableCell>$63.86</TableCell>
                      <TableCell>
                        <Badge variant="outline">Cash</Badge>
                      </TableCell>
                      <TableCell>2:15 PM</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-mono">#TXN003</TableCell>
                      <TableCell>Mike Johnson</TableCell>
                      <TableCell>Pump 5</TableCell>
                      <TableCell>Diesel</TableCell>
                      <TableCell>62.1L</TableCell>
                      <TableCell>$96.26</TableCell>
                      <TableCell>
                        <Badge variant="outline">Debit Card</Badge>
                      </TableCell>
                      <TableCell>1:45 PM</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Pumps Tab */}
          <TabsContent value="pumps" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((pump) => (
                <Card key={pump}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">Pump {pump}</CardTitle>
                      <Badge variant={pump <= 8 ? "default" : "secondary"}>
                        {pump <= 8 ? "Active" : "Maintenance"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Status</span>
                        <span className="text-sm font-medium">{pump <= 8 ? "Operational" : "Under Maintenance"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Today's Sales</span>
                        <span className="text-sm font-medium">${Math.floor(Math.random() * 1000 + 500)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Fuel Dispensed</span>
                        <span className="text-sm font-medium">{Math.floor(Math.random() * 500 + 200)}L</span>
                      </div>
                      {pump <= 8 && (
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Current Customer</span>
                          <span className="text-sm font-medium">{Math.random() > 0.5 ? "In Use" : "Available"}</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Sales Report</CardTitle>
                  <CardDescription>Generate sales reports by date range</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="start-date">Start Date</Label>
                        <Input id="start-date" type="date" />
                      </div>
                      <div>
                        <Label htmlFor="end-date">End Date</Label>
                        <Input id="end-date" type="date" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="report-type">Report Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select report type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="daily">Daily Sales</SelectItem>
                          <SelectItem value="weekly">Weekly Summary</SelectItem>
                          <SelectItem value="monthly">Monthly Report</SelectItem>
                          <SelectItem value="fuel-type">By Fuel Type</SelectItem>
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

              <Card>
                <CardHeader>
                  <CardTitle>Quick Stats</CardTitle>
                  <CardDescription>Key performance indicators</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Today's Revenue</span>
                      <span className="text-lg font-bold">$12,450</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Weekly Revenue</span>
                      <span className="text-lg font-bold">$87,320</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Monthly Revenue</span>
                      <span className="text-lg font-bold">$342,180</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Total Customers</span>
                      <span className="text-lg font-bold">1,247</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Avg. Transaction</span>
                      <span className="text-lg font-bold">$68.50</span>
                    </div>
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
