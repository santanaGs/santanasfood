import MainMenuItem from '@/Components/Menu/MainMenuItem';
import { Building, CircleGauge, Beer, Utensils, Pizza } from 'lucide-react';

interface MainMenuProps {
  className?: string;
}

export default function MainMenu({ className }: MainMenuProps) {
  return (
    <div className={className}>
      <MainMenuItem
        text="Dashboard"
        link="dashboard"
        icon={<CircleGauge size={20} />}
      />
      <MainMenuItem
        text="Lanches"
        link="foods.index"
        icon={<Pizza size={20} />}
      />
      <MainMenuItem
        text="Bebidas"
        link="categories.index"
        icon={<Beer size={20} />}
      />
      <MainMenuItem
        text="Categorias"
        link="categories.index"
        icon={<Utensils size={20} />}
      />
      {/* <MainMenuItem
        text="Contacts"
        link="contacts"
        icon={<Users size={20} />}
      /> */}
      {/* <MainMenuItem
        text="Reports"
        link="reports"
        icon={<Printer size={20} />}
      /> */}
    </div>
  );
}
