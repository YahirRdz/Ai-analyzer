/**
 * Formats a file size in bytes to a human-readable string (KB, MB, GB, TB)
 * @param bytes - The size in bytes to format
 * @param decimals - Number of decimal places to include (default: 2)
 * @returns A formatted string representing the size with appropriate unit
 */
export function formatSize(bytes: number, decimals: number = 2): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  
  // Determine the appropriate unit by calculating log with base 1024
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  // Convert to the appropriate unit and round to specified decimal places
  return parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)) + ' ' + sizes[i];
}