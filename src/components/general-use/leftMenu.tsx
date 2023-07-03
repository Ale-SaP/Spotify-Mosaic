'use client'

import SelectorButton from "./selectorButtons"

export default function LeftMenu() {
    return (
        <div className="sticky pt-8">
            <div className="flex flex-col items-center justify-center bg-zinc-950 rounded">
                <div className="">
                    <div className="join flex pt-4">
                        <input className="input input join-item" placeholder="Playlist..." />
                        <button className="btn join-item rounded-r-full">Filter!</button>
                    </div>

                    <div className="join join-vertical lg:join-horizontal py-4">
                        <SelectorButton />
                    </div>
                </div>
            </div>
        </div>
    )
}