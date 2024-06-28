import { Link, usePage } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import Pagination from '@/Components/Pagination/Pagination';
import FilterBar from '@/Components/FilterBar/FilterBar';
import { Contact, PaginatedData } from '@/types';

import { useEffect } from 'react';
import Table from '@/Components/Table/Table';
import { Trash2 } from 'lucide-react';

const Index = () => {
	const { categories, filters } = usePage().props;



	useEffect(() => {
		console.log(categories)
	}, [])

	return (
		<div>
			<h1 className="mb-8 text-3xl font-bold">Categorias</h1>
			<div className="flex items-center justify-between mb-6">
				<FilterBar />
				<Link
					className="btn-indigo focus:outline-none"
					href={route('categories.create')}
				>
					<span>Criar</span>
					<span className="hidden md:inline"> Categoria</span>
				</Link>
			</div>
			<Table
				columns={[
					{
						label: 'Nome',
						name: 'name',
						renderCell: row => (
							<>
								{row.name}
								{row.deleted_at && (
									<Trash2 size={16} className="ml-2 text-gray-400" />
								)}
							</>
						)
					},
					{ label: 'Descrição', name: 'description' },
				]}
				rows={categories.data}
				getRowDetailsUrl={row => route('categories.edit', row.id)}
			/>
			<Pagination links={categories.links} />
		</div>
	);
};

/**
 * Persistent Layout (Inertia.js)
 *
 * [Learn more](https://inertiajs.com/pages#persistent-layouts)
 */
Index.layout = (page: React.ReactNode) => (
	<MainLayout title="Categories" children={page} />
);

export default Index;
