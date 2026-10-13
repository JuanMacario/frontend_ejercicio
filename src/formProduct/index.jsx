import { useForm, Controller } from 'react-hook-form';
import './style.css'
import { useEffect, useState } from 'react';
import { validatedProduct } from '../schema/schema.producto';
import { zodResolver } from '@hookform/resolvers/zod'
import apiClient from '../../utils/ApiClient';

const FromProduct = ({ id, onClose, onSubmit, isEdit }) => {
    const [data, setData] = useState({})

    const [valueForm, setValueFrom] = useState({
        codigo: '',
        nombre: '',
        descripcion: '',
        categoria: '',
        marca: '',
        precio: 0,
        stock: 0
    })

    const {
        handleSubmit,
        control,
        reset,
        setValue,
        formState: { errors }
    } = useForm({
        defaultValues: valueForm,
        resolver: zodResolver(validatedProduct)
    })

    const normalizarPrecio = (data) => {
        let clear = ''
        for (let i = 0; i < data.length; i++) {
            if (data.at(i) != '.') {
                clear = clear + data.at(i)
            } else {
                break;
            }
        }

        return parseInt(clear)

    }

    useEffect(() => {
        reset({
            ...valueForm,
        })
    }, [valueForm, setValueFrom, reset, setValue])

    useEffect(() => {
        const getProdcut = async (id) => {
            if (id != null) {
                const respomse = await apiClient.get(`/${id}`)

                setValueFrom(
                    {
                        ...valueForm,
                        codigo: respomse.data?.data[0]?.codigo,
                        nombre: respomse.data?.data[0]?.nombre,
                        descripcion: respomse.data?.data[0]?.descripcion,
                        categoria: respomse.data?.data[0]?.categoria,
                        marca: respomse.data?.data[0]?.marca,
                        precio: parseInt(normalizarPrecio(respomse.data?.data[0]?.precio)),
                        stock: respomse.data?.data[0]?.stock
                    }
                )
            }
        }
        getProdcut(id)
    }, [])


    return (
        <div className='modal-overlay'>
            <div className='modal_ventana'>
                <section className='hedear_form'>
                    <h2>{isEdit ? (
                        <span>
                            Editar Producto
                        </span>
                    ) : (
                        <span>
                            Crear Producto
                        </span>
                    )}</h2>
                </section>

                <section className='section_form'>
                    <form className='form-prduct' onSubmit={handleSubmit(onSubmit)}>
                        <div className='section_inputs'>
                            <Controller
                                name='codigo'
                                control={control}
                                render={({ field }) => (
                                    <div>
                                        <label htmlFor="" >Código del Producto</label>
                                        <br />
                                        <input type="text" className='input_code' {...field} />
                                        <br />
                                        {errors.codigo && (
                                            <span className='errors'>{errors.codigo.message}</span>
                                        )}
                                    </div>
                                )}
                            />

                            <Controller
                                name='nombre'
                                control={control}
                                render={({ field }) => (
                                    <div>
                                        <label htmlFor="">Nombre del Producto</label>
                                        <br />
                                        <input type="text" name='nombre' {...field} />
                                        <br />
                                        {errors.nombre && (
                                            <span className='errors'>{errors.nombre.message}</span>
                                        )}
                                    </div>
                                )}
                            />

                            <Controller
                                name='categoria'
                                control={control}
                                render={({ field }) => (
                                    <div>
                                        <label htmlFor="">Categoría</label>
                                        <br />
                                        <input type="text" {...field} />
                                        <br />
                                        {errors.categoria && (
                                            <span className='errors'>{errors.categoria.message}</span>
                                        )}
                                    </div>
                                )}
                            />

                            <Controller
                                name='marca'
                                control={control}
                                render={({ field }) => (
                                    <div>
                                        <label htmlFor="">Marca</label>
                                        <br />
                                        <input type="text" {...field} />
                                        <br />
                                        {errors.marca && (
                                            <span className='errors'>{errors.marca.message}</span>
                                        )}
                                    </div>
                                )}
                            />

                            <Controller
                                name='descripcion'
                                control={control}
                                render={({ field }) => (
                                    <div className='text-area_descripcion'>
                                        <label htmlFor="">Descripción</label>
                                        <br />
                                        <textarea placeholder='Agrega una descripción del producto' {...field}></textarea>
                                        <br />
                                        {errors.descripcion && (
                                            <span className='errors'>{errors.descripcion.message}</span>
                                        )}
                                    </div>
                                )}
                            />

                            <Controller
                                name='precio'
                                control={control}
                                render={({ field }) => (
                                    <div>
                                        <label htmlFor="">Precio</label>
                                        <br />
                                        <input type="number" {...field} />
                                        <br />
                                        {errors.precio && (
                                            <span className='errors'>{errors.precio.message}</span>
                                        )}
                                    </div>
                                )}
                            />

                            <Controller
                                name='stock'
                                control={control}
                                render={({ field }) => (
                                    <div>
                                        <label htmlFor="">Stock</label>
                                        <br />
                                        <input type="text" {...field} />
                                        <br />
                                        {errors.stock && (
                                            <span className='errors'>{errors.stock.message}</span>
                                        )}
                                    </div>
                                )}
                            />


                        </div>
                        <div className='section-buttons'>
                            <button className='btn-cancel' type='button' onClick={onClose}>
                                Cancelar
                            </button>

                            <button type='submit' className='btn-submit'>
                                {isEdit ? 'Guardar Cambios' : 'Crear Producto'}
                            </button>
                        </div>
                    </form>
                </section>
            </div>
        </div>
    )
}

export { FromProduct }