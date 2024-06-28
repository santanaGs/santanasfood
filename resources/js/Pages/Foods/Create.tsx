import { Link, usePage, useForm } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import LoadingButton from '@/Components/Button/LoadingButton';
import TextInput from '@/Components/Form/TextInput';
import { Organization } from '@/types';
import FieldGroup from '@/Components/Form/FieldGroup';
import SelectInput from '@/Shared/SelectInput';
import FileInput2 from '@/Components/FileInput2';

const Create = () => {
  const { categories } = usePage().props;
  const { data, setData, errors, post, processing } = useForm({
    name: '',
    category_id: '',
    description: '',
    price: '',
    photo_path: '',
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    post(route('foods.store'));
  }

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold">
        <Link
          href={route('categories.index')}
          className="text-indigo-600 hover:text-indigo-700"
        >
          Lanches
        </Link>
        <span className="font-medium text-indigo-600"> /</span> Criar
      </h1>
      <div className="max-w-3xl overflow-hidden bg-white rounded shadow">
        <form onSubmit={handleSubmit}>
          <div className="grid gap-8 p-8 lg:grid-cols-2">
            <FieldGroup
              label="Nome"
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

            <FieldGroup
              label="Preço"
              name="price"
              error={errors.price}
            >
              <TextInput
                name="price"
                error={errors.price}
                value={data.price}
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


            <FileInput2
              className=""
              label="Banner"
              name="photo_path"
              accept="image/*"
              errors={errors.photo_path}
              value={data.photo_path}
              onChange={(photo_path) => setData("photo_path", photo_path)}
            />

          </div>
          <div className="flex items-center justify-end px-8 py-4 bg-gray-100 border-t border-gray-200">
            <LoadingButton
              loading={processing}
              type="submit"
              className="btn-indigo"
            >
              Criar Lanche
            </LoadingButton>
          </div>
        </form>
      </div >
    </div >
  );
};

/**
 * Persistent Layout (Inertia.js)
 *
 * [Learn more](https://inertiajs.com/pages#persistent-layouts)
 */
Create.layout = (page: React.ReactNode) => (
  <MainLayout title="Criar Lanches" children={page} />
);

export default Create;
