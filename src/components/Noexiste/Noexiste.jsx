import './Noexiste.css'
import NewArrivals from '..//NewArrivals/NewArrivals'
import NewCollections from '../NewCollections/NewCollections'
import Header from '../Header/Header'

const Noexiste = () => {
    return (
        <>
        <div class = "ContenedorN">
            <h2>RESULTADOS DE LA BÚSQUEDA</h2>
            <p id = "subtitulo">No podemos encontrar resultados para la búsqueda</p>
            <div class = "Sugerencias">
                <h3>SUGERENCIAS DE BÚSQUEDA</h3>
                <ul>
                    <li>Comprueba que hayas escrito todo correctamente. O bien, intenta cambiar la ortografía de alguna de las palabras.</li>
                    <li>Limita tu búsqueda a 1 o 2 términos.</li>
                    <li>No seas tan específico. Usa más términos generales de búsqueda para poder encontrar productos similares.</li>
                </ul>
            </div>
        </div>

        <NewCollections/>
        </>
    )
    
}
export default Noexiste;
