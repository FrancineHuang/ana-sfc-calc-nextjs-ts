"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Flight } from "../../types/Flight";
import { useForm } from "react-hook-form";
import { z } from "zod";

// 表单验证规则从Modal组件中提取
const formSchema = z.object({
  boardingDate: z.string().min(1, "搭乗日は必須です"),
  departure: z.string().min(1, "出発地は必須です"),
  destination: z.string().min(1, "目的地は必須です"),
  flightNumber: z.string().min(1, "便名は必須です"),
  ticketPrice: z.coerce
    .number({
      required_error: "航空券代は必須です",
      invalid_type_error: "有効な数字を入力してください",
    })
    .positive("正の数を入力してください"),
  fareType: z.string().min(1, "運賃種別は必須です"),
  otherExpenses: z.coerce.number().optional(),
  earnedPP: z.coerce
    .number({
      required_error: "獲得PPは必須です",
      invalid_type_error: "有効な数字を入力してください",
    })
    .positive("正の数を入力してください"),
  status: z.string().optional(),
});

export type FlightFormData = z.infer<typeof formSchema>;

interface FlightFormProps {
  defaultValues?: Partial<Flight>;
  onSubmit: (values: FlightFormData) => void;
}

export function FlightForm({ defaultValues = {}, onSubmit }: FlightFormProps) {
  const form = useForm<FlightFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      boardingDate: defaultValues.boardingDate || "",
      departure: defaultValues.departure || "",
      destination: defaultValues.destination || "",
      flightNumber: defaultValues.flightNumber || "",
      ticketPrice: defaultValues.ticketPrice || undefined,
      fareType: defaultValues.fareType || "",
      otherExpenses: defaultValues.otherExpenses || undefined,
      earnedPP: defaultValues.earnedPP || undefined,
      status: defaultValues.status || "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* 搭乗日 Boarding Date */}
        <FormField
          control={form.control}
          name="boardingDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>搭乗日</FormLabel>
              <FormControl>
                <Input placeholder="例: 2025/04/20" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* 出発地 Departure */}
        <FormField
          control={form.control}
          name="departure"
          render={({ field }) => (
            <FormItem>
              <FormLabel>出発地</FormLabel>
              <FormControl>
                <Input placeholder="例: 東京 羽田" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* 目的地 Destination */}
        <FormField
          control={form.control}
          name="destination"
          render={({ field }) => (
            <FormItem>
              <FormLabel>目的地</FormLabel>
              <FormControl>
                <Input placeholder="例: 沖縄 那覇" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* 便名 Flight Number */}
        <FormField
          control={form.control}
          name="flightNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>便名</FormLabel>
              <FormControl>
                <Input placeholder="例: NH477" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* 航空券代 Ticket Price */}
        <FormField
          control={form.control}
          name="ticketPrice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>航空券代</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="例: 14900"
                  {...field}
                  onChange={(e) =>
                    field.onChange(
                      e.target.value === ""
                        ? undefined
                        : Number(e.target.value)
                    )
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* 運賃種別 Fare Type */}
        <FormField
          control={form.control}
          name="fareType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>運賃種別</FormLabel>
              <FormControl>
                <Input placeholder="例: SV75" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* その他費用 Other Expenses */}
        <FormField
          control={form.control}
          name="otherExpenses"
          render={({ field }) => (
            <FormItem>
              <FormLabel>その他費用</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="例: 1180"
                  {...field}
                  onChange={(e) =>
                    field.onChange(
                      e.target.value === ""
                        ? undefined
                        : Number(e.target.value)
                    )
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* 獲得PP Earned Premium Points */}
        <FormField
          control={form.control}
          name="earnedPP"
          render={({ field }) => (
            <FormItem>
              <FormLabel>獲得PP</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="例: 1476"
                  {...field}
                  onChange={(e) =>
                    field.onChange(
                      e.target.value === ""
                        ? undefined
                        : Number(e.target.value)
                    )
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* ステータス Status */}
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ステータス</FormLabel>
              <FormControl>
                <Input placeholder="例: 未 / 済" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">保存する</Button>
      </form>
    </Form>
  );
}

export { formSchema };