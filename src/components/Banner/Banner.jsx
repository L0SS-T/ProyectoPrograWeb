import './Banner.css'
import collar from '../../assets/collar-main.jpg'
import { useNavigate } from 'react-router-dom'

const Banner = () => {

  const navigate = useNavigate();
  return (
    <main>
      <div className="seccionTexto">
        <h2>Elegancia</h2>
        <h2>Elegancia</h2>
        <h2 id='letraGold'>Elegancia</h2>
        <p>Descubre joyas exquisitas que trascienden las tendencias. Cada pieza es una obra maestra de arte y precisión.</p>

        <button onClick={() => navigate('/productos')}>Comprar ahora </button>
      </div>

      <div className='img1'>
        <img src={collar} alt="Collar" />
      </div>

    </main>
  )
}

export default Banner
