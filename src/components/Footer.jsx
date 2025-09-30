import React from 'react'

const footer = () => {
    return (
        
        <div className='bg-slate-800 flex flex-col justify-center items-center fixed bottom-0 w-full'>
            <div>
                <div className='text-center text-2xl font-bold text-white'>vault
                    <span className='text-green-400'>IO</span></div>
            </div>
            <div className='flex gap-2 text-white text-xs'>
                <span>Created with </span>
                 <img className='w-5' src="/public/icons/heart.png" alt="" />
                 <span> by Taifoor Ansari</span>
            </div>
            
        </div>
    )
}

export default footer

