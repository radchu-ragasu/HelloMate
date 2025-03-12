// app/types/navigation.ts
export type RootStackParamList = {
    Home: undefined;
    OrderScreen6: { 
      orderData: {
        id: string;
        status: string;
        address: string;
        serviceType: string;
        orderDate: string;
        details: string;
        attachments?: string[];
      }
    };
    // Add other screen params as needed
  };