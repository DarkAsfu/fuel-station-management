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
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Phone, Search, UserRound, Mail, MapPin } from 'lucide-react';
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

    return (
        <div className="w-full min-h-screen transition-colors duration-300">
            <div className="max-w-7xl mx-auto">
                <Card className="border-none shadow-2xl rounded-2xl overflow-hidden bg-white py-0">
                    <CardHeader className="bg-gradient-to-r from-black to-purple-600 text-white p-6">
                        <div className="">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-white/10 rounded-full backdrop-blur-md transition-transform hover:scale-105">
                                    <Phone className="w-6 h-6" />
                                </div>
                                <CardTitle className="text-3xl font-extrabold tracking-tight">Customer Directory</CardTitle>
                            </div>

                            <div className="">
                                <div className="relative w-full sm:w-72">
                                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/70 w-5 h-5" />
                                    <Input
                                        placeholder="Search by phone..."
                                        value={searchPhone}
                                        onChange={(e) => setSearchPhone(e.target.value)}
                                        className="w-full pl-12 pr-4 py-2.5 bg-white/10 text-white placeholder-white/60 border-none rounded-full focus:ring-2 focus:ring-white/50 focus:bg-white/20 transition-all duration-300"
                                    />
                                </div>

                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button className="bg-white text-black hover:bg-indigo-100 font-semibold py-2.5 px-5 rounded-full shadow-md flex items-center gap-2 transition-all duration-300 hover:shadow-lg">
                                            <Plus className="w-5 h-5" /> 
                                            <span>Add Customer</span>
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-lg rounded-2xl border-none shadow-2xl bg-white p-6">
                                        <form onSubmit={handleAddCustomer} className="space-y-5">
                                            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                                                <UserRound className="text-black w-6 h-6" />
                                                Add New Customer
                                            </h2>

                                            <div className="space-y-2">
                                                <label className="block text-sm font-medium text-gray-700">Full Name *</label>
                                                <div className="relative">
                                                    <UserRound className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
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
                                                        className="w-full pl-12 pr-4 py-2.5 border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <label className="block text-sm font-medium text-gray-700">Phone *</label>
                                                <div className="relative">
                                                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
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
                                                        className="w-full pl-12 pr-4 py-2.5 border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <label className="block text-sm font-medium text-gray-700">Email</label>
                                                <div className="relative">
                                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
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
                                                        className="w-full pl-12 pr-4 py-2.5 border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <label className="block text-sm font-medium text-gray-700">Address</label>
                                                <div className="relative">
                                                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
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
                                                        className="w-full pl-12 pr-4 py-2.5 border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                                                    />
                                                </div>
                                            </div>

                                            <div className="flex justify-end pt-4">
                                                <Button 
                                                    type="submit" 
                                                    disabled={isSubmitting}
                                                    className="bg-gradient-to-r from-black to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-2.5 px-6 rounded-full shadow-md transition-all duration-300 hover:shadow-lg disabled:opacity-50"
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

                    <CardContent className="p-0">
                        <Table className="min-w-full">
                            <TableHeader className="bg-gray-50">
                                <TableRow>
                                    <TableHead className="font-semibold text-gray-800 py-4 px-6">Name</TableHead>
                                    <TableHead className="font-semibold text-gray-800 py-4 px-6">Phone</TableHead>
                                    <TableHead className="font-semibold text-gray-800 py-4 px-6">Email</TableHead>
                                    <TableHead className="font-semibold text-gray-800 py-4 px-6">Address</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredCustomers.map((customer, index) => (
                                    <TableRow 
                                        key={index} 
                                        className={`${
                                            index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                                        } hover:bg-indigo-50 transition-all duration-200 cursor-pointer`}
                                    >
                                        <TableCell className="py-4 px-6 border-b border-gray-100">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                                                    <UserRound className="w-5 h-5 text-black" />
                                                </div>
                                                <span className="font-medium text-gray-900">{customer.name}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="py-4 px-6 border-b border-gray-100">
                                            <div className="flex items-center gap-3">
                                                <Phone className="w-5 h-5 text-gray-500" />
                                                <span className="text-gray-700">{customer.phone}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="py-4 px-6 border-b border-gray-100">
                                            <div className="flex items-center gap-3">
                                                {customer.email ? (
                                                    <>
                                                        <Mail className="w-5 h-5 text-gray-500" />
                                                        <span className="text-gray-700">{customer.email}</span>
                                                    </>
                                                ) : (
                                                    <span className="text-gray-400">-</span>
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell className="py-4 px-6 border-b border-gray-100">
                                            <div className="flex items-center gap-3">
                                                {customer.address ? (
                                                    <>
                                                        <MapPin className="w-5 h-5 text-gray-500" />
                                                        <span className="text-gray-700 truncate max-w-sm">{customer.address}</span>
                                                    </>
                                                ) : (
                                                    <span className="text-gray-400">-</span>
                                                )}
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {filteredCustomers.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={4} className="text-center py-12">
                                            <div className="flex flex-col items-center justify-center gap-3 text-gray-500">
                                                <Search className="w-10 h-10" />
                                                <p className="text-xl font-medium">No customers found</p>
                                                <p className="text-sm">Try adjusting your search or add a new customer</p>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default CustomerListPage;