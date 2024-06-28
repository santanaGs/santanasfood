import { Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';

function DashboardPage() {
  return (
    <div className="text-center">
      <h1 className="mb-8 text-5xl font-bold text-lime-500">Santana's Lanches</h1>
      <p className="mb-12 leading-normal text-lg">
        Gerencie sua lanchonete de forma mais rápida
      </p>
      <img src="https://street-puce.vercel.app/assets/hamb-2.png" alt="Imagem" className="mx-auto mb-8 max-w-full h-auto" />
    </div>

  );
}

/**
 * Persistent Layout (Inertia.js)
 *
 * [Learn more](https://inertiajs.com/pages#persistent-layouts)
 */
DashboardPage.layout = (page: React.ReactNode) => (
  <MainLayout title="Dashboard" children={page} />
);

export default DashboardPage;
