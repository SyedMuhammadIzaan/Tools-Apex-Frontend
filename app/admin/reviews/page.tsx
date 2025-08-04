"use client";
import { getAllReviews } from '@/services/review.service';
import { Review } from '@/types';
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

const ReviewPage = () => {
    // const router=useRouter();

    const [reviews,setReviews]=useState<Review[]>([]);
    useEffect(()=>{
        const fetchAllReview=async ()=>{
            try {
                const {data}=await getAllReviews();
                setReviews(data);
            } catch (error) {
                console.log("Error fetching Review",error)
            }
        }
        fetchAllReview();
    },[]);

    const reviewColumn=[
        {
            header: "ID",
            accessor: "_id",
            cell: (value: string) => <span>{value}</span>
        },
        {
            header:"Customer Name",
            accessor:"name",
            cell:(value:string)=><span className='font-medium'>{value}</span>
        },
        {
            header:"Date",
            accessor:"date",
            cell:(value:string)=><span>{value}</span>
        },
        {
            header:"Rating",
            accessor:"rating",
            cell:(value:string)=><span>{value}</span>
        },
        {
            header:"Comment",
            accessor:"comment",
            cell:(value:string)=><span className='font-medium'>{value}</span>
        },
    ]
  return (
    <div>
        
    </div>
  )
}

export default ReviewPage