/**
 * Utility function for merging Tailwind CSS classes conditionally
 */
export function cn(...classes: (string | undefined | boolean)[]) {
  return classes.filter(Boolean).join(' ')
}
