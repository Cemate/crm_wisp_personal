import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export function RecentPayments() {
  const payments = [
    {
      client: "Juan Pérez",
      email: "juan@example.com",
      amount: "$500.00",
      date: "Hace 2 horas",
    },
    {
      client: "María López",
      email: "maria@example.com",
      amount: "$750.00",
      date: "Hace 5 horas",
    },
    {
      client: "Carlos Rodríguez",
      email: "carlos@example.com",
      amount: "$300.00",
      date: "Hace 1 día",
    },
    {
      client: "Ana Martínez",
      email: "ana@example.com",
      amount: "$1,000.00",
      date: "Hace 2 días",
    },
    {
      client: "Roberto Sánchez",
      email: "roberto@example.com",
      amount: "$500.00",
      date: "Hace 3 días",
    },
  ]

  return (
    <div className="space-y-8">
      {payments.map((payment, index) => (
        <div key={index} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarFallback>
              {payment.client
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{payment.client}</p>
            <p className="text-sm text-muted-foreground">{payment.email}</p>
          </div>
          <div className="ml-auto font-medium">{payment.amount}</div>
        </div>
      ))}
    </div>
  )
}

