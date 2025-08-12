"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { getReviewById, updateReviewById } from "@/services/review.service";
import { Review } from "@/types";

export default function UpdateReviewPage() {
  const router = useRouter();
  const { reviewId } = useParams() as { reviewId: string };
  console.log("Id",reviewId)

  const [review, setReview] = useState<Partial<Review>>({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchReview = async (reviewId: string) => {
      try {
        const {data} = await getReviewById(reviewId);
        console.log("Data",data)
        setReview(data);
      } catch (error) {
        console.error("Failed to fetch review", error);
      }
    };

    if (reviewId) fetchReview(reviewId);
  }, [reviewId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setReview((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      await updateReviewById(reviewId, {
        name: review.name || "",
        comment: review.comment || "",
        rating: Number(review.rating),
        date: review.date || new Date(),
      });
      alert("Review Updated")
      router.push("/admin/reviews");
    } catch (error) {
      console.error("Update failed", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Update Review</h1>
      <label className="block text-sm font-medium mb-2">Customer Name*</label>
      <Input
        name="name"
        value={review.name || ""}
        onChange={handleChange}
        placeholder="Enter reviewer name"
      />
      <label className="block text-sm font-medium mb-2">Comment</label>
      <Textarea
        name="comment"
        value={review.comment || ""}
        onChange={handleChange}
        placeholder="Write your comment here"
      />
      <label className="block text-sm font-medium mb-2">Rating</label>
      <Input
        type="number"
        name="rating"
        value={review.rating?.toString() || ""}
        onChange={handleChange}
        placeholder="Enter rating (1–5)"
        min={1}
        max={5}
      />
      <label className="block text-sm font-medium mb-2">Date</label>
      <Input
        type="date"
        name="date"
        value={review.date?.substring(0, 10) || ""}
        onChange={handleChange}
        placeholder="Enter review date"
      />

      <Button className="bg-yellow-400 text-black hover:bg-yellow-500" onClick={handleSubmit} disabled={submitting}>
        {submitting ? "Updating..." : "Update Review"}
      </Button>
    </div>
  );
}
