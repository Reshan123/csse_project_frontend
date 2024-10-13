interface Age {
  years: number;
  months: number;
}

function calculateAge(dateOfBirth: string | undefined): Age {
    if (!dateOfBirth) {
       return { years: 0, months: 0 };
    }
  const dob = new Date(dateOfBirth);
  const today = new Date();

  let years = today.getFullYear() - dob.getFullYear();
  let months = today.getMonth() - dob.getMonth();

  if (months < 0) {
    years--;
    months += 12; 
  }

  // Adjust for day of the month
  if (today.getDate() < dob.getDate()) {
    months--; 
    if (months < 0) {
      years--; 
      months += 12; 
    }
  }

  return { years, months };
}

export { calculateAge };