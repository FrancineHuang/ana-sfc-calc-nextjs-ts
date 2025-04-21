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
  const router = useRouter();
  const dispatch = useDispatch();

  function handleSubmit(values: FlightFormData) {
    const newId = id || uuidv4();
    // Calculate the unit price of premium points
    const totalCost = values.ticketPrice + (values.otherExpenses || 0);
    const ppUnitPrice = totalCost / values.earnedPP;

    const newFlight: Flight = {
      ...values,
      id: newId,
      ppUnitPrice: Number(ppUnitPrice.toFixed(2)),
    };

    if (id && id.trim() !== "") {
      // edit existing flight
      dispatch(editFlight(newFlight));
    } else {
      // add new flight
      dispatch(addFlight(newFlight));
      router.push("/results");
    }

    setIsDialogOpen(false);
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