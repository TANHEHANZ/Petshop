import React from 'react'
import { Filtros } from '../style/style'

const FilterVentas = () => {
  return (
    <Filtros>
        <h2>Filtros</h2>
        <label><input type="checkbox" />
          producto 
        </label>
        <label><input type="checkbox" />
          marca 
        </label>
        <label><input type="checkbox" />
          precio 
        </label>
      </Filtros>
  )
}

export default FilterVentas
