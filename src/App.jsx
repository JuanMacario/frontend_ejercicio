import { useEffect, useState } from 'react'
import apiClient from '../utils/ApiClient'
import Table from 'react-bootstrap/Table'
import { Modal } from './Modal'
import { FromProduct } from './formProduct'
import { ModalConfirmation } from './assets/modalConfirmation'
import { Notification } from './assets/notification'
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
  const [verMensaje, setVerMensaje] = useState(false)
  const [message, setMessage] = useState('')
  const [statusCode, setStatusCode] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const get = async () => {

      const productos = await apiClient.get('/')
      setIsLoading(false)
      setProductos(productos?.data?.data)
    }

    get()
  }, [])

  const openEditProduct = (id) => {
    setOpenModal(true)
    setIsEdit(true)
    setSelectedProduct(id)
  }

  const openDeleteModal = (id) => {
    setIsDelete(true)
    setOpenConfirmation(true)
    setSelectedProduct(id)
  }

  const openStatusModal = (id, status) => {
    setOpenConfirmation(true)
    setSelectedProduct(id)
    setStatus(status ? 'activo' : 'inactivo')
  }

  const deleteProduct = async (id) => {

    const response = await apiClient.delete(`/${id}/delete`)

    setOpenConfirmation(false)
    setStatus(null)
    setSelectedProduct(null)
    setIsDelete(false)
    updateTable()

    setStatusCode(response.status)
    setMessage(response.data.message)
    mensajeTime()
  }

  const statusProduct = async (id) => {

    const respomse = await apiClient.put(`/${id}/status`)


    setOpenConfirmation(false)
    setStatus(null)
    setSelectedProduct(null)
    setIsDelete(false)
    updateTable()
    console.log(respomse)
  }

  const onSubmit = async (data) => {

    let response;

    const dataClear = {
      codigo: data.codigo.toUpperCase(),
      nombre: data.nombre,
      descripcion: data.descripcion,
      categoria: data.categoria,
      marca: data.marca,
      precio: parseInt(data.precio),
      stock: parseInt(data.stock)
    }

    if (isEdit) {
      const response = await apiClient.put(`/${selectedProduct}/update`, dataClear)

      setOpenModal(false)
      setIsEdit(false)
      setSelectedProduct(null)
      updateTable()

      setStatusCode(response.status)
      setMessage(response.data.message)
      mensajeTime()
    } else {

      try {
        response = await apiClient.post('/', dataClear)
        setStatusCode(response.status)
        setMessage(response.data.message)
        mensajeTime()

        setOpenModal(false)
        setIsEdit(false)
        setSelectedProduct(null)
        updateTable()
      } catch (er) {
        console.error(er)
        setStatusCode(er.status)
        setMessage(er.status == 409 ? 'El codigo del producto ya existe' : 'Parece que sucedio un error')
        mensajeTime()
      }

    }


  }

  const mensajeTime = () => {
    setVerMensaje(true)

    const tiempo = setTimeout(() => {
      setVerMensaje(false)
    }, 5000)
  }

  const updateTable = async () => {
    const response = await apiClient.get('/')

    setProductos(response?.data?.data)
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

          {!isLoading && <tbody >
            {productos?.map(item => (
              <tr key={item?.id} className='product'>
                <td className='left'>{item?.codigo}</td>
                <td>{item?.nombre}</td>
                <td>{item?.descripcion}</td>
                <td>{item?.categoria}</td>
                <td>{item?.marca}</td>
                <td>{`Q. ${item?.precio}`}</td>
                <td>{item?.stock}</td>
                <td>
                  <button
                   // onClick={() => openStatusModal(item.id, item.estado)}
                    className={`status_${item?.estado ? 'active' : 'inactive'} btn-status`}>
                    {item?.estado ? 'Activo' : 'Inactivo'}
                  </button>
                </td>
                <td className='rigth'>
                  <span className='action_buttons'>
                    <button className='btn_edit' onClick={() => openEditProduct(item.id)}>Editar</button>
                    <button className='btn_delete' onClick={() => openDeleteModal(item.id)}>Eliminar</button>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>}
          {isLoading && (
            <h2 className='loading'>Cargando lista de productos...</h2>
          )}
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
              status={status}
              id={selectedProduct}
              onConfirmar={isDelete ? () => deleteProduct(selectedProduct) : () => statusProduct(selectedProduct)}
              onClose={() => {
                setOpenConfirmation(false)
                setStatus(null)
                setSelectedProduct(null)
                setIsDelete(false)
              }}
            />
          </Modal>
        )}

        {verMensaje && (
          <Notification
            message={message} status={statusCode} />
        )}

      </section>
    </>
  )
}

export default App
