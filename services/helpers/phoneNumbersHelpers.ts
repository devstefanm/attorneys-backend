export const mapPhoneNumberForDisplay = (phoneNumber: string): string => {
  if (phoneNumber.length >= 8 && phoneNumber.length <= 13) {
    if (phoneNumber.startsWith('0')) {
      // If it starts with '0', insert '/' after the next two digits
      return `${phoneNumber.slice(0, 3)}/${phoneNumber.slice(3)}`;
    } else {
      // Remove the first three digits and the plus sign
      const transformedNumber = phoneNumber.slice(3);
      // Insert '0' at the beginning and '/' after the next two digits
      return `0${transformedNumber.slice(1, 3)}/${transformedNumber.slice(3)}`;
    }
  }
  return phoneNumber;
};
