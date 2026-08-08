/** Container de 1280px com gutter 24/40. */
export function Container({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`container-site ${className}`}>{children}</div>;
}
