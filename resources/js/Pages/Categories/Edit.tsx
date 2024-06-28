import React, { useEffect } from 'react';
import { Head } from '@inertiajs/react';
import { Link, usePage, useForm, router } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import DeleteButton from '@/Components/Button/DeleteButton';
import LoadingButton from '@/Components/Button/LoadingButton';
import TextInput from '@/Components/Form/TextInput';
import SelectInput from '@/Components/Form/SelectInput';
import TrashedMessage from '@/Components/Messages/TrashedMessage';
import { Contact, Organization } from '@/types';
import FieldGroup from '@/Components/Form/FieldGroup';

const Edit = () => {
  const { category } = usePage().props;

  useEffect(() => {
    console.log(category)
  }, [])

  const { data, setData, errors, put, processing } = useForm({
    name: category.name || '',
    description: category.description || '',
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    put(route('categories.update', category.id));
  }

  function destroy() {
    if (confirm('Are you sure you want to delete this contact?')) {
      router.delete(route('categories.destroy', category.id));
    }
  }

  function restore() {
    if (confirm('Are you sure you want to restore this contact?')) {
      router.put(route('categories.restore', category.id));
    }
  }

  return (
    <div>
      <Head title={`${category.name} ${category.description}`} />
      <h1 className="mb-8 text-3xl font-bold">
        <Link
          href={route('categories.index')}
          className="text-indigo-600 hover:text-indigo-700"
        >
          Categoria
        </Link>
        <span className="mx-2 font-medium text-indigo-600">/</span>
        {category.name}
      </h1>
      {category.deleted_at && (
        <TrashedMessage
          message="This contact has been deleted."
          onRestore={restore}
        />
      )}

      <div className="max-w-3xl overflow-hidden bg-white rounded shadow">
        <form onSubmit={handleSubmit}>
          <div className="grid gap-8 p-8 lg:grid-cols-2">
            <FieldGroup
              label="Nome da categoria"
              name="name"
              error={errors.name}
            >
              <TextInput
                name="name"
                error={errors.name}
                value={data.name}
                onChange={e => setData('name', e.target.value)}
              />
            </FieldGroup>

            <FieldGroup
              label="Descrição"
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
          <div className="flex items-center px-8 py-4 bg-gray-100 border-t border-gray-200">
            {!category.deleted_at && (
              <DeleteButton onDelete={destroy}>Deletar Categoria</DeleteButton>
            )}
            <LoadingButton
              loading={processing}
              type="submit"
              className="ml-auto btn-indigo"
            >
              Atualizar Categoria
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
Edit.layout = (page: React.ReactNode) => <MainLayout children={page} />;

export default Edit;
