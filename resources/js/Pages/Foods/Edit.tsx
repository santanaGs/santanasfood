import React, { useEffect } from 'react';
import { Head } from '@inertiajs/react';
import { Link, usePage, useForm, router } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import DeleteButton from '@/Components/Button/DeleteButton';
import LoadingButton from '@/Components/Button/LoadingButton';
import TextInput from '@/Components/Form/TextInput';
import TrashedMessage from '@/Components/Messages/TrashedMessage';
import { Contact, Organization } from '@/types';
import FieldGroup from '@/Components/Form/FieldGroup';
import SelectInput from '@/Shared/SelectInput';

const Edit = () => {
  const { food, categories } = usePage<any>().props;



  const { data, setData, errors, put, processing } = useForm({
    name: food.name || '',
    description: food.description || '',
    price: food.price || '',
    category_id: food.category_id || '',
  });

  useEffect(() => {
    const filteredCategories = categories.filter((item: any) => item.id === food.category_id);
    console.log(filteredCategories);
  }, [])

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    put(route('foods.update', food.id));
  }

  function destroy() {
    if (confirm('Tem certeza que deseja excluir esse lanche?')) {
      router.delete(route('foods.destroy', food.id));
    }
  }

  function restore() {
    if (confirm('Tem certeza de que deseja restaurar este lanche?')) {
      router.put(route('foods.restore', food.id));
    }
  }

  return (
    <div>
      <Head title={`${food.name} ${food.description}`} />
      <h1 className="mb-8 text-3xl font-bold">
        <Link
          href={route('foods.index')}
          className="text-indigo-600 hover:text-indigo-700"
        >
          Lanches
        </Link>
        <span className="mx-2 font-medium text-indigo-600">/</span>
        {food.name}
      </h1>
      {food.deleted_at && (
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

            <FieldGroup
              label="Preço"
              name="price"
              error={errors.price}
            >
              <TextInput
                name="price"
                error={errors.price}
                value={new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                }).format(data.price)}
                onChange={e => setData('price', e.target.value)}
              />
            </FieldGroup>

            <SelectInput
              className
              label={'Categoria'}
              required
              name="category_id"
              value={data.category_id}
              onChange={e => setData("category_id", e.target.value)}
            >
              <option value="" disabled selected>
                Selecione...
              </option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </SelectInput>

          </div>
          <div className="flex items-center px-8 py-4 bg-gray-100 border-t border-gray-200">
            {!food.deleted_at && (
              <DeleteButton onDelete={destroy}>Deletar Lanche</DeleteButton>
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
