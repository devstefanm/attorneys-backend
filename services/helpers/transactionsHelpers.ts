import { HeadersRecord } from 'services/transactionsServices/transactionsServicesData';

export const reverseHeaderMapping = (importedHeaders: string[]): string[] => {
  const reversedHeaders = importedHeaders.map((header) => {
    // Try to find a matching header in the reverse mapping
    const reversedHeader = Object.keys(HeadersRecord).find((key) =>
      header.includes(HeadersRecord[key]),
    );

    // Use the original header if a match is found, or keep the imported header
    return reversedHeader || header;
  });

  return reversedHeaders;
};

export const transformTransactionType = (input: string): string => {
  const wordMap: { [key: string]: string } = {
    Uplata: 'payment',
    Taksa: 'fee',
    'Sudska taksa': 'legal_fee',
    'Povlačenje predmeta': 'withdrawal',
  };

  // Check if the input word exists in the map, and return the corresponding transformed word.
  if (wordMap.hasOwnProperty(input)) {
    return wordMap[input];
  } else {
    // If the input word is not found in the map, return it as is.
    return input;
  }
};

export const trimSemicolons = (input: string): string => {
  // Use the String.replace() method to replace all semicolons with an empty string.
  return input.replace(/;/g, '');
};
