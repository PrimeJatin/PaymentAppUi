import React, { useState, useMemo } from "react";
import HistoryComponent from "./Second";
import NotificationComponent from "./Third";

const serviceData = [
    // Money Transfers
    { name: "Pay to Contact", icon: "👤", category: "Money Transfers" },
    { name: "To Bank/UPI ID", icon: "🏦", category: "Money Transfers" },
    { name: "Self Account", icon: "🔄", category: "Money Transfers" },
    { name: "Check Balance", icon: "🏛️", category: "Money Transfers" },

    // Popular
    { name: "Mobile Recharge", icon: "📱", category: "Popular Bills" },
    { name: "FASTag Recharge", icon: "🚗", category: "Popular Bills" },
    { name: "DTH Recharge", icon: "📡", category: "Popular Bills" },
    { name: "Loan Repayment", icon: "💵", category: "Popular Bills" },

    // Utilities
    { name: "Electricity Bill", icon: "💡", category: "Utilities" },
    { name: "Broadband", icon: "🌐", category: "Utilities" },
    { name: "Water Bill", icon: "💧", category: "Utilities" },
    { name: "Gas Bill", icon: "🔥", category: "Utilities" },
    { name: "Municipal Tax", icon: "🏘️", category: "Utilities" },
    { name: "Landline", icon: "☎️", category: "Utilities" },
    { name: "Education Fees", icon: "🎓", category: "Utilities" },
    { name: "Property Tax", icon: "🏠", category: "Utilities" },

    // Financial Services & Taxes
    { name: "Mutual Funds", icon: "📈", category: "Finance & Taxes" },
    { name: "Insurance", icon: "💼", category: "Finance & Taxes" },
    { name: "EMI Payment", icon: "💳", category: "Finance & Taxes" },
    { name: "Income Tax", icon: "🧾", category: "Finance & Taxes" },
    { name: "Investments", icon: "🏦", category: "Finance & Taxes" },
    { name: "Credit Score", icon: "📊", category: "Finance & Taxes" },
    { name: "Loans", icon: "💰", category: "Finance & Taxes" },
    { name: "Taxes", icon: "💸", category: "Finance & Taxes" },

    // Donations & Devotion
    { name: "Temple Donation", icon: "🛕", category: "Donations & Devotion" },
    { name: "Charity", icon: "🤝", category: "Donations & Devotion" },
    { name: "Mosque Donation", icon: "🕌", category: "Donations & Devotion" },
    { name: "Church Donation", icon: "⛪", category: "Donations & Devotion" },

    // More Services / Lifestyle
    { name: "Travel Booking", icon: "✈️", category: "Lifestyle" },
    { name: "Movies Tickets", icon: "🎬", category: "Lifestyle" },
    { name: "Shopping Offers", icon: "🛍️", category: "Lifestyle" },
    { name: "Games & Prizes", icon: "🎮", category: "Lifestyle" },
    { name: "Food Delivery", icon: "🍔", category: "Lifestyle" },
    { name: "Groceries", icon: "🛒", category: "Lifestyle" },
    { name: "Health Services", icon: "⚕️", category: "Lifestyle" },
    { name: "Gifts & Vouchers", icon: "🎁", category: "Lifestyle" },
];

const allServices = serviceData.sort((a, b) => a.name.localeCompare(b.name));

const groupedServices = {
    "Money Transfers": serviceData.filter(s => s.category === "Money Transfers"),
    "Popular Bills": serviceData.filter(s => s.category === "Popular Bills"),
    "Utilities": serviceData.filter(s => s.category === "Utilities"),
    "Finance & Taxes": serviceData.filter(s => s.category === "Finance & Taxes"),
    "Donations & Devotion": serviceData.filter(s => s.category === "Donations & Devotion"),
    "Lifestyle": serviceData.filter(s => s.category === "Lifestyle"),
};

const AppIcon = ({ icon, label, onClick }) => (
    <div
        className="flex flex-col items-center cursor-pointer w-full p-1 group transition duration-150 active:scale-95"
        onClick={onClick}
    >
        <div className="bg-white rounded-xl p-4 w-16 h-16 flex items-center justify-center text-2xl text-indigo-700 border border-gray-200 shadow-md group-hover:bg-indigo-50 group-hover:shadow-lg transition duration-150">
            {icon}
        </div>
        <small className="mt-1 text-xs text-gray-700 text-center font-medium leading-tight group-hover:text-indigo-800">
            {label}
        </small>
    </div>
);

const PaymentAppUI = ({ handleLogout, setView, currentView }) => {
    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const headerHeightBase = 300; 
    const headerHeightSearch = 130; 
    const contentTop = isSearchVisible ? headerHeightSearch : headerHeightBase;

    const filteredServices = useMemo(() => {
        if (!searchTerm) return [];
        const lowerCaseSearch = searchTerm.toLowerCase();

        return allServices.filter(service =>
            service.name.toLowerCase().includes(lowerCaseSearch)
        );
    }, [searchTerm]);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleHideSearch = () => {
         setView('home')
        setIsSearchVisible(false);
        setSearchTerm('');
    };

    const ServiceSection = ({ title, options }) => (
        <div className="p-4 pt-0">
            <h3 className="text-base font-bold text-gray-700 mb-4">{title}</h3>
            <div className="grid grid-cols-4 gap-y-6 gap-x-4">
                {options.map((option) => (
                    <AppIcon
                        key={option.name}
                        icon={option.icon}
                        label={option.name}
                        onClick={() => console.log(`Navigating to ${option.name}`)}
                    />
                ))}
            </div>
        </div>
    );

    const SearchResults = () => {
        const servicesToDisplay = searchTerm === '' ? allServices : filteredServices;

        if (searchTerm !== '' && servicesToDisplay.length === 0) {
            return (
                <div className="text-center p-8 text-gray-500">
                    <p className="font-medium">No results found for **"{searchTerm}"**</p>
                </div>
            );
        }

        const resultsToRender = servicesToDisplay.reduce((acc, service) => {
            const category = service.category || 'Other';
            if (!acc[category]) { acc[category] = []; }
            acc[category].push(service);
            return acc;
        }, {});


        return (
            <div className="p-4 pt-0">
                {searchTerm === '' && (
                    <h3 className="text-base font-bold text-indigo-600 mb-4">
                        All Services (Sorted A-Z)
                    </h3>
                )}

                {Object.entries(resultsToRender).map(([category, services]) => (
                    <div key={category} className="mb-8">
                        <h4 className="text-sm font-extrabold text-gray-600 mb-3 pb-1 border-b-2 border-indigo-100">
                            {category}
                        </h4>
                        <div className="grid grid-cols-4 gap-y-6 gap-x-4 justify-items-center">
                            {services.map((option) => (
                                <AppIcon
                                    key={option.name}
                                    icon={option.icon}
                                    label={option.name}
                                    onClick={() => console.log(`Navigating to ${option.name} from search`)}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    const renderContent = () => {
        if (currentView === 'history') {
            return <HistoryComponent showFunc={() => setView('home')} />;
        }
        if (currentView === 'notification') {
            return <NotificationComponent showFunc={() => setView('home')} />;
        }
        return (
            <>
                <div className="py-4 px-2 -mt-2 relative z-20">
                    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-xl flex justify-between items-center transition duration-300 hover:shadow-2xl">
                        <div>
                            <div className="text-sm font-semibold text-gray-800"><span className="text-red-500 mr-1">💳</span> Credit Card-9685</div>
                            <small className="text-xs text-red-600 font-bold">₹1,200 due on Wed, 25 Jan</small>
                        </div>
                        <div className="flex space-x-2">
                            <button className="py-2 px-4 bg-orange-600 text-white text-sm font-semibold rounded-lg shadow-md hover:bg-orange-700 transition active:scale-[0.98]">Pay</button>
                            <button className="py-2 px-4 bg-white text-gray-700 text-sm font-semibold border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 transition active:scale-[0.98]">My Bills</button>
                        </div>
                    </div>
                </div>

                {isSearchVisible ? (
                    <SearchResults />
                ) : (
                    <>
                        <div className="p-4 pb-0 bg-gray-100 rounded-2xl m-4 border border-gray-200 shadow-inner">
                            <ServiceSection title="Money Transfers" options={groupedServices["Money Transfers"]} />
                        </div>
                        <div className="p-4 pb-0 bg-gray-100 rounded-2xl m-4 border border-gray-200 shadow-inner">
                            <ServiceSection title="Popular Bills" options={groupedServices["Popular Bills"]} />
                        </div>
                        <div className="p-4 pb-0 bg-gray-100 rounded-2xl m-4 border border-gray-200 shadow-inner">
                            <ServiceSection title="Utilities" options={groupedServices["Utilities"]} />
                        </div>
                        <div className="p-4 pb-0 bg-gray-100 rounded-2xl m-4 border border-gray-200 shadow-inner">
                            <ServiceSection title="Finance & Taxes" options={groupedServices["Finance & Taxes"]} />
                        </div>
                        <div className="p-4 bg-gray-100 rounded-2xl mx-4 border border-gray-200 shadow-inner">
                            <ServiceSection title="Lifestyle" options={groupedServices["Lifestyle"]} />
                        </div>
                        <div className="pb-24"></div> 
                    </>
                )}
            </>
        )
    }

    return (
        <div className="max-w-md mx-auto my-1 border-[10px] border-black rounded-[3rem] shadow-2xl overflow-hidden bg-gray-50 font-sans relative">

            <div
                className="absolute top-0 w-full bg-gray-900 text-white px-4 z-40 transition-all duration-300 ease-in-out"
                style={{ height: `${contentTop}px`, borderTopLeftRadius: '2rem', borderTopRightRadius: '2rem' }}
            >
                <div className="flex justify-between items-center text-xs opacity-70 pt-5 mb-2">
                    <span className="font-bold">9:41</span>
                    <span>📶 🔋 96%</span>
                </div>

                <div className="flex justify-between items-center mb-5">

                    {isSearchVisible ? (
                        <span
                            className="text-2xl cursor-pointer hover:opacity-80 active:opacity-60 transition"
                            onClick={() => {
                                handleHideSearch();  
                                showFunc();          
                            }}
                        >
                            ←
                        </span>
                    ) : (
                        <div
                            className="flex items-center cursor-pointer hover:opacity-80 active:opacity-60 transition"
                            onClick={() => setIsProfileOpen(true)}
                        >
                            <div className="w-9 h-9 rounded-full bg-indigo-500 mr-2 flex items-center justify-center text-white text-base font-bold shadow-lg">JD</div>
                            <small className="text-[10px] opacity-75 leading-none">
                                Tap for Profile
                            </small>
                        </div>
                    )}

                    <div className="text-xl space-x-3 flex items-center" >
                        {!isSearchVisible && (
                            <span
                                className="pcursor-pointer hover:opacity-80 active:opacity-60 transition"
                                onClick={() => { setIsSearchVisible(true); }}
                            >
                                🔍
                            </span>
                        )}
                        <span className="cursor-pointer hover:opacity-80 active:opacity-60 transition"
                            onClick={() => setView('notification')} >🔔</span>
                    </div>
                </div>

                <div className="absolute w-full px-4" style={{ bottom: '15px', left: '0' }}>
                    {isSearchVisible ? (
                        <div className="flex items-center bg-white rounded-full px-4 py-3 text-gray-800 shadow-lg transition-all duration-300">
                            <span className="mr-2 text-lg text-gray-500">🔍</span>
                            <input
                                type="text"
                                placeholder="Search For services or offers..."
                                className="flex-grow bg-transparent outline-none text-sm placeholder-gray-500 text-gray-900"
                                value={searchTerm}
                                onChange={handleSearchChange}
                                autoFocus
                            />
                        </div>
                    ) : (
                        <div className="text-center">
                            <h2 className="text-[24px] font-light">Quick Scan
                                <span className="text-[26px] font-bold"> To Pay</span></h2>
                            <div
                                className="w-42 h-40 mx-auto mt-3 rounded-3xl opacity-90 relative p-4 flex items-center justify-center cursor-pointer hover:opacity-100 transition"
                                style={{ border: "3px dashed #f97316" }}
                            >
                                <span className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-white rounded-tl-xl" />
                                <span className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-white rounded-br-xl" />
                                <svg className="w-32 h-32 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 4a1 1 0 011-1h3a1 1 0 010 2H5v2a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h3a1 1 0 011 1v3a1 1 0 01-2 0V5h-2zm-9 9a1 1 0 012 0v2h2a1 1 0 010 2H4a1 1 0 01-1-1v-3zm12 1a1 1 0 01-2 0v-2h-2a1 1 0 010-2h3a1 1 0 011 1v3zM9 8a1 1 0 012 0v4a1 1 0 01-2 0V8z" clipRule="evenodd"></path></svg>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div
                className="overflow-y-auto absolute w-full bg-gray-50"
                style={{ top: `${contentTop}px`, bottom: '40px' }}
            >
                {renderContent()}
            </div>

            <div
                className="absolute bottom-0 max-w-md w-full shadow-2xl bg-white flex justify-around items-start  border-t-0 border-b-0 rounded-b-[3rem] z-50"
                style={{ left: "50%", transform: "translateX(-50%)", height: '68px', }}
            >
                <NavButton label="Home" icon="🏠" view="home" currentView={currentView} setView={setView} />

                <div className="text-center -mt-4 cursor-pointer active:scale-95 transition">
                    <div className="w-14 h-14 rounded-full bg-orange-500 flex items-center justify-center text-white text-xl font-bold shadow-lg ring-4 ring-white">QR</div>
                </div>

                <NavButton label="History" icon="⇌" view="history" currentView={currentView} setView={setView} />
            </div>

            <HistoryComponent 
                isProfileOpen={isProfileOpen}
                setIsProfileOpen={setIsProfileOpen}
                handleLogout={handleLogout}
            />
        </div >
    );
};

const NavButton = ({ label, icon, view, currentView, setView }) => {
    const isActive = currentView === view || (view === 'home' && currentView === 'home');
    const colorClass = isActive ? 'text-indigo-800' : 'text-gray-500';

    return (
        <div
            onClick={() => setView(view)}
            className={`text-center pt-3 cursor-pointer transition active:scale-95 ${colorClass} hover:text-indigo-600`}
        >
            <span className="text-2xl">{icon}</span>
            <p className="m-0 text-xs font-bold leading-none mt-1">{label}</p>
        </div>
    );
};

export { PaymentAppUI }