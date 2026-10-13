import './style.css'

const ModalConfirmation = ({ isDelete, status, onConfirmar, onClose }) => {

    return (
        <div className='modal-overlay'>
            <div className="contenedor">
                <span className="encabezado">
                    <h2>Confirmación de acción</h2>
                </span>
                <span className="titulo">
                    {isDelete ? '¿Está seguro de eliminar este producto?' : `¿Esá seguro de cambiar el estado de este producto?`}
                </span><br /> <br />
                <span className="descripcion">
                    {status == null ? 'El producto será eliminado del inventario de forma permanente' : `El estado del producto pasara de ${status} a ${status == 'activo' ? 'inactivo' : 'activo'}`}
                </span> <br /> <br />
                <span className="botones">
                    <button className="btn-cancelar" onClick={onClose}>
                        Cancelar
                    </button>
                    <button className="btn-confirmar" onClick={onConfirmar}>
                        Confirmar
                    </button>
                </span>
            </div>
        </div>
    )
}

export { ModalConfirmation }