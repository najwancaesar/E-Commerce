export function validateCheckout(values) {
  const errors = {};

  // Required fields
  if (!values.fullName?.trim()) errors.fullName = "Nama wajib diisi";
  if (!values.email?.trim()) errors.email = "Email wajib diisi";
  if (!values.phone?.trim()) errors.phone = "No HP wajib diisi";
  if (!values.address?.trim()) errors.address = "Alamat wajib diisi";

  // Simple format check (cukup untuk UAS)
  if (values.email && !/^\S+@\S+\.\S+$/.test(values.email)) errors.email = "Format email tidak valid";
  if (values.phone && !/^[0-9+\-\s]{8,}$/.test(values.phone)) errors.phone = "No HP tidak valid";

  return errors;
}
