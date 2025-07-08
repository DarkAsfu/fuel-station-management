'use client';

import React, { useEffect, useState } from 'react';
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Dialog, DialogContent, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Plus, Phone, Search, UserRound, Mail, MapPin, Trash2, Pencil } from 'lucide-react';
import { toast } from 'react-hot-toast';
import api from '@/lib/api';
import { getCookie } from '@/utils/cokkie';

const CustomerListPage = () => {
    const [customers, setCustomers] = useState([]);
    const [filteredCustomers, setFilteredCustomers] = useState([]);
    const [searchPhone, setSearchPhone] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        address: '',
    });
    const [editCustomerId, setEditCustomerId] = useState(null);
    const [deleteCustomerId, setDeleteCustomerId] = useState(null);

    useEffect(() => {
        fetchCustomers();
    }, []);

    useEffect(() => {
        if (!searchPhone) {
            setFilteredCustomers(customers);
        } else {
            setFilteredCustomers(
                customers.filter((c) =>
                    c.phone.toLowerCase().includes(searchPhone.toLowerCase())
                )
            );
        }
    }, [searchPhone, customers]);

    const fetchCustomers = async () => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            const csrftoken = getCookie('csrftoken');
            const headers = {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'X-CSRFToken': csrftoken,
            };
            if (accessToken) {
                headers.Authorization = `Bearer ${accessToken}`;
            }
            const res = await api.get('/customers/', { headers, withCredentials: true });
            setCustomers(res.data);
            setFilteredCustomers(res.data);
        } catch (err) {
            toast.error('Failed to fetch customers');
        }
    };

    const handleAddCustomer = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const accessToken = localStorage.getItem('accessToken');
            const csrftoken = getCookie('csrftoken');
            const headers = {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'X-CSRFToken': csrftoken,
            };
            if (accessToken) {
                headers.Authorization = `Bearer ${accessToken}`;
            }

            const response = await api.post('/customers/', formData, {
                headers,
                withCredentials: true,
            });

            toast.success('Customer added successfully!');
            setFormData({ name: '', phone: '', email: '', address: '' });
            fetchCustomers();
        } catch (error) {
            console.error(error);
            toast.error('Failed to add customer');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleUpdateCustomer = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const accessToken = localStorage.getItem('accessToken');
            const csrftoken = getCookie('csrftoken');
            const headers = {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'X-CSRFToken': csrftoken,
            };
            if (accessToken) {
                headers.Authorization = `Bearer ${accessToken}`;
            }

            const response = await api.patch(`/customers/${editCustomerId}/`, formData, {
                headers,
                withCredentials: true,
            });

            toast.success('Customer updated successfully!');
            setFormData({ name: '', phone: '', email: '', address: '' });
            setEditCustomerId(null);
            fetchCustomers();
        } catch (error) {
            console.error(error);
            toast.error('Failed to update customer');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDeleteCustomer = async () => {
        setIsSubmitting(true);
        try {
            const accessToken = localStorage.getItem('accessToken');
            const csrftoken = getCookie('csrftoken');
            const headers = {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'X-CSRFToken': csrftoken,
            };
            if (accessToken) {
                headers.Authorization = `Bearer ${accessToken}`;
            }

            const response = await api.delete(`/customers/${deleteCustomerId}/`, {
                headers,
                withCredentials: true,
            });

            toast.success('Customer deleted successfully!');
            setDeleteCustomerId(null);
            fetchCustomers();
        } catch (error) {
            console.error(error);
            toast.error('Failed to delete customer');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleEditClick = (customer) => {
        setEditCustomerId(customer.id);
        setFormData({
            name: customer.name,
            phone: customer.phone,
            email: customer.email,
            address: customer.address,
        });
    };

    return (
        <div className="w-full h-full flex flex-col overflow-auto">
            <Card className="border-none shadow-none p-0 rounded-lg overflow-hidden flex-1 flex flex-col mt-4 pb-4">
                <CardHeader className=" bg-white px-2 pt-4 sticky top-0 z-10">
                    <div className="lg:flex justify-between items-center gap-4">
                        <div className="flex items-center gap-2 sm:gap-4">
                            <div className="p-2 sm:p-3 bg-blue-50 rounded-lg">
                                <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                            </div>
                            <CardTitle className="text-xl sm:text-2xl font-bold text-gray-800">
                                Customer Directory
                            </CardTitle>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 items-stretch w-full md:w-auto">
                            <div className="relative w-full">
                                <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                                <Input
                                    placeholder="Search by phone..."
                                    value={searchPhone}
                                    onChange={(e) => setSearchPhone(e.target.value)}
                                    className="w-full pl-10 sm:pl-12 pr-4 py-2 bg-gray-50 text-gray-900 placeholder-gray-500 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                                />
                            </div>

                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-3 sm:py-2.5 sm:px-5 rounded-lg shadow-sm flex items-center gap-1 sm:gap-2 transition-all duration-300 hover:shadow-md whitespace-nowrap cursor-pointer">
                                        <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                                        <span className="text-sm sm:text-base">Add Customer</span>
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-lg rounded-lg border-none shadow-xl bg-white p-4 sm:p-6 max-w-[95vw]">
                                    <form onSubmit={handleAddCustomer} className="space-y-4 sm:space-y-5">
                                        <DialogTitle className="sr-only">Add New Customer</DialogTitle>
                                        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 flex items-center gap-2 sm:gap-3">
                                            <UserRound className="text-blue-600 w-5 h-5 sm:w-6 sm:h-6" />
                                            Add New Customer
                                        </h2>

                                        <div className="space-y-1 sm:space-y-2">
                                            <label className="block text-sm font-medium text-gray-700">Full Name *</label>
                                            <div className="relative">
                                                <UserRound className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                                                <Input
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={(e) =>
                                                        setFormData((prev) => ({
                                                            ...prev,
                                                            name: e.target.value,
                                                        }))
                                                    }
                                                    required
                                                    placeholder="Enter customer name"
                                                    className="w-full pl-10 sm:pl-12 pr-4 py-2 sm:py-2.5 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-1 sm:space-y-2">
                                            <label className="block text-sm font-medium text-gray-700">Phone *</label>
                                            <div className="relative">
                                                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                                                <Input
                                                    name="phone"
                                                    type="tel"
                                                    value={formData.phone}
                                                    onChange={(e) =>
                                                        setFormData((prev) => ({
                                                            ...prev,
                                                            phone: e.target.value,
                                                        }))
                                                    }
                                                    required
                                                    placeholder="Enter phone number"
                                                    className="w-full pl-10 sm:pl-12 pr-4 py-2 sm:py-2.5 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-1 sm:space-y-2">
                                            <label className="block text-sm font-medium text-gray-700">Email</label>
                                            <div className="relative">
                                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                                                <Input
                                                    name="email"
                                                    type="email"
                                                    value={formData.email}
                                                    onChange={(e) =>
                                                        setFormData((prev) => ({
                                                            ...prev,
                                                            email: e.target.value,
                                                        }))
                                                    }
                                                    placeholder="Enter email address"
                                                    className="w-full pl-10 sm:pl-12 pr-4 py-2 sm:py-2.5 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-1 sm:space-y-2">
                                            <label className="block text-sm font-medium text-gray-700">Address</label>
                                            <div className="relative">
                                                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                                                <Input
                                                    name="address"
                                                    value={formData.address}
                                                    onChange={(e) =>
                                                        setFormData((prev) => ({
                                                            ...prev,
                                                            address: e.target.value,
                                                        }))
                                                    }
                                                    placeholder="Enter customer address"
                                                    className="w-full pl-10 sm:pl-12 pr-4 py-2 sm:py-2.5 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                                />
                                            </div>
                                        </div>

                                        <div className="flex justify-end">
                                            <Button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 sm:py-2.5 sm:px-6 rounded-lg shadow-sm transition-all duration-300 hover:shadow-md disabled:opacity-50 text-sm sm:text-base cursor-pointer"
                                            >
                                                {isSubmitting ? 'Adding...' : 'Add Customer'}
                                            </Button>
                                        </div>
                                    </form>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </div>
                </CardHeader>

                <CardContent className="mx-2 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 p-0">
                    {filteredCustomers.map((customer, index) => (
                        <div
                            key={index}
                            className="flex flex-col bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 p-4 relative"
                        >
                            <div className="absolute top-2 right-2 flex gap-1">
                                <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    className="w-8 h-8 hover:bg-blue-50 cursor-pointer"
                                    onClick={() => handleEditClick(customer)}
                                >
                                    <Pencil className="w-4 h-4 text-blue-600" />
                                </Button>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button 
                                            variant="ghost" 
                                            size="icon" 
                                            className="w-8 h-8 hover:bg-red-50 cursor-pointer"
                                            onClick={() => setDeleteCustomerId(customer.id)}
                                        >
                                            <Trash2 className="w-4 h-4 text-red-600" />
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-md rounded-lg border-none shadow-xl bg-white p-4 sm:p-6 max-w-[95vw]">
                                        <DialogTitle className="text-lg font-semibold text-gray-800">
                                            Confirm Delete
                                        </DialogTitle>
                                        <p className="text-gray-600">Are you sure you want to delete this customer? This action cannot be undone.</p>
                                        <DialogFooter className="gap-2">
                                            <DialogClose asChild>
                                                <Button 
                                                    variant="outline" 
                                                    className="border-gray-300 cursor-pointer text-gray-700 hover:bg-gray-50"
                                                >
                                                    Cancel
                                                </Button>
                                            </DialogClose>
                                            <Button 
                                                variant="destructive" 
                                                onClick={handleDeleteCustomer}
                                                disabled={isSubmitting}
                                                className="bg-red-600 hover:bg-red-700 text-white cursor-pointer"
                                            >
                                                {isSubmitting ? 'Deleting...' : 'Delete'}
                                            </Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            </div>

                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100">
                                    <UserRound className="w-5 h-5 text-blue-600" />
                                </div>
                                <h3 className="font-semibold text-gray-800 text-base truncate">{customer.name}</h3>
                            </div>

                            <div className="flex items-center gap-2 text-gray-700 text-sm mb-2">
                                <Phone className="w-4 h-4 text-gray-500 shrink-0" />
                                <span className="truncate">{customer.phone}</span>
                            </div>

                            {customer.email ? (
                                <div className="flex items-center gap-2 text-gray-700 text-sm mb-2">
                                    <Mail className="w-4 h-4 text-gray-500 shrink-0" />
                                    <span className="truncate">{customer.email}</span>
                                </div>
                            ) : (
                                <div className="text-gray-400 text-sm mb-2">No email provided</div>
                            )}

                            {customer.address ? (
                                <div className="flex items-center gap-2 text-gray-700 text-sm">
                                    <MapPin className="w-4 h-4 text-gray-500 shrink-0" />
                                    <span className="truncate">{customer.address}</span>
                                </div>
                            ) : (
                                <div className="text-gray-400 text-sm">No address provided</div>
                            )}
                        </div>
                    ))}

                    {filteredCustomers.length === 0 && (
                        <div className="col-span-full flex flex-col items-center justify-center text-gray-500 py-8">
                            <Search className="w-8 h-8 mb-2" />
                            <p className="font-medium">No customers found</p>
                            <p className="text-xs">Try adjusting your search or add a new customer</p>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Edit Customer Dialog */}
            <Dialog open={editCustomerId !== null} onOpenChange={(open) => !open && setEditCustomerId(null)}>
                <DialogContent className="sm:max-w-lg rounded-lg border-none shadow-xl bg-white p-4 sm:p-6 max-w-[95vw]">
                    <form onSubmit={handleUpdateCustomer} className="space-y-4 sm:space-y-5">
                        <DialogTitle className="sr-only">Edit Customer</DialogTitle>
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 flex items-center gap-2 sm:gap-3">
                            <UserRound className="text-blue-600 w-5 h-5 sm:w-6 sm:h-6" />
                            Edit Customer
                        </h2>

                        <div className="space-y-1 sm:space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Full Name *</label>
                            <div className="relative">
                                <UserRound className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                                <Input
                                    name="name"
                                    value={formData.name}
                                    onChange={(e) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            name: e.target.value,
                                        }))
                                    }
                                    required
                                    placeholder="Enter customer name"
                                    className="w-full pl-10 sm:pl-12 pr-4 py-2 sm:py-2.5 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                />
                            </div>
                        </div>

                        <div className="space-y-1 sm:space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Phone *</label>
                            <div className="relative">
                                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                                <Input
                                    name="phone"
                                    type="tel"
                                    value={formData.phone}
                                    onChange={(e) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            phone: e.target.value,
                                        }))
                                    }
                                    required
                                    placeholder="Enter phone number"
                                    className="w-full pl-10 sm:pl-12 pr-4 py-2 sm:py-2.5 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                />
                            </div>
                        </div>

                        <div className="space-y-1 sm:space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                                <Input
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            email: e.target.value,
                                        }))
                                    }
                                    placeholder="Enter email address"
                                    className="w-full pl-10 sm:pl-12 pr-4 py-2 sm:py-2.5 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                />
                            </div>
                        </div>

                        <div className="space-y-1 sm:space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Address</label>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                                <Input
                                    name="address"
                                    value={formData.address}
                                    onChange={(e) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            address: e.target.value,
                                        }))
                                    }
                                    placeholder="Enter customer address"
                                    className="w-full pl-10 sm:pl-12 pr-4 py-2 sm:py-2.5 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                />
                            </div>
                        </div>

                        <div className="flex justify-end gap-2">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setEditCustomerId(null)}
                                className="border-gray-300 text-gray-700 hover:bg-gray-50"
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 sm:py-2.5 sm:px-6 rounded-lg shadow-sm transition-all duration-300 hover:shadow-md disabled:opacity-50 text-sm sm:text-base cursor-pointer"
                            >
                                {isSubmitting ? 'Updating...' : 'Update Customer'}
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default CustomerListPage;