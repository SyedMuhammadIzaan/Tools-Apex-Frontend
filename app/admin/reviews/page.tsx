"use client";
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { deleteReviewById, getAllReviews } from '@/services/review.service';
import { Review, ReviewColumnType } from '@/types';
import { Pencil, Trash2 } from 'lucide-react';
import React, { useEffect, useState } from 'react'

const ReviewPage = () => {
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(true);
    const [reviews, setReviews] = useState<Review[]>([]);
    useEffect(() => {
        const fetchAllReview = async () => {
            try {
                const { data } = await getAllReviews();
                setReviews(data);
            } catch (error) {
                console.log("Error fetching Review", error)
            }finally{
                setLoading(false)
            }
        }
        fetchAllReview();
    }, []);

    const reviewColumn: ReviewColumnType[] = [
        {
            header: "ID",
            accessor: "_id",
            cell: (value: string) => <span>{value}</span>
        },
        {
            header: "Customer Name",
            accessor: "name",
            cell: (value: string) => <span className='font-medium'>{value}</span>
        },
        {
            header: "Date",
            accessor: "date",
            cell: (value: string) => <span>{value}</span>
        },
        {
            header: "Rating",
            accessor: "rating",
            cell: (value: string) => <span>{value}</span>
        },
        {
            header: "Comment",
            accessor: "comment",
            cell: (value: string) => <span className='font-medium'>{value}</span>
        },
        {
            header: "Actions",
            accessor: "_id",
            cell: (value: string) => (
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => router.push(`/admin/reviews/update/${value}`)}
                    >
                        <Pencil className="w-4 h-4 mr-1" /> Edit
                    </Button>
                    <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(`${value}`)}
                    >
                        <Trash2 className="w-4 h-4 mr-1" /> Delete
                    </Button>
                </div>
            ),
        },
    ]
    const handleClick = () => {
        router.push("/admin/reviews/create")
    }
    const handleDelete = async (id: string) => {
        try {
            await deleteReviewById(id)
            alert("Review Deleted");
        } catch (error) {
            console.log("Couldn't Delete the Review");
        }
    }
    if (loading) {
        return <div>Loading blogs...</div>
    }
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Reviews</h1>
            <div className="flex justify-end">
                <Button className="bg-blue-700 hover:bg-blue-800" onClick={handleClick}>
                    Create Review
                </Button>
            </div>
            <DataTable data={reviews} columns={reviewColumn} className="border rounded-lg shadow-sm" />
        </div>
    )
}

export default ReviewPage