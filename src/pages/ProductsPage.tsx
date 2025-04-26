import React from "react";

const ProductsPage: React.FC = () => {
  const products = [
    {
      id: "1",
      name: "Produto 1",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Integer non libero id velit bibendum malesuada. Quisque a ligula vel risus consequat blandit.",
      price: 100.0,
      status: "active"
    },
    {
      id: "2",
      name: "Produto 2",
      description:
        "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      price: 150.0,
      status: "inactive"
    },
    {
      id: "3",
      name: "Produto 3",
      description:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.",
      price: 75.0,
      status: "active"
    },
    {
      id: "4",
      name: "Produto 4",
      description:
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.",
      price: 120.0,
      status: "inactive"
    }
  ];

  return (
    <div className="space-y-6" id="main">
      <section id="header-products">
        <h1 className="text-2xl font-bold text-gray-900">
          Products Management
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          This page is intentionally left empty as part of the developer test.
        </p>
      </section>

      <section
        data-section="prod-wrapper"
        className="h-max grid gap-4 overflow-hidden pb-2.5"
      >
        <div
          className="grid grid-cols-1 xl:grid-cols-[1fr_2fr] gap-4"
          data-field="line-1"
        >
          {/* Formulário de Cadastro de Produto */}
          <div
            className="h-[560px] bg-white shadow space-y-4 sm:rounded-lg p-6"
            data-section="product-register"
          >
            <header
              className="border-b pb-4"
              data-header="product-register-header"
            >
              <h2 className="text-xl font-semibold">Cadastro de Produto</h2>
            </header>

            <form className="space-y-4" data-form="product-register-form">
              <div className="flex flex-col space-y-2" data-field="name">
                <label htmlFor="name" className="text-sm font-medium">
                  Nome do Produto
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="border p-2 rounded-md"
                  placeholder="Digite o nome do produto"
                  required
                />
              </div>

              <div className="flex flex-col space-y-2" data-field="description">
                <label htmlFor="description" className="text-sm font-medium">
                  Descrição
                </label>
                <textarea
                  id="description"
                  name="description"
                  className="border p-2 rounded-md"
                  placeholder="Digite a descrição do produto"
                  rows={3}
                ></textarea>
              </div>

              <div className="flex flex-col space-y-2" data-field="price">
                <label htmlFor="price" className="text-sm font-medium">
                  Preço
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  className="border p-2 rounded-md"
                  placeholder="Digite o preço do produto"
                  required
                />
              </div>

              <div className="flex flex-col space-y-2" data-field="status">
                <label htmlFor="status" className="text-sm font-medium">
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  className="border p-2 rounded-md"
                  required
                >
                  <option value="active">Ativo</option>
                  <option value="inactive">Inativo</option>
                </select>
              </div>

              <div className="flex justify-end space-x-4 pt-4">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-900"
                  data-action="submit"
                >
                  Cadastrar
                </button>
                <button
                  type="button"
                  className="px-4 py-2 text-black rounded-md bg-gray-100 hover:bg-gray-200 active:bg-gray-300"
                  data-action="cancel"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>

          {/* Exibição dos Produtos */}
          <div
            className="h-[560px] bg-white shadow space-y-4 sm:rounded-lg p-6"
            data-section="product-display"
          >
            <header
              className="border-b pb-4"
              data-header="product-display-header"
            >
              <h2 className="text-xl font-semibold">Produtos Cadastrados</h2>
            </header>

            {/* Lista de produtos com rolagem */}
            <div className="overflow-y-scroll h-[400px] scrollbar-thin scrollbar-width-5 space-y-4">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="border p-4 rounded-md shadow-sm flex flex-col space-y-2"
                >
                  <h3 className="text-lg font-semibold">{product.name}</h3>
                  <p className="text-sm text-gray-600">{product.description}</p>
                  <p className="text-lg font-semibold">
                    R$ {product.price.toFixed(2)}
                  </p>
                  <span
                    className={`flex justify-center w-20 mt-2 px-3 py-1 text-sm text-white rounded-md ${
                      product.status === "active"
                        ? "bg-green-600"
                        : "bg-red-600"
                    }`}
                  >
                    {product.status === "active" ? "Ativo" : "Inativo"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductsPage;
