// src/types/ServiceWithUI.ts
import { Service } from './index';

export interface ServiceWithUI extends Service {
  providerName: string;   // derived from service.profiles.display_name
  rating: number;
  reviews: number;
  price_range: string;
}
