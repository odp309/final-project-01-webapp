export interface DashboardTable {
    month: [{
      january: DashboardEntry[],
      february: DashboardEntry[],
      march: DashboardEntry[],
      april: DashboardEntry[],
      may: DashboardEntry[],
      june: DashboardEntry[],
      july: DashboardEntry[],
      august: DashboardEntry[],
      september: DashboardEntry[],
      october: DashboardEntry[],
      november: DashboardEntry[],
      december: DashboardEntry[]
    }];
  }
  
  interface DashboardEntry {
    totalAmount: number;
    reservationDate: string;
    currencyCode: string;
  }