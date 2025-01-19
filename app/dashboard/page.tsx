'use client';
import React from 'react';
import {
    ArrowUpRight,
    TrendingUp,
    TrendingDown,
    Receipt,
} from 'lucide-react';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';
import { NetworkIcon } from '@web3icons/react';

interface ChartData {
    name: string;
    value: number;
}

const sampleChartData: ChartData[] = [
    { name: 'Day 1', value: 10 },
    { name: 'Day 2', value: 30 },
    { name: 'Day 3', value: 20 },
    { name: 'Day 4', value: 40 },
    { name: 'Day 5', value: 15 },
    { name: 'Day 6', value: 50 }
];

interface TokenBalance {
    token: string;
    balance: number;
    usdValue: number;
    icon: React.ComponentType | string;
}

const tokenBalances: TokenBalance[] = [
    { token: 'SUI', balance: 100, usdValue: 400, icon: "sui" },
    // { token: 'ETH', balance: 2, usdValue: 5000, icon: "eth" },
    // { token: 'USDC', balance: 500, usdValue: 500, icon: "usdc" },
];

interface ActivityItem {
    id: number;
    type: 'payment' | 'deposit' | 'withdrawal';
    date: string;
    amount: number;
    status: 'completed' | 'pending' | 'failed';
    token: string
}

const activityItems: ActivityItem[] = [
    {
      id: 1,
      type: 'payment',
      date: '2023-11-20 10:00',
      amount: -150,
      status: 'completed',
      token: "SUI"
    },
     {
      id: 2,
      type: 'deposit',
      date: '2023-11-20 09:00',
      amount: 500,
      status: 'completed',
      token: "SUI"
    },
    {
      id: 3,
      type: 'withdrawal',
      date: '2023-11-19 18:00',
       amount: -200,
      status: 'pending',
       token: "SUI"
    },
     {
      id: 4,
      type: 'payment',
      date: '2023-11-18 18:00',
       amount: -200,
      status: 'failed',
       token: "SUI"
    }
  ];

const DashboardPage = () => {
    return (
        <section className="space-y-6">
                <div className="mb-8 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <h1 className="text-2xl font-semibold">Overview</h1>
                    </div>
                    <div className="text-gray-400 text-sm">
                        <span className="mr-1">Updated:</span><span>Now</span>
                    </div>
                </div>
                <Card className="mb-6  border border-gray-700   ">
                    <CardHeader>
                        <CardTitle className="text-xl">User Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-gray-400">Username: </span> <p className="font-medium text-gray-300">Ta Thai</p>
                        </div>
                        <Separator/>
                         <div className="mt-4">
                            {tokenBalances.map((item, index) => (
                                <div key={index} className="flex items-center justify-between mb-2 last:mb-0">
                                     <div className="flex items-center gap-2">
                                            <NetworkIcon network={item.icon as string} variant="mono" size={20} className="text-lime-400"/>
                                          <span className="font-medium text-gray-300">{item.token}:</span>
                                      </div>
                                     <p className="text-gray-300">{item.balance} - ${item.usdValue}</p>
                                </div>
                                ))}
                         </div>
                    </CardContent>
                </Card>


                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    <Card className=" border border-gray-700   ">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-lg font-medium flex items-center gap-1">
                              <TrendingUp className="h-4 w-4 text-lime-400 " /> Daily Gross Volume
                           </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <h2 className="text-2xl font-bold mb-2 text-gray-200">$0</h2>
                             <p className="text-sm text-gray-500">12:00 AM - 12:00 AM</p>
                           <div className="flex items-center text-sm mt-auto justify-end text-gray-500">
                              Analytics
                           <ArrowUpRight className="h-4 w-4 ml-1" />
                         </div>
                             <div className="mt-4 h-24 w-full ">
                                    <ResponsiveContainer width="100%" height="100%">
                                          <LineChart data={sampleChartData}>
                                                <CartesianGrid strokeDasharray="3 3" stroke="#4B5563"/>
                                            <XAxis dataKey="name" stroke="#CBD5E0" />
                                            <YAxis stroke="#CBD5E0" />
                                             <Tooltip wrapperStyle={{ backgroundColor: "#1F2937", padding: '5px', border: "1px solid #4B5563"}} itemStyle={{color: "#CBD5E0"}}/>
                                            <Line type="monotone" dataKey="value" stroke="#82ca9d" strokeWidth={2} />
                                          </LineChart>
                                    </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className=" border border-gray-700   ">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                             <CardTitle className="text-lg font-medium flex items-center gap-1">
                                <TrendingDown className="h-4 w-4 text-lime-400 "/> Net Volume
                             </CardTitle>
                        </CardHeader>
                         <CardContent>
                             <h2 className="text-2xl font-bold mb-2 text-gray-200">$0</h2>
                             <p className="text-sm text-gray-500">6 days - now</p>
                           <div className="flex items-center text-sm mt-auto justify-end text-gray-500">
                            Analytics
                           <ArrowUpRight className="h-4 w-4 ml-1" />
                         </div>
                              <div className="mt-4 h-24 w-full ">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={sampleChartData}>
                                               <CartesianGrid strokeDasharray="3 3" stroke="#4B5563"/>
                                            <XAxis dataKey="name" stroke="#CBD5E0"/>
                                            <YAxis stroke="#CBD5E0"/>
                                              <Tooltip wrapperStyle={{ backgroundColor: "#1F2937", padding: '5px', border: "1px solid #4B5563"}} itemStyle={{color: "#CBD5E0"}}/>
                                             <Line type="monotone" dataKey="value" stroke="#82ca9d" strokeWidth={2} />
                                        </LineChart>
                                    </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className=" border border-gray-700   ">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-lg font-medium flex items-center gap-1">
                              <Receipt className="h-4 w-4 text-lime-400 "/> Recurring payments
                             </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <h2 className="text-2xl font-bold mb-2 text-gray-200">0</h2>
                            <p className="text-sm text-gray-500">6 days - now</p>
                              <div className="flex items-center text-sm mt-auto justify-end text-gray-500">
                            Analytics
                           <ArrowUpRight className="h-4 w-4 ml-1" />
                         </div>
                            <div className="mt-4 h-24 w-full ">
                                    <ResponsiveContainer width="100%" height="100%">
                                       <LineChart data={sampleChartData}>
                                              <CartesianGrid strokeDasharray="3 3" stroke="#4B5563"/>
                                            <XAxis dataKey="name" stroke="#CBD5E0"/>
                                            <YAxis stroke="#CBD5E0"/>
                                              <Tooltip wrapperStyle={{ backgroundColor: "#1F2937", padding: '5px', border: "1px solid #4B5563"}} itemStyle={{color: "#CBD5E0"}}/>
                                            <Line type="monotone" dataKey="value" stroke="#82ca9d" strokeWidth={2} />
                                        </LineChart>
                                    </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>
                </div>

              <div className="mt-8">
                <h1 className="text-2xl font-semibold mb-4">Recent Activity</h1>
                    <div className="space-y-4">
                       {activityItems.map((item) => (
                            <div key={item.id} className="   border border-gray-700 rounded-md p-4 flex items-center justify-between">
                                 <div className="flex items-center gap-2">
                                     <NetworkIcon network={item.token} variant="mono" size={20} className="text-lime-400"/>
                                     <div className="space-y-0.5">
                                        <p className="font-medium text-gray-300 capitalize">{item.type}</p>
                                        <p className="text-sm text-gray-500">{new Date(item.date).toLocaleString()}</p>
                                     </div>
                                </div>
                                    <div className="flex flex-col items-end">
                                        <p className={`font-semibold ${item.amount > 0 ? 'text-green-500' : 'text-red-500'}`}>
                                          {item.amount > 0 ? `+${item.amount}` : item.amount}
                                         </p>
                                       <p className={`text-xs ${item.status === 'completed' ? 'text-green-400' : item.status === 'pending' ? 'text-yellow-400' : 'text-red-400'} `}>{item.status}</p>
                                    </div>
                            </div>
                       ))}
                  </div>
              </div>
        </section>
    );
};

export default DashboardPage;