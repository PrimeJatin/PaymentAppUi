import React, { useState, useMemo } from "react";

const mockTransactions = [
    { id: 1, type: "Payment", date: "Oct 24, 2025", description: "Mobile Recharge for 9876543210", amount: 299, status: "Success", category: "Recharge" },
    { id: 2, type: "Transfer", date: "Oct 23, 2025", description: "Sent to Jane Doe (UPI)", amount: 1500, status: "Success", category: "Money Transfer" },
    { id: 3, type: "Bill", date: "Oct 22, 2025", description: "Electricity Bill - BESCOM", amount: 875, status: "Success", category: "Utility" },
    { id: 4, type: "Payment", date: "Oct 22, 2025", description: "Online Shopping - Amazon", amount: 4999, status: "Pending", category: "Shopping" },
    { id: 5, type: "Transfer", date: "Oct 21, 2025", description: "Received from John Smith (UPI)", amount: 500, status: "Success", category: "Money Transfer" },
    { id: 6, type: "Payment", date: "Oct 20, 2025", description: "FASTag Recharge - Car 1", amount: 500, status: "Success", category: "Recharge" },
    { id: 7, type: "Bill", date: "Oct 19, 2025", description: "Water Bill - Municipal Corp", amount: 450, status: "Success", category: "Utility" },
    { id: 8, type: "Transfer", date: "Oct 18, 2025", description: "Sent to Self Account", amount: 10000, status: "Success", category: "Money Transfer" },
];

const TransactionItem = ({transaction}) => {
    const isCredit = transaction.description.includes("Received") || transaction.status === "Credit";
    const amountColor = isCredit ? 'text-green-600' : 'text-gray-800';
    const sign = isCredit ? '+' : '-';

    return (
        <div className="flex items-center justify-between p-4 border-b border-gray-100 last:border-b-0 cursor-pointer hover:bg-gray-50 transition duration-150">
            <div className="bg-gray-100 rounded-full p-2 text-xl mr-3 w-10 h-10 flex items-center justify-center">
                {transaction.type === 'Payment' ? '💳' : transaction.type === 'Transfer' ? (isCredit ? '📥' : '📤') : '📝'}
            </div>

            <div className="flex-grow">
                <p className="text-sm font-medium text-gray-800 truncate">{transaction.description}</p>
                <p className="text-xs text-gray-500">{transaction.date} • {transaction.category}</p>
            </div>

            <div className="text-right ml-4 flex flex-col items-end">
                <p className={`text-base font-semibold ${amountColor}`}>
                    {sign} ₹{transaction.amount.toLocaleString()}
                </p>
                <span className={`text-xs ${transaction.status === 'Success' ? 'text-green-500' : transaction.status === 'Pending' ? 'text-orange-500' : 'text-red-500'}`}>
                    {transaction.status}
                </span>
            </div>
        </div>
    );
};


const HistoryComponent = ({showFunc}) => {
    const [selectedTab, setSelectedTab] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    const tabs = ['All', 'Payments', 'Transfers', 'Bills'];

    const filteredTransactions = useMemo(() => {
        let filtered = mockTransactions;

        if (selectedTab !== 'All') {
            filtered = filtered.filter(t => t.type === selectedTab.slice(0, -1));
        }

        if (searchQuery) {
            const lowerQuery = searchQuery.toLowerCase();
            filtered = filtered.filter(t =>
                t.description.toLowerCase().includes(lowerQuery) ||
                t.category.toLowerCase().includes(lowerQuery)
            );
        }

        return filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    }, [selectedTab, searchQuery]);

    return (
        <div  className="px-2 h-full flex flex-col bg-gray-50">
            <div className="sticky top-0 bg-white p-4 border-b border-gray-200 z-10">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Transaction History</h2>

                <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2 text-gray-800 mb-4">
                    <span className="mr-2 text-lg text-gray-500">🔍</span>
                    <input
                        type="text"
                        placeholder="Search by name, category, or amount"
                        className="flex-grow bg-transparent outline-none text-sm placeholder-gray-500 text-black"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <div className="flex space-x-2 overflow-x-auto pb-1 -mx-4 px-4">
                    {tabs.map(tab => (
                        <button
                            key={tab}
                            onClick={() => setSelectedTab(tab)}
                            className={`px-4 py-1.5 text-sm font-semibold rounded-full flex-shrink-0 transition-all duration-200 
                                ${selectedTab === tab
                                    ? 'bg-indigo-600 text-white shadow-md'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex-grow overflow-y-auto bg-white pt-2">
                {filteredTransactions.length > 0 ? (
                    filteredTransactions.map(t => (
                        <TransactionItem key={t.id} transaction={t} />
                    ))
                ) : (
                    <div className="text-center p-8 text-gray-500">
                        No transactions found for the current filter.
                    </div>
                )}
                <div className="h-20"></div> 
            </div> 
        </div>
    );
};

export default HistoryComponent;
