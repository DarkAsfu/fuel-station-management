"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
import { Checkbox } from "@/components/ui/checkbox"
import {
  Settings,
  Plus,
  Edit,
  Trash2,
  Fuel,
  Gauge,
  Droplets,
  Database,
  MapPin,
  Calendar,
  DollarSign,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Save,
  RefreshCw,
} from "lucide-react"

export default function SystemConfiguration() {
  const [activeTab, setActiveTab] = useState("dispensers")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [isAddNozzleDialogOpen, setIsAddNozzleDialogOpen] = useState(false)
  const [isAddFuelTypeDialogOpen, setIsAddFuelTypeDialogOpen] = useState(false)
  const [isAddFuelTankDialogOpen, setIsAddFuelTankDialogOpen] = useState(false)

  // Mock data
  const dispensers = [
    { id: 1, name: "Dispenser A1", location: "North Side - Bay 1", is_active: true },
    { id: 2, name: "Dispenser A2", location: "North Side - Bay 2", is_active: true },
    { id: 3, name: "Dispenser B1", location: "South Side - Bay 1", is_active: false },
    { id: 4, name: "Dispenser B2", location: "South Side - Bay 2", is_active: true },
  ]

  const nozzles = [
    { id: 1, name: "Nozzle Type A", type: "Standard", compatible_fuels: ["Regular", "Premium"] },
    { id: 2, name: "Nozzle Type B", type: "High Flow", compatible_fuels: ["Diesel"] },
    { id: 3, name: "Nozzle Type C", type: "Multi-Fuel", compatible_fuels: ["Regular", "Premium", "Super"] },
  ]

  const fuelTypes = [
    { id: 1, name: "Regular (87)", price_unit: "per Liter", price: "1.45" },
    { id: 2, name: "Premium (91)", price_unit: "per Liter", price: "1.65" },
    { id: 3, name: "Super (95)", price_unit: "per Liter", price: "1.85" },
    { id: 4, name: "Diesel", price_unit: "per Liter", price: "1.55" },
  ]

  const fuelTanks = [
    {
      id: 1,
      fuel_type: "Regular (87)",
      capacity: "20000",
      current_volume: "15000",
      last_refill: "2024-01-15",
      location: "Tank Farm A",
    },
    {
      id: 2,
      fuel_type: "Premium (91)",
      capacity: "20000",
      current_volume: "9000",
      last_refill: "2024-01-12",
      location: "Tank Farm A",
    },
    {
      id: 3,
      fuel_type: "Super (95)",
      capacity: "20000",
      current_volume: "4000",
      last_refill: "2024-01-10",
      location: "Tank Farm B",
    },
    {
      id: 4,
      fuel_type: "Diesel",
      capacity: "25000",
      current_volume: "17000",
      last_refill: "2024-01-14",
      location: "Tank Farm B",
    },
  ]

  const dispenserConfigurations = [
    {
      id: 1,
      dispenser: "Dispenser A1",
      nozzle: "Nozzle Type A",
      fuel_tank: "Tank Farm A - Regular",
      is_active: true,
      side: "Left",
    },
    {
      id: 2,
      dispenser: "Dispenser A1",
      nozzle: "Nozzle Type C",
      fuel_tank: "Tank Farm A - Premium",
      is_active: true,
      side: "Right",
    },
    {
      id: 3,
      dispenser: "Dispenser A2",
      nozzle: "Nozzle Type B",
      fuel_tank: "Tank Farm B - Diesel",
      is_active: true,
      side: "Left",
    },
    {
      id: 4,
      dispenser: "Dispenser B1",
      nozzle: "Nozzle Type A",
      fuel_tank: "Tank Farm A - Regular",
      is_active: false,
      side: "Left",
    },
  ]

  const getFuelLevelColor = (current, capacity) => {
    const percentage = (Number.parseInt(current) / Number.parseInt(capacity)) * 100
    if (percentage > 50) return "text-green-600"
    if (percentage > 20) return "text-yellow-600"
    return "text-red-600"
  }

  const getFuelLevelBadge = (current, capacity) => {
    const percentage = (Number.parseInt(current) / Number.parseInt(capacity)) * 100
    if (percentage > 50) return <Badge variant="default">Good</Badge>
    if (percentage > 20) return <Badge variant="secondary">Medium</Badge>
    return <Badge variant="destructive">Low</Badge>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Settings className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">System Configuration</h1>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Sync Configuration
            </Button>
            <Button size="sm">
              <Save className="h-4 w-4 mr-2" />
              Save All Changes
            </Button>
          </div>
        </div>
      </header>

      <div className="p-6">
        {/* Configuration Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Dispensers</CardTitle>
              <Gauge className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3/4</div>
              <p className="text-xs text-muted-foreground">1 under maintenance</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Nozzle Types</CardTitle>
              <Droplets className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">All operational</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Fuel Types</CardTitle>
              <Fuel className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4</div>
              <p className="text-xs text-muted-foreground">Regular, Premium, Super, Diesel</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Storage Tanks</CardTitle>
              <Database className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4</div>
              <p className="text-xs text-muted-foreground">1 needs refill</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Configuration Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="dispensers">Dispensers</TabsTrigger>
            <TabsTrigger value="nozzles">Nozzles</TabsTrigger>
            <TabsTrigger value="fuel-types">Fuel Types</TabsTrigger>
            <TabsTrigger value="fuel-tanks">Fuel Tanks</TabsTrigger>
            <TabsTrigger value="configurations">Configurations</TabsTrigger>
          </TabsList>

          {/* Dispensers Tab */}
          <TabsContent value="dispensers" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Dispenser Management</CardTitle>
                    <CardDescription>Configure and manage fuel dispensers</CardDescription>
                  </div>
                  <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Dispenser
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add New Dispenser</DialogTitle>
                        <DialogDescription>Configure a new fuel dispenser for the station</DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="name" className="text-right">
                            Name
                          </Label>
                          <Input id="name" placeholder="Dispenser C1" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="location" className="text-right">
                            Location
                          </Label>
                          <Input id="location" placeholder="East Side - Bay 1" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="active" className="text-right">
                            Active
                          </Label>
                          <Switch id="active" className="col-span-3" />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit" onClick={() => setIsAddDialogOpen(false)}>
                          Add Dispenser
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {dispensers.map((dispenser) => (
                      <TableRow key={dispenser.id}>
                        <TableCell className="font-mono">#{dispenser.id}</TableCell>
                        <TableCell className="font-medium">{dispenser.name}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                            {dispenser.location}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={dispenser.is_active ? "default" : "secondary"}>
                            {dispenser.is_active ? (
                              <>
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Active
                              </>
                            ) : (
                              <>
                                <XCircle className="h-3 w-3 mr-1" />
                                Inactive
                              </>
                            )}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Nozzles Tab */}
          <TabsContent value="nozzles" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Nozzle Management</CardTitle>
                    <CardDescription>Configure nozzle types and fuel compatibility</CardDescription>
                  </div>
                  <Dialog open={isAddNozzleDialogOpen} onOpenChange={setIsAddNozzleDialogOpen}>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Nozzle Type
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle>Add New Nozzle Type</DialogTitle>
                        <DialogDescription>Configure a new nozzle type and its fuel compatibility</DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div>
                          <Label htmlFor="nozzle-name">Nozzle Name</Label>
                          <Input id="nozzle-name" placeholder="Nozzle Type D" />
                        </div>
                        <div>
                          <Label htmlFor="nozzle-type">Type</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select nozzle type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="standard">Standard</SelectItem>
                              <SelectItem value="high-flow">High Flow</SelectItem>
                              <SelectItem value="multi-fuel">Multi-Fuel</SelectItem>
                              <SelectItem value="diesel-only">Diesel Only</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label>Compatible Fuels</Label>
                          <div className="grid grid-cols-2 gap-2 mt-2">
                            {fuelTypes.map((fuel) => (
                              <div key={fuel.id} className="flex items-center space-x-2">
                                <Checkbox id={`fuel-${fuel.id}`} />
                                <Label htmlFor={`fuel-${fuel.id}`} className="text-sm">
                                  {fuel.name}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit" onClick={() => setIsAddNozzleDialogOpen(false)}>
                          Add Nozzle Type
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Compatible Fuels</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {nozzles.map((nozzle) => (
                      <TableRow key={nozzle.id}>
                        <TableCell className="font-mono">#{nozzle.id}</TableCell>
                        <TableCell className="font-medium">{nozzle.name}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{nozzle.type}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {nozzle.compatible_fuels.map((fuel) => (
                              <Badge key={fuel} variant="secondary" className="text-xs">
                                {fuel}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Fuel Types Tab */}
          <TabsContent value="fuel-types" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Fuel Type Management</CardTitle>
                    <CardDescription>Configure fuel types and pricing</CardDescription>
                  </div>
                  <Dialog open={isAddFuelTypeDialogOpen} onOpenChange={setIsAddFuelTypeDialogOpen}>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Fuel Type
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle>Add New Fuel Type</DialogTitle>
                        <DialogDescription>Configure a new fuel type and pricing</DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div>
                          <Label htmlFor="fuel-name">Fuel Name</Label>
                          <Input id="fuel-name" placeholder="Premium Plus (93)" />
                        </div>
                        <div>
                          <Label htmlFor="price-unit">Price Unit</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select price unit" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="per-liter">per Liter</SelectItem>
                              <SelectItem value="per-gallon">per Gallon</SelectItem>
                              <SelectItem value="per-unit">per Unit</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="fuel-price">Price</Label>
                          <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input id="fuel-price" placeholder="1.95" className="pl-10" type="number" step="0.01" />
                          </div>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit" onClick={() => setIsAddFuelTypeDialogOpen(false)}>
                          Add Fuel Type
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Price Unit</TableHead>
                      <TableHead>Current Price</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {fuelTypes.map((fuelType) => (
                      <TableRow key={fuelType.id}>
                        <TableCell className="font-mono">#{fuelType.id}</TableCell>
                        <TableCell className="font-medium">{fuelType.name}</TableCell>
                        <TableCell>{fuelType.price_unit}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <DollarSign className="h-4 w-4 mr-1 text-muted-foreground" />
                            <span className="font-medium">{fuelType.price}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Fuel Tanks Tab */}
          <TabsContent value="fuel-tanks" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Fuel Tank Management</CardTitle>
                    <CardDescription>Monitor and configure fuel storage tanks</CardDescription>
                  </div>
                  <Dialog open={isAddFuelTankDialogOpen} onOpenChange={setIsAddFuelTankDialogOpen}>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Fuel Tank
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle>Add New Fuel Tank</DialogTitle>
                        <DialogDescription>Configure a new fuel storage tank</DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div>
                          <Label htmlFor="tank-fuel-type">Fuel Type</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select fuel type" />
                            </SelectTrigger>
                            <SelectContent>
                              {fuelTypes.map((fuel) => (
                                <SelectItem key={fuel.id} value={fuel.name}>
                                  {fuel.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="tank-capacity">Capacity (Liters)</Label>
                          <Input id="tank-capacity" placeholder="25000" type="number" />
                        </div>
                        <div>
                          <Label htmlFor="current-volume">Current Volume (Liters)</Label>
                          <Input id="current-volume" placeholder="20000" type="number" />
                        </div>
                        <div>
                          <Label htmlFor="last-refill">Last Refill Date</Label>
                          <Input id="last-refill" type="date" />
                        </div>
                        <div>
                          <Label htmlFor="tank-location">Location</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select tank location" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="tank-farm-a">Tank Farm A</SelectItem>
                              <SelectItem value="tank-farm-b">Tank Farm B</SelectItem>
                              <SelectItem value="tank-farm-c">Tank Farm C</SelectItem>
                              <SelectItem value="underground-1">Underground Section 1</SelectItem>
                              <SelectItem value="underground-2">Underground Section 2</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit" onClick={() => setIsAddFuelTankDialogOpen(false)}>
                          Add Fuel Tank
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Fuel Type</TableHead>
                      <TableHead>Capacity</TableHead>
                      <TableHead>Current Volume</TableHead>
                      <TableHead>Last Refill</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {fuelTanks.map((tank) => (
                      <TableRow key={tank.id}>
                        <TableCell className="font-mono">#{tank.id}</TableCell>
                        <TableCell className="font-medium">{tank.fuel_type}</TableCell>
                        <TableCell>{Number.parseInt(tank.capacity).toLocaleString()}L</TableCell>
                        <TableCell>
                          <div className={`font-medium ${getFuelLevelColor(tank.current_volume, tank.capacity)}`}>
                            {Number.parseInt(tank.current_volume).toLocaleString()}L
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {Math.round((Number.parseInt(tank.current_volume) / Number.parseInt(tank.capacity)) * 100)}%
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                            {tank.last_refill}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                            {tank.location}
                          </div>
                        </TableCell>
                        <TableCell>{getFuelLevelBadge(tank.current_volume, tank.capacity)}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Dispenser Configurations Tab */}
          <TabsContent value="configurations" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Dispenser Configuration</CardTitle>
                    <CardDescription>Configure dispenser-nozzle-tank relationships</CardDescription>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Configuration
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle>Add Dispenser Configuration</DialogTitle>
                        <DialogDescription>Connect a dispenser, nozzle, and fuel tank</DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div>
                          <Label htmlFor="dispenser-select">Dispenser</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select dispenser" />
                            </SelectTrigger>
                            <SelectContent>
                              {dispensers.map((dispenser) => (
                                <SelectItem key={dispenser.id} value={dispenser.name}>
                                  {dispenser.name} - {dispenser.location}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="nozzle-select">Nozzle Type</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select nozzle type" />
                            </SelectTrigger>
                            <SelectContent>
                              {nozzles.map((nozzle) => (
                                <SelectItem key={nozzle.id} value={nozzle.name}>
                                  {nozzle.name} ({nozzle.type})
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="tank-select">Fuel Tank</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select fuel tank" />
                            </SelectTrigger>
                            <SelectContent>
                              {fuelTanks.map((tank) => (
                                <SelectItem key={tank.id} value={`${tank.location} - ${tank.fuel_type}`}>
                                  {tank.location} - {tank.fuel_type}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="side-select">Side</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select side" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="left">Left</SelectItem>
                              <SelectItem value="right">Right</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="config-active" />
                          <Label htmlFor="config-active">Active Configuration</Label>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit">Add Configuration</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Dispenser</TableHead>
                      <TableHead>Nozzle</TableHead>
                      <TableHead>Fuel Tank</TableHead>
                      <TableHead>Side</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {dispenserConfigurations.map((config) => (
                      <TableRow key={config.id}>
                        <TableCell className="font-mono">#{config.id}</TableCell>
                        <TableCell className="font-medium">{config.dispenser}</TableCell>
                        <TableCell>{config.nozzle}</TableCell>
                        <TableCell>{config.fuel_tank}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{config.side}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={config.is_active ? "default" : "secondary"}>
                            {config.is_active ? (
                              <>
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Active
                              </>
                            ) : (
                              <>
                                <XCircle className="h-3 w-3 mr-1" />
                                Inactive
                              </>
                            )}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Configuration Visual Overview */}
            <Card>
              <CardHeader>
                <CardTitle>Configuration Overview</CardTitle>
                <CardDescription>Visual representation of system configuration</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {dispensers
                    .filter((d) => d.is_active)
                    .map((dispenser) => {
                      const configs = dispenserConfigurations.filter(
                        (c) => c.dispenser === dispenser.name && c.is_active,
                      )
                      return (
                        <Card key={dispenser.id} className="border-2">
                          <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                              <CardTitle className="text-lg">{dispenser.name}</CardTitle>
                              <Badge variant="default">
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Active
                              </Badge>
                            </div>
                            <CardDescription>{dispenser.location}</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              {configs.length > 0 ? (
                                configs.map((config, index) => (
                                  <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                                    <div className="flex items-center space-x-2">
                                      <Badge variant="outline" className="text-xs">
                                        {config.side}
                                      </Badge>
                                      <span className="text-sm font-medium">{config.nozzle}</span>
                                    </div>
                                    <div className="text-xs text-muted-foreground">
                                      {config.fuel_tank.split(" - ")[1]}
                                    </div>
                                  </div>
                                ))
                              ) : (
                                <div className="text-center py-4 text-muted-foreground">
                                  <AlertTriangle className="h-8 w-8 mx-auto mb-2" />
                                  <p className="text-sm">No configurations</p>
                                </div>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      )
                    })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
