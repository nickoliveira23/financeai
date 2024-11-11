interface PercentageItemProps {
  icon: React.ReactNode;
  title: string;
  value: number;
}

const PercentageItem = ({ icon, title, value }: PercentageItemProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        {icon}
        <p className="text-sm font-medium">{title}</p>
      </div>
      <p className="text-sm text-muted-foreground">
        <p className="text-sm font-bold">{value}%</p>
      </p>
    </div>
  );
};

export default PercentageItem;
