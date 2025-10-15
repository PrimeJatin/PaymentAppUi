import React, { useState, useMemo } from "react";

const mockNotificationsData = [
    { id: 101, title: "Offer Unlocked!", message: "Get 10% cashback on your next Mobile Recharge.", date: "Oct 25, 2025", icon: "💰", read: false, type: "Offer" },
    { id: 102, title: "Security Alert", message: "Your UPI PIN was successfully changed on Oct 23.", date: "Oct 23, 2025", icon: "🛡️", read: true, type: "Security" },
    { id: 103, title: "Bill Reminder", message: "Your Electricity Bill of ₹875 is due tomorrow.", date: "Oct 22, 2025", icon: "💡", read: false, type: "Reminder" },
    { id: 104, title: "Pending Transaction", message: "Online Shopping transaction is still pending processing.", date: "Oct 22, 2025", icon: "🛒", read: true, type: "Status" },
    { id: 105, title: "Welcome Bonus", message: "You received a ₹50 cash back reward for signing up.", date: "Oct 17, 2025", icon: "🎁", read: true, type: "Offer" },
    { id: 106, title: "Account Update", message: "Your KYC verification process is complete.", date: "Oct 16, 2025", icon: "✅", read: false, type: "Security" },
    { id: 107, title: "New Feature!", message: "Try our new digital gold investment plan.", date: "Oct 15, 2025", icon: "✨", read: false, type: "Offer" },
];

const NotificationItem = ({ notification }) => (
    <div className={`flex items-start p-4 border-b border-gray-100 last:border-b-0 cursor-pointer transition duration-150 
        ${notification.read
            ? 'bg-white text-gray-500 hover:bg-gray-50'
            : 'bg-indigo-50 hover:bg-indigo-100 text-gray-800'
        }`}
    >
        <div className={`text-xl p-2 rounded-full mr-3 w-10 h-10 flex items-center justify-center flex-shrink-0 
            ${notification.read ? 'bg-gray-100' : 'bg-indigo-200 text-indigo-800'}`}
        >
            {notification.icon}
        </div>
        <div className="flex-grow">
            <p className={`text-sm font-semibold ${notification.read ? 'text-gray-600' : 'text-gray-900'}`}>{notification.title}</p>
            <p className="text-xs mt-0.5">{notification.message}</p>
            <p className="text-[10px] text-gray-400 mt-1">{notification.date}</p>
        </div>
        {!notification.read && (
            <span className="w-2 h-2 rounded-full bg-indigo-600 flex-shrink-0 mt-1 ml-2"></span>
        )}
    </div>
);

const NotificationComponent = ({showFunc}) => {
    const [selectedTab, setSelectedTab] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    const tabs = ['All', 'Offers', 'Security', 'Reminders'];

    const filteredNotifications = useMemo(() => {
        let filtered = mockNotificationsData;

        if (selectedTab !== 'All') {
            filtered = filtered.filter(n => n.type === selectedTab.slice(0, -1) || n.type === selectedTab);
        }

        if (searchQuery) {
            const lowerQuery = searchQuery.toLowerCase();
            filtered = filtered.filter(n =>
                n.title.toLowerCase().includes(lowerQuery) ||
                n.message.toLowerCase().includes(lowerQuery) ||
                n.type.toLowerCase().includes(lowerQuery)
            );
        }

        return filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    }, [selectedTab, searchQuery]);

    return (
        <div className="px-2 h-full flex flex-col bg-gray-50">
            <div className="sticky top-0 bg-white p-4 border-b border-gray-200 z-10">
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                    Alerts & Messages
                </h2>

                <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2 text-gray-800 mb-4 shadow-inner">
                    <span className="mr-2 text-lg text-gray-500">🔍</span>
                    <input
                        type="text"
                        placeholder="Search alerts by title or message"
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
                            {tab === 'All' && filteredNotifications.filter(n => !n.read).length > 0 && (
                                <span className="ml-1.5 inline-flex items-center justify-center h-5 w-5 rounded-full bg-red-500 text-white text-xs font-bold">
                                    {filteredNotifications.filter(n => !n.read).length}
                                </span>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex-grow overflow-y-auto bg-white pt-2">
                {filteredNotifications.length > 0 ? (
                    filteredNotifications.map(n => (
                        <NotificationItem key={n.id} notification={n} />
                    ))
                ) : (
                    <div className="text-center p-8 text-gray-500">
                        No {selectedTab.toLowerCase()} messages found.
                    </div>
                )}
                <div className="h-20"></div>
            </div>
        </div>
    );
};

export default NotificationComponent;
