/* eslint-disable @next/next/no-img-element */
'use client'
import React from 'react'
import { useCurrentAccount, useCurrentWallet } from '@mysten/dapp-kit';
import { shortenEthAddress } from '@/utils/shortenEthAddress';
const AccountModel = () => {
    const currentAccount = useCurrentAccount();
    const { connectionStatus } = useCurrentWallet();
    return (
        <div className='flex gap-x-4 justify-center items-center'>
            <div className='w-10 h-10 bg-white rounded-[8px]'>
                <img 
                 src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnQxE9Qwzoz_W4RlSV0v1Fs3NA0601JBpfeA&s'
                 className='rounded-[8px] object-contain'
                 alt='avatar'
                />
            </div>
            <div>
                {shortenEthAddress(currentAccount?.address)}
                <p className='text-lime-400'>{connectionStatus}</p>
            </div>

        </div>
    )
}

export default AccountModel