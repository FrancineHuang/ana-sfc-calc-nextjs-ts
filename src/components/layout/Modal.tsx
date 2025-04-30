"use client";

import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Flight } from "../../types/Flight";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { addFlight, editFlight } from "../../lib/features/flights/flightsSlice";
import { FlightForm, FlightFormData } from "../flights/flight-form";

function Modal({
  button,
  flightData = {},
  id = "",
}: {
  button: () => React.ReactNode;
  flightData?: Partial<Flight>;
  id?: string;
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  async function handleSubmit(values: FlightFormData) {
    setIsSubmitting(true);

    try {
      // Calculate the unit price of premium points
      const totalCost = values.ticketPrice + (values.otherExpenses || 0);
      const ppUnitPrice = totalCost / values.earnedPP;

      if (id && id.trim() !== "") {
        // edit existing flight
        const updatedFlight: Flight = {
          ...values,
          id,
          ppUnitPrice: Number(ppUnitPrice.toFixed(2)),
        };
        await dispatch(editFlight(updatedFlight) as any);
      } else {
        // add new flight
        const newFlight: Omit<Flight, 'id'> = {
          ...values,
          ppUnitPrice: Number(ppUnitPrice.toFixed(2)),
        };
        await dispatch(addFlight(newFlight) as any);
        router.push("/results");
      }

      setIsDialogOpen(false);

    } catch (error) {

    }
    
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>{button()}</DialogTrigger>
      <DialogContent className="max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="mb-4">フライトを追加</DialogTitle>
          <FlightForm defaultValues={flightData} onSubmit={handleSubmit} />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default Modal;