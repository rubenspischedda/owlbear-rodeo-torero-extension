import { Player } from "@owlbear-rodeo/sdk";
import { Token } from "./helpers/itemsHelpers";
import Overview from "./tabs/Overview";
import { useState } from "react";
import Party from "./tabs/Party";

enum Tab {
    Overview,
    Battle,
    Party,
    Monsters
}

export default function Home({ isReady, players, tokens, onImageClick }: { isReady: boolean, players: Player[], tokens: Token[], onImageClick: (token: Token) => void }) {
    const [currentTab, setCurrentTab] = useState<Tab>(Tab.Overview);
    const tabClass = 'border-transparent text-orange-100 hover:border-orange-200 hover:text-orange-300 group inline-flex items-center border-b-2 py-4 px-1 text-xs font-medium';
    const tabIconClass = 'text-orange-100 group-hover:text-orange-300 -ml-0.5 mr-2 h-4 w-4';
    const selectedTabClass = 'border-orange-400 text-orange-500 group inline-flex items-center border-b-2 py-4 px-1 text-xs font-medium';
    const selectedTabIconClass = 'text-orange-500 -ml-0.5 mr-2 h-4 w-4';

    return isReady ? (
        <>
            <div>
                <div className="block">
                    <div className="border-b-[1px]">
                        <nav className="-mb-[1.5px] flex space-x-4 justify-evenly" aria-label="Tabs">
                            <a onClick={() => setCurrentTab(Tab.Overview)} className={currentTab === Tab.Overview ? selectedTabClass : tabClass}>
                                <svg className={currentTab === Tab.Overview ? selectedTabIconClass : tabIconClass} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path d="M10 8a3 3 0 100-6 3 3 0 000 6zM3.465 14.493a1.23 1.23 0 00.41 1.412A9.957 9.957 0 0010 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 00-13.074.003z" />
                                </svg>
                                <span>Overview</span>
                            </a>
                            <a onClick={() => setCurrentTab(Tab.Battle)} href="#" className={currentTab === Tab.Battle ? selectedTabClass : tabClass}>
                                <svg className={currentTab === Tab.Battle ? selectedTabIconClass : tabIconClass} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fillRule="evenodd" d="M4 16.5v-13h-.25a.75.75 0 010-1.5h12.5a.75.75 0 010 1.5H16v13h.25a.75.75 0 010 1.5h-3.5a.75.75 0 01-.75-.75v-2.5a.75.75 0 00-.75-.75h-2.5a.75.75 0 00-.75.75v2.5a.75.75 0 01-.75.75h-3.5a.75.75 0 010-1.5H4zm3-11a.5.5 0 01.5-.5h1a.5.5 0 01.5.5v1a.5.5 0 01-.5.5h-1a.5.5 0 01-.5-.5v-1zM7.5 9a.5.5 0 00-.5.5v1a.5.5 0 00.5.5h1a.5.5 0 00.5-.5v-1a.5.5 0 00-.5-.5h-1zM11 5.5a.5.5 0 01.5-.5h1a.5.5 0 01.5.5v1a.5.5 0 01-.5.5h-1a.5.5 0 01-.5-.5v-1zm.5 3.5a.5.5 0 00-.5.5v1a.5.5 0 00.5.5h1a.5.5 0 00.5-.5v-1a.5.5 0 00-.5-.5h-1z" clipRule="evenodd" />
                                </svg>
                                <span>Battle</span>
                            </a>
                            <a onClick={() => setCurrentTab(Tab.Party)} href="#" className={currentTab === Tab.Party ? selectedTabClass : tabClass}>
                                <svg className={currentTab === Tab.Party ? selectedTabIconClass : tabIconClass} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path d="M7 8a3 3 0 100-6 3 3 0 000 6zM14.5 9a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM1.615 16.428a1.224 1.224 0 01-.569-1.175 6.002 6.002 0 0111.908 0c.058.467-.172.92-.57 1.174A9.953 9.953 0 017 18a9.953 9.953 0 01-5.385-1.572zM14.5 16h-.106c.07-.297.088-.611.048-.933a7.47 7.47 0 00-1.588-3.755 4.502 4.502 0 015.874 2.636.818.818 0 01-.36.98A7.465 7.465 0 0114.5 16z" />
                                </svg>
                                <span>Party</span>
                            </a>
                            <a onClick={() => setCurrentTab(Tab.Monsters)} href="#" className={currentTab === Tab.Monsters ? selectedTabClass : tabClass}>
                                <svg className={currentTab === Tab.Monsters ? selectedTabIconClass : tabIconClass} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fillRule="evenodd" d="M2.5 4A1.5 1.5 0 001 5.5V6h18v-.5A1.5 1.5 0 0017.5 4h-15zM19 8.5H1v6A1.5 1.5 0 002.5 16h15a1.5 1.5 0 001.5-1.5v-6zM3 13.25a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5a.75.75 0 01-.75-.75zm4.75-.75a.75.75 0 000 1.5h3.5a.75.75 0 000-1.5h-3.5z" clipRule="evenodd" />
                                </svg>
                                <span>Monsters</span>
                            </a>
                        </nav>
                    </div>
                </div>
            </div>
            <div className='px-4'>{currentTab === Tab.Overview && <Overview tokens={tokens} players={players} onImageClick={onImageClick} /> }</div>
            <div className='px-4'>{currentTab === Tab.Party && <Party /> }</div>
        </>
    ) : (
        <div className='text-white'>Loading...</div>
    )
}
