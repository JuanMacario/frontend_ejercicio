import { useEffect, useState } from 'react'
import apiClient from '../utils/ApiClient'
import Table from 'react-bootstrap/Table'
import { Modal } from './Modal'
import { FromProduct } from './formProduct'
import { ModalConfirmation } from './assets/modalConfirmation'
import './App.css'

function App() {

  const [productos, setProductos] = useState([])
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [isEdit, setIsEdit] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [openConfirmation, setOpenConfirmation] = useState(false)
  const [loading, setLoading] = useState(false)
  const [isDelete, setIsDelete] = useState(false)
  const [status, setStatus] = useState(null)

  useEffect(() => {
    const get = async () => {

      const productos = await apiClient.get('/')

      setProductos(productos?.data?.data)
    }

    get()
  }, [])

  const openEditProduct =  (id) => {
    setOpenModal(true)
    setIsEdit(true)
    setSelectedProduct(id)
  }

  const openDeleteModal = (id, status) => {
    setStatus(status ? 'activo' : 'inactivo')
    setIsDelete(true)
    setOpenConfirmation(true)
  }

  const onSubmit = (data) => {
    console.log(data, 'sie')
  }

  return (
    <>
      <section className='section_title'>
        <h2>Listado de Productos</h2>
      </section>

      <section className='seccion-action_header'>
        <button onClick={() => setOpenModal(true)}>Registrar Producto +</button>
      </section>

      <section className='section_table'>
        <table className='table_products'>
          <thead>
            <tr>
              <td className='left'>Código</td>
              <td>Nombre del producto</td>
              <td>Descripción</td>
              <td>Categoría</td>
              <td>Marca</td>
              <td>Precio</td>
              <td>Stock</td>
              <td>Estado</td>
              <td className='rigth'>Acciones</td>
            </tr>
          </thead>

          <tbody >
            {productos?.map(item => (
              <tr key={item?.id} className='product'>
                <td className='left'>{item?.codigo}</td>
                <td>{item?.nombre}</td>
                <td>{item?.descripcion}</td>
                <td>{item?.categoria}</td>
                <td>{item?.marca}</td>
                <td>{item?.precio}</td>
                <td>{item?.stock}</td>
                <td>
                  <button className={`status_${item?.estado ? 'active' : 'inactive'} btn-status`}>
                    {item?.estado ? 'Activo' : 'Inactivo'}
                  </button>
                </td>
                <td className='rigth'>
                  <span className='action_buttons'>
                    <button className='btn_edit' onClick={() => openEditProduct(item.id)}>Editar</button>
                    <button className='btn_delete' onClick={openDeleteModal}>Eliminar</button>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {openModal && (
          <Modal>
            <FromProduct
              id={selectedProduct}
              onClose={() => {
                setOpenModal(false)
                setIsEdit(false)
                setSelectedProduct(null)
              }}
              isEdit={isEdit}
              onSubmit={onSubmit}
            />
          </Modal>
        )}

        {openConfirmation && (
          <Modal>
            <ModalConfirmation 
            isDelete={isDelete}
            //status={}
            />
          </Modal>
        )}

      </section>
    </>
  )
}

export default App
