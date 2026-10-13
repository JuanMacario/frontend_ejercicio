import './style.css'

const Notification = ({ status, message }) => {
    return (
        <div className={`notification ${status == '200' || status == '201'? 'exito' : 'fracaso'}`}>
            <h2 className="status_code">{status}</h2>
            <p className="message_response">{message}</p>
        </div>
    )
}

export { Notification }