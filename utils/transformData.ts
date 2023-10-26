export const capitalizeEveryWord = (sentence: string): string => {
  // Split the sentence into words
  const words = sentence.split(' ');

  // Capitalize the first letter of each word and join them back together
  const capitalizedWords = words.map((word) => {
    if (word.length === 0) {
      return '';
    }
    return word[0].toUpperCase() + word.slice(1);
  });

  // Join the capitalized words with spaces to form the final sentence
  const capitalizedSentence = capitalizedWords.join(' ');

  return capitalizedSentence;
};

// Function to convert "YYYY-MM-DDTHH:mm:ss.sssZ" to "DD.MM.YYYY"
export const formatDateToDDMMYYYY = (inputDate: string): string => {
  const date = new Date(inputDate);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = String(date.getFullYear());
  return `${day}.${month}.${year}`;
};

// Function to convert "DD.MM.YYYY" to "YYYY-MM-DDTHH:mm:ss.sssZ"
export const formatDateToISO = (inputDate: string): string | null => {
  const dateParts = inputDate.split('.');
  if (dateParts.length === 3) {
    const day = parseInt(dateParts[0], 10);
    const month = parseInt(dateParts[1], 10) - 1; // Months are 0-based in JavaScript
    const year = parseInt(dateParts[2], 10);
    if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
      const date = new Date(year, month, day);
      if (!isNaN(date.getTime())) {
        return date.toISOString();
      }
    }
  }
  return null; // Invalid input
};

export const uppercaseFirstLetter = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);

export const formatImportNames = (input: string): string => {
  // Replace dots, commas, and multiple whitespaces with a single space
  const cleanedString = input.replace(/\s+/g, ' ');

  // Uppercase the first letter of every word
  const words = cleanedString.split(/\s+/);

  // Capitalize the first letter of each word
  const formattedWords = words.map((word) => {
    if (word.length > 0) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    }
    return word; // If the word is empty, preserve it as is
  });

  // Join the words back together with spaces
  const formattedString = formattedWords.join(' ');

  return formattedString;
};
