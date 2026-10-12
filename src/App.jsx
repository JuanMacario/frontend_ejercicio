import { useEffect, useState } from 'react'
import apiClient from '../utils/ApiClient'
import Table from 'react-bootstrap/Table'
import './App.css'

function App() {

  const [productos, setProductos] = useState([])

  useEffect(() => {
    const get = async () => {

      const productos = await apiClient.get('/')
      console.log(productos?.data?.data)
      setProductos(productos?.data?.data)
    }

    get()
  }, [])

  return (
    <>
      <section className='section_title'>
        <h2>Listado de Productos</h2>
      </section>
      <section className='section_table'>
        <table className='table_products'>
          <thead>
            <tr>
              <td>Código</td>
              <td>Nombre del producto</td>
              <td>Descripción</td>
              <td>Categoría</td>
              <td>Marca</td>
              <td>Precio</td>
              <td>Stock</td>
              <td>Estado</td>
              <td>Acciones</td>
            </tr>
          </thead>

          <tbody >
            {productos?.map(item => (
              <tr key={item?.id}>
                <td>{item?.codigo}</td>
                <td>{item?.nombre}</td>
                <td>{item?.descripcion}</td>
                <td>{item?.categoria}</td>
                <td>{item?.marca}</td>
                <td>{item?.precio}</td>
                <td>{item?.stock}</td>
                <td>
                  <span className={`status_${item?.estado ? 'active' : 'inactive'}`}>
                    {item?.estado ? 'activo' : 'inactivo'}
                  </span>
                </td>
                <td>
                  <span className='action_buttons'>
                    <button className='btn_edit'>editar</button>
                    <button className='btn_delete'>Eliminar</button>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  )
}

export default App
