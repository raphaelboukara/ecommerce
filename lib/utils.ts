import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  return (price / 100).toLocaleString('fr-FR', {
    style: 'currency',
    currency: 'EUR',
  });
}

export function formatDate(timestamp: number): string {
  const date = new Date(timestamp);
  const dayName = new Intl.DateTimeFormat('fr-FR', { weekday: 'long' }).format(date);
  const day = date.getDate();
  const month = new Intl.DateTimeFormat('fr-FR', { month: 'long' }).format(date);
  const year = date.getFullYear();
  
  let hours = date.getHours();
  const ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12;
  
  const minutes = date.getMinutes().toString().padStart(2, '0');
  
  const capitalizedDay = dayName.charAt(0).toUpperCase() + dayName.slice(1);
  const capitalizedMonth = month.charAt(0).toUpperCase() + month.slice(1);
  
  return `${capitalizedDay} ${day} ${capitalizedMonth} ${year} à ${hours}:${minutes}${ampm}`;
}

type Address = {
  city?: string | null;
  country?: string | null;
  line1?: string | null;
  line2?: string | null;
  postal_code?: string | null;
  state?: string | null;
}

export function formatAddress(address: Address): string {
  // Capitalize each word in the address line and city
  const formatLine = (text: string | null | undefined): string => {
    if (!text) {
      return '';
    }
    
    return text
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  // Format the building number and street
  const line1 = formatLine(address.line1);
  
  // Build address parts
  const addressParts = [
    line1,
    address.line2 ? formatLine(address.line2) : null,
    `${address.postal_code} ${formatLine(address.city)}`,
    // Map country codes to full names in French
    address.country === 'IL' ? 'ISRAËL' : address.country
  ];

  // Filter out null/empty values and join with newlines
  return addressParts
    .filter(part => part !== null && part !== '')
    .join('\n')
    .toUpperCase(); // French formal addresses are typically in uppercase
}