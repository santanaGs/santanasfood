import { Link, usePage, useForm } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import LoadingButton from '@/Components/Button/LoadingButton';
import TextInput from '@/Components/Form/TextInput';
import SelectInput from '@/Components/Form/SelectInput';
import { Organization } from '@/types';
import FieldGroup from '@/Components/Form/FieldGroup';

const Create = () => {
  const { organizations } = usePage<{ organizations: Organization[] }>().props;
  const { data, setData, errors, post, processing } = useForm({
    category_name: '',
    description: '',
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    post(route('categories.store'));
  }

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold">
        <Link
          href={route('categories.index')}
          className="text-indigo-600 hover:text-indigo-700"
        >
          Categoria
        </Link>
        <span className="font-medium text-indigo-600"> /</span> Criar
      </h1>
      <div className="max-w-3xl overflow-hidden bg-white rounded shadow">
        <form onSubmit={handleSubmit}>
          <div className="grid gap-8 p-8 lg:grid-cols-2">
            <FieldGroup
              label="Nome"
              name="category_name"
              error={errors.category_name}
            >
              <TextInput
                name="category_name"
                error={errors.category_name}
                value={data.category_name}
                onChange={e => setData('category_name', e.target.value)}
              />
            </FieldGroup>

            <FieldGroup
              label="Descrição da categoria"
              name="description"
              error={errors.description}
            >
              <TextInput
                name="description"
                error={errors.description}
                value={data.description}
                onChange={e => setData('description', e.target.value)}
              />
            </FieldGroup>


          </div>
          <div className="flex items-center justify-end px-8 py-4 bg-gray-100 border-t border-gray-200">
            <LoadingButton
              loading={processing}
              type="submit"
              className="btn-indigo"
            >
              Criar assinatura
            </LoadingButton>
          </div>
        </form>
      </div>
    </div>
  );
};

/**
 * Persistent Layout (Inertia.js)
 *
 * [Learn more](https://inertiajs.com/pages#persistent-layouts)
 */
Create.layout = (page: React.ReactNode) => (
  <MainLayout title="Create Contact" children={page} />
);

export default Create;
