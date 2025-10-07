import React from 'react'

const Navbar = () => {
    return (
        <div className='bg-slate-700  '>
            <div className=" px-2 md:px-40 mx-auto w-[100%] text-white flex justify-between min-h-12 items-center">
                <span className='px-5 font-bold text-xl'>vault
                    <span className='text-green-400'>IO</span></span>
                <a href="https://github.com/TaifoorAnsari/vaultIO---Password-manager" target='_blank'>
                    <button className='flex mx-4 hover:cursor-pointer bg-green-700 rounded-full gap-2 p-1 ring-1 ring-white'>
                        <img className='invert' src="/public/icons/github.png" alt="" />
                        <span className='font-bold px-2'>GitHub</span>
                    </button>
                </a>
            </div>
        </div>
    )
}

export default Navbar
