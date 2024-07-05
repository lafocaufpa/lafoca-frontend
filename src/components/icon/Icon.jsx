
export default function Icon({ IconComponent, size = 20, className = '', ...props }) {
  return <IconComponent size={size} className={className} {...props} />;
}