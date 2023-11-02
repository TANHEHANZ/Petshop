import React from 'react'
import { Section, Table } from '../style/style'

const Categoria = () => {
    return (
        <Section>
            <h2>Categoria</h2>
            <article>
                <label>
                    Buscar <input type="text" />
                </label>

                <button >Añadir</button>
            </article>

            <div>
                <Table>
                    <thead>
                        <tr>
                            <th>Nro</th>
                            <th>nombre</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>

                    </tbody>
                </Table>
            </div>
        </Section>
    )
}

export default Categoria